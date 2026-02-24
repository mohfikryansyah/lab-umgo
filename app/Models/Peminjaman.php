<?php

namespace App\Models;

use App\Enums\StatusPeminjaman;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    /** @use HasFactory<\Database\Factories\PeminjamanFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'peminjaman';
    protected $casts = [
        'status' => StatusPeminjaman::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function items()
    {
        return $this->hasMany(PeminjamanItem::class);
    }
}
