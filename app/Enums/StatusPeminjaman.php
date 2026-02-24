<?php

namespace App\Enums;

enum StatusPeminjaman: string
{
    case Pending = 'Pending';
    case Disetujui = 'Disetujui';
    case Ditolak = 'Ditolak';
    case Selesai = 'Selesai';
}