import DeleteDialog from '@/components/custom/delete-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useDeleteWithToast } from '@/hooks/use-delete';
import { cn } from '@/lib/utils';
import { formatTanggalIndo, formatTanggalIndo2, getColorForStatusJadwal } from '@/pages/helpers/helper';
import { default as jadwalRoute } from '@/routes/jadwal';
import { BreadcrumbItem, Jadwal } from '@/types';
import { Link } from '@inertiajs/react';
import { Calendar, Edit, MapPin, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function JadwalCard({ data }: { data: Jadwal }) {
    // const fileType = getFileType(data.file_jadwal);
    const [disableButton, setDisableButton] = useState<boolean>(false);
    const { deleteItem, isDeleting } = useDeleteWithToast();

    const handleDeleteRow = (jadwal: Jadwal) => {
        deleteItem(jadwalRoute.destroy(jadwal.id));
    };

    useEffect(() => {
        if (isDeleting) {
            setDisableButton(true);
        } else {
            setDisableButton(false);
        }
    }, [handleDeleteRow, isDeleting]);

    return (
        <Card className="group overflow-hidden rounded-2xl border bg-background p-0 shadow-sm transition-all hover:shadow-lg">
            <CardContent className="p-0">
                <div
                    className={cn(
                        'w-full py-0.5 text-center text-xs font-medium',
                        getColorForStatusJadwal(data.status),
                    )}
                >
                    {data.status}
                </div>

                <div className="space-y-3 p-5">
                    <h1
                        className="line-clamp-1 text-lg leading-tight font-semibold tracking-tight"
                        title={data.judul_jadwal}
                    >
                        {data.judul_jadwal}
                    </h1>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {data.deskripsi_jadwal}
                    </p>

                    <Separator />

                    <div className="space-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="size-4" />
                            <p>{formatTanggalIndo(data.waktu)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className="size-4" />
                            <p>{data.penanggung_jawab.name}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="size-4" />
                            <p>{data.ruangan_jadwal}</p>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-end gap-2 text-xs">
                        <div className="flex items-center gap-1">
                            <Link
                                className="font-semibold"
                                href={jadwalRoute.edit(data)}
                            >
                                <Button
                                    size={'icon'}
                                    className="bg-yellow-100 hover:cursor-pointer hover:bg-yellow-200"
                                >
                                    <Edit className="text-yellow-500" />
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center gap-1">
                            <DeleteDialog
                                isProcessing={disableButton}
                                onDelete={() => handleDeleteRow(data)}
                                title="Hapus Data Jadwal"
                                key={data.id}
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
