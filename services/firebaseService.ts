import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, initializeFirestore, doc, onSnapshot, updateDoc, setDoc, collection, writeBatch, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { DashboardCardData, ClassDataMap, GalleryData, OccurrenceData } from '../types';
import firebaseAppletConfig from '../firebase-applet-config.json';
import { safeLocalStorage } from '../utils/storage';

const CONFIG_KEY = 'school_management_firebase_config';

export const getStoredConfig = () => {
  // First try the applet config file
  if (firebaseAppletConfig && firebaseAppletConfig.apiKey) {
    return firebaseAppletConfig;
  }
  
  const stored = safeLocalStorage.getItem(CONFIG_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
};

export const saveConfig = (config: any) => {
  safeLocalStorage.setItem(CONFIG_KEY, JSON.stringify(config));
  // Reload the page to apply the new config
  if (typeof window !== 'undefined') {
    window.location.reload();
  }
};

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export let db: any = null;
export let app: any = null;
export let auth: any = null;
let persistenceEnabled = false;

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid,
      email: auth?.currentUser?.email,
      emailVerified: auth?.currentUser?.emailVerified,
      isAnonymous: auth?.currentUser?.isAnonymous,
      tenantId: auth?.currentUser?.tenantId,
      providerInfo: auth?.currentUser?.providerData?.map((provider: any) => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

export const initFirebase = () => {
  if (db && auth) return true;

  try {
    const config = getStoredConfig();
    if (!config) return false;

    if (!getApps().length) {
      app = initializeApp(config);
    } else {
      app = getApp();
    }
    
    if (!db) {
      try {
        const firestoreSettings = {
          experimentalForceLongPolling: true,
          localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
        };

        if (config.firestoreDatabaseId) {
          db = initializeFirestore(app, firestoreSettings, config.firestoreDatabaseId);
        } else {
          db = initializeFirestore(app, firestoreSettings);
        }
      } catch (cacheErr) {
        console.warn("Could not initialize persistent cache, falling back to standard getFirestore:", cacheErr);
        db = getFirestore(app);
      }
    }

    if (!auth) {
      auth = getAuth(app);
      signInAnonymously(auth).catch((err) => console.error("Auth Error:", err));
    }
    
    return true;
  } catch (e) {
    console.error("Erro ao iniciar Firebase", e);
    return false;
  }
};

// Auto run initFirebase so instances are exported early
try {
  initFirebase();
} catch (e) {
  console.error("Early firebase initialization failed:", e);
}

async function testConnection() {
  try {
    // Attempt to get a dummy doc to test connection
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase mode offline: Please check your Firebase configuration if you want to use cloud syncing.");
    }
    // We don't throw here as this is just a health check
  }
}

export const onAuthChange = (callback: (user: any) => void) => {
  if (!auth) initFirebase();
  if (auth) {
    return onAuthStateChanged(auth, callback);
  }
  return () => {};
};

// --- REAL-TIME CLASSES SYNC ---

export const subscribeToClasses = (callback: (data: ClassDataMap) => void) => {
  if (!db) initFirebase();
  if (!db) return () => {};
  
  const path = 'classes';
  return onSnapshot(collection(db, path), (snapshot: any) => {
    const classes: ClassDataMap = {};
    if (snapshot.empty) {
        callback({});
        return;
    }
    snapshot.forEach((doc: any) => {
      classes[doc.id] = doc.data();
    });
    callback(classes);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
};

export const saveClassesToFirestore = async (data: ClassDataMap) => {
  if (!db) initFirebase();
  if (!db) return;
  const batch = writeBatch(db);
  
  Object.values(data).forEach((cls) => {
    const ref = doc(db, 'classes', cls.id);
    batch.set(ref, cls);
  });
  
  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'classes');
  }
};

// --- REAL-TIME GALLERY SYNC ---

export const subscribeToGallery = (callback: (data: GalleryData | null) => void) => {
  if (!db) initFirebase();
  if (!db) return () => {};
  const path = 'gallery/main';
  return onSnapshot(doc(db, 'gallery', 'main'), (doc: any) => {
    if (doc.exists()) {
      callback(doc.data() as GalleryData);
    } else {
      callback(null);
    }
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
};

export const saveGalleryToFirestore = async (data: GalleryData) => {
  if (!db) initFirebase();
  if (!db) return;
  const path = 'gallery/main';
  try {
    await setDoc(doc(db, 'gallery', 'main'), data);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

// --- REAL-TIME OCCURRENCES SYNC ---

export const subscribeToOccurrences = (callback: (data: OccurrenceData[]) => void) => {
  if (!db) initFirebase();
  if (!db) return () => {};
  
  const path = 'occurrences';
  return onSnapshot(collection(db, path), (snapshot: any) => {
    const list: OccurrenceData[] = [];
    snapshot.forEach((doc: any) => {
      list.push(doc.data() as OccurrenceData);
    });
    // Sort by date/createdAt descending
    list.sort((a, b) => b.createdAt - a.createdAt);
    callback(list);
  }, (error) => {
    handleFirestoreError(error, OperationType.GET, path);
  });
};

export const saveOccurrenceToFirestore = async (occurrence: OccurrenceData) => {
  if (!db) initFirebase();
  if (!db) return;
  const path = `occurrences/${occurrence.id}`;
  try {
    await setDoc(doc(db, 'occurrences', occurrence.id), occurrence);
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const deleteOccurrenceFromFirestore = async (id: string) => {
  if (!db) initFirebase();
  if (!db) return;
  const path = `occurrences/${id}`;
  // Firebase Auth requires signed in to write.
  const { deleteDoc } = await import('firebase/firestore');
  try {
    await deleteDoc(doc(db, 'occurrences', id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};
