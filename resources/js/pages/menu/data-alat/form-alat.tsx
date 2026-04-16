import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { KondisiAlat, SatuanAlat } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { UploadIcon } from 'lucide-react';
import { useRef, useState } from 'react';
import { KondisiAlatOptions, SatuanOptions } from './helpers';
import { FormAlatType } from './interface-alat';

interface FormAlatProps {
    data: FormAlatType;
    setData: InertiaFormProps<FormAlatType>['setData'];
    errors: InertiaFormProps<FormAlatType>['errors'];
    processing: boolean;
    existingImage?: string;
}

export default function FormAlat({
    data,
    setData,
    errors,
    processing,
    existingImage,
}: FormAlatProps) {
    const inputFotoBahan = useRef<HTMLInputElement>(null);
    const [previewFotoBahan, setPreviewFotoBahan] = useState<string>('');

    return (
        <div className="space-y-4">
            <div className="grid w-full gap-2">
                <Label>Nama Alat</Label>
                <Input
                    onChange={(e) => setData('nama_alat', e.target.value)}
                    value={data.nama_alat}
                />
                <InputError message={errors.nama_alat} />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="grid w-full gap-2">
                    <Label>Nomor Inventaris</Label>
                    <Input
                        onChange={(e) =>
                            setData('nomor_inventaris', e.target.value)
                        }
                        value={data.nomor_inventaris}
                    />
                    <InputError message={errors.nomor_inventaris} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Tempat Penyimpanan</Label>
                    <Input
                        onChange={(e) =>
                            setData('tempat_penyimpanan', e.target.value)
                        }
                        value={data.tempat_penyimpanan}
                    />
                    <InputError message={errors.tempat_penyimpanan} />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label>Deskripsi Alat</Label>
                <Textarea
                    onChange={(e) => setData('deskripsi_alat', e.target.value)}
                    value={data.deskripsi_alat}
                />
                <InputError message={errors.deskripsi_alat} />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
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
                            setData('satuan', value as SatuanAlat)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih satuan" />
                        </SelectTrigger>
                        <SelectContent>
                            {SatuanOptions.map((satuan) => (
                                <SelectItem
                                    key={satuan.value}
                                    value={satuan.value}
                                >
                                    {satuan.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.satuan} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Kondisi Alat</Label>
                    <Select
                        value={data.kondisi_alat}
                        onValueChange={(value) =>
                            setData('kondisi_alat', value as KondisiAlat)
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Pilih Kondisi Alat" />
                        </SelectTrigger>
                        <SelectContent>
                            {KondisiAlatOptions.map((kondisi_alat) => (
                                <SelectItem
                                    key={kondisi_alat.value}
                                    value={kondisi_alat.value}
                                >
                                    {kondisi_alat.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.kondisi_alat} />
                </div>
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
                            alt={data.nama_alat}
                            className="z-30 size-62.5 w-full rounded-xl object-cover ring-4 ring-white"
                            onClick={(e) => {
                                e.stopPropagation();
                                inputFotoBahan.current?.click();
                            }}
                        />
                        <InputError
                            className="mb-2"
                            message={errors.foto_alat}
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
                                Upload Foto Alat
                            </span>

                            <span className="relative z-10 text-xs text-yellow-600/80">
                                JPG, PNG (maks. 2MB)
                            </span>
                        </div>
                        <span className="text-sm text-gray-400">
                            Foto harus berformat .JPG
                        </span>
                        <InputError
                            className="mb-2"
                            message={errors.foto_alat}
                        />
                    </>
                )}
            </div>
            <Input
                ref={inputFotoBahan}
                id="foto_alat"
                name="foto_alat"
                type="file"
                accept="image/*"
                className="hidden"
                disabled={processing}
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setData('foto_alat', file);

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
