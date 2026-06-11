import admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_ADMIN_SDK_KEY || '{}'
    );
    
    if (serviceAccount.project_id) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error:', error);
  }
}

export const adminDb = admin.apps.length ? getFirestore() : null as unknown as ReturnType<typeof getFirestore>;
export const adminAuth = admin.apps.length ? admin.auth() : null as unknown as ReturnType<typeof admin.auth>;