import { db } from "../firebase-config";

import {
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const employeeCollectionRef = collection(db, "users");

class EmployeeContext {
  addEmployees = (newEmployee) => {
    return addDoc(employeeCollectionRef, newEmployee);
  };

  updateEmployee = (id, updateEmployee) => {
    const employeeDoc = doc(db, "users", id);
    return updateDoc(employeeDoc, updateEmployee);
  };

  deleteEmployee = (id) => {
    const employeeDoc = doc(db, "users", id);
    return deleteDoc(employeeDoc);
  };

  getAllEmployees = () => {
    const q = query(employeeCollectionRef, orderBy("date", "desc"));
    // console.log(q);
    return getDocs(q);
  };

  getAllByTotal = () => {
    const q = query(employeeCollectionRef, orderBy("subtotal", "desc"));
    // console.log(q);
    return getDocs(q);
  };

  getEmployee = async (id) => {
    const employeeDoc = doc(db, "users", id);
    let rec = await getDoc(employeeDoc);
    let recordData = rec.data();
    console.log('recordData', recordData)
    return recordData
    // return getDoc(employeeDoc);
  };
}

export default new EmployeeContext();
