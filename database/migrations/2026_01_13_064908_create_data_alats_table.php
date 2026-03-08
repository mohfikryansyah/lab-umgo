<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_alats', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_alat');
            $table->string('deskripsi_alat');
            $table->string('foto_alat');
            $table->string('tempat_penyimpanan');
            $table->integer('jumlah_stok'); 
            $table->string('nomor_inventaris')->unique();
            $table->enum('satuan', ['buah']);
            $table->enum('kondisi_alat', ['Baik', 'Rusak Ringan', 'Rusak Berat']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_alats');
    }
};
 