import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/firebase-admin';

// Export user data for download before account deletion
export async function POST(request: NextRequest) {
  try {
    console.log('📥 User data export request received');

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
      console.log('✅ User data retrieved for export');
    } catch (error) {
      console.error('❌ Error retrieving user data:', error);
      return NextResponse.json({ error: 'Failed to retrieve user data' }, { status: 500 });
    }

    // Prepare export data (remove sensitive information)
    const exportData = {
      exportDate: new Date().toISOString(),
      userInfo: {
        uid: userId,
        email: userEmail,
        name: userData?.name,
        plan: userData?.plan,
        verified: userData?.verified,
        onboardingCompleted: userData?.onboardingCompleted,
        timezone: userData?.timezone
      },
      usageStats: {
        hooksGenerated: userData?.hooksGenerated || 0,
        scriptsGenerated: userData?.scriptsGenerated || 0,
        lastReset: userData?.lastReset,
        subscriptionStartDate: userData?.subscriptionStartDate,
        nextRenewalDate: userData?.nextRenewalDate
      },
      onboardingData: userData?.onboardingData || null,
      tipPreferences: {
        currentTipSet: userData?.currentTipSet,
        tipsLastShown: userData?.tipsLastShown
      },
      accountCreated: userData?.createdAt || 'Unknown',
      dataExportedAt: new Date().toISOString()
    };

    // Log the export for audit purposes
    try {
      await adminDb.collection('data_exports').doc(userId).set({
        email: userEmail,
        exportedAt: new Date(),
        dataSize: JSON.stringify(exportData).length
      });
      console.log('✅ Data export logged for audit');
    } catch (error) {
      console.error('⚠️ Warning: Failed to log data export:', error);
      // Don't fail the export if logging fails
    }

    console.log('✅ User data export completed successfully for user:', userId);

    return NextResponse.json({ 
      success: true, 
      data: exportData,
      message: 'User data exported successfully'
    });

  } catch (error) {
    console.error('❌ Unexpected error during data export:', error);
    return NextResponse.json({ 
      error: 'Internal server error during data export' 
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
