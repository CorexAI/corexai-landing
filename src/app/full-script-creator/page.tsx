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
import { trackEvent } from '@/lib/gtag';

export default function FullScriptCreatorPage() {
  const { user, userData, loading: userLoading, refreshUserData } = useUser();
  const router = useRouter();
  const { showSuccess, showError, showWarning } = useToast();
  
  // Remove the old authentication checks since ProtectedRoute handles this
  const [topic, setTopic] = useState('');
  const [scriptLength, setScriptLength] = useState('30 seconds');
  const [tone, setTone] = useState('Casual');
  const [audience, setAudience] = useState('General');
  const [platform, setPlatform] = useState('TikTok');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState('');
  const [isCopying, setIsCopying] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [showLengthDropdown, setShowLengthDropdown] = useState(false);
  const [showToneDropdown, setShowToneDropdown] = useState(false);
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showPlatformDropdown, setShowPlatformDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.dropdown-container')) {
        setShowLengthDropdown(false);
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
    setGeneratedScript('');
    
    try {
      console.log('Sending script generation request with UID:', user?.uid);
      
      // Check usage limit before generating
      if (user?.uid) {
        const usageCheck = await checkUsageLimit(user.uid, 'script');
        if (!usageCheck.allowed) {
          showError('Usage Limit Reached', usageCheck.message || 'You have reached your script generation limit.');
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

      const response = await fetch('/api/generate-script-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          topic: topic.trim(),
          scriptLength,
          tone,
          audience,
          platform,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Script generation failed:', errorData);
        
        if (response.status === 429) {
          setGeneratedScript(`❌ Usage Limit Exceeded: ${errorData.error || 'You have reached your script generation limit. Please upgrade your plan or wait for reset.'}`);
        } else {
          setGeneratedScript(`❌ Error: ${errorData.error || 'Failed to generate script. Please try again.'}`);
        }
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        setGeneratedScript('❌ Error: No response stream available');
        return;
      }

      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
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
              
              return;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setGeneratedScript(prev => prev + parsed.content);
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      console.error('Error generating script:', error);
      let errorMessage = 'Failed to generate script. Please try again.';
      
      if (error instanceof Error) {
        if (error.message.includes('429')) {
          errorMessage = 'Too many requests. Please wait a moment and try again.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else if (error.message.includes('limit')) {
          errorMessage = 'Usage limit reached. Please upgrade your plan or wait for reset.';
        }
      }
      
      setGeneratedScript(`❌ ${errorMessage}`);
      showError('Generation Failed', errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (!generatedScript.trim()) {
      showWarning('No Content', 'No script generated to copy.');
      return;
    }

    setIsCopying(true);
    try {
      await navigator.clipboard.writeText(generatedScript);
      showSuccess('Copied!', 'Script copied to clipboard successfully.');
      trackEvent('copy_clicked', { location: 'full-script-creator', type: 'script' });
    } catch (error) {
      console.error('❌ Failed to copy:', error);
      
      // Fallback: create textarea and copy
      const textArea = document.createElement('textarea');
      textArea.value = generatedScript;
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        showSuccess('Copied!', 'Script copied to clipboard successfully.');
        trackEvent('copy_clicked', { location: 'full-script-creator', type: 'script' });
      } catch (fallbackError) {
        console.error('❌ Fallback copy failed:', fallbackError);
        showError('Copy Failed', 'Failed to copy text. Please select and copy manually.');
      }
      document.body.removeChild(textArea);
    } finally {
      setIsCopying(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!generatedScript.trim()) {
      console.log('❌ No content to download');
      showWarning('No Content', 'No script generated to download.');
      return;
    }
    
    setIsDownloading(true);
    try {
      generatePDF(generatedScript, {
        type: 'script',
        topic: topic,
        scriptLength: scriptLength,
        tone: tone,
        audience: audience,
        platform: platform
      });
      showSuccess('PDF Generated!', 'Your script has been downloaded as a PDF.');
      trackEvent('download_pdf_clicked', { location: 'full-script-creator', type: 'script' });
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
          currentPage="script-creator"
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
            <h2 className="ml-4 text-xl font-bold text-white">Full Script Generator</h2>
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
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md border border-purple-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-purple-300 font-semibold text-sm tracking-wider uppercase">
                    Full Script Generator • {userData?.plan?.toUpperCase() || 'FREE'} Plan
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
                  AI Viral Script{" "}
                </span>
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Generator.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-base md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
                style={{ fontFamily: 'var(--font-sen)' }}
              >
                Create scroll-stopping scripts that make your content impossible to ignore. 
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold"> Ready in seconds.</span>
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
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-2xl blur-sm"></div>
                  <textarea
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Describe your content idea in detail... What story, tutorial, or insight do you want to share? Include key points, emotions, and the message you want to convey."
                    className="relative w-full h-39 md:h-48 px-6 py-5 bg-gray-900/90 border-2 border-gray-700/50 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 resize-none text-base md:text-xl leading-relaxed font-medium shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/10"
                  />
                </div>

                {/* Parameter Dropdowns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {/* Script Length */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">
                      Length
                    </label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowLengthDropdown(!showLengthDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/10 pr-8 md:pr-10 text-left"
                      >
                        {scriptLength}
                        <HiOutlineChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-transform duration-200 ${showLengthDropdown ? 'rotate-180' : ''}`} />
                      </button>
                      
                      {showLengthDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                          <button
                            onClick={() => {
                              setScriptLength('30s');
                              setShowLengthDropdown(false);
                              trackEvent('length_selected', { location: 'full-script-creator', value: '30s' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                          >
                            30s
                          </button>
                          <button
                            onClick={() => {
                              setScriptLength('60s');
                              setShowLengthDropdown(false);
                              trackEvent('length_selected', { location: 'full-script-creator', value: '60s' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            60s
                          </button>
                          <button
                            onClick={() => {
                              if (userData?.plan === 'creator') {
                                setScriptLength('90s');
                                setShowLengthDropdown(false);
                                trackEvent('length_selected', { location: 'full-script-creator', value: '90s' });
                              }
                            }}
                            onMouseEnter={() => {}}
                            onMouseLeave={() => {}}
                            disabled={userData?.plan !== 'creator'}
                            className={`w-full px-4 py-3 text-left transition-colors rounded-b-lg ${
                              userData?.plan === 'creator' 
                                ? 'text-white hover:bg-gray-700' 
                                : 'text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            90s {userData?.plan !== 'creator' && '🔒'}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tone */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">Tone</label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowToneDropdown(!showToneDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/10 pr-8 md:pr-10 text-left"
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
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Casual' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                          >
                            😊 Casual
                          </button>
                          <button
                            onClick={() => {
                              setTone('Professional');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Professional' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            💼 Professional
                          </button>
                          <button
                            onClick={() => {
                              setTone('Energetic');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Energetic' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            ⚡ Energetic
                          </button>
                          <button
                            onClick={() => {
                              setTone('Humorous');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Humorous' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            😂 Humorous
                          </button>
                          <button
                            onClick={() => {
                              setTone('Inspirational');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Inspirational' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            ✨ Inspirational
                          </button>
                          <button
                            onClick={() => {
                              setTone('Storytelling');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Storytelling' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            📖 Storytelling
                          </button>
                          <button
                            onClick={() => {
                              setTone('Direct');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Direct' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            🎯 Direct
                          </button>
                          <button
                            onClick={() => {
                              setTone('Diplomatic');
                              setShowToneDropdown(false);
                              trackEvent('tone_selected', { location: 'full-script-creator', value: 'Diplomatic' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-b-lg"
                          >
                            🤝 Diplomatic
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Audience */}
                  <div>
                    <label className="block text-sm md:text-base font-medium text-gray-300 mb-2 md:mb-3">Audience</label>
                    <div className="relative dropdown-container">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/10 pr-8 md:pr-10 text-left"
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'General' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Young Adults' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Professionals' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Students' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Entrepreneurs' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Tech Savvy' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Fitness' });
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
                              trackEvent('audience_selected', { location: 'full-script-creator', value: 'Marketing' });
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
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-purple-500/5 rounded-xl blur-sm"></div>
                      <button
                        onClick={() => setShowPlatformDropdown(!showPlatformDropdown)}
                        className="relative w-full px-3 md:px-4 py-2 md:py-3 bg-gray-900/90 border-2 border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500/60 focus:ring-4 focus:ring-purple-500/10 transition-all duration-300 text-sm md:text-base font-medium shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-purple-500/10 pr-8 md:pr-10 text-left"
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
                              trackEvent('platform_selected', { location: 'full-script-creator', value: 'TikTok' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors rounded-t-lg"
                          >
                            TikTok
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('Instagram');
                              setShowPlatformDropdown(false);
                              trackEvent('platform_selected', { location: 'full-script-creator', value: 'Instagram' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            Instagram
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('YouTube');
                              setShowPlatformDropdown(false);
                              trackEvent('platform_selected', { location: 'full-script-creator', value: 'YouTube' });
                            }}
                            className="w-full px-4 py-3 text-left text-white hover:bg-gray-700 transition-colors"
                          >
                            YouTube
                          </button>
                          <button
                            onClick={() => {
                              setPlatform('LinkedIn');
                              setShowPlatformDropdown(false);
                              trackEvent('platform_selected', { location: 'full-script-creator', value: 'LinkedIn' });
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
                <div className="flex justify-center pt-4">
                  <button
                    onClick={handleGenerate}
                    disabled={!topic.trim() || isGenerating}
                    className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-12 py-4 rounded-xl text-lg font-semibold transition-transform duration-300 ease-out disabled:cursor-not-allowed hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {isGenerating ? (
                        <>
                          <LoadingSpinner />
                          Generating Script...
                        </>
                      ) : (
                        <>
                          <HiOutlineLightningBolt className="w-5 h-5" />
                          Generate Script
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </motion.div>

              {/* Generated Script Output */}
              {generatedScript && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="space-y-6 relative z-10"
                >
                  <div className="flex items-center justify-between relative z-20">
                    <h3 className="text-xl font-semibold text-white">Generated Script</h3>
                    <div className="flex gap-2 relative z-30">
                      <button
                        onClick={handleCopy}
                        disabled={isCopying}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 relative z-40 cursor-pointer"
                      >
                        {isCopying ? <LoadingSpinner /> : <HiOutlineClipboard className="w-4 h-4" />}
                        <span className="text-sm font-medium">Copy</span>
                      </button>
                      <button
                        onClick={handleDownloadPDF}
                        disabled={isDownloading}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 relative z-40 cursor-pointer"
                      >
                        {isDownloading ? <LoadingSpinner /> : <HiOutlineDownload className="w-4 h-4" />}
                        <span className="text-sm font-medium">PDF</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 via-purple-500/15 to-purple-500/15 rounded-2xl blur-sm pointer-events-none"></div>
                    <div className="relative bg-gray-900/90 border-2 border-gray-700/50 rounded-2xl p-6 text-white shadow-2xl shadow-black/20 hover:shadow-2xl hover:shadow-purple-500/10">
                      <div className="text-base md:text-xl font-sans leading-relaxed whitespace-pre-wrap break-words">
                        {generatedScript}
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
