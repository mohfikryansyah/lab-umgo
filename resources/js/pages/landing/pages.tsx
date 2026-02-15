import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Head } from "@inertiajs/react";
import LandingPageLayout from "./layout/landing-page-layout";
import HeroSection from "./sections/hero-section";
import FiturSection from "./sections/fitur-section";
import ProdiSection from "./sections/prodi-section";
import BackgroundRippleEffectDemo from "./sections/background-tes";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function LandingPage() {
    return (
        <LandingPageLayout>
            <BackgroundRippleEffectDemo/>
            {/* <HeroSection/> */}
            <FiturSection/>
            <ProdiSection/>
        </LandingPageLayout>
    )
};