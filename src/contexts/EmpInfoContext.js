import { db, storage } from "../firebase-config";
import { disableAccount } from "./EmailContext"
import {
    setDoc,
    getDoc,
    updateDoc,
    doc,
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

let compId = sessionStorage.getItem("compId");

class EmpInfoContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        console.log(compId)
        return;
    }

    updateEduDetails = (id, updateEdu, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId}/${id}/profilePic`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url)
                    updateEdu.profilePic = url;
                    const eduDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/users` : "admins", id);
                    return updateDoc(eduDoc, updateEdu);
                })
            });
        } else {
            if (updateEdu.profilePic == null) {
                deleteObject(ref(storage, `/${compId}/${id}/profilePic`))
            }
            const eduDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/users` : "admins", id);
            return updateDoc(eduDoc, updateEdu);
        }
    };

    getEduDetails = async (id, compid) => {
        let tempId = compid ? compid : compId
        console.log(id, compid, tempId, compId, tempId == "undefined" || !tempId ? "admins" : `companyprofile/${tempId}/users`)
        const eduDoc = doc(db, tempId == "undefined" || !tempId ? "admins" : `companyprofile/${tempId}/users`, id);
        let rec = await getDoc(eduDoc);
        console.log(rec.data())
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