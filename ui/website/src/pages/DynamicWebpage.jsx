import React, { useEffect, useState } from 'react';
import { useParams, Link } from "react-router";
import axios from 'axios';
import WebLayout from "../layouts/WebLayout";
import { DETAIL_WEBPAGE } from '../resources/server_apis';
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Copy, Calendar, User } from "lucide-react";
import Loading from "../components/Loading";
import NotFoundPage from '../components/NotFoundPage';

const DynamicWebpage = () => {
    const { slug } = useParams();
    const [page, setPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPage = async () => {
            try {
                setLoading(true);
                // Using the DETAIL_WEBPAGE endpoint. Assuming it needs the slug appended.
                const response = await axios.get(`${DETAIL_WEBPAGE}/${slug}`);

                if (response.data.status == true) {
                    console.log("Fetched page data:", response.data.webpage);
                    setPage(response.data.webpage);
                    // Dynamically set document title if available
                    if (response.data.webpage.title) {
                        document.title = `${response.data.webpage.title}`;
                    }
                } else {
                    throw new Error("No data received");
                }
                setError(null);
            } catch (err) {
                console.error("Error fetching page:", err);
                setError("Page not found or an error occurred.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) {
            fetchPage();
        }
    }, [slug]);

    if (loading) {
        return (
            <WebLayout>
                <Loading />
            </WebLayout>
        )
    }

    if (error || !page) {
        return (
            <WebLayout>
                <NotFoundPage />
            </WebLayout>
        )
    }

    return (
        <WebLayout>
            <div className="min-h-screen bg-background flex flex-col items-center py-12 sm:py-20">
                <article className="container max-w-4xl px-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Header Section */}
                    <div className="mb-8 space-y-4">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-primary leading-tight">
                            {page.title}
                        </h1>

                        {/* Meta/Subtitle if available, purely decorative for now if not in API response */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground font-medium">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date().toLocaleDateString()}</span>
                            </div>
                            {page.author && (
                                <>
                                    <span>•</span>
                                    <div className="flex items-center gap-1">
                                        <User className="h-4 w-4" />
                                        <span>{page.author || "Admin"}</span>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    <Separator className="my-8" />

                    {/* Featured Image */}
                    {page.featured_image && (
                        <div className="mb-12 w-full overflow-hidden rounded-2xl shadow-sm border bg-muted aspect-video relative group">
                            <img
                                src={page.featured_image}
                                alt={page.title || "Featured content"}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none text-foreground/90 leading-7 md:leading-8 text-lg">
                        {/* 
                           Display safe HTML content from the server.
                           The content is expected to be rich text (p, ul, h2, etc.)
                        */}
                        <div dangerouslySetInnerHTML={{ __html: page.content || "<p>No content available.</p>" }} />
                    </div>
                </article>
            </div>
        </WebLayout>
    )
}

export default DynamicWebpage;
