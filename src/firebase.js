// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdO4TU_mAHpD7mHnf7R3J2Q0emUVtB1pw",
  authDomain: "whatschat-1a055.firebaseapp.com",
  projectId: "whatschat-1a055",
  storageBucket: "whatschat-1a055.appspot.com",
  messagingSenderId: "906561323791",
  appId: "1:906561323791:web:d4ca3160355143da32747a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
