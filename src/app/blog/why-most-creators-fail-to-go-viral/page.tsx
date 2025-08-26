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
                Why Most Creators Fail to Go Viral (and How to Avoid It)
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
                  <span>January 8, 2025</span>
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
              <div className="bg-gradient-to-r from-red-600/10 via-orange-600/5 to-red-600/10 border border-red-400/20 rounded-2xl p-6 mb-12">
                <p className="text-2xl md:text-3xl text-gray-100 leading-relaxed font-light">
                  Let's be real. 99% of creators are posting videos no one gives a damn about.
                </p>
                <p className="text-xl text-gray-300 mt-6 leading-relaxed">
                  You can post 100 TikToks, grind every day, and still stay stuck at 200 views.
                </p>
                <p className="text-xl text-gray-300 mt-4 leading-relaxed">
                  Why? Because going viral isn't about luck. It's about psychology.
                </p>
                <p className="text-xl text-gray-300 mt-4 leading-relaxed">
                  Let me break it down.
                </p>
              </div>

              {/* The Harsh Truth Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    The Harsh Truth — Why Most Creators Fail
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">Boring Intros</h3>
                    </div>
                    <p className="text-gray-300">They start with boring intros → people scroll in the first 2 seconds.</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">Late to Trends</h3>
                    </div>
                    <p className="text-gray-300">They copy trends late → by the time they post, the hype is dead.</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">Wrong Focus</h3>
                    </div>
                    <p className="text-gray-300">They focus on aesthetics, not hooks → your video looking "pretty" doesn't matter if nobody watches past 3 seconds.</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
                      <h3 className="text-xl font-bold text-white">Inconsistent Posting</h3>
                    </div>
                    <p className="text-gray-300">They post inconsistently → the algorithm doesn't trust you.</p>
                  </div>
                </div>
              </section>

              {/* How to Actually Go Viral Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    How to Actually Go Viral
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">Hook Fast</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Your first 3 seconds = life or death. Start with shock, drama, or curiosity.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Example:</strong> Instead of saying "Here's my morning routine", say "You're ruining your mornings and don't even know it."
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">Deliver Emotion</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      Viral = emotional transfer. Make people laugh, cry, get angry, or feel inspired.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">Ride Trends Early</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      Don't wait. Jump on a sound/meme when it's fresh.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">Post Consistently</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      One viral video won't change your life. 50 consistent ones will.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">End with a Punch</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      Leave viewers with a cliffhanger or takeaway they want to share.
                    </p>
                  </div>
                </div>
              </section>

              {/* The Fix Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Fix
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-blue-600/20 via-purple-600/10 to-blue-600/20 border border-blue-400/30 rounded-3xl p-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed">
                    Stop blaming the algorithm. Stop thinking you need better equipment.
                  </p>
                  <p className="text-2xl text-gray-200 text-center leading-relaxed mt-4">
                    You need better hooks, better storytelling, and consistency. Period.
                  </p>
                </div>
              </section>

              {/* Conclusion Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Stop Posting to Crickets
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8 mb-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed">
                    Most creators fail because they ignore psychology.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    If you want to stop posting to crickets, focus on hooks, emotions, and consistency.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-2">
                    Or keep failing—it's your choice.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    <span className="text-white mr-2">👉</span> Want AI to generate hooks that actually work? Try <strong>Corex AI</strong>.
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
