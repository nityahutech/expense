import { createAuth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  deleteUser,
  sendEmailVerification,
} from "@firebase/auth";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  query,
  orderBy,
  doc,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { notification } from "antd";
import CompanyProContext from "./CompanyProContext";
import axios from "axios";
import Papa from 'papaparse';

async function generateEmpId(compId) {
  let data = await CompanyProContext.getCompanyProfile(compId);
  let res = Number(data.lastEmpId.replace(data.precode, '')) + 1
  let num = -(data.lastEmpId.length - data.precode.length)
  return data.precode + ("000000000" + res.toString()).slice(num);
}

export async function createUser(values, compId) {
  let res = await createUserWithEmailAndPassword(
    createAuth,
    values.mailid,
    "newPassword#1"
  );
  try {
    updateProfile(res.user, { displayName: values.name });
    // updatePhoneNumber(res.user, values.phone)
    const valuesToservice = {
      empId: values.empId || await generateEmpId(compId),
      name: values.name,
      fname: values.fname,
      mname: values.mname || "",
      lname: values.lname,
      mailid: values.mailid,
      contactEmail: values.email,
      doj: values.doj || null,
      dob: values.dob || null,
      phonenumber: values.phone,
      prefix: values.prefix || "",
      gender: values.gender,
      designation: values.designation,
      role: values.role? values.role :
        (values.designation.includes("Admin")
          ? "admin"
          : "emp"),
      empType: values.empType,
      repManager: values.repManager ? values.repManager : "",
      secManager: values.secManager ? values.secManager : "",
      lead: values.lead ? values.lead : "",
      businessUnit: values.businessUnit,
      department: values.department,
      division: values.division,
      team: values.team,
      workLocation: values.workLocation,
      isManager: values.isManager || values.designation.includes("Manager"),
      isHr: values.isHr || values.designation.includes("HR"),
      isLead: values.isLead || values.designation.includes("Lead"),
      disabled: false,
      remark: values.remark || "",
    };
    await setDoc(doc(db, `users`, res.user.uid), {compId: compId, role: valuesToservice.role, mailid: valuesToservice.mailid});
    await setDoc(doc(db, `companyprofile/${compId}/users`, res.user.uid), valuesToservice)
    await setDoc(doc(db, `companyprofile/${compId}/salary`, res.user.uid), {bank: []})
    // console.log(res.user);
    sendEmailVerification(res.user).catch(err => showNotification("error", "Error", `Failed to send verification email to ${values.mailid}`))
    // console.log(valuesToservice.empId);
    return valuesToservice.empId
  } catch(error) {
    deleteDoc(doc(db, `users`, res.user.uid))
    deleteDoc(doc(db, `companyprofile/${compId}/users`, res.user.uid))
    deleteUser(res.user)
    console.log(error.message)
    showNotification("error", "Error", `Incorrect fields for ${values.mailid}`)
    return false;
  }
}

export async function getUsers() {
  let compId = sessionStorage.getItem("compId")
  const q = query(collection(db, `companyprofile/${compId}/users`), orderBy("empId", "asc"));
  return getDocs(q);
}

export async function getDesigNo() {
  let data = await getUsers();
  let res = {};
  let names = {};
  data.docs.map((doc) => {
    let des = doc.data().designation
    res[`${des}`] = res[`${des}`] ? res[`${des}`] + 1 : 1;
    if (names[`${des}`]) {
      names[`${des}`].push(doc.id)
    } else {
      names[`${des}`] = [doc.id]
    }
  })
  res.names = names;
  return res;
}

export function showNotification(type, msg, desc) {
  notification[type]({
    message: msg,
    description: desc,
  });
}

export function checkAlphabets(event) {
  if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

export function checkNumbervalue(event) {
  if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};

export async function getCountryCode(){
  let data =  await getDoc(doc(db, "standardInfo","countryCodes"));
  return data.data();
}

export function checkUpperCase(event) {
  if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
}

export function checkNoAlphabets(event) {
  if (!/^[0-9-]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

export function checkAlphabetsName(event) {
  if (!/^[a-zA-Z.-\s]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

export function getManagersData(compId) {
  // const q = query(collection(`companyprofile/${compId}/users`), where("isManager", "==", true))
  getUsers()
};

export function downloadFile(data, filename) {
  const csv = Papa.unparse(data)
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `${filename}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function deleteUsers(array) {
  let q  = query(collection(db, "users"), where("compId", "==", "compId002"));
  let d = await getDocs(q);
  let data = d.docs.map(doc => {
    if (array.includes(doc.data().mailid)) {
      return doc.id
    }
  }).filter(Boolean)
  data.forEach(x => {
    deleteDoc(doc(db, "users", x));
    deleteDoc(doc(db, "companyprofile/compId002/users", x));
  })
  try {
    await axios.post("http://localhost:3001/temp-delete/v1", {
        data
    })
  } catch (error) {
    console.log(error)
  }
}

