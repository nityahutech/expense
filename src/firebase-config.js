import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlxO52TTZqs4KjmDQtJbG2i0uf1GEAi-U",
  authDomain: "fir-db-for-spring-boot-aea1a.firebaseapp.com",
  projectId: "fir-db-for-spring-boot-aea1a",
  storageBucket: "fir-db-for-spring-boot-aea1a.appspot.com",
  messagingSenderId: "1030659819637",
  appId: "1:1030659819637:web:ed6149a1784672a07cd03c",
  measurementId: "G-F87K2WY231"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
