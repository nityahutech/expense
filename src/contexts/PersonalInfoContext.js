import { db } from "../firebase-config";

import {
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

class PersonalInfoContext {

    addInfo = async (id, newInfo) => {
        return setDoc(doc(db, "personalInfo", id), newInfo);
    };

    updateInfo = (id, updatedInfo) => {
        const infoDoc = doc(db, "personalInfo", id);
        return updateDoc(infoDoc,this.updateInfo);
    };

    getInfo = async (id) => { 
        const infoDoc = doc(db, "personalInfo", id);
        let rec = await getDoc(infoDoc);
        return rec.data();
    };
    deleteInfo = (id) => {
        const infoDoc = doc(db, "personalInfo", id);
        return deleteDoc(infoDoc);
      };
}

export default new PersonalInfoContext();