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
import laporanRoute from '@/routes/laporan';
import { BreadcrumbItem, Laporan, LaporanTipe } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import FormLaporan from './form-laporan';
import { FormLaporanType } from './interface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function EditLaporan({ laporan }: { laporan: Laporan }) {
    const { data, setData, post, errors, processing, reset, transform } =
        useForm<FormLaporanType>({
            judul: laporan.judul,
            deskripsi: laporan.deskripsi,
            file_laporan: null,
            tipe: laporan.tipe as LaporanTipe,
            _method: 'PATCH',
        });

    transform((data) => {
        const transformedData: any = {
            ...data,
        };

        if (!data.file_laporan) {
            delete transformedData.file_laporan;
        }

        return transformedData;
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(laporanRoute.update(laporan).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Laporan berhasil diubah.');
                reset();
            },
            onError: () => {
                toast.error(
                    'Gagal membuat laporan. Pastikan semua data sudah benar dan coba lagi.',
                );
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Laporan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Form Ubah Laporan</CardTitle>
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
                        <Button form="create-laporan">Ubah Laporan</Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
