<?php

namespace App\Http\Controllers;

use App\Http\Requests\Absensi\AbsensiStoreRequest;
use App\Models\Absensi;
use App\Models\Jadwal;
use App\Services\Absensi\AbsensiService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class AbsensiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search_name = $request->string('search_name', '')->toString();
        $search_prodi = $request->string('search_prodi', '')->toString();
        $filter_status = $request->string('filter_status', '')->toString();
        $filter_date = $request->string('filter_date', '')->toString();

        if ($search_prodi === 'all') {
            $search_prodi = '';
        }

        if ($filter_status === 'all') {
            $filter_status = '';
        }

        $absensis = Absensi::query()
            ->with('staf')
            ->when($search_name, function ($query) use ($search_name) {
                $query->whereHas('staf', function ($q) use ($search_name) {
                    $q->whereAny(['name', 'id_staf'], 'like', "%{$search_name}%");
                });
            })
            ->when($search_prodi, function ($query) use ($search_prodi) {
                $query->whereHas('staf', function ($q) use ($search_prodi) {
                    $q->where('prodi', 'like', "%{$search_prodi}%");
                });
            })
            ->when($filter_status, function ($query) use ($filter_status) {
                $query->where('status', 'like', $filter_status);
            })
            ->when($filter_date, function ($query) use ($filter_date) {
                $query->whereDate('waktu_masuk', Carbon::parse($filter_date));
            })
            ->latest()
            ->get();

        $today = Carbon::today();

        $jadwalHariIni = Jadwal::whereDate('waktu', $today)
            ->where('status', 'Terjadwal')
            ->first();

        return Inertia::render('menu/absensi/pages', [
            'absensis' => $absensis,
            'praktikum' => $jadwalHariIni,
            'filters' => [
                'search_name' => $search_name,
                'search_prodi' => $search_prodi,
                'filter_status' => $filter_status,
                'filter_date' => $filter_date,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, AbsensiService $service)
    {
        if ($this->checkAttendance()) {
            throw ValidationException::withMessages([
                'absensi' => 'Anda sudah melakukan absensi hari ini.'
            ]);
        }

        $now = now('Asia/Makassar');

        $data['staf_id'] = Auth::user()->id;
        $data['waktu_masuk'] = Carbon::parse($request->waktu_masuk)->setTimezone('Asia/Makassar')->format('Y-m-d H:i:s') ?? $now;

        if (!$this->cekJadwalHariIni()) {
            throw ValidationException::withMessages([
                'jadwal' => 'Tidak ada jadwal praktikum hari ini. Absensi tidak dapat dilakukan.'
            ]);
        }

        $jadwal = Jadwal::whereDate('waktu', $now)
            ->where('status', 'Terjadwal')
            ->first();

        $batasMasuk = Carbon::parse($jadwal->waktu);


        if ($now->greaterThan($batasMasuk)) {
            $data['status'] = 'Hadir';
            $data['waktu_terlambat'] = Carbon::parse($data['waktu_masuk'])->diffInMinutes($batasMasuk);
        } else {
            $data['status'] = 'Hadir';
            $data['waktu_terlambat'] = '-';
        }

        Absensi::create($data);
        return redirect()->back()->with('success', 'Absensi berhasil dilakukan.');
    }

    private function cekJadwalHariIni()
    {
        $now = now('Asia/Makassar');

        return Jadwal::whereDate('waktu', $now)
            ->where('status', 'Terjadwal')
            ->first();
    }

    private function checkAttendance()
    {
        $today = Carbon::today();
        $userId = Auth::user()->id;

        $checkAttendance = Absensi::where('staf_id', $userId)
            ->whereDate('waktu_masuk', $today)
            ->first();

        return $checkAttendance;
    }

    /**
     * Display the specified resource.
     */
    public function show(Absensi $absensi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Absensi $absensi)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Absensi $absensi)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Absensi $absensi)
    {
        //
    }
}
