"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineChevronRight, HiOutlineChevronLeft, HiOutlineSparkles, HiOutlineChartBar, HiOutlineUser, HiOutlineGlobe } from 'react-icons/hi';
import { FaTiktok, FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { MdFitnessCenter, MdComputer, MdBusiness, MdFavorite } from 'react-icons/md';
import { BiTrendingUp, BiLike, BiDollar, BiBuilding } from 'react-icons/bi';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <OnboardingPageContent />
    </ProtectedRoute>
  );
}

function OnboardingPageContent() {
  const { user, userData, updateUserData } = useUser();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<{
    platform: string;
    following: string;
    source: string;
  }>({
    platform: '',
    following: '',
    source: ''
  });
  const [transitionState, setTransitionState] = useState<'onboarding'>('onboarding');
  const [loading, setLoading] = useState(false);

  const questions: Array<{
    id: keyof typeof answers;
    title: string;
    subtitle: string;
    options: Array<{
      value: string;
      icon: any;
      color: string;
      label: string;
    }>;
  }> = [
    {
      id: 'platform',
      title: "What's your main platform?",
      subtitle: "Choose where you create most of your content",
      options: [
        { value: 'TikTok', icon: FaTiktok, color: 'from-pink-500 to-red-500', label: 'TikTok' },
        { value: 'Instagram', icon: FaInstagram, color: 'from-purple-500 to-pink-500', label: 'Instagram Reels' },
        { value: 'YouTube', icon: FaYoutube, color: 'from-red-500 to-red-600', label: 'YouTube Shorts' },
        { value: 'Others', icon: HiOutlineGlobe, color: 'from-gray-500 to-gray-600', label: 'Others' }
      ]
    },
    {
      id: 'following',
      title: "What's your current following?",
      subtitle: "Help us personalize your experience",
      options: [
        { value: 'Just starting', icon: HiOutlineSparkles, color: 'from-gray-500 to-gray-600', label: 'Just starting' },
        { value: '1K–10K', icon: HiOutlineChartBar, color: 'from-blue-500 to-blue-600', label: '1K–10K' },
        { value: '10K–100K', icon: HiOutlineChartBar, color: 'from-purple-500 to-purple-600', label: '10K–100K' },
        { value: '100K+', icon: HiOutlineChartBar, color: 'from-green-500 to-green-600', label: '100K+' }
      ]
    },
    {
      id: 'source',
      title: "Where did you hear about us?",
      subtitle: "Help us understand how you found Corex AI",
      options: [
        { value: 'X', icon: FaXTwitter, color: 'from-gray-500 to-gray-600', label: 'X (Twitter)' },
        { value: 'Instagram', icon: FaInstagram, color: 'from-purple-500 to-pink-500', label: 'Instagram' },
        { value: 'TikTok', icon: FaTiktok, color: 'from-pink-500 to-red-500', label: 'TikTok' },
        { value: 'Others', icon: HiOutlineGlobe, color: 'from-gray-500 to-gray-600', label: 'Others' }
      ]
    }
  ];

  const handleAnswer = (questionId: keyof typeof answers, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const nextStep = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding and save data
      setLoading(true);
      try {
        await updateUserData({
          onboardingCompleted: true,
          onboardingData: answers
        });
        
        // Redirect to payment page
        router.push('/payment');
      } catch (error) {
        console.error('Error saving onboarding data:', error);
        // Still redirect to payment even if save fails
        router.push('/payment');
      } finally {
        setLoading(false);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Remove the old authentication check since ProtectedRoute handles this
  
  // Redirect if already completed onboarding
  useEffect(() => {
    if (userData?.onboardingCompleted) {
      router.push('/dashboard');
    }
  }, [userData?.onboardingCompleted, router]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;
  const isLastStep = currentStep === questions.length - 1;

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Magical Blue Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/8 rounded-full blur-3xl animate-pulse delay-2000"></div>
      
      {/* Floating Blue Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce"></div>
        <div className="absolute top-40 right-24 w-1.5 h-1.5 bg-blue-300/50 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-60 left-1/3 w-1 h-1 bg-blue-500/70 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-3000"></div>
        <div className="absolute top-100 left-2/3 w-1.5 h-1.5 bg-blue-300/60 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-120 right-1/4 w-1 h-1 bg-blue-500/50 rounded-full animate-bounce delay-5000"></div>
      </div>

      <div className="relative z-10">
        <div className="max-w-4xl mx-auto px-4 pt-20 pb-24">
          
          {/* Progress Bar */}
          {transitionState === 'onboarding' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <div className="text-center mb-8 mt-8 mb-16">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Setting up your profile</span>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-400">Progress</span>
                <span className="text-sm text-blue-400 font-medium">{currentStep + 1}/{questions.length}</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          )}

          {/* Question Card */}
          {transitionState === 'onboarding' && (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12"
            >
              {/* Question Header */}
              <div className="text-center mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  {currentQuestion.title}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-gray-400"
                  style={{ fontFamily: 'var(--font-sen)' }}
                >
                  {currentQuestion.subtitle}
                </motion.p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <AnimatePresence>
                  {currentQuestion.options.map((option, index) => {
                    const Icon = option.icon;
                    const isSelected = answers[currentQuestion.id] === option.value;
                    
                    return (
                      <motion.button
                        key={option.value}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        className={`relative group p-6 rounded-2xl border-2 transition-all duration-300 ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500/10'
                            : 'border-white/10 hover:border-white/30 bg-white/5'
                        }`}
                      >
                        {/* Background Gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                        
                        <div className="relative z-10 flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-xl flex items-center justify-center`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-semibold text-white">{option.label}</h3>
                          </div>
                        </div>

                        {/* Selection Indicator */}
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.div>
                        )}
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                {currentStep > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 text-white hover:text-blue-400"
                  >
                    <HiOutlineChevronLeft className="w-5 h-5" />
                    <span>Back</span>
                  </motion.button>
                )}

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  onClick={nextStep}
                  disabled={!answers[currentQuestion.id] || loading}
                  className={`flex items-center space-x-2 px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
                    answers[currentQuestion.id] && !loading
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  } ${currentStep === 0 ? 'ml-auto' : ''}`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <span>{isLastStep ? 'Complete Setup' : 'Next'}</span>
                      {!isLastStep && <HiOutlineChevronRight className="w-5 h-5" />}
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
