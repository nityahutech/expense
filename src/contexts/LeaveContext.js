import { db } from "../firebase-config";

import {
    collection,
    getDoc,
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

    getLeave = (id) => { 
        const leaveDoc = doc(db, "leave", id);
        return getDoc(leaveDoc);
    };
}

export default new LeaveContext();
