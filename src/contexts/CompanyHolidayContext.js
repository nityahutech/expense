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

let compId = sessionStorage.getItem("compId");
let companyholidayCollectionRef = collection(db, `companyprofile/${compId}/companyholiday`);

class CompanyHolidayContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        companyholidayCollectionRef = collection(db, `companyprofile/${compId}/companyholiday`);
        return;
    }

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
