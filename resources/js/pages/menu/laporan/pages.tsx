import { DataPagination } from '@/components/custom/data-pagination';
import DataToolbar from '@/components/custom/data-toolbar';
import { DataViewToggle, ViewMode } from '@/components/custom/data-view-toggle';
import { DataTable } from '@/components/datatable/data-table';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useDebounce } from '@/hooks/use-debounce';
import AppLayout from '@/layouts/app-layout';
import laporan from '@/routes/laporan';
import { BreadcrumbItem } from '@/types';
import { LaporanIndexProps } from '@/types/laporan';
import { DataFilters } from '@/types/paginate';
import { Head, Link, router } from '@inertiajs/react';
import { useCallback } from 'react';
import { LaporanColumns } from './columns';
import LaporanCard from './laporan-card';
import { LaporanTipeOptions } from './interface';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Laporan',
        href: laporan.index().url,
    },
];

export default function PAGELaporan({ laporans, filters }: LaporanIndexProps) {
    const columns = LaporanColumns(laporans);

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

    const hasData = laporans.data.length > 0;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Laporan Operasional" />

            <div className="flex flex-col gap-6 p-6">

                {/* HEADER */}
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <Heading
                        title="Daftar Laporan Operasional"
                        description="Pantau, kelola, dan tindaklanjuti seluruh laporan yang masuk."
                    />

                    <Link href={laporan.create()}>
                        <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                            Buat Laporan
                        </Button>
                    </Link>
                </div>

                {/* TOOLBAR */}
                {isGrid && (
                    // <Card className="border-none bg-gray-100/80 shadow-sm backdrop-blur dark:bg-[#171717]">
                        // <CardContent className="p-4">
                            <DataToolbar
                                searchPlaceholder="Cari laporan..."
                                defaultSearch={gridFilters!.search}
                                onSearchChange={debouncedSearch}
                                sortValue={`${gridFilters!.sort_by}:${gridFilters!.sort_dir}`}
                                sortOptions={[
                                    {
                                        label: 'Terbaru',
                                        value: 'tanggal_melapor:desc',
                                    },
                                    {
                                        label: 'Terlama',
                                        value: 'tanggal_melapor:asc',
                                    },
                                ]}
                                onSortChange={(sort_by, sort_dir) =>
                                    updateFilters({ sort_by, sort_dir })
                                }
                                filterTypeValue={gridFilters!.filter_type}
                                filterTypeOptions={[
                                    { label: 'Harian', value: 'Harian' },
                                    { label: 'Mingguan', value: 'Mingguan' },
                                    { label: 'Bulanan', value: 'Bulanan' },
                                    { label: 'Insiden', value: 'Insiden' },
                                ]}
                                onFilterTypeChange={(filter_type) =>
                                    updateFilters({ filter_type })
                                }
                                rightElement={
                                    <DataViewToggle
                                        view="grid"
                                        onChange={handleViewChange}
                                    />
                                }
                            />
                        // </CardContent>
                    // </Card>
                )}

                {/* CONTENT */}
                {isGrid ? (
                    hasData ? (
                        <>
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                {laporans.data.map((laporan) => (
                                    <LaporanCard
                                        key={laporan.id}
                                        data={laporan}
                                    />
                                ))}
                            </div>

                            <div className="pt-4">
                                <DataPagination
                                    paginated={laporans}
                                    preserveFilters={{
                                        ...filters,
                                        view: 'grid',
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <Card className="flex flex-col items-center justify-center gap-4 border-dashed py-16 text-center bg-gray-100 dark:bg-[#171717]">
                            <CardContent className="flex flex-col items-center gap-4">
                                <div className="text-lg font-semibold">
                                    Belum Ada Laporan
                                </div>
                                <p className="text-sm text-muted-foreground max-w-sm">
                                    Saat ini belum ada laporan yang tersedia.
                                    Mulai dengan membuat laporan baru.
                                </p>

                                <Link href={laporan.create()}>
                                    <Button className="bg-secondary text-gray-800 hover:bg-secondary/80">
                                        Buat Laporan
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )
                ) : (
                    <Card className="bg-gray-100 shadow-sm dark:bg-[#171717]">
                        <CardHeader>
                            <div className="flex items-center">
                                <CardTitle>Data Laporan</CardTitle>

                                <div className="ml-auto">
                                    <DataViewToggle
                                        view="table"
                                        onChange={handleViewChange}
                                    />
                                </div>
                            </div>

                            <CardDescription>
                                Menampilkan daftar lengkap laporan.
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <DataTable
                                columns={columns}
                                data={laporans.data}
                                columnFilter="tipe"
                                titleFilter="Filter Tipe"
                                optionsFilter={LaporanTipeOptions}
                            >
                                <Link href={laporan.create()}>
                                    <Button className="bg-secondary text-gray-800 hover:bg-secondary/80">
                                        Buat Laporan
                                    </Button>
                                </Link>
                            </DataTable>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
