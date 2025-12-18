import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { NavLink } from 'react-router'

const Navbar = () => {
    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full">
            <NavigationMenu className="rounded-full border border-border/40 bg-background/60 backdrop-blur-xl shadow-sm">
                <NavigationMenuList className="px-2 py-1">
                    <NavigationMenuItem>
                        <NavLink
                            to="/"
                            className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[active]:bg-accent/50 rounded-full")}
                        >
                            Home
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/about"
                            className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[active]:bg-accent/50 rounded-full")}
                        >
                            About
                        </NavLink>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavLink
                            to="/contact"
                            className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-accent/50 data-[active]:bg-accent/50 rounded-full")}
                        >
                            Contact
                        </NavLink>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default Navbar
