import { KondisiAlat, SatuanAlat } from "@/types";

export interface FormAlatType {
    nama_alat: string;
    deskripsi_alat: string;
    foto_alat: File | null;
    jumlah_stok: number;
    nomor_inventaris: string;
    satuan: SatuanAlat;
    kondisi_alat: KondisiAlat;
    tempat_penyimpanan: string;
    _method?: 'PUT' | 'PATCH' | 'DELETE'; 
}

