// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  onAuthStateChanged, signOut, deleteUser,sendPasswordResetEmail,updatePassword, sendEmailVerification} 
from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit  } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeSOqlOfS2AuetyIlECJfl534Z2LRCKEE",
  authDomain: "prog-5c39c.firebaseapp.com",
  projectId: "prog-5c39c",
  storageBucket: "prog-5c39c.appspot.com",
  messagingSenderId: "251758974182",
  appId: "1:251758974182:web:cd09a39cb41340e80a9727"
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
    deleteUser, 
    sendPasswordResetEmail,
    updatePassword, 
    sendEmailVerification,
    //firestore
    db,
    collection, 
    addDoc,
    getDocs,
    query,
    orderBy,
    limit

}