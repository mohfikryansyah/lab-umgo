<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class PeminjamanBHPItem extends Model
{
    use HasUuids;
    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'peminjaman_bhp_items';

    public function peminjamanBHP()
    {
        return $this->belongsTo(PeminjamanBHP::class, 'peminjaman_bhp_id');
    }

    public function bhp()
    {
        return $this->belongsTo(BHPStock::class, 'bhp_stock_id');
    }
}
