import { db } from "../firebase-config";
import {
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
    setDoc,
    arrayRemove,
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");

class ConfigureContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        return;
    }

    getConfigurations = async (page) => {
        console.log(compId)
        const rec = await getDoc(doc(db, `companyprofile/${compId}/configurations`, page));
        return rec.data();
    };
    
    createConfiguration = (page, config) => {
        return setDoc(doc(db, `companyprofile/${compId}/configurations`, page), config);
    };

    addConfigurations = (page, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, {[`${field}`]: arrayUnion(...values[`${field}`])});
    };

    updateConfigurations = async (page, oldValues, values) => {
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(oldValues)[0]
        await updateDoc(newHoliday, {[`${field}`]: arrayRemove(oldValues[`${field}`])});
        updateDoc(newHoliday, {[`${field}`]: arrayUnion(values[`${field}`])});
    };

    deleteConfigurations = (page, values) => {
        console.log(values)
        const newHoliday = doc(db, `companyprofile/${compId}/configurations`, page);
        let field = Object.keys(values)[0]
        return updateDoc(newHoliday, {[`${field}`]: arrayRemove(values[`${field}`])});
    };

    leaveTypeConfiguration = (config) => {
        let name = config.name;
        delete config.name;
        config ={
            ...config,
            weekendBtwnLeave: false,
            holidaysBtwnLeave: false,
            creditable: true,
            frequency: "Monthly",
            period: "Start",
            probation: true,
            carryForward: false,
        }
        return updateDoc(doc(db, `companyprofile/${compId}/configurations/`, "leaveType"), {[`${name}`]: config});
    };

}


export default new ConfigureContext();
