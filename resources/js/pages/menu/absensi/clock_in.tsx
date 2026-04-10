import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatTanggalIndo } from '@/pages/helpers/helper';
import routeAbsensi from '@/routes/absensi';
import { Jadwal } from '@/types';
import { useForm } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
    praktikum: Jadwal;
};

export default function ClockInCard({ praktikum }: Props) {
    const [time, setTime] = useState(new Date());
    const [isClockedIn, setIsClockedIn] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        waktu_masuk: time,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleClockIn = () => {
        post(routeAbsensi.store().url, {
            onSuccess: () => {
                reset();
                toast.success('Berhasil melakukan absensi!');
            },
            onError: (errors) => {
                console.error(errors);
            },
        });
        setIsClockedIn(true);
    };

    console.log(time);

    const formattedTime = time.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    const formattedDate = time.toLocaleDateString('id-ID', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <Card className="w-full max-w-md rounded-2xl shadow-xl">
            <CardHeader className="space-y-3 text-center">
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-3">
                        <BookOpen className="size-6 text-primary" />
                    </div>
                </div>

                <div>
                    <CardTitle className="text-xl leading-tight font-bold">
                        {praktikum.judul_jadwal}
                    </CardTitle>
                </div>

                <p className="text-xs text-muted-foreground">
                    {formatTanggalIndo(praktikum.waktu)}
                </p>
            </CardHeader>

            <CardContent className="space-y-6 text-center">
                <div className="text-5xl font-bold tracking-tight">
                    {formattedTime}
                </div>

                <div>
                    {isClockedIn ? (
                        <Badge className="bg-green-500 hover:bg-green-500">
                            Hadir
                        </Badge>
                    ) : (
                        <Badge variant="secondary">Belum Absen</Badge>
                    )}
                </div>

                <Button
                    className="h-11 w-full text-base font-semibold"
                    onClick={handleClockIn}
                    disabled={isClockedIn}
                >
                    {isClockedIn ? 'Sudah Absen' : 'Clock In'}
                </Button>
            </CardContent>
        </Card>
    );
}
