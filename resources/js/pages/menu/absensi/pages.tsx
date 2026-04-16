import { DataTable } from '@/components/datatable/data-table';
import Heading from '@/components/heading';
import { useDebounce } from '@/hooks/use-debounce';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useCallback } from 'react';
import ClockInCard from './clock_in';
import { AbsensiColumns } from './columns';
import { AbsensiPageProps } from './interface-absensi';
import SectionSearch from './section-search';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function PAGEAbsensi({
    absensis,
    praktikum,
    filters,
}: AbsensiPageProps) {
    const columns = AbsensiColumns(absensis);

    const updateFilters = useCallback(
        (partial: Record<string, unknown>) => {
            router.get(
                window.location.pathname,
                { ...filters, ...partial },
                { preserveState: true, preserveScroll: false, replace: true },
            );
        },
        [filters],
    );

    const debouncedSearch = useDebounce((value: string) => {
        updateFilters({ search_name: value });
    }, 300);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Absensi" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Heading
                    title="Absensi"
                    description="Kelola dan pantau kehadiran mahasiswa"
                />
                <SectionSearch
                    defaultDate={filters.filter_date || ''}
                    defaultProdi={filters.search_prodi || ''}
                    defaultSearch={filters.search_name || ''}
                    defaultStatus={filters.filter_status || ''}
                    onSearchChange={debouncedSearch}
                    onProdiChange={(val) =>
                        updateFilters({ search_prodi: val })
                    }
                    onStatusChange={(val) =>
                        updateFilters({ filter_status: val })
                    }
                    onDateChange={(val) => updateFilters({ filter_date: val })}
                />
                <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                    <DataTable
                        columns={columns}
                        data={absensis}
                        showToolbar={false}
                    />
                </div>
            </div>
        </AppLayout>
    );
}
