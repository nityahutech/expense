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


const companyholidayCollectionRef = (compId) => {return collection(db, `companyprofile/${compId}/companyholiday`);}

class CompanyHolidayContext {
    getAllCompanyHoliday = (compId) => {
        const q = query(companyholidayCollectionRef(compId), orderBy("date", "asc"));
        // console.log(q);
        return getDocs(q);
    };
    
    createHoliday = (newHoliday, compId) => {
        return addDoc(companyholidayCollectionRef(compId), newHoliday);
    };

    deleteHoliday = (id, compId) => {
        const newHoliday = doc(db, `companyprofile/${compId}/companyholiday`, id);
        return deleteDoc(newHoliday);
    };
}


export default new CompanyHolidayContext();
