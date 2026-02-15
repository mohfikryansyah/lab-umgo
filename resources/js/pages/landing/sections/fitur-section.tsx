import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import {
    Bell,
    Boxes,
    CalendarDays,
    ClipboardCheck,
    FileText,
    Wrench,
} from 'lucide-react';
import { motion } from 'motion/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function FiturSection() {
    const fitur = [
        {
            title: 'Jadwal Praktikum',
            description:
                'Jadwal praktikum terbaru dengan informasi waktu, ruang, dan mata praktikum yang jelas.',
            icon: CalendarDays,
        },
        {
            title: 'Absensi',
            description:
                'Pengelolaan fasilitas dan peralatan laboratorium secara terpusat dan terstruktur.',
            icon: ClipboardCheck,
        },
        {
            title: 'Stok BHP',
            description:
                'Pendataan mahasiswa praktikum yang rapi dan mudah diakses kapan saja.',
            icon: Boxes,
        },
        {
            title: 'Data Alat',
            description:
                'Pencatatan kehadiran praktikum secara cepat, akurat, dan terdokumentasi.',
            icon: Wrench,
        },
        {
            title: 'Laporan',
            description:
                'Rekap dan laporan kegiatan praktikum dalam format yang informatif.',
            icon: FileText,
        },
        {
            title: 'Notifikasi',
            description:
                'Konfigurasi sistem laboratorium sesuai kebutuhan program studi.',
            icon: Bell,
        },
    ];

    return (
        <section id="fitur" className="relative bg-white px-6 py-8 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="space-y-6 text-center">
                    {/* <h1 className="lg:text-3xl md:text-xl text-lg">Fitur Utama</h1> */}
                    <Heading
                        classNameTitle="text-3xl text-yellow-400"
                        classNameDescription="text-lg"
                        title="Fitur Utama"
                        description="Sistem terintegrasi untuk mengelola seluruh aspek laboratorium kesehatan dengan efisien dan efektif"
                    ></Heading>

                    <div className="grid gap-6 text-start md:grid-cols-3">
                        {fitur.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 50 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.7,
                                                ease: 'easeOut',
                                            },
                                        },
                                    }}
                                    whileHover={{ scale: 1.03 }}
                                    className="space-y-4 rounded-lg border p-6 shadow-lg transition hover:shadow-xl"
                                >
                                    <div className="inline-block rounded-lg bg-sky-100 p-3">
                                        <Icon className="size-7 text-sky-800" />
                                    </div>

                                    <p className="text-lg font-bold">
                                        {item.title}
                                    </p>

                                    <p className="text-gray-600">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
