import { NextRequest, NextResponse } from 'next/server';
import * as adminServer from '@/lib/firebase-admin';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

const adminAuth = adminServer.adminAuth as Auth | null;
const adminDb = adminServer.adminDb as Firestore | null;

// Delete user account completely
export async function POST(request: NextRequest) {
  try {
    console.log('🗑️ Account deletion request received');

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('❌ No valid authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    
    // Check if Firebase Admin is available
    if (!adminAuth || !adminDb) {
      console.error('❌ Firebase Admin not available');
      return NextResponse.json({ error: 'Firebase Admin not available' }, { status: 500 });
    }

    // Verify the Firebase ID token
    let decodedToken;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
      console.log('✅ Firebase token verified for user:', decodedToken.uid);
    } catch (error) {
      console.error('❌ Invalid Firebase token:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Get user data from Firestore
    let userData;
    try {
      const userDoc = await adminDb.collection('users').doc(userId).get();
      if (!userDoc.exists) {
        console.log('❌ User document not found:', userId);
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      userData = userDoc.data();
      console.log('✅ User data retrieved:', { uid: userId, email: userEmail, plan: userData?.plan });
    } catch (error) {
      console.error('❌ Error retrieving user data:', error);
      return NextResponse.json({ error: 'Failed to retrieve user data' }, { status: 500 });
    }

    // Step 1: Log subscription cancellation (manual process)
    if (userData?.subscriptionId) {
      console.log('📝 User has active subscription:', userData.subscriptionId);
      console.log('⚠️ Note: Subscription cancellation should be handled manually via Paddle dashboard');
      // Note: In production, you would integrate with Paddle API here
      // For now, we'll log the subscription ID for manual cancellation
    }

    // Step 2: Delete user document from Firestore
    try {
      console.log('🔄 Deleting user document from Firestore...');
      await adminDb.collection('users').doc(userId).delete();
      console.log('✅ User document deleted from Firestore');
    } catch (error) {
      console.error('❌ Error deleting user document:', error);
      return NextResponse.json({ error: 'Failed to delete user data' }, { status: 500 });
    }

    // Step 3: Delete Firebase Auth user
    try {
      console.log('🔄 Deleting Firebase Auth user...');
      await adminAuth.deleteUser(userId);
      console.log('✅ Firebase Auth user deleted');
    } catch (error) {
      console.error('❌ Error deleting Firebase Auth user:', error);
      // If Firestore deletion succeeded but Auth deletion failed,
      // we should try to restore the Firestore document
      try {
        console.log('🔄 Attempting to restore user document due to Auth deletion failure...');
        if (userData) {
          await adminDb.collection('users').doc(userId).set(userData);
          console.log('✅ User document restored');
        } else {
          console.warn('⚠️ Skipping restore: no userData available to write back');
        }
      } catch (restoreError) {
        console.error('❌ Failed to restore user document:', restoreError);
      }
      return NextResponse.json({ error: 'Failed to delete user account' }, { status: 500 });
    }

    // Step 4: Log the deletion for audit purposes
    try {
      await adminDb.collection('deleted_accounts').doc(userId).set({
        email: userEmail,
        deletedAt: new Date(),
        originalPlan: userData?.plan,
        hadSubscription: !!userData?.subscriptionId,
        subscriptionId: userData?.subscriptionId || null
      });
      console.log('✅ Deletion logged for audit');
    } catch (error) {
      console.error('⚠️ Warning: Failed to log deletion:', error);
      // Don't fail the deletion if logging fails
    }

    console.log('✅ Account deletion completed successfully for user:', userId);

    return NextResponse.json({ 
      success: true, 
      message: 'Account deleted successfully',
      deletedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Unexpected error during account deletion:', error);
    return NextResponse.json({ 
      error: 'Internal server error during account deletion' 
    }, { status: 500 });
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
