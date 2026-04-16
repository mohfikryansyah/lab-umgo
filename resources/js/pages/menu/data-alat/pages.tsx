import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import dataAlat from '@/routes/data-alat';
import { Alat, BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { AlatColumns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    alats: Alat[];
}

export default function DataAlat({ alats }: Props) {
    const columns = AlatColumns(alats);

    const kondisiAlat = Array.from(new Set(alats.map((item) => item.kondisi_alat)));

    const kondisiAlatOptions = kondisiAlat.map((supplier) => ({
        label: supplier,
        value: supplier,
    }));
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Alat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Data Alat</CardTitle>
                        <CardDescription>
                            Menampilkan daftar lengkap alat beserta informasi
                            stok, kondisi, dan lokasi penyimpanan.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={alats} columnFilter='kondisi_alat' titleFilter='Kondisi Alat' optionsFilter={kondisiAlatOptions}>
                            <Link href={dataAlat.create()}>
                                <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                                    Tambah Alat
                                </Button>
                            </Link>
                        </DataTable>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
