// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDmbIX7lDaM1w3sMiBGn8Ux2tUZpVaH36s",
  authDomain: "disney-clone-a5c1e.firebaseapp.com",
  projectId: "disney-clone-a5c1e",
  storageBucket: "disney-clone-a5c1e.firebasestorage.app",
  messagingSenderId: "315716014334",
  appId: "1:315716014334:web:7b24b556b9f7a294ced5af",
  measurementId: "G-DBC0RR6L6F",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getFirestore();
const provider = new GoogleAuthProvider();
const auth = getAuth();

export { auth, provider, storage };
export default db;
