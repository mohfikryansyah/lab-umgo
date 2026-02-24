import AppLayout from "@/layouts/app-layout";
import { Alat, BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import { AlatColumns } from "./columns";
import { DataTable } from "@/components/datatable/data-table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

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
    console.log(columns);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='Data Alat' />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className='bg-gray-100 dark:bg-[#171717]'>
                    <CardHeader>
                        <CardTitle>Data Alat</CardTitle>
                        <CardDescription>Data Alat</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable columns={columns} data={alats}>
                            {/* <CreateStock /> */}
                        </DataTable>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    )
};