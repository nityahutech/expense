import { db } from "../firebase-config";
import {
    getDoc,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    setDoc,
    arrayRemove,
    deleteDoc,
    collection
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");

class ConfigureContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        return;
    }

    getAllConfigurations = async () => {
        const rec = await getDocs(collection(db, `companyprofile/${compId}/configurations`));
        let data = {};
        rec.docs.forEach(doc => data[doc.id] = {...doc.data()});
        // console.log(data);
        return data;
    };

    getConfigurations = async (page) => {
        const rec = await getDoc(doc(db, `companyprofile/${compId}/configurations`, page));
        return rec.data();
    };

    createConfiguration = (page, config) => {
        return setDoc(doc(db, `companyprofile/${compId}/configurations`, page), config);
    };

    addConfigurations = (page, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, { [`${field}`]: arrayUnion(...values[`${field}`]) });
    };

    updateConfigurations = async (page, oldValues, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(oldValues)[0]
        await updateDoc(newHoliday, { [`${field}`]: arrayRemove(oldValues[`${field}`]) });
        updateDoc(newHoliday, { [`${field}`]: arrayUnion(values[`${field}`]) });
    };

    deleteConfigurations = (page, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, { [`${field}`]: arrayRemove(values[`${field}`]) });
    };

    editConfiguration = (page, config) => {
        return updateDoc(doc(db, `companyprofile/${compId}/configurations/`, page), config);
    };

    // ------------------------payRoll--------------------------------------------

    createConfigurationsEarning = (page, config) => {
        return updateDoc(doc(db, `companyprofile/${compId}/configurations`, page), config);
    }

    createConfigurationsDeduction = (page, config) => {
        return updateDoc(doc(db, `companyprofile/${compId}/configurations`, page), config);
    }

    getEarningConfig = async (page) => {
        const rec = await getDoc(doc(db, `companyprofile/${compId}/configurations`, page));
        return rec.data();
    };

  


}


export default new ConfigureContext();
