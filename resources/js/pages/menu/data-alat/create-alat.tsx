import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem, KondisiAlat } from "@/types";
import { Head, useForm } from "@inertiajs/react";
import FormAlat from "./form-alat";
import { FormAlatType } from "./interface-alat";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function CreateAlat() {
    const {
            data,
            setData,
            post,
            processing,
            errors,
            reset,
            isDirty,
            transform,
        } = useForm<FormAlatType>({
            nama_alat: '',
            satuan: 'buah',
            foto_alat: null,
            jumlah_stok: 0,
            nomor_inventaris: '',
            deksripsi_alat: '',
            kondisi_alat: 'Baik' as KondisiAlat,
            tempat_penyimpanan: '',
        });
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title='' />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <form action="">
                    <FormAlat data={data} errors={errors} processing={processing} setData={setData} ></FormAlat>
                </form>
            </div>
        </AppLayout>
    )
};