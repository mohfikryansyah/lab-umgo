import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { formatTanggalIndo2, getColorForTipeLaporan, getFileType } from '@/pages/helpers/helper';
import laporan from '@/routes/laporan';
import { BreadcrumbItem, Laporan } from '@/types';
import { Calendar, File, LocateIcon, MapPinHouse, User } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function LaporanCard({ data }: { data: Laporan }) {
    const fileType = getFileType(data.file_laporan);

    return (
        <Card className="group overflow-hidden rounded-2xl border bg-background p-0 shadow-sm transition-all hover:shadow-lg">
            <CardContent className="p-0">
                <div className="relative aspect-video overflow-hidden">
                    <img
                        src="storage/bhp-foto/ISOzHkfXGhVOZxXdaEZ4wiXlOQs4q8ygjZ3AI5ij.jpg"
                        alt="tes"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />

                    <div className="absolute bottom-3 left-3">
                        <Badge variant="secondary" className={cn("backdrop-blur-sm", getColorForTipeLaporan(data.tipe))}>
                            {data.tipe}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-3 p-5">
                    <h1 className="line-clamp-1 text-lg leading-tight font-semibold tracking-tight" title={data.judul}>
                        {data.judul}
                    </h1>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {data.deskripsi}
                    </p>

                    <Separator/>

                    <div className="pt-2 text-xs text-muted-foreground space-y-2">
                        <div className="flex items-center gap-1">
                            <Calendar className='size-4' />
                            <p>{formatTanggalIndo2(data.tanggal_melapor)}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <User className='size-4' />
                            <p>{data.pelapor.name}</p>
                        </div>
                        <div className="flex items-center gap-1">
                            {fileType === 'pdf' ? (
                                <img src="/images/pdf.svg" className='size-4' alt="PDF SVG" />
                            ) : (
                                <img src="/images/word.svg" className='size-4' alt="PDF SVG" />
                            )}
                            {/* <File className='size-4' /> */}
                            <a href={laporan.viewDocument(data.id).url} className='text-blue-500 hover:unde'>Lihat dokumen</a>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
