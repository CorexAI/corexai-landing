'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import LoadingSpinner from './LoadingSpinner';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function ProtectedRoute({ 
  children, 
  redirectTo = '/signin' 
}: ProtectedRouteProps) {
  const { user, loading } = useUser();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Double-check Firebase auth state directly
  useEffect(() => {
    if (typeof window !== 'undefined' && auth) {
      console.log('🔥 ProtectedRoute - Setting up direct Firebase auth listener...');
      
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        console.log('🔥 ProtectedRoute - Direct Firebase auth state:', firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : 'null');
        
        // If we have a firebase user but no UserContext user, wait a bit for sync
        if (firebaseUser && !user && !loading) {
          console.log('⏳ ProtectedRoute - Waiting for UserContext to sync...');
          return;
        }
        
        // If no firebase user, redirect immediately
        if (!firebaseUser && !loading) {
          console.log('🚫 ProtectedRoute - No Firebase user, redirecting...');
          setIsRedirecting(true);
          const currentPath = window.location.pathname;
          const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
          router.replace(redirectUrl);
        }
      });
      
      return unsubscribe;
    }
  }, [user, loading, router, redirectTo]);

  useEffect(() => {
    // Add debugging
    console.log('🔒 ProtectedRoute - Auth state:', { 
      user: !!user, 
      loading, 
      isRedirecting
    });
    
    // If loading, wait
    if (loading) {
      return;
    }
    
    // If no user and not redirecting, redirect
    if (!user && !isRedirecting) {
      console.log('🚫 ProtectedRoute - User not authenticated, redirecting to:', redirectTo);
      setIsRedirecting(true);
      
      // Store the current path for redirect after login
      const currentPath = window.location.pathname;
      const redirectUrl = `${redirectTo}?redirect=${encodeURIComponent(currentPath)}`;
      
      // Use replace instead of push to prevent back button issues
      router.replace(redirectUrl);
    }
  }, [user, loading, router, redirectTo, isRedirecting]);

  // Show loading spinner while checking authentication
  if (loading) {
    console.log('⏳ ProtectedRoute - Loading authentication state...');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  // If not authenticated, show loading while redirecting
  if (!user) {
    console.log('🚫 ProtectedRoute - User not authenticated, showing redirect state');
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <LoadingSpinner />
          <p className="mt-4">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  // If authenticated, render the protected content
  console.log('✅ ProtectedRoute - User authenticated, rendering content');
  return <>{children}</>;
}
