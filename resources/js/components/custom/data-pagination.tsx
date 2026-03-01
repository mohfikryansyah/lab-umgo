// components/DataPagination.tsx
import { router } from '@inertiajs/react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Paginated } from '@/types/paginate';

interface DataPaginationProps<T> {
  paginated: Paginated<T>;
  perPageOptions?: number[];
  preserveFilters?: Record<string, unknown>;
}

export function DataPagination<T>({
  paginated,
  perPageOptions = [12, 24, 48, 96],
  preserveFilters = {},
}: DataPaginationProps<T>) {
  const { current_page, last_page, from, to, total, per_page } = paginated;

  function goToPage(page: number) {
    router.get(
      window.location.pathname,
      { ...preserveFilters, page },
      { preserveState: true, preserveScroll: false },
    );
  }

  function changePerPage(value: string) {
    router.get(
      window.location.pathname,
      { ...preserveFilters, per_page: value, page: 1 },
      { preserveState: true, preserveScroll: false },
    );
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Info */}
      <p className="text-sm text-muted-foreground">
        Menampilkan <span className="font-medium text-foreground">{from}</span>–
        <span className="font-medium text-foreground">{to}</span> dari{' '}
        <span className="font-medium text-foreground">{total}</span> data
      </p>

      <div className="flex items-center gap-3">
        {/* Per page */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Per halaman</span>
          <Select value={String(per_page)} onValueChange={changePerPage}>
            <SelectTrigger className="h-8 w-16">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {perPageOptions.map((opt) => (
                <SelectItem key={opt} value={String(opt)}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            disabled={current_page === 1}
            onClick={() => goToPage(1)}
            aria-label="First page"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            disabled={current_page === 1}
            onClick={() => goToPage(current_page - 1)}
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="min-w-[80px] text-center text-sm">
            {current_page} / {last_page}
          </span>

          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            disabled={current_page === last_page}
            onClick={() => goToPage(current_page + 1)}
            aria-label="Next page"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            disabled={current_page === last_page}
            onClick={() => goToPage(last_page)}
            aria-label="Last page"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}