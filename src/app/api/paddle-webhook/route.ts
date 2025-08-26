// @ts-nocheck
import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin.js';
import crypto from 'crypto';

// Paddle webhook events we need to handle
const SUBSCRIPTION_EVENTS = [
  'subscription.created',
  'subscription.updated', 
  'subscription.cancelled',
  'subscription.paused',
  'subscription.resumed'
];

// Verify Paddle webhook signature
function verifyPaddleSignature(body: string, signature: string | null, webhookSecret: string): boolean {
  if (!signature) {
    console.error('❌ No signature provided');
    return false;
  }

  try {
    // Parse Paddle signature format: "ts=1234567890&h=abc123..."
    const signatureParts = signature.split('&');
    const timestamp = signatureParts.find(part => part.startsWith('ts='))?.split('=')[1];
    const hash = signatureParts.find(part => part.startsWith('h='))?.split('=')[1];
    
    if (!timestamp || !hash) {
      console.error('❌ Invalid signature format');
      return false;
    }

    // Create expected signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(timestamp + body)
      .digest('hex');
    
    // Compare signatures
    const isValid = hash === expectedSignature;
    
    if (!isValid) {
      console.error('❌ Signature verification failed');
      console.error('Expected:', expectedSignature);
      console.error('Received:', hash);
    }
    
    return isValid;
  } catch (error) {
    console.error('❌ Error verifying signature:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if Firebase Admin is available
    const db = adminDb as any;
    if (!db) {
      console.error('❌ Firebase Admin not available');
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    const body = await request.text();
    const signature = request.headers.get('paddle-signature');
    
    // Verify webhook signature for production
    const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;
    
    // For development, you can disable signature verification
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    // Check if we have a valid webhook secret
    if (!isDevelopment && PADDLE_WEBHOOK_SECRET) {
      const isValidSignature = verifyPaddleSignature(body, signature, PADDLE_WEBHOOK_SECRET);
      if (!isValidSignature) {
        console.error('❌ Invalid webhook signature');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    } else if (!isDevelopment && !PADDLE_WEBHOOK_SECRET) {
      console.warn('⚠️ PADDLE_WEBHOOK_SECRET not set - webhook signature verification disabled');
      console.warn('⚠️ Set PADDLE_WEBHOOK_SECRET environment variable for production security');
    }
    
    console.log('🔔 Paddle webhook received:', { body, signature });
    
    let event;
    try {
      event = JSON.parse(body);
    } catch (error) {
      console.error('❌ Failed to parse webhook body:', error);
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    const { event_type, data } = event;
    
    if (!SUBSCRIPTION_EVENTS.includes(event_type)) {
      console.log(`ℹ️ Ignoring non-subscription event: ${event_type}`);
      return NextResponse.json({ status: 'ignored' });
    }

    console.log(`🔄 Processing ${event_type} event:`, data);

    // Handle different subscription events
    switch (event_type) {
      case 'subscription.created':
        await handleSubscriptionCreated(data);
        break;
      case 'subscription.updated':
        await handleSubscriptionUpdated(data);
        break;
      case 'subscription.cancelled':
        await handleSubscriptionCancelled(data);
        break;
      case 'subscription.paused':
        await handleSubscriptionPaused(data);
        break;
      case 'subscription.resumed':
        await handleSubscriptionResumed(data);
        break;
      default:
        console.log(`⚠️ Unhandled event type: ${event_type}`);
    }

    return NextResponse.json({ status: 'success' });
  } catch (error) {
    console.error('❌ Webhook processing error:', error);
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
      });
    }
    
    // Return 200 to prevent Paddle from retrying (if it's a known issue)
    // Return 500 for actual server errors
    const statusCode = error instanceof Error && error.message.includes('User not found') ? 200 : 500;
    
    return NextResponse.json({ 
      error: 'Webhook processing failed',
      timestamp: new Date().toISOString()
    }, { status: statusCode });
  }
}

async function handleSubscriptionCreated(data: any) {
  try {
    // Validate required data
    if (!data || !data.subscription || !data.customer) {
      console.error('❌ Invalid subscription.created data structure:', data);
      return;
    }

    const { subscription, customer } = data;
    const customerEmail = customer?.email;
    
    if (!customerEmail) {
      console.error('❌ No customer email in subscription.created event');
      return;
    }

    // Validate subscription data
    if (!subscription.id || !subscription.status) {
      console.error('❌ Invalid subscription data:', subscription);
      return;
    }

    // Find user by email
    const usersRef = adminDb.collection('users');
    let userQuery = await usersRef.where('email', '==', customerEmail).limit(1).get();
    
    // If not found by email, try to find by customer ID or other identifiers
    if (userQuery.empty) {
      console.warn(`⚠️ No user found with email: ${customerEmail}, trying alternative methods`);
      
      // Try to find by customer ID if available
      if (customer?.id) {
        userQuery = await usersRef.where('paddleCustomerId', '==', customer.id).limit(1).get();
      }
      
      // If still not found, log for manual intervention
      if (userQuery.empty) {
        console.error(`❌ No user found for Paddle customer: ${customerEmail} (ID: ${customer?.id})`);
        console.error('Manual intervention required: User needs to contact support');
        return;
      }
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;
    
    // Determine plan based on price ID
    let plan = 'free';
    if (subscription.items?.[0]?.price?.id) {
      const priceId = subscription.items[0].price.id;
      if (priceId === 'pri_01k3gw8y5vdv8gwvs8v7q7tm1v') {
        plan = 'pro';
      } else if (priceId === 'pri_01k3gwh2qq5j8rghafrypm0y3n') {
        plan = 'creator';
      } else {
        console.warn(`⚠️ Unknown price ID: ${priceId}, defaulting to free plan`);
        plan = 'free';
      }
    } else {
      console.warn('⚠️ No price ID found in subscription, defaulting to free plan');
    }

    // Validate and parse dates safely
    const now = new Date();
    let startDate = subscription.started_at ? new Date(subscription.started_at) : now;
    const renewalDate = subscription.next_payment?.date || subscription.recurring_payment?.date;
    let nextRenewal = renewalDate ? new Date(renewalDate) : new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days fallback
    
    // Validate dates
    if (isNaN(startDate.getTime())) {
      console.warn('Invalid start date, using current time');
      startDate = now;
    }
    if (isNaN(nextRenewal.getTime())) {
      console.warn('Invalid renewal date, using 30 days from now');
      nextRenewal = new Date(now.getTime() + (30 * 24 * 60 * 60 * 1000));
    }

    // Update user subscription with error handling
    try {
      await userDoc.ref.update({
        plan,
        subscriptionId: subscription.id,
        paddleCustomerId: customer?.id, // Store customer ID for future reference
        subscriptionStatus: subscription.status,
        subscriptionStartDate: startDate,
        nextRenewalDate: nextRenewal,
        hooksGenerated: 0,
        scriptsGenerated: 0,
        lastReset: now,
        lastResetTimestamp: now.getTime(), // Add timestamp for precise tracking
        resetReason: 'webhook_subscription_created', // Track reset source
        subscriptionExpiryDate: nextRenewal, // Track expiry date explicitly
        subscriptionExpiryTimestamp: nextRenewal.getTime() // Track expiry timestamp
      });

      console.log(`✅ Subscription created for user ${userId}: ${plan} plan`);
    } catch (updateError) {
      console.error(`❌ Failed to update user ${userId}:`, updateError);
      throw updateError; // Re-throw to be caught by outer try-catch
    }
  } catch (error) {
    console.error('❌ Error handling subscription.created:', error);
    throw error; // Re-throw to be caught by outer try-catch
  }
}

async function handleSubscriptionUpdated(data: any) {
  try {
    const { subscription } = data;
    const subscriptionId = subscription.id;
    
    // Find user by subscription ID
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('subscriptionId', '==', subscriptionId).limit(1).get();
    
    if (userQuery.empty) {
      console.error(`❌ No user found with subscription ID: ${subscriptionId}`);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;
    
    // Determine plan based on price ID
    let plan = 'free';
    if (subscription.items?.[0]?.price?.id) {
      const priceId = subscription.items[0].price.id;
      if (priceId === 'pri_01k3gw8y5vdv8gwvs8v7q7tm1v') {
        plan = 'pro';
      } else if (priceId === 'pri_01k3gwh2qq5j8rghafrypm0y3n') {
        plan = 'creator';
      } else {
        console.warn(`⚠️ Unknown price ID: ${priceId}, defaulting to free plan`);
        plan = 'free';
      }
    } else {
      console.warn('⚠️ No price ID found in subscription, defaulting to free plan');
    }

    // Update user subscription
    const renewalDate = new Date(subscription.next_payment?.date || subscription.recurring_payment?.date);
    
    await userDoc.ref.update({
      plan,
      subscriptionStatus: subscription.status,
      nextRenewalDate: renewalDate,
      subscriptionExpiryDate: renewalDate, // Track expiry date explicitly
      subscriptionExpiryTimestamp: renewalDate.getTime(), // Track expiry timestamp
      // Reset usage on renewal
      hooksGenerated: 0,
      scriptsGenerated: 0,
      lastReset: new Date(),
      lastResetTimestamp: new Date().getTime(),
      resetReason: 'webhook_subscription_renewed'
    });

    console.log(`✅ Subscription updated for user ${userId}: ${plan} plan, status: ${subscription.status}`);
  } catch (error) {
    console.error('❌ Error handling subscription.updated:', error);
  }
}

async function handleSubscriptionCancelled(data: any) {
  try {
    const { subscription } = data;
    const subscriptionId = subscription.id;
    
    // Find user by subscription ID
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('subscriptionId', '==', subscriptionId).limit(1).get();
    
    if (userQuery.empty) {
      console.error(`❌ No user found with subscription ID: ${subscriptionId}`);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;
    const userData = userDoc.data(); // Get user data before using it
    
    // Downgrade to free plan
    const now = new Date();
    await userDoc.ref.update({
      plan: 'free',
      subscriptionStatus: 'cancelled',
      subscriptionCancelledAt: now,
      subscriptionCancelledTimestamp: now.getTime(),
      // Reset usage and start free plan cycle
      hooksGenerated: 0,
      scriptsGenerated: 0,
      lastReset: now,
      lastResetTimestamp: now.getTime(),
      resetReason: 'webhook_subscription_cancelled',
      // Keep subscription info for reference
      previousPlan: userData.plan,
      previousSubscriptionId: userData.subscriptionId
    });

    console.log(`✅ Subscription cancelled for user ${userId}, downgraded to free plan`);
  } catch (error) {
    console.error('❌ Error handling subscription.cancelled:', error);
  }
}

async function handleSubscriptionPaused(data: any) {
  try {
    const { subscription } = data;
    const subscriptionId = subscription.id;
    
    // Find user by subscription ID
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('subscriptionId', '==', subscriptionId).limit(1).get();
    
    if (userQuery.empty) {
      console.error(`❌ No user found with subscription ID: ${subscriptionId}`);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;
    
    // Update subscription status
    await userDoc.ref.update({
      subscriptionStatus: 'paused'
    });

    console.log(`✅ Subscription paused for user ${userId}`);
  } catch (error) {
    console.error('❌ Error handling subscription.paused:', error);
  }
}

async function handleSubscriptionResumed(data: any) {
  try {
    const { subscription } = data;
    const subscriptionId = subscription.id;
    
    // Find user by subscription ID
    const usersRef = db.collection('users');
    const userQuery = await usersRef.where('subscriptionId', '==', subscriptionId).limit(1).get();
    
    if (userQuery.empty) {
      console.error(`❌ No user found with subscription ID: ${subscriptionId}`);
      return;
    }

    const userDoc = userQuery.docs[0];
    const userId = userDoc.id;
    
    // Determine plan based on price ID
    let plan = 'free';
    if (subscription.items?.[0]?.price?.id) {
      const priceId = subscription.items[0].price.id;
      if (priceId === 'pri_01k3gw8y5vdv8gwvs8v7q7tm1v') {
        plan = 'pro';
      } else if (priceId === 'pri_01k3gwh2qq5j8rghafrypm0y3n') {
        plan = 'creator';
      }
    }
    
    // Update user subscription
    const renewalDate = new Date(subscription.next_payment?.date || subscription.recurring_payment?.date);
    
    await userDoc.ref.update({
      plan,
      subscriptionStatus: subscription.status,
      nextRenewalDate: renewalDate,
      subscriptionExpiryDate: renewalDate, // Track expiry date explicitly
      subscriptionExpiryTimestamp: renewalDate.getTime(), // Track expiry timestamp
      // Reset usage on resume
      hooksGenerated: 0,
      scriptsGenerated: 0,
      lastReset: new Date(),
      lastResetTimestamp: new Date().getTime(),
      resetReason: 'webhook_subscription_resumed'
    });

    console.log(`✅ Subscription resumed for user ${userId}: ${plan} plan`);
  } catch (error) {
    console.error('❌ Error handling subscription.resumed:', error);
  }
}
