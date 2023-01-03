import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, addDoc, getDocs,getDoc, setDoc, doc, query, where, orderBy, limit  } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCBsFJsI16p3M7vZK-g5mUam_wP1GcxnvE",
  authDomain: "sportario-v2.firebaseapp.com",
  projectId: "sportario-v2",
  storageBucket: "sportario-v2.appspot.com",
  messagingSenderId: "229812505266",
  appId: "1:229812505266:web:91acda081e2e4875b017ab",
  measurementId: "G-QEWH7XSW2H"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export {
    getAuth,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    storage, 
    collection, 
    getDocs,
    signOut,
    onAuthStateChanged,
    db,
    addDoc,
    setDoc,
    doc,
    query,
    where,
    getDoc,
    orderBy,
    limit,
    ref,
    uploadBytes,
    getDownloadURL,
    analytics
  }
  