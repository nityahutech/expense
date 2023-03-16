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
    // addSalary = (id, field, netSalary) => {
    //     return setDoc(doc(salaryCollectionRef, id), { [`${field}`]: netSalary });

    // };


    addSalary = (id, field, netSalary) => {
        return updateDoc(doc(salaryCollectionRef, id), { [`${field}`]: netSalary });

    };

    getSalary = async (compId,id) => {

        let salaryCollectionRef = collection(db, `companyprofile/${compId}/salary`);
        let allData = await getDoc(doc(salaryCollectionRef, id))
        console.log('success2', allData.data())
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
