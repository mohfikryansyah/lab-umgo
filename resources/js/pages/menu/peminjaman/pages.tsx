import { DataTable } from '@/components/datatable/data-table';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {
    Alat,
    BHPStock,
    BreadcrumbItem,
    Peminjaman,
    PeminjamanItem,
} from '@/types';
import { Head, Link } from '@inertiajs/react';
import { PeminjamanColumns } from './columns-peminjaman';

import { Button } from '@/components/ui/button';
import peminjamanRoute from '@/routes/peminjaman';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGEPeminjaman({
    bhpstocks,
    peminjaman,
    peminjaman_items,
    alats,
}: {
    bhpstocks: BHPStock[];
    peminjaman: Peminjaman[];
    peminjaman_items: PeminjamanItem[];
    alats: Alat[];
}) {
    const columns = PeminjamanColumns(peminjaman, peminjaman_items);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Peminjaman BHP" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Peminjaman Bahan Habis Pakai</CardTitle>
                        <CardDescription>
                            Daftar peminjaman bahan habis pakai yang telah
                            dilakukan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={peminjaman}>
                            <Link href={peminjamanRoute.create()}>
                                <Button variant={'default'}>
                                    Buat Peminjaman
                                </Button>
                            </Link>
                        </DataTable>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
