import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Peminjaman } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ShowPeminjamanBHP({
    peminjaman,
}: {
    peminjaman: Peminjaman;
}) {
    console.log(peminjaman);
    const getColorForStatus = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500 text-yellow-100';
            case 'Disetujui':
                return 'bg-blue-500 text-blue-100';
            case 'Ditolak':
                return 'bg-red-500 text-red-100';
            case 'Dikembalikan':
                return 'bg-green-500 text-green-100';
            default: return 'bg-neutral-800 text-white'
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Peminjaman BHP" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid grid-cols-4 gap-4">
                    <Card className="col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Detail Peminjaman</CardTitle>
                            <Badge className={getColorForStatus(peminjaman.status)}>{peminjaman.status}</Badge>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Nama Bahan</TableHead>
                                        <TableHead>
                                            Jumlah yang dipinjam
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {peminjaman.items.map((item) => {
                                        const currentName =
                                            item.item_type === 'bhp'
                                                ? item.bhp.nama_bahan
                                                : item.alat.nama_alat;

                                        const currentSatuan =
                                            item.item_type === 'bhp'
                                                ? item.bhp.satuan
                                                : item.alat.satuan;

                                        return (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    {currentName}
                                                </TableCell>
                                                <TableCell>{`${item.jumlah} ${currentSatuan}`}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent>
                            <img src="" alt="" />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
