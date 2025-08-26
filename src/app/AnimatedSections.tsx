"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCamera, HiOutlineChartBar } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import TestimonialSlider from "./TestimonialSlider";
import Footer from "./components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedSections() {
  return (
    <>
      {/* Features Section (animated) */}
      <motion.section
        className="w-full max-w-6xl md:max-w-5xl lg:max-w-7xl mx-auto px-2 md:px-4 mt-4 md:mt-20 relative pt-6 md:pt-12 pb-12 md:pb-16"
      >
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-transparent to-purple-600/15 rounded-3xl blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-purple-500/6 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 left-1/3 w-1 h-1 bg-blue-500/70 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute top-60 right-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute top-80 left-2/3 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bounce delay-4000"></div>
          <div className="absolute top-100 right-1/4 w-1 h-1 bg-purple-500/50 rounded-full animate-bounce delay-5000"></div>
        </div>

        {/* Premium Badge */}
        <motion.div
          className="relative z-20 flex justify-center mb-6 md:mb-8"
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl">
            <span className="text-blue-300 font-semibold text-xs md:text-sm tracking-wider">AI-POWERED VIRAL ENGINE</span>
          </div>
        </motion.div>
        
        <div className="relative z-10 text-center max-w-4xl sm:max-w-5xl md:max-w-6xl mx-auto">
          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight group cursor-pointer" 
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <motion.span 
              className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              Everything you need
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent inline-block"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              to go viral.
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-300 leading-relaxed font-light max-w-3xl md:max-w-4xl mx-auto relative px-4" 
            style={{ fontFamily: 'var(--font-sen)' }}
          >
            <span className="relative">
              Tools that hook you in 
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold"> 3 seconds </span>
              and crush the rest of your content.
            </span>
          </motion.p>
        </div>

        {/* Premium Border Effect */}
        <div className="absolute inset-0 border border-blue-400/20 rounded-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
      </motion.section>
      <motion.section
        id="features-section"
        className="w-full max-w-6xl md:max-w-5xl lg:max-w-7xl py-8 md:py-12 px-2 md:px-4 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {/* Viral Hooks */}
          <motion.div 
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-purple-600/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-300/60 hover:bg-black/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-md border border-blue-400/60 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.5 2.54l2.6 1.53c.56-1.24.9-2.62.9-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.47 10 9.99 10 3.31 0 6.24-1.61 8.06-4.09l-2.6-1.53C16.17 17.98 14.21 19 12 19z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3 md:mb-4">Viral Hooks</h3>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">Openers engineered to cut through the scroll, hook instantly, and set your story up for maximum impact—ready to deploy.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 60-Second Scripts */}
          <motion.div 
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-purple-600/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-300/60 hover:bg-black/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-md border border-blue-400/60 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3 md:mb-4">Viral Scripts</h3>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">Scene-by-scene voice lines built for retention, pacing, and payoff—ready to record.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Visuals & CTAs */}
          <motion.div 
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-purple-600/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-300/60 hover:bg-black/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-md border border-blue-400/60 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3 md:mb-4">Visuals & CTAs</h3>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">Shot ideas, overlays, and call-to-action prompts that spark comments and shares.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Algorithm-Friendly */}
          <motion.div 
            className="group relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-purple-600/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-6 md:p-8 lg:p-10 hover:border-blue-300/60 hover:bg-black/50 transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/40">
              <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                <div className="flex-shrink-0 flex justify-center md:justify-start">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500/50 to-purple-600/50 backdrop-blur-md border border-blue-400/60 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-300">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
                    </svg>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent mb-3 md:mb-4">Algorithm-Friendly</h3>
                  <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed font-light">Formatting tuned for TikTok, Reels, and Shorts so your video hits the feed right.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

             {/* Problem Section */}
      <motion.section
         className="w-full px-4 md:px-20 lg:px-24 mt-20 md:mt-50 mb-16 md:mb-20 relative"
       >
        

                 <div className="flex flex-col items-center gap-8 md:gap-12 lg:gap-16">
          {/* Content Section - Centered */}
          <div className="w-full max-w-4xl text-center">


            <motion.h2
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 md:mb-6 leading-tight" 
              style={{ fontFamily: 'var(--font-geist-sans)' }}
            >
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                You're not boring,
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-red-500 bg-clip-text text-transparent">
                Your opener is.
              </span>
            </motion.h2>

                         <motion.p
               className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed font-light max-w-3xl mx-auto mb-8 md:mb-12 px-4" 
               style={{ fontFamily: 'var(--font-sen)' }}
             >
               If the first line doesn't hit, the rest never gets heard. Corex front-loads impact so your idea actually lands.
             </motion.p>
          </div>

          {/* Demo Video Section - Below Content */}
          <motion.div
            className="w-full max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl relative"
          >
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl blur-2xl"></div>
              
                             {/* Demo Video */}
               <div className="relative">
                 {/* Premium Glow Effect */}
                 <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-blue-600/30 rounded-3xl blur-3xl scale-110"></div>
                 
                 {/* Premium Border */}
                 <div className="relative bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-blue-500/40 rounded-3xl p-[2px]">
                   <div className="bg-black/40 backdrop-blur-xl rounded-3xl">
                     <video 
                       src="/demo-video.mp4" 
                       className="w-full h-auto rounded-3xl shadow-2xl hover:scale-[1.03] transition-all duration-700 hover:shadow-blue-500/25 [&::-webkit-media-controls]:!hidden [&::-webkit-media-controls-panel]:!hidden [&::-webkit-media-controls-play-button]:!hidden [&::-webkit-media-controls-start-playback-button]:!hidden [&::-webkit-media-controls-overlay-play-button]:!hidden [&::-webkit-media-controls-overlay-enclosure]:!hidden [&::-webkit-media-controls-enclosure]:!hidden [&::-webkit-media-controls-timeline]:!hidden [&::-webkit-media-controls-current-time-display]:!hidden [&::-webkit-media-controls-time-remaining-display]:!hidden [&::-webkit-media-controls-volume-slider]:!hidden [&::-webkit-media-controls-mute-button]:!hidden [&::-webkit-media-controls-fullscreen-button]:!hidden [&::-webkit-media-controls-play-button]:!absolute [&::-webkit-media-controls-play-button]:!top-1/2 [&::-webkit-media-controls-play-button]:!left-1/2 [&::-webkit-media-controls-play-button]:!transform [&::-webkit-media-controls-play-button]:!-translate-x-1/2 [&::-webkit-media-controls-play-button]:!-translate-y-1/2 [&::-webkit-media-controls-play-button]:!z-10"
                       autoPlay
                       loop
                       muted
                       playsInline
                       preload="auto"
                       controls={false}
                       disablePictureInPicture
                       disableRemotePlayback
                       onLoadedData={(e) => {
                         const video = e.target as HTMLVideoElement;
                         video.play().catch(() => {
                           // Fallback: try to play again after a short delay
                           setTimeout(() => video.play(), 100);
                         });
                       }}
                       onCanPlay={(e) => {
                         const video = e.target as HTMLVideoElement;
                         video.play().catch(() => {
                           setTimeout(() => video.play(), 200);
                         });
                       }}
                       style={{
                         '--webkit-media-controls': 'none',
                         '--webkit-media-controls-overlay-play-button': 'none',
                         '--webkit-media-controls-enclosure': 'none',
                         position: 'relative'
                       } as React.CSSProperties}
                     />
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

                  {/* How It Works Section */}
            <motion.section
              className="w-full px-4 md:px-20 lg:px-24 mt-20 md:mt-60 mb-16 md:mb-20 relative"
            >
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-3xl blur-3xl"></div>
        
        <motion.div
          className="text-center mb-12 md:mb-20 relative z-10"
        >
          <motion.div
            className="mb-4 md:mb-6"
          >
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent font-semibold text-base md:text-lg tracking-wider uppercase">
              The Viral Formula
            </span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-6 md:mb-8 leading-tight" 
              style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              From Idea to
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
              Viral in 3 Steps
            </span>
          </h2>
          
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-3xl md:max-w-4xl mx-auto px-4" 
             style={{ fontFamily: 'var(--font-sen)' }}>
            Transform your raw ideas into algorithm-crushing content that stops the scroll
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative z-10">
          {/* Step 1: Drop Your Idea */}
          <motion.div
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-500 hover:border-blue-400/30 hover:shadow-2xl hover:shadow-blue-500/10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center">Drop Your Idea</h3>
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">Share your story, concept, or message. Our AI understands your vision and crafts the perfect hook.</p>
            </div>
          </motion.div>

          {/* Step 2: Pick Your Vibe */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-30px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-500 hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center">Pick Your Vibe</h3>
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">Pick your tone, mood, or energy. Our AI adapts instantly and matches your brand voice.</p>
            </div>
          </motion.div>

          {/* Step 3: Go Viral */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-30px" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group"
          >
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-gray-900/80 backdrop-blur-xl border border-gray-700/30 rounded-3xl p-6 md:p-8 hover:scale-105 transition-all duration-500 hover:border-orange-400/30 hover:shadow-2xl hover:shadow-orange-500/10">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:scale-110 transition-transform duration-500">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 text-center">Go Viral</h3>
              <p className="text-gray-300 text-sm md:text-base text-center leading-relaxed">Get your hook, script, and visuals ready to crush the algorithm. Post and watch the views roll in.</p>
            </div>
          </motion.div>
        </div>


              </motion.section>

      {/* New Section: It's time to cheat */}
      <motion.section
        className="w-full max-w-6xl mx-auto px-8 md:px-12 lg:px-16 mt-20 md:mt-60 mb-16 md:mb-20 relative"
      >
        {/* Premium Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-500/20 rounded-3xl blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-300/6 rounded-full blur-3xl animate-pulse delay-4000"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-20 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
          <div className="absolute top-20 right-32 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-bounce delay-1000"></div>
          <div className="absolute top-40 left-1/3 w-1 h-1 bg-blue-500/70 rounded-full animate-bounce delay-2000"></div>
          <div className="absolute top-60 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-3000"></div>
          <div className="absolute top-80 left-2/3 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bounce delay-4000"></div>
          <div className="absolute top-100 right-1/4 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce delay-5000"></div>
        </div>

        {/* Premium Border Effect */}
        <div className="absolute inset-0 border border-blue-400/20 rounded-3xl pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
        
        <div className="text-center relative z-10 py-12 md:py-16">
          {/* Premium Badge */}
          <motion.div
            className="mb-6 md:mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-4 md:px-6 py-2 md:py-3 shadow-xl inline-block">
              <span className="text-blue-300 font-semibold text-xs md:text-sm tracking-wider uppercase">It's time to cheat.</span>
            </div>
          </motion.div>
          
          <motion.h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 md:mb-8 leading-tight group cursor-pointer" 
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <motion.span 
              className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent inline-block"
            >
              Marketers. Creators.
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text text-transparent inline-block"
            >
              Founders. Agencies.
            </motion.span>
            <br />
            <motion.span 
              className="bg-gradient-to-r from-blue-300 via-blue-400 to-blue-500 bg-clip-text text-transparent inline-block"
            >
              Even Students.
            </motion.span>
          </motion.h2>
          
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-3xl md:max-w-4xl mx-auto mb-8 md:mb-12 relative px-4" 
            style={{ fontFamily: 'var(--font-sen)' }}
          >
            <span className="relative">
              Creators Secret Weapon. 
              <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-semibold"> Now Yours?</span>
            </span>
          </motion.p>

          <motion.div
            className="flex flex-col items-center space-y-4"
          >
            <motion.button 
              onClick={() => window.location.href = '/signup'}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-lg text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl w-full max-w-xs md:max-w-sm lg:max-w-md text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-lg"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                Start Free
                <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.button>
            <p className="text-sm md:text-base text-gray-500">No credit card required.</p>
          </motion.div>
        </div>
      </motion.section>

        

      <section className="w-full max-w-full overflow-x-hidden py-0 md:py-12 bg-transparent">
        <TestimonialSlider />
      </section>
      
      {/* FAQ Section */}
      <motion.section
        className="w-full max-w-4xl mx-auto px-4 py-12 md:py-16"
      >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4">Frequently Asked Questions</h2>
          <p className="text-base md:text-lg lg:text-xl text-gray-300">Everything you need to know about Corex AI</p>
        </div>
        
        <div className="space-y-3 md:space-y-4">
          <FAQItem 
            question="How does Corex AI compare to other AI writing tools like ChatGPT?"
            answer="Corex AI is specifically trained on viral content patterns and optimized for short-form video platforms. Unlike general AI tools, it understands what makes content go viral on TikTok, YouTube Shorts, and Instagram Reels, providing platform-specific hooks and formats."
          />
          <FAQItem 
            question="Does Corex AI offer a free script generation?"
            answer="Yes. Corex AI provides 3 free scripts per week. For viral hooks, and premium script-to-video features, you can upgrade to the $9.99/month plan. <a href='/payment' className='text-blue-400 hover:text-blue-300 underline'>View our pricing plans here</a>."
          />
          <FAQItem 
            question="Can Corex AI turn my idea into a ready-to-shoot video script?"
            answer="Absolutely. Corex AI transforms any idea into a complete video script with viral hooks, voice lines, and visual suggestions, making it the best script-to-video AI tool for creators on TikTok, Reels, and YouTube Shorts."
          />
          <FAQItem 
            question="What makes Corex AI different from other script generators?"
            answer="Corex AI is the only AI tool specifically designed for viral short-form content. It's trained on millions of viral videos, understands platform algorithms, and generates content optimized for maximum engagement on TikTok, Reels, and YouTube Shorts."
          />
          <FAQItem 
            question="Can I use Corex AI for YouTube videos and long-form content?"
            answer="While Corex AI is optimized for short-form viral content (60 seconds or less), the generated scripts can be adapted for longer YouTube videos. The viral hooks and engagement techniques work across all content lengths."
          />
          <FAQItem 
            question="What is Corex AI and why is it the best AI script generator?"
            answer="Corex AI is a viral video script generator AI that instantly creates scroll-stopping hooks, 60-second scripts, and scene ideas for TikTok, YouTube Shorts, and Instagram Reels. It's built to help creators grab attention in the first 2 seconds and boost engagement."
          />
        </div>
      </motion.section>

      <Footer />
    </>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3, margin: "-30px" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-blue-600/20 rounded-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
      
      <div className="relative bg-black/60 backdrop-blur-xl border border-blue-400/30 rounded-2xl overflow-hidden hover:border-blue-300/50 hover:bg-black/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-6 md:px-8 py-4 md:py-6 text-left flex items-center justify-between hover:bg-blue-500/5 transition-all duration-300"
        >
          <h3 className="text-base md:text-lg lg:text-xl font-semibold text-white pr-4 leading-relaxed">{question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center border border-blue-400/30"
          >
            <svg
              className="w-3 h-3 md:w-5 md:h-5 text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </button>
        
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? "auto" : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-6 md:px-8 pb-6 md:pb-8">
            <div className="w-8 md:w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mb-4 md:mb-6"></div>
            <p className="text-gray-300 text-sm md:text-base lg:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }}></p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 