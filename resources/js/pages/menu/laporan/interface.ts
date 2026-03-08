import { LaporanTipe } from "@/types";

export interface  FormLaporanType {
    judul: string;
    deskripsi: string;
    file_laporan: File | null;
    tipe: LaporanTipe;
    // tanggal_melapor: Date | undefined;
    _method?: 'PUT' | 'PATCH' | 'DELETE'; 
}

export const LaporanTipeOptions = [
    {
        value: 'Harian',
        label: 'Harian',
    },
    {
        value: 'Mingguan',
        label: 'Mingguan',
    },
    {
        value: 'Bulanan',
        label: 'Bulanan',
    },
    {
        value: 'Insiden',
        label: 'Insiden',
    }
]