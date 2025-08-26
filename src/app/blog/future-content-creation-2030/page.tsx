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
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Future Trends</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                The Future of Content Creation in 2030
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
                  <span>June 25, 2025</span>
                </div>
                <div className="flex items-center gap-2">
                  <HiOutlineClock className="w-4 h-4" />
                  <span>10 min read</span>
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
                  Content creation is evolving faster than ever.
                </p>
                <p className="text-lg text-gray-300 mt-4 leading-relaxed">
                  By 2030, it won't look anything like today. Here's what's coming.
                </p>
              </div>

              {/* The 5 Major Shifts */}
              <section className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-8 h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    The 5 Major Shifts
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">AI as Co-Creator</h3>
                    </div>
                    <p className="text-gray-300 text-sm">AI tools will be standard, not optional.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Immersive Media</h3>
                    </div>
                    <p className="text-gray-300 text-sm">AR/VR content will merge with short-form.</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Hyper-Personalization</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Every viewer gets content tailored to their taste.</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Creator Middle-Class</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Platforms will finally stabilize payouts.</p>
                  </div>
                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">Hardware Integration</h3>
                    </div>
                    <p className="text-gray-300 text-sm">Smart glasses, wearable cameras, and real-time editing.</p>
                  </div>
                </div>
              </section>

              {/* Detailed Predictions */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Detailed Predictions
                  </h2>
                </div>
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">AI as Co-Creator</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      By 2030, AI won't just be a tool—it will be your creative partner.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Prediction:</strong> Every creator will have an AI assistant that helps with ideation, scripting, editing, and optimization. AI tools will be as essential as cameras are today.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Immersive Media</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      AR and VR will become mainstream, transforming how we consume and create content.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">360° Experiences</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Interactive Stories</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Virtual Events</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Hyper-Personalization</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      Content will be dynamically tailored to each individual viewer's preferences and behavior.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Future:</strong> AI will analyze viewer behavior in real-time and adjust content delivery, pacing, and even storylines to maximize engagement for each person.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Creator Middle-Class</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      The creator economy will mature, providing stable income for dedicated creators.
                    </p>
                    <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                      <p className="text-gray-300 italic">
                        <strong>Economy:</strong> Platforms will implement fairer monetization models, and creators with 10K-100K followers will be able to make sustainable livings.
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-orange-600/20 to-orange-500/10 border border-orange-400/30 rounded-3xl p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <h3 className="text-2xl font-bold text-white">Hardware Integration</h3>
                    </div>
                    <p className="text-xl text-gray-200 mb-4 leading-relaxed">
                      New hardware will revolutionize how we capture and create content.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Smart Glasses</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Wearable Cameras</p>
                      </div>
                      <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-4">
                        <p className="text-gray-300 text-center font-semibold">Real-time Editing</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* What This Means for Creators */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    What This Means for Creators
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-600/20 to-green-500/10 border border-green-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Adapt or Die</h3>
                    </div>
                    <p className="text-gray-300">Creators who embrace new technologies will thrive, while those who resist change will struggle.</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-500/10 border border-blue-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">New Skills Required</h3>
                    </div>
                    <p className="text-gray-300">Understanding AI tools, AR/VR creation, and data analytics will be essential.</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-500/10 border border-purple-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Higher Competition</h3>
                    </div>
                    <p className="text-gray-300">Lower barriers to entry mean more creators, requiring higher quality and innovation.</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-600/20 to-pink-500/10 border border-pink-400/30 rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-bold text-white">Better Monetization</h3>
                    </div>
                    <p className="text-gray-300">More platforms and revenue streams will provide better income opportunities.</p>
                  </div>
                </div>
              </section>

              {/* Timeline to 2030 */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    Timeline to 2030
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-purple-600/20 via-pink-600/10 to-purple-600/20 border border-purple-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">2025-2027</h3>
                      <p className="text-gray-300">AI tools become mainstream. AR/VR starts gaining traction. Creator economy matures.</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">2028-2029</h3>
                      <p className="text-gray-300">Immersive content becomes standard. Hyper-personalization begins. New hardware launches.</p>
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white mb-2">2030</h3>
                      <p className="text-gray-300">Full integration of all technologies. Content creation is unrecognizable from 2024.</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* How to Prepare */}
              <section className="mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-red-400 to-orange-400 rounded-full"></div>
                  <h2 className="text-4xl md:text-5xl font-black text-white">
                    How to Prepare Now
                  </h2>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 via-orange-600/10 to-red-600/20 border border-red-400/30 rounded-3xl p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Start Learning</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Experiment with AI tools now</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Try AR/VR content creation</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Study data analytics</p>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4">Build Skills</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Develop storytelling abilities</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Learn new platforms early</p>
                        </li>
                        <li className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 flex-shrink-0"></div>
                          <p className="text-gray-300">Network with future-focused creators</p>
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
                    By 2030, creators who embrace tech and storytelling will dominate.
                  </p>
                  <p className="text-xl text-gray-300 text-center leading-relaxed mt-4">
                    Those stuck in 2025 methods will be fossils.
                  </p>
                </div>
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-center transform hover:scale-105 transition-all duration-300">
                  <p className="text-xl font-bold text-white leading-relaxed">
                    Start preparing now, and you'll be ahead of the curve when 2030 arrives.
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
