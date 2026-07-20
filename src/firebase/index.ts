
'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { 
  initializeFirestore, 
  getFirestore, 
  Firestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from 'firebase/firestore';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseConfig } from './config';

export function initializeFirebase(): {
  app: FirebaseApp;
  db: Firestore;
  auth: Auth;
} {
  const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  
  // تفعيل التخزين المحلي (Offline Persistence) لضمان عمل التطبيق في حالة ضعف الإنترنت
  // يتم تخزين البيانات في ذاكرة المتصفح لفتح المتجر فوراً عند العودة
  const db = getApps().length > 0 
    ? getFirestore(app) 
    : initializeFirestore(app, {
        localCache: persistentLocalCache({
          tabManager: persistentMultipleTabManager()
        })
      });

  const auth = getAuth(app);

  return { app, db, auth };
}

export * from './provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './auth/use-user';
