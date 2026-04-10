import { DataPagination } from '@/components/custom/data-pagination';
import DataToolbar from '@/components/custom/data-toolbar';
import { ViewMode } from '@/components/custom/data-view-toggle';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import AppLayout from '@/layouts/app-layout';
import jadwalRoute from '@/routes/jadwal';
import { BreadcrumbItem } from '@/types';
import { DataFilters } from '@/types/paginate';
import { Head, Link, router } from '@inertiajs/react';
import { useCallback } from 'react';
import { JadwalIndexProps } from './interface-jadwal';
import JadwalCard from './jadwal-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGEJadwal({ jadwals, filters }: JadwalIndexProps) {
    const updateFilters = useCallback(
        (partial: Record<string, unknown>) => {
            router.get(
                window.location.pathname,
                { ...filters, ...partial, page: 1 },
                { preserveState: true, preserveScroll: false, replace: true },
            );
        },
        [filters],
    );

    const debouncedSearch = useDebounce((value: string) => {
        updateFilters({ search: value });
    }, 300);

    function handleViewChange(view: ViewMode) {
        router.get(
            window.location.pathname,
            { ...filters, view, page: 1 },
            { preserveState: false, replace: true },
        );
    }

    const isGrid = filters.view === 'grid';
    const gridFilters = isGrid ? (filters as DataFilters) : null;

    const hasData = jadwals.data.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Jadwal Kegiatan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex flex-col gap-4 md:flex-row md:justify-between">
                    <Heading
                        title="Jadwal Kegiatan"
                        description="Daftar jadwal kegiatan laboratorium kesehatan."
                    />

                    <Link href={jadwalRoute.create()}>
                        <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                            Buat Jadwal
                        </Button>
                    </Link>
                </div>
                {isGrid && (
                    <DataToolbar
                        searchPlaceholder="Cari jadwal..."
                        defaultSearch={gridFilters!.search}
                        onSearchChange={debouncedSearch}
                        sortValue={`${gridFilters!.sort_by}:${gridFilters!.sort_dir}`}
                        sortOptions={[
                            {
                                label: 'Terbaru',
                                value: 'waktu:desc',
                            },
                            {
                                label: 'Terlama',
                                value: 'waktu:asc',
                            },
                        ]}
                        onSortChange={(sort_by, sort_dir) =>
                            updateFilters({ sort_by, sort_dir })
                        }
                        filterTypeValue={gridFilters!.filter_type}
                        filterTypeOptions={[
                            { label: 'Terjadwal', value: 'Terjadwal' },
                            { label: 'Selesai', value: 'Selesai' },
                        ]}
                        onFilterTypeChange={(filter_type) =>
                            updateFilters({ filter_type })
                        }
                        // rightElement={
                        //     <DataViewToggle
                        //         view="grid"
                        //         onChange={handleViewChange}
                        //     />
                        // }
                    />
                )}

                {isGrid &&
                    (hasData ? (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {jadwals.data.map((jadwal) => (
                                    <JadwalCard key={jadwal.id} data={jadwal} />
                                ))}
                            </div>

                            <div className="pt-4">
                                <DataPagination
                                    paginated={jadwals}
                                    preserveFilters={{
                                        ...filters,
                                        view: 'grid',
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <Card className="flex flex-col items-center justify-center gap-4 border-dashed bg-gray-100 py-16 text-center dark:bg-[#171717]">
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="text-lg font-semibold">
                                    Belum Ada Jadwal
                                </div>
                                <p className="max-w-sm text-sm text-muted-foreground">
                                    Saat ini belum ada jadwal yang tersedia.
                                    Mulai dengan membuat jadwal baru.
                                </p>

                                <Link href={jadwalRoute.create()}>
                                    <Button className="bg-secondary text-gray-800 hover:bg-secondary/80">
                                        Buat Jadwal
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ))}
            </div>
        </AppLayout>
    );
}
