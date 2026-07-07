import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_ADMIN_SDK_KEY || '{}'
    );
    
    if (!serviceAccount.project_id) {
      throw new Error('Invalid service account configuration');
    }

    // Fix for Vercel environment variables where \n might be escaped
    if (serviceAccount.private_key) {
      serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, '\n');
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
    // You might want to throw the error here depending on your error handling strategy
    throw new Error('Failed to initialize Firebase Admin');
  }
}

export const adminDb = getFirestore();
export const adminAuth = admin.auth();