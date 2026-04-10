'use client';

import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Absensi, Alat } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// import EditStockAlat from './edit-stock-bhp';
import { Button } from '@/components/ui/button';
import { formatTanggalIndo, getColorForStatusAbsensi, STRLimit } from '@/pages/helpers/helper';
import dataAlat from '@/routes/data-alat';
import { Link } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';

export const AbsensiColumns = (absensis: Absensi[]): ColumnDef<Absensi>[] => [
    {
        accessorKey: 'staf.name',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Staf" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'staf.id_staf',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="ID Staf" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'staf.prodi',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Program Studi" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'waktu_masuk',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Waktu Masuk" />
        ),
        cell: ({ row }) => {
            const waktuMasuk = row.original.waktu_masuk;
            return <span>{formatTanggalIndo(waktuMasuk)}</span>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge className={getColorForStatusAbsensi(status)}>
                    {status}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'keterangan',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Keterangan" />
        ),
        cell: ({ row }) => {
            const keterangan = row.original.keterangan ?? '-';
            return <span>{STRLimit(keterangan, 20)}</span>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    }
];
