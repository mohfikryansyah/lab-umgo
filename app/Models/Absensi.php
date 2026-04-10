<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absensi extends Model
{
    /** @use HasFactory<\Database\Factories\AbsensiFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;

    public function staf()
    {
        return $this->belongsTo(User::class, 'staf_id');
    }
}
