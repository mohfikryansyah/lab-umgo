import { Peminjaman } from "../../../../types";

export type ItemType = 'bhp' | 'alat';

export interface BhpStock {
  id: string;
  nama_bhp: string;
  jumlah: number;
  satuan?: string;
}

export interface PeminjamanItemAddItem {
    item_type: ItemType;
    item_id: string;
    jumlah: number;
}

export interface PeminjamanFormData {
  // tanggal_pinjam: string | Date | undefined;
  jadwal_id: string;
  items: PeminjamanItemAddItem[];
}

export interface PeminjamanProps {
  bhpStocks: BhpStock[];
  peminjaman?: Peminjaman;
  errors?: Record<string, string>;
}

export type FormBHPStokType = {
    nama_bahan: string;
    satuan: SatuanFormBHPStok;
    foto_bahan: File | string | null;
    jumlah_stok: number;
    tanggal_kadaluarsa: Date | undefined;
    supplier: string;
    _method?: 'PUT' | 'PATCH' | 'DELETE'; 
};

export type SatuanFormBHPStok = 'botol' | 'pcs' | 'box'; 

export type PeminjamanForm = {
  tanggal_pinjam: string;
  items: PeminjamanItemAddItem[];
};