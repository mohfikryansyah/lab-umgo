import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Required } from '@/components/ui/required';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import useBoolean from '@/hooks/use-boolean';
import { cn } from '@/lib/utils';
import { ItemType, PeminjamanItemAddItem } from '@/pages/menu/peminjaman/interface/peminjaman';
import { Alat, BHPStock, PeminjamanItem } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React, { useState } from 'react';

interface PeminjamanBhpFormProps {
    form: InertiaFormProps<{
        tanggal_pinjam: string | Date | undefined;
        items: PeminjamanItemAddItem[];
        judul_praktikum: string;
    }>;
    bhpstocks: BHPStock[];
    alats: Alat[];
    onSubmit: (e: React.FormEvent) => void;
    submitLabel: string;
    isEdit?: boolean;
}

export default function PeminjamanForm({
    form,
    bhpstocks,
    alats,
    onSubmit,
    submitLabel,
    isEdit = false,
}: PeminjamanBhpFormProps) {
    const addItem = () => {
        form.setData('items', [
            ...form.data.items,
            {
                item_type: 'alat',
                item_id: '',
                jumlah: 1,
            },
        ]);
    };

    // console.log(form.data.items);

    const removeItem = (index: number) => {
        const newItems = form.data.items.filter((_, i) => i !== index);
        form.setData('items', newItems);
    };

    const updateItem = (
        index: number,
        field: keyof PeminjamanItem,
        value: any,
    ) => {
        const newItems = [...form.data.items];
        newItems[index] = { ...newItems[index], [field]: value };
        form.setData('items', newItems);
    };

    const updateItemType = (index: number, value: ItemType) => {
        const newItems = [...form.data.items];
        newItems[index] = {
            ...newItems[index],
            item_type: value,
            item_id: '',
            jumlah: 1,
        };
        form.setData('items', newItems);
    };

    const isStockSelected = (stockId: string, currentIndex: number) => {
        return form.data.items.some(
            (item, index) => index !== currentIndex && item.item_id === stockId,
        );
    };

    const getMaxStock = (stockId: string, itemType: ItemType) => {
        if (itemType === 'bhp') {
            const stock = bhpstocks.find((s) => s.id === stockId);
            return stock?.jumlah_stok || 0;
        } else {
            const stock = alats.find((s) => s.id === stockId);
            return stock?.jumlah_stok || 0;
        }
    };

    const getStockInfo = (stockId: string, itemType: ItemType) => {
        if (itemType === 'bhp') {
            return bhpstocks.find((s) => s.id === stockId);
        } else {
            return alats.find((s) => s.id === stockId);
        }
    };

    const [date, setDate] = useState<Date | undefined>(new Date());

    const isOpenCalendar = useBoolean(false);

    const [dropdown, setDropdown] =
        useState<React.ComponentProps<typeof Calendar>['captionLayout']>(
            'dropdown',
        );

    const [openPopovers, setOpenPopovers] = useState<{
        [key: number]: boolean;
    }>({});

    const togglePopover = (index: number, isOpen: boolean) => {
        setOpenPopovers((prev) => ({ ...prev, [index]: isOpen }));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid w-full gap-2">
                <Label>
                    Tanggal Pinjam
                    <Required />
                </Label>
                <Popover
                    modal={true}
                    open={isOpenCalendar.state}
                    onOpenChange={isOpenCalendar.setState}
                >
                    <PopoverTrigger asChild>
                        <Button
                            variant={'outline'}
                            className={cn(
                                'w-full bg-transparent pl-3 text-left font-normal',
                                !form.data.tanggal_pinjam &&
                                    'text-muted-foreground',
                            )}
                        >
                            {form.data.tanggal_pinjam ? (
                                format(form.data.tanggal_pinjam, 'PPP', {
                                    locale: id,
                                })
                            ) : (
                                <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            required
                            selected={
                                form.data.tanggal_pinjam
                                    ? new Date(form.data.tanggal_pinjam)
                                    : undefined
                            }
                            onSelect={(date) => {
                                if (!date) return;

                                form.setData(
                                    'tanggal_pinjam',
                                    format(date, 'yyyy-MM-dd'),
                                );

                                isOpenCalendar.setFalse();
                            }}
                            defaultMonth={date}
                            captionLayout={dropdown}
                            className="rounded-lg border shadow-sm"
                        />
                    </PopoverContent>
                </Popover>

                <InputError
                    message={form.errors.tanggal_pinjam}
                    className="mt-2"
                />
            </div>

            <div className="grid w-full gap-2">
                <Label>Judul Praktikum</Label>
                <Input
                    id="judul_praktikum"
                    value={form.data.judul_praktikum}
                    onChange={(e) =>
                        form.setData('judul_praktikum', e.target.value)
                    }
                />
                <InputError message={form.errors.judul_praktikum}/>
            </div>

            <div>
                <div className="mb-4 flex items-center justify-between">
                    <Label>
                        Item Peminjaman
                        <Required />
                    </Label>
                    <div className="flex gap-2">
                        <Button
                            className="bg-sidebar"
                            type="button"
                            onClick={() => addItem()}
                        >
                            Tambah
                        </Button>
                    </div>
                </div>

                {form.data.items.length === 0 ? (
                    <div className="rounded-lg border-2 border-dashed border-gray-300 py-8 text-center">
                        <p className="text-gray-500">
                            Belum ada item. Klik "Tambah BHP" atau "Tambah
                            Alats" untuk menambahkan.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {form.data.items.map((item, index) => {
                            const stockInfo = getStockInfo(
                                item.item_id,
                                item.item_type,
                            );
                            const maxStock = getMaxStock(
                                item.item_id,
                                item.item_type,
                            );
                            const isBHP = item.item_type === 'bhp';
                            const stocks = isBHP ? bhpstocks : alats;

                            return (
                                <Card key={index}>
                                    <CardContent className="flex items-start gap-4">
                                        <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-3">
                                            <div className="grid w-full gap-2">
                                                <Label>Tipe Item</Label>
                                                <Select
                                                    value={item.item_type}
                                                    onValueChange={(
                                                        value: ItemType,
                                                    ) =>
                                                        updateItemType(
                                                            index,
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Pilih Tipe" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="bhp">
                                                            Bahan Habis Pakai
                                                        </SelectItem>
                                                        <SelectItem value="alat">
                                                            Alat
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="grid w-full gap-2">
                                                <Label>
                                                    {`Pilih ${isBHP ? 'BHP' : 'Alat'}`}
                                                </Label>
                                                <Popover
                                                    open={
                                                        openPopovers[index] ||
                                                        false
                                                    }
                                                    onOpenChange={(isOpen) =>
                                                        togglePopover(
                                                            index,
                                                            isOpen,
                                                        )
                                                    }
                                                >
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant={'outline'}
                                                        >
                                                            {item.item_id
                                                                ? isBHP
                                                                    ? bhpstocks.find(
                                                                          (s) =>
                                                                              s.id ===
                                                                              item.item_id,
                                                                      )
                                                                          ?.nama_bahan
                                                                    : alats.find(
                                                                          (s) =>
                                                                              s.id ===
                                                                              item.item_id,
                                                                      )
                                                                          ?.nama_alat ||
                                                                      isBHP
                                                                : `Pilih ${isBHP ? 'Bahan Habis Pakai' : 'Alat'}`}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="popover-content p-0">
                                                        <Command>
                                                            <CommandInput
                                                                placeholder={`Cari ${isBHP ? 'Bahan Habis Pakai' : 'Alat'}`}
                                                            />
                                                            <CommandEmpty>
                                                                Tidak ada data
                                                                yang ditemukan
                                                            </CommandEmpty>
                                                            <CommandList className="max-h-60 overflow-y-auto">
                                                                {stocks.map(
                                                                    (stok) => {
                                                                        return (
                                                                            <CommandItem
                                                                                key={
                                                                                    stok.id
                                                                                }
                                                                                onSelect={() => {
                                                                                    updateItem(
                                                                                        index,
                                                                                        'item_id',
                                                                                        stok.id,
                                                                                    );
                                                                                    togglePopover(
                                                                                        index,
                                                                                        false,
                                                                                    );
                                                                                }}
                                                                                disabled={isStockSelected(
                                                                                    stok.id,
                                                                                    index,
                                                                                )}
                                                                            >
                                                                                {isBHPStock(
                                                                                    stok,
                                                                                )
                                                                                    ? `${stok.nama_bahan} - Stok: ${stok.jumlah_stok} ${stok.satuan ?? ''}`
                                                                                    : `${stok.nama_alat} - Stok: ${stok.jumlah_stok}`}
                                                                            </CommandItem>
                                                                        );
                                                                    },
                                                                )}
                                                            </CommandList>
                                                        </Command>
                                                    </PopoverContent>
                                                </Popover>

                                                {form.errors[
                                                    `items.${index}.item_id`
                                                ] && (
                                                    <p className="text-sm text-red-500">
                                                        {
                                                            form.errors[
                                                                `items.${index}.item_id`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            <div className="grid w-full gap-2">
                                                <Label>
                                                    Jumlah Pinjam
                                                    {stockInfo && (
                                                        <span className="ml-2 text-gray-500">
                                                            (Maksimal: {maxStock})
                                                        </span>
                                                    )}
                                                </Label>
                                                <Input
                                                    type="number"
                                                    value={item.jumlah}
                                                    onChange={(e) =>
                                                        updateItem(
                                                            index,
                                                            'jumlah',
                                                            parseInt(
                                                                e.target.value,
                                                            ) || 1,
                                                        )
                                                    }
                                                    min="1"
                                                    max={maxStock}
                                                    className={`w-full rounded-lg border px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
                                                        form.errors[
                                                            `items.${index}.jumlah`
                                                        ]
                                                            ? 'border-red-500'
                                                            : 'border-gray-300'
                                                    }`}
                                                    required
                                                />
                                                {form.errors[
                                                    `items.${index}.jumlah`
                                                ] && (
                                                    <p className="mt-1 text-sm text-red-500">
                                                        {
                                                            form.errors[
                                                                `items.${index}.jumlah`
                                                            ]
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <button
                                            type="button"
                                            onClick={() => removeItem(index)}
                                            className="mt-6 rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                                            title="Hapus item"
                                        >
                                            <svg
                                                className="h-5 w-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                )}

                {form.errors.items && typeof form.errors.items === 'string' && (
                    <p className="mt-2 text-sm text-red-500">
                        {form.errors.items}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 border-t pt-4">
                <Button type="button" onClick={() => window.history.back()}>
                    Batal
                </Button>
                <Button type="submit" disabled={form.processing}>
                    {form.processing ? 'Menyimpan...' : submitLabel}
                </Button>
            </div>
        </form>
    );
}

function isBHPStock(stok: BHPStock | Alat): stok is BHPStock {
    return 'nama_bahan' in stok;
}
