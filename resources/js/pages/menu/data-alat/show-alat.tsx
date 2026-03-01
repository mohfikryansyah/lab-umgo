import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Alat, BreadcrumbItem } from '@/types';
import { Dialog } from '@radix-ui/react-dialog';
import { Eye, Hash, MapPin, Package } from 'lucide-react';
import { getColorForKondisiAlat } from './helpers';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function ShowAlat({ alat }: { alat: Alat }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="bg-yellow-100 hover:bg-yellow-200"
                >
                    <Eye className="text-yellow-600" />
                </Button>
            </DialogTrigger>

            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Detail Alat</DialogTitle>
                    <DialogDescription>
                        Informasi lengkap mengenai alat.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="-mx-4 max-h-[70vh] overflow-y-auto px-4">
                    <div className="space-y-6">
                        <div className="w-full overflow-hidden rounded-xl border">
                            <img
                                src={`/storage/${alat.foto_alat}`}
                                alt={alat.nama_alat}
                                className="h-64 w-full object-cover"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold">
                                {alat.nama_alat}
                            </h2>
                            <Badge
                                className={getColorForKondisiAlat(
                                    alat.kondisi_alat,
                                )}
                            >
                                {alat.kondisi_alat}
                            </Badge>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Package size={16} />
                                <span>
                                    Stok: <strong>{alat.jumlah_stok}</strong>{' '}
                                    {alat.satuan}
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Hash size={16} />
                                <span>
                                    No. Inventaris:{' '}
                                    <strong>{alat.nomor_inventaris}</strong>
                                </span>
                            </div>

                            <div className="col-span-2 flex items-center gap-2">
                                <MapPin size={16} />
                                <span>
                                    Lokasi Penyimpanan:{' '}
                                    <strong>{alat.tempat_penyimpanan}</strong>
                                </span>
                            </div>
                        </div>

                        <Separator />

                        <div>
                            <h3 className="mb-2 font-semibold">Deskripsi</h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {alat.deskripsi_alat}
                            </p>
                        </div>
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
