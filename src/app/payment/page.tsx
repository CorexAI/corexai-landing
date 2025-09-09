"use client";
import { motion } from "framer-motion";
import { FiCheck, FiX, FiInfo } from "react-icons/fi";
import ProtectedRoute from "@/components/ProtectedRoute";
import { openPaddleCheckout } from "@/lib/paddle";
import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { trackEvent } from "@/lib/gtag";

export default function PaymentPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const { userData } = useUser();
  const { showError } = useToast();

  const handleProUpgrade = () => {
    // Prevent duplicate payments
    if (userData?.plan === 'pro' || userData?.plan === 'creator') {
      showError('Already Subscribed', 'You already have an active subscription. Please check your billing page.');
      return;
    }
    
    setIsProcessing(true);
    trackEvent('plan_selected', { plan: 'pro', location: 'payment' });
    trackEvent('checkout_opened', { provider: 'paddle', plan: 'pro' });
    openPaddleCheckout('pro');
    // Reset after a short delay
    setTimeout(() => setIsProcessing(false), 2000);
  };

  const handleCreatorUpgrade = () => {
    // Prevent duplicate payments
    if (userData?.plan === 'pro' || userData?.plan === 'creator') {
      showError('Already Subscribed', 'You already have an active subscription. Please check your billing page.');
      return;
    }
    
    setIsProcessing(true);
    trackEvent('plan_selected', { plan: 'creator', location: 'payment' });
    trackEvent('checkout_opened', { provider: 'paddle', plan: 'creator' });
    openPaddleCheckout('creator');
    // Reset after a short delay
    setTimeout(() => setIsProcessing(false), 2000);
  };

  return (
    <ProtectedRoute>
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

      <div className="relative z-10 flex flex-col items-center py-24 px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
              <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Upgrade Your Plan</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-geist-sans)' }}
          >
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Unlock{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Unlimited Power.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-sen)' }}
          >
            If one script lands, 
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-semibold"> it pays for itself.</span>
          </motion.p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 via-gray-500/10 to-gray-600/20 rounded-3xl"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-transparent to-gray-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
            
            <div className="relative bg-black/40 backdrop-blur-xl border border-gray-600/40 rounded-3xl p-10 hover:border-gray-500/60 hover:bg-black/30 transition-all duration-300 hover:shadow-2xl hover:shadow-gray-500/10 h-full flex flex-col">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Free Plan</h2>
                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-6xl md:text-7xl font-black text-gray-300">$0</span>
                  <span className="text-xl md:text-2xl text-gray-300">/forever</span>
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

              <div className="w-full group relative bg-gradient-to-r from-gray-600 to-gray-500 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl opacity-80 cursor-not-allowed">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Current Plan
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              </div>
            </div>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative group"
          >
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={handleProUpgrade}
                disabled={isProcessing}
                className="w-full group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-blue-400 disabled:to-blue-300 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 disabled:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Upgrade to Pro
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>

          {/* Creator Plan */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="relative group"
          >
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

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                onClick={handleCreatorUpgrade}
                disabled={isProcessing}
                className="w-full group relative bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 disabled:from-indigo-400 disabled:to-indigo-300 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-indigo-500/25 disabled:shadow-none"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      Upgrade to Creator
                      <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Skip Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-center mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={() => { trackEvent('payment_skip_clicked', { location: 'payment' }); window.location.href = '/dashboard'; }}
            className="group relative bg-gray-900/50 hover:bg-gray-800/60 border border-gray-700/50 hover:border-gray-600/60 text-gray-300 hover:text-white px-8 py-3 rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Skip for now
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </motion.button>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.7 }}
          className="text-center mt-16 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-400">
            <a 
              href="/terms" 
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
            <span className="hidden sm:block">•</span>
            <a 
              href="/privacy" 
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
          <p className="text-xs text-gray-500 mt-4">
            By upgrading, you agree to our Terms of Service and Privacy Policy
          </p>
        </motion.div>

      </div>
    </div>
    </ProtectedRoute>
  );
}
