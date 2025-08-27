"use client";
import Image from "next/image";
import AnimatedSections from "./AnimatedSections";
import { motion } from "framer-motion";
import Head from "next/head";



export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Corex AI",
    "description": "The ultimate viral video script generator for TikTok, Instagram Reels, and YouTube Shorts",
    "url": "https://corexai.app",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://corexai.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Corex AI",
      "logo": {
        "@type": "ImageObject",
        "url": "https://corexai.app/og%20web%20final.png"
      },
      "sameAs": [
        "https://twitter.com/corexai",
        "https://instagram.com/corexai.app"
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free plan available with 3 generations per week"
    }
  };

  return (
    <>
      <Head>
        <title>Corex AI - The Ultimate Viral Video Script Generator | TikTok, Reels & Shorts</title>
        <meta name="description" content="Stop guessing, start trending! Corex AI turns your raw ideas into viral video scripts for TikTok, Instagram Reels, and YouTube Shorts. AI-powered hooks and scripts that stop the scroll." />
        <meta name="keywords" content="AI script generator, viral video scripts, TikTok content, YouTube Shorts, Instagram Reels, content creation, viral hooks, AI writing tool, viral marketing" />
        <meta name="author" content="Corex AI Team" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://corexai.app" />
        <meta property="og:site_name" content="Corex AI" />
        <meta property="og:title" content="Corex AI - The Ultimate Viral Video Script Generator" />
        <meta property="og:description" content="Stop guessing, start trending! Corex AI turns your raw ideas into viral video scripts for TikTok, Instagram Reels, and YouTube Shorts." />
        <meta property="og:image" content="https://corexai.app/og%20web%20final.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Corex AI - Viral Video Script Generator" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@corexai" />
        <meta name="twitter:creator" content="@corexai" />
        <meta name="twitter:title" content="Corex AI - The Ultimate Viral Video Script Generator" />
        <meta name="twitter:description" content="Stop guessing, start trending! Corex AI turns your raw ideas into viral video scripts for TikTok, Instagram Reels, and YouTube Shorts." />
        <meta name="twitter:image" content="https://corexai.app/og%20web%20final.png" />
        
        {/* Canonical */}
        <link rel="canonical" href="https://corexai.app" />
      </Head>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className="flex flex-col items-center w-full min-h-screen bg-black text-white absolute top-0 left-0 right-0 overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent animate-pulse"></div>
      
      {/* Gradient Flow Animation */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Additional Glow Elements */}
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-1/3 left-1/3 w-72 h-72 bg-blue-300/4 rounded-full blur-3xl animate-pulse delay-3000"></div>
      
      {/* Minimal Top Section Particles - Evenly Distributed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top area only - avoiding heading and subheading */}
        <div className="absolute top-10 left-10 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-15 right-10 w-1 h-1 bg-blue-300/30 rounded-full animate-bounce delay-1000 shadow-lg shadow-blue-300/20"></div>
        <div className="absolute top-20 left-1/4 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce delay-2000 shadow-lg shadow-blue-500/20"></div>
        <div className="absolute top-25 right-1/4 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-bounce delay-3000 shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-30 left-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-bounce delay-4000 shadow-lg shadow-blue-300/20"></div>
        <div className="absolute top-35 right-1/3 w-1 h-1 bg-blue-500/30 rounded-full animate-bounce delay-5000 shadow-lg shadow-blue-500/20"></div>
        <div className="absolute top-40 left-2/3 w-1.5 h-1.5 bg-blue-400/40 rounded-full animate-bounce delay-6000 shadow-lg shadow-blue-400/20"></div>
        <div className="absolute top-45 right-2/3 w-1 h-1 bg-blue-300/30 rounded-full animate-bounce delay-7000 shadow-lg shadow-blue-300/20"></div>
      </div>

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center min-h-screen px-4 md:px-8 relative z-10 mt-0 md:mt-0 pt-0 md:pt-0 mb-0 md:mb-0">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-6 md:mb-8 leading-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-pulse">
              Stop Guessing.
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Start Trending.
            </span>
          </h1>

          {/* Subheadline - Bigger, Direct, 2 Lines Max */}
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/70 mb-8 md:mb-12 max-w-4xl md:max-w-5xl mx-auto leading-relaxed font-medium px-4" style={{ fontFamily: 'var(--font-sen)' }}>
            AI that turns your raw idea into a viral video script ready for TikTok, Reels, or Shorts.
          </p>

          {/* CTA Button */}
          <div className="flex flex-col items-center space-y-4 mb-6 md:mb-8">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onClick={() => window.location.href = '/signup'}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 md:px-12 py-4 md:py-5 rounded-lg text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl w-full max-w-xs md:max-w-sm lg:max-w-md"
            >
              Start Free
            </motion.button>
            <p className="text-xs md:text-sm text-gray-500">No credit card required.</p>
          </div>
          
          {/* Micro Trust Signal - TikTok • Reels • Shorts */}
          <div className="flex items-center justify-center space-x-4 md:space-x-8 text-gray-400/60">
            <span className="text-xs md:text-sm font-medium">TikTok</span>
            <span className="text-gray-500/30">•</span>
            <span className="text-xs md:text-sm font-medium">Reels</span>
            <span className="text-gray-500/30">•</span>
            <span className="text-xs md:text-sm font-medium">Shorts</span>
          </div>
        </div>
      </section>
      <AnimatedSections />
    </div>
    </>
  );
}
