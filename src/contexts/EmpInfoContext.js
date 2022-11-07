import { db } from "../firebase-config";

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

    getEduDetails = async (id) => { 
        const eduDoc = doc(db, `companyprofile/${compId}/users`, id);
        let rec = await getDoc(eduDoc);
        return rec.data();
    };
}

export default new EmpInfoContext();