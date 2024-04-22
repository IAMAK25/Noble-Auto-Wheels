import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getDatabase, set, ref, onValue, push, get } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZRtNq930NNnzJTn-6JshEQNfKv8GXBO4",
    authDomain: "women-safety-c16fa.firebaseapp.com",
    databaseURL: "https://women-safety-c16fa-default-rtdb.firebaseio.com",
    projectId: "women-safety-c16fa",
    storageBucket: "women-safety-c16fa.appspot.com",
    messagingSenderId: "608424091523",
    appId: "1:608424091523:web:df732cabb44bd7025f60b6",
    measurementId: "G-7VLLM4RCWT"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const database = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, app, storage, database, firestore, db, analytics, set, ref, push, get, uploadBytesResumable, getDownloadURL };
