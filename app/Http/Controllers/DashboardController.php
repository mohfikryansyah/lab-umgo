<?php

namespace App\Http\Controllers;

use App\Models\BhpStock;
use App\Models\DataAlat;
use App\Models\Laporan;
use App\Models\Peminjaman;
use App\Models\Jadwal;
use App\Models\Absensi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $today = Carbon::today();

        $totalBHPMenipis = BhpStock::whereNull('deleted_at')
            ->where('jumlah_stok', '<=', 10)
            ->count();

        $totalAlatRusak = DataAlat::whereNull('deleted_at')
            ->whereIn('kondisi_alat', ['Rusak Ringan', 'Rusak Berat'])
            ->count();

        $totalPeminjamanAktif = Peminjaman::whereIn('status', ['Pending', 'Disetujui'])
            ->count();

        $bhpMenipis = BhpStock::whereNull('deleted_at')
            ->where('jumlah_stok', '<=', 10)
            ->orderBy('jumlah_stok', 'asc')
            ->limit(5)
            ->get(['id', 'nama_bahan', 'jumlah_stok', 'satuan', 'tanggal_kadaluarsa'])
            ->map(function ($item) {
                $maxStok = 50;
                $persen  = min(100, round(($item->jumlah_stok / $maxStok) * 100));

                return [
                    'id'                 => $item->id,
                    'nama_bahan'         => $item->nama_bahan,
                    'jumlah_stok'        => $item->jumlah_stok,
                    'satuan'             => $item->satuan,
                    'tanggal_kadaluarsa' => $item->tanggal_kadaluarsa,
                    'persen_stok'        => $persen,
                    'level'              => $item->jumlah_stok <= 3 ? 'kritis' : 'rendah',
                ];
            });

        $alatBermasalah = DataAlat::whereNull('deleted_at')
            ->whereIn('kondisi_alat', ['Rusak Ringan', 'Rusak Berat'])
            ->orderByRaw("FIELD(kondisi_alat, 'Rusak Berat', 'Rusak Ringan')")
            ->limit(5)
            ->get(['id', 'nama_alat', 'kondisi_alat', 'nomor_inventaris', 'tempat_penyimpanan']);

        $peminjamanTerbaru = Peminjaman::with(['user:id,name'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($p) {
                return [
                    'id'              => $p->id,
                    'nama_peminjam'   => $p->user->name ?? '-',
                    'judul_praktikum' => $p->judul_praktikum,
                    'status'          => $p->status,
                    'tanggal_pinjam'  => Carbon::parse($p->tanggal_pinjam)->format('d M Y'),
                    'jumlah_item'     => $p->items()->count(),
                    'initials'        => $this->initials($p->user->name ?? '?'),
                ];
            });

        $laporanTerbaru = Laporan::with(['pelapor:id,name'])
            ->orderBy('tanggal_melapor', 'desc')
            ->limit(4)
            ->get()
            ->map(function ($l) {
                return [
                    'id'              => $l->id,
                    'judul'           => $l->judul,
                    'tipe'            => $l->tipe,
                    'tanggal_melapor' => Carbon::parse($l->tanggal_melapor)->format('d M Y'),
                    'pelapor'         => $l->pelapor->name ?? '-',
                ];
            });

        $praktikum = Jadwal::where('created_at', $today)->first();

        $absensiHariIni = Absensi::where('staf_id', $user->id)
            ->whereDate('created_at', $today)
            ->exists();

        return Inertia::render('menu/dashboard/pages', [
            'totalBHPMenipis'      => $totalBHPMenipis,
            'totalAlatRusak'       => $totalAlatRusak,
            'totalPeminjamanAktif' => $totalPeminjamanAktif,

            'bhpMenipis'       => $bhpMenipis,
            'alatBermasalah'   => $alatBermasalah,
            'peminjamanTerbaru' => $peminjamanTerbaru,
            'laporanTerbaru'   => $laporanTerbaru,

            'praktikum'      => $praktikum,
            'absensiHariIni' => $absensiHariIni,
        ]);
    }

    // ── Helper: ambil 2 huruf awal dari nama ────────────────────────────────
    private function initials(string $name): string
    {
        $words = explode(' ', trim($name));
        if (count($words) >= 2) {
            return strtoupper(substr($words[0], 0, 1) . substr($words[1], 0, 1));
        }
        return strtoupper(substr($name, 0, 2));
    }
}