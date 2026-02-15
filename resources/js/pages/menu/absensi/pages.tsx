import Heading from '@/components/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGEAbsensi() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi Mahasiswa" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Absensi Mahasiswa"
                    description="Kelola dan pantau kehadiran mahasiswa"
                />
                <div className="grid gap-4 rounded-lg border border-gray-200 bg-transparent p-6 shadow-md lg:grid-cols-4">
                    <div className="grid gap-2">
                        <Label>Nama Mahasiswa</Label>
                        <Input
                            className="bg-gray-50"
                            placeholder="Cari nama mahasiswa..."
                            name='nama'
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label>Program Studi</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Semua Program Studi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Program Studi
                                </SelectItem>
                                <SelectItem value="Kebidanan">
                                    Kebidanan
                                </SelectItem>
                                <SelectItem value="Keperawatan">
                                    Keperawatan
                                </SelectItem>
                                <SelectItem value="Teknologi Laboratorium Medis">
                                    Teknologi Laboratorium Medis
                                </SelectItem>
                                <SelectItem value="Informatika Medis">
                                    Informatika Medis
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Status</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Semua Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    Semua Status
                                </SelectItem>
                                <SelectItem value="Hadir">Hadir</SelectItem>
                                <SelectItem value="Tidak Hadir">
                                    Tidak Hadir
                                </SelectItem>
                                <SelectItem value="Izin">Izin</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid gap-2">
                        <Label>Tanggal</Label>
                        <Input type="date" className="bg-gray-50" />
                    </div>
                </div>
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    s
                </div>
            </div>
        </AppLayout>
    );
}
