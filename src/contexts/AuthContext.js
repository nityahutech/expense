import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase-config"
import { signInWithEmailAndPassword,
         signOut,
         sendPasswordResetEmail,
         updateEmail,
         updatePassword,
         deleteUser,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState();
  const [compId, setCompId] = useState();

  async function getCompId(user) {
    if (!user) { 
      return; 
    }
    let res = await getDoc(doc(db, 'users', user.uid))
    let companyId = res.data().compId
    setCompId(companyId)
    sessionStorage.setItem("compId", companyId)
    return companyId
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
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
    updateDoc(doc(db, `companyprofile/${compId}/users`, currentUser.uid), {mailid: email});
    return updateEmail(currentUser, email)
  }

  function updateMyPassword(password) {
    return updatePassword(currentUser, password)
  }

  async function disablePerson(id) {
    await updateProfile(id, {disabled: true})
    return 
  }

  async function getRole(user) {
    if (!user) { 
      return; 
    }
    let rec = await getDoc(doc(db, `companyprofile/${compId}/users`, user.uid))
    sessionStorage.setItem("role", rec.role)
    sessionStorage.setItem("role", "hr")
    setRole(rec.role);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      getCompId(user)
      setCurrentUser(user)
      setLoading(false)
      getRole(user);
    })

    return unsubscribe
  }, [])

  const value = {
    compId,
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