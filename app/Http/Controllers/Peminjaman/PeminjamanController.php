<?php

namespace App\Http\Controllers\Peminjaman;

use Inertia\Inertia;
use App\Models\BHPStock;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Services\Peminjaman\PeminjamanService;
use App\Http\Requests\Peminjaman\PeminjamanStoreRequest;
use App\Http\Requests\Peminjaman\PeminjamanUpdateRequest;
use App\Models\DataAlat;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bhpstocks = BHPStock::latest()->get();
        $peminjaman = Peminjaman::with('user', 'items')->latest()->get();
        $alats = DataAlat::get();
        return Inertia::render('menu/peminjaman/pages', compact('bhpstocks', 'peminjaman', 'alats'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $bhpstocks = BHPStock::latest()->get();
        $alats = DataAlat::latest()->get();
        return Inertia::render('menu/peminjaman/create-peminjaman', compact('bhpstocks', 'alats'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PeminjamanStoreRequest $request, PeminjamanService $service)
    {
        $service->store($request->validated());

        return to_route('peminjaman.index')->with('success', 'Peminjaman berhasil');
    }

    /**
     * Display the specified resource.
     */
    public function show(Peminjaman $peminjaman)
    {
        $peminjaman = $peminjaman->load(['items.alat', 'items.bhp', 'user']);
        return Inertia::render('menu/peminjaman/show-peminjaman', compact('peminjaman'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Peminjaman $peminjaman)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PeminjamanUpdateRequest $request, Peminjaman $peminjaman)
    {
        $peminjaman->update([
            'status' => $request->status,
        ]);

        foreach ($request->items ?? [] as $item) {
            $peminjamanItem = $peminjaman->items()->findOrFail($item['id']);

            $peminjamanItem->update([
                'tanggal_dikembalikan' => $item['tanggal_dikembalikan'],
                'kondisi_kembali' => $item['kondisi_kembali'],
            ]);
        }

        return redirect()->back()->with('success', 'Peminjaman diperbarui');
    }

    public function handleApprove(Peminjaman $peminjaman, PeminjamanService $service)
    {
        $service->approve($peminjaman);
        return redirect()->back()->with('success', 'Berhasil menyetujui peminjaman');
    }

    public function handleDecline(Peminjaman $peminjaman, PeminjamanService $service)
    {
        $service->decline($peminjaman);
        return redirect()->back()->with('success', 'Berhasil menolak peminjaman');   
    }

    public function handleComplete(Peminjaman $peminjaman, PeminjamanService $service)
    {
        $service->complete($peminjaman);
        return to_route('peminjaman.index')->with('success', 'Peminjaman selesai');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
    {
        $peminjaman->delete();
    return to_route('peminjaman.index')->with('success', 'Peminjaman berhasil dihapus');
    }
}
