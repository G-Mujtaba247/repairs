import React, { useEffect, useState } from 'react'
import { Facebook, Instagram, Linkedin, Hexagon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { LIST_WEBPAGES } from '../resources/server_apis';
import { NavLink } from 'react-router';

const Footer = () => {

    const [webpages, setWebpages] = useState([]);

    useEffect (() => {
        const fetchWebpages = async () => {
            try {
                const response = await axios.get(LIST_WEBPAGES);
                console.log('Webpages response:', response.data.webpages);
                if (response.data.status == true) {
                    setWebpages(response.data.webpages);
                } else {
                    setWebpages([]);
                }
            } catch (error) {
                setWebpages([])
                console.error('Error fetching webpages:', error);
            }
        };

        fetchWebpages();
    }, [])

    return (
        <footer className="w-full py-12 md:py-16 lg:py-20 bg-background border-t border-border/40">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Section */}
                    <div className="flex flex-col gap-4 lg:col-span-1">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground p-1 rounded-md">
                                <Hexagon className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">Graphy</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Graphy empowers teams to transform raw data into clear, compelling visuals — making insights easier to share, understand, and act on.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Facebook className="w-5 h-5" />
                                <span className="sr-only">Facebook</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="w-5 h-5" />
                                <span className="sr-only">Instagram</span>
                            </a>
                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                        </div>
                    </div>

                    {/* Links Sections - Spanning 3 columns on large screens */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-3 lg:justify-items-end">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Links</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><a href="/" className="hover:text-foreground transition-colors">Home</a></li>
                                <li><a href="/about" className="hover:text-foreground transition-colors">About</a></li>
                                <li><a href="/contact" className="hover:text-foreground transition-colors">Contact</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Resources</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Tutorials</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Support</a></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Company</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-foreground transition-colors">Partners</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© 2025 Graphy. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        {
                            webpages.length > 0 && webpages.map((page) => (
                                <NavLink key={page.id} to={"/" + page.slug} className="hover:text-foreground transition-colors underline underline-offset-4">{page.title}</NavLink>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
