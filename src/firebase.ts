// firebase.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwXKJRfDAMvyq40xMOJAeHWJgFky7_BA8",
  authDomain: "geeta-b8192.firebaseapp.com",
  projectId: "geeta-b8192",
  storageBucket: "geeta-b8192.appspot.com",
  messagingSenderId: "73013887018",
  appId: "1:73013887018:web:7f824831925ae37bf14353",
  measurementId: "G-86J7N3SXGM",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export default firebaseApp;
export { auth, db };
