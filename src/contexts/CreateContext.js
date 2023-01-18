import { createAuth } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signOut,
  updatePhoneNumber,
  updateProfile,
  deleteUser
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

async function generateEmpId(compId) {
  let data = await CompanyProContext.getCompanyProfile(compId);
  let q = query(collection(db, "users"), where("compId", "==", compId))
  let len = getDocs(q).then((snapshot) => {
    let res = snapshot.docs.length + 1;
    return data.precode + ("00" + res.toString()).slice(-3);
  });
  return len;
}

export async function createUser(values, compId) {
  let res = await createUserWithEmailAndPassword(
    createAuth,
    values.mailid,
    "password"
  );
  try {
    // console.log(values, compId)
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
    // console.log(valuesToservice)
    await setDoc(doc(db, `users`, res.user.uid), {compId: compId, role: valuesToservice.role, mailid: valuesToservice.mailid});
    await setDoc(doc(db, `companyprofile/${compId}/users`, res.user.uid), valuesToservice)
  } catch(error) {
    deleteDoc(doc(db, `users`, res.user.uid))
    deleteUser(res.user)
    console.log(error.message)
    showNotification("error", "Error", `Incorrect fields for ${values.mailid}`)
    return false;
    
  }
    // .then((result) => {
    //   signOut(createAuth);
    //   return result;
    // })
    // .catch((error) => {
    // });
}

export async function deleteErrorUser() {

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
  if (!/^[a-zA-Z- ]*$/.test(event.key) && event.key !== "Backspace") {
    return true;
  }
};

