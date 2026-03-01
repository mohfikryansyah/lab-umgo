import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Approve() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Approve Peminjaman</CardTitle>
                <CardDescription>Approve atau tolak peminjaman yang diajukan oleh pengguna</CardDescription>
            </CardHeader>
            <CardContent>
                
            </CardContent>
        </Card>
    )
};