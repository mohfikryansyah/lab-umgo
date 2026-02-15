<?php

namespace App\Services\BHP;

use App\Models\BHPStock;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\UploadedFile;

class BHPService
{
    public function store(array $data, UploadedFile $foto): BHPStock
    {
        return DB::transaction(function () use ($data, $foto) {

            $data['foto_bahan'] = $foto->store(
                'bhp-foto',
                'public'
            );

            return BHPStock::create($data);
        });
    }

    public function update(
        BHPStock $bhpStock,
        array $data,
        ?UploadedFile $foto = null
    ): BHPStock {
        return DB::transaction(function () use ($bhpStock, $data, $foto) {

            if ($foto) {
                if ($bhpStock->foto_bahan && Storage::disk('public')->exists($bhpStock->foto_bahan)) {
                    Storage::disk('public')->delete($bhpStock->foto_bahan);
                }

                $data['foto_bahan'] = $foto->store('bhp-foto', 'public');
            }

            $bhpStock->update($data);

            return $bhpStock;
        });
    }
}
