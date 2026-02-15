<?php

namespace App\Services\PeminjamanBHP;

use Exception;
use App\Models\BHPStock;
use App\Models\PeminjamanBHP;
use App\Models\PeminjamanBHPItem;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class PeminjamanBHPService
{
    public function store(array $data): PeminjamanBHP
    {
        return DB::transaction(function () use ($data) {

            $peminjaman = PeminjamanBHP::create([
                'user_id' => Auth::id(),
                'tanggal_pinjam' => $data['tanggal_pinjam'],
            ]);

            foreach ($data['items'] as $item) {

                $bhpStock = BHPStock::lockForUpdate()
                    ->findOrFail($item['bhp_stock_id']);

                if ($bhpStock->jumlah_stok < $item['jumlah_pinjam']) {
                    throw new Exception(
                        "Stok {$bhpStock->nama_bahan} tidak mencukupi. Sisa stok: {$bhpStock->jumlah_stok}."
                    );
                }

                PeminjamanBHPItem::create([
                    'peminjaman_bhp_id' => $peminjaman->id,
                    'bhp_stock_id' => $bhpStock->id,
                    'jumlah_pinjam' => $item['jumlah_pinjam'],
                ]);

                $bhpStock->decrement(
                    'jumlah_stok',
                    $item['jumlah_pinjam']
                );
            }

            return $peminjaman;
        });
    }
}
