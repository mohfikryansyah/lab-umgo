'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Alat } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// import EditStockAlat from './edit-stock-bhp';
import { Badge } from '@/components/ui/badge';
import dataAlat from '@/routes/data-alat';
import { getColorForKondisiAlat } from './helpers';
import ShowAlat from './show-alat';
import EditAlat from './edit-alat';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export const AlatColumns = (alats: Alat[]): ColumnDef<Alat>[] => [
    {
        accessorKey: 'foto_alat',
        header: 'Foto Alat',
        cell: ({ row }) => {
            const fotoAlat = '/storage/' + row.original.foto_alat;
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <img
                            src={fotoAlat}
                            alt={row.original.nama_alat}
                            className="size-10"
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <img
                            src={fotoAlat}
                            alt={row.original.nama_alat}
                            className="max-h-[60vh] w-full"
                        />
                    </DialogContent>
                </Dialog>
            );
        },
    },
    {
        accessorKey: 'nama_alat',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Alat" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'nomor_inventaris',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nomor Inventaris" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'jumlah_stok',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Stok" />
        ),
        cell: ({ row }) => {
            const jumlahStok = row.original.jumlah_stok;
            const satuan = row.original.satuan;
            return <div>{`${jumlahStok} ${satuan}`}</div>;
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'tempat_penyimpanan',
        header: 'Tempat Penyimpanan',
    },
    {
        accessorKey: 'kondisi_alat',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Kondisi Alat" />
        ),
        cell: ({ row }) => {
            const kondisiAlat = row.original.kondisi_alat;

            return (
                <Badge className={getColorForKondisiAlat(kondisiAlat)}>
                    {kondisiAlat}
                </Badge>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (alat: Alat) => {
                deleteItem(dataAlat.destroy(alat.id));
            };

            useEffect(() => {
                if (isDeleting) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }, [handleDeleteRow, isDeleting]);

            return (
                <div className="flex items-center gap-2">
                    <ShowAlat
                        alat={row.original}
                        key={`${row.original.id}-${row.original.nomor_inventaris}`}
                    />
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Data Alat"
                        key={row.original.id}
                    />
                    <Link href={dataAlat.edit(row.original.id)}>
                        <Button size={'icon'}>Edit</Button>
                    </Link>
                </div>
            );
        },
    },
];
