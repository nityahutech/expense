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
import CompanyProContext from "./CompanyProContext";

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
  const [isHr, setIsHr] = useState();
  const [isLead, setIsLead] = useState();

  function getUserData(user) {
    if (user==null) {
      const timer = setTimeout(() => {
        sessionStorage.clear();
        console.log("null")
      }, 1500);
      return () => clearTimeout(timer);
    }
    let empdoc = getDoc(doc(db, 'users', user.uid)).then((res) => {
      let rec = res.data()
      console.log(rec)
      sessionStorage.setItem("role", rec?.role)
      sessionStorage.setItem("compId", rec?.compId)
      setCompId(rec?.compId || "false")
      setRole(rec?.role || "false")
      CompanyProContext.getCompanyProfile(rec?.compId).then((rec) => {
        sessionStorage.setItem("logo", rec?.logo)
      })
    })
    let empRecord = EmpInfoContext.getEduDetails(user.uid).then((rec) => {
      sessionStorage.setItem("isMgr", rec?.isManager || "false");
      sessionStorage.setItem("isHr", rec?.isHr || "false");
      sessionStorage.setItem("isLead", rec?.isLead || "false");
      setIsMgr(rec?.isManager)
      setIsHr(rec?.isHr)
      setIsLead(rec?.isLead)
    })
    console.log(empdoc, empRecord)
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
    // sessionStorage.clear();
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
      console.log(user)
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
    isHr,
    isLead,
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