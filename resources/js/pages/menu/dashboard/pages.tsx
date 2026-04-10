import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit } from '@/routes/profile';
import { Jadwal, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertTriangleIcon,
    BookOpen,
    Boxes,
    SunDim,
    Wrench,
} from 'lucide-react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import ClockInCard from '../absensi/clock_in';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    praktikum: Jadwal;
    absensiHariIni: boolean;
}

export default function DashboardPage({
    praktikum,
    absensiHariIni,
}: DashboardProps) {
    const { errors } = usePage().props;

    useEffect(() => {
        if (errors.absensi) {
            toast.error(errors.absensi);
        }
    });

    const { totalBHPMenipis } = usePage<{ totalBHPMenipis: number }>().props;
    const { totalAlatRusak } = usePage<{ totalAlatRusak: number }>().props;
    const { totalPeminjamanAktif } = usePage<{ totalPeminjamanAktif: number }>()
        .props;

    const ringkasan = [
        {
            title: 'Total BHP',
            value: totalBHPMenipis,
            icon: Boxes,
        },
        {
            title: 'Total Alat Rusak',
            value: totalAlatRusak,
            icon: Wrench,
        },
        {
            title: 'Total Peminjaman Aktif',
            value: totalPeminjamanAktif,
            icon: BookOpen,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Alert className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-50">
                    <AlertTriangleIcon />
                    <AlertTitle>
                        Your subscription will expire in 3 days.
                    </AlertTitle>
                    <AlertDescription>
                        Renew now to avoid service interruption or upgrade to a
                        paid plan to continue using the service.
                    </AlertDescription>
                </Alert>

                <div className="flex gap-6">
                    <div className="w-72 shrink-0 rounded-xl border border-gray-100 bg-gray-50 p-4">
                        <div className="flex items-center">
                            <SunDim className="size-14" />
                            <div className="ml-2">
                                <p className="text-xl text-gray-500">
                                    08:22:22
                                </p>
                                <p className="font-medium">
                                    Rabu, 08 April 2026
                                </p>
                            </div>
                        </div>
                        <div className="mt-20">
                            <p className="font-medium">Selamat Pagi,</p>
                            <p className="text-lg">Muhammad Fadhlan</p>
                        </div>
                        <Link href={edit()}>
                            <Button className="mt-6 w-full">
                                Pengaturan Akun
                            </Button>
                        </Link>
                    </div>
                    <div className="grid flex-1 grid-cols-3 gap-6 rounded-xl">
                        {ringkasan.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    className="flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50 p-4"
                                    key={index}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-4xl font-bold">
                                            420
                                        </p>
                                        <div className="rounded-full bg-gray-200 p-2">
                                            <Icon />
                                        </div>
                                    </div>
                                    <p className="text-lg font-medium">
                                        Total BHP
                                    </p>
                                </div>
                            );
                        })}
                        {ringkasan.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    className="flex flex-col justify-between rounded-xl border border-gray-100 bg-gray-50 p-4"
                                    key={index}
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-4xl font-bold">
                                            420
                                        </p>
                                        <div className="rounded-full bg-gray-200 p-2">
                                            <Icon />
                                        </div>
                                    </div>
                                    <p className="text-lg font-medium">
                                        Total BHP
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {praktikum && absensiHariIni !== true && (
                    <ClockInCard praktikum={praktikum} />
                )}
            </div>
        </AppLayout>
    );
}
