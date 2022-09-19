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
import moment from "moment";

const leaveCollectionRef = collection(db, "leave");

class LeaveContext {

    leaves = [];
    leaveDays = {};

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

    getLeaveDays = (records) => {
        console.log(records);
        this.leaveDays = {
            "Earn Leave": "12",
            "Sick Leave": "12",
            "Casual Leave": "12",
            "official Leave": "2"
        }
        records.forEach((rec) => {
            console.log(rec)
            let date1 = moment(rec.dateCalc[0], "Do MMM, YYYY");
            let date2 = moment(rec.dateCalc[1], "Do MMM, YYYY");
            let dur = date2.diff(date1,'days') + 1;
            // let nature = rec.nature;
            this.leaveDays[rec.nature] -= dur;
            console.log(rec.nature, this.leaveDays[rec.nature])
        })
        console.log(this.leaveDays)
        return this.leaveDays
    }
}

export default new LeaveContext();
