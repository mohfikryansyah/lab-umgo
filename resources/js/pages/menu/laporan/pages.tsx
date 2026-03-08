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
        if (view === 'table') {
            router.get(
                window.location.pathname,
                { view: 'table' },
                { preserveState: false, preserveScroll: false, replace: true },
            );
        } else {
            router.get(
                window.location.pathname,
                { ...filters, page: 1, view: 'grid' },
                { preserveState: false, preserveScroll: false, replace: true },
            );
        }
    }

    const preserveFilters = {
        ...(filters.view === 'grid' && {
            search: filters.search,
            sort_by: filters.sort_by,
            sort_dir: filters.sort_dir,
            filter_type: filters.filter_type,
            per_page: filters.per_page,
        }),
        view: filters.view,
    };

    const isGrid = filters.view === 'grid';

    const gridFilters = isGrid ? (filters as DataFilters) : null;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {isGrid ? (
                    laporans.data.length > 0 ? (
                        <>
                            <div className="flex flex-col justify-between md:flex-row md:gap-10">
                                <Heading
                                    title="Daftar Laporan"
                                    description="Halaman ini menampilkan seluruh laporan yang telah dibuat. Anda dapat melihat detail, memantau status, serta melakukan tindakan yang diperlukan pada setiap laporan."
                                />
                                <Link href={laporan.create()} className="">
                                    <Button className="w-fit bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                                        Buat Laporan
                                    </Button>
                                </Link>
                            </div>
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
                                    {
                                        label: 'Harian',
                                        value: 'Harian',
                                    },
                                    {
                                        label: 'Mingguan',
                                        value: 'Mingguan',
                                    },
                                    {
                                        label: 'Bulanan',
                                        value: 'Bulanan',
                                    },
                                    {
                                        label: 'Insiden',
                                        value: 'Insiden',
                                    },
                                ]}
                                onFilterTypeChange={(filter_type) => {
                                    updateFilters({ filter_type });
                                }}
                                rightElement={
                                    <DataViewToggle
                                        view="grid"
                                        onChange={handleViewChange}
                                    />
                                }
                            />
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {laporans.data.map((laporan) => (
                                    <LaporanCard
                                        key={laporan.id}
                                        data={laporan}
                                    />
                                ))}
                            </div>
                            <div className="mt-6">
                                <DataPagination
                                    paginated={laporans!}
                                    preserveFilters={{
                                        view: 'grid',
                                        search: preserveFilters!.search,
                                        sort_by: preserveFilters!.sort_by,
                                        sort_dir: preserveFilters!.sort_dir,
                                        filter_type:
                                            preserveFilters!.filter_type,
                                        per_page: preserveFilters!.per_page,
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex flex-col justify-between md:flex-row md:gap-10">
                                <Heading
                                    title="Daftar Laporan"
                                    description="Halaman ini menampilkan seluruh laporan yang telah dibuat. Anda dapat melihat detail, memantau status, serta melakukan tindakan yang diperlukan pada setiap laporan."
                                />
                                <Link href={laporan.create()} className="">
                                    <Button className="w-fit bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                                        Buat Laporan
                                    </Button>
                                </Link>
                            </div>
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
                                rightElement={
                                    <DataViewToggle
                                        view="grid"
                                        onChange={handleViewChange}
                                    />
                                }
                            />
                            <div className="flex flex-col items-center gap-4 rounded-lg bg-gray-100 py-10 dark:bg-[#171717]">
                                <h1 className="leading-none font-semibold text-neutral-900">
                                    Data Laporan
                                </h1>
                                <h1 className="text-sm text-muted-foreground">
                                    Tidak ada laporan yang tersedia.
                                </h1>
                                <Button className="bg-secondary text-gray-800">
                                    Buat Laporan
                                </Button>
                            </div>
                        </>
                    )
                ) : (
                    <>
                        <Card className="bg-gray-100 dark:bg-[#171717]">
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
                                >
                                    <Link href={laporan.create()}>
                                        <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                                            Buat Laporan
                                        </Button>
                                    </Link>
                                </DataTable>
                            </CardContent>
                        </Card>
                    </>
                )}
            </div>
        </AppLayout>
    );
}
