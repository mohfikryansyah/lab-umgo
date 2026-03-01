import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatTanggalIndo2 } from '@/pages/helpers/helper';
import { BreadcrumbItem, Laporan } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function LaporanCard({ data }: { data: Laporan }) {
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
                        <Badge variant="secondary" className="backdrop-blur-sm">
                            {data.tipe}
                        </Badge>
                    </div>
                </div>

                <div className="space-y-3 p-5">
                    <h1 className="line-clamp-2 text-lg leading-tight font-semibold tracking-tight">
                        {data.judul}
                    </h1>

                    <p className="line-clamp-3 text-sm text-muted-foreground">
                        {data.deskripsi}
                    </p>

                    <div className="pt-2 text-xs text-muted-foreground">
                        <p>📅 {formatTanggalIndo2(data.tanggal_melapor)}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
