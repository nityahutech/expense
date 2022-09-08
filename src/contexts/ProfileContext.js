import { db } from "../firebase-config";

import {
    collection,
    getDoc,
    addDoc,
    updateDoc,
    doc,
} from "firebase/firestore";

const profileCollectionRef = collection(db, "users");

class ProfileContext {

    addProfile = (newProfile) => {
        return addDoc(profileCollectionRef, newProfile);
    };

    updateProfile = (id, updatedProfile) => {
        const profileDoc = doc(db, profileCollectionRef, id);
        return updateDoc(profileDoc, updatedProfile);
    };

    getProfile = (id) => { 
        const profileDoc = doc(db, profileCollectionRef, id);
        return getDoc(profileDoc);
    };
}

export default new ProfileContext();
