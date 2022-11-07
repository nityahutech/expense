import { db } from "../firebase-config";
import {
    collection,
    getDoc,
    doc,
    addDoc,
    query,
    orderBy,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

class ConfigureContext {

    getConfigurations = async (page) => {
        const rec = await getDoc(doc(db, `companyprofile/${compId}/configurations`, page));
        return rec.data();
    };
    
    // createConfiguration = (page) => {
        //make all the confiurations here and set empty array
    //     return setDoc(doc(db, `companyprofile/${compId}/configurations`), newHoliday);
    // };

    updateConfigurations = (page, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        // may need to change to array functions
        return updateDoc(newHoliday, values);
    };

    // deleteHoliday = (id) => {
    //     const newHoliday = doc(db, `companyprofile/${compId}/configurations`, id);
    //     return deleteDoc(newHoliday);
    // };
}


export default new ConfigureContext();
