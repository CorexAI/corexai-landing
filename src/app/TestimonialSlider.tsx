"use client";
import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Sara K.",
    role: "Lifestyle Creator",
    text: "I posted 49 videos with zero traction. My first Corex AI script hit 120K views overnight. This app is literally a cheat code.",
    platform: "TikTok"
  },
  {
    name: "Noman",
    role: "E-Commerce Brand Owner",
    text: "Finally, someone made scriptwriting effortless. Corex AI saved me hours.",
    platform: "Instagram"
  },
  {
    name: "Jake R.",
    role: "New Instagram Creator",
    text: "I had ideas but didn't know how to make them viral. Corex AI gave me hooks, B‑roll ideas, and a CTA in one go. My first reel blew up!",
    platform: "Reels"
  },
  {
    name: "Alex R.",
    role: "Fitness Coach",
    text: "Writing scripts used to take me hours. Now I drop an idea in Corex AI, and boom — 60 seconds later, I've got a viral-ready script.",
    platform: "YouTube"
  },
  {
    name: "YouOnFire",
    role: "Meme Page Owner",
    text: "I used to write my own hooks. LOL. Corex AI does it in 5 seconds while I'm eating nuggets. Viral game = hacked.",
    platform: "TikTok"
  },
  {
    name: "Mukesh L.",
    role: "Vlogger",
    text: "My brain: 'You can write your own scripts.'\nCorex AI: laughs in viral hooks.\nYeah, I switched. Now I'm trending while my brain's still loading.",
    platform: "YouTube"
  },
  {
    name: "SamReels",
    role: "IG Reels",
    text: "I used to spend 3 hours on 10 words. Corex AI? Boom. Hook. Script. Done. Now I have time to touch grass.",
    platform: "Reels"
  },
];

export default function TestimonialSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    let animationId: number;
    let startTime: number | null = null;
    const scrollSpeed = 0.08; // pixels per millisecond (slightly faster)

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      if (!isHovered) {
        container.scrollLeft = (elapsed * scrollSpeed) % (container.scrollWidth / 2);
      }
      
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <section className="w-full py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent"></div>
      
      <div className="w-full px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="mb-4 md:mb-6"
          >
            <span className="inline-block bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-400/30 rounded-full px-4 md:px-6 py-2 text-blue-300 font-semibold text-xs md:text-sm tracking-wider">
              REAL RESULTS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              What Creators
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent">
              Are Saying
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3, margin: "-30px" }}
            transition={{ duration: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl md:max-w-3xl mx-auto px-4"
            style={{ fontFamily: 'var(--font-sen)' }}
          >
            Join creators worldwide who've unlocked viral success
          </motion.p>
        </div>

        {/* Testimonials Carousel */}
        <div 
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-4 md:gap-6 overflow-hidden pb-6 md:pb-8"
          style={{ scrollBehavior: 'smooth' }}
        >
          {/* Duplicate testimonials for seamless loop */}
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3, margin: "-30px" }}
              transition={{ duration: 0.4 }}
              whileHover={{ scale: 1.02 }}
              className="min-w-[300px] sm:min-w-[400px] md:min-w-[450px] max-w-[300px] sm:max-w-[400px] md:max-w-[450px] flex-shrink-0"
            >
              <div className="relative group">
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-400/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                
                {/* Main Card */}
                <div className="relative bg-black/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6 md:p-8 h-[320px] md:h-[360px] group-hover:border-blue-400/40 transition-all duration-500 flex flex-col justify-between">
                  {/* Top Section */}
                  <div>
                    {/* Platform */}
                    <div className="flex justify-start items-center mb-3 md:mb-4">
                      <div className="bg-blue-500/20 border border-blue-400/30 rounded-full px-3 md:px-4 py-1 md:py-2">
                        <span className="text-blue-300 font-semibold text-xs md:text-sm">{testimonial.platform}</span>
                      </div>
                    </div>

                    {/* Quote */}
                    <div>
                      <svg className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-3 md:mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed font-light line-clamp-6" style={{ fontFamily: 'var(--font-sen)' }}>
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>

                  {/* Author - Always at bottom */}
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-base md:text-lg">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-semibold text-base md:text-lg">{testimonial.name}</div>
                      <div className="text-blue-300 text-xs md:text-sm">{testimonial.role}</div>
                    </div>
                  </div>
            </div>
          </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3, margin: "-30px" }}
          transition={{ duration: 0.4 }}
          className="text-center mt-12 md:mt-16"
        >
          <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 px-4" style={{ fontFamily: 'var(--font-sen)' }}>
            Ready to join them?
          </p>
          <motion.button 
            onClick={() => window.location.href = '/signup'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 md:px-12 py-4 md:py-5 rounded-lg text-lg md:text-xl font-semibold shadow-lg hover:shadow-xl w-full max-w-sm md:max-w-sm lg:max-w-md text-center"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-lg"></div>
            <span className="relative z-10 flex items-center justify-center gap-3">
              Start Creating Now
              <svg className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
} 