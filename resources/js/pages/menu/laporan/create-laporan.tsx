import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import laporan from '@/routes/laporan';
import { BreadcrumbItem, LaporanTipe } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import FormLaporan from './form-laporan';
import { FormLaporanType } from './interface';
import { Separator } from '@/components/ui/separator';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function CreateLaporan() {
    const { data, setData, post, errors, processing, reset } =
        useForm<FormLaporanType>({
            judul: '',
            deskripsi: '',
            file_laporan: null,
            tipe: '' as LaporanTipe,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(laporan.store().url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Laporan berhasil dibuat.');
                reset();
            },
            onError: () => {
                toast.error(
                    'Gagal membuat laporan. Pastikan semua data sudah benar dan coba lagi.',
                );
                console.log(errors);
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Form Pembuatan Laporan</CardTitle>
                        <CardDescription>
                            Silakan isi informasi laporan secara lengkap dan
                            akurat. Pastikan data yang dimasukkan sudah benar
                            sebelum dikirim agar proses verifikasi dapat
                            berjalan dengan lancar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} id="create-laporan">
                            <FormLaporan
                                data={data}
                                setData={setData}
                                errors={errors}
                            />
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button form="create-laporan">Buat Laporan</Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
