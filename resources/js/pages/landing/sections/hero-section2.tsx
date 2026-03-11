'use client';
import { Button } from '@/components/ui/button';
import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';

export default function HeroSection2() {
    return (
        <div className="relative -top-14 flex min-h-[100.5vh] w-full flex-col items-center justify-center overflow-hidden bg-linear-to-b from-[#243673] via-[#243673]/90 to-[#FFDF4699]/90">
            <img
                src="/images/bg.jpg"
                className="absolute -bottom-108 w-full opacity-10"
                alt=""
            />
            {/* <BackgroundRippleEffect /> */}
            <div className="w-full space-y-6">
                <div className="max-w-fit px-20 mx-auto bg-[linear-gradient(to_right,transparent,var(--color-muted)_30%,var(--color-muted)_70%,transparent)] py-2 text-center text-base shadow-xl font-semibold">
                    Universitas Muhammadiyah Gorontalo
                </div>
                {/* <div className="text-sm relative z-10 mx-auto max-w-fit rounded-full bg-gray-200 px-4 py-2 font-medium text-sky-800">
                    Universitas Muhammadiyah Gorontalo
                </div> */}
                <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-secondary md:text-4xl lg:text-7xl dark:text-neutral-100">
                    Laboratorium Kesehatan
                </h2>
                <p className="relative z-10 mx-auto mt-4 max-w-3xl text-center text-base leading-8 text-neutral-300 md:text-lg lg:text-xl dark:text-neutral-500">
                    Sistem Manajemen Laboratorium untuk Program Studi
                    Keperawatan, Kebidanan, Teknologi Laboratorium Medis, dan
                    Informatika Medis
                </p>
                <div className="relative flex justify-center">
                    <Link href={dashboard()}>
                        <Button
                            variant="default"
                            className="rounded-lg bg-[#f0b100] px-8 py-5 font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:bg-[#dfa300]"
                        >
                            Lihat Dashboard
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
