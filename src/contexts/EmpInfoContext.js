import { db } from "../firebase-config";

import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

class EmpInfoContext {

    addEduDetails = async (compId, id, newEdu) => {
        return setDoc(doc(db, `companyprofile/${compId}/users`, id), newEdu);
    };

    updateEduDetails = (compId, id, updateEdu) => {
        const eduDoc = doc(db, `companyprofile/${compId}/users`, id);
        return updateDoc(eduDoc, updateEdu);
    };

    getEduDetails = async (compId, id) => { 
        const eduDoc = doc(db, `companyprofile/${compId}/users`, id);
        let rec = await getDoc(eduDoc);
        return rec.data();
    };
}

export default new EmpInfoContext();