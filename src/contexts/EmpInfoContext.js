import { db, storage } from "../firebase-config";
import { changeAccount } from "./EmailContext";
import {
    getDoc,
    updateDoc,
    doc,
    collection,
    getDocs,
    query,
    where,
    arrayRemove,
    arrayUnion,
    addDoc
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
        updateDoc(doc(db, `companyprofile/${compId}/users`, id), { disabled: true });
        return changeAccount(id, { disabled: true });
    };

    idExists = async (id) => {
        let q = query(collection(db, `companyprofile/${compId}/users`), where("empId", "==", id));
        let d = await getDocs(q);
        return d.docs.length > 0;
    };

    //----------------------------------------------------

    deleteCompInfo = (id, deleteContact) => {
        const companyDoc = doc(db, `companyprofile/${compId}/users`, id);
        let field = Object.keys(deleteContact)[0];
        return updateDoc(companyDoc, {
            [`${field}`]: arrayRemove(deleteContact[`${field}`]),
        });
    };


    addCompInfo = (id, addContact) => {
        const companyDoc = doc(db, `companyprofile/${compId}/users`, id);
        console.log('value', companyDoc)
        let field = Object.keys(addContact)[0];
        return updateDoc(companyDoc, {
            [`${field}`]: arrayUnion(addContact[`${field}`]),
        });
    };



    editCompInfo = async (id, oldCompInfo, newCompInfo) => {
        const companyDoc = doc(db, `companyprofile/${compId}/users`, id);
        let field = Object.keys(newCompInfo)[0];
        // await updateDoc(companyDoc, {
        //     [`${field}`]: arrayRemove(oldCompInfo[`${field}`]),
        // });
        updateDoc(companyDoc, {
            [`${field}`]: arrayUnion(newCompInfo[`${field}`]),
        });
        return;
    };




}

export default new EmpInfoContext();