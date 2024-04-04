// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeTHjuTBwyA4DjQiIJi22fwp51FJLjXc0",
  authDomain: "financeiro-a556f.firebaseapp.com",
  projectId: "financeiro-a556f",
  storageBucket: "financeiro-a556f.appspot.com",
  messagingSenderId: "268035954154",
  appId: "1:268035954154:web:5314b9dee3656e1a194e93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export {app, db, auth}