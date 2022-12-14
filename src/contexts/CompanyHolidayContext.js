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


const companyholidayCollectionRef = collection(db, "companyholiday");

class CompanyHolidayContext {
    getAllCompanyHoliday = () => {
        const q = query(companyholidayCollectionRef, orderBy("Date", "asc"));
        // console.log(q);
        return getDocs(q);
    };
    
    createHoliday = (newHoliday) => {
        return addDoc(companyholidayCollectionRef, newHoliday);
    };

    deleteHoliday = (id) => {
        const newHoliday = doc(db, "companyholiday", id);
        return deleteDoc(newHoliday);
    };
}


export default new CompanyHolidayContext();
