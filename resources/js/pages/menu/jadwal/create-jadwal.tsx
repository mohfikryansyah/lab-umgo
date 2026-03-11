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
import jadwal from '@/routes/jadwal';
import { BreadcrumbItem, SharedData, User } from '@/types';
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

interface PropsCreateJadwal {
    users: User[];
}

export default function CreateJadwal({ users }: PropsCreateJadwal) {
    const { data, setData, post, processing, errors, isDirty } =
        useForm<FormJadwalType>({
            judul_jadwal: '',
            deskripsi_jadwal: '',
            ruangan_jadwal: '',
            waktu: undefined,
            penanggung_jawab_id: null,
            status: '' as ENUMStatusJadwal,
        });

    const { flash } = usePage<SharedData>();

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(jadwal.store().url, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => {
                toast.success('sucess');
            },
            onError: (e) => {
                console.log(e)
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
