import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import LandingPageLayout from "./layout/landing-page-layout";
import HeroSection from "./sections/hero-section";
import FiturSection from "./sections/fitur-section";
import ProdiSection from "./sections/prodi-section";
import HeroSection2 from "./sections/hero-section2";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function LandingPage() {
    return (
        <LandingPageLayout>
            <HeroSection2/>
            <FiturSection/>
            <ProdiSection/>
        </LandingPageLayout>
    )
};