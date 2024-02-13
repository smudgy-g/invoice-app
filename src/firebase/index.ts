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
  apiKey: import.meta.env.VUE_API_KEY,
  authDomain: import.meta.env.VUE_AUTH_DOMAIN,
  projectId: import.meta.env.VUE_PROJECT_ID,
  storageBucket: import.meta.env.VUE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VUE_MESSAGE_SENDER_ID,
  appId: import.meta.env.VUE_APP_ID,
  measurementId: import.meta.env.VUE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)