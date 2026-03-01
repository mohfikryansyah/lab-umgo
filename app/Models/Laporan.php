<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Laporan extends Model
{
    /** @use HasFactory<\Database\Factories\LaporanFactory> */
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;

    public function pelapor()
    {
        return $this->belongsTo(User::class, 'pelapor_id');
    }

    
}
