import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import {
    ItemType,
    PeminjamanFormData,
} from '@/pages/menu/peminjaman/interface/peminjaman';
import peminjaman from '@/routes/peminjaman';
import { Alat, BHPStock, Jadwal } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';
import PeminjamanForm from './form-peminjaman';

interface CreateProps {
    bhpstocks: BHPStock[];
    alats: Alat[];
    jadwal_praktikum: Jadwal[];
}

export default function Create({ bhpstocks, alats, jadwal_praktikum }: CreateProps) {
    const form = useForm<PeminjamanFormData>({
        // tanggal_pinjam: undefined,
        items: [
            {
                item_type: 'bhp' as ItemType,
                item_id: '',
                jumlah: 1,
            },
        ],
        jadwal_id: '',
    });

    console.log(form.data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(peminjaman.store().url, {
            onSuccess: () => {
                toast.success('Berhasil melakukan peminjaman.');
            },
            onError: (errors) => {
                toast.error('Gagal melakukan peminjaman.');
                console.log(errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={[]}>
            <Head title="Peminjaman BHP" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>
                            Form Peminjaman Alat dan Bahan Habis Pakai
                        </CardTitle>
                        <CardDescription>
                            Silakan lengkapi formulir berikut, pastikan data
                            yang diisi sudah benar, termasuk jenis item dan
                            jumlah yang diperlukan, agar proses verifikasi dan
                            persetujuan dapat dilakukan dengan cepat dan akurat.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PeminjamanForm
                            form={form}
                            bhpstocks={bhpstocks}
                            alats={alats}
                            jadwal_praktikum={jadwal_praktikum}
                            onSubmit={handleSubmit}
                            submitLabel="Simpan Peminjaman"
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
