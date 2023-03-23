import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    setDoc,
    doc,
    where,
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");
let salaryCollectionRef = collection(db, `companyprofile/${compId}/salary`);

class EmployeeNetSalary {
    getCompId = () => {
      compId = sessionStorage.getItem("compId");
      salaryCollectionRef = collection(
        db,
        `companyprofile/${compId}/salary`
      );
      return;
    };

    addingSalary = (id, field, netSalary) => {
        return setDoc(doc(salaryCollectionRef, id), { [`${field}`]: netSalary });

    };


    addSalary = (id, field, netSalary) => {
        return updateDoc(doc(salaryCollectionRef, id), { [`${field}`]: netSalary });

    };

    getSalary = async (id) => {
        let salaryCollectionRef = collection(db, `companyprofile/${compId}/salary`);
        let allData = await getDoc(doc(salaryCollectionRef, id))
        return {
            ...allData.data(),
        };
    };


    getUserCurrent = async (id, compid) => {
        let tempId = compid ? compid : compId;
        const q = doc(db, tempId == "undefined" || !tempId ? "admins" : `companyprofile/${tempId}/users`, id);
        let rec = await getDoc(q);
        return rec.data();
    };

}

export default new EmployeeNetSalary();
