import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function FormAbsensi() {
    return (
        <div className="space-y-4">
            <div className="grid w-full gap-4">
                <Label></Label>
                <Input></Input>
            </div>
        </div>
    )
};