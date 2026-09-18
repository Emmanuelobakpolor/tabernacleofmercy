import { initializeApp, getApps } from 'firebase/app'
import { initializeFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Shared by every visitor (public testimony feed + submissions), so this
// module deliberately excludes firebase/auth — see lib/firebaseAuth.js,
// which only loads for people who visit /admin.
const existingApp = getApps()[0]
export const app = existingApp || initializeApp(firebaseConfig)

// Some networks (proxies, VPNs, certain ISPs/extensions) mangle Firestore's
// default WebChannel streaming transport, causing the Listen stream to fail
// with repeated 400s and admin queries to silently return nothing. Auto
// long-polling detection falls back to a transport that survives that.
export const db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true })
