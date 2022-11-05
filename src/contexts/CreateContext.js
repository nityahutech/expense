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
} from "firebase/firestore";
import { db } from "../firebase-config";

const users = (compId) => {return collection(db, `companyprofile/${compId}/users`);}

function generateEmpId(compId) {
  let len = getDocs(users(compId)).then((snapshot) => {
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
  console.log(name);
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
    role:
      values.designation == "Chief Executive Officer(CEO)" ||
      values.designation == "Human Resource(HR)"
        ? "hr"
        : "emp",
    empType: values.empType,
    repManager: values.repManager ? values.repManager : "",
    secManager: values.secManager ? values.secManager : "",
    department: values.department ? values.department : "",
    location: values.location,
    isManager: false,
    earnLeave: 12,
    sickLeave: 6,
    casualLeave: 6,
    optionalLeave: 2,
  };
  console.log(res.user.uid, valuesToservice, compId)
  setDoc(doc(db, `users`, res.user.uid), {compId: compId});
  setDoc(doc(db, `companyprofile/${compId}/users`, res.user.uid), valuesToservice)
    .then((result) => {
      signOut(createAuth);
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error.message);
      return false;
    });
}

export async function getUsers(compId) {
  const q = query(users(compId), orderBy("empId", "asc"));
  return getDocs(q);
}
