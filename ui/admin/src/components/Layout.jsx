import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    LayoutTemplate,
    Home,
    Info,
    Phone,
    Settings,
    Menu
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Webpages', path: '/webpages', icon: LayoutTemplate },
    { name: 'Home', path: '/home', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
    { name: 'Settings', path: '/settings', icon: Settings },
];

const Sidebar = ({ className, onClose }) => {
    const location = useLocation();

    return (
        <div className={`flex flex-col h-full bg-card border-r ${className}`}>
            <div className="p-6 border-b">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    RepairCMS
                </h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group
                ${isActive
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`} />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-4 border-t">
                <div className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">Admin User</p>
                        <p className="text-xs text-muted-foreground truncate">admin@example.com</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function Layout() {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background flex">
            {/* Desktop Sidebar */}
            <aside className="hidden md:block w-64 fixed inset-y-0 z-50">
                <Sidebar />
            </aside>

            {/* Mobile Sidebar */}
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
                <SheetContent side="left" className="p-0 w-64">
                    <Sidebar onClose={() => setIsMobileOpen(false)} />
                </SheetContent>
            </Sheet>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen transition-all duration-300">
                <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 px-6 flex items-center justify-between md:justify-end">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setIsMobileOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </Button>

                    <div className="flex items-center gap-4">
                        {/* Add header actions here like notifications, search, etc */}
                    </div>
                </header>

                <div className="flex-1 p-6 md:p-8 pt-6 max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
