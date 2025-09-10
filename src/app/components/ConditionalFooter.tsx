"use client";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function ConditionalFooter() {
  const pathname = usePathname();
  
  // Hide footer on dashboard, auth, billing, payment, and app pages
  const shouldHideFooter = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/signin') || 
                          pathname?.startsWith('/signup') ||
                          pathname?.startsWith('/billing') ||
                          pathname === '/billing' ||
                          pathname?.startsWith('/payment') ||
                          pathname === '/payment' ||
                          pathname?.startsWith('/hook-generator') ||
                          pathname === '/hook-generator' ||
                          pathname?.startsWith('/full-script-creator') ||
                          pathname === '/full-script-creator';

  if (shouldHideFooter) {
    return null;
  }

  return <Footer />;
}
