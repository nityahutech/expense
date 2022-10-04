import { db } from "../firebase-config";

import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

class ProfileContext {

    addProfile = async (id, newProfile) => {
        return setDoc(doc(db, "users", id), newProfile);
    };

    updateProfile = (id, updatedProfile) => {
        const profileDoc = doc(db, "users", id);
        return updateDoc(profileDoc, updatedProfile);
    };

    getProfile = async (id) => { 
        const profileDoc = doc(db, "users", id);
        let rec = await getDoc(profileDoc);
        return rec.data();
    };
}

export default new ProfileContext();
