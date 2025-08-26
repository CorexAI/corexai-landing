'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { HiOutlineSparkles, HiOutlineClipboard, HiOutlineChevronDown, HiOutlineStar, HiOutlineDocumentText, HiOutlineChartBar, HiOutlineLightningBolt, HiOutlineDownload } from 'react-icons/hi';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { generatePDF } from '@/utils/api-helpers';
import { checkUsageLimit, incrementUsage } from '@/lib/simpleUsageTracking';
import { useToast } from '@/contexts/ToastContext';
import LoadingSpinner from '@/components/LoadingSpinner';
import ProtectedRoute from '@/components/ProtectedRoute';
import AppSidebar from '@/components/AppSidebar';

export default function HookGeneratorPage() {
  const { user, userData, loading: userLoading, refreshUserData } = useUser();
  const router = useRouter();
  const { showSuccess, showError, showWarning } = useToast();
  
  // Remove the old authentication checks since ProtectedRoute handles this
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Casual');
  const [audience, setAudience] = useState('General');
  const [platform, setPlatform] = useState('TikTok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHook, setGeneratedHook] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowToneDropdown(false);
        setShowAudienceDropdown(false);
        setShowPlatformDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setGeneratedHook('');
    
    try {
      console.log('Sending request with UID:', user?.uid);
      
      // Check usage limit before generating
      if (user?.uid) {
        const usageCheck = await checkUsageLimit(user.uid, 'hook');
        if (!usageCheck.allowed) {
          showError('Usage Limit Reached', usageCheck.message || 'You have reached your hook generation limit.');
          setIsGenerating(false);
          return;
        }
      }
      
      // Get the current user's ID token
      const idToken = await user?.getIdToken();
      if (!idToken) {
        showError('Authentication Error', 'Please sign in again to continue.');
        setIsGenerating(false);
        return;
      }

      const response = await fetch('/api/generate-hook-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          topic: topic.trim(),
          tone,
          audience,
          platform,
        }),
      });

      // Check response status first without consuming the body
      if (!response.ok) {
        let errorMessage = 'Failed to generate hooks. Please try again.';
        
        if (response.status === 429) {
          errorMessage = 'Usage Limit Exceeded: You have reached your hook generation limit. Please upgrade your plan or wait for reset.';
        } else if (response.status === 500) {
          errorMessage = 'Server Error: Internal server error. Please try again later.';
        } else if (response.status === 400) {
          errorMessage = 'Bad Request: Please check your input and try again.';
        }
        
        console.error('Hook generation failed with status:', response.status);
        setGeneratedHook(`❌ ${errorMessage}`);
        setIsGenerating(false);
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setGeneratedHook('❌ Error: No response stream available');
        return;
      }

      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        
        // Update the UI in real-time as content streams in
        setGeneratedHook(fullResponse);
      }

      // Final update to ensure all content is displayed
      setGeneratedHook(fullResponse);
      setIsGenerating(false);
      
      // Refresh user data to update dashboard (usage already incremented by backend)
      if (user?.uid) {
        try {
          console.log('🔄 Refreshing user data...');
          refreshUserData();
        } catch (error) {
          console.error('❌ Error refreshing user data:', error);
        }
      }
    } catch (error) {
      console.error('Error generating hooks:', error);
      let errorMessage = 'Failed to generate hooks. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('limit')) {
          errorMessage = 'Usage limit reached. Please upgrade your plan or wait for reset.';
        }
      }
      
      setGeneratedHook(`❌ ${errorMessage}`);
      showError('Generation Failed', errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedHook.trim()) {
      showWarning('No Content', 'No hook generated to copy.');
      return;
    }

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generatedHook);
      showSuccess('Copied!', 'Hook copied to clipboard successfully.');
    } catch (error) {
      console.error('❌ Failed to copy:', error);
      
      // Fallback: create textarea and copy
      const textArea = document.createElement('textarea');
      textArea.value = generatedHook;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        showSuccess('Copied!', 'Hook copied to clipboard successfully.');
      } catch (fallbackError) {
        console.error('❌ Fallback copy failed:', fallbackError);
        showError('Copy Failed', 'Failed to copy text. Please select and copy manually.');
      }
      document.body.removeChild(textArea);
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedHook.trim()) {
      console.log('❌ No content to download');
      showWarning('No Content', 'No hook generated to download.');
      return;
    }
    
    setIsDownloading(true);
    try {
      generatePDF(generatedHook, {
        type: 'hook',
        topic: topic,
        tone: tone,
        audience: audience,
        platform: platform
      });
      showSuccess('PDF Generated!', 'Your hook has been downloaded as a PDF.');
    } catch (error) {
      console.error('❌ Error generating PDF:', error);
      showError('PDF Generation Failed', 'Failed to generate PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };



  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-black text-white">
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
          <div className="absolute top-140 left-1/4 w-2 h-2 bg-blue-400/70 rounded-full animate-bounce delay-6000"></div>
          <div className="absolute top-160 right-2/3 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-bounce delay-7000"></div>
        </div>

        <AppSidebar 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          currentPage="hook-generator"
        />

        {/* Main Content */}
        <div className="pl-0 sm:pl-64">
          {/* Mobile Header - Only visible on mobile */}
          <div className="sm:hidden h-16 bg-black border-b border-gray-800 flex items-center px-4 fixed top-0 left-0 right-0 z-50">
            <button
              onClick={() => {
                console.log('Mobile menu toggle clicked, current state:', isMobileMenuOpen);
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="p-2 text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="ml-4 text-xl font-bold text-white">Hook Generator</h2>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-8 pt-28 sm:pt-24">
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
                className="mb-8 sm:block hidden"
              >
                <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">
                    Hook Generator • {userData?.plan?.toUpperCase() || 'FREE'} Plan
                  </span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className="text-5xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Create{" "}
                </span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Viral Hooks.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
                style={{ fontFamily: 'var(--font-sen)' }}
              >
                Generate scroll-stopping hooks that 
                <span className="bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent font-semibold"> Grab attention instantly.</span>
              </motion.p>
            </motion.div>

            {/* Main Content */}
            <div className="w-full max-w-4xl mx-auto">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="space-y-6 mb-8"
              >
                {/* Input Field */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-2xl blur-sm"></div>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your content idea... What story, tip, or insight do you want to share?"
                    className="relative w-full h-36 px-6 py-5 bg-gray-900/90 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 resize-none text-xl leading-relaxed font-medium shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-blue-500/10"
                  />
                </div>

                {/* Parameter Dropdowns */}
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  {/* Tone */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">Tone</label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowToneDropdown(!showToneDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-blue-500/10 pr-8 md:pr-10 text-left"
                      >
                        {tone}
                        <HiOutlineChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform duration-200 ${showToneDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showToneDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setTone('Casual');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">😊</span>
                            <span>Casual</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Professional');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">💼</span>
                            <span>Professional</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Energetic');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">⚡</span>
                            <span>Energetic</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Humorous');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">😂</span>
                            <span>Humorous</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Inspirational');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">✨</span>
                            <span>Inspirational</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Storytelling');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">📖</span>
                            <span>Storytelling</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Direct');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">🎯</span>
                            <span>Direct</span>
                          </button>
                          <button
                            onClick={() => {
                              setTone('Diplomatic');
                              setShowToneDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-b-lg text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">🤝</span>
                            <span>Diplomatic</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audience */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">Audience</label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-blue-500/10 pr-8 md:pr-10 text-left"
                      >
                        {audience}
                        <HiOutlineChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform duration-200 ${showAudienceDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showAudienceDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setAudience('General');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">👥</span>
                            <span>General</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Young Adults');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">👨‍🎓</span>
                            <span>Young Adults</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Professionals');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">👔</span>
                            <span>Professionals</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Students');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">📚</span>
                            <span>Students</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Entrepreneurs');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">💼</span>
                            <span>Entrepreneurs</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Tech Savvy');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">💻</span>
                            <span>Tech Savvy</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Fitness');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">💪</span>
                            <span>Fitness</span>
                          </button>
                          <button
                            onClick={() => {
                              setAudience('Marketing');
                              setShowAudienceDropdown(false);
                            }}
                            className="w-full px-3 md:px-4 py-2 md:py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-b-lg text-sm md:text-base flex items-center"
                          >
                            <span className="mr-2">📈</span>
                            <span>Marketing</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Platform */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">Platform</label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-blue-500/10 pr-8 md:pr-10 text-left"
                      >
                        {platform}
                        <HiOutlineChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform duration-200 ${showPlatformDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showPlatformDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setPlatform('TikTok');
                              setShowPlatformDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                          >
                            TikTok
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('Instagram');
                              setShowPlatformDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            Instagram
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('YouTube');
                              setShowPlatformDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            YouTube
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('LinkedIn');
                              setShowPlatformDropdown(false);
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-b-lg"
                          >
                            LinkedIn
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || isGenerating}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 disabled:from-gray-600 disabled:to-gray-600 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-transform duration-300 ease-out disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isGenerating ? (
                        <>
                          <LoadingSpinner />
                          Generating...
                        </>
                      ) : (
                        <>
                          <HiOutlineSparkles className="w-5 h-5" />
                          Generate Hook
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Generated Hook Card */}
              {generatedHook && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
                  className="space-y-6 relative z-10"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between relative z-20">
                    <h3 className="text-xl font-semibold text-white">Generated Hooks</h3>
                    <div className="flex gap-2 relative z-30">
                      <button
                        onClick={() => {
                          console.log('🖱️ Copy button element clicked!');
                          handleCopy();
                        }}
                        disabled={isCopying}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 relative z-40 cursor-pointer"
                      >
                        {isCopying ? <LoadingSpinner /> : <HiOutlineClipboard className="w-4 h-4" />}
                        <span className="text-sm font-medium">Copy</span>
                      </button>
                      <button
                        onClick={() => {
                          console.log('🖱️ Download button element clicked!');
                          handleDownload();
                        }}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 relative z-40 cursor-pointer"
                      >
                        {isDownloading ? <LoadingSpinner /> : <HiOutlineDownload className="w-4 h-4" />}
                        <span className="text-sm font-medium">Download PDF</span>
                      </button>
                    </div>
                  </div>
                  
                  {/* Content Box */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 via-blue-500/15 to-blue-500/15 rounded-2xl blur-sm pointer-events-none"></div>
                    <div className="relative bg-gray-900/90 border-2 border-gray-700/50 rounded-2xl p-6 text-white shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-blue-500/10">
                      <div className="text-xl font-sans leading-relaxed whitespace-pre-wrap break-words">
                        {generatedHook}
                      </div>
                    </div>
                  </div>
                  
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
