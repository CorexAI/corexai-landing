import { db } from './firebase';
import { doc, getDoc, updateDoc, setDoc, runTransaction } from 'firebase/firestore';
import { isSubscriptionActive } from './subscriptionUtils';

export interface UsageLimits {
  hooks: number | 'Unlimited';
  scripts: number | 'Unlimited';
}

export const getUsageLimits = (plan: string): UsageLimits => {
  switch (plan) {
    case 'pro':
      return { hooks: 'Unlimited', scripts: 50 };
    case 'creator':
      return { hooks: 'Unlimited', scripts: 'Unlimited' }; // Display as unlimited, backend enforces 150 limit
    default: // free
      return { hooks: 3, scripts: 3 }; // 3 generations × 3 hooks = 9 hooks total, 3 scripts
  };
};

// Helper to safely parse dates from Firebase
const parseFirebaseDate = (dateValue: any): Date | null => {
  if (!dateValue) return null;
  
  try {
    // Handle Firestore Timestamp objects
    if (dateValue && typeof dateValue.toDate === 'function') {
      return dateValue.toDate();
    }
    
    // Handle string dates
    if (typeof dateValue === 'string') {
      return new Date(dateValue);
    }
    
    // Handle Date objects
    if (dateValue instanceof Date) {
      return dateValue;
    }
    
    // Handle timestamp numbers
    if (typeof dateValue === 'number') {
      return new Date(dateValue);
    }
    
    console.warn('Unknown date format:', dateValue);
    return null;
  } catch (error) {
    console.error('Error parsing date:', error, 'Value:', dateValue);
    return null;
  }
};

// Get user's timezone-adjusted date
const getUserLocalDate = (userData: any): Date => {
  const userTimezone = userData.timezone || 'UTC';
  const now = new Date();
  
  try {
    // Convert server time to user's timezone
    const userDate = new Date(now.toLocaleString('en-US', { timeZone: userTimezone }));
    return userDate;
  } catch (error) {
    console.warn('Invalid timezone, using UTC:', userTimezone);
    return now;
  }
};

// Helper to convert a UTC date to a date in the user's timezone
const convertToUserTimezone = (utcDate: Date, userData: any): Date => {
  const userTimezone = userData.timezone || 'UTC';
  return new Date(utcDate.toLocaleString('en-US', { timeZone: userTimezone }));
};

// Calculate days until next reset/renewal
export const getDaysUntilReset = (userData: any): number => {
  if (!userData) return 0;
  
  const plan = userData.plan || 'free';
  
  if (plan === 'free') {
    // Free plan: 7-day rolling reset
    if (!userData.lastReset) {
      // For old accounts without lastReset, set it to now and return 7 days
      return 7;
    }
    
    try {
      const now = getUserLocalDate(userData);
      const lastReset = parseFirebaseDate(userData.lastReset);
      
      // Validate the date
      if (!lastReset || isNaN(lastReset.getTime())) {
        console.warn('Invalid lastReset date, resetting to now');
        return 7;
      }
      
      // Convert lastReset to user's timezone for accurate calculation
      const lastResetInUserTz = convertToUserTimezone(lastReset, userData);
      
      const resetPeriodMs = 7 * 24 * 60 * 60 * 1000;
      const nextReset = new Date(lastResetInUserTz.getTime() + resetPeriodMs);
      
      const diffTime = nextReset.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      // Debug logging
      console.log('🔍 RESET CALCULATION DEBUG:');
      console.log('🔍 User timezone:', userData.timezone);
      console.log('🔍 Original lastReset:', userData.lastReset);
      console.log('🔍 lastReset (parsed):', lastReset.toISOString());
      console.log('🔍 lastReset (User TZ):', lastResetInUserTz.toISOString());
      console.log('🔍 Now (User TZ):', now.toISOString());
      console.log('🔍 Next reset (User TZ):', nextReset.toISOString());
      console.log('🔍 Days until reset:', diffDays);
      
      return Math.max(0, diffDays);
    } catch (error) {
      console.error('Error calculating reset days:', error);
      return 7; // Fallback to 7 days
    }
  } else {
    // Paid plans: subscription-based reset
    if (!userData.nextRenewalDate) return 0; // Subscription expired
    
    try {
      const now = getUserLocalDate(userData);
      const nextRenewal = parseFirebaseDate(userData.nextRenewalDate);
      
      // Validate the date
      if (!nextRenewal || isNaN(nextRenewal.getTime())) {
        console.warn('Invalid nextRenewalDate, using default 0 days');
        return 0;
      }
      
      // Convert nextRenewal to user's timezone for accurate calculation
      const nextRenewalInUserTz = convertToUserTimezone(nextRenewal, userData);
      
      const diffTime = nextRenewalInUserTz.getTime() - now.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      console.error('Error calculating renewal days:', error);
      return 0; // Fallback to 0 days (expired)
    }
  }
};

// **CLIENT-SIDE USAGE TRACKING SYSTEM**

// Check if user can generate content based on their plan and current usage
export const checkUsageLimit = async (uid: string, type: 'hook' | 'script'): Promise<{ allowed: boolean; message?: string; currentUsage?: any }> => {
  try {
    if (!uid) {
      return { allowed: false, message: 'User ID is missing. Please sign in again.' };
    }

    // Get current user data from Firebase using client SDK
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      return { allowed: false, message: 'User account not found. Please sign in again.' };
    }

    const userData = userDoc.data();
    const plan = userData.plan || 'free';
    
    // Check if Pro/Creator users have active subscription
    if (plan !== 'free' && !isSubscriptionActive(userData)) {
      return { 
        allowed: false, 
        message: `Your ${plan} subscription has expired. Please renew your subscription to continue generating content.`,
        currentUsage: { hooksGenerated: userData.hooksGenerated || 0, scriptsGenerated: userData.scriptsGenerated || 0 }
      };
    }
    
    const limits = getUsageLimits(plan);
    
    // Check if user has reached their limits
    if (type === 'hook') {
      // For hooks, we track generations (each generation creates 3 hooks)
      // So if user has 3 generations, they've hit the limit
      if (limits.hooks !== 'Unlimited' && (userData.hooksGenerated || 0) >= limits.hooks) {
        return { 
          allowed: false, 
          message: `You've reached your hook generation limit (${limits.hooks} generations). Each generation creates 3 hooks. Upgrade your plan for unlimited hooks.`,
          currentUsage: { hooksGenerated: userData.hooksGenerated || 0, scriptsGenerated: userData.scriptsGenerated || 0 }
        };
      }
    } else if (type === 'script') {
      if (limits.scripts !== 'Unlimited' && (userData.scriptsGenerated || 0) >= limits.scripts) {
        return { 
          allowed: false, 
          message: `You've reached your script limit (${limits.scripts}). Upgrade your plan for unlimited scripts.`,
          currentUsage: { hooksGenerated: userData.hooksGenerated || 0, scriptsGenerated: userData.scriptsGenerated || 0 }
        };
      }
    }

    return { 
      allowed: true, 
      currentUsage: { hooksGenerated: userData.hooksGenerated || 0, scriptsGenerated: userData.scriptsGenerated || 0 }
    };
  } catch (error) {
    console.error('Error checking usage limit:', error);
    return { allowed: false, message: 'Error checking usage limits. Please try again.' };
  }
};

// Increment usage in Firebase using transactions for consistency
export const incrementUsage = async (uid: string, type: 'hook' | 'script', amount: number = 1): Promise<{ success: boolean; newUsage?: any; error?: string }> => {
  try {
    if (!uid) {
      return { success: false, error: 'User ID is missing' };
    }

    // Use a transaction to ensure atomic updates
    const result = await runTransaction(db, async (transaction) => {
      const userRef = doc(db, 'users', uid);
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        const newUserData = {
          uid: uid,
          hooksGenerated: type === 'hook' ? amount : 0,
          scriptsGenerated: type === 'script' ? amount : 0,
          plan: 'free',
          lastReset: new Date(),
          verified: false,
          onboardingCompleted: false
        };
        
        transaction.set(userRef, newUserData);
        return { 
          success: true, 
          newUsage: { 
            hooksGenerated: newUserData.hooksGenerated, 
            scriptsGenerated: newUserData.scriptsGenerated 
          } 
        };
      }

      // Update existing user
      const currentData = userDoc.data();
      const currentHooks = currentData.hooksGenerated || 0;
      const currentScripts = currentData.scriptsGenerated || 0;
      
      let newHooks = currentHooks;
      let newScripts = currentScripts;
      
      if (type === 'hook') {
        newHooks = currentHooks + amount;
      } else if (type === 'script') {
        newScripts = currentScripts + amount;
      }
      
      transaction.update(userRef, {
        hooksGenerated: newHooks,
        scriptsGenerated: newScripts
      });
      
      return { 
        success: true, 
        newUsage: { hooksGenerated: newHooks, scriptsGenerated: newScripts } 
      };
    });

    if (result.success) {
      // Trigger dashboard update event
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('usageUpdated', { 
          detail: { uid, usage: result.newUsage } 
        }));
      }
      
      console.log(`✅ Usage incremented successfully: ${type} +${amount} for user ${uid}`);
      return { success: true, newUsage: result.newUsage };
    } else {
      return { success: false, error: 'Transaction failed' };
    }
  } catch (error: any) {
    console.error('Error incrementing usage:', error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};

// Fix old accounts that don't have lastReset field
export const fixOldAccountReset = async (uid: string): Promise<boolean> => {
  try {
    if (!uid) return false;
    
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return false;
    
    const userData = userDoc.data();
    
    // Check if this is an old account without lastReset
    if (userData.plan === 'free' && !userData.lastReset) {
      const now = new Date();
      await updateDoc(doc(db, 'users', uid), {
        lastReset: now.toISOString()
      });
      
      console.log(`✅ Fixed old account reset field for user ${uid}`);
      
      // Trigger dashboard update
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('usageUpdated', { 
          detail: { uid, usage: { hooksGenerated: userData.hooksGenerated || 0, scriptsGenerated: userData.scriptsGenerated || 0 } } 
        }));
      }
      
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error fixing old account reset:', error);
    return false;
  }
};

// Get current usage from Firebase
export const getCurrentUsage = async (uid: string): Promise<{ hooksGenerated: number; scriptsGenerated: number } | null> => {
  try {
    if (!uid) return null;
    
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) return null;
    
    const userData = userDoc.data();
    return {
      hooksGenerated: userData.hooksGenerated || 0,
      scriptsGenerated: userData.scriptsGenerated || 0
    };
  } catch (error) {
    console.error('Error getting current usage:', error);
    return null;
  }
};

// Reset usage for plan changes or renewals
export const resetUsage = async (uid: string, plan: string): Promise<boolean> => {
  try {
    if (!uid) return false;
    
    const now = new Date();
    const nextRenewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    
    await updateDoc(doc(db, 'users', uid), {
      plan,
      hooksGenerated: 0,
      scriptsGenerated: 0,
      subscriptionStartDate: now.toISOString(),
      nextRenewalDate: nextRenewalDate.toISOString(),
      lastReset: now.toISOString()
    });
    
    console.log(`✅ Usage reset for user ${uid} (${plan} plan)`);
    
    // Trigger dashboard update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('usageUpdated', { 
        detail: { uid, usage: { hooksGenerated: 0, scriptsGenerated: 0 } } 
      }));
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting usage:', error);
    return false;
  }
};

// Reset usage for testing purposes (resets to 0)
export const resetUsageForTesting = async (uid: string): Promise<boolean> => {
  try {
    if (!uid) return false;
    
    await updateDoc(doc(db, 'users', uid), {
      hooksGenerated: 0,
      scriptsGenerated: 0,
      lastReset: new Date()
    });
    
    console.log(`✅ Usage reset for testing for user ${uid}`);
    
    // Trigger dashboard update
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('usageUpdated', { 
        detail: { uid, usage: { hooksGenerated: 0, scriptsGenerated: 0 } } 
      }));
    }
    
    return true;
  } catch (error) {
    console.error('Error resetting usage for testing:', error);
    return false;
  }
};

// Initialize user data for new subscriptions
export const initializeSubscriptionData = async (uid: string, plan: string): Promise<void> => {
  try {
    const now = new Date();
    const nextRenewalDate = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days from now
    
    await updateDoc(doc(db, 'users', uid), {
      plan,
      hooksGenerated: 0,
      scriptsGenerated: 0,
      subscriptionStartDate: now.toISOString(),
      nextRenewalDate: nextRenewalDate.toISOString(),
      lastReset: now.toISOString()
    });
    
    console.log(`Subscription data initialized for user ${uid} (${plan} plan). Next renewal: ${nextRenewalDate.toISOString()}`);
  } catch (error) {
    console.error('Error initializing subscription data:', error);
  }
};

// Handle plan upgrades (reset counters)
export const handlePlanUpgrade = async (uid: string, newPlan: string): Promise<void> => {
  try {
    await resetUsage(uid, newPlan);
    console.log(`Plan upgrade processed for user ${uid} to ${newPlan}. Counters reset.`);
  } catch (error) {
    console.error('Error handling plan upgrade:', error);
  }
};

// Handle plan downgrades (keep current usage until renewal)
export const handlePlanDowngrade = async (uid: string, newPlan: string): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      plan: newPlan
      // Keep current usage counters - they'll reset on next renewal
    });
    
    console.log(`Plan downgrade processed for user ${uid} to ${newPlan}. Usage counters preserved.`);
  } catch (error) {
    console.error('Error handling plan downgrade:', error);
  }
};

// Handle plan changes (upgrade or downgrade)
export const handlePlanChange = async (uid: string, newPlan: string, isUpgrade: boolean): Promise<void> => {
  try {
    if (isUpgrade) {
      // Upgrade: reset counters and set new subscription data
      await handlePlanUpgrade(uid, newPlan);
    } else {
      // Downgrade: keep current usage until next renewal
      await handlePlanDowngrade(uid, newPlan);
    }
  } catch (error) {
    console.error('Error handling plan change:', error);
    throw error;
  }
};

// Update subscription renewal date (for when Paddle webhooks are active)
export const updateSubscriptionRenewal = async (uid: string, nextRenewalDate: Date): Promise<void> => {
  try {
    await updateDoc(doc(db, 'users', uid), {
      nextRenewalDate: nextRenewalDate.toISOString()
    });
    
    console.log(`Subscription renewal updated for user ${uid}: ${nextRenewalDate.toISOString()}`);
  } catch (error) {
    console.error('Error updating subscription renewal:', error);
  }
};

// **DEPRECATED FUNCTIONS - KEPT FOR BACKWARD COMPATIBILITY**

// Legacy function for backward compatibility (deprecated)
export const checkAndIncrementUsage = async (uid: string, type: 'hook' | 'script'): Promise<{ allowed: boolean; message?: string }> => {
  console.warn('checkAndIncrementUsage is deprecated. Use checkUsageLimit + incrementUsage instead.');
  
  const checkResult = await checkUsageLimit(uid, type);
  if (!checkResult.allowed) {
    return checkResult;
  }
  
  const incrementResult = await incrementUsage(uid, type, 1);
  return { allowed: incrementResult.success, message: incrementResult.error };
};
