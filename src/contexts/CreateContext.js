import { createAuth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signOut,
  updatePhoneNumber,
  updateProfile,
} from "@firebase/auth";
import ProfileContext from "./ProfileContext";
import {
  collection,
  getDocs,
  get,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase-config";
const users = collection(db, "users");

function generateEmpId() {
  let len = getDocs(users).then((snapshot) => {
    let res = snapshot.docs.length + 1;
    return "HTS" + ("00" + res.toString()).slice(-3);
  });
  return len;
}

export async function createUser(values) {
  let res = await createUserWithEmailAndPassword(
    createAuth,
    values.mailid,
    "password"
  );
  updateProfile(res.user, { displayName: values.fname + " " + values.lname });
  // updatePhoneNumber(res.user, values.phone)
  const valuesToservice = {
    empId: await generateEmpId(),
    fname: values.fname,
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
    department: values.department,
    isManager: false,
    earnLeave: 12,
    sickLeave: 6,
    casualLeave: 6,
    optionalLeave: 2,
  };
  ProfileContext.addProfile(res.user.uid, valuesToservice)
    .then((result) => {
      signOut(createAuth);
      console.log(result);
      return result;
    })
    .catch((error) => {
      return false;
    });
}

export async function getUsers() {
  const q = query(users, orderBy("empId", "asc"));
  return getDocs(q);
}
