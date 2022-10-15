import React, { useContext, useState, useEffect } from "react"
import { auth } from "../firebase-config"
import { signInWithEmailAndPassword,
         signOut,
         sendPasswordResetEmail,
         updateEmail,
         updatePassword,
         deleteUser,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"
import ProfileContext from "./ProfileContext"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState();

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    console.log("logged out successfully!")
    sessionStorage.setItem("accessToken", null)
    sessionStorage.setItem("user", null)
    sessionStorage.setItem("role", null)
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

  async function disablePerson(id) {
    await updateProfile(id, {disabled: true})
    console.log(currentUser)
    return 
  }

  async function getRole(user) {
    console.log(user);
    if (!user) { 
      return; 
    }
    let rec = await ProfileContext.getProfile(user.uid);
    sessionStorage.setItem("role", rec.role)
    console.log("role", rec.role)
    setRole(rec.role);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
      getRole(user);
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    role,
    login,
    logout,
    resetPassword,
    updateMyEmail,
    updateMyPassword,
    disablePerson,
    updateMyProfile,
    updateMyPhNo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}