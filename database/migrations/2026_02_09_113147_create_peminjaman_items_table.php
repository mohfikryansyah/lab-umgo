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
        Schema::create('peminjaman_items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('peminjaman_id')->constrained('peminjaman')->cascadeOnDelete();
            $table->enum('item_type', ['bhp', 'alat']);
            $table->uuid('item_id');
            $table->integer('jumlah')->default(1);

            $table->timestamp('tanggal_dikembalikan')->nullable();
            $table->enum('kondisi_kembali', ['Baik', 'Rusak Ringan', 'Rusak Berat']);
            
            $table->timestamps();
            
            $table->index(['item_type', 'item_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('peminjaman_items');
    }
};
