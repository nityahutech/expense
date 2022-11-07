import { db } from "../firebase-config";


import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    orderBy,
    deleteDoc,


  
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

const companyholidayCollectionRef = collection(db, `companyprofile/${compId}/companyholiday`);

class CompanyHolidayContext {
    getAllCompanyHoliday = () => {
        const q = query(companyholidayCollectionRef, orderBy("date", "asc"));
        return getDocs(q);
    };
    
    createHoliday = (newHoliday) => {
        return addDoc(companyholidayCollectionRef, newHoliday);
    };

    deleteHoliday = (id) => {
        const newHoliday = doc(db, `companyprofile/${compId}/companyholiday`, id);
        return deleteDoc(newHoliday);
    };
}


export default new CompanyHolidayContext();
