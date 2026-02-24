import { DataTable } from '@/components/datatable/data-table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BHPStock, BreadcrumbItem, PeminjamanItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BHPStockColumns } from './columns';
import CreateStockBHP from './create-stock-bhp';
import PeminjamanBhpForm from '../../peminjaman/form-peminjaman';
import { useState } from 'react';
import Create from '../../peminjaman/create-peminjaman';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGEStockBHP({ bhpstocks }: { bhpstocks: BHPStock[] }) {
    const columns = BHPStockColumns(bhpstocks);

    const bhpStockSupplier = Array.from(new Set(bhpstocks.map((item) => item.supplier)));

    const bhpStockSupplierOptions = bhpStockSupplier.map((supplier) => ({
        label: supplier,
        value: supplier,
    }));
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Data Bahan Habis Pakai" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className='bg-gray-100 dark:bg-[#171717]'>
                    <CardHeader>
                        <CardTitle>Stok Bahan Habis Pakai</CardTitle>
                        <CardDescription>Inventaris Bahan Habis Pakai Laboratorium</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={bhpstocks} titleFilter='Supplier' optionsFilter={bhpStockSupplierOptions} columnFilter='supplier'>
                            <CreateStockBHP />
                        </DataTable>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
