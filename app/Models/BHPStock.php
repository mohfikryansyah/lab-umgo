<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BHPStock extends Model
{
    /** @use HasFactory<\Database\Factories\BHPStockFactory> */
    use HasFactory, HasUuids, SoftDeletes;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'bhp_stock';

    
}
