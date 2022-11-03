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

const policyCollectionRef = collection(db, "policy");

class PolicyContext {

    createPolicy = (id,updateCompInfo, file) => {
        if (file) {
            const storageRef = ref(storage, `/policy/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    updateCompInfo.upload = url;
                    updateCompInfo.fileName = file.name
                    console.log("FINAL", id)
                    addDoc(policyCollectionRef,updateCompInfo)
                    return Promise.resolve();
                })
            });
        } else {
            console.log("FINAL", id) 
            addDoc(policyCollectionRef, updateCompInfo)
            return Promise.resolve();
        }
    };
    updatePolicy = (id, updateDocument) => {
        const documentDoc = doc(db, "policy", id);
        return updateDoc(documentDoc, updateDocument);
    };

    deletePolicy = (id, file) => {
        if(file) {
            const storageRef = ref(storage, `/policy/${file}`);
            deleteObject(storageRef)
        }
        const documentDoc = doc(db, "policy", id);
        return deleteDoc(documentDoc);
    };
    getPolicy = async (compId) => { 
        const q = query(policyCollectionRef);
        let temp = await getDocs(q);
        let req = temp.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        console.log(req)
        return req;
    };

}

export default new PolicyContext();
