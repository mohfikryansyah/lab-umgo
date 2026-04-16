import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Activity, HeartPulse, Hospital, Microscope, Stethoscope } from 'lucide-react';

export const SatuanBHPStock = [
    { label: 'pcs', value: 'pcs' },
    { label: 'box', value: 'box' },
    { label: 'botol', value: 'botol' },
];

export const getColorForStatus = (status: string) => {
        switch (status) {
            case 'Pending':
                return 'bg-yellow-500 text-yellow-100';
            case 'Disetujui':
                return 'bg-blue-500 text-blue-100';
            case 'Ditolak':
                return 'bg-red-500 text-red-100';
            case 'Selesai':
                return 'bg-green-500 text-green-100';
            default:
                return 'bg-neutral-800 text-white';
        }
    };

export function formatTanggalIndo(dateString: string) {
  const parsed = new Date(dateString.replace(" ", "T"));

  return format(
    parsed,
    "EEEE, dd MMMM yyyy 'pada pukul' HH:mm",
    { locale: id }
  );
}
export function formatTanggalIndo2(dateString: string) {
  const parsed = new Date(dateString.replace(" ", "T"));

  return format(
    parsed,
    "EEEE, dd MMMM yyyy",
    { locale: id }
  );
}

export const getColorForTipeLaporan = (tipe: string) => {
    switch (tipe) {
        case 'Harian':
            return 'bg-green-500 text-green-100';
        case 'Mingguan':
            return 'bg-blue-500 text-blue-100';
        case 'Bulanan':
            return 'bg-yellow-500 text-yellow-100';
        case 'Insiden':
            return 'bg-purple-500 text-purple-100';
        default:
            return 'bg-neutral-800 text-white';
    }
};

export const getColorForStatusJadwal = (status: string) => {
    switch (status) {
        case 'Selesai':
            return 'bg-green-500 text-green-100';
        case 'Terjadwal':
            return 'bg-blue-500 text-blue-100';
        default:
            return 'bg-neutral-800 text-white';
    }
}

export const STRLimit = (text: string, maxLength: number) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
}


export function getFileType(path: string) {
    const ext = path.split('.').pop()?.toLowerCase()

    if (ext === 'pdf') return 'pdf'
    if (ext === 'doc' || ext === 'docx') return 'word'

    return 'unknown'
}

export function getColorForStatusAbsensi(status: string) {
    switch (status) {
        case 'Hadir':
            return 'bg-green-500 text-green-100';
        case 'Izin':
            return 'bg-yellow-500 text-yellow-100';
        case 'Sakit':
            return 'bg-blue-500 text-blue-100';
        case 'Alpa':
            return 'bg-red-500 text-red-100';
        default:
            return 'bg-neutral-800 text-white';
    }
}

export const prodi = [
        {
            title: 'Keperawatan',
            label: 'Keperawatan',
            icon: Stethoscope
        },
        {
            title: 'Kebidanan',
            Label: 'Kebidanan',
            icon: HeartPulse
        },
        {
            title: 'Teknologi Laboratorium Medis',
            label: 'Teknologi Laboratorium Medis',
            icon: Microscope
        },
        {
            title: 'Informatika Medis',
            label: 'Informatika Medis',
            icon: Hospital
        },
        {
            title: 'D-IV Anestesi',
            label: 'D-IV Anestesi',
            icon: Activity,
        }
    ];