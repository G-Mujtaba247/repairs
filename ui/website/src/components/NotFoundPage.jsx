import { Copy } from "lucide-react";
import { NavLink } from "react-router";
import { Button } from "./ui/button";

export default function NotFoundPage() {
    return (
        <div className="container mx-auto px-4 py-24 max-w-md text-center min-h-[60vh] flex flex-col items-center justify-center">
            <div className="bg-destructive/10 text-destructive p-4 rounded-full mb-6">
                <Copy className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold mb-3 tracking-tight">Page Not Found</h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
                We couldn't find the page you're looking for. It might have been moved or deleted.
            </p>
            <Button asChild size="lg">
                <NavLink to="/">Back to Home</NavLink>
            </Button>
        </div>
    )
}