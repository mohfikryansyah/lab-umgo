'use client';
import { BackgroundRippleEffect } from '@/components/ui/background-ripple-effect';
import { Button } from '@/components/ui/button';

export default function BackgroundRippleEffectDemo() {
    return (
        <div className="relative -top-15 flex min-h-screen w-full flex-col items-start justify-start overflow-hidden">
            <BackgroundRippleEffect />
            <div className="mt-64 w-full space-y-6">
                <div className="text-md relative z-10 mx-auto max-w-fit rounded-full bg-sidebar px-4 py-2 font-medium text-sky-100">
                    Universitas Muhammadiyah Gorontalo
                </div>
                <h2 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-neutral-800 md:text-4xl lg:text-7xl dark:text-neutral-100">
                    Laboratorium Kesehatan
                </h2>
                <p className="relative z-10 mx-auto mt-4 max-w-3xl text-center text-base leading-8 text-neutral-800 md:text-lg lg:text-xl dark:text-neutral-500">
                    Sistem Manajemen Laboratorium untuk Program Studi
                    Keperawatan, Kebidanan, Teknologi Laboratorium Medis, dan
                    Informatika Medis
                </p>
                <div className="flex justify-center relative">
                    <a href="#">
                        <Button
                            variant="default"
                            className="rounded-lg bg-[#f0b100] px-8 py-5 font-semibold text-neutral-900 hover:-translate-y-1 duration-300 transition-all hover:bg-[#dfa300]"
                        >
                            Lihat Dashboard
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    );
}
