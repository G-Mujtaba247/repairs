export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[60vh] flex flex-col gap-6 animate-pulse">
            <div className="h-12 w-3/4 bg-muted rounded-md" />
            <div className="h-4 w-1/3 bg-muted rounded-md" />
            <div className="h-px w-full bg-border my-4" />
            <div className="h-96 w-full bg-muted rounded-xl" />
            <div className="space-y-3 mt-8">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-5/6 bg-muted rounded" />
            </div>
        </div>
    )
}