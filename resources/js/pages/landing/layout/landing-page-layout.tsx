import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import React, { type PropsWithChildren } from 'react';
import NavbarSection from './navbar';

export default function LandingPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-1 flex-col w-full">
            <Head title="Landing Page"></Head>
            <NavbarSection children={children} />
        </main>
    );
}
