<?php

namespace App\Services\Laporan;

use App\Models\Laporan;
use Carbon\Carbon;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class LaporanService
{
    public function store(array $data, UploadedFile $file): Laporan
    {
        return DB::transaction(function () use ($data, $file) {

            $data['file_laporan'] = $file->store('laporan-files', 'public');
            $data['pelapor_id'] = Auth::id();
            $data['tanggal_melapor'] = Carbon::now();

            return Laporan::create($data);
        });
    }

    public function update(Laporan $laporan, array $data, ?UploadedFile $file = null): Laporan
    {
        return DB::transaction(function () use ($laporan, $data, $file) {
            if ($file) {
                if ($laporan->file_laporan && Storage::disk('public')->exists($laporan->file_laporan)) {
                    Storage::disk('public')->delete($laporan->file_laporan);
                }
                $data['file_laporan'] = $file->store('laporan', 'public');
            }

            $laporan->update($data);

            return $laporan->fresh();
        });
    }

    public function destroy(Laporan $laporan): void
    {
        DB::transaction(function () use ($laporan) {

            if ($laporan->file_laporan && Storage::disk('public')->exists($laporan->file_laporan)) {
                Storage::disk('public')->delete($laporan->file_laporan);
            }

            $laporan->delete();
        });
    }
}
