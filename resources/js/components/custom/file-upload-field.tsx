import { cn } from '@/lib/utils';
import { FileText, Upload } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Label } from '../ui/label';

type FileUploadFieldProps = {
    label?: string;
    value?: File | null;
    existingUrl?: string | null;
    existingName?: string | null;
    accept?: string;
    disabled?: boolean;
    error?: string;
    onChange: (file: File | null) => void;
};

export default function FileUploadField({
    label,
    value,
    existingUrl,
    existingName,
    accept = '*',
    disabled = false,
    error,
    onChange,
}: FileUploadFieldProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [fileType, setFileType] = useState<'image' | 'document' | null>(null);

    useEffect(() => {
        if (!value) return;

        if (value.type.startsWith('image/')) {
            setFileType('image');
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(value);
        } else {
            setFileType('document');
            setPreview(null);
        }
    }, [value]);

    const handleClick = () => {
        if (!disabled) inputRef.current?.click();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
    };

    function hasType(accept: string, ext: string) {
        return accept
            .split(',')
            .map((t) => t.trim())
            .includes(ext);
    }

    const renderContent = () => {
        if (fileType === 'image' && preview) {
            return (
                <img
                    src={preview}
                    alt="preview"
                    className="w-full rounded-xl object-cover"
                />
            );
        }

        if (!value && existingUrl && accept.includes('image')) {
            return (
                <img
                    src={existingUrl}
                    alt="existing"
                    className="w-full rounded-xl object-cover"
                />
            );
        }

        if (fileType === 'document' || (!value && existingName)) {
            return (
                <div className="flex items-center gap-3">
                    <FileText className="size-8 text-blue-500" />
                    <span className="truncate text-sm font-medium">
                        {value?.name ?? existingName}
                    </span>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center gap-2">
                <Upload className="size-8 text-yellow-500 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                <span className="text-sm font-semibold text-yellow-700 transition-colors duration-300 group-hover:text-yellow-800">
                    Upload File
                </span>
                {hasType(accept, '.pdf') && (
                    <span className="relative z-10 text-xs text-yellow-600/80">
                        PDF (maks. 2MB)
                    </span>
                )}
                {hasType(accept, '.jpg') && (
                    <span className="relative z-10 text-xs text-yellow-600/80">
                        JPG (maks. 2MB)
                    </span>
                )}
            </div>
        );
    };

    return (
        <div className="grid w-full gap-2">
            {label && <Label>{label}</Label>}

            <div
                onClick={handleClick}
                className={cn(
                    'group flex cursor-pointer items-center justify-center rounded-2xl border-2 border-yellow-300 bg-linear-to-br from-yellow-50 to-yellow-100 p-12 transition-all duration-300 ease-out hover:border-yellow-400 hover:from-yellow-100 hover:to-yellow-200 hover:shadow-lg',
                    disabled && 'cursor-not-allowed opacity-50',
                )}
            >
                {renderContent()}
            </div>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                disabled={disabled}
                onChange={handleChange}
            />

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
