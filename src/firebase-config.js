import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDn5e6U6H_cipP0N2_Wk2CfeBqeezaA6HY",
  authDomain: "hutech-hr.firebaseapp.com",
  projectId: "hutech-hr",
  storageBucket: "hutech-hr.appspot.com",
  messagingSenderId: "950376087363",
  appId: "1:950376087363:web:4f0755f9b55b3c01deb9f6",
  measurementId: "G-LSK2TMX7WC"
};

// const firebaseConfig = {
//   apiKey: "AIzaSyBlxO52TTZqs4KjmDQtJbG2i0uf1GEAi-U",
//   authDomain: "fir-db-for-spring-boot-aea1a.firebaseapp.com",
//   projectId: "fir-db-for-spring-boot-aea1a",
//   storageBucket: "fir-db-for-spring-boot-aea1a.appspot.com",
//   messagingSenderId: "1030659819637",
//   appId: "1:1030659819637:web:ed6149a1784672a07cd03c",
//   measurementId: "G-F87K2WY231"
// }

const app = initializeApp(firebaseConfig);
const secondaryApp = initializeApp(firebaseConfig, "Secondary");

export const auth = getAuth(app);
export const createAuth = getAuth(secondaryApp);
export const db = getFirestore(app);
export const storage = getStorage(app);
