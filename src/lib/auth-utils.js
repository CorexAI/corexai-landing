import { adminAuth } from './firebase-admin.js';

export async function verifyAuthToken(request) {
  try {
    // Check if Firebase Admin is available
    if (!adminAuth) {
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
    const decodedToken = await adminAuth.verifyIdToken(token);
    
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

export async function requireAuth(request) {
  const user = await verifyAuthToken(request);
  
  if (!user) {
    throw new Error('Authentication required');
  }
  
  return user;
}
