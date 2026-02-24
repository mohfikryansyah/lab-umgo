import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import { BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { FormEventHandler } from 'react';
import FormBHPStok from './form-stock-bhp';
import toast from 'react-hot-toast';
import stok from '@/routes/stok';
import { FormBHPStokType, SatuanFormBHPStok } from '../../peminjaman/interface/peminjaman';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function CreateStockBHP() {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
        isDirty,
        transform,
    } = useForm<FormBHPStokType>({
        nama_bahan: '',
        satuan: 'pcs' as SatuanFormBHPStok,
        foto_bahan: null,
        jumlah_stok: 0,
        tanggal_kadaluarsa: undefined,
        supplier: '',
    });

    transform((data) => ({
        ...data,
        tanggal_kadaluarsa: data.tanggal_kadaluarsa
            ? format(new Date(data.tanggal_kadaluarsa), 'yyyy-MM-dd')
            : undefined,
    }));

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(stok.store().url, {
            onSuccess: () => {
                reset();
                isOpenDialogCreate.setFalse();
                toast.success('Data BHP berhasil ditambahkan.');
            },
            onError: () => {
                toast.error('Terjadi kesalahan saat menambahkan Data BHP.');
                console.log(errors)
            },
            forceFormData: true,
            preserveState: true,
            preserveScroll: true,
        });
    };

    const isOpenDialogCreate = useBoolean(false);

    return (
        <Dialog
            open={isOpenDialogCreate.state}
            onOpenChange={isOpenDialogCreate.setState}
        >
            <DialogTrigger asChild>
                <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:text-white dark:bg-blue-900/50">
                    Tambah Stok BHP
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl w-full">
                <DialogHeader>
                    <DialogTitle>Tambah Stok BHP</DialogTitle>
                    <DialogDescription>
                        Isi data bahan habis pakai yang akan ditambahkan ke stok
                        laboratorium. Pastikan jumlah, satuan, dan tanggal
                        kedaluwarsa sudah benar sebelum disimpan.
                    </DialogDescription>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
                    <form id="BHPStock" onSubmit={submit}>
                        <FormBHPStok
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                        />
                    </form>
                </div>
                <DialogFooter>
                    <Button form="BHPStock" disabled={processing || !isDirty}>
                        Simpan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
