import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Peminjaman, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { AlertCircleIcon } from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import BarangDipinjam from './components/barang-dipinjam';
import { formatTanggalIndo } from '@/pages/helpers/helper';

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
    const getInitials = useInitials();
    const { errors, flash } = usePage<SharedData>().props;

    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            toast.error(
                errors.status || 'Terjadi kesalahan saat memproses peminjaman.',
            );
        }

        if (flash.success) {
            toast.success(flash.success);
        }
    }, [errors]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Detail Peminjaman BHP" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="">
                    <p className="text-lg font-semibold">
                        Ringkasan Peminjaman
                    </p>
                    <p className="text-sm text-gray-500">
                        {formatTanggalIndo(peminjaman.tanggal_pinjam)}
                    </p>
                </div>
                {Object.keys(errors).length > 0 && (
                    <Alert variant={'destructive'}>
                        <AlertCircleIcon />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>
                            <ul className="list-inside list-disc">
                                {Object.values(errors).map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </AlertDescription>
                    </Alert>
                )}
                <div className="grid lg:grid-cols-6 grid-cols-1 lg:gap-4 gap-y-4">
                    <BarangDipinjam peminjaman={peminjaman} />
                    <Card className="col-span-2 max-h-fit w-full">
                        <CardHeader className="border-b pb-5 text-center text-sidebar">
                            <CardTitle>Profil Peminjam</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-center p-0">
                            <div className="w-full">
                                <Avatar className="mx-auto size-32 overflow-hidden rounded-full">
                                    <AvatarImage
                                        src={peminjaman.user.avatar}
                                        alt={peminjaman.user.name}
                                    />
                                    <AvatarFallback className="rounded-lg bg-neutral-200 text-xl text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(peminjaman.user.name)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="mt-4 text-center">
                                    <p className="truncate font-medium">
                                        {peminjaman.user.name}
                                    </p>
                                    <p className="truncate text-gray-400">
                                        {peminjaman.user.email}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
