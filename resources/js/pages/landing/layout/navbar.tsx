'use client';
import {
    MobileNav,
    MobileNavHeader,
    MobileNavMenu,
    MobileNavToggle,
    Navbar,
    NavbarButton,
    NavbarLogo,
    NavBody,
    NavItems,
} from '@/components/ui/resizable-navbar';
import { dashboard, login } from '@/routes';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Footer from './footer';
import { SharedData } from '@/types';

export default function NavbarSection({
    children,
}: {
    children: React.ReactNode;
}) {
    const navItems = [
        {
            name: 'Beranda',
            link: '#beranda',
        },
        {
            name: 'Fitur Utama',
            link: '#fitur',
        },
        {
            name: 'Prodi',
            link: '#prodi',
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { auth } = usePage<SharedData>().props

    return (
        <div className="relative w-full dark:bg-white">
            <Navbar>
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems}/>
                    <div className="flex items-center gap-4">
                        <NavbarButton variant="primary">
                            {auth.user ? (<Link href={dashboard()} prefetch>Dashboard</Link>) : (<Link href={login()} prefetch>Login</Link>)}
                        </NavbarButton>
                        {/* <NavbarButton variant="primary">
                            Book a call
                        </NavbarButton> */}
                    </div>
                </NavBody>
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-neutral-600 dark:text-neutral-300"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <NavbarButton
                                onClick={() => setIsMobileMenuOpen(false)}
                                variant="primary"
                                className="w-full"
                            >
                                Login
                            </NavbarButton>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
            {children}
            <Footer/>
        </div>
    );
}
