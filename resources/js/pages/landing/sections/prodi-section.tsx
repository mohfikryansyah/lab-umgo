import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';
import { motion } from 'framer-motion';
import { HeartPulse, Hospital, Microscope, Stethoscope } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ProdiSection() {
    const prodi = [
        {
            title: 'Keperawatan',
        },
        {
            title: 'Kebidanan',
        },
        {
            title: 'Teknologi Laboratorium Medis',
        },
        {
            title: 'Informatika Medis',
        },
    ];

    const icons = [Stethoscope, HeartPulse, Microscope, Hospital];

    return (
        <section
            id="prodi"
            className="relative bg-linear-to-b from-gray-50 to-gray-100 px-6 py-12 lg:py-20"
        >
            <div className="container mx-auto px-4">
                <div className="space-y-10 text-center">
                    <Heading
                        classNameTitle="text-3xl lg:text-4xl font-bold bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
                        classNameDescription="text-lg text-gray-600 max-w-xl mx-auto"
                        title="Program Studi"
                        description="Melayani empat program studi kesehatan unggulan"
                    />

                    <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {prodi.map((item, index) => {
                            const Icon = icons[index % icons.length];

                            return (
                                <motion.div
                                    key={index}
                                    whileHover={{ y: -6 }}
                                    transition={{ duration: 0.2 }}
                                    className="group relative overflow-hidden rounded-2xl border bg-white/70 p-6 shadow-md backdrop-blur-md transition-all hover:shadow-xl"
                                >
                                    {/* Glow effect */}
                                    <div className="absolute inset-0 bg-linear-to-r from-yellow-400/10 to-orange-500/10 opacity-0 transition group-hover:opacity-100" />

                                    {/* Icon */}
                                    <div className="mb-4 flex justify-center">
                                        <div className="flex size-14 items-center justify-center rounded-full bg-linear-to-br from-yellow-400 to-orange-500 text-white shadow-lg">
                                            <Icon className="size-6" />
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <p className="text-base font-semibold text-gray-800 transition group-hover:text-yellow-600">
                                        {item.title}
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
