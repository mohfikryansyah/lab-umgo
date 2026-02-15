import Heading from '@/components/heading';
import { BreadcrumbItem } from '@/types';

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

    return (
        <section id="prodi" className="relative bg-gray-100 px-6 py-8 lg:py-16">
            <div className="container mx-auto px-4">
                <div className="space-y-6 text-center">
                    <Heading
                        classNameTitle="text-3xl text-yellow-400"
                        classNameDescription="text-lg text-gray-700"
                        title="Program Studi"
                        description="Melayani empat program studi kesehatan unggulan"
                    ></Heading>
                    <div className="grid gap-6 text-center text-neutral-700 md:grid-cols-2 lg:max-w-3xl mx-auto">
                        {prodi.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className="space-y-4 rounded-lg border p-6 shadow-lg transition hover:shadow-xl"
                                >
                                    <p className="text-lg font-bold">
                                        {item.title}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
