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
import absensi from '@/routes/absensi';
import bahanHabisPakai from '@/routes/bahan-habis-pakai';
import dataAlat from '@/routes/data-alat';
import jadwal from '@/routes/jadwal';
import laporan from '@/routes/laporan';
import notifikasi from '@/routes/notifikasi';
import peminjaman from '@/routes/peminjaman';
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

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const masterNavItems: NavItem[] = [
    {
        title: 'Data Alat',
        href: dataAlat.index(),
        icon: Wrench,
    },
    {
        title: 'Bahan Habis Pakai',
        href: bahanHabisPakai.index(),
        icon: Boxes,
    },
    {
        title: 'Jadwal Kegiatan',
        href: jadwal.index(),
        icon: CalendarDays,
    },
];

const transactionNavItems: NavItem[] = [
    {
        title: 'Peminjaman BHP',
        href: peminjaman.index(),
        icon: BookOpen,
    },
    {
        title: 'Absensi',
        href: absensi.index(),
        icon: ClipboardCheck,
    },
];

const reportNavItems: NavItem[] = [
    {
        title: 'Laporan',
        href: laporan.index(),
        icon: FileText,
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
                <NavMain items={mainNavItems} label='Menu'/>
                <NavMain items={masterNavItems} label='Master Data'/>
                <NavMain items={transactionNavItems} label='Transaksi'/>
                <NavMain items={reportNavItems} label='Laporan'/>
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
