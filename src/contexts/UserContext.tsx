'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as signOutAuth, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { detectAndStoreTimezone } from '@/utils/api-helpers';
import { fixOldAccountReset } from '@/lib/usageTracking';

interface UserData {
  uid: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'creator';
  hooksGenerated: number;
  scriptsGenerated: number;
  lastReset: Date;
  verified: boolean;
  onboardingCompleted: boolean;
  // New fields for enhanced usage tracking
  timezone?: string;
  subscriptionStartDate?: Date;
  nextRenewalDate?: Date;
  onboardingData?: {
    platform: string;
    following: string;
    source: string;
  };
  // Tip tracking fields
  currentTipSet?: number;
  tipsLastShown?: Date;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  refreshUserData: () => Promise<void>;
  exportUserData: () => Promise<any>;
  deleteAccount: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only run on client side and if auth is available
    if (typeof window === 'undefined' || !auth) {
      console.log('⚠️ UserContext - Not on client side or auth not available');
      setLoading(false);
      return;
    }

    console.log('🔄 UserContext - Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log('🔐 UserContext - Auth state changed:', user ? { uid: user.uid, email: user.email, emailVerified: user.emailVerified } : 'null');
      setUser(user);
      
      if (user) {
        try {
          console.log('📥 UserContext - Fetching user data from Firestore...');
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            const data = userDoc.data() as UserData;
            console.log('✅ UserContext - User data loaded:', data);
            
            // Update verified status based on Firebase email verification
            if (data.verified !== user.emailVerified) {
              await updateDoc(doc(db, 'users', user.uid), {
                verified: user.emailVerified
              });
              data.verified = user.emailVerified;
            }
            
            setUserData(data);
          } else {
            console.log('❌ UserContext - No user document found in Firestore');
            setUserData(null);
          }
        } catch (error) {
          console.error('❌ UserContext - Error fetching user data:', error);
          setUserData(null);
        }
      } else {
        console.log('🚫 UserContext - No authenticated user');
        setUserData(null);
      }
      
      console.log('✅ UserContext - Setting loading to false');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Listen for immediate usage reset triggers
  useEffect(() => {
    if (!user) return;

    const handleUsageReset = async (event: CustomEvent) => {
      const { uid } = event.detail;
      if (uid === user.uid) {
        console.log('🔄 UserContext - Received immediate usage reset trigger');
        try {
          // Perform immediate reset
          const now = new Date();
          await updateDoc(doc(db, 'users', user.uid), {
            hooksGenerated: 0,
            scriptsGenerated: 0,
            lastReset: now,
            lastResetTimestamp: now.getTime(),
            resetReason: 'immediate_reset_trigger'
          });
          
          // Update local state
          setUserData(prev => prev ? {
            ...prev,
            hooksGenerated: 0,
            scriptsGenerated: 0,
            lastReset: now
          } : null);
          
          console.log('✅ UserContext - Immediate usage reset completed');
        } catch (error) {
          console.error('❌ UserContext - Error during immediate reset:', error);
        }
      }
    };

    window.addEventListener('triggerUsageReset', handleUsageReset as unknown as EventListener);
    
    return () => {
      window.removeEventListener('triggerUsageReset', handleUsageReset as unknown as EventListener);
    };
  }, [user]);

  const signUp = async (email: string, password: string, name: string) => {
    if (!auth || !db) throw new Error('Firebase not initialized');
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Detect user timezone
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

      // Create user document in Firestore
      const userData: UserData = {
        uid: user.uid,
        name,
        email,
        plan: 'free',
        hooksGenerated: 0,
        scriptsGenerated: 0,
        lastReset: new Date(),
        verified: false,
        onboardingCompleted: false,
        timezone: timezone
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      setUserData(userData);
    } catch (error: any) {
      // Pass the original error object to preserve error codes
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    if (!auth) throw new Error('Firebase not initialized');
    
    console.log('🔐 UserContext - signIn called with email:', email);
    console.log('🔐 UserContext - auth object available:', !!auth);
    
    try {
      console.log('🔐 UserContext - Calling signInWithEmailAndPassword...');
      await signInWithEmailAndPassword(auth, email, password);
      console.log('🔐 UserContext - signInWithEmailAndPassword successful');
    } catch (error: any) {
      console.error('🔐 UserContext - signInWithEmailAndPassword failed:', error);
      // Pass the original error object to preserve error codes
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOutAuth(auth);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      // Pass the original error object to preserve error codes
      throw error;
    }
  };

  const sendVerificationEmail = async () => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await sendEmailVerification(user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const updateUserData = async (data: Partial<UserData>) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      await updateDoc(doc(db, 'users', user.uid), data);
      setUserData(prev => prev ? { ...prev, ...data } : null);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const refreshUserData = async () => {
    if (!user) throw new Error('No user logged in');

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        let data = userDoc.data() as UserData;
        
        // Fix old accounts that don't have lastReset field
        if (data.plan === 'free' && !data.lastReset) {
          console.log('🔧 Fixing old account reset field...');
          await fixOldAccountReset(user.uid);
          // Refresh the data after fixing
          const updatedDoc = await getDoc(doc(db, user.uid));
          if (updatedDoc.exists()) {
            data = updatedDoc.data() as UserData;
          }
        }
        
        // Check if weekly reset is needed for free users (backup to cron job)
        if (data.plan === 'free' && data.lastReset) {
          const lastReset = new Date(data.lastReset);
          const now = new Date();
          const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
          
          if (daysSinceReset >= 7) {
            console.log(`🔄 Weekly usage reset needed for free user (${daysSinceReset} days since last reset)`);
            // Reset weekly usage
            await updateDoc(doc(db, 'users', user.uid), {
              hooksGenerated: 0,
              scriptsGenerated: 0,
              lastReset: now
            });
            data.hooksGenerated = 0;
            data.scriptsGenerated = 0;
            data.lastReset = now;
            console.log('✅ Weekly usage reset completed for free user');
          }
        }
        
        // For Pro/Creator users, check subscription renewal (30 days)
        if ((data.plan === 'pro' || data.plan === 'creator') && data.nextRenewalDate) {
          const nextRenewal = new Date(data.nextRenewalDate);
          const now = new Date();
          
          // If subscription has expired, reset usage and set new renewal date
          if (nextRenewal <= now) {
            console.log(`🔄 Subscription expired for ${data.plan} user, resetting usage and setting new renewal date`);
            
            const newRenewalDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
            
            await updateDoc(doc(db, 'users', user.uid), {
              hooksGenerated: 0,
              scriptsGenerated: 0,
              nextRenewalDate: newRenewalDate,
              lastReset: now
            });
            
            data.hooksGenerated = 0;
            data.scriptsGenerated = 0;
            data.nextRenewalDate = newRenewalDate;
            data.lastReset = now;
            console.log(`✅ Usage reset and renewal date updated for ${data.plan} user`);
          }
        }
        
        setUserData(data);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
      setUserData(null);
    }
  };

  // Export user data before account deletion
  const exportUserData = async () => {
    if (!user) throw new Error('No user logged in');
    
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('/api/export-user-data', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to export user data');
      }

      const result = await response.json();
      return result.data;
    } catch (error: any) {
      console.error('Error exporting user data:', error);
      throw new Error(error.message || 'Failed to export user data');
    }
  };

  // Delete user account completely
  const deleteAccount = async (password: string) => {
    if (!user) throw new Error('No user logged in');
    
    try {
      // Reauthenticate user with password
      const credential = EmailAuthProvider.credential(user.email!, password);
      await reauthenticateWithCredential(user, credential);
      
      // Get fresh ID token after reauthentication
      const idToken = await user.getIdToken(true);
      
      // Call delete account API
      const response = await fetch('/api/delete-account', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete account');
      }

      // Clear local state
      setUser(null);
      setUserData(null);
      
      console.log('✅ Account deleted successfully');
    } catch (error: any) {
      console.error('Error deleting account:', error);
      throw new Error(error.message || 'Failed to delete account');
    }
  };

  const value = {
    user,
    userData,
    loading,
    signUp,
    signIn,
    signOutUser,
    resetPassword,
    sendVerificationEmail,
    updateUserData,
    refreshUserData,
    exportUserData,
    deleteAccount
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
