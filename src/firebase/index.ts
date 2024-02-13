// Import the functions you need from the SDKs you need
// import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4VajmhvDh3EOmcJbmbinPVR4xQdG9Er0",
  authDomain: "invoice-app-77c2f.firebaseapp.com",
  projectId: "invoice-app-77c2f",
  storageBucket: "invoice-app-77c2f.appspot.com",
  messagingSenderId: "24298697995",
  appId: "1:24298697995:web:664f8e747df6c3c2349e0e",
  measurementId: "G-MSJ8YXLYDL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)