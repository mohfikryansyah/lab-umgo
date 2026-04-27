'use client';

import DeleteDialog from '@/components/custom/delete-dialog';
import { DataTableColumnHeader } from '@/components/datatable/data-table-column-header';
import { useDeleteWithToast } from '@/hooks/use-delete';
import {
    PeminjamanItem as PeminjamanItemTypes,
    Peminjaman as PeminjamanTypes,
    SharedData,
} from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { useEffect, useState } from 'react';
// import EditStockBHP from './edit-stock-bhp';
import WarningDialog from '@/components/custom/warning-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import { usePeminjamanAction } from '@/hooks/use-peminjaman-action';
import peminjamanRoute from '@/routes/peminjaman';
import { Link, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getColorForStatusPeminjaman } from '@/pages/helpers/helper';

export const PeminjamanColumns = (
    peminjaman: PeminjamanTypes[],
    peminjaman_items: PeminjamanItemTypes[],
): ColumnDef<PeminjamanTypes>[] => [
    {
        accessorKey: 'peminjaman.user.avatar',
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
        accessorKey: 'jadwal.judul_jadwal',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Judul Praktikum" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Status" />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <Badge className={getColorForStatusPeminjaman(status)}>{status}</Badge>
            )
        }
    },
    {
        id: 'actions',
        header: 'Aksi',
        cell: ({ row }) => {
            const [disableButton, setDisableButton] = useState<boolean>(false);
            const { deleteItem, isDeleting } = useDeleteWithToast();

            const handleDeleteRow = (peminjamanParams: PeminjamanTypes) => {
                deleteItem(peminjamanRoute.destroy(peminjamanParams.id));
            };

            const {
                handleApprove,
                approveProcessing,
                handleDecline,
                declineProcessing,
                handleComplete,
                completeProcessing,
            } = usePeminjamanAction(row.original);

            const { flash } = usePage<SharedData>().props;

            useEffect(() => {
                if (isDeleting) {
                    setDisableButton(true);
                } else {
                    setDisableButton(false);
                }
            }, [handleDeleteRow, isDeleting]);

            return (
                <div className="flex items-center gap-2">
                    <Link href={peminjamanRoute.show(row.original.id)}>
                        <Button
                            size={'icon'}
                            className="m-0 cursor-pointer bg-yellow-100 hover:bg-yellow-200"
                        >
                            <Eye className="text-yellow-500" />
                        </Button>
                    </Link>
                    <DeleteDialog
                        isProcessing={disableButton}
                        onDelete={() => handleDeleteRow(row.original)}
                        title="Hapus Data Peminjaman BHP"
                        key={row.original.id}
                    />
                    {row.original.status === 'Pending' && (
                        <>
                            <WarningDialog
                                title="Tolak Permintaan Peminjaman"
                                description="Apakah Anda yakin ingin menolak permintaan peminjaman ini?"
                                onConfirm={handleDecline}
                                isProcessing={declineProcessing}
                            />
                            <Button
                                size="sm"
                                className="cursor-pointer bg-sidebar hover:bg-sidebar/90"
                                disabled={approveProcessing}
                                onClick={handleApprove}
                            >
                                Konfirmasi
                            </Button>
                        </>
                    )}

                    {row.original.status === 'Disetujui' && (
                        <Button
                            size="sm"
                            disabled={completeProcessing}
                            onClick={handleComplete}
                        >
                            Selesaikan Peminjaman
                        </Button>
                    )}
                </div>
            );
        },
    },
];
