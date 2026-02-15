import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import useBoolean from '@/hooks/use-boolean';
import stok from '@/routes/stok';
import { BHPStock, BreadcrumbItem } from '@/types';
import { useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { Edit } from 'lucide-react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import FormBHPStok from './form-stock-bhp';
import { FormBHPStokType, SatuanFormBHPStok } from '../../peminjaman/interface/peminjaman';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface EditStockBHPProps {
    bhpstock: BHPStock;
}

export default function EditStockBHP({ bhpstock }: EditStockBHPProps) {
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
        nama_bahan: bhpstock.nama_bahan,
        satuan: bhpstock.satuan as SatuanFormBHPStok,
        foto_bahan: null,
        jumlah_stok: bhpstock.jumlah_stok,
        tanggal_kadaluarsa: bhpstock.tanggal_kadaluarsa,
        supplier: bhpstock.supplier,
        _method: 'PATCH',
    });

    transform((data) => {
        const transformedData: any = {
            ...data,
            tanggal_kadaluarsa: data.tanggal_kadaluarsa
                ? format(new Date(data.tanggal_kadaluarsa), 'yyyy-MM-dd')
                : undefined,
        };

        if (!data.foto_bahan) {
            delete transformedData.foto_bahan;
        }

        return transformedData;
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(stok.update(bhpstock.id).url, {
            onSuccess: () => {
                reset();
                isOpenDialogCreate.setFalse();
                toast.success('Stok BHP berhasil diperbarui.');
            },
            onError: (e) => {
                toast.error('Terjadi kesalahan saat memperbarui Stok BHP.');
                console.log(e);
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
                <Button
                    variant="ghost"
                    size="icon"
                    className="m-0 cursor-pointer hover:bg-yellow-100"
                >
                    <Edit className="size-4 text-yellow-600" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Stok BHP</DialogTitle>
                </DialogHeader>
                <div className="no-scrollbar -mx-4 max-h-[60vh] overflow-y-auto px-4">
                    <form id="BHPStock" onSubmit={submit}>
                        <FormBHPStok
                            data={data}
                            setData={setData}
                            errors={errors}
                            processing={processing}
                            existingImage={bhpstock.foto_bahan}
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
