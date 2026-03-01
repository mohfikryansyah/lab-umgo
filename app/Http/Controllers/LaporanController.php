<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Laporan;
use Illuminate\Http\Request;

class LaporanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 12);
        $view    = $request->string('view', 'grid')->toString();
        $search  = $request->string('search', '')->toString();
        $sortBy  = $request->string('sort_by', 'tanggal_melapor')->toString();
        $sortDir = $request->string('sort_dir', 'desc')->toString();

        $allowedSorts = ['tanggal_melapor', 'tipe'];
        if (! in_array($sortBy, $allowedSorts)) {
            $sortBy = 'tanggal_melapor';
        }

        $laporans = Laporan::query()
            ->when($search, fn ($q) => $q
                ->where('judul', 'like', "%{$search}%")
                ->orWhere('deskripsi', 'like', "%{$search}%")
            )
            ->orderBy($sortBy, $sortDir === 'asc' ? 'asc' : 'desc')
            ->paginate($perPage)
            ->withQueryString();

        return Inertia::render('menu/laporan/pages', [
            'laporans'   => $laporans,
            'filters'    => [
                'search'   => $search,
                'view'     => $view,
                'sort_by'  => $sortBy,
                'sort_dir' => $sortDir,
                'per_page' => $perPage,
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Laporan $laporan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Laporan $laporan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Laporan $laporan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        //
    }
}
