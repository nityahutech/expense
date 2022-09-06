import { auth } from "../firebase-config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser } from "firebase/auth";

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
  
  export function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  
  export function deletePerson(currentUser) {
    return deleteUser(auth, currentUser)
  }
  
