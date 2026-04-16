import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';

import { prodi as OptionProdi } from '@/pages/helpers/helper';

type SectionSearchProps = {
    defaultSearch?: string;
    onSearchChange?: (value: string) => void;

    defaultProdi?: string;
    onProdiChange?: (value: string) => void;

    defaultStatus?: string;
    onStatusChange?: (value: string) => void;

    defaultDate?: string;
    onDateChange?: (value: string) => void;
};

export default function SectionSearch({
    defaultSearch = '',
    onSearchChange,
    defaultProdi = 'all',
    onProdiChange,
    defaultStatus = 'all',
    onStatusChange,
    defaultDate = '',
    onDateChange,
}: SectionSearchProps) {
    const [search, setSearch] = useState(defaultSearch);
    const [prodi, setProdi] = useState('all');
    const [status, setStatus] = useState('all');
    const [date, setDate] = useState('');

    const handleChange = (val: string) => {
        setSearch(val);
        onSearchChange?.(val);
    };

    return (
        <div className="grid gap-4 rounded-lg border border-gray-200 bg-transparent p-6 shadow-md lg:grid-cols-4">
            <div className="grid gap-2">
                <Label>Nama atau ID</Label>
                <Input
                    className="bg-gray-50"
                    placeholder="Cari nama atau ID..."
                    value={search}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <div className="grid gap-2">
                <Label>Program Studi</Label>
                <Select
                    value={defaultProdi}
                    onValueChange={(val) => {
                        setProdi(val);
                        onProdiChange?.(val);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Semua Program Studi" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Program Studi</SelectItem>
                        {OptionProdi.map((p, index) => {
                            const Icon = p.icon;
                            return (
                                <SelectItem value={p.title} key={index}>
                                    {p.label}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Status</Label>
                <Select
                    value={defaultStatus}
                    onValueChange={(val) => {
                        setStatus(val);
                        onStatusChange?.(val);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Semua Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Status</SelectItem>
                        <SelectItem value="Hadir">Hadir</SelectItem>
                        <SelectItem value="Tidak Hadir">Tidak Hadir</SelectItem>
                        <SelectItem value="Izin">Izin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-2">
                <Label>Tanggal</Label>
                <Input
                    type="date"
                    className="bg-gray-50"
                    value={defaultDate}
                    onChange={(e) => onDateChange?.(e.target.value)}
                />
            </div>
        </div>
    );
}
