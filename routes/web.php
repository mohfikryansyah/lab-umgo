<?php

use App\Http\Controllers\AbsensiController;
use App\Http\Controllers\BHP\BHPStockController;
use App\Http\Controllers\BHP\PeminjamanBHPController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataAlat\DataAlatController;
use App\Http\Controllers\JadwalController;
use App\Http\Controllers\LaporanController;
use App\Http\Controllers\NotifikasiController;
use App\Http\Controllers\Peminjaman\PeminjamanController;
use App\Models\Absensi;
use App\Models\Jadwal;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('landing/pages', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::resource('absensi', AbsensiController::class);
    Route::resource('jadwal', JadwalController::class);
    Route::resource('data-alat', DataAlatController::class)->parameters([
        'data-alat' => 'alat'
    ]);
    Route::resource('laporan', LaporanController::class);
    Route::get('/laporan/{laporan}/view-document', [LaporanController::class, 'viewDocument'])->name('laporan.view-document');
    Route::get('/laporan/{laporan}/file', [LaporanController::class, 'serveFile'])->name('laporan.serve-file');

    Route::resource('notifikasi', NotifikasiController::class);

    Route::patch(
        '/peminjaman/{peminjaman}/approve',
        [PeminjamanController::class, 'handleApprove']
    )->name('peminjaman.approve');

    Route::patch(
        '/peminjaman/{peminjaman}/decline',
        [PeminjamanController::class, 'handleDecline']
    )->name('peminjaman.decline');

    Route::patch(
        '/peminjaman/{peminjaman}/complete',
        [PeminjamanController::class, 'handleComplete']
    )->name('peminjaman.complete');

    Route::resource('peminjaman', PeminjamanController::class);

    Route::resource('bahan-habis-pakai', BHPStockController::class)->parameters([
        'bahan-habis-pakai' => 'bhpStock'
    ]);
});

require __DIR__ . '/settings.php';
