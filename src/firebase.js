// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs  } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCD19Ue4vDxm6nFhYlWs96nx1GPxU3vn28",
  authDomain: "projektprog-cd233.firebaseapp.com",
  projectId: "projektprog-cd233",
  storageBucket: "projektprog-cd233.appspot.com",
  messagingSenderId: "235386576924",
  appId: "1:235386576924:web:b912a0112df7c0ad3effd9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  // auth
    auth,
    getAuth, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    //firestore
    db,
    collection, 
    addDoc,
    getDocs 

}