import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDMqV3tS4NmJd9ecsp7kKkYc4F2IqtRhQg",
  authDomain: "campushub-hotel-mgmt.firebaseapp.com",
  projectId: "campushub-hotel-mgmt",
  storageBucket: "campushub-hotel-mgmt.firebasestorage.app",
  messagingSenderId: "872547907829",
  appId: "1:872547907829:web:ff0fbd621bae18cc9bedbc",
  measurementId: "G-5VBF9N6W3S"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
