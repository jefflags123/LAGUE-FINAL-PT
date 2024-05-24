// src/firebase.tsx
import { getAnalytics } from 'firebase/analytics';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRVQrOnB6tUAXjlFBdwpqdpHZAi4qDnAw",
  authDomain: "fir-auth-1cc2a.firebaseapp.com",
  projectId: "fir-auth-1cc2a",
  storageBucket: "fir-auth-1cc2a.appspot.com",
  messagingSenderId: "651379536802",
  appId: "1:651379536802:web:5f3203417155c4736db8fb",
  measurementId: "G-NZ9V3BRVZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Authentication
const db = getFirestore(app); // Initialize Firestore

export { auth, db }; // Export Auth and Firestore instances

