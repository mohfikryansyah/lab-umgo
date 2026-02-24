import { useForm } from '@inertiajs/react';
import peminjamanRoute from '@/routes/peminjaman';
import { Peminjaman } from '@/types';

export function usePeminjamanAction(peminjaman: Peminjaman) {
    const { patch: approve, processing: approveProcessing } = useForm({});
    const { patch: decline, processing: declineProcessing } = useForm({});
    const { patch: complete, processing: completeProcessing } = useForm({});

    const handleApprove = () => {
        approve(peminjamanRoute.approve(peminjaman).url);
    };

    const handleDecline = () => {
        decline(peminjamanRoute.decline(peminjaman).url);
    };

    const handleComplete = () => {
        complete(peminjamanRoute.complete(peminjaman).url);
    };

    return {
        handleApprove,
        approveProcessing,
        handleDecline,
        declineProcessing,
        handleComplete,
        completeProcessing,
    };
}