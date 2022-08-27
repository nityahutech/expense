import { auth } from "../firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  export function logout() {
    console.log("logged out successfully!")
    sessionStorage.setItem("accessToken", null)
    return signOut(auth)
  }
