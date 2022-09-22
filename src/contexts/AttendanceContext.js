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
    deleteDoc,
    doc,
    where,
    limit, 
    Timestamp
} from "firebase/firestore";

const attendCollectionRef = collection(db, "attendance");

class AttendanceContext {

    addClockData = (record) => {
        return addDoc(attendCollectionRef, record);
    };

    updateClockData = async (id, record) => {

        const q = query(attendCollectionRef, where("date","==",moment().format("DD-MM-YYYY")), where("empId", "==", id), where("clockOut","==",null),limit(1))
        let rec = await getDocs(q);
        let d = rec.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        console.log(d[0])
        const attendDoc = doc(db, "attendance", d[0].id);
        updateDoc(attendDoc, record)
        return 
    };

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

    getAllAttendance = (id) => {
        const q = query(attendCollectionRef, where("empId", "==", id));
        // console.log(q);
        return getDocs(q);
    };


    getAllAttendanceById = () => {
        const q = query(attendCollectionRef, orderBy("date", "desc"));
        // console.log(q);
        return getDocs(q);
    };

    getAttendance = (id) => { 
        const q = query(attendCollectionRef, where("empId", "==", id),limit(1))
        const attendDoc = doc(db, "attendance", id);
        return getDoc(q);
    };
}

export default new AttendanceContext();
