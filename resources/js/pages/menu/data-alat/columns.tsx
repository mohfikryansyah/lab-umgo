'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Alat } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
// import EditStockAlat from './edit-stock-bhp';
import { Button } from '@/components/ui/button';
import dataAlat from '@/routes/data-alat';

export const AlatColumns = (
    alats: Alat[],
): ColumnDef<Alat>[] => [
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
                            className="w-full max-h-[60vh]"
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
        accessorKey: 'supplier',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Supplier" />
        ),
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
                <div className="flex gap-2 items-center">
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Data Alat"
                        key={row.original.id}
                    />
                    {/* <EditStockAlat
                        bhpstock={row.original}
                        key={`${row.original.id}-${row.original.nama_alat}`}
                    /> */}
                </div>
            );
        },
    },
];
