<?php

namespace App\Http\Controllers\BHP;

use Inertia\Inertia;
use App\Models\BHPStock;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\BHP\BHPStoreRequest;
use App\Http\Requests\BHP\BHPUpdateRequest;
use App\Services\BHP\BHPService;
use Illuminate\Support\Facades\Storage;

class BHPStockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bhpstocks = BHPStock::get();
        return Inertia::render('menu/bhp-stock/stok/pages', compact('bhpstocks'));
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
    public function store(BHPStoreRequest $request, BHPService $service)
    {
        $service->store(
            $request->validated(),
            $request->file('foto_bahan')
        );

        return to_route('stok.index')->with('success', 'BHP Stock created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(BHPStock $bhpStock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(BHPStock $bhpStock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(
        BHPUpdateRequest $request,
        BHPStock $bhpStock,
        BHPService $service
    ) {
        $service->update(
            $bhpStock,
            $request->validated(),
            $request->file('foto_bahan')
        );

        return to_route('stok.index')->with('success', 'BHP Stock updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(BHPStock $bhpStock)
    {
        $bhpStock->delete();

        return to_route('stok.index')->with('success', 'BHP Stock deleted successfully.');
    }
}
