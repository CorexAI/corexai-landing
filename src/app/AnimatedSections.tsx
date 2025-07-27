"use client";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineCamera, HiOutlineChartBar } from "react-icons/hi";
import { MdAccessTime } from "react-icons/md";
import { IoFlashOutline } from "react-icons/io5";
import TestimonialSlider from "./TestimonialSlider";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedSections() {
  return (
    <>
      {/* Features Section (animated) */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl mx-auto px-4 mt-20"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-2">All In One Creator Engine</h2>
        <p className="text-xl md:text-3xl text-gray-300 text-center mb-8 mt-6">Everything You Need To Go Viral</p>
      </motion.section>
      <motion.section
        id="features-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="w-full max-w-6xl md:max-w-5xl lg:max-w-7xl py-12 px-2 md:px-4 mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-center lg:items-stretch gap-3 md:gap-4 lg:gap-8">
          <div className="bg-black bg-opacity-80 rounded-xl p-4 md:p-6 lg:p-12 w-full lg:w-[380px] lg:min-h-[320px] lg:flex-shrink-0 flex flex-col items-center justify-center shadow-lg border border-blue-700 glow transition-transform duration-800 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-400">
            <IoFlashOutline className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-8 text-blue-400 drop-shadow-glow" />
            <h3 className="text-lg md:text-xl lg:text-3xl font-bold mb-2 text-center lg:whitespace-nowrap">Viral Hooks</h3>
            <p className="text-xs md:text-sm lg:text-lg text-gray-300 text-center">Generate scroll stopping hooks.</p>
          </div>
          <div className="bg-black bg-opacity-80 rounded-xl p-4 md:p-6 lg:p-12 w-full lg:w-[380px] lg:min-h-[320px] lg:flex-shrink-0 flex flex-col items-center justify-center shadow-lg border border-blue-700 glow transition-transform duration-800 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-400">
            <MdAccessTime className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-8 text-blue-400 drop-shadow-glow" />
            <h3 className="text-lg md:text-xl lg:text-3xl font-bold mb-2 text-center lg:whitespace-nowrap">60 Seconds Script</h3>
            <p className="text-xs md:text-sm lg:text-lg text-gray-300 text-center">Get complete Platform Ready Scripts</p>
          </div>
          <div className="bg-black bg-opacity-80 rounded-xl p-4 md:p-6 lg:p-12 w-full lg:w-[380px] lg:min-h-[320px] lg:flex-shrink-0 flex flex-col items-center justify-center shadow-lg border border-blue-700 glow transition-transform duration-800 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-400">
            <HiOutlineCamera className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-8 text-blue-400 drop-shadow-glow" />
            <h3 className="text-lg md:text-xl lg:text-3xl font-bold mb-2 text-center lg:whitespace-nowrap">Visuals & CTA</h3>
            <p className="text-xs md:text-sm lg:text-lg text-gray-300 text-center">Instant ideas that grab attention</p>
          </div>
          <div className="bg-black bg-opacity-80 rounded-xl p-4 md:p-6 lg:p-12 w-full lg:w-[380px] lg:min-h-[320px] lg:flex-shrink-0 flex flex-col items-center justify-center shadow-lg border border-blue-700 glow transition-transform duration-800 ease-in-out hover:scale-105 hover:shadow-2xl hover:border-blue-400">
            <HiOutlineChartBar className="text-2xl md:text-3xl lg:text-5xl mb-4 md:mb-6 lg:mb-8 text-blue-400 drop-shadow-glow" />
            <h3 className="text-lg md:text-xl lg:text-3xl font-bold mb-2 text-center lg:whitespace-nowrap">Algorithm Friendly</h3>
            <p className="text-xs md:text-sm lg:text-lg text-gray-300 text-center">Content optimized for TikTok, Reels and Youtube Shorts</p>
          </div>
        </div>
      </motion.section>
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full max-w-4xl mx-auto px-4 mt-12 mb-12 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8"
      >
        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto order-1 md:order-none">
          <Image
            src="/mockup2 web.png"
            alt="Corex AI app mockup demonstrating the three-step viral script generation process"
            width={550}
            height={1100}
            className="object-contain rounded-xl shadow-2xl w-[320px] sm:w-[380px] md:w-[550px] h-auto"
            priority
            quality={85}
          />
        </div>
        <div className="flex-1 order-2 md:order-none text-center md:text-left">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 md:mb-8">How Corex AI Works</h2>
          <div className="flex flex-col gap-6 md:gap-8">
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">Step 1: Drop Your Idea</h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300">Type your raw content idea — no overthinking, just dump it in.</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">Step 2: Pick Your Vibe</h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300">Choose a tone: Storytelling, Motivational, Professional, or Persuasive.</p>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-2">Step 3: Get a Viral Script</h3>
              <p className="text-base md:text-lg lg:text-xl text-gray-300">Boom — a scroll-stopping, 60-second viral script ready to post.</p>
            </div>
          </div>
          <div className="mt-6 md:mt-8 flex justify-center md:justify-start">
            <Link href="/pricing" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg text-base md:text-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
              View Pricing
            </Link>
          </div>
        </div>
      </motion.section>
      <section className="w-full max-w-full overflow-x-hidden py-12 bg-transparent">
        <TestimonialSlider />
      </section>
      
      {/* FAQ Section */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-4xl mx-auto px-4 py-16"
      >
        {/* Schema Markup for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "How does Corex AI compare to other AI writing tools like ChatGPT?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Corex AI is specifically trained on viral content patterns and optimized for short-form video platforms. Unlike general AI tools, it understands what makes content go viral on TikTok, YouTube Shorts, and Instagram Reels, providing platform-specific hooks and formats."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Does Corex AI offer a free script generation?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Corex AI provides 3 free scripts per week. For viral hooks, and premium script-to-video features, you can upgrade to the $9.99/month plan."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can Corex AI turn my idea into a ready-to-shoot video script?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Absolutely. Corex AI transforms any idea into a complete video script with viral hooks, voice lines, and visual suggestions, making it the best script-to-video AI tool for creators on TikTok, Reels, and YouTube Shorts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What makes Corex AI different from other script generators?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Corex AI is the only AI tool specifically designed for viral short-form content. It's trained on millions of viral videos, understands platform algorithms, and generates content optimized for maximum engagement on TikTok, Reels, and YouTube Shorts."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Can I use Corex AI for YouTube videos and long-form content?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "While Corex AI is optimized for short-form viral content (60 seconds or less), the generated scripts can be adapted for longer YouTube videos. The viral hooks and engagement techniques work across all content lengths."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is Corex AI and why is it the best AI script generator?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Corex AI is a viral video script generator AI that instantly creates scroll-stopping hooks, 60-second scripts, and scene ideas for TikTok, YouTube Shorts, and Instagram Reels. It's built to help creators grab attention in the first 2 seconds and boost engagement."
                  }
                }
              ]
            })
          }}
        />
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Frequently Asked Questions</h2>
          <p className="text-xl md:text-2xl text-gray-300">Everything you need to know about Corex AI</p>
        </div>
        
        <div className="space-y-4">
          <FAQItem 
            question="How does Corex AI compare to other AI writing tools like ChatGPT?"
            answer="Corex AI is specifically trained on viral content patterns and optimized for short-form video platforms. Unlike general AI tools, it understands what makes content go viral on TikTok, YouTube Shorts, and Instagram Reels, providing platform-specific hooks and formats."
          />
          <FAQItem 
            question="Does Corex AI offer a free script generation?"
            answer="Yes. Corex AI provides 3 free scripts per week. For viral hooks, and premium script-to-video features, you can upgrade to the $9.99/month plan. <a href='/pricing' className='text-blue-400 hover:text-blue-300 underline'>View our pricing plans here</a>."
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
    </>
  );
}

// FAQ Item Component
function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-black bg-opacity-60 rounded-xl border border-blue-700/30 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-blue-900/20 transition-colors duration-200"
      >
        <h3 className="text-lg md:text-xl font-semibold text-white pr-4">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0"
        >
          <svg
            className="w-6 h-6 text-blue-400"
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
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <p className="text-gray-300 text-base md:text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: answer }}></p>
        </div>
      </motion.div>
    </motion.div>
  );
} 