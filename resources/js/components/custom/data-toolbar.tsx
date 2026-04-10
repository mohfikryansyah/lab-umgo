import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

type SortOption = {
    label: string;
    value: string;
};

type FilterOption = {
    label: string;
    value: string;
};

type DataToolbarProps = {
    searchPlaceholder?: string;
    defaultSearch?: string;
    onSearchChange: (value: string) => void;

    sortValue: string;
    sortOptions: SortOption[];
    onSortChange: (sort_by: string, sort_dir: string) => void;

    filterTypeValue?: string;
    filterTypeOptions?: FilterOption[];
    onFilterTypeChange?: (value: string) => void;

    rightElement?: React.ReactNode;
};

export default function DataToolbar({
    searchPlaceholder = 'Cari data...',
    defaultSearch = '',
    onSearchChange,
    sortValue,
    sortOptions,
    onSortChange,
    filterTypeValue,
    filterTypeOptions,
    onFilterTypeChange,
    rightElement,
}: DataToolbarProps) {
    const [value, setValue] = useState(defaultSearch);

    const handleChange = (val: string) => {
        setValue(val);
        onSearchChange(val);
    };

    const clearInput = () => {
        setValue('');
        onSearchChange('');
    };
    return (
        <div className="flex justify-between rounded-xl bg-gray-100 p-4 shadow dark:bg-[#171717]">
            <div className="relative max-w-sm flex-1">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                    placeholder={searchPlaceholder}
                    value={value}
                    onChange={(e) => handleChange(e.target.value)}
                    className="pr-9 pl-9"
                />

                {value && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearInput}
                        className="absolute top-1/2 right-1 h-7 w-7 -translate-y-1/2"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            <div className="flex items-center gap-2">
                <Select
                    value={sortValue}
                    onValueChange={(v) => {
                        const [sort_by, sort_dir] = v.split(':');
                        onSortChange(sort_by, sort_dir);
                    }}
                >
                    <SelectTrigger className="h-9 w-45">
                        <SlidersHorizontal className="mr-2 h-4 w-4" />
                        <SelectValue placeholder="Urutkan" />
                    </SelectTrigger>
                    <SelectContent>
                        {sortOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Select
                    value={filterTypeValue}
                    onValueChange={onFilterTypeChange}
                >
                    <SelectTrigger className="h-9 w-45">
                        <Filter className="mr-2 size-4" />
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        {filterTypeOptions?.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {rightElement}
            </div>
        </div>
    );
}
