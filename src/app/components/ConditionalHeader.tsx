"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function ConditionalHeader() {
  const pathname = usePathname();
  
  // Hide header on dashboard, auth, billing, payment, app pages, and protected routes
  const shouldHideHeader = pathname?.startsWith('/dashboard') || 
                          pathname?.startsWith('/signin') || 
                          pathname?.startsWith('/signup') ||
                          pathname?.startsWith('/forgot-password') ||
                          pathname === '/forgot-password' ||
                          pathname?.startsWith('/billing') ||
                          pathname === '/billing' ||
                          pathname?.startsWith('/payment') ||
                          pathname === '/payment' ||
                          pathname?.startsWith('/hook-generator') ||
                          pathname === '/hook-generator' ||
                          pathname?.startsWith('/full-script-creator') ||
                          pathname === '/full-script-creator' ||
                          pathname?.startsWith('/onboarding') ||
                          pathname === '/onboarding';

  if (shouldHideHeader) {
    return null;
  }

  return <Header />;
}
