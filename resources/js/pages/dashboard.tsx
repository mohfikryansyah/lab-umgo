import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Jadwal, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import ClockInCard from './menu/absensi/clock_in';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    praktikum: Jadwal;
}

export default function Dashboard({ praktikum }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {praktikum && (
                    <ClockInCard praktikum={praktikum} />
                )}
            </div>
        </AppLayout>
    );
}
