import { adminDb } from './firebase-admin.js';

export const getUsageLimits = (plan) => {
  switch (plan) {
    case 'pro':
      return { hooks: 'Unlimited', scripts: 50 };
    case 'creator':
      return { hooks: 'Unlimited', scripts: 150 }; // Backend limit: 150 scripts, but not displayed to users
    default: // free
      return { hooks: 3, scripts: 3 }; // 3 generations × 3 hooks = 9 hooks total, 3 scripts
  };
};

// Check if user can generate content based on their plan and current usage
export const checkUsageLimit = async (uid, type) => {
  try {
    if (!uid) {
      return { allowed: false, message: 'User ID is missing. Please sign in again.' };
    }

    // Check if Firebase Admin is available
    if (!adminDb) {
      console.error('❌ Firebase Admin not available - cannot check usage limits');
      // For now, allow usage if Admin SDK is not available (fallback)
      return { 
        allowed: true, 
        currentUsage: { hooksGenerated: 0, scriptsGenerated: 0 },
        message: 'Usage tracking temporarily disabled'
      };
    }

    // Get current user data from Firebase using Admin SDK
    const userDoc = await adminDb.doc(`users/${uid}`).get();
    if (!userDoc.exists) {
      return { allowed: false, message: 'User account not found. Please sign in again.' };
    }

    const userData = userDoc.data();
    const plan = userData.plan || 'free';
    const limits = getUsageLimits(plan);
    
    // Check if user has reached their limits
    if (type === 'hook') {
      // For hooks, we track GENERATIONS (each generation creates 3 hooks)
      // Free plan: 3 generations × 3 hooks = 9 hooks total
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
    // For now, allow usage if there's an error (fallback)
    return { 
      allowed: true, 
      currentUsage: { hooksGenerated: 0, scriptsGenerated: 0 },
      message: 'Usage tracking temporarily disabled due to error'
    };
  }
};

// Increment usage in Firebase using transactions for consistency
export const incrementUsage = async (uid, type, amount = 1) => {
  try {
    if (!uid) {
      return { success: false, error: 'User ID is missing' };
    }

    // Check if Firebase Admin is available
    if (!adminDb) {
      console.error('❌ Firebase Admin not available - cannot increment usage');
      // For now, return success if Admin SDK is not available (fallback)
      return { 
        success: true, 
        newUsage: { hooksGenerated: 0, scriptsGenerated: 0 },
        error: 'Usage tracking temporarily disabled'
      };
    }

    // Use a transaction to ensure atomic updates
    const result = await adminDb.runTransaction(async (transaction) => {
      const userRef = adminDb.doc(`users/${uid}`);
      const userDoc = await transaction.get(userRef);
      
      if (!userDoc.exists) {
        // Create user document if it doesn't exist
        const newUserData = {
          uid: uid,
          hooksGenerated: type === 'hook' ? amount : 0,
          scriptsGenerated: type === 'script' ? amount : 0,
          plan: 'free',
          lastReset: new Date(),
          verified: false,
          onboardingCompleted: true
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
      console.log(`✅ Usage incremented successfully: ${type} +${amount} for user ${uid}`);
      return { success: true, newUsage: result.newUsage };
    } else {
      return { success: false, error: 'Transaction failed' };
    }
  } catch (error) {
    console.error('Error incrementing usage:', error);
    // For now, return success if there's an error (fallback)
    return { 
      success: true, 
      newUsage: { hooksGenerated: 0, scriptsGenerated: 0 },
      error: 'Usage tracking temporarily disabled due to error'
    };
  }
};
