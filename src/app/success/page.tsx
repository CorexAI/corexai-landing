"use client";
import { useEffect, useState, Suspense } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiArrowRight, FiHome, FiUser } from "react-icons/fi";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, userData, loading: userLoading } = useUser();
  const { showSuccess, showError } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitingForUpdate, setIsWaitingForUpdate] = useState(true);
  const [currentPlan, setCurrentPlan] = useState<string>('free');
  const [hasShownSuccess, setHasShownSuccess] = useState(false);

  // Real-time listener for plan updates
  useEffect(() => {
    if (!user?.uid || !db) {
      console.log('No user or db available, skipping real-time listener');
      return;
    }

    console.log('Setting up real-time listener for user:', user.uid);
    
    const unsubscribe = onSnapshot(
      doc(db, 'users', user.uid),
      (doc) => {
        if (doc.exists()) {
          const newData = doc.data();
          const newPlan = newData.plan || 'free';
          console.log('Real-time update received - Plan:', newPlan);
          
          setCurrentPlan(newPlan);
          
          // If plan is no longer free, subscription was successful
          if (newPlan !== 'free' && !hasShownSuccess) {
            console.log('Subscription activated! Plan:', newPlan);
            setIsWaitingForUpdate(false);
            setHasShownSuccess(true);
            
            const planName = newPlan === 'creator' ? 'Creator' : 'Pro';
            showSuccess(`🎉 Welcome to Corex AI ${planName}!`, "Your subscription has been activated successfully!");
            
            // Auto-redirect to dashboard after showing success
            setTimeout(() => {
              router.push('/dashboard');
            }, 3000);
          }
        } else {
          console.log('User document not found');
        }
      },
      (error) => {
        console.error('Real-time listener error:', error);
        // Don't show error to user, just log it
      }
    );

    // Timeout after 30 seconds (fallback)
    const timeout = setTimeout(() => {
      if (isWaitingForUpdate) {
        console.log('Timeout reached, stopping wait for update');
        setIsWaitingForUpdate(false);
        setIsLoading(false);
        showError('Update Timeout', 'Please refresh the page to see your updated plan.');
      }
    }, 30000);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [user?.uid, hasShownSuccess, showSuccess, showError, router]);

  // Handle case where user already has a paid plan
  useEffect(() => {
    if (userData?.plan && userData.plan !== 'free' && !hasShownSuccess) {
      console.log('User already has paid plan:', userData.plan);
      setIsWaitingForUpdate(false);
      setIsLoading(false);
      setHasShownSuccess(true);
      
      const planName = userData.plan === 'creator' ? 'Creator' : 'Pro';
      showSuccess(`🎉 Welcome to Corex AI ${planName}!`, "Your subscription is already active!");
      
      setTimeout(() => {
        router.push('/dashboard');
      }, 3000);
    }
  }, [userData?.plan, hasShownSuccess, showSuccess, router]);

  const handleGoToDashboard = () => {
    router.push('/dashboard');
  };

  const handleGoToHome = () => {
    router.push('/');
  };

  // Show loading state while waiting for plan update
  if (isLoading || isWaitingForUpdate) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300 text-lg font-medium">Activating your subscription...</p>
          <p className="text-gray-400 text-sm mt-2">This may take a few moments</p>
          
          {/* Progress indicator */}
          <div className="w-64 bg-gray-700 rounded-full h-2 mt-6 mx-auto">
            <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{width: '60%'}}></div>
          </div>
          
          {/* Current plan status */}
          <p className="text-gray-500 text-xs mt-4">
            Current plan: {currentPlan === 'free' ? 'Free' : currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
          </p>
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
            {currentPlan === 'pro' && ' Enjoy unlimited hooks and 50 scripts per month!'}
            {currentPlan === 'creator' && ' Enjoy unlimited hooks and unlimited scripts!'}
          </motion.p>

          {/* Success confirmation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
            className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-8"
          >
            <div className="flex items-center gap-3">
              <FiCheck className="text-green-400 text-xl" />
              <div>
                <p className="text-green-400 font-medium">Subscription Activated!</p>
                <p className="text-green-300/80 text-sm">You now have {currentPlan === 'creator' ? 'Creator' : 'Pro'} access</p>
              </div>
            </div>
          </motion.div>

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
