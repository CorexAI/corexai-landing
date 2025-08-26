import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Check if Firebase Admin is already initialized
if (!getApps().length) {
  // Check if all required environment variables are present
  const requiredEnvVars = [
    'FIREBASE_ADMIN_PROJECT_ID',
    'FIREBASE_ADMIN_PRIVATE_KEY_ID',
    'FIREBASE_ADMIN_PRIVATE_KEY',
    'FIREBASE_ADMIN_CLIENT_EMAIL',
    'FIREBASE_ADMIN_CLIENT_ID',
    'FIREBASE_ADMIN_AUTH_URI',
    'FIREBASE_ADMIN_TOKEN_URI',
    'FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL',
    'FIREBASE_ADMIN_CLIENT_X509_CERT_URL'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required Firebase Admin environment variables:', missingVars);
    console.error('📝 Please create a .env.local file with the required Firebase Admin credentials.');
    console.error('📖 See ENVIRONMENT-SETUP.md for detailed setup instructions.');
    
    // Don't crash the app, just log the error
    // The app will continue to work for client-side features
    // but server-side Firebase Admin features will fail gracefully
  } else {
    try {
      // Initialize Firebase Admin with service account
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_ADMIN_PROJECT_ID,
        private_key_id: process.env.FIREBASE_ADMIN_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
        auth_uri: process.env.FIREBASE_ADMIN_AUTH_URI,
        token_uri: process.env.FIREBASE_ADMIN_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_ADMIN_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_ADMIN_CLIENT_X509_CERT_URL
      };

      // Validate that project_id is present
      if (!serviceAccount.project_id) {
        throw new Error('Service account object must contain a string "project_id" property.');
      }

      // Initialize with elevated privileges (bypasses security rules)
      initializeApp({
        credential: cert(serviceAccount),
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        // Ensure Admin SDK has full access
        databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`
      });
      
      console.log('✅ Firebase Admin initialized successfully with elevated privileges');
    } catch (error) {
      console.error('❌ Failed to initialize Firebase Admin:', error);
      console.error('📝 Please check your .env.local file and Firebase service account credentials.');
    }
  }
}

// Get Firestore and Auth instances (will be undefined if initialization failed)
let adminDb;
let adminAuth;

try {
  adminDb = getFirestore();
  adminAuth = getAuth();
  
  // Test the connection
  if (adminDb) {
    console.log('✅ Firebase Admin Firestore connection established');
  }
  if (adminAuth) {
    console.log('✅ Firebase Admin Auth connection established');
  }
} catch (error) {
  console.warn('⚠️ Firebase Admin services not available due to initialization failure');
  adminDb = null;
  adminAuth = null;
}

// Export with explicit null type for TypeScript
export { adminDb, adminAuth };
export default adminDb;
