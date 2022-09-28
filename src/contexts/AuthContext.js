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

  async function getRole(user) {
    let rec = await ProfileContext.getProfile(user.uid);
    console.log(rec.data());
    console.log(rec.data().role);
    console.log(user);
    // console.log(rec.data().role);
    sessionStorage.setItem("role", rec.data().role)
    setRole(rec.data().role);
    setCurrentUser({
      ...currentUser,
      role: rec.data().role
    })
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