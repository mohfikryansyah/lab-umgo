<?php

namespace App\Http\Controllers;

use App\Http\Requests\Laporan\LaporanStoreRequest;
use Inertia\Inertia;
use App\Models\Laporan;
use App\Services\Laporan\LaporanService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class LaporanController extends Controller
{
    protected LaporanService $service;

    public function __construct(LaporanService $service)
    {
        $this->service = $service;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $perPage = $request->integer('per_page', 6);
        $view    = $request->string('view', 'grid')->toString();
        $search  = $request->string('search', '')->toString();
        $sortBy  = $request->string('sort_by', 'tanggal_melapor')->toString();
        $sortDir = $request->string('sort_dir', 'desc')->toString();
        $filter_Type = $request->string('filter_type', '')->toString();

        $allowedSorts = ['tanggal_melapor', 'tipe'];
        if (! in_array($sortBy, $allowedSorts)) {
            $sortBy = 'tanggal_melapor';
        }

        $laporans = Laporan::query()
            ->when(
                $search,
                fn($q) => $q
                    ->where('judul', 'like', "%{$search}%")
                    ->orWhere('deskripsi', 'like', "%{$search}%")
            )
            ->when(
                $filter_Type,
                fn($q) => $q->where('tipe', $filter_Type)
            )
            ->with('pelapor:id,name')
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
                'filter_type' => $filter_Type,
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/laporan/create-laporan');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LaporanStoreRequest $request)
    {
        $this->service->store($request->validated(), $request->file('file_laporan'));

        return to_route('laporan.index')->with('success', 'Laporan berhasil dibuat.');
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
        $this->service->update($laporan, $request->validated(), $request->file('file_laporan'));

        return to_route('laporan.index')->with('success', 'Berhasil mengubah laporan.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Laporan $laporan)
    {
        $this->service->destroy($laporan);

        return to_route('laporan.index')->with('success', 'Laporan berhasil dihapus.');
    }

    public function serveFile(Laporan $laporan)
    {
        $filePath = Storage::disk('public')->path($laporan->file_laporan);

        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return response()->file($filePath, [
            'Content-Type'              => 'application/pdf',
            'Content-Disposition'       => 'inline; filename="' . basename($filePath) . '"',
            'X-Content-Type-Options'    => 'nosniff',
        ]);
    }


    /**
     * View document.
     */
    public function viewDocument(Laporan $laporan)
    {
        $filePath = Storage::disk('public')->path($laporan->file_laporan);

        if (!file_exists($filePath)) {
            abort(404, 'File not found.');
        }

        return Inertia::render('menu/laporan/document-viewer', [
            'fileUrl' => route('laporan.serve-file', $laporan->id),
            'judul'   => $laporan->judul,
        ]);
    }
}
