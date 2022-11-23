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
import moment from "moment";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import EmpInfoContext from "./EmpInfoContext";
import AttendanceContext from "./AttendanceContext";
import CompanyProContext from "./CompanyProContext";
import AppraisalContext from "./AppraisalContext";
import CompanyHolidayContext from "./CompanyHolidayContext";
import ConfigureContext from "./ConfigureContext";
import DocumentContext from "./DocumentContext";
import ExpenseContext from "./ExpenseContext";
import LeaveContext from "./LeaveContext";
import PolicyContext from "./PolicyContext";

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
        localStorage.setItem("login", null)
      }, 1500);
      return () => clearTimeout(timer);
    }
    getDoc(doc(db, 'users', user.uid)).then((res) => {
      let rec = res.data()
      sessionStorage.setItem("role", rec?.role)
      sessionStorage.setItem("roleView", rec?.role)
      sessionStorage.setItem("compId", rec?.compId)
      localStorage.setItem("login",  moment().format("hh:mm:ss DD-MM-YYYY"))
      setCompId(rec?.compId)
      setRole(rec?.role)
      EmpInfoContext.getCompId();
      AttendanceContext.getCompId();
      AppraisalContext.getCompId();
      CompanyHolidayContext.getCompId();
      ConfigureContext.getCompId();
      DocumentContext.getCompId();
      ExpenseContext.getCompId();
      LeaveContext.getCompId();
      PolicyContext.getCompId();
      if (rec?.role == "super") { return; }
      CompanyProContext.getCompanyProfile(rec?.compId).then((rec) => {
        sessionStorage.setItem("logo", rec?.logo)
      })
      EmpInfoContext.getEduDetails(user.uid, rec?.compId).then((rec) => {
        sessionStorage.setItem("isMgr", rec?.isManager);
        sessionStorage.setItem("isHr", rec?.isHr);
        sessionStorage.setItem("isLead", rec?.isLead);
        setIsMgr(rec?.isManager)
        setIsHr(rec?.isHr)
        setIsLead(rec?.isLead)
      })
    })
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  function logout() {
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