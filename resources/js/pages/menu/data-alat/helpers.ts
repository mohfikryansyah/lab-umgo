import { KondisiAlat } from "@/types";

export const KondisiAlatOptions = [
    { label: 'Baik', value: 'Baik' },
    { label: 'Rusak Ringan', value: 'Rusak Ringan' },
    { label: 'Rusak Berat', value: 'Rusak Berat' },
];

export const SatuanOptions = [
    { label: 'Buah', value: 'buah' },
    { label: 'Unit', value: 'unit' },
    { label: 'Pcs', value: 'pcs' },
    { label: 'Set', value: 'set' },
];

export const getColorForKondisiAlat = (kondisi_alat: KondisiAlat) => {
    switch (kondisi_alat) {
        case 'Baik':
            return 'bg-green-100 text-green-500 border border-green-500'
        case 'Rusak Ringan':
                return 'bg-yellow-100 text-yellow-500 border border-yellow-500'
        case 'Rusak Berat':
            return 'bg-red-100 text-red-500 border border-red-500'
        default: 
            return 'bg-neutral-100 text-neutral-500 border border-neutral-500'
    }
}