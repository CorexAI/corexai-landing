import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin.js';

export async function GET() {
  try {
    console.log('🔍 Testing Firebase Admin connection...');
    
    // Test 1: Check if adminDb is available
    if (!adminDb) {
      console.error('❌ adminDb is null/undefined');
      return NextResponse.json({ 
        error: 'Firebase Admin not initialized',
        adminDb: null
      }, { status: 500 });
    }
    
    console.log('✅ adminDb is available');
    
    // Test 2: Try to access Firestore
    try {
      const testDoc = adminDb.doc('test/connection');
      console.log('✅ Firestore document reference created');
      
      // Test 3: Try to read from Firestore
      const testSnapshot = await testDoc.get();
      console.log('✅ Firestore read successful');
      
      return NextResponse.json({ 
        success: true,
        message: 'Firebase Admin is working correctly',
        adminDb: 'available',
        firestore: 'working',
        testDocExists: testSnapshot.exists
      });
      
    } catch (firestoreError) {
      console.error('❌ Firestore error:', firestoreError);
      return NextResponse.json({ 
        error: 'Firestore connection failed',
        adminDb: 'available',
        firestore: 'failed',
        details: firestoreError.message
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error('❌ Firebase Admin test failed:', error);
    return NextResponse.json({ 
      error: 'Firebase Admin test failed',
      details: error.message
    }, { status: 500 });
  }
}
