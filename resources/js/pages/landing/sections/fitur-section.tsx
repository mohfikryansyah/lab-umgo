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
        <section id="fitur" className="relative bg-white px-6 pb-8 lg:pb-16">
            <div className="container mx-auto px-4">
                <div className="space-y-6 text-center">
                    <Heading
                        classNameTitle="text-3xl lg:text-4xl font-bold text-[#243673]"
                        classNameDescription="text-lg text-gray-600 max-w-3xl mx-auto"
                        title="Fitur Utama"
                        description="Sistem terintegrasi untuk mengelola seluruh aspek laboratorium kesehatan dengan efisien dan efektif"
                    />

                    <div className="grid gap-6 text-start md:grid-cols-3">
                        {fitur.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <motion.div
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 40 },
                                        show: {
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                duration: 0.6,
                                                ease: 'easeOut',
                                            },
                                        },
                                    }}
                                    whileHover={{ y: -4 }}
                                    className="group relative space-y-5 overflow-hidden rounded-xl border border-[#243673]/20 bg-linear-to-br from-[#243673]/5 via-white to-[#243673]/10 p-6 shadow-md transition-all duration-300 hover:border-[#243673]/40 hover:shadow-xl"
                                >
                                    {/* icon */}
                                    <div className="flex size-12 items-center justify-center rounded-lg bg-[#243673]/10 transition-all duration-300 group-hover:bg-[#243673]">
                                        <Icon className="size-6 text-[#243673] group-hover:text-white" />
                                    </div>

                                    <p className="text-lg font-semibold text-[#243673]">
                                        {item.title}
                                    </p>

                                    <p className="text-sm leading-relaxed text-gray-600">
                                        {item.description}
                                    </p>

                                    <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#243673] transition-all duration-300 group-hover:w-full" />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
