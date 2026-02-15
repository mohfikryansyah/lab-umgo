import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGENotifikasi() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='' />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <h1>NOTIFIKASI</h1>
            </div>
        </AppLayout>
    )
};