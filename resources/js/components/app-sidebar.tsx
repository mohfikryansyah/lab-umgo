import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    Bell,
    BookOpen,
    Boxes,
    CalendarDays,
    ClipboardCheck,
    FileText,
    Folder,
    LayoutGrid,
    Wrench,
} from 'lucide-react';
import AppLogo from './app-logo';
import absensi from '@/routes/absensi';
import jadwal from '@/routes/jadwal';
import dataAlat from '@/routes/data-alat';
import laporan from '@/routes/laporan';
import notifikasi from '@/routes/notifikasi';
import stok from '@/routes/stok';
import peminjaman from '@/routes/peminjaman';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Jadwal',
        href: jadwal.index(),
        icon: CalendarDays,
    },
    {
        title: 'Absensi',
        href: absensi.index(),
        icon: ClipboardCheck,
    },
    {
        title: 'Bahan Habis Pakai',
        href: '#',
        icon: Boxes,
        isActive: window.location.pathname.startsWith('/bahan-habis-pakai'),
        items: [
            {
                title: 'Stok BHP',
                href: stok.index(),
            },
            {
                title: 'Peminjaman BHP',
                href: peminjaman.index(),
            }
        ]
    },
    {
        title: 'Data Alat',
        href: dataAlat.index(),
        icon: Wrench,
    },
    {
        title: 'Laporan',
        href: laporan.index(),
        icon: FileText,
    },
    {
        title: 'Notifikasi',
        href: notifikasi.index(),
        icon: Bell,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
