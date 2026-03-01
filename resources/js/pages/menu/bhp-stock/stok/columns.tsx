'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { BHPStock } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import EditStockBHP from './edit-stock-bhp';
import { Button } from '@/components/ui/button';
import bahanHabisPakai from '@/routes/bahan-habis-pakai';

export const BHPStockColumns = (
    bhpstock: BHPStock[],
): ColumnDef<BHPStock>[] => [
    {
        accessorKey: 'foto_bahan',
        header: 'Foto BHP',
        cell: ({ row }) => {
            const fotoBahan = '/storage/' + row.original.foto_bahan;
            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <img
                            src={fotoBahan}
                            alt={row.original.nama_bahan}
                            className="size-10"
                        />
                    </DialogTrigger>
                    <DialogContent>
                        <img
                            src={fotoBahan}
                            alt={row.original.nama_bahan}
                            className="w-full max-h-[60vh]"
                        />
                    </DialogContent>
                </Dialog>
            );
        },
    },
    {
        accessorKey: 'nama_bahan',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Nama Bahan" />
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
        accessorKey: 'tanggal_kadaluarsa',
        accessorFn: (row) =>
            format(new Date(row.tanggal_kadaluarsa), 'EEEE, dd MMM yyyy', {
                locale: id,
            }),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Kadaluarsa" />
        ),
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

            const handleDeleteRow = (bhpstock: BHPStock) => {
                deleteItem(bahanHabisPakai.destroy(bhpstock.id));
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
                        title="Hapus Data BHP"
                        key={row.original.id}
                    />
                    <EditStockBHP
                        bhpstock={row.original}
                        key={`${row.original.id}-${row.original.nama_bahan}`}
                    />
                </div>
            );
        },
    },
];
