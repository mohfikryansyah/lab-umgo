<?php

namespace App\Services\Peminjaman;

use App\Enums\StatusPeminjaman;
use App\Models\BHPStock;
use App\Models\DataAlat;
use App\Models\Peminjaman;
use App\Models\PeminjamanItem;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PeminjamanService
{
    public function store(array $data): Peminjaman
    {
        return DB::transaction(function () use ($data) {

            $peminjaman = Peminjaman::create([
                'user_id' => Auth::id(),
                'tanggal_pinjam' => Carbon::now(),
                'judul_praktikum' => $data['judul_praktikum'],
            ]);

            foreach ($data['items'] as $item) {
                match ($item['item_type']) {
                    'bhp'  => $this->pinjamBHP($peminjaman, $item),
                    'alat' => $this->pinjamAlat($peminjaman, $item),
                    default => throw new Exception('Tipe item tidak valid'),
                };
            }

            return $peminjaman;
        });
    }

    private function pinjamBHP(Peminjaman $peminjaman, array $item): void
    {
        $bhp = BHPStock::lockForUpdate()->findOrFail($item['item_id']);

        if ($bhp->jumlah_stok < $item['jumlah']) {
            throw new Exception(
                "Stok {$bhp->nama_bahan} tidak mencukupi. Sisa {$bhp->jumlah_stok}"
            );
        }

        PeminjamanItem::create([
            'peminjaman_id' => $peminjaman->id,
            'item_type' => 'bhp',
            'item_id' => $bhp->id,
            'jumlah' => $item['jumlah'],
        ]);

        $bhp->decrement('jumlah_stok', $item['jumlah']);
    }

    private function pinjamAlat(Peminjaman $peminjaman, array $item): void
    {
        $alat = DataAlat::lockForUpdate()->findOrFail($item['item_id']);

        if ($alat->jumlah_stok < $item['jumlah']) {
            throw new Exception("Stok {$alat->nama_alat} tidak mencukupi. Sisa {$alat->jumlah_stok}");
        }

        PeminjamanItem::create([
            'peminjaman_id' => $peminjaman->id,
            'item_type' => 'alat',
            'item_id' => $alat->id,
            'jumlah' => 1,
        ]);
    }

    public function approve(Peminjaman $peminjaman): void
    {
        DB::transaction(function () use ($peminjaman) {

            $peminjaman->load('items');

            if ($peminjaman->status !== StatusPeminjaman::Pending) {
                throw ValidationException::withMessages([
                    'status' => 'Peminjaman sudah diproses.'
                ]);
            }

            foreach ($peminjaman->items as $item) {
                $model = match ($item->item_type) {
                    'alat' => DataAlat::query(),
                    'bhp'  => BHPStock::query(),
                    default => throw ValidationException::withMessages([
                        'item_type' => 'Tipe item tidak valid.'
                    ])
                };

                $stock = $model->withTrashed()->lockForUpdate()->findOrFail($item->item_id);

                if ($stock->trashed()) {
                    $nama_barang = $item->item_type === 'alat' ? $stock->nama_alat : $stock->nama_bahan;
                    throw ValidationException::withMessages([
                        'item' => "Tidak dapat menyetujui peminjaman karena '{$nama_barang}' sudah tidak tersedia."
                    ]);
                }

                if ($stock->jumlah_stok < $item->jumlah) {
                    throw ValidationException::withMessages([
                        'stok' => "Stok {$item->item_type} tidak mencukupi."
                    ]);
                }

                $stock->decrement('jumlah_stok', $item->jumlah);
            }

            $peminjaman->update([
                'status' => StatusPeminjaman::Disetujui,
            ]);
        });
    }

    public function decline(Peminjaman $peminjaman): void
    {
        $peminjaman->update([
            'status' => StatusPeminjaman::Ditolak,
        ]);
    }

    public function complete(Peminjaman $peminjaman): void
    {
        DB::transaction(function () use ($peminjaman) {
            $peminjaman->load('items');

            foreach ($peminjaman->items as $item) {

                if ($item->item_type !== 'alat') continue;

                $stock = DataAlat::query()->lockForUpdate()->findOrFail($item->item_id);
                $stock->increment('jumlah_stok', $item->jumlah);
            }

            $peminjaman->update([
                'status' => StatusPeminjaman::Selesai,
            ]);
        });
    }
}
