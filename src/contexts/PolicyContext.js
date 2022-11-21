import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId")
const policyCollectionRef = collection(db, `companyprofile/${compId}/policy`);

class PolicyContext {

    createPolicy = (updateCompInfo, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId}/policy/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateCompInfo.upload = url;
                    updateCompInfo.fileName = file.name
                    addDoc(policyCollectionRef, updateCompInfo)
                    return Promise.resolve();
                })
            });
        } else {
            addDoc(policyCollectionRef, updateCompInfo)
            return Promise.resolve();
        }
    };

    // updatePolicy = (id, updateDocument) => {
    //     const documentDoc = doc(db, "policy", id);
    //     return updateDoc(documentDoc, updateDocument);
    // };

    deletePolicy = (id, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId}/policy/${file}`);
            deleteObject(storageRef)
        }
        const documentDoc = doc(db, `companyprofile/${compId}/policy`, id);
        return deleteDoc(documentDoc);
    };



    getPolicy = async () => {
        const q = query(policyCollectionRef);
        let temp = await getDocs(q);
        let req = temp.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        return req;
    };

}

export default new PolicyContext();
