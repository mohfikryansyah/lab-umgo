<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PeminjamanBHP extends Model
{
    /** @use HasFactory<\Database\Factories\PeminjamanBHPFactory> */
    use HasFactory, HasUuids;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'peminjaman_bhp';
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(PeminjamanBHPItem::class, 'peminjaman_bhp_id');
    }
}
