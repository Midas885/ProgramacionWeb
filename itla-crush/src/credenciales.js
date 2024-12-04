// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSOcWpFi7MBeQqJTRbcQA3oMh2U5VVK0M",
  authDomain: "itla-crush-18ab2.firebaseapp.com",
  projectId: "itla-crush-18ab2",
  storageBucket: "itla-crush-18ab2.firebasestorage.app",
  messagingSenderId: "578526978194",
  appId: "1:578526978194:web:e3439c06fc2c497f05064b",
  measurementId: "G-SNWSE1ML2W"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
const db = getFirestore(appFirebase)

export {appFirebase, db};