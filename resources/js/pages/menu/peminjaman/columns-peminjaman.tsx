'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { Peminjaman as PeminjamanTypes, PeminjamanItem as PeminjamanItemTypes } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// import EditStockBHP from './edit-stock-bhp';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import peminjaman from '@/routes/peminjaman';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Eye } from 'lucide-react';

export const PeminjamanColumns = (
    peminjaman_bhp: PeminjamanTypes[],
    peminjaman_bhp_items: PeminjamanItemTypes[],
): ColumnDef<PeminjamanTypes>[] => [
    {
        accessorKey: 'peminjaman_bhp.user.avatar',
        header: 'Peminjam',
        cell: ({ row }) => {
            const getInitials = useInitials();
            const user = row.original.user;
            return (
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                        {user.avatar ? (
                            <AvatarImage
                                key={user.avatar}
                                src={'/storage/' + user.avatar}
                                alt={user.name}
                            />
                        ) : (
                            <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                                {getInitials(user.name)}
                            </AvatarFallback>
                        )}
                    </Avatar>
                    <span>{user.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'tanggal_pinjam',
        accessorFn: (row) =>
            format(new Date(row.tanggal_pinjam), 'EEEE, dd MMM yyyy', {
                locale: id,
            }),
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Tanggal Pinjam" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'judul_praktikum',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Judul Praktikum" />
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

            const handleDeleteRow = (peminjamanParams: PeminjamanTypes) => {
                deleteItem(peminjaman.destroy(peminjamanParams.id));
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
                    <Link href={peminjaman.show(row.original.id)}>
                        <Button
                            size={'icon'}
                            className="m-0 cursor-pointer hover:bg-yellow-200 bg-yellow-100"
                        >
                            <Eye className='text-yellow-500'/>
                        </Button>
                    </Link>
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Data Peminjaman BHP"
                        key={row.original.id}
                    />
                    {/* <EditStockBHP
                        bhpstock={row.original}
                        key={`${row.original.id}-${row.original.nama_bahan}`}
                    /> */}
                    <Button className='bg-sidebar'>Konfirmasi</Button>
                </div>
            );
        },
    },
];
