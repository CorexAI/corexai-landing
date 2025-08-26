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
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Storytelling</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Storytelling Secrets for TikTok & Instagram Reels
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
                  <span>January 5, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>8 min read</span>
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
              <div className="bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-purple-600/10 border border-purple-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  Storytelling isn't just for movies—it's the backbone of viral TikToks and Reels.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  If you don't know how to structure a story in under 60 seconds, your content won't stick.
                </p>
              </div>

              {/* The 5-Part Story Structure */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    The 5-Part Story Structure
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      <h3 className="text-xl font-bold text-white">The Hook (0–3s)</h3>
                    </div>
                    <p className="text-gray-300">Hit them with shock, humor, or a bold question.</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      <h3 className="text-xl font-bold text-white">The Setup (3–15s)</h3>
                    </div>
                    <p className="text-gray-300">Build context so viewers know why this matters.</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      <h3 className="text-xl font-bold text-white">The Escalation (15–40s)</h3>
                    </div>
                    <p className="text-gray-300">Raise stakes, add tension, show transformation.</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      <h3 className="text-xl font-bold text-white">The Payoff (40–55s)</h3>
                    </div>
                    <p className="text-gray-300">Deliver the climax or "aha" moment.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">5</div>
                      <h3 className="text-xl font-bold text-white">The Outro/CTA (55–60s)</h3>
                    </div>
                    <p className="text-gray-300">Call to action (follow, comment, use your product).</p>
                  </div>
                </div>
              </section>

              {/* Detailed Breakdown */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Secret Formula Breakdown
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">The Hook (0–3s)</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Your first 3 seconds are make-or-break. You need to grab attention instantly.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Shock</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Humor</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Bold Question</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">The Setup (3–15s)</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      Build context so viewers understand why this story matters to them. Create the foundation for emotional investment.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">

                      <h3 className="text-2xl font-bold text-white">The Escalation (15–40s)</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      This is where you build tension and keep viewers hooked. Show transformation, add conflict, or reveal unexpected twists.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-green-400 text-2xl">💥</span>
                      <h3 className="text-2xl font-bold text-white">The Payoff (40–55s)</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      Deliver the climax or "aha" moment that makes the entire story worth watching. This is your emotional punch.
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-blue-400 text-2xl">🎬</span>
                      <h3 className="text-2xl font-bold text-white">The Outro/CTA (55–60s)</h3>
                    </div>
                    <p className="text-xl text-gray-200 leading-relaxed">
                      End with a clear call to action that tells viewers exactly what to do next.
                    </p>
                  </div>
                </div>
              </section>

              {/* Extra Tips Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Pro Tips for Maximum Impact
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-green-400 text-xl">✂️</span>
                      <h3 className="text-xl font-bold text-white">Use Jump Cuts</h3>
                    </div>
                    <p className="text-gray-300">For pacing and to maintain viewer attention throughout the story.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-blue-400 text-xl">📝</span>
                      <h3 className="text-xl font-bold text-white">Add Captions</h3>
                    </div>
                    <p className="text-gray-300">Most people watch on mute, so captions are essential for engagement.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-purple-400 text-xl">💔</span>
                      <h3 className="text-xl font-bold text-white">One Emotional Thread</h3>
                    </div>
                    <p className="text-gray-300">Keep one strong emotional thread throughout the entire story.</p>
                  </div>
                </div>
              </section>

              {/* Why This Works Section */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Why This Formula Works
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 border border-purple-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Psychological Triggers</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Creates anticipation and curiosity</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Builds emotional investment</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Satisfies the need for resolution</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">Algorithm Benefits</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Higher watch time completion</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Increased engagement rates</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Better shareability</p>
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
                    Storytelling is what makes a video binge-worthy.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    Nail the flow, and even a 15-second clip can feel cinematic.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    <span className="text-white mr-2">🎬</span> Master this structure, and your content will stick like glue.
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
