import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

// Handle subscription renewal for Pro/Creator users
export const handleSubscriptionRenewal = async (uid: string, plan: 'pro' | 'creator') => {
  try {
    if (!uid) {
      console.error('❌ No UID provided for subscription renewal');
      return { success: false, error: 'No UID provided' };
    }

    console.log(`🔄 Processing subscription renewal for user ${uid} (${plan} plan)`);

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('❌ User document not found for subscription renewal');
      return { success: false, error: 'User document not found' };
    }

    const userData = userDoc.data();
    const now = new Date();
    
    // Calculate next renewal date (30 days from now)
    const nextRenewalDate = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    
    // Reset usage and update renewal date
    await updateDoc(userRef, {
      plan,
      hooksGenerated: 0,
      scriptsGenerated: 0,
      subscriptionStartDate: now,
      nextRenewalDate: nextRenewalDate,
      lastReset: now
    });

    console.log(`✅ Subscription renewed successfully for user ${uid} (${plan} plan)`);
    console.log(`📅 Next renewal date: ${nextRenewalDate.toISOString()}`);

    return { 
      success: true, 
      nextRenewalDate,
      message: `${plan} plan activated successfully. Next renewal: ${nextRenewalDate.toLocaleDateString()}`
    };

  } catch (error) {
    console.error('❌ Error during subscription renewal:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during subscription renewal'
    };
  }
};

// Check if subscription is active (user can generate content)
export const isSubscriptionActive = (userData: any): boolean => {
  if (!userData) return false;
  
  const plan = userData.plan || 'free';
  
  if (plan === 'free') {
    return true; // Free users can always generate (within their 7-day limits)
  }
  
  // Pro/Creator users need active subscription
  if (plan === 'pro' || plan === 'creator') {
    // Check Paddle subscription status first
    if (userData.subscriptionStatus === 'active') {
      return true;
    }
    
    // Check if subscription hasn't expired yet
    if (userData.nextRenewalDate) {
      // Handle Firestore Timestamp objects properly
      let nextRenewal: Date;
      if (userData.nextRenewalDate && typeof userData.nextRenewalDate.toDate === 'function') {
        // It's a Firestore Timestamp object
        nextRenewal = userData.nextRenewalDate.toDate();
      } else {
        // Fallback for other date formats
        nextRenewal = new Date(userData.nextRenewalDate);
      }
      const now = new Date();
      return nextRenewal > now;
    }
    
    // CRITICAL: Don't assume active just because subscriptionId exists
    // Only assume active if we have a valid subscription status or renewal date
    if (userData.subscriptionId && userData.subscriptionStatus !== 'cancelled' && userData.subscriptionStatus !== 'paused') {
      console.warn(`⚠️ User ${userData.uid} has subscriptionId but unclear status: ${userData.subscriptionStatus}`);
      // For safety, require explicit active status or valid renewal date
      return false;
    }
  }
  
  return false;
};

// Check if user was recently updated by webhook (to prevent cron conflicts)
export const wasRecentlyUpdatedByWebhook = (userData: any): boolean => {
  if (!userData || !userData.lastResetTimestamp) {
    return false;
  }
  
  const lastUpdateTime = userData.lastResetTimestamp;
  const now = Date.now();
  const timeSinceUpdate = now - lastUpdateTime;
  
  // If updated within last 5 minutes, consider it recent
  const FIVE_MINUTES = 5 * 60 * 1000;
  
  return timeSinceUpdate < FIVE_MINUTES;
};

// Get subscription expiry information
export const getSubscriptionExpiryInfo = (userData: any) => {
  if (!userData) return null;
  
  const plan = userData.plan || 'free';
  
  if (plan === 'free') {
    return {
      type: 'free',
      expiresAt: null,
      daysUntilExpiry: null,
      resetPeriod: '7 days'
    };
  }
  
  if (plan === 'pro' || plan === 'creator') {
    const expiryDate = userData.subscriptionExpiryDate || userData.nextRenewalDate;
    
    if (!expiryDate) {
      return {
        type: plan,
        expiresAt: null,
        daysUntilExpiry: null,
        resetPeriod: '30 days'
      };
    }
    
    // Handle Firestore Timestamp objects properly
    let expiry: Date;
    if (expiryDate && typeof expiryDate.toDate === 'function') {
      // It's a Firestore Timestamp object
      expiry = expiryDate.toDate();
    } else {
      // Fallback for other date formats
      expiry = new Date(expiryDate);
    }
    const now = new Date();
    const daysUntilExpiry = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    return {
      type: plan,
      expiresAt: expiry,
      daysUntilExpiry: Math.max(0, daysUntilExpiry),
      resetPeriod: '30 days',
      isExpired: daysUntilExpiry <= 0
    };
  }
  
  return null;
};

// Check if subscription needs renewal
export const checkSubscriptionStatus = (userData: any) => {
  if (!userData) return { needsRenewal: false, daysUntilRenewal: 0, isActive: false };
  
  const plan = userData.plan || 'free';
  
  if (plan === 'free') {
    return { needsRenewal: false, daysUntilRenewal: 0, isActive: true };
  }
  
  if (!userData.nextRenewalDate) {
    console.log('🔍 DEBUG: No nextRenewalDate found for user', userData.uid);
    return { needsRenewal: true, daysUntilRenewal: 0, isActive: false };
  }
  
  // Handle Firestore Timestamp objects properly
  let nextRenewal: Date;
  if (userData.nextRenewalDate && typeof userData.nextRenewalDate.toDate === 'function') {
    // It's a Firestore Timestamp object
    nextRenewal = userData.nextRenewalDate.toDate();
    console.log('🔍 DEBUG: nextRenewalDate is Firestore Timestamp, converted to Date:', nextRenewal);
  } else {
    // Fallback for other date formats
    nextRenewal = new Date(userData.nextRenewalDate);
    console.log('🔍 DEBUG: nextRenewalDate is not Timestamp, using new Date():', nextRenewal);
  }
  
  const now = new Date();
  const daysUntilRenewal = Math.ceil((nextRenewal.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isActive = nextRenewal > now;
  
  console.log('🔍 DEBUG: Subscription check for user', userData.uid);
  console.log('🔍 DEBUG: Plan:', plan);
  console.log('🔍 DEBUG: nextRenewalDate:', userData.nextRenewalDate);
  console.log('🔍 DEBUG: nextRenewal (parsed):', nextRenewal);
  console.log('🔍 DEBUG: now:', now);
  console.log('🔍 DEBUG: daysUntilRenewal:', daysUntilRenewal);
  console.log('🔍 DEBUG: isActive:', isActive);
  
  return {
    needsRenewal: daysUntilRenewal <= 0,
    daysUntilRenewal: Math.max(0, daysUntilRenewal),
    isActive
  };
};

// Get subscription info for display
export const getSubscriptionInfo = (userData: any) => {
  if (!userData) return null;
  
  const plan = userData.plan || 'free';
  
  if (plan === 'free') {
    return {
      plan: 'Free',
      status: 'Active',
      nextReset: userData.lastReset ? new Date(userData.lastReset) : null,
      resetPeriod: '7 days',
      canGenerate: true
    };
  }
  
  const subscriptionStatus = checkSubscriptionStatus(userData);
  
  return {
    plan: plan.charAt(0).toUpperCase() + plan.slice(1),
    status: subscriptionStatus.isActive ? 'Active' : 'Expired',
    nextRenewal: userData.nextRenewalDate ? (userData.nextRenewalDate && typeof userData.nextRenewalDate.toDate === 'function' ? userData.nextRenewalDate.toDate() : new Date(userData.nextRenewalDate)) : null,
    renewalPeriod: '30 days',
    canGenerate: subscriptionStatus.isActive,
    daysUntilRenewal: subscriptionStatus.daysUntilRenewal
  };
};

// Handle subscription expiration (when user doesn't pay)
export const handleSubscriptionExpiration = async (uid: string) => {
  try {
    if (!uid) {
      console.error('❌ No UID provided for subscription expiration');
      return { success: false, error: 'No UID provided' };
    }

    console.log(`🔄 Handling subscription expiration for user ${uid}`);

    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      console.error('❌ User document not found for subscription expiration');
      return { success: false, error: 'User document not found' };
    }

    const userData = userDoc.data();
    
    // Downgrade to free plan and reset usage
    await updateDoc(userRef, {
      plan: 'free',
      hooksGenerated: 0,
      scriptsGenerated: 0,
      lastReset: new Date(),
      // Remove subscription-related fields
      subscriptionStartDate: null,
      nextRenewalDate: null
    });

    console.log(`✅ User ${uid} downgraded to free plan due to subscription expiration`);

    return { 
      success: true, 
      message: 'Subscription expired. User downgraded to free plan with 7-day reset cycle.'
    };

  } catch (error) {
    console.error('❌ Error during subscription expiration:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during subscription expiration'
    };
  }
};
