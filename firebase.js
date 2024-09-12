// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBFk91S9PX7eJ5HBy0Vtg-RLEUkTObh2oI",
  authDomain: "collection-app-903e1.firebaseapp.com",
  projectId: "collection-app-903e1",
  storageBucket: "collection-app-903e1.appspot.com",
  messagingSenderId: "1042534369698",
  appId: "1:1042534369698:web:b1ac2fb0443fcc7eb10afb",
  measurementId: "G-SRLFJQMZHB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { firestore, auth };