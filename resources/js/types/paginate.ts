export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface Paginated<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
  links: PaginationLink[];
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
}

export interface DataFilters {
  search: string;
  view: 'grid' | 'table';
  sort_by: string;
  sort_dir: 'asc' | 'desc';
  per_page: number;
}