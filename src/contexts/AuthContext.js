import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase-config"
import { signInWithEmailAndPassword,
         signOut,
         sendPasswordResetEmail,
         updateEmail,
         updatePassword,
         updatePhoneNumber,
         updateProfile
} from "@firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import EmpInfoContext from "./EmpInfoContext";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState();
  const [compId, setCompId] = useState();
  const [isMgr, setIsMgr] = useState();

  async function getUserData(user) {
    if (!user) { 
      return; 
    }
    let res = await getDoc(doc(db, 'users', user.uid))
    let rec = res.data()
    sessionStorage.setItem("role", rec.role)
    sessionStorage.setItem("compId", rec.compId)
    setCompId(rec?.compId)
    setRole(rec?.role)
    let empRecord = await EmpInfoContext.getEduDetails(user.uid);
    console.log(empRecord)
    sessionStorage.setItem("isMgr", empRecord?.isManager);
    setIsMgr(empRecord?.isManager)   
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    sessionStorage.setItem("accessToken", null)
    sessionStorage.setItem("user", null)
    sessionStorage.setItem("role", null)
    sessionStorage.setItem("compId", null)
    sessionStorage.setItem("isMgr", null)
    return signOut(auth)
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  function updateMyProfile(name) {
    return updateProfile(currentUser, {displayName: name})
  }

  function updateMyPhNo(phno) {
    return updatePhoneNumber(currentUser, {displayName: phno})
  }

  function updateMyEmail(email) {
    updateDoc(doc(db, `companyprofile/${compId}/users`, currentUser.uid), {mailid: email});
    return updateEmail(currentUser, {displayName: email})
  }

  function updateMyPassword(password) {
    return updatePassword(currentUser, password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      getUserData(user)
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    compId,
    currentUser,
    role,
    isMgr,
    login,
    logout,
    resetPassword,
    updateMyEmail,
    updateMyPassword,
    updateMyProfile,
    updateMyPhNo
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}