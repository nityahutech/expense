import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const leaveCollectionRef = collection(db, "leave");

class LeaveContext {

    createLeave = (newLeave) => {
        return addDoc(leaveCollectionRef, newLeave);
    };

    deleteLeave = (id) => {
        const leaveDoc = doc(db, "leave", id);
        return deleteDoc(leaveDoc);
    };

    // getLeave = (id) => { 
    //     const leaveDoc = doc(db, "leave", id);
    //     return getDoc(leaveDoc);
    // };
    getAllById = (id) => {
        const q = query(leaveCollectionRef,where("empId","==",id));
        // console.log(q);
        return getDocs(q);
    };
}

export default new LeaveContext();
