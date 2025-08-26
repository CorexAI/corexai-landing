"use client";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineUser, HiOutlineCalendar, HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-orange-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-orange-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-orange-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-orange-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-orange-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-100 left-2/3 w-1.5 h-1.5 bg-orange-300/60 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-120 right-1/4 w-1 h-1 bg-orange-500/50 rounded-full animate-bounce delay-5000"></div>
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
                <span className="bg-gradient-to-r from-orange-500/20 to-orange-400/20 backdrop-blur-md border border-orange-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-orange-300 font-semibold text-sm tracking-wider uppercase">Content Trends</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                The Rise of Micro-Content: Why Less is More in 2025
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
                  <span>June 12, 2025</span>
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
              <div className="bg-gradient-to-r from-orange-600/10 via-red-600/5 to-orange-600/10 border border-orange-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  Why 15-second videos are outperforming longer content.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  The micro-content revolution is here, and it's changing how we create and consume content forever.
                </p>
              </div>

              {/* The Micro-Content Revolution */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Micro-Content Revolution
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">15-Second Videos</h3>
                    </div>
                    <p className="text-gray-300">The new sweet spot for maximum engagement.</p>
                  </div>
                  <div className="bg-gradient-to-br from-red-600/20 to-red-500/10 border border-red-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Instant Gratification</h3>
                    </div>
                    <p className="text-gray-300">Quick hits that satisfy our shrinking attention spans.</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-600/20 to-yellow-500/10 border border-yellow-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Higher Completion Rates</h3>
                    </div>
                    <p className="text-gray-300">More people watch to the end of shorter content.</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Faster Production</h3>
                    </div>
                    <p className="text-gray-300">Create more content in less time.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Better Algorithm Performance</h3>
                    </div>
                    <p className="text-gray-300">Platforms favor shorter, engaging content.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Increased Shareability</h3>
                    </div>
                    <p className="text-gray-300">Short content gets shared more often.</p>
                  </div>
                </div>
              </section>

              {/* Why Micro-Content Works */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Why Micro-Content Works
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Attention Span Reality</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      The average human attention span is now shorter than a goldfish's.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Fact:</strong> In 2000, the average attention span was 12 seconds. In 2025, it's down to 8 seconds. Micro-content respects this reality.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Completion Rate Advantage</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Shorter content has dramatically higher completion rates.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">15-30 seconds</p>
                        <p className="text-gray-400 text-center text-sm">85% completion</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">1-3 minutes</p>
                        <p className="text-gray-400 text-center text-sm">45% completion</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">5+ minutes</p>
                        <p className="text-gray-400 text-center text-sm">15% completion</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Algorithm Optimization</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Social media algorithms favor content that keeps users engaged longer.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Algorithm Logic:</strong> If users watch your 15-second video to completion, the algorithm learns that your content is engaging and shows it to more people.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Micro-Content Formats */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Micro-Content Formats
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Video Formats</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">15-second TikTok videos</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">30-second Instagram Reels</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">60-second YouTube Shorts</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Static Formats</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Single-image posts</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Carousel posts (3-5 slides)</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Story-style content</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Creating Effective Micro-Content */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Creating Effective Micro-Content
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">The Hook Formula</h3>
                    <div className="space-y-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">First 3 seconds: Grab attention</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Next 5 seconds: Build interest</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Final 7 seconds: Deliver value</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Content Structure</h3>
                    <div className="space-y-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">One main point per piece</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Clear, actionable takeaway</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Strong visual element</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Micro-Content Strategy */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Micro-Content Strategy
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 via-orange-600/10 to-red-600/20 border border-red-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Volume Strategy</h3>
                      <p className="text-gray-300">Post 3-5 micro-content pieces daily across platforms</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Quality Focus</h3>
                      <p className="text-gray-300">Each piece should deliver immediate value</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Consistency</h3>
                      <p className="text-gray-300">Maintain regular posting schedule</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tools for Micro-Content Creation */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Tools for Micro-Content Creation
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 border border-purple-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">AI-Powered Tools</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Corex AI for script generation</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">CapCut for video editing</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Canva for graphics</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Workflow Optimization</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Batch content creation</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Template libraries</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Automated scheduling</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Future of Micro-Content */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Future of Micro-Content
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed mb-6">
                    Micro-content is not just a trend—it's the future of digital communication.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Emerging Trends</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Even shorter formats (5-10 seconds)</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Interactive micro-content</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">AI-generated micro-content</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What to Expect</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">More platforms adopting short-form</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Enhanced monetization options</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Advanced analytics and insights</p>
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
                    Micro-content is the key to winning in the attention economy.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    Start creating shorter, more impactful content today.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    Ready to master micro-content? Use Corex AI to create engaging short-form content faster.
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
