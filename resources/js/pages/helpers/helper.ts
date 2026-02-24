import { format } from "date-fns";
import { id } from "date-fns/locale";

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