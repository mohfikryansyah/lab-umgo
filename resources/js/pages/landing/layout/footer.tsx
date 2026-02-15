import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Footer() {
    return (
        <section className="relative bg-white p-6 text-white">
            <div className="container mx-auto rounded-xl bg-sidebar p-6 shadow-xl">
                <div className="grid border-b pb-6 lg:grid-cols-3">
                    <div className="flex gap-4">
                        <img
                            src="/images/logo-umgo.png"
                            alt="Logo UMGO"
                            className="size-20 lg:mb-4"
                        />
                        <div className="">
                            <h1 className="font-bold">
                                Laboratorium Kesehatan UMGO
                            </h1>
                            <p className="mt-4 text-gray-300">
                                Universitas Muhammadiyah Gorontalo Sistem
                                Manajemen Laboratorium Terintegrasi
                            </p>
                        </div>
                    </div>
                    <div className="">
                        <h1 className="font-bold">
                            Laboratorium Kesehatan UMGO
                        </h1>
                        <ul className="mt-4">
                            <li>
                                <a
                                    href="#beranda"
                                    className="text-gray-300 hover:text-gray-400"
                                >
                                    Beranda
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#fitur"
                                    className="text-gray-300 hover:text-gray-400"
                                >
                                    Fitur Utama
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#prodi"
                                    className="text-gray-300 hover:text-gray-400"
                                >
                                    Prodi
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="">
                        <h1 className="font-bold">
                            Kontak
                        </h1>
                        <p className="mt-4 text-gray-300">
                            Email: lab.kesehatan@umgo.ac.id
                        </p>
                        <p className="mt-4 text-gray-300">
                            Telpon: (0435) 123456
                        </p>
                    </div>
                </div>
                <h1 className="mt-4 text-center">
                    © 2025 Laboratorium Kesehatan UMGO. All rights reserved.
                </h1>
            </div>
        </section>
    );
}
