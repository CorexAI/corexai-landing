"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-2 left-0 right-0 z-50 w-full py-4">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        <div className="backdrop-blur-md bg-black/30 border border-white/20 rounded-full shadow-lg">
          <div className="flex justify-between items-center px-8 py-6">
            {/* Left side - Logo + Brand Name */}
            <div className="flex items-center space-x-4">
              <Image
                src="/logo.png"
                alt="Corex AI Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="text-white font-semibold text-xl">Corex AI</span>
            </div>

            {/* Right side - Navigation + CTAs */}
            <div className="flex items-center space-x-8">
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center space-x-8">
                <Link href="/" className="text-white hover:text-blue-400 transition-colors duration-200 text-base font-medium">
                  Home
                </Link>
                <Link href="/pricing" className="text-white hover:text-blue-400 transition-colors duration-200 text-base font-medium">
                  Pricing
                </Link>
                <Link href="/blog" className="text-white hover:text-blue-400 transition-colors duration-200 text-base font-medium">
                  Blog
                </Link>
              </nav>

              {/* CTA Buttons */}
              <div className="hidden md:flex items-center space-x-5">
                <button 
                  onClick={() => window.location.href = '/signin'}
                  className="text-white border border-white/20 hover:bg-white/10 px-6 py-3 rounded-lg transition-all duration-200 text-base font-medium"
                >
                  Sign In
                </button>
                <button 
                  onClick={() => window.location.href = '/signup'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium text-base"
                >
                  Sign Up
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Smooth Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="md:hidden mt-2 bg-black/90 backdrop-blur-md border border-white/20 rounded-lg shadow-lg w-48 ml-auto mr-4"
            >
              <div className="px-3 py-3">
                <nav className="flex flex-col space-y-2 mb-3">
                  <Link 
                    href="/" 
                    className="text-white hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </Link>
                  <Link 
                    href="/pricing" 
                    className="text-white hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <Link 
                    href="/blog" 
                    className="text-white hover:text-blue-400 transition-colors duration-200 text-sm font-medium py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </nav>

                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => {
                      window.location.href = '/signin';
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-white border border-white/20 hover:bg-white/10 px-3 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = '/signup';
                      setIsMobileMenuOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
