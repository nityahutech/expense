import { db } from "../firebase-config";

import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

class EmpInfoContext {

    addProfile = async (id, newProfile) => {
        return setDoc(doc(db, "empDetails", id), newProfile);
    };

    updateProfile = (id, updatedProfile) => {
        const profileDoc = doc(db, "empDetails", id);
        return updateDoc(profileDoc, updatedProfile);
    };

    getProfile = async (id) => { 
        const profileDoc = doc(db, "empDetails", id);
        let rec = await getDoc(profileDoc);
        return rec.data();
    };
}

export default new EmpInfoContext();