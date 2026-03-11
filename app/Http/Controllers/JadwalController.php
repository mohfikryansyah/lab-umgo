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
    public function index()
    {
        return Inertia::render('menu/jadwal/pages');
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
        $service->store($request->validated());
        return back()->with('success', 'Berhasil menyimpan jadwal');
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
    public function destroy(Jadwal $jadwal)
    {
        //
    }
}
