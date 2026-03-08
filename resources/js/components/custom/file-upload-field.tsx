import { useRef, useState, useEffect } from 'react'
import { Upload, FileText, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Label } from '../ui/label'

type FileUploadFieldProps = {
    label?: string
    value?: File | null
    existingUrl?: string | null
    existingName?: string | null
    accept?: string
    disabled?: boolean
    error?: string
    onChange: (file: File | null) => void
}

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
    const inputRef = useRef<HTMLInputElement>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [fileType, setFileType] = useState<'image' | 'document' | null>(null)

    useEffect(() => {
        if (!value) return

        if (value.type.startsWith('image/')) {
            setFileType('image')
            const reader = new FileReader()
            reader.onload = (e) => {
                setPreview(e.target?.result as string)
            }
            reader.readAsDataURL(value)
        } else {
            setFileType('document')
            setPreview(null)
        }
    }, [value])

    const handleClick = () => {
        if (!disabled) inputRef.current?.click()
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null
        onChange(file)
    }

    const renderContent = () => {
        if (fileType === 'image' && preview) {
            return (
                <img
                    src={preview}
                    alt="preview"
                    className="w-full rounded-xl object-cover"
                />
            )
        }

        if (!value && existingUrl && accept.includes('image')) {
            return (
                <img
                    src={existingUrl}
                    alt="existing"
                    className="w-full rounded-xl object-cover"
                />
            )
        }

        if (fileType === 'document' || (!value && existingName)) {
            return (
                <div className="flex items-center gap-3">
                    <FileText className="size-8 text-blue-500" />
                    <span className="text-sm font-medium truncate">
                        {value?.name ?? existingName}
                    </span>
                </div>
            )
        }

        return (
            <div className="flex flex-col items-center gap-2">
                <Upload className="size-8 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                    Upload File
                </span>
            </div>
        )
    }

    return (
        <div className="grid w-full gap-2">
            {label && (
                <Label>{label}</Label>
            )}

            <div
                onClick={handleClick}
                className={cn(
                    'flex cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-6 transition hover:bg-muted/50',
                    disabled && 'opacity-50 cursor-not-allowed'
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

            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}