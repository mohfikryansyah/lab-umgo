import { DataPagination } from '@/components/custom/data-pagination';
import { DataViewToggle, ViewMode } from '@/components/custom/data-view-toggle';
import { DataTable } from '@/components/datatable/data-table';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDebounce } from '@/hooks/use-debounce';
import AppLayout from '@/layouts/app-layout';
import laporan from '@/routes/laporan';
import { BreadcrumbItem } from '@/types';
import { LaporanIndexProps } from '@/types/laporan';
import { DataFilters } from '@/types/paginate';
import { Head, Link, router } from '@inertiajs/react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useCallback } from 'react';
import { LaporanColumns } from './columns';
import LaporanCard from './laporan-card';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
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

    function handleSort(column: string) {
        const newDir =
            filters.sort_by === column && filters.sort_dir === 'asc'
                ? 'desc'
                : 'asc';
        updateFilters({ sort_by: column, sort_dir: newDir });
    }

    const preserveFilters = {
        ...(filters.view === 'grid' && {
            search: filters.search,
            sort_by: filters.sort_by,
            sort_dir: filters.sort_dir,
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
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    {isGrid ? (
                        <>
                            <div className="relative max-w-sm flex-1">
                                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Cari laporan..."
                                    defaultValue={gridFilters!.search}
                                    onChange={(e) =>
                                        debouncedSearch(e.target.value)
                                    }
                                    className="pl-9"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Select
                                    value={`${gridFilters!.sort_by}:${gridFilters!.sort_dir}`}
                                    onValueChange={(v) => {
                                        const [sort_by, sort_dir] =
                                            v.split(':');
                                        updateFilters({ sort_by, sort_dir });
                                    }}
                                >
                                    <SelectTrigger className="h-9 w-45">
                                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                                        <SelectValue placeholder="Urutkan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="tanggal_melapor:desc">
                                            Terbaru
                                        </SelectItem>
                                        <SelectItem value="tanggal_melapor:asc">
                                            Terlama
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <DataViewToggle
                                    view="grid"
                                    onChange={handleViewChange}
                                />
                            </div>
                        </>
                    ) : (
                        // ── Table toolbar: hanya toggle di kanan, search ada di dalam ProductTable ──
                        <div className="ml-auto">
                            <DataViewToggle
                                view="table"
                                onChange={handleViewChange}
                            />
                        </div>
                    )}
                </div>
                {filters.view === 'grid' ? (
                    laporans.data.length > 0 ? (
                        <>
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
                                        per_page: preserveFilters!.per_page,
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <Card className="bg-gray-100 dark:bg-[#171717]">
                            <CardHeader></CardHeader>
                            <CardTitle>Data Laporan</CardTitle>
                            <CardDescription>
                                Tidak ada laporan yang tersedia.
                            </CardDescription>
                            <CardContent>
                                <Link href={laporan.create()}>
                                    <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
                                        Buat Laporan
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )
                ) : (
                    <Card className="bg-gray-100 dark:bg-[#171717]">
                        <CardHeader>
                            <CardTitle>Data Laporan</CardTitle>
                            <CardDescription>
                                Menampilkan daftar lengkap laporan.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <DataTable columns={columns} data={laporans.data}>
                                <Link href={laporan.create()}>
                                    <Button className="bg-secondary text-gray-800 hover:bg-secondary/80 dark:bg-blue-900/50 dark:text-white">
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
