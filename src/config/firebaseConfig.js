import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let app = null;
let db = null;
let firebaseEnabled = false;

// Check if all required Firebase env vars are present
const hasFirebaseConfig = () => {
  const requiredVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];
  
  return requiredVars.every(varName => import.meta.env[varName]);
};

// Initialize Firebase only if all config is available
if (hasFirebaseConfig()) {
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
  };
  
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    firebaseEnabled = true;
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.warn('Failed to initialize Firebase:', error);
    firebaseEnabled = false;
  }
} else {
  console.log('Firebase environment variables not configured - falling back to db.json');
}

export { app, db, firebaseEnabled };
