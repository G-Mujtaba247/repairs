import React, { useEffect, useState } from 'react'
import { Facebook, Instagram, Linkedin, Wrench } from 'lucide-react'
import axios from 'axios';
import { LIST_WEBPAGES } from '../resources/server_apis';
import { NavLink } from 'react-router';

const Footer = () => {

    const [webpages, setWebpages] = useState([]);

    useEffect (() => {
        const fetchWebpages = async () => {
            try {
                const response = await axios.get(LIST_WEBPAGES);
                if (response.data.status === true) {
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
                            <div className="bg-sky-500 text-white p-1.5 rounded-md">
                                <Wrench className="w-4 h-4" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">RepairHub</span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                            Connecting you with certified technicians for fast, affordable, and reliable device repairs — phones, laptops, appliances, and more.
                        </p>
                        <div className="flex items-center gap-4 mt-2">
                            <a href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 lg:col-span-3 lg:justify-items-end">
                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Services</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><NavLink to="/" className="hover:text-foreground transition-colors">Home</NavLink></li>
                                <li><NavLink to="/find-technician" className="hover:text-foreground transition-colors">Find a Technician</NavLink></li>
                                <li><NavLink to="/technician-register" className="hover:text-foreground transition-colors">Become a Technician</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-foreground transition-colors">Book a Repair</NavLink></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Company</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><NavLink to="/about" className="hover:text-foreground transition-colors">About Us</NavLink></li>
                                <li><NavLink to="/contact" className="hover:text-foreground transition-colors">Contact</NavLink></li>
                            </ul>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="font-semibold text-foreground">Support</h3>
                            <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                                <li><NavLink to="/contact" className="hover:text-foreground transition-colors">Get Help</NavLink></li>
                                <li><NavLink to="/auth" className="hover:text-foreground transition-colors">Sign In</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>© {new Date().getFullYear()} RepairHub. All rights reserved.</p>
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
