import { db, storage } from "../firebase-config";
import { disableAccount } from "./EmailContext";
import {
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

let compId = sessionStorage.getItem("compId");

class EmpInfoContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        return;
    };

    updateEduDetails = (id, updateEdu, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "admins"}/${id}/profilePic`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateEdu.profilePic = url;
                    const eduDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/users` : "admins", id);
                    return updateDoc(eduDoc, updateEdu);
                });
            });
        } else {
            if (updateEdu?.profilePic && updateEdu.profilePic == null) {
                deleteObject(ref(storage, `/${compId != "undefined" ? compId : "admins"}/${id}/profilePic`));
            }
            const eduDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/users` : "admins", id);
            return updateDoc(eduDoc, updateEdu);
        }
    };

    getEduDetails = async (id, compid) => {
        let tempId = compid ? compid : compId;
        const eduDoc = doc(db, tempId == "undefined" || !tempId ? "admins" : `companyprofile/${tempId}/users`, id);
        let rec = await getDoc(eduDoc);
        return rec.data();
    };
    
    disablePerson = (id) => {
        // updateDoc(doc(db, `companyprofile/${compId}/users`, id), { disabled: true });
        return disableAccount(id, true);
    };

    enablePerson = (id) => {
        updateDoc(doc(db,`companyprofile/${compId}/users`, id), { disabled: false });
        return disableAccount(id, false);
    };

}

export default new EmpInfoContext();