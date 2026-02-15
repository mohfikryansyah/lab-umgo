<?php

namespace App\Services\Peminjaman;

use Exception;
use App\Models\BHPStock;
use App\Models\DataAlat;
use App\Models\Peminjaman;
use App\Models\PeminjamanItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PeminjamanService
{
    public function store(array $data): Peminjaman
    {
        return DB::transaction(function () use ($data) {

            $peminjaman = Peminjaman::create([
                'user_id' => Auth::id(),
                'tanggal_pinjam' => $data['tanggal_pinjam'],
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
}
