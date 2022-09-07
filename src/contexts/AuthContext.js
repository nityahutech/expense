import { auth } from "../firebase-config"
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword, 
         sendPasswordResetEmail, 
         signOut, 
         deleteUser,
         updateEmail,
         updatePassword,
         updatePhoneNumber,
         updateProfile
} from "firebase/auth";

export function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  export function updateMyProfile(user, name, url) {
    return updateProfile(user, name, url)
  }

  export function updateMyEmail(user, email) {
    return updateEmail(user, email)
  }

  export function updateMyPassword(user, password) {
    return updatePassword(user, password)
  }

  export function updateMyPhNo(user, phno) {
    return updatePhoneNumber(user, phno)
  }

  export function logout() {
    console.log("logged out successfully!")
    sessionStorage.setItem("accessToken", null)
    return signOut(auth)
  }
  
  export function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }
  
  export function deletePerson(user) {
    return deleteUser(auth, user)
  }
  
