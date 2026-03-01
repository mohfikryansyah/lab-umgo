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
import dataAlat from '@/routes/data-alat';
import { Alat, BreadcrumbItem, KondisiAlat, SatuanAlat } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import FormAlat from './form-alat';
import { FormAlatType } from './interface-alat';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function EditAlat({ alat }: { alat: Alat }) {
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
        nama_alat: alat.nama_alat,
        satuan: alat.satuan as SatuanAlat,
        foto_alat: null,
        jumlah_stok: alat.jumlah_stok,
        nomor_inventaris: alat.nomor_inventaris,
        deskripsi_alat: alat.deskripsi_alat,
        kondisi_alat: alat.kondisi_alat as KondisiAlat,
        tempat_penyimpanan: alat.tempat_penyimpanan,
        _method: 'PATCH',
    });

    transform((data) => {
        const transformedData: any = {
            ...data,
        };

        if (!data.foto_alat) {
            delete transformedData.foto_alat;
        }

        return transformedData;
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(dataAlat.update(alat.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Data alat berhasil diperbarui');
                reset();
            },
            onError: (e) => {
                toast.error(
                    'Gagal memperbarui alat. Pastikan semua data sudah benar dan coba lagi.',
                );
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Ubah Data Alat" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Ubah Alat</CardTitle>
                        <CardDescription>
                            Isi formulir dibawah ini dengan benar.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form id="create-alat" onSubmit={submit}>
                            <FormAlat
                                data={data}
                                errors={errors}
                                processing={processing}
                                setData={setData}
                                existingImage={alat.foto_alat}
                            ></FormAlat>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            form="create-alat"
                            disabled={processing || !isDirty}
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
