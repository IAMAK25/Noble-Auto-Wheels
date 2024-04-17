import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, set, ref, onValue, push, get } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC3ouTzsi8Kqr0MHS950GMzgq0Yi1C9k7o",
    authDomain: "noble-auto-wheels-7aabb.firebaseapp.com",
    projectId: "noble-auto-wheels-7aabb",
    storageBucket: "noble-auto-wheels-7aabb.appspot.com",
    messagingSenderId: "135198849219",
    appId: "1:135198849219:web:3edc0e87b3a83a2f300a76",
    measurementId: "G-N63507CY8Q"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, app, storage, database, firestore, db, analytics, set, ref, push, get, uploadBytesResumable, getDownloadURL };
