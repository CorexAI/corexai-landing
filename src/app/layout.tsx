"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import { FaBars, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./globals.css";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <html lang="en">
      <head>
        {/* Essential Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        
        {/* SEO Meta Tags */}
        <meta name="description" content="Corex AI - The ultimate viral video script generator. Create scroll-stopping hooks, 60-second scripts, and viral content for TikTok, YouTube Shorts, and Instagram Reels. AI That Writes Viral Scripts." />
        <meta name="keywords" content="AI script generator, viral video scripts, TikTok content, YouTube Shorts, Instagram Reels, content creation, viral hooks, AI writing tool" />
        <meta name="author" content="Corex AI" />
        <meta name="robots" content="index, follow" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://corexai.app" />
        <meta property="og:title" content="Corex AI – Viral Script Generator" />
        <meta property="og:description" content="AI That Writes Viral Scripts. Create viral content for TikTok, YouTube Shorts, and Instagram Reels." />
        <meta property="og:image" content="https://corexai.app/og%20web%20final.png" />
        <meta property="og:site_name" content="Corex AI" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://corexai.app" />
        <meta property="twitter:title" content="Corex AI – Viral Script Generator" />
        <meta property="twitter:description" content="AI That Writes Viral Scripts. Create viral content for TikTok, YouTube Shorts, and Instagram Reels." />
        <meta property="twitter:image" content="https://corexai.app/og%20web%20final.png" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple%20touch%20web%20.png" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <nav className="w-full flex items-center justify-between py-4 px-4 md:py-7 md:px-40 bg-black bg-opacity-80 border-b border-gray-800 sticky top-0 z-50 backdrop-blur">
          <div className="flex items-center gap-2 md:gap-3">
            <Link href="/">
              <Image src="/logo.png" alt="Corex AI Logo" width={60} height={60} className="h-8 md:h-[60px] w-auto" />
            </Link>
            <span
              className="text-white tracking-wide whitespace-nowrap items-center"
              style={{ fontSize: '20px', fontWeight: 'bold' }}
            >
              <span className="hidden md:inline" style={{ fontSize: '45px', fontWeight: 'bold' }}>Corex AI</span>
              <span className="md:hidden">Corex AI</span>
            </span>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 text-white font-medium items-center">
            <Link href="/" className="hover:text-blue-400 transition">Home</Link>
            <Link href="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
            <Link href="/terms" className="hover:text-blue-400 transition">Terms</Link>
            <Link href="/privacy" className="hover:text-blue-400 transition">Privacy</Link>
          </div>
          {/* Mobile Hamburger */}
          <button className="md:hidden text-white text-3xl ml-auto" onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars />
          </button>
          {/* Mobile Dropdown */}
          {menuOpen && (
            <div className="absolute top-full right-4 mt-2 w-48 bg-black bg-opacity-95 rounded-lg shadow-lg flex flex-col z-50 md:hidden">
              <Link href="/" className="px-6 py-3 hover:bg-blue-900/40 transition text-white text-left" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link href="/pricing" className="px-6 py-3 hover:bg-blue-900/40 transition text-white text-left" onClick={() => setMenuOpen(false)}>Pricing</Link>
              <Link href="/terms" className="px-6 py-3 hover:bg-blue-900/40 transition text-white text-left" onClick={() => setMenuOpen(false)}>Terms</Link>
              <Link href="/privacy" className="px-6 py-3 hover:bg-blue-900/40 transition text-white text-left" onClick={() => setMenuOpen(false)}>Privacy</Link>
            </div>
          )}
        </nav>
        <main>{children}</main>
        <footer className="w-full py-6 px-8 bg-black bg-opacity-80 border-t border-gray-800 text-gray-400 text-center text-sm flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-6">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
            <span>© {new Date().getFullYear()} Corex AI. All rights reserved.</span>
            <Link href="/" className="hover:text-blue-400">Home</Link>
            <Link href="/pricing" className="hover:text-blue-400">Pricing</Link>
            <Link href="/terms" className="hover:text-blue-400">Terms</Link>
            <Link href="/privacy" className="hover:text-blue-400">Privacy</Link>
            <a href="mailto:corexai.app@gmail.com" className="hover:text-blue-400 font-semibold">Support</a>
          </div>
          <div className="flex flex-row justify-center md:justify-end gap-4 mt-2 md:mt-0">
            <a href="https://www.instagram.com/corexai.app?igsh=MTUxbHU0bmtvbHQ4Nw==" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-2xl flex items-center"><FaInstagram /></a>
            <a href="https://x.com/CorexAi_App" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-2xl flex items-center"><FaXTwitter /></a>
          </div>
        </footer>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S0BW6QH09J"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S0BW6QH09J');
          `}
        </Script>
      </body>
    </html>
  );
}
