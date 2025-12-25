// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAF3czZmKy_Pxws0GULVlzPO-3P5h_yhb4",
  authDomain: "eventc-ca700.firebaseapp.com",
  projectId: "eventc-ca700",
  storageBucket: "eventc-ca700.firebasestorage.app",
  messagingSenderId: "715964436328",
  appId: "1:715964436328:web:ee7405fb110d4a6b1290dd",
  measurementId: "G-0K855X5XQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };