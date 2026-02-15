<?php

namespace App\Http\Controllers\BHP;

use Inertia\Inertia;
use App\Models\BHPStock;
use Illuminate\Http\Request;
use App\Models\PeminjamanBHP;
use App\Models\PeminjamanBHPItem;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\PeminajamanBHP\PeminjamanBHPStoreRequest;
use App\PeminjamanBHP\Services\PeminjamanBHPService as ServicesPeminjamanBHPService;
use App\Services\PeminjamanBHP\PeminjamanBHPService;
use Illuminate\Support\Facades\Auth;

class PeminjamanBHPController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bhpstocks = BHPStock::get();
        $peminjaman_bhp = PeminjamanBHP::with('user', 'items')->get();
        return Inertia::render('menu/bhp-stock/peminjaman/pages', compact('bhpstocks', 'peminjaman_bhp'));
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
    public function store(
        PeminjamanBHPStoreRequest $request,
        PeminjamanBHPService $service
    ) {
        $service->store($request->validated());

        return back()->with('success', 'Peminjaman BHP berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(PeminjamanBHP $peminjamanBHP)
    {
        // dd($peminjamanBHP->load('user', 'items'));
        return Inertia::render('menu/bhp-stock/peminjaman/show-peminjaman-bhp', [
            'peminjaman_bhp' => $peminjamanBHP->load('user', 'items.bhp'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PeminjamanBHP $peminjamanBHP)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PeminjamanBHP $peminjamanBHP)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PeminjamanBHP $peminjamanBHP)
    {
        $peminjamanBHP->delete();

        return to_route('peminjaman.index')->with('success', 'Data peminjaman BHP berhasil dihapus.');
    }
}
