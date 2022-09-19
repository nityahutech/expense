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

const attendCollectionRef = collection(db, "attendance");

class ExpenseContext {

    addAttendance = (record) => {
        return addDoc(attendCollectionRef, record);
    };

    updateAttendance = (id, record) => {
        const attendDoc = doc(db, "attendance", id);
        return updateDoc(attendDoc, record);
    };

    deleteAttendance = (id) => {
        const attendDoc = doc(db, "attendance", id);
        return deleteDoc(attendDoc);
    };

    getAllAttendance = () => {
        const q = query(attendCollectionRef, orderBy("date", "desc"));
        // console.log(q);
        return getDocs(q);
    };


    getAllByTotal = () => {
        const q = query(attendCollectionRef, orderBy("subtotal", "desc"));
        // console.log(q);
        return getDocs(q);
    };

    getAttendance = (id) => { 
        const attendDoc = doc(db, "attendance", id);
        return getDoc(attendDoc);
    };
}

export default new ExpenseContext();
