<?php

namespace App\Services\Alat;

use App\Models\DataAlat;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AlatService
{
    public function store(array $data, UploadedFile $foto): DataAlat
    {
        return DB::transaction(function () use ($data, $foto) {

            $data['foto_alat'] = $foto->store(
                'alat-foto',
                'public'
            );

            return DataAlat::create($data);
        });
    }

    public function update(DataAlat $alat, array $data, ?UploadedFile $foto = null): DataAlat
    {
        return DB::transaction(function () use ($alat, $data, $foto) {

            if ($foto) {

                if ($alat->foto_alat && Storage::disk('public')->exists($alat->foto_alat)) {
                    Storage::disk('public')->delete($alat->foto_alat);
                }

                $data['foto_alat'] = $foto->store('alat-foto', 'public');
            }

            $alat->update($data);

            return $alat->fresh();
        });
    }
}
