import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import{ getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCHIBlgbeHVKj9GikU1VNlrnDLcL5WFhOE",
  authDomain: "metapad-70584.firebaseapp.com",
  projectId: "metapad-70584",
  storageBucket: "metapad-70584.appspot.com",
  messagingSenderId: "74507297317",
  appId: "1:74507297317:web:8965448d617789a33215cc",
  measurementId: "G-YWCF5GZESW"
};

const FIREBASE_APP = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(FIREBASE_APP);
const FIREBASE_DB = getFirestore(FIREBASE_APP);
const DATABASE = getDatabase(FIREBASE_APP);

export { FIREBASE_APP, FIREBASE_AUTH, FIREBASE_DB,DATABASE };
