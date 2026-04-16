import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { edit } from '@/routes/profile';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    AlertTriangle,
    BookOpen,
    Boxes,
    CheckCircle2,
    ChevronRight,
    Clock,
    FileText,
    Settings,
    SunDim,
    Wrench,
    XCircle,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

// ─── Types ───────────────────────────────────────────────────────────────────

interface Jadwal {
    id: string;
    nama_praktikum: string;
    ruangan: string;
    jam_mulai: string;
    jam_selesai: string;
    dosen: string;
}

interface BhpItem {
    id: string;
    nama_bahan: string;
    jumlah_stok: number;
    satuan: string;
    tanggal_kadaluarsa: string;
    persen_stok: number;
    level: 'kritis' | 'rendah';
}

interface AlatItem {
    id: string;
    nama_alat: string;
    kondisi_alat: 'Baik' | 'Rusak Ringan' | 'Rusak Berat';
    nomor_inventaris: string;
    tempat_penyimpanan: string;
}

interface PeminjamanItem {
    id: string;
    nama_peminjam: string;
    judul_praktikum: string;
    status: 'Pending' | 'Disetujui' | 'Ditolak' | 'Selesai';
    tanggal_pinjam: string;
    jumlah_item: number;
    initials: string;
}

interface LaporanItem {
    id: string;
    judul: string;
    tipe: 'Harian' | 'Mingguan' | 'Bulanan' | 'Insiden';
    tanggal_melapor: string;
    pelapor: string;
}

interface DashboardProps {
    totalBHPMenipis: number;
    totalAlatRusak: number;
    totalPeminjamanAktif: number;
    bhpMenipis: BhpItem[];
    alatBermasalah: AlatItem[];
    peminjamanTerbaru: PeminjamanItem[];
    laporanTerbaru: LaporanItem[];
    praktikum: Jadwal | null;
    absensiHariIni: boolean;
}

// ─── Breadcrumbs ─────────────────────────────────────────────────────────────

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function useRealTimeClock() {
    const [now, setNow] = useState(new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return now;
}

function pad(n: number) {
    return String(n).padStart(2, '0');
}

function greeting(date: Date) {
    const h = date.getHours();
    if (h < 11) return 'Selamat pagi';
    if (h < 15) return 'Selamat siang';
    if (h < 18) return 'Selamat sore';
    return 'Selamat malam';
}

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const MONTHS = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

function formatDate(d: Date) {
    return `${DAYS[d.getDay()]}, ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StatCard({
    value,
    label,
    icon: Icon,
    iconBg,
    iconColor,
    trend,
    trendColor,
}: {
    value: number;
    label: string;
    icon: React.ElementType;
    iconBg: string;
    iconColor: string;
    trend: string;
    trendColor: string;
}) {
    return (
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-white/10 dark:bg-gray-900">
            <div className="flex items-start justify-between">
                <p className="text-4xl font-semibold text-gray-900 dark:text-white">
                    {value}
                </p>
                <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{ backgroundColor: iconBg }}
                >
                    <Icon className="h-5 w-5" style={{ color: iconColor }} />
                </div>
            </div>
            <div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {label}
                </p>
                <p className="mt-1 text-xs font-medium" style={{ color: trendColor }}>
                    {trend}
                </p>
            </div>
        </div>
    );
}

function SectionCard({
    title,
    children,
    action,
    actionHref,
}: {
    title: string;
    children: React.ReactNode;
    action?: string;
    actionHref?: string;
}) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-gray-900">
            <div className="flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                    {title}
                </h2>
                {action && actionHref && (
                    <Link
                        href={actionHref}
                        className="flex items-center gap-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                        {action}
                        <ChevronRight className="h-3 w-3" />
                    </Link>
                )}
            </div>
            {children}
        </div>
    );
}

// Badge helpers
const kondisiConfig = {
    'Rusak Berat': { bg: '#FEE2E2', color: '#991B1B', dot: '#EF4444' },
    'Rusak Ringan': { bg: '#FEF3C7', color: '#92400E', dot: '#F59E0B' },
    Baik: { bg: '#D1FAE5', color: '#065F46', dot: '#10B981' },
};

const statusConfig = {
    Pending: { bg: '#FEF3C7', color: '#92400E' },
    Disetujui: { bg: '#D1FAE5', color: '#065F46' },
    Ditolak: { bg: '#FEE2E2', color: '#991B1B' },
    Selesai: { bg: '#F3F4F6', color: '#374151' },
};

const tipeConfig = {
    Harian: { bg: '#DBEAFE', color: '#1E40AF' },
    Mingguan: { bg: '#EDE9FE', color: '#5B21B6' },
    Bulanan: { bg: '#D1FAE5', color: '#065F46' },
    Insiden: { bg: '#FEE2E2', color: '#991B1B' },
};

const avatarColors = [
    { bg: '#D1FAE5', color: '#065F46' },
    { bg: '#EDE9FE', color: '#5B21B6' },
    { bg: '#FEF3C7', color: '#92400E' },
    { bg: '#DBEAFE', color: '#1E40AF' },
    { bg: '#FCE7F3', color: '#9D174D' },
];

function avatarColor(name: string) {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + hash * 31;
    return avatarColors[Math.abs(hash) % avatarColors.length];
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function DashboardPage({
    totalBHPMenipis,
    totalAlatRusak,
    totalPeminjamanAktif,
    bhpMenipis,
    alatBermasalah,
    peminjamanTerbaru,
    laporanTerbaru,
    praktikum,
    absensiHariIni,
}: DashboardProps) {
    const { errors, auth } = usePage<{
        errors: Record<string, string>;
        auth: { user: { name: string } };
    }>().props;

    const now = useRealTimeClock();
    const clockStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;

    const [absenLoading, setAbsenLoading] = useState(false);

    useEffect(() => {
        if (errors.absensi) toast.error(errors.absensi);
    }, [errors]);

    function handleAbsen() {
        if (!praktikum) return;
        setAbsenLoading(true);
        router.post(
            '/absensi',
            { jadwal_id: praktikum.id },
            { onFinish: () => setAbsenLoading(false) },
        );
    }

    const userName = auth?.user?.name ?? 'Pengguna';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-5">

                {/* ── Top bar ─────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-4">

                    {/* Greeting + name */}
                    <div className="flex items-center gap-4">
                        <div
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                            style={avatarColor(userName)}
                        >
                            {userName
                                .split(' ')
                                .slice(0, 2)
                                .map((w) => w[0])
                                .join('')
                                .toUpperCase()}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400">{greeting(now)}</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {userName}
                            </p>
                        </div>
                    </div>

                    {/* Clock + settings */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-3 rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-sm dark:border-white/10 dark:bg-gray-900">
                            <SunDim className="h-5 w-5 text-amber-400" />
                            <div>
                                <p className="font-mono text-xl font-semibold tabular-nums text-gray-900 dark:text-white">
                                    {clockStr}
                                </p>
                                <p className="text-xs text-gray-400">{formatDate(now)}</p>
                            </div>
                        </div>
                        <Link href={edit()}>
                            <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-white shadow-sm transition hover:bg-gray-50 dark:border-white/10 dark:bg-gray-900 dark:hover:bg-gray-800">
                                <Settings className="h-4 w-4 text-gray-500" />
                            </button>
                        </Link>
                    </div>
                </div>

                {/* ── Clock-in banner ──────────────────────────────────── */}
                {praktikum && !absensiHariIni && (
                    <div className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 dark:border-emerald-900/40 dark:bg-emerald-950/30">
                        <div className="flex items-center gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 dark:bg-emerald-900/50">
                                <Clock className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-xs text-emerald-600 dark:text-emerald-400">
                                    Praktikum hari ini
                                </p>
                                <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                                    {praktikum.nama_praktikum}
                                </p>
                                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                    {praktikum.jam_mulai}–{praktikum.jam_selesai} &middot;{' '}
                                    {praktikum.ruangan} &middot; {praktikum.dosen}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleAbsen}
                            disabled={absenLoading}
                            className="shrink-0 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
                        >
                            {absenLoading ? 'Menyimpan…' : 'Absen Masuk'}
                        </button>
                    </div>
                )}

                {/* ── Stat cards ──────────────────────────────────────── */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <StatCard
                        value={totalBHPMenipis}
                        label="BHP stok menipis"
                        icon={Boxes}
                        iconBg="#FEF3C7"
                        iconColor="#D97706"
                        trend="Perlu restock segera"
                        trendColor="#B45309"
                    />
                    <StatCard
                        value={totalAlatRusak}
                        label="Alat rusak / bermasalah"
                        icon={Wrench}
                        iconBg="#FEE2E2"
                        iconColor="#DC2626"
                        trend="Butuh perhatian"
                        trendColor="#991B1B"
                    />
                    <StatCard
                        value={totalPeminjamanAktif}
                        label="Peminjaman aktif"
                        icon={BookOpen}
                        iconBg="#DBEAFE"
                        iconColor="#2563EB"
                        trend="Sedang berjalan"
                        trendColor="#1D4ED8"
                    />
                </div>

                {/* ── Row 2: BHP + Alat ───────────────────────────────── */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    {/* BHP menipis */}
                    <SectionCard title="BHP stok rendah" action="Lihat semua" actionHref="/bahan-habis-pakai">
                        <div className="flex flex-col gap-3">
                            {bhpMenipis.length === 0 && (
                                <p className="text-sm text-gray-400">Semua stok BHP aman.</p>
                            )}
                            {bhpMenipis.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {item.nama_bahan}
                                            </p>
                                            <span
                                                className="ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
                                                style={
                                                    item.level === 'kritis'
                                                        ? { background: '#FEE2E2', color: '#991B1B' }
                                                        : { background: '#FEF3C7', color: '#92400E' }
                                                }
                                            >
                                                {item.jumlah_stok} {item.satuan}
                                            </span>
                                        </div>
                                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${item.persen_stok}%`,
                                                    background:
                                                        item.level === 'kritis' ? '#EF4444' : '#F59E0B',
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </SectionCard>

                    {/* Alat bermasalah */}
                    <SectionCard title="Kondisi alat" action="Lihat semua" actionHref="/data-alat">
                        <div className="flex flex-col gap-2">
                            {alatBermasalah.length === 0 && (
                                <p className="text-sm text-gray-400">Semua alat dalam kondisi baik.</p>
                            )}
                            {alatBermasalah.map((item) => {
                                const cfg = kondisiConfig[item.kondisi_alat];
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-3 rounded-xl p-2.5"
                                        style={{ background: '#F9FAFB' }}
                                    >
                                        <div
                                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                                            style={{ background: cfg.dot }}
                                        />
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {item.nama_alat}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {item.nomor_inventaris} &middot; {item.tempat_penyimpanan}
                                            </p>
                                        </div>
                                        <span
                                            className="shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold"
                                            style={{ background: cfg.bg, color: cfg.color }}
                                        >
                                            {item.kondisi_alat}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionCard>
                </div>

                {/* ── Row 3: Peminjaman + Laporan ─────────────────────── */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">

                    {/* Peminjaman terbaru */}
                    <SectionCard
                        title="Peminjaman terbaru"
                        action="Lihat semua"
                        actionHref="/peminjaman"
                    >
                        <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800">
                            {peminjamanTerbaru.length === 0 && (
                                <p className="text-sm text-gray-400">Belum ada peminjaman.</p>
                            )}
                            {peminjamanTerbaru.map((p) => {
                                const avc = avatarColor(p.nama_peminjam);
                                const sc = statusConfig[p.status];
                                return (
                                    <div
                                        key={p.id}
                                        className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                                    >
                                        <div
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold"
                                            style={avc}
                                        >
                                            {p.initials}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {p.nama_peminjam}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {p.judul_praktikum} &middot; {p.jumlah_item} item &middot;{' '}
                                                {p.tanggal_pinjam}
                                            </p>
                                        </div>
                                        <span
                                            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                            style={{ background: sc.bg, color: sc.color }}
                                        >
                                            {p.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionCard>

                    {/* Laporan terbaru */}
                    <SectionCard
                        title="Laporan terbaru"
                        action="Lihat semua"
                        actionHref="/laporan"
                    >
                        <div className="flex flex-col divide-y divide-gray-50 dark:divide-gray-800">
                            {laporanTerbaru.length === 0 && (
                                <p className="text-sm text-gray-400">Belum ada laporan.</p>
                            )}
                            {laporanTerbaru.map((l) => {
                                const tc = tipeConfig[l.tipe];
                                const isInsiden = l.tipe === 'Insiden';
                                return (
                                    <div
                                        key={l.id}
                                        className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
                                    >
                                        <div
                                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                                            style={{ background: tc.bg }}
                                        >
                                            {isInsiden ? (
                                                <AlertTriangle
                                                    className="h-4 w-4"
                                                    style={{ color: tc.color }}
                                                />
                                            ) : (
                                                <FileText
                                                    className="h-4 w-4"
                                                    style={{ color: tc.color }}
                                                />
                                            )}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-800 dark:text-gray-200">
                                                {l.judul}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {l.tanggal_melapor} &middot; {l.pelapor}
                                            </p>
                                        </div>
                                        <span
                                            className="shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                            style={{ background: tc.bg, color: tc.color }}
                                        >
                                            {l.tipe}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </SectionCard>
                </div>

            </div>
        </AppLayout>
    );
}