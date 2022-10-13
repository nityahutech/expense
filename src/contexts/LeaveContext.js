import { db } from "../firebase-config";
import ProfileContext from "./ProfileContext";
import {
    collection,
    getDocs,
    query,
    where,
    addDoc,
    deleteDoc,
    updateDoc,
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
        const q = query(leaveCollectionRef, where("empId", "==", id));
        // console.log(q);
        return getDocs(q);
    };
    getAllByApprover = (name) => {
        const q = query(leaveCollectionRef, where("approver", "==", name), where("status", "==", "Pending"));
        // console.log(q);
        return getDocs(q);
    };
    approveLeave = (id) => {
        const leaveDoc = doc(db, "leave", id);
        return updateDoc(leaveDoc, { status: "Approved" })
    }
    rejectLeave = (id) => {
        const leaveDoc = doc(db, "leave", id);
        return updateDoc(leaveDoc, { status: "Rejected" })
    }
    getLeaveDays = async (records, id) => {
        let rec = await ProfileContext.getProfile(id);
        this.leaveDays = {
            "Earn Leave": "12",
            "Sick Leave": "12",
            "Casual Leave": "12",
            "Optional Leave": "2",
            "Total Earn Leave": "12",
            "Total Sick Leave": "12",
            "Total Casual Leave": "12",
            "Total Optional Leave": "2"
        }
        console.log(this.leaveDays)
        records.forEach((rec) => {
            let date1 = moment(rec.dateCalc[0], "Do MMM, YYYY");
            let date2 = moment(rec.dateCalc[1], "Do MMM, YYYY");
            let dur = date2.diff(date1, 'days') + 1;
            if (dur === 1 && rec.slot != 'Full Day') {
                dur = 0.5;
            }
            this.leaveDays[rec.nature] -= dur;
            console.log(rec.nature, this.leaveDays[rec.nature])
        })
        console.log('dddddddddd', this.leaveDays)
        return this.leaveDays
    }
}
export default new LeaveContext();