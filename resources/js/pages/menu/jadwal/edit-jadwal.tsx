import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import jadwalRoute from '@/routes/jadwal';
import { BreadcrumbItem, Jadwal, SharedData, User } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import toast from 'react-hot-toast';
import FormJadwal from './form-jadwal';
import { ENUMStatusJadwal, FormJadwalType } from './interface-jadwal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface PropsEditJadwal {
    users: User[];
    jadwal: Jadwal;
}

export default function EditJadwal({ users, jadwal }: PropsEditJadwal) {
    const { data, setData, patch, processing, errors, isDirty, reset } =
        useForm<FormJadwalType>({
            judul_jadwal: jadwal.judul_jadwal,
            deskripsi_jadwal: jadwal.deskripsi_jadwal,
            ruangan_jadwal: jadwal.ruangan_jadwal,
            waktu: undefined,
            penanggung_jawab_id: jadwal.penanggung_jawab_id,
            status: jadwal.status as ENUMStatusJadwal,
        });

    const { flash } = usePage<SharedData>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(jadwalRoute.update(jadwal.id).url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('Berhasil menambahkan jadwal.');
                reset();
            },
            onError: (e) => {
                toast.error('Gagal menambahkan jadwal.')
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buat Jadwal Kegiatan" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <Card className="bg-gray-100 dark:bg-[#171717]">
                    <CardHeader>
                        <CardTitle>Formulir Pembuatan Jadwal</CardTitle>
                        <CardDescription>
                            Isi formulir berikut untuk menambahkan jadwal baru
                            ke dalam sistem.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} id="create-jadwal">
                            <FormJadwal
                                data={data}
                                setData={setData}
                                errors={errors}
                                users={users}
                            />
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button
                            form="create-jadwal"
                            disabled={!isDirty || processing}
                        >
                            Submit
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
