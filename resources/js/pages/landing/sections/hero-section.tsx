import { Button } from '@/components/ui/button';
import { BreadcrumbItem } from '@/types';

export default function HeroSection() {
    return (
        <section className="relative h-[93vh] pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-48 lg:pb-32">
            <div className="container mx-auto px-4">
                <div className="space-y-6 text-center">
                    <div className="inline-block rounded-full bg-primary px-3 py-2 text-sm font-medium text-white/95">
                        Universitas Muhammadiyah Gorontalo
                    </div>

                    <h1 className="text-4xl leading-tight font-bold text-black sm:text-5xl md:text-6xl dark:text-neutral-100">
                        Laboratorium Kesehatan UMGO
                    </h1>

                    <h3 className="mx-auto mt-4 max-w-3xl text-base leading-8 text-black md:text-lg lg:text-xl dark:text-neutral-300">
                        Sistem Manajemen Laboratorium untuk Program Studi
                        Keperawatan, Kebidanan, Teknologi Laboratorium Medis,
                        dan Informatika Medis
                    </h3>

                    <Button
                        variant="default"
                        className="rounded-lg bg-[#f0b100] px-8 py-5 font-semibold text-neutral-900 hover:bg-[#dfa300]"
                    >
                        Lihat Dashboard
                    </Button>
                </div>
            </div>
        </section>
    );
}
