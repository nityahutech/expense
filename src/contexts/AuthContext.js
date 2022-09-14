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

  function signup(email, password, name) {
    console.log(email, password);
    let res =  createUserWithEmailAndPassword(auth, email, password).then(() => {
      login(email, password).then(() => {
        auth.onAuthStateChanged((user) => {
          updateProfile(user, {displayName: name});
        })
      })
    })
    console.log(res);
    console.log(currentUser);
    return res;
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

  function updateMyProfile(name) {
    return updateProfile(currentUser, name)
  }

  function updateMyPhNo(phno) {
    return updatePhoneNumber(currentUser, phno)
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