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



    addSalary = (id, netSalary) => {
        return setDoc(doc(salaryCollectionRef, id), netSalary);

    };

    getSalary = async (id) => {

        let allData = await getDoc(doc(salaryCollectionRef, id))
        console.log('success2', allData)
        return {
            ...allData.data(),
            id: allData.id,
        };
    };

}

export default new EmployeeNetSalary();
