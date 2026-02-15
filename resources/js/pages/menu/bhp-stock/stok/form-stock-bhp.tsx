import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useBoolean from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { SatuanBHPStock } from '@/pages/helpers/helper';
import { BHPStock, BreadcrumbItem } from '@/types';
import { FormBHPStokType, SatuanFormBHPStok } from '@/types/interface-form';
import { InertiaFormProps } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface FormBHPStokProps {
    data: FormBHPStokType;
    setData: InertiaFormProps<FormBHPStokType>['setData'];
    errors: InertiaFormProps<FormBHPStokType>['errors'];
    bhpstock?: BHPStock[];
    processing?: boolean;
    existingImage?: string;
}

export default function FormBHPStok({
    data,
    setData,
    errors,
    bhpstock,
    processing,
    existingImage,
}: FormBHPStokProps) {
    const [dropdown, setDropdown] =
        useState<React.ComponentProps<typeof Calendar>['captionLayout']>(
            'dropdown',
        );
    const [date, setDate] = useState<Date | undefined>(new Date());

    const isOpenCalendar = useBoolean(false);

    const inputFotoBahan = useRef<HTMLInputElement>(null);
    const [previewFotoBahan, setPreviewFotoBahan] = useState<string>('');

    return (
        <div className="space-y-4">
            <div className="grid w-full gap-2">
                <Label>Nama Bahan</Label>
                <Input
                    onChange={(e) => setData('nama_bahan', e.target.value)}
                    value={data.nama_bahan}
                />
                <InputError message={errors.nama_bahan} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Jumlah Stok</Label>
                <Input
                    type="number"
                    onChange={(e) =>
                        setData('jumlah_stok', parseInt(e.target.value))
                    }
                    value={data.jumlah_stok}
                ></Input>
                <InputError message={errors.jumlah_stok} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Satuan</Label>
                <Select
                    value={data.satuan}
                    onValueChange={(value) =>
                        setData('satuan', value as SatuanFormBHPStok)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih satuan" />
                    </SelectTrigger>
                    <SelectContent>
                        {SatuanBHPStock.map((satuan) => (
                            <SelectItem key={satuan.value} value={satuan.value}>
                                {satuan.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.satuan} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Tanggal Kadaluarsa</Label>
                <Popover
                    modal={true}
                    open={isOpenCalendar.state}
                    onOpenChange={isOpenCalendar.setState}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full bg-transparent pl-3 text-left font-normal',
                                !data.tanggal_kadaluarsa &&
                                    'text-muted-foreground',
                            )}
                        >
                            {data.tanggal_kadaluarsa ? (
                                format(data.tanggal_kadaluarsa, 'PPP', {
                                    locale: id,
                                })
                            ) : (
                                <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            required
                            selected={data.tanggal_kadaluarsa}
                            onSelect={(date) => {
                                setData('tanggal_kadaluarsa', date);
                                isOpenCalendar.setFalse();
                            }}
                            defaultMonth={date}
                            captionLayout={dropdown}
                            className="rounded-lg border shadow-sm"
                        />
                    </PopoverContent>
                </Popover>
                <InputError message={errors.tanggal_kadaluarsa} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Supplier</Label>
                <Input
                    onChange={(e) => setData('supplier', e.target.value)}
                    value={data.supplier}
                ></Input>
                <InputError message={errors.supplier} />
            </div>

            <div className="grid w-full gap-2">
                {previewFotoBahan || existingImage ? (
                    <>
                        <img
                            src={
                                previewFotoBahan
                                    ? previewFotoBahan
                                    : '/storage/' + existingImage
                            }
                            alt={data.nama_bahan}
                            className="z-30 size-62.5 w-full rounded-xl object-cover ring-4 ring-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                inputFotoBahan.current?.click();
                            }}
                        />
                        <InputError
                            className="mb-2"
                            message={errors.foto_bahan}
                        />
                    </>
                ) : (
                    <>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                inputFotoBahan.current?.click();
                            }}
                            className="group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-yellow-300 bg-linear-to-br from-yellow-50 to-yellow-100 transition-all duration-300 ease-out hover:border-yellow-400 hover:from-yellow-100 hover:to-yellow-200 hover:shadow-lg active:scale-[0.98]"
                        >
                            {/* Glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-yellow-400/10 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100" />

                            <UploadIcon className="relative z-10 size-10 text-yellow-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />

                            <span className="relative z-10 text-sm font-semibold text-yellow-700 transition-colors duration-300 group-hover:text-yellow-800">
                                Upload Foto Bahan
                            </span>

                            <span className="relative z-10 text-xs text-yellow-600/80">
                                JPG, PNG (maks. 2MB)
                            </span>
                        </div>
                        <span className='text-gray-400 text-sm'>Foto harus berformat .JPG</span>
                        <InputError
                            className="mb-2"
                            message={errors.foto_bahan}
                        />
                    </>
                )}
            </div>
            <Input
                ref={inputFotoBahan}
                id="foto_bahan"
                name="foto_bahan"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={processing}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setData('foto_bahan', file);

                        const reader = new FileReader();
                        reader.onload = (ev) => {
                            setPreviewFotoBahan(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                    }
                }}
            />
        </div>
    );
}
