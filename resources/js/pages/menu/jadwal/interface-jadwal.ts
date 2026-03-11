import { User } from "@/types";

export interface  FormJadwalType {
    judul_jadwal: string;
    deskripsi_jadwal: string;
    waktu: string | Date | undefined;
    ruangan_jadwal: string;
    penanggung_jawab_id: number | null;
    status: ENUMStatusJadwal;
    _method?: 'PUT' | 'PATCH' | 'DELETE'; 
}

export type ENUMStatusJadwal = 'Terjadwal' | 'Selesai'

export const ENUMStatusJadwalForSelect = [
    {
        value: 'Terjadwal',
        label: 'Terjadwal'
    },
    {
        value: 'Selesai',
        label: 'Selesai'
    },
]