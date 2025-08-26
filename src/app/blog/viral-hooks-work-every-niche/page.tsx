"use client";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineUser, HiOutlineCalendar, HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-blue-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-100 left-2/3 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-120 right-1/4 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce delay-5000"></div>
      </div>

      <div className="relative z-10">
        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-4 pb-24">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Article Header */}
            <header className="mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mb-6"
                style={{ marginTop: '8.5rem' }}
              >
                <span className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Viral Strategy</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Viral Hooks That Work Across Every Niche
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="flex flex-wrap items-center gap-6 text-gray-400 text-sm"
              >
                <div className="flex items-center gap-2">
                  <HiOutlineUser className="w-4 h-4" />
                  <span>Corex AI Team</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineCalendar className="w-4 h-4" />
                  <span>January 3, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>5 min read</span>
                </div>
              </motion.div>
            </header>

            {/* Article Body */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              className="max-w-none"
            >
              {/* Introduction */}
              <div className="bg-gradient-to-r from-red-600/10 via-orange-600/5 to-red-600/10 border border-red-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  Your hook is the difference between scroll or stop.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  If you lose them in the first 3 seconds, the video's dead.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  Here are universal hooks you can steal today.
                </p>
              </div>

              {/* The 5 Universal Hook Types */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    The 5 Universal Hook Types
                  </h2>
                </div>
                <div className="space-y-8">
                                     <div className="bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-400/30 rounded-3xl p-8">
                     <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white">Shock Value Hook</h3>
                     </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      "Most people don't know this, but…"
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Why it works:</strong> Creates immediate intrigue by promising insider knowledge or hidden information that most people miss.
                      </p>
                    </div>
                  </div>

                                     <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-3xl p-8">
                     <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white">Curiosity Gap Hook</h3>
                     </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      "What happens when you ___ for 30 days?"
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Why it works:</strong> Promises a transformation or result that viewers want to see, creating anticipation for the outcome.
                      </p>
                    </div>
                  </div>

                                     <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-400/30 rounded-3xl p-8">
                     <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white">Call-Out Hook</h3>
                     </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      "If you're [niche audience], stop scrolling."
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Why it works:</strong> Directly targets your specific audience and makes them feel personally addressed, increasing relevance.
                      </p>
                    </div>
                  </div>

                                     <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                     <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white">Bold Claim Hook</h3>
                     </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      "This one thing made me $10K in a week."
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Why it works:</strong> Promises specific, measurable results that viewers want to achieve, creating desire for the solution.
                      </p>
                    </div>
                  </div>

                                     <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                     <div className="flex items-center gap-4 mb-4">
                       <h3 className="text-2xl font-bold text-white">Storytelling Hook</h3>
                     </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      "I was ready to quit, until this happened…"
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Why it works:</strong> Promises a compelling story with emotional ups and downs that viewers want to see resolved.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Use These Hooks */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    How to Use These Hooks
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                     <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Test & Iterate</h3>
                     </div>
                    <p className="text-gray-300">Try different hooks for the same content and see which performs best.</p>
                  </div>
                                     <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Track Performance</h3>
                     </div>
                    <p className="text-gray-300">Monitor which hooks get the highest retention in the first 3 seconds.</p>
                  </div>
                                     <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Double Down</h3>
                     </div>
                    <p className="text-gray-300">When you find a hook that works, use variations of it consistently.</p>
                  </div>
                                     <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Adapt to Niche</h3>
                     </div>
                    <p className="text-gray-300">Modify the hook language to fit your specific audience and industry.</p>
                  </div>
                </div>
              </section>

              {/* Real Examples Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Real Examples That Crush
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Fitness Niche</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300">"Most people don't know this, but you're doing pushups wrong."</li>
                        <li className="text-gray-300">"What happens when you do planks for 30 days?"</li>
                        <li className="text-gray-300">"If you want abs, stop scrolling."</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Business Niche</h3>
                      <ul className="space-y-2">
                        <li className="text-gray-300">"This one thing made me $10K in a week."</li>
                        <li className="text-gray-300">"I was ready to quit my business, until this happened…"</li>
                        <li className="text-gray-300">"Most entrepreneurs don't know this, but…"</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Science Behind Hooks */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Science Behind Hooks
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                     <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Attention Span</h3>
                     </div>
                    <p className="text-gray-300">You have 3 seconds to grab attention before viewers scroll away.</p>
                  </div>
                                     <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Pattern Recognition</h3>
                     </div>
                    <p className="text-gray-300">Our brains are wired to recognize and respond to familiar patterns.</p>
                  </div>
                                     <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                     <div className="flex items-center gap-3 mb-3">
                       <h3 className="text-xl font-bold text-white">Emotional Triggers</h3>
                     </div>
                    <p className="text-gray-300">Hooks that trigger emotions (curiosity, shock, desire) work best.</p>
                  </div>
                </div>
              </section>

              {/* Conclusion */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Bottom Line
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8 mb-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed">
                    Hooks are formulas, not guesses.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    The best creators test different hooks until one hits—then double down.
                  </p>
                </div>
                                 <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                   <p className="text-xl font-bold text-white leading-relaxed">
                     Start with these 5 hooks, test them, and watch your views explode.
                   </p>
                 </div>
              </section>

              {/* Back to Blog Button */}
              <div className="text-center mt-16">
                <Link href="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-300 px-6 py-3 border border-blue-400/30 rounded-lg hover:bg-blue-400/10">
                  <HiOutlineArrowLeft className="w-5 h-5" />
                  <span>Back to Blog</span>
                </Link>
              </div>
            </motion.div>
          </motion.article>
        </div>
      </div>

      <Footer />
    </div>
  );
}
