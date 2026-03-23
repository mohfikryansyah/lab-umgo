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

    public function destroy(Jadwal $jadwal): void
    {
        DB::transaction(function () use ($jadwal) {

            $jadwal->delete();
        });
    }
}
