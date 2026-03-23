import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: string;
    items?: {
        title: string;
        href: NonNullable<InertiaLinkProps['href']>;
    }[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    flash: {
        success?: string;
        error?: string;
    }
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Peminjaman {
    id: string;
    user_id: number;
    user: User;
    items: PeminjamanItem[];
    tanggal_pinjam: string;
    judul_praktikum: string;
    status: PeminjamanStatus;
    created_at: string;
    updated_at: string;
}

export type PeminjamanStatus = 'Disetujui' | 'Ditolak' | 'Pending' | 'Selesai';
export type PeminjamanItemKondisiKembali = 'Baik' | 'Rusak Ringan' | 'Rusak Berat';

export interface PeminjamanItem {
  id: string;
  item_type: ItemType;
  item_id: string;
  jumlah: number;
  bhp: BHPStock;
  alat: Alat;
  tanggal_dikembalikan?: Date;
  kondisi_kembali?: PeminjamanItemKondisiKembali;
  created_at: string;
  updated_at: string;
}

export interface Alat {
    id: string;
    nama_alat: string;
    deskripsi_alat: string;
    nomor_inventaris: string;
    foto_alat: string;
    tempat_penyimpanan: string;
    jumlah_stok: number;
    kondisi_alat: KondisiAlat;
    satuan: SatuanAlat;
    created_at: string;
    updated_at: string;
}

export type SatuanAlat = 'buah' | 'unit' | 'pcs' | 'set';

export type KondisiAlat = 'Baik' | 'Rusak Ringan' | 'Rusak Berat';

export interface BHPStock {
    id: string;
    nama_bahan: string;
    satuan: 'botol' | 'pcs' | 'box';
    foto_bahan: string;
    jumlah_stok: number;s
    tanggal_kadaluarsa: Date;
    supplier: string;
    created_at: string;
    updated_at: string;
}

export interface Laporan {
    id: string;
    pelapor_id: number;
    pelapor: User;
    judul: string;
    deskripsi: string;
    file_laporan: string;
    tanggal_melapor: string;
    tipe: LaporanTipe;
    created_at: string;
    updated_at: string;
}

export interface Jadwal {
    id: string;
    penanggung_jawab_id: number;
    penanggung_jawab: User;
    judul_jadwal: string;
    deskripsi_jadwal: string;
    waktu: string;
    ruangan_jadwal: string;
    status: ENUMStatus;
    created_at: string;
    updated_at: string;
}

export type ENUMStatus = 'Terjadwal' | 'Selesai';

export type LaporanTipe = 'Harian' | 'Mingguan' | 'Bulanan' | 'Insiden';