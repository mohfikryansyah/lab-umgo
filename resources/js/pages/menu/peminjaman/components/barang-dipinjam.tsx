import WarningDialog from '@/components/custom/warning-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { usePeminjamanAction } from '@/hooks/use-peminjaman-action';
import { getColorForStatus } from '@/pages/helpers/helper';
import { BreadcrumbItem, Peminjaman } from '@/types';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface BarangDipinjamProps {
    peminjaman: Peminjaman;
}

export default function BarangDipinjam({ peminjaman }: BarangDipinjamProps) {
    const { patch, processing } = useForm({});

    const {
        handleApprove,
        approveProcessing,
        handleDecline,
        declineProcessing,
        handleComplete,
        completeProcessing,
    } = usePeminjamanAction(peminjaman);

    return (
        <Card className="col-span-4 max-h-fit overflow-hidden border shadow-sm">
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted/40 p-4">
                    <p className="text-sm font-semibold tracking-tight">
                        Praktikum {peminjaman.judul_praktikum}
                    </p>

                    <Badge className={getColorForStatus(peminjaman.status)}>
                        {peminjaman.status}
                    </Badge>
                </div>

                {peminjaman.items.map((item) => {
                    const isBhp = item.item_type === 'bhp';

                    const currentName = isBhp
                        ? item.bhp.nama_bahan
                        : item.alat.nama_alat;

                    const currentSatuan = isBhp
                        ? item.bhp.satuan
                        : item.alat.satuan;

                    const currentStock = isBhp
                        ? item.bhp.jumlah_stok
                        : item.alat.jumlah_stok;

                    const image = isBhp
                        ? item.bhp.foto_bahan
                        : item.alat.foto_alat;

                    return (
                        <div
                            key={item.id}
                            className="grid grid-cols-[72px_1fr_auto] gap-4 rounded-xl border p-4 transition hover:bg-muted/30"
                        >
                            <div className="size-18 overflow-hidden rounded-lg bg-muted">
                                <img
                                    src={`/storage/${image}`}
                                    alt={currentName}
                                    className="h-full w-full object-cover"
                                />
                            </div>

                            <div className="space-y-1">
                                <p className="text-sm leading-tight font-semibold">
                                    {currentName}
                                </p>

                                <p className="text-xs text-muted-foreground">
                                    Stok tersedia: {currentStock}{' '}
                                    {currentSatuan}
                                </p>

                                <p className="text-xs text-muted-foreground capitalize">
                                    Tipe:{' '}
                                    <span
                                        className={
                                            item.item_type === 'bhp'
                                                ? 'uppercase'
                                                : ''
                                        }
                                    >
                                        {item.item_type}
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-col items-end justify-between">
                                <span className="text-xs text-muted-foreground">
                                    Dipinjam
                                </span>
                                <span className="text-sm font-semibold">
                                    {item.jumlah} {currentSatuan}
                                </span>
                            </div>
                        </div>
                    );
                })}

                <CardFooter className="border-t bg-muted/40 px-6 py-3">
                    <div className="flex w-full justify-end gap-4">
                        {peminjaman.status === 'Pending' && (
                            <>
                                <WarningDialog
                                    title="Tolak Permintaan Peminjaman"
                                    description="Apakah Anda yakin ingin menolak permintaan peminjaman ini?"
                                    onConfirm={handleDecline}
                                    isProcessing={declineProcessing}
                                />
                                <Button
                                    size="sm"
                                    className="cursor-pointer bg-sidebar hover:bg-sidebar/90"
                                    disabled={approveProcessing}
                                    onClick={handleApprove}
                                >
                                    Konfirmasi
                                </Button>
                            </>
                        )}

                        {peminjaman.status === 'Disetujui' && (
                            <Button
                                size="sm"
                                variant="destructive"
                                disabled={processing}
                                onClick={handleComplete}
                            >
                                Selesaikan Peminjaman
                            </Button>
                        )}
                    </div>
                </CardFooter>
            </CardContent>
        </Card>
    );
}
