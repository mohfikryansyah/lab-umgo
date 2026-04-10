import { Absensi, ENUMStatusAbsensi, Jadwal } from "@/types";

export interface FilterAbsensi {
    search_name: string;
    search_prodi: string;
    filter_status: ENUMStatusAbsensi;
    filter_date: string;
}

export interface AbsensiPageProps {
    absensis: Absensi[];
    praktikum: Jadwal;
    filters: FilterAbsensi;
}