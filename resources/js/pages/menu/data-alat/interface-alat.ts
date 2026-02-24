import { KondisiAlat } from "@/types";

export interface FormAlatType {
    nama_alat: string;
    deksripsi_alat: string;
    foto_alat: File | null;
    jumlah_stok: number;
    nomor_inventaris: string;
    satuan: 'buah';
    kondisi_alat: KondisiAlat;
    tempat_penyimpanan: string;
}

