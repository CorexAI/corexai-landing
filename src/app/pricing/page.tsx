"use client";
import { FiCheck, FiX, FiInfo } from "react-icons/fi";
import Footer from "../components/Footer";
import Head from "next/head";



export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Pricing - Corex AI | Viral Content Creation Plans & Pricing</title>
        <meta name="description" content="Choose your Corex AI plan. Free plan includes 3 generations per week. Pro plan: $9.99/month for unlimited hooks and 50 scripts. Creator plan: Unlimited everything." />
        <meta name="keywords" content="Corex AI pricing, viral content plans, AI script generator pricing, content creation tools pricing, TikTok script generator cost" />
        <meta name="author" content="Corex AI Team" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Pricing - Corex AI" />
        <meta property="og:description" content="Choose your Corex AI plan. Free plan includes 3 generations per week. Pro plan: $9.99/month for unlimited hooks and 50 scripts." />
        <meta property="og:url" content="https://corexai.app/pricing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://corexai.app/og%20web%20final.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pricing - Corex AI" />
        <meta name="twitter:description" content="Choose your Corex AI plan. Free plan includes 3 generations per week. Pro plan: $9.99/month for unlimited hooks and 50 scripts." />
        <meta name="twitter:image" content="https://corexai.app/og%20web%20final.png" />
      </Head>
      
      <div className="min-h-screen bg-black text-white relative overflow-hidden mt-0 pt-0">
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

      <div className="relative z-10 flex flex-col items-center py-20 px-4 mt-32">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* Premium Badge */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
              <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Choose Your Plan</span>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight" style={{ fontFamily: 'var(--font-geist-sans)' }}>
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Unlock{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Unlimited Power.
            </span>
          </h1>

          <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto" style={{ fontFamily: 'var(--font-sen)' }}>
            If one script lands, 
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-semibold"> it pays for itself.</span>
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 via-gray-500/10 to-gray-600/20 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-transparent to-gray-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-gray-600/40 rounded-3xl p-10 hover:border-gray-500/60 hover:bg-black/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/10 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Free Plan</h2>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-6xl md:text-7xl font-black text-gray-300">$0</span>
                  <span className="text-xl md:text-2xl text-gray-400">/forever</span>
                </div>
                <p className="text-gray-400 text-lg">Taste the Magic</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">9 hooks/week</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">3 scripts/week (30, 60 seconds)</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">Scene-by-scene breakdown</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">B-roll + CTA suggestions</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">All tones unlocked</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-300 font-medium">Copy to clipboard</span>
                </li>
              </ul>

              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full group relative bg-gradient-to-r from-gray-600 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-gray-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Free
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-blue-500/15 to-blue-600/30 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-black/60 backdrop-blur-xl border border-blue-400/40 rounded-3xl p-10 hover:border-blue-300/60 hover:bg-black/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 h-full flex flex-col">
              {/* Most Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-500 to-blue-400 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-2 shadow-xl">
                  <span className="text-white font-semibold text-sm tracking-wider">Most Popular</span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Pro Plan</h2>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">$9.99</span>
                  <span className="text-xl md:text-2xl text-gray-300">/month</span>
                </div>
                <p className="text-gray-400 text-lg">Level Up Your Creativity</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium"><strong>Unlimited</strong> Hooks</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">50 Scripts (30, 60 seconds)</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Scene-by-scene breakdown</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">B-roll + CTA suggestions</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">All tones unlocked</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Priority AI</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Copy to clipboard</span>
                </li>
              </ul>

              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Pro
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Creator Plan */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/40 via-indigo-500/20 to-indigo-600/40 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/15 via-transparent to-indigo-500/15 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-black/70 backdrop-blur-xl border border-indigo-400/50 rounded-3xl p-10 hover:border-indigo-300/70 hover:bg-black/60 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/30 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Creator Plan</h2>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-6xl md:text-7xl font-black bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">$18.99</span>
                  <span className="text-xl md:text-2xl text-gray-300">/month</span>
                </div>
                <p className="text-gray-400 text-lg">Create Without Limits</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium"><strong>Unlimited</strong> Hooks</span>
                </li>
                <li className="flex items-start gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="text-gray-200 font-medium leading-relaxed">
                      <div className="flex items-center gap-2">
                        <span><strong>Unlimited</strong> Scripts</span>
                        <div className="relative inline-block">
                          <div className="tooltip-group">
                            <FiInfo className="w-4 h-4 text-indigo-400 cursor-help" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg text-sm text-gray-200 whitespace-nowrap opacity-0 tooltip-group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                              Soft limits exist to protect system stability. Most users never reach 150 scripts/month.
                              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900/95"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-gray-300">(30, 60, 90 seconds)</div>
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Scene-by-scene breakdown</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">B-roll + CTA suggestions</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">All tones unlocked</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Priority AI</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Copy to clipboard</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FiCheck className="text-white text-sm" />
                  </div>
                  <span className="text-gray-200 font-medium">Early access</span>
                </li>
              </ul>

              <button 
                onClick={() => window.location.href = '/signup'}
                className="w-full group relative bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-indigo-500/25"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Start Creator
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </div>
          </div>


        </div>


      </div>
      
      <Footer />
    </div>
    </>
  );
} 