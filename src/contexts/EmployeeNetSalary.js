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


    // addSalary = (netSalary,) => {
    //     return addDoc(salaryCollectionRef, netSalary);
    // };

    addSalary = (id, netSalary) => {
        setDoc(doc(salaryCollectionRef, id), netSalary);
        return Promise.resolve()
    };

    getSalary = async (empName) => {
        const q = query(salaryCollectionRef, where("selectStaff", "==", empName));
        console.log('success1', q)
        let allData = await getDocs(q)
        let data = allData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });

        return data
    };

    getSalarySlip = async () => {
        const q = query(salaryCollectionRef,);
        console.log('success1', q)
        let allData = await getDocs(q)
        let data = allData.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });

        return data
    };

}

export default new EmployeeNetSalary();
