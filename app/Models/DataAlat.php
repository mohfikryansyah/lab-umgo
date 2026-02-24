<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DataAlat extends Model
{
    /** @use HasFactory<\Database\Factories\DataAlatFactory> */
    use HasFactory, HasUuids, SoftDeletes;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'data_alats';
}
