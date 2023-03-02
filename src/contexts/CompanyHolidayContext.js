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

    getAllCompanyHoliday = async () => {
        const q = query(companyholidayCollectionRef, orderBy("date", "asc"));
        let data = await getDocs(q);
        return data.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
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
