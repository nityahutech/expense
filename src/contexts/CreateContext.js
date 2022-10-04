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
  console.log(len);
  return len;
}

export async function createUser(values) {
  console.log(values.email, "password");
  let res = await createUserWithEmailAndPassword(
    createAuth,
    (values.fname + "." + values.lname + "@hutechsolutions.com").toLowerCase(),
    "password"
  );
  updateProfile(res.user, { displayName: values.fname + " " + values.lname });
  // updatePhoneNumber(res.user, values.phone)
  console.log(res);
  console.log(res.user.uid);
  console.log(values.fname + " " + values.lname);
  const valuesToservice = {
    empId: await generateEmpId(),
    fname: values.fname,
    lname: values.lname,
    mailid: (
      values.fname +
      "." +
      values.lname +
      "@hutechsolutions.com"
    ).toLowerCase(),
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
    repManager: values.repManager,
    secManager: values.secManager,
    department: values.department,
  };
  console.log(valuesToservice);
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
  const q = query(users);
  // console.log(q);
  return getDocs(q);
  // return [
  //     {
  //       key: "1",
  //       sn: "1",
  //       fname: "Saswat",
  //       lname: "Patel",
  //       email: "saswat@gmail.com",
  //       dob: "23/07/1992",
  //       gender: "mail",
  //       cnumber: "234456677",
  //     },
  //     {
  //       key: "2",
  //       sn: "2",
  //       fname: "Jatin",
  //       lname: "Yadav",
  //       email: "jatin@gmail.com",
  //       dob: "23/07/1993",
  //       gender: "mail",
  //       cnumber: "234456677",
  //     },
  //   ]
}
