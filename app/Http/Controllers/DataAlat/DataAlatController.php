<?php

namespace App\Http\Controllers\DataAlat;

use Inertia\Inertia;
use App\Models\DataAlat;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\Alat\AlatStoreRequest;
use App\Http\Requests\Alat\AlatUpdateRequest;
use App\Services\Alat\AlatService;

class DataAlatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $alats = DataAlat::get();
        return Inertia::render('menu/data-alat/pages', compact('alats'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('menu/data-alat/create-alat');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AlatStoreRequest $request, AlatService $service)
    {
        $service->store($request->validated(), $request->file('foto_alat'));
        return to_route('data-alat.index')->with('success', 'Data alat berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(DataAlat $alat)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(DataAlat $alat)
    {
        return Inertia::render('menu/data-alat/edit-alat', compact('alat'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AlatUpdateRequest $request, DataAlat $alat, AlatService $service)
    {
        $service->update($alat, $request->validated(), $request->file('foto_alat'));
        return to_route('data-alat.index')->with('success', 'Data alat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DataAlat $alat)
    {
        //
    }
}
