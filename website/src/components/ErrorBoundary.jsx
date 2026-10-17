import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });
        console.error('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-4">
                    <Card className="w-full max-w-md border-destructive/50 bg-destructive/5">
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                                <CardTitle>Something went wrong</CardTitle>
                            </div>
                            <CardDescription>
                                An unexpected error occurred while rendering this page.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {process.env.NODE_ENV === 'development' && (
                                <div className="bg-muted p-3 rounded text-xs overflow-auto max-h-48">
                                    <p className="font-mono text-destructive font-bold mb-2">
                                        {this.state.error?.toString()}
                                    </p>
                                    <pre className="text-muted-foreground">
                                        {this.state.errorInfo?.componentStack}
                                    </pre>
                                </div>
                            )}
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="flex-1"
                                >
                                    <RotateCcw className="mr-2 h-4 w-4" />
                                    Reload Page
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => window.history.back()}
                                    className="flex-1"
                                >
                                    Go Back
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
