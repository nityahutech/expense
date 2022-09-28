
import { db } from "../firebase-config";
import moment from "moment";
import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    // update,
    deleteDoc,
    doc,
    where,
    limit, 
    runTransaction,
    get
} from "firebase/firestore";

const attendCollectionRef = collection(db, "attendance");
const usersCollectionRef = collection(db, "users");
const leaveCollectionRef = collection(db, "leave");

class AttendanceContext {

    addClockData = (record) => {
        return addDoc(attendCollectionRef, record);
    };

    updateClockData = async (id, record) => {
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), where("clockOut","==",null), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        console.log(d)
        const attendDoc = doc(db, "attendance", d[0].id);
        updateDoc(attendDoc, record)
        return 
    };

    // fixNullClock = async () => {
    //     const q = query(attendCollectionRef, where("date","!=",moment().format("DD-MM-YYYY")), where("clockOut","==",null))
    //     let rec = await transaction.get(q);
    //     let d = rec.docs.map((doc) => {
    //         return {
    //             id: doc.id,
    //             clockOut: "23:59:59"
    //         };
    //     });
    //     console.log(d)
    //     const attendDoc = doc(db, "attendance", d[0].id);
    //     update(attendDoc, record)
    // }

    getStartTime = async (id) =>{
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), where("clockOut","==",null), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        console.log("clock", d[0] ? "true" : "false")
        return d[0] ? d[0].clockIn : undefined;
    }

    addAttendance = (record) => {
        return addDoc(attendCollectionRef, record);
    };

    updateAttendance = async (id, record) => {
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        console.log(d)
        const attendDoc = doc(db, "attendance", d[0].id);
        updateDoc(attendDoc, record)
        return 
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

    getAllUsers = () => {
        const q = query(usersCollectionRef, orderBy("empId", "asc"));
        // console.log(q);
        return getDocs(q);
    };


    getAllByTotal = () => {
        const q = query(attendCollectionRef, orderBy("subtotal", "desc"));
        // console.log(q);
        return getDocs(q);
    };

    getStatus = async () => {
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")));
        let stats = await getDocs(q);
        let res = stats.docs.map((doc) => {
          return {
            id: doc.data().empId,
            name: doc.data().name,
            project: doc.data().project,
            report: doc.data().report
          };
        });
        return res;
    };

    getLeaveStatus = async () => {
        const q = query(leaveCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("status", "==", "Approved"));
        let stats = await getDocs(q);
        let res = stats.docs.map((doc) => {
          return {
            id: doc.data().empId,
            name: doc.data().name,
            project: doc.data().project,
            report: doc.data().report
          };
        });
        return res;
    }

    getAttendance = (id) => { 
        const q = query(attendCollectionRef, where("empId", "==", id),limit(1))
        const attendDoc = doc(db, "attendance", id);
        return getDoc(q);
    };
    getStartTime = async (id) =>{
        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), where("clockOut","==",null), limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        return d[0].clockIn;
    }
}

export default new AttendanceContext();
