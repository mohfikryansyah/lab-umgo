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
import { LaporanTipe } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { FormLaporanType, LaporanTipeOptions } from './interface';
import FileUploadField from '@/components/custom/file-upload-field';

interface Props {
    data: FormLaporanType;
    setData: InertiaFormProps<FormLaporanType>['setData'];
    errors: InertiaFormProps<FormLaporanType>['errors'];
    processing?: boolean;
}

export default function FormLaporan({ data, setData, errors }: Props) {
    return (
        <div className="space-y-4">
            <div className="grid w-full gap-2">
                <Label>Judul Laporan</Label>
                <Input onChange={(e) => setData('judul', e.target.value)} value={data.judul} />
                <InputError message={errors.judul} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Deskripsi</Label>
                <Textarea
                    onChange={(e) => setData('deskripsi', e.target.value)}
                    value={data.deskripsi}
                />
                <InputError message={errors.deskripsi} />
            </div>
            <div className="grid w-full gap-2">
                <Label>Tipe Laporan</Label>
                <Select
                    value={data.tipe}
                    onValueChange={(value) =>
                        setData('tipe', value as LaporanTipe)
                    }
                >
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih tipe" />
                    </SelectTrigger>
                    <SelectContent>
                        {LaporanTipeOptions.map((tipe) => (
                            <SelectItem key={tipe.value} value={tipe.value}>
                                {tipe.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <InputError message={errors.tipe} />
            </div>
            <div className="grid w-full gap-2">
                <FileUploadField
                    label="Upload Dokumen"
                    value={data.file_laporan}
                    accept=".pdf,.doc,.docx"
                    error={errors.file_laporan}
                    onChange={(file) => setData('file_laporan', file)}
                />
            </div>
        </div>
    );
}
