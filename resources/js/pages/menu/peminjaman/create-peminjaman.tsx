import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    ItemType,
    PeminjamanFormData,
} from '@/pages/menu/peminjaman/interface/peminjaman';
import peminjaman from '@/routes/peminjaman';
import { Alat, BHPStock } from '@/types';
import { useForm } from '@inertiajs/react';
import { PlusCircle } from 'lucide-react';
import React from 'react';
import toast from 'react-hot-toast';
import PeminjamanBhpForm from './form-peminjaman';

interface CreateProps {
    bhpstocks: BHPStock[];
    alats: Alat[];
}

export default function Create({ bhpstocks, alats }: CreateProps) {
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

    console.log(form.data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        form.post(peminjaman.store().url, {
            onSuccess: () => {
                toast.success('Berhasil melakukan peminjaman.');
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full bg-linear-to-br from-sidebar to-sidebar/30 transition-colors duration-300 hover:bg-primary/90 xl:w-fit">
                    <PlusCircle />
                    Buat Data Baru
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-3xl">
                <DialogHeader className="px-1">
                    <DialogTitle>
                        Form Peminjaman Alat dan Bahan Habis Pakai
                    </DialogTitle>
                    <DialogDescription>
                        Silakan lengkapi formulir berikut, pastikan data yang
                        diisi sudah benar, termasuk jenis item dan jumlah yang
                        diperlukan, agar proses verifikasi dan persetujuan dapat
                        dilakukan dengan cepat dan akurat.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <PeminjamanBhpForm
                        form={form}
                        bhpstocks={bhpstocks}
                        alats={alats}
                        onSubmit={handleSubmit}
                        submitLabel="Simpan Peminjaman"
                    />
                </div>
            </DialogContent>
        </Dialog>
    );
}
