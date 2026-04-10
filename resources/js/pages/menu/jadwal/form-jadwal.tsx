import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
    Combobox,
    ComboboxContent,
    ComboboxEmpty,
    ComboboxInput,
    ComboboxItem,
    ComboboxList,
    ComboboxTrigger,
} from '@/components/ui/combobox';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BreadcrumbItem, User } from '@/types';
import { InertiaFormProps } from '@inertiajs/react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Clock2Icon } from 'lucide-react';
import { useState } from 'react';
import {
    ENUMStatusJadwal,
    ENUMStatusJadwalForSelect,
    FormJadwalType,
} from './interface-jadwal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Props {
    data: FormJadwalType;
    setData: InertiaFormProps<FormJadwalType>['setData'];
    errors: InertiaFormProps<FormJadwalType>['errors'];
    users: User[];
}

export default function FormJadwal({ data, setData, errors, users }: Props) {
    const [date, setDate] = useState<Date | undefined>(
        new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
        ),
    );

    const [time, setTime] = useState<string>('00:00:00');

    // Fungsi helper untuk merge tanggal + waktu
    const mergeDateAndTime = (date?: Date, timeStr?: string) => {
        if (!date || !timeStr) return '';

        const [hours, minutes, seconds] = timeStr.split(':').map(Number);

        const merged = new Date(date);
        merged.setHours(hours, minutes, seconds ?? 0);

        return format(merged, 'yyyy-MM-dd HH:mm:ss'); // ✅ sesuai kebutuhan kamu
    };

    console.log(data);
    return (
        <div className="grid grid-cols-3 gap-5">
            <div className="col-span-2 space-y-4">
                <div className="grid w-full gap-2">
                    <Label>Judul Kegiatan</Label>
                    <Input
                        onChange={(e) =>
                            setData('judul_jadwal', e.target.value)
                        }
                        value={data.judul_jadwal}
                        className="bg-white"
                    />
                    <InputError message={errors.judul_jadwal} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Deskripsi</Label>
                    <Textarea
                        onChange={(e) =>
                            setData('deskripsi_jadwal', e.target.value)
                        }
                        value={data.deskripsi_jadwal}
                        className="bg-white"
                    />
                    <InputError message={errors.deskripsi_jadwal} />
                </div>

                <div className="grid w-full gap-2">
                    <Label>Ruangan</Label>
                    <Input
                        onChange={(e) =>
                            setData('ruangan_jadwal', e.target.value)
                        }
                        value={data.ruangan_jadwal}
                        className="bg-white"
                    />
                    <InputError message={errors.ruangan_jadwal} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Status</Label>
                    <Select
                        value={data.status}
                        onValueChange={(value) =>
                            setData('status', value as ENUMStatusJadwal)
                        }
                    >
                        <SelectTrigger className="w-full bg-white">
                            <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent>
                            {ENUMStatusJadwalForSelect.map((status) => (
                                <SelectItem
                                    key={status.value}
                                    value={status.value}
                                >
                                    {status.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.status} />
                </div>
                <div className="grid w-full gap-2">
                    <Label>Penanggung Jawab</Label>
                    <Combobox
                        items={users}
                        // defaultValue={'Pilih penanggung jawab'}
                        onValueChange={(value) => {
                            setData('penanggung_jawab_id', Number(value));
                        }}
                    >
                        <ComboboxTrigger
                            render={
                                <Button
                                    variant="outline"
                                    className="w-full justify-between font-normal"
                                >
                                    {data.penanggung_jawab_id
                                        ? users.find(
                                              (user) =>
                                                  user.id ===
                                                  data.penanggung_jawab_id,
                                          )?.name
                                        : 'Pilih penanggung jawab'}
                                </Button>
                            }
                        />
                        <ComboboxContent>
                            <ComboboxInput
                                showTrigger={false}
                                placeholder="Search"
                            />
                            <ComboboxEmpty>No items found.</ComboboxEmpty>
                            <ComboboxList>
                                {(item) => (
                                    <ComboboxItem key={item.id} value={item.id}>
                                        {item.name}
                                    </ComboboxItem>
                                )}
                            </ComboboxList>
                        </ComboboxContent>
                    </Combobox>
                    <InputError message={errors.penanggung_jawab_id} />
                </div>
            </div>
            <div className="">
                <div className="grid w-full gap-2">
                    <Label>Waktu</Label>
                    <Card className="mx-auto w-full">
                        <CardContent>
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={(selectedDate) => {
                                    setDate(selectedDate);

                                    const result = mergeDateAndTime(
                                        selectedDate,
                                        time,
                                    );
                                    if (result) setData('waktu', result);
                                }}
                                className="p-0 [--cell-size:--spacing(8)] md:[--cell-size:--spacing(9)]"
                                captionLayout="dropdown"
                                locale={id}
                            />
                        </CardContent>
                        <CardFooter className="border-t bg-card">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel
                                        htmlFor="time-from"
                                        className="pt-2"
                                    >
                                        Waktu
                                    </FieldLabel>
                                    <InputGroup>
                                        <InputGroupInput
                                            id="time-from"
                                            type="time"
                                            step="1"
                                            value={time}
                                            // defaultValue="10:30:00"
                                            onChange={(e) => {
                                                const newTime = e.target.value;
                                                setTime(newTime);

                                                const result = mergeDateAndTime(
                                                    date,
                                                    newTime,
                                                );
                                                if (result)
                                                    setData('waktu', result);
                                            }}
                                            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                        />
                                        <InputGroupAddon>
                                            <Clock2Icon className="text-muted-foreground" />
                                        </InputGroupAddon>
                                    </InputGroup>
                                </Field>
                            </FieldGroup>
                        </CardFooter>
                    </Card>
                    <InputError message={errors.waktu} />
                </div>
            </div>
        </div>
    );
}
