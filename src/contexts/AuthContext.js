import React, { useContext, useState, useEffect } from "react"
import { auth, db, createAuth } from "../firebase-config"
import { signInWithEmailAndPassword,
         signOut,
         sendPasswordResetEmail,
         updateEmail,
         updatePassword,
         updatePhoneNumber,
         updateProfile,
         applyActionCode,
         verifyPasswordResetCode,
         confirmPasswordReset,
         checkActionCode,
         sendEmailVerification
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
import InvoiceContext from "./InvoiceContext";
import AssetContext from "./AssetContext";
import { changeAccount, isUserVerified } from "./EmailContext";

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const [role, setRole] = useState('');
  const [roleView, setRoleView] = useState('');
  const [compId, setCompId] = useState('');
  const [isMgr, setIsMgr] = useState(false);
  const [isHr, setIsHr] = useState(false);
  const [isLead, setIsLead] = useState(false);
  const [logo, setLogo] = useState(null);

  function getUserData(user) {
    if (user == null) {
      const timer = setTimeout(() => {
        sessionStorage.clear();
        localStorage.setItem("login", null)
      }, 2500);
      return () => clearTimeout(timer);
    }
    getDoc(doc(db, 'users', user.uid)).then((res) => {
      let rec = res.data()
      sessionStorage.setItem("role", rec?.role)
      sessionStorage.setItem("roleView", rec?.role)
      sessionStorage.setItem("compId", rec?.compId)
      localStorage.setItem("login",  moment())
      setRoleView(rec?.role)
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
      InvoiceContext.getCompId();
      AssetContext.getCompId();
      if (rec?.role == "super") { return; }
      CompanyProContext.getCompanyProfile(rec?.compId).then((rec) => {
        sessionStorage.setItem("logo", rec?.logo)
        setLogo(rec?.logo)
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

  async function resetPassword(email) {
    let user = await isUserVerified(email);
    if (user.emailVerified) { return sendPasswordResetEmail(auth, email) }
    let record = await signInWithEmailAndPassword(createAuth, user.providerData[0].email, "newPassword#1");
    return sendEmailVerification(record.user)
    
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

  async function handleVerifyEmail(actionCode, password) {
    let actionCodeInfo = await checkActionCode(auth, actionCode);
    await applyActionCode(auth, actionCode);
    await changeAccount(null, {password: password}, actionCodeInfo.data.email);
    let res = await login(actionCodeInfo.data.email, password);
    return res;
  }

  async function handlePasswordReset(actionCode, password) {
    let email = await verifyPasswordResetCode(auth, actionCode)
    await confirmPasswordReset(auth, actionCode, password)
    let res = await login(email, password)
    return res
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
    roleView,
    isMgr,
    isHr,
    isLead,
    logo,
    login,
    logout,
    resetPassword,
    updateMyEmail,
    updateMyPassword,
    updateMyProfile,
    updateMyPhNo,
    handleVerifyEmail,
    handlePasswordReset
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}