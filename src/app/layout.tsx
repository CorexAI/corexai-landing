import { Geist, Geist_Mono } from "next/font/google";
import { Sen } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import ConditionalHeader from "./components/ConditionalHeader";
import { UserProvider } from "@/contexts/UserContext";
import { ToastProvider } from "@/contexts/ToastContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const sen = Sen({
  variable: "--font-sen",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        
        {/* Font preloading for better performance */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap" as="style" />
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Sen:wght@400..800&display=swap" as="style" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} ${sen.variable} antialiased`}>
        <UserProvider>
          <ToastProvider>
            <ConditionalHeader />
            <main className="m-0 p-0">{children}</main>
          </ToastProvider>
        </UserProvider>
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
