import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    deleteDoc,
    updateDoc,
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");
let deptCollectionRef = collection(db, `companyprofile/${compId}/department`);

class DepartmentContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        deptCollectionRef = collection(db, `companyprofile/${compId}/department`);
        return;
    }

    getDept = async () => {
        let d = await getDocs(deptCollectionRef);
        let temp = []
        let data = d.docs.map((doc) => {
            doc.data().subDept.map((dep) => {
               temp.push({
                dept: doc.data().department,
                hod: doc.data().hod,
                subDept: dep.subdept,
                hod1: dep.hod1,
                workloc: dep.workloc,
                empnum: 0,          
                id: doc.id
            })
            })
            if (doc.data().subDept.length == 0) {
                temp.push({
                    dept: doc.data().department,
                    hod: doc.data().hod,
                    subDept: "-",
                    hod1: "-",
                    workloc: "-",
                    empnum: 0,          
                    id: doc.id
                })
            }
        });
        return temp;
    };
    
    createDept = (dept) => {
        return addDoc(deptCollectionRef, dept);
    };

    editDept = (id, newDept) => {
        const dept = doc(db, `companyprofile/${compId}/department`, id);
        return updateDoc(dept, newDept);
    };

    deleteDept = (id) => {
        const dept = doc(db, `companyprofile/${compId}/department`, id);
        return deleteDoc(dept);
    };
}


export default new DepartmentContext();
