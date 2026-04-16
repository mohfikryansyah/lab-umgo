<?php

namespace App\Services\Jadwal;

use App\Models\Jadwal;
use Illuminate\Support\Facades\DB;

class JadwalService
{
    public function store(array $data): Jadwal
    {
        return DB::transaction(function () use ($data) {
            return Jadwal::create($data);
        });
    }

    public function update(Jadwal $jadwal, array $data): Jadwal
    {
        return DB::transaction(function () use ($jadwal, $data) {
            $jadwal->update($data);

            return $jadwal;
        });
    }

    public function destroy(Jadwal $jadwal): void
    {
        DB::transaction(function () use ($jadwal) {

            $jadwal->delete();
        });
    }
}
