import { createAuth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signOut,
  updatePhoneNumber,
  updateProfile,
} from "@firebase/auth";
import {
  collection,
  getDocs,
  setDoc,
  query,
  orderBy,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../firebase-config";

function generateEmpId(compId) {
  let q = query(collection(db, "users"), where("compId", "==", compId))
  let len = getDocs(q).then((snapshot) => {
    let res = snapshot.docs.length + 1;
    return "HTS" + ("00" + res.toString()).slice(-3);
  });
  return len;
}

export async function createUser(values, compId) {
  let res = await createUserWithEmailAndPassword(
    createAuth,
    values.mailid,
    "password"
  );
  let name = values.fname + (values.mname?` ${values.mname} `:" ") + values.lname
  updateProfile(res.user, { displayName: name });
  // updatePhoneNumber(res.user, values.phone)
  const valuesToservice = {
    empId: await generateEmpId(compId),
    name: name,
    fname: values.fname,
    mname: values.mname ? values.mname : "",
    lname: values.lname,
    mailid: values.mailid,
    contactEmail: values.email,
    doj: values.doj.format("DD-MM-YYYY"),
    phonenumber: values.phone,
    gender: values.gender,
    designation: values.designation,
    role: values.role? values.role :
      (values.designation == "Chief Executive Officer(CEO)" ||
      values.designation == "Human Resource(HR)"
        ? "hr"
        : "emp"),
    empType: values.empType,
    repManager: values.repManager ? values.repManager : "",
    secManager: values.secManager ? values.secManager : "",
    lead: values.lead ? values.lead : "",
    department: values.department ? values.department : "",
    location: values.location,
    isManager: values.isManager || false,
    isHr: values.isHr || false,
    isLead: values.isLead || false,
    earnLeave: 12,
    sickLeave: 6,
    casualLeave: 6,
    optionalLeave: 2,
    disabled: false
  };
  console.log(compId)
  setDoc(doc(db, `users`, res.user.uid), {compId: compId, role: valuesToservice.role, mailid: valuesToservice.mailid});
  setDoc(doc(db, `companyprofile/${compId}/users`, res.user.uid), valuesToservice)
    .then((result) => {
      signOut(createAuth);
      return result;
    })
    .catch((error) => {
      return false;
    });
}

export async function getUsers() {
  let compId = sessionStorage.getItem("compId")
  const q = query(collection(db, `companyprofile/${compId}/users`), orderBy("empId", "asc"));
  return getDocs(q);
}

export async function getDesigNo() {
  let data = await getUsers();
  let res = {};
  data.docs.map((doc) => {
    let des = doc.data().designation
    res[`${des}`] = res[`${des}`] ? ++res[`${des}`] : 1 
  })
  return res;
}