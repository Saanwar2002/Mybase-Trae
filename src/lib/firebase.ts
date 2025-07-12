
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
// Fallback Firebase configuration (using user-confirmed working key for Maps as API key fallback)
// const FALLBACK_API_KEY = "AIzaSyAEnaOlXAGlkox-wpOOER7RUPhd8iWKhg4";
// const FALLBACK_AUTH_DOMAIN = "taxinow-vvp38.firebaseapp.com";
// const FALLBACK_PROJECT_ID = "taxinow-vvp38";
// const FALLBACK_STORAGE_BUCKET = "taxinow-vvp38.firebasestorage.app";
// const FALLBACK_MESSAGING_SENDER_ID = "679652213262";
// const FALLBACK_APP_ID = "1:679652213262:web:0217c9706165949cd5f25f";

// Firebase configuration initialization

const firebaseConfigFromEnv = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Helper to ensure env var is non-empty before using it over fallback
const getEffectiveConfigValue = (envValue: string | undefined, fallbackValue: string): string => {
  if (!envValue || envValue.trim() === "") {
    throw new Error("Firebase client configuration error: Required environment variable is missing. Please set all NEXT_PUBLIC_FIREBASE_* variables.");
  }
  return envValue;
};

const firebaseConfig = {
  apiKey: getEffectiveConfigValue(firebaseConfigFromEnv.apiKey, ""),
  authDomain: getEffectiveConfigValue(firebaseConfigFromEnv.authDomain, ""),
  projectId: getEffectiveConfigValue(firebaseConfigFromEnv.projectId, ""),
  storageBucket: getEffectiveConfigValue(firebaseConfigFromEnv.storageBucket, ""),
  messagingSenderId: getEffectiveConfigValue(firebaseConfigFromEnv.messagingSenderId, ""),
  appId: getEffectiveConfigValue(firebaseConfigFromEnv.appId, "")
};

const criticalConfigKeys: Array<keyof typeof firebaseConfig> = ['apiKey', 'authDomain', 'projectId'];
let firebaseConfigError = false;
// Validate critical configuration
console.log("Firebase Init Script: Debugging resolved configuration values:");
// Check critical configuration values
for (const key of criticalConfigKeys) {
  const resolvedValue = firebaseConfig[key];
  
  if (!resolvedValue || resolvedValue.trim() === "") {
    console.error(`Firebase Config ERROR: Critical key '${key}' is missing or empty.`);
    firebaseConfigError = true;
  } else {
    // Configuration value is valid
  }
}

let app: FirebaseApp | null = null;
let db: Firestore | null = null; // Initialize to null
let auth: Auth | null = null;   // Initialize to null

if (firebaseConfigError) {
  console.warn("Firebase initialization skipped due to missing configuration."
  );
} else {
  try {
      console.log("Firebase app initialized successfully.");
      app = initializeApp(firebaseConfig);
      console.log("Firebase app initialized successfully using resolved config for project:", firebaseConfig.projectId);
      console.log("Firebase app retrieved successfully.");
      app = getApp();
      console.log("Firebase app retrieved successfully (already initialized) for project:", firebaseConfig.projectId);
      try {
        db = getFirestore(app);
        console.log("Firestore initialized successfully.");
        console.log("Firestore instance (db) obtained successfully.");
      } catch (dbError: any) {
        console.error("CRITICAL: Failed to initialize Firestore (db). Error Code:", dbError.code, "Message:", dbError.message);
        // db remains null (already initialized to null above)
      }

      try {
        auth = getAuth(app);
        console.log("Firebase Auth initialized successfully.");
        console.log("Firebase Auth instance obtained successfully.");
      } catch (authError: any) {
        console.error("CRITICAL: Failed to initialize Firebase Auth (auth). Error Code:", authError.code, "Message:", authError.message);
        // auth remains null (already initialized to null above)
      }
  } catch (initError: any) {
    console.error("CRITICAL: Firebase app initializeApp() FAILED. Error Code:", initError.code, "Message:", initError.message);
    // Ensure db and auth are null on any init error
  }
}

export { app, db, auth };
