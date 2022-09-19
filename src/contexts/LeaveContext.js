import { db } from "../firebase-config";
import ProfileContext from "./ProfileContext";

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

    getLeaveDays = async (records, id) => {
        let rec = await ProfileContext.getProfile(id);
        this.leaveDays = {
            "Earn Leave": rec.data()["Earn Leave"],
            "Sick Leave": rec.data()["Sick Leave"],
            "Casual Leave": rec.data()["Casual Leave"],
            "Optional Leave": rec.data()["Optional Leave"]
        }
        console.log(this.leaveDays)
        records.forEach((rec) => {
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
