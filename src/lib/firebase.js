// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatter-636b6.firebaseapp.com",
  projectId: "chatter-636b6",
  storageBucket: "chatter-636b6.appspot.com",
  messagingSenderId: "698348068060",
  appId: "1:698348068060:web:1d8b176c1c60cdc8912819"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage()