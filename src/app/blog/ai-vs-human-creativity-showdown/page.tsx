"use client";
import { motion } from "framer-motion";
import { HiOutlineClock, HiOutlineUser, HiOutlineCalendar, HiOutlineArrowLeft } from "react-icons/hi";
import Link from "next/link";
import Footer from "../../components/Footer";

export default function BlogPostPage() {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-purple-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-purple-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-purple-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-purple-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-purple-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-100 left-2/3 w-1.5 h-1.5 bg-purple-300/60 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-120 right-1/4 w-1 h-1 bg-purple-500/50 rounded-full animate-bounce delay-5000"></div>
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
                <span className="bg-gradient-to-r from-purple-500/20 to-purple-400/20 backdrop-blur-md border border-purple-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-purple-300 font-semibold text-sm tracking-wider uppercase">AI & Technology</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                AI vs Human Creativity: The Ultimate Showdown
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
                  <span>June 20, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>14 min read</span>
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
              <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-purple-600/10 border border-purple-400/20 rounded-2xl p-6 mb-12">
                <p className="text-lg md:text-xl text-gray-100 leading-relaxed font-medium">
                  Can AI truly replace human creativity?
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  We put both to the test and reveal which one creates better viral content.
                </p>
              </div>

              {/* The Battle Begins */}
              <section className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    The Battle Begins
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Human Creativity</h3>
                    </div>
                    <p className="text-gray-300 mb-4">The traditional approach to content creation.</p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Emotional depth and personal experience</li>
                      <li>• Intuitive understanding of culture</li>
                      <li>• Unique voice and perspective</li>
                      <li>• Creative risk-taking</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">AI Creativity</h3>
                    </div>
                    <p className="text-gray-300 mb-4">The new frontier of automated content generation.</p>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li>• Data-driven optimization</li>
                      <li>• Pattern recognition at scale</li>
                      <li>• Consistent output quality</li>
                      <li>• Rapid iteration and testing</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* The Test Setup */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Test Setup
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Challenge 1</h3>
                      <p className="text-gray-300">Create a viral hook for a fitness motivation video</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Challenge 2</h3>
                      <p className="text-gray-300">Write a complete 60-second script</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">Challenge 3</h3>
                      <p className="text-gray-300">Optimize for maximum engagement</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Challenge 1: Viral Hooks */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Challenge 1: Viral Hooks
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Human Creator</h3>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        "I've been working out for 10 years, and I've learned one thing: consistency beats perfection every time. Here's what changed everything for me..."
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Authenticity</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Personal Story</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Emotional Connection</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">AI Generator</h3>
                    </div>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        "90% of people quit the gym in the first month. But what if I told you there's a 3-step method that guarantees you'll stick with it? Here's the science behind it..."
                      </p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Data-Driven</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Psychological Triggers</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Optimized Hook</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Challenge 2: Complete Scripts */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Challenge 2: Complete Scripts
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">Human Approach</h3>
                    <div className="space-y-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Time to create: 2-3 hours</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Unique perspective</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Emotional storytelling</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <h3 className="text-xl font-bold text-white mb-4">AI Approach</h3>
                    <div className="space-y-3">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Time to create: 30 seconds</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Data-optimized structure</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-sm">Scalable production</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Challenge 3: Engagement Optimization */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Challenge 3: Engagement Optimization
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 via-orange-600/10 to-red-600/20 border border-red-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Human Optimization</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Intuitive editing based on experience</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Creative experimentation</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Personal brand consistency</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">AI Optimization</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Real-time performance analysis</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">A/B testing at scale</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Algorithm-specific optimization</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* The Results */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Results
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-green-600/20 via-blue-600/10 to-green-600/20 border border-green-400/30 rounded-3xl p-8 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">Human Creator</h3>
                      <p className="text-3xl font-bold text-green-400 mb-2">47K Views</p>
                      <p className="text-gray-300">Authentic, emotional connection</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">AI Generator</h3>
                      <p className="text-3xl font-bold text-purple-400 mb-2">89K Views</p>
                      <p className="text-gray-300">Optimized for virality</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white mb-2">Hybrid Approach</h3>
                      <p className="text-3xl font-bold text-blue-400 mb-2">156K Views</p>
                      <p className="text-gray-300">Best of both worlds</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    The winner? The hybrid approach that combines human creativity with AI optimization.
                  </p>
                </div>
              </section>

              {/* The Future of Creativity */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    The Future of Creativity
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 border border-purple-400/30 rounded-3xl p-8">
                  <p className="text-2xl text-gray-200 text-center leading-relaxed mb-6">
                    AI won't replace human creativity—it will amplify it.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What Humans Do Best</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Emotional storytelling</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Cultural understanding</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Creative risk-taking</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">What AI Does Best</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Data analysis and optimization</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Rapid iteration and testing</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Scalable content production</p>
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
                    The future belongs to creators who embrace AI as a creative partner, not a replacement.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    Use AI to optimize, humans to create.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    Ready to amplify your creativity with AI? Start with Corex AI today.
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
