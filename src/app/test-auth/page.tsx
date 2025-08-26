'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export default function TestAuthPage() {
  const { user, loading } = useUser();
  const [firebaseUser, setFirebaseUser] = useState<any>(null);
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    // Check environment variables
    setEnvVars({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ? '✅ Set' : '❌ Missing',
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ? '✅ Set' : '❌ Missing',
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ? '✅ Set' : '❌ Missing',
    });

    // Check Firebase auth directly
    if (auth) {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log('🔥 TestAuth - Direct Firebase auth state:', user);
        setFirebaseUser(user);
      });
      
      return unsubscribe;
    }
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('✅ Signed out successfully');
    } catch (error) {
      console.error('❌ Sign out error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Test Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
          <div className="space-y-2">
            <div>API Key: {envVars.apiKey}</div>
            <div>Auth Domain: {envVars.authDomain}</div>
            <div>Project ID: {envVars.projectId}</div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">UserContext State</h2>
          <div className="space-y-2">
            <div>Loading: {loading ? '⏳ Yes' : '✅ No'}</div>
            <div>User: {user ? `✅ ${user.email}` : '❌ None'}</div>
            <div>User UID: {user?.uid || 'N/A'}</div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Direct Firebase Auth</h2>
          <div className="space-y-2">
            <div>Firebase User: {firebaseUser ? `✅ ${firebaseUser.email}` : '❌ None'}</div>
            <div>Firebase UID: {firebaseUser?.uid || 'N/A'}</div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Actions</h2>
          <button
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
          >
            Force Sign Out
          </button>
        </div>

        <div className="bg-gray-900 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Console Logs</h2>
          <p className="text-gray-400">Check the browser console for detailed authentication logs</p>
        </div>
      </div>
    </div>
  );
}
