"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiOutlineDownload, HiOutlineCheck, HiOutlineBadgeCheck, HiOutlineCalendar, HiOutlineUser, HiOutlineShieldCheck, HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/contexts/ToastContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { openPaddleCancellation } from "@/lib/paddle";

export default function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingPageContent />
    </ProtectedRoute>
  );
}

function BillingPageContent() {
  const { user, userData, loading: userLoading, updateUserData, sendVerificationEmail } = useUser();
  const router = useRouter();
  const { showSuccess, showError, showWarning, showInfo } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [showSuccessState, setShowSuccessState] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  // Form states - initialize with real user data
  const [profileData, setProfileData] = useState({
    fullName: userData?.name || "",
    email: userData?.email || ""
  });

  // Update form data when userData loads
  useEffect(() => {
    if (userData) {
      setProfileData({
        fullName: userData.name || "",
        email: userData.email || ""
      });
    }
  }, [userData]);

  // Remove the old authentication check since ProtectedRoute handles this

  // Get plan details based on user's current plan
  const getPlanDetails = (plan: string) => {
    switch (plan) {
      case 'pro':
        return {
          name: "Pro Plan",
          price: "$9.99",
          interval: "month",
          status: "active",
          nextBilling: "Next billing cycle",
                  features: [
          "Unlimited hooks per month",
          "50 scripts per month (30s, 60s)",
          "Scene by scene breakdown",
          "All tones unlocked",
          "Priority support"
        ]
        };
      case 'creator':
        return {
          name: "Creator Plan",
          price: "$18.99",
          interval: "month",
          status: "active",
          nextBilling: "Next billing cycle",
          features: [
            "Unlimited hooks per month",
            "Unlimited scripts per month (30s, 60s, 90s)",
            "All Pro features",
            "Scene by scene breakdown",
            "Visuals and CTA",
            "Dedicated support"
          ]
        };
      default: // free
        return {
          name: "Free Plan",
          price: "$0.00",
          interval: "month",
          status: "active",
          nextBilling: "Upgrade anytime",
          features: [
            "9 hooks per week",
            "3 scripts per week (30s, 60s)",
            "All tones Unlocked",
            "Scene by scene breakdown"
          ]
        };
    }
  };

  // Get usage limits based on plan
  const getUsageLimits = (plan: string) => {
    switch (plan) {
      case 'pro':
        return {
          hooks: "Unlimited",
          scripts: "50 per month"
        };
      case 'creator':
        return {
          hooks: "Unlimited",
          scripts: "Unlimited (soft limit: 150)"
        };
      default: // free
        return {
          hooks: "9 per week",
          scripts: "3 per week"
        };
    }
  };

  // Format date for display
  const formatDate = (dateInput: Date | string | any) => {
    if (!dateInput) return "N/A";
    
    let date: Date;
    
    // Handle Firestore Timestamp objects
    if (dateInput && typeof dateInput.toDate === 'function') {
      date = dateInput.toDate();
    } else if (dateInput instanceof Date) {
      date = dateInput;
    } else {
      date = new Date(dateInput);
    }
    
    if (isNaN(date.getTime())) return "N/A";
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Get current usage display
  const getCurrentUsage = () => {
    if (!userData) return { hooks: '0', scripts: '0', resetInfo: '' };
    
    const plan = userData.plan || 'free';
    
    if (plan === 'free') {
      return {
        hooks: `${(userData.hooksGenerated || 0) * 3}/9`,
        scripts: `${userData.scriptsGenerated || 0}/3`,
        resetInfo: userData.lastReset ? `Resets ${formatDate(userData.lastReset)}` : 'Resets in 7 days'
      };
    } else if (plan === 'pro') {
      return {
        hooks: `${userData.hooksGenerated || 0}`,
        scripts: `${userData.scriptsGenerated || 0}/50`,
        resetInfo: userData.nextRenewalDate ? `Renews ${formatDate(userData.nextRenewalDate)}` : 'Renews in 30 days'
      };
    } else { // creator
      return {
        hooks: `${userData.hooksGenerated || 0}`,
        scripts: `${userData.scriptsGenerated || 0}`,
        resetInfo: userData.nextRenewalDate ? `Renews ${formatDate(userData.nextRenewalDate)}` : 'Renews in 30 days'
      };
    }
  };

  const currentUsage = getCurrentUsage();

  // Calculate member since date
  const getMemberSince = () => {
    if (!user?.metadata?.creationTime) return "N/A";
    return formatDate(user.metadata.creationTime);
  };

  const currentPlan = getPlanDetails(userData?.plan || 'free');

  // Profile management functions
  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      console.log('Saving profile with name:', profileData.fullName);
      
      // Update user data in Firebase
      await updateUserData({
        name: profileData.fullName
      });
      
      console.log('Profile updated successfully');
      setSuccessMessage("Profile updated successfully!");
      setShowSuccessState(true);
      setTimeout(() => setShowSuccessState(false), 3000);
      showSuccess('Profile Updated', 'Your profile has been updated successfully.');
            } catch (error) {
      console.error("Error saving profile:", error);
      let errorMessage = 'Failed to save profile. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('permission')) {
          errorMessage = 'Permission denied. Please sign in again.';
        } else if (error.message.includes('network')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      showError('Profile Update Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangeEmail = async () => {
    if (!newEmail || newEmail === profileData.email) {
      showWarning('Same Email', 'Please enter a different email address');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      showError('Invalid Email', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update email in Firebase (email change requires re-authentication)
      console.log("Email change requested for:", newEmail);
      showInfo('Email Change', 'Email changes require re-authentication for security. Please contact support.');
      
      setProfileData(prev => ({ ...prev, email: newEmail }));
      setNewEmail("");
      setShowEmailChange(false);
      
      setSuccessMessage("Email updated successfully!");
      setShowSuccessState(true);
      setTimeout(() => setShowSuccessState(false), 3000);
      showSuccess('Email Updated', 'Your email address has been updated successfully.');
    } catch (error) {
      console.error("Error changing email:", error);
      showError('Email Update Failed', 'Failed to change email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      // Send password reset email using Firebase
      await sendVerificationEmail();
      
      setSuccessMessage("Password reset link sent to your email!");
      setShowSuccessState(true);
      setTimeout(() => setShowSuccessState(false), 3000);
      showSuccess('Reset Link Sent', 'Password reset link has been sent to your email.');
    } catch (error) {
      console.error("Error sending reset email:", error);
      showError('Password Reset Failed', 'Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      // Send verification email using Firebase
      await sendVerificationEmail();
      
      setSuccessMessage("Verification email sent! Check your inbox.");
      setShowSuccessState(true);
      setTimeout(() => setShowSuccessState(false), 3000);
      showSuccess('Verification Sent', 'Verification email has been sent to your inbox.');
    } catch (error) {
      console.error("Error sending verification email:", error);
      showError('Verification Failed', 'Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Billing functions
  const handleCancelSubscription = async () => {
    if (userData?.plan === 'free') {
      showInfo('No Subscription', "You're currently on the free plan. No subscription to cancel.");
      return;
    }

    if (confirm("Are you sure you want to cancel your subscription? You'll lose access to premium features at the end of your current billing period.")) {
      setIsLoading(true);
      try {
        // Subscription cancellation will be handled by payment processor webhooks
        setSuccessMessage("Subscription cancellation requested. You'll have access until the end of your current billing period.");
        setShowSuccessState(true);
        setTimeout(() => setShowSuccessState(false), 5000);
      } catch (error) {
        showError('Subscription Cancellation Failed', 'Failed to cancel subscription. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // Simulate invoice download
    console.log("Downloading invoice:", invoiceId);
    setSuccessMessage("Invoice downloaded successfully.");
    setShowSuccessState(true);
    setTimeout(() => setShowSuccessState(false), 3000);
  };

  // Show loading state
  if (userLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading account information...</p>
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
              <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Account Management</span>
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
              Manage Your{" "}
            </span>
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
              Account.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
            style={{ fontFamily: 'var(--font-sen)' }}
          >
            Update your profile, manage billing, and 
            <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-semibold"> control your account settings.</span>
          </motion.p>
        </motion.div>

        <div className="w-full max-w-6xl">
          {/* Success Notification */}
          {showSuccessState && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-600 text-white px-6 py-4 rounded-lg mb-6 flex items-center justify-between"
            >
              <span>{successMessage}</span>
              <button
                onClick={() => setShowSuccessState(false)}
                className="text-white hover:text-gray-200"
              >
                ×
              </button>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Account Settings */}
            <div className="space-y-8">
              {/* Profile Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Profile Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.fullName}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-default"
                      placeholder="Name cannot be changed"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      readOnly
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white cursor-default"
                      placeholder="Email cannot be changed"
                    />
                  </div>
                </div>
                
                {/* Remove save button since name cannot be edited */}
              </motion.div>

              {/* Account Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <h2 className="text-xl font-semibold text-white mb-6">Account Security</h2>
                
                <div className="space-y-6">
                  {/* Password Reset */}
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Password Reset</h3>
                    <p className="text-gray-400 mb-4">
                      Send a password reset link to your email address.
                    </p>
                    <button
                      onClick={handleResetPassword}
                      disabled={isLoading}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                    >
                      {isLoading ? "Sending..." : "Send Reset Link"}
                    </button>
                  </div>

                  {/* Email Verification */}
                  <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-medium text-white mb-3">Email Verification</h3>
                    <div className="flex items-center space-x-3 mb-4">
                      <span className={`w-2 h-2 rounded-full ${user?.emailVerified ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                      <span className="text-gray-300">
                        {user?.emailVerified ? 'Email verified' : 'Email not verified'}
                      </span>
                    </div>
                    {!user?.emailVerified && (
                      <button
                        onClick={handleResendVerification}
                        disabled={isLoading}
                        className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                      >
                        {isLoading ? "Sending..." : "Resend Verification Email"}
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>


            </div>

            {/* Right Column - Billing & Usage */}
            <div className="space-y-8">
              {/* Current Plan */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Current Plan</h2>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                      Active
                    </span>
                  </div>
                </div>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-lg p-6 mb-6">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white">{currentPlan.name}</h3>
                    <p className="text-gray-400">{currentPlan.price}/{currentPlan.interval}</p>
                  </div>

                  <div className="space-y-2">
                    {currentPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <HiOutlineCheck className="w-4 h-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  {userData?.plan === 'free' ? (
                    <button 
                      onClick={() => router.push('/payment')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Upgrade Plan
                    </button>
                  ) : (
                    <>
                      <button 
                        onClick={() => router.push('/payment')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Change Plan
                      </button>
                      <button
                        onClick={() => {
                          if (userData?.plan === 'pro' || userData?.plan === 'creator') {
                            // Send cancellation email
                            const subject = encodeURIComponent('Cancel Subscription Request');
                            const body = encodeURIComponent(`Hi,\n\nI would like to cancel my subscription.\n\nSubscription ID: ${(userData as any)?.subscriptionId || 'N/A'}\nCustomer ID: ${(userData as any)?.paddleCustomerId || 'N/A'}\nPlan: ${userData?.plan}\n\nThank you.`);
                            const mailtoUrl = `mailto:corexai.app@gmail.com?subject=${subject}&body=${body}`;
                            window.open(mailtoUrl);
                            showInfo('Cancellation Request', 'Opening email client to send cancellation request. We\'ll process it within 24 hours.');
                          }
                        }}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        Cancel Subscription
                      </button>
                    </>
                  )}
                </div>
              </motion.div>



              {/* Billing History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-900 rounded-xl p-6 border border-gray-800"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Billing History</h2>
                  <button
                                          onClick={() => {
                        // Show subscription details in a more detailed format
                        const planName = userData?.plan ? userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1) : 'N/A';
                        const details = `Corex AI Subscription Details\n\nPlan: ${planName}\nStatus: ${(userData as any)?.subscriptionStatus || 'N/A'}\nStarted: ${userData?.subscriptionStartDate ? formatDate(userData.subscriptionStartDate) : 'N/A'}\nRenews: ${userData?.nextRenewalDate ? formatDate(userData.nextRenewalDate) : 'N/A'}\nSubscription ID: ${(userData as any)?.subscriptionId || 'N/A'}\nCustomer ID: ${(userData as any)?.paddleCustomerId || 'N/A'}`;
                      
                      // Create and download a text file
                      const blob = new Blob([details], { type: 'text/plain' });
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'subscription-details.txt';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      window.URL.revokeObjectURL(url);
                      
                      showSuccess('Downloaded', 'Subscription details downloaded successfully.');
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    <HiOutlineDownload className="w-4 h-4" />
                    <span>Download Details</span>
                  </button>
                </div>
                
                {userData?.plan === 'free' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <HiOutlineCalendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">No Billing History</h3>
                    <p className="text-gray-400 mb-4">You're currently on the free plan. Upgrade to see your billing history.</p>
                    <button
                      onClick={() => router.push('/payment')}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Upgrade Now
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Current Subscription */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-white font-medium">{currentPlan.name} - Monthly</h3>
                          <p className="text-gray-400 text-sm">
                            Started: {userData?.subscriptionStartDate ? formatDate(userData.subscriptionStartDate) : 'N/A'}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {userData?.nextRenewalDate ? `Renews: ${formatDate(userData.nextRenewalDate)}` : 'N/A'}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{currentPlan.price}</p>
                          <p className={`text-sm ${(userData as any)?.subscriptionStatus === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                            {(userData as any)?.subscriptionStatus === 'active' ? 'Active' : (userData as any)?.subscriptionStatus || 'Unknown'}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Subscription Details */}
                    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Subscription ID:</span>
                          <span className="text-white text-sm font-mono">{(userData as any)?.subscriptionId || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Customer ID:</span>
                          <span className="text-white text-sm font-mono">{(userData as any)?.paddleCustomerId || 'N/A'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Plan:</span>
                          <span className="text-white">{userData?.plan ? userData.plan.charAt(0).toUpperCase() + userData.plan.slice(1) : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
