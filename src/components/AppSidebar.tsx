"use client";
import { useState } from 'react';
import { HiOutlineUser, HiOutlineLogout, HiOutlineHome, HiOutlineStar, HiOutlineSparkles, HiOutlineLightningBolt, HiOutlineCog, HiOutlineChevronDown, HiOutlineMail } from 'react-icons/hi';
import { useUser } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/contexts/ToastContext';

interface AppSidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  currentPage: 'dashboard' | 'hook-generator' | 'script-creator';
}

export default function AppSidebar({ isMobileMenuOpen, setIsMobileMenuOpen, currentPage }: AppSidebarProps) {
  const { user, userData, signOutUser } = useUser();
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [showSupportDropdown, setShowSupportDropdown] = useState(false);
  const [showSignOutConfirm, setShowSignOutConfirm] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOutUser();
      showSuccess('Signed Out', 'You have been successfully signed out.');
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      showError('Sign Out Failed', 'There was an error signing you out. Please try again.');
    }
  };

  const handleSignOutClick = () => {
    setShowSignOutConfirm(true);
  };

  const confirmSignOut = () => {
    setShowSignOutConfirm(false);
    handleSignOut();
  };

  const cancelSignOut = () => {
    setShowSignOutConfirm(false);
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-gray-900 border-r border-gray-800 transform transition-transform duration-300 ease-in-out sm:translate-x-0 z-60 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center h-20 px-6 border-b border-gray-800 min-w-0">
            <h1 className="text-2xl font-bold text-white truncate">Corex AI</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6">
            <div className="space-y-1">
              <a 
                href="/dashboard" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'dashboard' 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HiOutlineHome className="w-5 h-5 mr-3" />
                Dashboard
              </a>
              <a 
                href="/hook-generator" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'hook-generator' 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HiOutlineSparkles className="w-5 h-5 mr-3" />
                Hook Generator
              </a>
              <a 
                href="/full-script-creator" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  currentPage === 'script-creator' 
                    ? 'text-white bg-gray-800' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <HiOutlineLightningBolt className="w-5 h-5 mr-3" />
                Full Script Generator
              </a>
              <a 
                href="/payment" 
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <HiOutlineStar className="w-5 h-5 mr-3" />
                Pricing
              </a>
              
              {/* Support Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSupportDropdown(!showSupportDropdown)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <div className="flex items-center">
                    <HiOutlineCog className="w-5 h-5 mr-3" />
                    Account Management
                  </div>
                  <HiOutlineChevronDown className={`w-4 h-4 transition-transform ${showSupportDropdown ? 'rotate-180' : ''}`} />
                </button>
                
                {showSupportDropdown && (
                  <div className="mt-1 ml-4 space-y-1">
                    <a 
                      href="/billing" 
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    >
                      <HiOutlineMail className="w-4 h-4 mr-3" />
                      Billing & Usage
                    </a>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-800">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <HiOutlineUser className="w-4 h-4 text-white" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">{userData?.name || 'User'}</p>
              </div>
            </div>
            <button 
              onClick={handleSignOutClick}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <HiOutlineLogout className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="sm:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sign Out Confirmation Modal */}
      {showSignOutConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-white mb-4">Confirm Sign Out</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to sign out? You'll need to sign in again to access your account.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={cancelSignOut}
                className="flex-1 px-4 py-2 text-gray-300 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSignOut}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
