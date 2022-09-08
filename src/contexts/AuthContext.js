import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase-config"
import { createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut,
         sendPasswordResetEmail,
         updateEmail,
         updatePassword,
         deleteUser,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    return createUserWithEmailAndPassword(email, password)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    console.log("logged out successfully!")
    sessionStorage.setItem("accessToken", null)
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateMyProfile(user, name, url) {
    return updateProfile(user, name, url)
  }

  function updateMyPhNo(user, phno) {
    return updatePhoneNumber(user, phno)
  }

  function updateMyEmail(email) {
    return updateEmail(currentUser, email)
  }

  function updateMyPassword(password) {
    return updatePassword(currentUser, password)
  }

  function deletePerson() {
    sessionStorage.setItem("accessToken", null)
    return deleteUser(auth, currentUser)
  }


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      // user.displayName = "Maya Vijay"
      // user.phoneNumber = "9900714682"
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateMyEmail,
    updateMyPassword,
    deletePerson,
    updateMyProfile,
    updateMyPhNo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}