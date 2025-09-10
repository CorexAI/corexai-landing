"use client";
import { motion } from "framer-motion";
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineEye, HiOutlineEyeOff, HiOutlineUser } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { useToast } from "@/contexts/ToastContext";
import { trackEvent } from "@/lib/gtag";
import Link from "next/link";
import { useState } from "react";
import Footer from "../components/Footer";
import { useUser } from "@/contexts/UserContext";
import { validatePassword } from "@/utils/passwordValidation";
import { useRouter } from "next/navigation";
import { getErrorMessage } from "@/utils/errorMessages";
import ErrorHelper from "@/components/ErrorHelper";

export default function SignUpPage() {
  const { signUp, signInWithGoogle } = useUser();
  const router = useRouter();
  const { showError, showInfo, showSuccess } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    
    if (newPassword) {
      const validation = validatePassword(newPassword);
      setPasswordErrors(validation.errors);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      trackEvent('email_signup_attempt');
      // Validate password
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.isValid) {
        setError("Please fix password requirements");
        setLoading(false);
        return;
      }

      // Check terms agreement
      if (!agreeToTerms) {
        setError("Please agree to the Terms of Service and Privacy Policy");
        setLoading(false);
        return;
      }

      // Sign up user
      await signUp(email, password, name);
      trackEvent('email_signup_success');
      showSuccess('Account created', 'Welcome to Corex AI!');
      
      // Redirect to payment
      router.push('/payment');
    } catch (error: any) {
      setError(getErrorMessage(error));
      trackEvent('email_signup_error', { code: error?.code });
      showError('Sign up failed', getErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    if (loading) return;
    setError("");
    setLoading(true);
    try {
      showInfo('Opening Google', 'Please select your Google account');
      trackEvent('google_signup_click');
      const { isNewUser } = await signInWithGoogle();
      trackEvent('google_signup_success', { isNewUser });
      showSuccess('Signed in with Google', isNewUser ? 'Welcome to Corex AI!' : 'Welcome back!');
      // New users go to payment; returning users also see payment once after signup page intent
      router.push('/payment');
    } catch (error: any) {
      setError(getErrorMessage(error));
      trackEvent('google_signup_error', { code: error?.code });
      // Special friendly messages
      const code = error?.code || '';
      if (code.includes('popup-blocked')) {
        showError('Popup blocked', 'Your browser blocked the popup. We will try redirect next time.');
      } else if (code.includes('popup-closed-by-user')) {
        showError('Popup closed', 'The Google popup was closed before completing sign in.');
      } else {
        showError('Google sign in failed', getErrorMessage(error));
      }
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative z-10">
        <div className="max-w-md mx-auto px-4 pt-32 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                className="mb-6"
              >
                <span className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 backdrop-blur-md border border-blue-400/30 rounded-full px-6 py-3 shadow-xl inline-block">
                  <span className="text-blue-300 font-semibold text-sm tracking-wider uppercase">Join Corex AI</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Create Your Account
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                className="text-gray-400 text-lg"
              >
                Start generating viral scripts and hooks instantly
              </motion.p>
            </div>

            {/* Social Auth */}
            <div className="mb-6">
              <button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 hover:bg-gray-100 active:bg-gray-200 px-4 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <FcGoogle className="w-5 h-5" />
                Continue with Google
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px bg-white/10 w-full" />
              <span className="text-gray-400 text-sm">or</span>
              <div className="h-px bg-white/10 w-full" />
            </div>

            {/* Sign Up Form */}
            <motion.form
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
              onSubmit={handleSignUp}
              className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
            >
              {/* Name Field */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <HiOutlineUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-black/60 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <HiOutlineLockClosed className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    className={`w-full pl-10 pr-12 py-3 bg-black/60 border rounded-lg text-white placeholder-gray-400 focus:outline-none transition-colors duration-300 ${
                      passwordErrors.length > 0 ? 'border-red-400' : 'border-white/20 focus:border-blue-400'
                    }`}
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    {showPassword ? <HiOutlineEyeOff className="w-5 h-5" /> : <HiOutlineEye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password Requirements */}
                <div className="mt-2 text-xs text-gray-400">
                  <p className="mb-1">Password requirements:</p>
                  <ul className="space-y-1">
                    <li className={`flex items-center ${password.length >= 6 ? 'text-green-400' : 'text-gray-500'}`}>
                      <span className="mr-2">•</span>
                      At least 6 characters
                    </li>
                    <li className={`flex items-center ${(password.match(/\d/g) || []).length >= 2 ? 'text-green-400' : 'text-gray-500'}`}>
                      <span className="mr-2">•</span>
                      At least 2 numbers
                    </li>
                  </ul>
                </div>
                
                {/* Password Errors */}
                {passwordErrors.length > 0 && (
                  <div className="mt-2 text-xs text-red-400">
                    {passwordErrors.map((error, index) => (
                      <p key={index} className="flex items-center">
                        <span className="mr-2">⚠</span>
                        {error}
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="mb-6">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-black/60 border-white/20 rounded focus:ring-blue-500 focus:ring-2 mt-1"
                  />
                  <span className="ml-2 text-sm text-gray-300">
                    I agree to the{" "}
                    <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                      Privacy Policy
                    </Link>
                  </span>
                </label>
              </div>

              {/* Error Display */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-red-400 text-sm font-medium leading-relaxed">{error}</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {/* Error Helper */}
              {error && <ErrorHelper error={error} />}

              {/* Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform shadow-lg mb-6 ${
                  loading 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Sign In Link */}
              <div className="text-center">
                <span className="text-gray-400 text-sm">Already have an account? </span>
                <Link href="/signin" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 font-medium">
                  Sign in
                </Link>
              </div>
            </motion.form>

            {/* Back to Home */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="text-center mt-8"
            >
              <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300">
                <span>← Back to Home</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
