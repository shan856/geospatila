// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs92vWzowK0uHRRDsKNUDPx7cXzxbueFc",
  authDomain: "pure-phalanx-464704-n1.firebaseapp.com",
  projectId: "pure-phalanx-464704-n1",
  storageBucket: "pure-phalanx-464704-n1.appspot.com", // Corrected storage bucket name
  messagingSenderId: "124371468899",
  appId: "1:124371468899:web:9bba30b6c5dd46e0f02e56"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firestore database instance for our components to use
export const db = getFirestore(app);