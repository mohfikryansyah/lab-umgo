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
        Schema::create('absensis', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('staf_id')->constrained('users', 'id')->cascadeOnDelete();
            $table->foreignUuid('jadwal_id')->constrained('jadwals', 'id')->cascadeOnDelete();
            $table->dateTime('waktu_masuk');
            $table->dateTime('waktu_keluar')->nullable();
            $table->enum('status', ['Hadir', 'Izin', 'Sakit', 'Alpa']);
            $table->string('keterangan')->nullable();
            $table->string('waktu_terlambat')->default('-');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('absensis');
    }
};
