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
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Content Creation</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Top 5 Hooks That Make Your TikTok Go Viral in 2025
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
                  <span>January 12, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>6 min read</span>
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
              <div className="bg-gradient-to-r from-blue-600/10 via-purple-600/5 to-blue-600/10 border border-blue-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  Let's be real: TikTok is a battlefield. If you don't grab attention in the first 3 seconds, you're done. Period. 2025 is no different — but the game has leveled up. Algorithms are now watching how fast people stop scrolling, not just how long they watch.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  So, if you want virality, you need hooks that slap, shock, and hook emotions instantly. Here are the 5 best TikTok hook formulas dominating 2025.
                </p>
              </div>

              {/* Hook 1 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    1. "The Forbidden Truth" Hook
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-400/30 rounded-2xl p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Example:</h3>
                    <p className="text-lg text-gray-200 italic">"They don't want you to know this about [your niche]…"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Triggers curiosity + controversy</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Works for any niche (fitness, money, relationships)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Leverages forbidden knowledge psychology</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hook 2 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    2. "This Will Change Everything" Hook
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-400/30 rounded-2xl p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Example:</h3>
                    <p className="text-xl text-gray-200 italic">"If you're still doing [old method], you're wasting your time. Do this instead…"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Frames old habits as obsolete</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Promises a game-changing solution</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Perfect for educational + motivational content</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hook 3 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    3. "Shocking Statistic" Hook
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-400/30 rounded-3xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Example:</h3>
                    <p className="text-xl text-gray-200 italic">"99% of people fail at this because…"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Instantly adds authority</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Triggers FOMO (fear of missing out)</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Great for finance, business, or self-improvement</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hook 4 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    4. "What Nobody Tells You" Hook
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-400/30 rounded-3xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Example:</h3>
                    <p className="text-xl text-gray-200 italic">"Nobody talks about how lonely success really is…"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Feels raw + human</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Builds trust + relatability</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Works extremely well in motivational storytelling</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Hook 5 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    5. "The Relatable Pain" Hook
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 border border-yellow-400/30 rounded-3xl p-8">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-4">Example:</h3>
                    <p className="text-xl text-gray-200 italic">"You ever post a video and it gets 0 likes? Yeah, me too…"</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Relatability = engagement</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Creates instant emotional connection</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Best for comedy, lifestyle, and storytelling niches</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Final Thoughts */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Final Thoughts
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-blue-600/20 border border-blue-400/30 rounded-3xl p-8 mb-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed">
                    If your TikToks aren't getting views, it's not the algorithm. It's your hook.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    <span className="text-white mr-2">→</span> Use these 5 formulas and you'll stop the scroll, boost watch time, and hack virality in 2025.
                  </p>
                </div>
              </section>

              {/* Tags */}
              <section className="mb-16">
                <div className="flex flex-wrap gap-3">
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">#TikTokGrowth</span>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">#TikTok2025</span>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">#ViralHooks</span>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">#ContentCreation</span>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm">#SocialMediaGrowth</span>
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
