import { cn } from "@/lib/utils";

export default function Heading({
    title,
    description,
    classNameTitle,
    classNameDescription
}: {
    title: string;
    description?: string;
    classNameTitle?: string;
    classNameDescription?: string;
}) {
    return (
        <div className="mb-8 space-y-0.5">
            <h2 className={cn("text-xl font-semibold tracking-tight", classNameTitle)}>{title}</h2>
            {description && (
                <p className={cn("text-sm text-muted-foreground", classNameDescription)}>{description}</p>
            )}
        </div>
    );
}
