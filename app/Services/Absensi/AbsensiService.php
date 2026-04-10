<?php

namespace App\Services\Absensi;

use App\Models\Absensi;
use App\Models\Jadwal;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class AbsensiService
{
    public function store(array $data): Absensi
    {
        return DB::transaction(function () use ($data) {

            $data['staf_id'] = Auth::user()->id;
            $data['waktu_masuk'] = Carbon::now()
                ->setTimezone('Asia/Makassar')
                ->format('Y-m-d H:i:s');
            
            if (!$this->cekJadwalHariIni()) {
                throw new \Exception('Tidak ada jadwal praktikum hari ini. Absensi tidak dapat dilakukan.');
            }



            return Absensi::create($data);
        });
    }

    private function cekJadwalHariIni()
    {
        $today = Carbon::today()->toDateString();

        return Jadwal::whereDate('waktu', $today)
            ->where('status', 'Terjadwal')
            ->first();
    }

    public function update(Absensi $alat, array $data, ?UploadedFile $foto = null): Absensi
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
