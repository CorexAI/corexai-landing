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
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Content Strategy</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Building Consistency: The Secret to Long-Term Growth
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
                  <span>January 1, 2025</span>
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
              <div className="bg-gradient-to-r from-green-600/10 via-blue-600/5 to-green-600/10 border border-green-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  The #1 reason creators disappear isn't lack of talent—it's burnout.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  Consistency isn't about posting daily; it's about building a system you can sustain.
                </p>
              </div>

              {/* The 4 Pillars of Consistency */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The 4 Pillars of Consistency
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Batch Production</h3>
                    </div>
                    <p className="text-gray-300">Record 5–10 videos in one sitting.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Content Pillars</h3>
                    </div>
                    <p className="text-gray-300">Stick to 2–3 themes so you never run out of ideas.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Scheduling</h3>
                    </div>
                    <p className="text-gray-300">Use tools or drafts to spread content evenly.</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Mindset Shift</h3>
                    </div>
                    <p className="text-gray-300">Stop chasing perfection—done beats perfect every time.</p>
                  </div>
                </div>
              </section>

              {/* Detailed Breakdown */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The System Breakdown
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Batch Production</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Instead of creating one video at a time, block out 2-3 hours and create multiple pieces of content.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Pro Tip:</strong> Record 5-10 videos in one sitting. This eliminates the daily pressure and gives you a content buffer.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Content Pillars</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Choose 2-3 main themes or topics that you can consistently create content about.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Educational</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Entertainment</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Behind-the-Scenes</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Scheduling Strategy</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Use content calendars and scheduling tools to maintain consistent posting without daily stress.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Tools:</strong> Use drafts, scheduling apps, or content calendars to spread your content evenly across the week.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Mindset Shift</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      The biggest barrier to consistency is perfectionism. Learn to prioritize completion over perfection.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Remember:</strong> Done beats perfect every time. The algorithm rewards consistency, not perfection.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Consistency Matters */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Why Consistency Matters
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Algorithm Trust</h3>
                    </div>
                    <p className="text-gray-300">Platforms reward creators who post consistently with better reach and visibility.</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Audience Building</h3>
                    </div>
                    <p className="text-gray-300">Regular posting builds audience expectations and loyalty over time.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Skill Development</h3>
                    </div>
                    <p className="text-gray-300">Consistent practice improves your content creation skills faster.</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Sustainable Growth</h3>
                    </div>
                    <p className="text-gray-300">Long-term success comes from sustainable habits, not viral moments.</p>
                  </div>
                </div>
              </section>

              {/* Common Mistakes */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Common Consistency Mistakes
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 via-orange-600/10 to-red-600/20 border border-red-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What Not to Do</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Trying to post daily without a system</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Perfectionism that leads to burnout</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">No content pillars or themes</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Creating content on-demand</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What to Do Instead</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Build a sustainable posting schedule</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Focus on progress over perfection</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Establish clear content themes</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Batch create content in advance</p>
                        </li>
                      </ul>
                    </div>
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
                    Consistency is your moat.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    Anyone can go viral once. Few can stay relevant for years.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-2">
                    Build systems, not chaos.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    Start with one pillar, build your system, and watch your growth compound over time.
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
