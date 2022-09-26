import { db } from "../firebase-config";


import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    deleteDoc,
    updateDoc,
    orderBy
  
} from "firebase/firestore";


const companyholidayCollectionRef = collection(db, "companyholiday");

class CompanyHolidayContext {
    getAllCompanyHoliday = () => {
        const q = query(companyholidayCollectionRef, orderBy("Date", "desc"));
        // console.log(q);
        return getDocs(q);
    };
    createHoliday = (newLeave) => {
        return addDoc(companyholidayCollectionRef, newLeave);
    };
    deleteHoliday = (id) => {
        const holidayDoc = doc(db, "companyholiday", id);
        return deleteDoc(holidayDoc);
    };
    updateHoliday = (id, updateHoliday) => {
        const holidayDoc = doc(db, "companyholiday", id);
        return updateDoc(holidayDoc, updateHoliday);
    };

}

export default new CompanyHolidayContext();
