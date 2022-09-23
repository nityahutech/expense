import { db } from "../firebase-config";


import {
    collection,
    getDocs,
    query,
    orderBy
  
} from "firebase/firestore";


const companyholidayCollectionRef = collection(db, "companyholiday");

class CompanyHolidayContext {
    getAllCompanyHoliday = () => {
        const q = query(companyholidayCollectionRef, orderBy("Date", "desc"));
        // console.log(q);
        return getDocs(q);
    };
}

export default new CompanyHolidayContext();
