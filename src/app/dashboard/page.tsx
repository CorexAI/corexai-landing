"use client";
import { motion } from "framer-motion";
import { HiOutlineClipboard, HiOutlineStar, HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineSpeakerphone, HiOutlineArrowUp, HiOutlineBadgeCheck, HiOutlineDocumentText, HiOutlineChartBar, HiOutlinePlus, HiOutlineRefresh, HiOutlineMail } from "react-icons/hi";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { getDaysUntilReset, getCurrentUsage, fixOldAccountReset } from "@/lib/usageTracking";
import { getSubscriptionInfo } from "@/lib/subscriptionUtils";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useToast } from "@/contexts/ToastContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppSidebar from "@/components/AppSidebar";
import { getCurrentTipSet, Tip } from "@/lib/tipsData";

interface Script {
  id: string;
  title: string;
  content: string;
  type: 'hook' | 'full-script' | 'cta';
  timestamp: string;
  engagementPotential: number;
}

export default function DashboardPage() {
  const { user, userData, sendVerificationEmail, loading: userLoading, refreshUserData, updateUserData } = useUser();
  const router = useRouter();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { showSuccess, showError } = useToast();

  // Remove the old authentication check since ProtectedRoute handles this

  // Debug: Log user data changes
  useEffect(() => {
    if (userData && user?.uid) {
      console.log('Dashboard - Current user data:', {
        hooksGenerated: userData.hooksGenerated,
        scriptsGenerated: userData.scriptsGenerated,
        plan: userData.plan
      });
    }
  }, [userData, user?.uid]);

  // Listen for usage updates from the centralized system
  useEffect(() => {
    if (!user) return;
    
    const handleUsageUpdate = (event: CustomEvent) => {
      const { uid, usage } = event.detail;
      if (uid === user.uid) {
        console.log('🔄 Dashboard received usage update:', usage);
        // Update the userData state with new usage using updateUserData
        if (userData) {
          updateUserData(usage);
        }
      }
    };
    
    window.addEventListener('usageUpdated', handleUsageUpdate as EventListener);
    
    return () => {
      window.removeEventListener('usageUpdated', handleUsageUpdate as EventListener);
    };
  }, [user, userData, updateUserData]);

  // Calculate usage limits based on plan (marketing display)
  const getUsageLimits = () => {
    switch (userData?.plan) {
      case 'pro':
        return { hooks: 'Unlimited', scripts: 50 };
      case 'creator':
        return { hooks: 'Unlimited', scripts: 'Unlimited' };
      default: // free
        return { hooks: 9, scripts: 3 }; // Marketing: 9 hooks, Backend: 3 ideas
    }
  };

  // Get actual backend limits for tracking
  const getBackendLimits = () => {
    switch (userData?.plan) {
      case 'pro':
        return { hooks: 'Unlimited', scripts: 50 };
      case 'creator':
        return { hooks: 'Unlimited', scripts: 'Unlimited' };
      default: // free
        return { hooks: 9, scripts: 3 }; // 3 generations × 3 hooks = 9 hooks total
    }
  };

  const usageLimits = getUsageLimits();
  const isPremium = userData?.plan !== 'free';
  
  // Dynamic tips system
  const [currentTips, setCurrentTips] = useState<Tip[]>([]);
  const [currentTipSetId, setCurrentTipSetId] = useState<number>(1);
  const [tipsLastUpdated, setTipsLastUpdated] = useState<Date | null>(null);

  // Update tips when user data changes
  useEffect(() => {
    if (userData) {
      console.log('🔍 DASHBOARD DEBUG: userData changed:', userData);
      
      const tipsLastShown = userData.tipsLastShown ? new Date(userData.tipsLastShown) : null;
      const currentTipSet = userData.currentTipSet || 1;
      
      // Get the correct tip set based on time
      const { setId, tips } = getCurrentTipSet(tipsLastShown, currentTipSet);
      
      console.log('🔍 TIPS DEBUG:', {
        tipsLastShown: tipsLastShown ? (isNaN(tipsLastShown.getTime()) ? 'Invalid Date' : tipsLastShown.toISOString()) : 'null',
        currentTipSet,
        calculatedSetId: setId,
        tipsCount: tips.length
      });
      
      // Always update the UI with the calculated set
      setCurrentTips(tips);
      setCurrentTipSetId(setId);
      setTipsLastUpdated(tipsLastShown);
      
      // If tips need to be updated (new day), update user data
      const now = new Date();
      if (tipsLastShown) {
        // Calculate days since start
        const startDate = new Date(tipsLastShown);
        const currentDate = new Date(now);
        
        // Check for invalid dates
        if (isNaN(startDate.getTime()) || isNaN(currentDate.getTime())) {
          console.log('⚠️ Invalid date detected, skipping update');
          return;
        }
        
        // Set both dates to midnight for accurate day calculation
        startDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        
        const timeDiff = currentDate.getTime() - startDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        
        console.log('🔍 TIME DEBUG:', {
          startDate: isNaN(startDate.getTime()) ? 'Invalid Date' : startDate.toISOString(),
          currentDate: isNaN(currentDate.getTime()) ? 'Invalid Date' : currentDate.toISOString(),
          daysDiff,
          currentSet: currentTipSet,
          newSet: setId,
          needsUpdate: setId !== currentTipSet
        });
        
        // If the calculated set is different from stored set, update it
        if (setId !== currentTipSet) {
          console.log('🔄 Updating tips to set:', setId, '(Day', daysDiff + 1, ')');
          updateUserTips(setId, now);
        }
      } else {
        // First time user, set initial tips (Day 1 = Set 1)
        console.log('🔄 Setting initial tips to set:', setId, '(Day 1)');
        updateUserTips(setId, now);
      }
    }
  }, [userData]);

  // Function to update user tips in Firebase
  const updateUserTips = async (setId: number, date: Date) => {
    if (!user?.uid) return;
    
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        currentTipSet: setId,
        tipsLastShown: date
      });
      
      console.log(`✅ Updated user tips to set ${setId}`);
      
      // Refresh user data to get the updated tips
      await refreshUserData();
    } catch (error) {
      console.error('❌ Error updating user tips:', error);
    }
  };

  // Manual function to force refresh tips (for testing)
  const forceRefreshTips = async () => {
    if (!user?.uid) return;
    
    try {
      const now = new Date();
      // Calculate what set should be shown based on current day
      const { setId, tips } = getCurrentTipSet(userData?.tipsLastShown ? new Date(userData.tipsLastShown) : null, userData?.currentTipSet || 1);
      
      console.log('🔄 Force refreshing tips to set:', setId);
      
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        currentTipSet: setId,
        tipsLastShown: userData?.tipsLastShown || now // Keep original start date
      });
      
      // Update UI immediately
      setCurrentTips(tips);
      setCurrentTipSetId(setId);
      setTipsLastUpdated(userData?.tipsLastShown ? new Date(userData.tipsLastShown) : now);
      
      console.log(`✅ Force refreshed tips to set ${setId}`);
      
      // Refresh user data to sync
      await refreshUserData();
    } catch (error) {
      console.error('❌ Error force refreshing tips:', error);
    }
  };

  // Convert tips to Script format for display
  const recentScripts: Script[] = currentTips.map((tip, index) => ({
    id: tip.id,
    title: `Tip #${index + 1}: ${tip.title}`,
    content: tip.description,
    type: 'hook' as const,
    timestamp: `${currentTipSetId === 1 ? 'Today' : `Set ${currentTipSetId}`}`,
    engagementPotential: 85 + Math.floor(Math.random() * 15) // Random engagement score
  }));

  // Calculate days until reset/renewal
  const daysUntilReset = getDaysUntilReset(userData);

  // Get reset/renewal text based on plan
  const getResetText = () => {
    if (!userData) return '';
    
    const subscriptionInfo = getSubscriptionInfo(userData);
    if (!subscriptionInfo) return '';
    
    if (userData.plan === 'free') {
      const daysUntilReset = getDaysUntilReset(userData);
      return `Resets in ${daysUntilReset} days`;
    } else {
      // For Pro/Creator users, show subscription info
      if (subscriptionInfo.canGenerate) {
        return `Renews in ${subscriptionInfo.daysUntilRenewal} days`;
      } else {
        return 'Subscription expired - cannot generate content';
      }
    }
  };

  // Get subscription status for display
  const getSubscriptionStatus = () => {
    if (!userData) return null;
    
    console.log('🔍 DASHBOARD DEBUG: userData received:', userData);
    console.log('🔍 DASHBOARD DEBUG: userData.plan:', userData.plan);
    console.log('🔍 DASHBOARD DEBUG: userData.nextRenewalDate:', userData.nextRenewalDate);
    console.log('🔍 DASHBOARD DEBUG: userData.subscriptionStatus:', (userData as any).subscriptionStatus);
    
    const subscriptionInfo = getSubscriptionInfo(userData);
    console.log('🔍 DASHBOARD DEBUG: subscriptionInfo:', subscriptionInfo);
    
    if (!subscriptionInfo) return null;
    
    if (userData.plan === 'free') {
      return {
        status: 'Active',
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        borderColor: 'border-green-400/30'
      };
    }
    
    if (subscriptionInfo.canGenerate) {
      return {
        status: 'Active',
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        borderColor: 'border-blue-400/30'
      };
    } else {
      return {
        status: 'Expired',
        color: 'text-red-400',
        bgColor: 'bg-red-400/10',
        borderColor: 'border-red-400/30'
      };
    }
  };

  // Get usage display text based on plan
  const getUsageDisplay = () => {
    if (!userData) return { hooks: '0/0', scripts: '0/0' };
    
    const plan = userData.plan || 'free';
    
    if (plan === 'free') {
      // For hooks: show generations vs limit of 3 (each generation creates 3 hooks)
      const generations = userData.hooksGenerated || 0;
      return {
        hooks: `${generations}/3`,
        scripts: `${userData.scriptsGenerated || 0}/3`
      };
    } else if (plan === 'pro') {
      return {
        hooks: `${userData.hooksGenerated || 0}`,
        scripts: `${userData.scriptsGenerated || 0}/50`
      };
    } else { // creator
      return {
        hooks: `${userData.hooksGenerated || 0}`,
        scripts: `${userData.scriptsGenerated || 0}`
      };
    }
  };

  const usageDisplay = getUsageDisplay();



  const handleGenerate = (type: 'hook' | 'full-script' | 'cta') => {
    // Navigate to the appropriate generator page
    if (type === 'hook') {
      router.push('/hook-generator');
    } else if (type === 'full-script') {
      router.push('/full-script-creator');
    }
  };

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    showSuccess('Copied!', 'Content copied to clipboard');
  };



  const handleResendVerification = async () => {
    try {
      await sendVerificationEmail();
      showSuccess('Verification Email Sent', 'Check your inbox to verify your email address.');
    } catch (error) {
      console.error('Error sending verification email:', error);
      showError('Verification Failed', 'Could not send verification email. Please try again.');
    }
  };

  const handleRefreshData = async () => {
    try {
      await refreshUserData();
      console.log('User data refreshed successfully');
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const handleSyncUsage = async () => {
    try {
      if (user?.uid) {
        console.log('🔄 Manually syncing usage with Firebase...');
        // Get current usage from Firebase and refresh dashboard
        const currentUsage = await getCurrentUsage(user.uid);
        if (currentUsage) {
          console.log('📊 Current Firebase usage:', currentUsage);
          await refreshUserData(); // Refresh user data after sync
          console.log('✅ Usage sync completed');
        }
      }
    } catch (error) {
      console.error('Error syncing usage:', error);
    }
  };

  const handleFixOldAccount = async () => {
    try {
      if (user?.uid) {
        console.log('🔧 Fixing old account reset field...');
        const fixed = await fixOldAccountReset(user.uid);
        if (fixed) {
          console.log('✅ Old account fixed successfully');
          await refreshUserData(); // Refresh to show updated reset countdown
        } else {
          console.log('ℹ️ Account is already up to date');
        }
      }
    } catch (error) {
      console.error('Error fixing old account:', error);
    }
  };



  // Show loading state
  if (userLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show loading state if user exists but userData is still loading
  if (user && !userData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your account...</p>
        </div>
      </div>
    );
  }



  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
        <AppSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          currentPage="dashboard"
        />

        {/* Main Content - Keep your existing pl-64, add mobile override */}
        <div className="pl-0 sm:pl-64">
          {/* Top Bar - Keep your existing classes */}
          <div className="h-20 bg-black border-b border-gray-800 flex items-center justify-between px-4 sm:px-8">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Toggle - Only visible on mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="sm:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h2 className="text-3xl font-bold text-white">Dashboard</h2>
            </div>
          </div>

          {/* Content - Keep your existing p-8 pt-20, add mobile padding */}
          <div className="p-4 sm:p-8 pt-20">
            {/* Email Verification Notice - Keep your existing classes, add mobile layout */}
            {user && !user.emailVerified && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <HiOutlineMail className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div>
                      <h3 className="text-yellow-400 font-medium">Email Verification Required</h3>
                      <p className="text-yellow-300/80 text-sm">Please verify your email address to access all features</p>
                    </div>
                  </div>
                  <button
                    onClick={handleResendVerification}
                    className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors text-sm font-medium w-full sm:w-auto"
                  >
                    Resend Email
                  </button>
                </div>
              </motion.div>
            )}

            {/* Welcome Section - Keep your existing classes, add mobile text sizes */}
            <div className="mb-16 text-center">
              <h2 className="text-4xl sm:text-6xl font-bold text-white mb-3 -mt-4">Welcome, {userData?.name?.split(' ')[0] || 'Creator'}</h2>
              <p className="text-lg sm:text-xl text-gray-400">Your next viral idea starts here.</p>
            </div>

            {/* Top Row: AI Tools & Stats - Keep your existing grid, add mobile spacing */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {/* Hook Generator - Keep your existing classes, add mobile padding */}
              <Link
                href="/hook-generator"
                className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 hover:border-blue-500 transition-all duration-200 text-left cursor-pointer min-h-[200px] sm:min-h-0"
              >
                <h3 className="text-2xl sm:text-2xl font-bold text-white mb-4 text-center">Hook Generator</h3>
                <p className="text-gray-300 text-base sm:text-base mb-6 text-center">Hook your audience instantly. Make them stop scrolling.</p>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-blue-500/20 text-base sm:text-base">
                    Let's Start
                  </div>
                </div>
              </Link>

              {/* Full Script Creator - Keep your existing classes, add mobile padding */}
              <Link
                href="/full-script-creator"
                className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 hover:border-purple-500 transition-all duration-200 text-left cursor-pointer min-h-[200px] sm:min-h-0"
              >
                <h3 className="text-2xl sm:text-2xl font-bold text-white mb-4 text-center">Full Script Generator</h3>
                <p className="text-gray-300 text-base sm:text-base mb-6 text-center">Turn any idea into a ready-to-use script. Fast and easy.</p>
                <div className="flex justify-center">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold transition-all duration-300 ease-out hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl hover:shadow-purple-500/20 text-base sm:text-base">
                    Let's Start
                  </div>
                </div>
              </Link>

              {/* Script Usage - Keep your existing classes, add mobile padding */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6 text-left">
                <h3 className="text-2xl sm:text-2xl font-bold text-white mb-4 text-center">Usage Stats</h3>
                
                {/* Subscription Status */}
                {userData && (
                  <div className="mb-4 p-3 rounded-lg border">
                    {(() => {
                      const subscriptionStatus = getSubscriptionStatus();
                      if (!subscriptionStatus) return null;
                      
                      return (
                        <div className={`${subscriptionStatus.bgColor} ${subscriptionStatus.borderColor} border rounded-lg p-3`}>
                          <div className="flex items-center justify-between">
                            <span className={`text-sm font-medium ${subscriptionStatus.color}`}>
                              {userData.plan === 'free' ? 'Free Plan' : `${userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1)} Plan`}
                            </span>
                            <span className={`text-xs px-2 py-1 rounded-full ${subscriptionStatus.bgColor} ${subscriptionStatus.color} border ${subscriptionStatus.borderColor}`}>
                              {subscriptionStatus.status}
                            </span>
                          </div>
                          <div className="mt-2 text-xs text-gray-400">
                            {getResetText()}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
                
                <div className="space-y-2 sm:space-y-3 mb-6">
                  {/* Free User */}
                  {userData?.plan === 'free' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Hooks:</span>
                        <span className="text-white font-semibold" title="Each generation creates 3 hooks. You've used 4/3 generations.">
                          {usageDisplay.hooks}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Scripts:</span>
                        <span className="text-white font-semibold">
                          {usageDisplay.scripts}
                        </span>
                      </div>
                    </>
                  )}
                  
                  {/* Pro User */}
                  {userData?.plan === 'pro' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Hooks:</span>
                        <span className="text-white font-semibold">
                          {usageDisplay.hooks}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Scripts:</span>
                        <span className="text-white font-semibold">
                          {usageDisplay.scripts}
                        </span>
                      </div>
                    </>
                  )}
                  
                  {/* Creator User */}
                  {userData?.plan === 'creator' && (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Hooks:</span>
                        <span className="text-white font-semibold">
                          {usageDisplay.hooks}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 text-sm">Scripts:</span>
                        <span className="text-white font-semibold">
                          {usageDisplay.scripts}
                        </span>
                      </div>
                    </>
                  )}
                </div>
                




              </div>
            </div>

            {/* Bottom Row: Viral Secrets - Keep your existing grid, add mobile spacing */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6">
              {/* Viral Secrets - Keep your existing classes, add mobile padding */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-lg sm:text-lg font-semibold text-white">Viral Secrets</h3>
                  </div>
                  {!isPremium && (
                    <span className="text-sm sm:text-sm text-gray-400">
                      Unlock all secrets with Premium
                    </span>
                  )}
                </div>

                <div className="space-y-3 sm:space-y-4">
                  {recentScripts.map((script) => (
                    <div key={script.id} className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <HiOutlineStar className="w-4 h-4 text-blue-400" />
                          <h4 className="font-medium text-white text-base sm:text-base">{script.title}</h4>
                        </div>
                      </div>
                      <p className="text-gray-300 text-sm sm:text-sm mb-2 sm:mb-3">{script.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
