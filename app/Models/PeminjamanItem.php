<?php

namespace App\Models;

use App\Models\BHPStock;
use App\Models\DataAlat;
use App\Models\Peminjaman;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PeminjamanItem extends Model
{
    /** @use HasFactory<\Database\Factories\PeminjamanItemFactory> */
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $keyType = 'string';
    public $incrementing = false;
    protected $table = 'peminjaman_items';

    public function peminjaman()
    {
        return $this->belongsTo(Peminjaman::class);
    }

    public function bhp()
    {
        return $this->belongsTo(BHPStock::class, 'item_id')->withTrashed();
    }

    public function alat()
    {
        return $this->belongsTo(DataAlat::class, 'item_id')->withTrashed();
    }
}
