'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Laporan } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// import EditStockLaporan from './edit-stock-bhp';
import laporanRoute from '@/routes/laporan';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { getColorForTipeLaporan, STRLimit } from '@/pages/helpers/helper';
import { Paginated } from '@/types/paginate';
import { Edit } from 'lucide-react';

export const LaporanColumns = (laporans: Paginated<Laporan>): ColumnDef<Laporan>[] => [
    {
        accessorKey: 'judul',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Judul Laporan" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'deskripsi',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Deskripsi" />
        ),
        cell: ({ row }) => {
            const deskripsi = row.original.deskripsi;
            return (
                <div className="max-h-20 overflow-hidden text-ellipsis" title={deskripsi}>
                    {STRLimit(deskripsi, 20)}
                </div>
            );
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'tanggal_melapor',
        accessorFn: (row) =>
            format(new Date(row.tanggal_melapor), 'EEEE, dd MMM yyyy', {
                locale: id,
            }),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Melapor" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'tipe',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tipe Laporan" />
        ),
        cell: ({ row }) => {
            const tipe_laporan = row.original.tipe;

            return (
                <Badge className={getColorForTipeLaporan(tipe_laporan)}>
                    {tipe_laporan}
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

            const handleDeleteRow = (laporan: Laporan) => {
                deleteItem(laporanRoute.destroy(laporan.id));
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
                    {/* <ShowLaporan
                        alat={row.original}
                        key={`${row.original.id}-${row.original.nomor_inventaris}`}
                    /> */}
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Data Laporan"
                        key={row.original.id}
                    />
                    <Link href={laporanRoute.edit(row.original.id)}>
                        <Button size={'icon'} className='bg-yellow-400'>
                            <Edit/>
                        </Button>
                    </Link>
                </div>
            );
        },
    },
];
