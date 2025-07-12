import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { Firestore } from 'firebase-admin/firestore';
import { Auth } from 'firebase-admin/auth';

const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;


if (!serviceAccountKey) {
  throw new Error("Firebase Admin SDK ERROR: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Application cannot proceed.");
}

let serviceAccount: ServiceAccount;

try {
  serviceAccount = JSON.parse(serviceAccountKey);
  if (!serviceAccount || !serviceAccount.projectId || !serviceAccount.clientEmail || !serviceAccount.privateKey) {
    throw new Error("Firebase Admin SDK ERROR: FIREBASE_SERVICE_ACCOUNT_KEY is not a valid service account JSON.");
  }
} catch (e) {
  throw new Error("Firebase Admin SDK ERROR: Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY as JSON. Application cannot proceed.");
}

let adminApp: admin.app.App | null = null;
let adminDb: Firestore | null = null;
let adminAuth: Auth | null = null;

function initializeFirebaseAdmin() {
  try {
    if (!admin.apps.length) {
      adminApp = admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as ServiceAccount),
      });
    } else {
      adminApp = admin.app();
    }
    adminDb = admin.firestore();
    adminAuth = admin.auth();
  } catch (initError: any) {
    throw new Error("CRITICAL: Firebase Admin SDK initialization FAILED. Application cannot proceed.");
  }
}

initializeFirebaseAdmin();

export { adminApp, adminDb, adminAuth };