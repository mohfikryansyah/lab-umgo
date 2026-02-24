import { LoaderCircle, MessageCircleWarningIcon, Trash2, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '../ui/dialog';

type WarningDialogProps = {
    title: string;
    description?: string;
    onConfirm: () => void;
    isProcessing: boolean;
};

export default function WarningDialog({ title, description, onConfirm, isProcessing }: WarningDialogProps) {
    const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

    return (
        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="">
                    Tolak
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full sm:max-w-106.25">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-200">
                        <TriangleAlert className="h-8 w-8 text-yellow-500" />
                    </div>
                    <h1 className="mt-4 text-lg font-bold text-center">{title}</h1>
                    <p className="mt-2 text-gray-400 text-center">{description ?? 'Apakah Anda yakin ingin menghapus ini?'}</p>
                    <div className="mt-6 grid w-full grid-cols-2 gap-x-2">
                        <DialogClose asChild>
                            <Button variant={'outline'}>Batal</Button>
                        </DialogClose>
                        <Button
                            variant={'default'}
                            className="bg-yellow-500 transition-all duration-300 hover:bg-yellow-600 active:scale-90"
                            disabled={isProcessing}
                            onClick={() => {
                                onConfirm();
                            }}
                            aria-label="Confirm action"
                        >
                            {isProcessing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Ya, saya yakin!
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
