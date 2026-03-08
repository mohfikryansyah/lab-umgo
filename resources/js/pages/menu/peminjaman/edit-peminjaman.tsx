import {
    ItemType,
    PeminjamanFormData,
} from '@/pages/menu/peminjaman/interface/peminjaman';
import peminjaman from '@/routes/peminjaman';
import { Alat, BHPStock } from '@/types';
import { useForm } from '@inertiajs/react';
import React from 'react';
import toast from 'react-hot-toast';
import PeminjamanBhpForm from './form-peminjaman';

interface CreateProps {
    bhpstocks: BHPStock[];
    peminjaman_bhp: any;
    alats: Alat[];
}

export default function EditPeminjamanBHP({
    alats,
    bhpstocks,
    peminjaman_bhp,
}: CreateProps) {
    const form = useForm<PeminjamanFormData>({
        tanggal_pinjam: undefined,
        items: [
            {
                item_type: 'bhp' as ItemType,
                item_id: '',
                jumlah: 1,
            },
        ],
        judul_praktikum: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(peminjaman.store().url, {
            onSuccess: () => {
                toast.success('Berhasil melakukan peminjaman.');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };

    return (
        <>
            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Tambah Peminjaman BHP
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Isi form di bawah untuk membuat peminjaman BHP
                                baru
                            </p>
                        </div>

                        <div className="p-6">
                            <PeminjamanBhpForm
                                alats={alats}
                                form={form}
                                bhpstocks={bhpstocks}
                                onSubmit={handleSubmit}
                                submitLabel="Simpan Peminjaman"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
