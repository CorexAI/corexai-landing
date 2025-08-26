"use client";
import { motion } from "framer-motion";
import { FiX, FiArrowLeft, FiHome, FiUser, FiRefreshCw } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function CancelPage() {
  const router = useRouter();

  const handleTryAgain = () => {
    router.push('/payment');
  };

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-red-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-red-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-red-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-red-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-red-400/40 rounded-full animate-bounce delay-3000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Cancel Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/60 backdrop-blur-xl border border-red-400/30 rounded-3xl p-12 max-w-2xl w-full text-center"
        >
          {/* Cancel Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FiX className="text-white text-4xl" />
          </motion.div>

          {/* Cancel Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Payment Cancelled
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            No worries! Your payment was cancelled and you haven't been charged. You can try again anytime or continue using our free plan.
          </motion.p>

          {/* Free Plan Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="bg-red-500/10 border border-red-400/20 rounded-2xl p-6 mb-8"
          >
            <h3 className="text-lg font-semibold text-red-400 mb-3">You Still Have Access To:</h3>
            <ul className="text-left space-y-2 text-gray-300">
              <li className="flex items-center gap-2">
                <FiX className="text-red-400 flex-shrink-0" />
                <span>9 Hooks per Week</span>
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400 flex-shrink-0" />
                <span>3 Scripts per Week (30, 60 seconds)</span>
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400 flex-shrink-0" />
                <span>Scene-by-Scene Breakdown</span>
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400 flex-shrink-0" />
                <span>B-roll & CTA Suggestions</span>
              </li>
              <li className="flex items-center gap-2">
                <FiX className="text-red-400 flex-shrink-0" />
                <span>All Tones Unlocked</span>
              </li>
            </ul>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleTryAgain}
              className="group relative bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-red-500/25 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <span className="relative z-10 flex items-center gap-3">
                <FiRefreshCw className="w-5 h-5" />
                Try Again
                <FiArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoToDashboard}
              className="group relative bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/50 hover:border-gray-500/60 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <span className="relative z-10 flex items-center gap-3">
                <FiUser className="w-5 h-5" />
                Go to Dashboard
              </span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoToHome}
              className="group relative bg-gray-800/50 hover:bg-gray-700/60 border border-gray-600/50 hover:border-gray-500/60 text-gray-300 hover:text-white px-8 py-4 rounded-xl text-lg font-medium transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-gray-500/10 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <span className="relative z-10 flex items-center gap-3">
                <FiHome className="w-5 h-5" />
                Back to Home
              </span>
            </motion.button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
            className="mt-8 pt-6 border-t border-gray-700/50"
          >
            <p className="text-sm text-gray-400">
              Having trouble? Contact our support team for assistance.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
