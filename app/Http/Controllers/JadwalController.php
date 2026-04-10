<?php

namespace App\Http\Controllers;

use App\Http\Requests\Jadwal\JadwalStoreRequest;
use App\Models\Jadwal;
use App\Models\User;
use App\Services\Jadwal\JadwalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JadwalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 6);
        $view    = $request->string('view', 'grid')->toString();
        $search  = $request->string('search', '')->toString();
        $sortBy  = $request->string('sort_by', 'waktu')->toString();
        $sortDir = $request->string('sort_dir', 'desc')->toString();
        $filter_Type = $request->string('filter_type', '')->toString();

        $allowedSorts = ['waktu', 'tipe'];
        if (! in_array($sortBy, $allowedSorts)) {
            $sortBy = 'waktu';
        }

        $jadwals = Jadwal::query()
            ->when(
                $search,
                fn($q) => $q
                    ->where('judul_jadwal', 'like', "%{$search}%")
                    ->orWhere('deskripsi_jadwal', 'like', "%{$search}%")
            )
            ->when(
                $filter_Type,
                fn($q) => $q->where('status', $filter_Type)
            )
            ->with('penanggungJawab:id,name')
            ->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('menu/jadwal/pages', [
            'jadwals'   => $jadwals,
            'filters'    => [
                'search'   => $search,
                'view'     => $view,
                'sort_by'  => $sortBy,
                'sort_dir' => $sortDir,
                'per_page' => $perPage,
                'filter_type' => $filter_Type,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::latest()->get();
        return Inertia::render('menu/jadwal/create-jadwal', compact('users'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(JadwalStoreRequest $request, JadwalService $service)
    {
        // dd($request->all());
        $service->store($request->validated());
        return to_route('jadwal.index')->with('success', 'Berhasil menyimpan jadwal');
    }

    /**
     * Display the specified resource.
     */
    public function show(Jadwal $jadwal)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Jadwal $jadwal)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Jadwal $jadwal)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Jadwal $jadwal, JadwalService $service)
    {
        $service->destroy($jadwal);

        return to_route('jadwal.index')->with('success', 'Jadwal berhasil dihapus.');
    }
}
