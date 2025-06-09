// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW8VWmnYIwrgOe_nXl9fQqy9P66gR2VFU",
  authDomain: "lyrics-sanangelo.firebaseapp.com",
  projectId: "lyrics-sanangelo",
  storageBucket: "lyrics-sanangelo.firebasestorage.app",
  messagingSenderId: "150645356799",
  appId: "1:150645356799:web:a355c7a0ae0e61a45c34ca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
