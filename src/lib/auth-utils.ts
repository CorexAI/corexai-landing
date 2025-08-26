// @ts-nocheck
import { adminAuth } from './firebase-admin';
import { NextRequest } from 'next/server';

export interface AuthenticatedUser {
  uid: string;
  email: string;
  emailVerified: boolean;
}

export async function verifyAuthToken(request: NextRequest): Promise<AuthenticatedUser | null> {
  try {
    // Check if Firebase Admin is available
    const auth = adminAuth as any;
    if (!auth) {
      console.error('❌ Firebase Admin not available - cannot verify auth token');
      return null;
    }

    // Get the authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    // Extract the token
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return null;
    }

    // Verify the Firebase token
    const decodedToken = await auth.verifyIdToken(token);
    
    if (!decodedToken.uid) {
      return null;
    }

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      emailVerified: decodedToken.email_verified || false
    };
  } catch (error) {
    console.error('Token verification failed:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthenticatedUser> {
  const user = await verifyAuthToken(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}
