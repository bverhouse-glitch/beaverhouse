// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, serverTimestamp, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZ2joS_a2cOh8bNgiNBijS31HrQVe0P4A",
  authDomain: "beaverhouse-bver.firebaseapp.com",
  projectId: "beaverhouse-bver",
  storageBucket: "beaverhouse-bver.firebasestorage.app",
  messagingSenderId: "69608648615",
  appId: "1:69608648615:web:799ee2614da314ecb4d082",
  measurementId: "G-R9KQZ9PW4F"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);