import { db } from "../firebase-config";

import {
    collection,
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

class ProfileContext {

    addProfile = (id, newProfile) => {
        return setDoc(doc(db, "users", id), newProfile);
    };

    updateProfile = (id, updatedProfile) => {
        const profileDoc = doc(db, "users", id);
        return updateDoc(profileDoc, updatedProfile);
    };

    getProfile = (id) => { 
        const profileDoc = doc(db, "users", id);
        return getDoc(profileDoc);
    };
}

export default new ProfileContext();
