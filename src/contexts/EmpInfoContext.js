import { db } from "../firebase-config";

import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

class EmpInfoContext {

    addEduDetails = async (id, newEdu) => {
        return setDoc(doc(db, "empDetails", id), newEdu);
    };

    updateEduDetails = (id, updateEdu) => {
        const eduDoc = doc(db, "empDetails", id);
        return updateDoc(eduDoc, updateEdu);
    };

    getEduDetails = async (id) => { 
        const eduDoc = doc(db, "empDetails", id);
        let rec = await getDoc(eduDoc);
        return rec.data();
    };
}

export default new EmpInfoContext();