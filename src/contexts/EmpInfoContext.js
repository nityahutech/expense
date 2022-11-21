import { db } from "../firebase-config";
import { disableAccount } from "./EmailContext"
import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

class EmpInfoContext {

    addEduDetails = async (id, newEdu) => {
        return setDoc(doc(db, `companyprofile/${compId}/users`, id), newEdu);
    };

    updateEduDetails = (id, updateEdu) => {
        const eduDoc = doc(db, `companyprofile/${compId}/users`, id);
        return updateDoc(eduDoc, updateEdu);
    };

    getEduDetails = async (id, compid) => {
        let tempId = compid ? compid : compId
        const eduDoc = doc(db, `companyprofile/${tempId}/users`, id);
        let rec = await getDoc(eduDoc);
        return rec.data();
    };
    
    disablePerson = (id) => {
        updateDoc(doc(db,`companyprofile/${compId}/users`, id), { disabled: true })
        return disableAccount(id, true)
    };

    enablePerson = (id) => {
        updateDoc(doc(db,`companyprofile/${compId}/users`, id), { disabled: false })
        return disableAccount(id, false)
    };

}

export default new EmpInfoContext();