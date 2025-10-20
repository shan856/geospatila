import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // <-- ADD THIS LINE

const firebaseConfig = {
  apiKey: "AIzaSyBs92vWzowK0uHRRDsKNUDPx7cXzxbueFc",
  authDomain: "pure-phalanx-464704-n1.firebaseapp.com",
  projectId: "pure-phalanx-464704-n1",
  storageBucket: "pure-phalanx-464704-n1.appspot.com",
  messagingSenderId: "124371468899",
  appId: "1:124371468899:web:9bba30b6c5dd46e0f02e56"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // <-- ADD AND EXPORT THIS LINE