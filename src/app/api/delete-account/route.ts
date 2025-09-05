import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { getPaddleClient } from '@/lib/paddle';

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

    // Step 1: Cancel Paddle subscription if user has one
    if (userData?.subscriptionId) {
      try {
        console.log('🔄 Cancelling Paddle subscription:', userData.subscriptionId);
        const paddle = getPaddleClient();
        
        // Cancel the subscription
        await paddle.subscriptions.cancel(userData.subscriptionId, {
          effectiveFrom: 'next_billing_period'
        });
        
        console.log('✅ Paddle subscription cancelled successfully');
      } catch (error) {
        console.error('⚠️ Warning: Failed to cancel Paddle subscription:', error);
        // Continue with deletion even if subscription cancellation fails
        // The subscription will eventually expire
      }
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
        await adminDb.collection('users').doc(userId).set(userData);
        console.log('✅ User document restored');
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
