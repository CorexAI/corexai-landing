import { doc, updateDoc, increment, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

// Simple usage tracking functions that work with client-side Firebase
export const incrementUsage = async (uid: string, type: 'hook' | 'script') => {
  try {
    if (!uid) {
      console.error('No UID provided for usage tracking');
      return { success: false, error: 'No UID provided' };
    }

    console.log(`📈 Incrementing ${type} usage for user:`, uid);

    const userRef = doc(db, 'users', uid);
    
    // Get current user data
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create new user document
      const newUserData = {
        uid: uid,
        hooksGenerated: type === 'hook' ? 1 : 0,
        scriptsGenerated: type === 'script' ? 1 : 0,
        plan: 'free',
        lastReset: new Date(),
        verified: false,
        onboardingCompleted: false
      };
      
      await setDoc(userRef, newUserData);
      console.log('✅ Created new user document with initial usage');
      
      return { 
        success: true, 
        newUsage: { 
          hooksGenerated: type === 'hook' ? 1 : 0, 
          scriptsGenerated: type === 'script' ? 1 : 0 
        } 
      };
    }

    // Update existing user with increment
    const updateData: any = {};
    if (type === 'hook') {
      updateData.hooksGenerated = increment(1);
    } else if (type === 'script') {
      updateData.scriptsGenerated = increment(1);
    }

    await updateDoc(userRef, updateData);
    
    console.log(`✅ Successfully incremented ${type} usage`);
    
    // Get updated data to return
    const updatedDoc = await getDoc(userRef);
    const updatedData = updatedDoc.data();
    
    return { 
      success: true, 
      newUsage: { 
        hooksGenerated: updatedData?.hooksGenerated || 0, 
        scriptsGenerated: updatedData?.scriptsGenerated || 0 
      } 
    };
    
  } catch (error: any) {
    console.error(`❌ Error incrementing ${type} usage:`, error);
    return { success: false, error: error.message || 'Unknown error occurred' };
  }
};

export const checkUsageLimit = async (uid: string, type: 'hook' | 'script') => {
  try {
    if (!uid) {
      return { allowed: false, message: 'User ID is missing. Please sign in again.' };
    }

    console.log(`🔍 Checking ${type} usage limit for user:`, uid);

    const userDoc = await getDoc(doc(db, 'users', uid));
    if (!userDoc.exists()) {
      console.log('⚠️ User document does not exist, will create it');
      return { allowed: true, message: 'New user, creating document' };
    }

    const userData = userDoc.data();
    const plan = userData.plan || 'free';
    
    console.log('📊 Current usage:', {
      hooksGenerated: userData.hooksGenerated || 0,
      scriptsGenerated: userData.scriptsGenerated || 0,
      plan: plan
    });
    
    // Check if user has reached their limits
    if (type === 'hook') {
      if (plan === 'free' && (userData.hooksGenerated || 0) >= 3) {
        return { 
          allowed: false, 
          message: `You've reached your hook generation limit (3 generations). Each generation creates 3 hooks. Upgrade your plan for unlimited hooks.`
        };
      }
    } else if (type === 'script') {
      if (plan === 'free' && (userData.scriptsGenerated || 0) >= 3) {
        return { 
          allowed: false, 
          message: `You've reached your script limit (3). Upgrade your plan for unlimited scripts.`
        };
      }
    }

    return { allowed: true };
  } catch (error) {
    console.error(`❌ Error checking ${type} usage limit:`, error);
    return { allowed: false, message: 'Error checking usage limits. Please try again.' };
  }
};
