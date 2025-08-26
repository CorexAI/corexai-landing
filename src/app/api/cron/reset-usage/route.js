import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin.js';

// This endpoint will be called by Vercel Cron to automatically reset usage and check subscriptions
export async function GET(request) {
  try {
    // Verify this is a legitimate cron request (Vercel adds a secret header)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      console.log('❌ Unauthorized cron request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🕐 Starting automatic usage reset and subscription check...');

    if (!adminDb) {
      console.error('❌ Firebase Admin not available');
      return NextResponse.json({ error: 'Firebase Admin not available' }, { status: 500 });
    }

    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    let resetCount = 0;
    let expiredSubscriptions = 0;

    // 1. Handle Free Users - Reset usage every 7 days
    console.log('📋 Checking free users for usage reset...');
    const freeUsersSnapshot = await adminDb.collection('users').where('plan', '==', 'free').get();
    
    if (!freeUsersSnapshot.empty) {
    const batch = adminDb.batch();
    
      for (const userDoc of freeUsersSnapshot.docs) {
      const userData = userDoc.data();
      const lastReset = userData.lastReset ? new Date(userData.lastReset) : null;
        
        // Check if user was recently updated by webhook (prevent conflicts)
        const lastResetTimestamp = userData.lastResetTimestamp || 0;
        const timeSinceLastUpdate = now.getTime() - lastResetTimestamp;
        const FIVE_MINUTES = 5 * 60 * 1000;
        
        if (timeSinceLastUpdate < FIVE_MINUTES) {
          console.log(`⏳ Free user ${userData.uid} (${userData.email}) - recently updated by webhook, skipping cron reset`);
          continue;
        }
      
      // Check if user needs reset (exactly 7 days have passed since last reset)
      if (!lastReset || lastReset <= sevenDaysAgo) {
          console.log(`🔄 Resetting usage for free user ${userData.uid} (${userData.email}) - 7 days passed since last reset`);
        
          // Reset usage and update lastReset with timestamp
        batch.update(userDoc.ref, {
          hooksGenerated: 0,
          scriptsGenerated: 0,
            lastReset: now,
            lastResetTimestamp: now.getTime(), // Add timestamp for precise tracking
            resetReason: 'cron_7day_reset'
        });
        
        resetCount++;
      } else {
        const daysSinceReset = Math.floor((now.getTime() - lastReset.getTime()) / (1000 * 60 * 60 * 24));
          console.log(`⏳ Free user ${userData.uid} (${userData.email}) - ${daysSinceReset} days since last reset, no reset needed yet`);
        }
      }

      // Commit free user updates
      if (resetCount > 0) {
        await batch.commit();
        console.log(`✅ Successfully reset usage for ${resetCount} free users after 7 days`);
      }
    }

    // 2. Handle Pro/Creator Users - Check for expired subscriptions
    console.log('📋 Checking Pro/Creator users for expired subscriptions...');
    const paidUsersSnapshot = await adminDb.collection('users')
      .where('plan', 'in', ['pro', 'creator'])
      .get();
    
    if (!paidUsersSnapshot.empty) {
      const batch = adminDb.batch();
      
      for (const userDoc of paidUsersSnapshot.docs) {
        const userData = userDoc.data();
        const nextRenewalDate = userData.nextRenewalDate ? new Date(userData.nextRenewalDate) : null;
        
        // Check if user was recently updated by webhook (prevent conflicts)
        const lastResetTimestamp = userData.lastResetTimestamp || 0;
        const timeSinceLastUpdate = now.getTime() - lastResetTimestamp;
        const FIVE_MINUTES = 5 * 60 * 1000;
        
        if (timeSinceLastUpdate < FIVE_MINUTES) {
          console.log(`⏳ Paid user ${userData.uid} (${userData.email}) - recently updated by webhook, skipping cron check`);
          continue;
        }
        
        // Check if subscription has expired
        if (nextRenewalDate && nextRenewalDate < now) {
          console.log(`⚠️ Subscription expired for user ${userData.uid} (${userData.email}) - downgrading to free plan`);
          
          // Downgrade to free plan and reset usage
          batch.update(userDoc.ref, {
            plan: 'free',
            subscriptionStatus: 'expired',
            subscriptionExpiredAt: now,
            subscriptionExpiredTimestamp: now.getTime(),
            hooksGenerated: 0,
            scriptsGenerated: 0,
            lastReset: now,
            lastResetTimestamp: now.getTime(),
            resetReason: 'subscription_expired',
            // Keep subscription info for reference
            previousPlan: userData.plan,
            previousSubscriptionId: userData.subscriptionId
          });
          
          expiredSubscriptions++;
        } else if (nextRenewalDate) {
          const daysUntilExpiry = Math.ceil((nextRenewalDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
          console.log(`⏳ Paid user ${userData.uid} (${userData.email}) - ${daysUntilExpiry} days until subscription expires`);
        }
      }

      // Commit paid user updates
      if (expiredSubscriptions > 0) {
      await batch.commit();
        console.log(`✅ Successfully downgraded ${expiredSubscriptions} expired subscriptions to free plan`);
      }
    }

    const totalChecked = (freeUsersSnapshot.size || 0) + (paidUsersSnapshot.size || 0);
    
    console.log(`✅ Cron job completed: ${resetCount} free users reset, ${expiredSubscriptions} subscriptions expired`);

    return NextResponse.json({ 
      message: 'Cron job completed successfully', 
      freeUsersReset: resetCount,
      expiredSubscriptions,
      totalUsersChecked: totalChecked,
      timestamp: now.toISOString()
    });

  } catch (error) {
    console.error('❌ Error during cron job:', error);
    return NextResponse.json({ 
      error: 'Failed to run cron job',
      details: error.message 
    }, { status: 500 });
  }
}

// Also handle POST requests for manual testing
export async function POST(request) {
  return GET(request);
}
