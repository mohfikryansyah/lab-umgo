'use client';
import { Button } from '@/components/ui/button';

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
                <div className="text-sm relative z-10 mx-auto max-w-fit rounded-full bg-gray-200 px-4 py-2 font-medium text-sky-800">
                    Universitas Muhammadiyah Gorontalo
                </div>
                <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-secondary md:text-4xl lg:text-7xl dark:text-neutral-100">
                    Laboratorium Kesehatan
                </h2>
                <p className="relative z-10 mx-auto mt-4 max-w-3xl text-center text-base leading-8 text-neutral-300 md:text-lg lg:text-xl dark:text-neutral-500">
                    Sistem Manajemen Laboratorium untuk Program Studi
                    Keperawatan, Kebidanan, Teknologi Laboratorium Medis, dan
                    Informatika Medis
                </p>
                <div className="relative flex justify-center">
                    <a href="#">
                        <Button
                            variant="default"
                            className="rounded-lg bg-[#f0b100] px-8 py-5 font-semibold text-neutral-900 transition-all duration-300 hover:-translate-y-1 hover:bg-[#dfa300]"
                        >
                            Lihat Dashboard
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
