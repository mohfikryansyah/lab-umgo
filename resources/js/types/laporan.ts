import { Laporan } from ".";
import { DataFilters, Paginated } from "./paginate";

export interface LaporanIndexProps {
  laporans: Paginated<Laporan>;
  filters: DataFilters;
}