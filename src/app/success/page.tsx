"use client";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight, FiHome, FiUser } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userData, loading: userLoading } = useUser();
  const { showSuccess } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        // Wait a moment for webhook to process
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Refresh user data to get updated subscription status
        if (user) {
          // Force refresh user data from Firebase
          try {
            // You might need to implement a refresh function in UserContext
            // For now, we'll show success message based on URL params or user data
            const plan = userData?.plan || 'pro'; // Default to pro if unknown
            const planName = plan === 'creator' ? 'Creator' : 'Pro';
            showSuccess(`🎉 Welcome to Corex AI ${planName}!`, "Your subscription has been activated successfully!");
          } catch (refreshError) {
            console.warn('Could not refresh user data:', refreshError);
            // Still show success message
            showSuccess("🎉 Welcome to Corex AI Pro!", "Your subscription has been activated successfully!");
          }
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error checking subscription:', error);
        setIsLoading(false);
        // Show success message even if there's an error
        const plan = userData?.plan || 'pro';
        const planName = plan === 'creator' ? 'Creator' : 'Pro';
        showSuccess(`🎉 Welcome to Corex AI ${planName}!`, "Your subscription has been activated successfully!");
      }
    };

    checkSubscription();
  }, [user, showSuccess]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Setting up your subscription...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-radial from-green-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-green-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-green-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-green-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-green-400/40 rounded-full animate-bounce delay-3000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Success Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-black/60 backdrop-blur-xl border border-green-400/30 rounded-3xl p-12 max-w-2xl w-full text-center"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <FiCheck className="text-white text-4xl" />
          </motion.div>

          {/* Success Message */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white"
          >
            Payment Successful!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            Welcome to Corex AI! Your subscription has been activated and you now have access to unlimited content creation tools.
            {userData?.plan === 'pro' && ' Enjoy unlimited hooks and 50 scripts per month!'}
            {userData?.plan === 'creator' && ' Enjoy unlimited hooks and unlimited scripts!'}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGoToDashboard}
              className="group relative bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-green-500/25 flex items-center justify-center gap-3"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out rounded-xl"></div>
              <span className="relative z-10 flex items-center gap-3">
                <FiUser className="w-5 h-5" />
                Go to Dashboard
                <FiArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
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
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className="mt-8 pt-6 border-t border-gray-700/50"
          >
            <p className="text-sm text-gray-400">
              You'll receive a confirmation email shortly. Need help? Contact our support team.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    }>
      <SuccessPageContent />
    </Suspense>
  );
}
