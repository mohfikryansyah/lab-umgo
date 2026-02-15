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
        Schema::create('bhp_stock', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('nama_bahan');
            $table->string('foto_bahan');
            $table->integer('jumlah_stok');
            $table->enum('satuan', ['botol', 'pcs', 'box']);
            $table->date('tanggal_kadaluarsa');
            $table->string('supplier');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bhp_stock');
    }
};
