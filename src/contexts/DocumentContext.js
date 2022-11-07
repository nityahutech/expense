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

const compId = sessionStorage.getItem("compId");

const documentCollectionRef = collection(db, `companyprofile/${compId}/document`);

class DocumentContext {

    addDocument = (newDocument, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId}/${newDocument.empId}/files/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    newDocument.upload = url;
                    newDocument.fileName = file.name
                    addDoc(documentCollectionRef, newDocument)
                    return Promise.resolve();
                })
            });
        } else {
            newDocument.upload = null;
            addDoc(documentCollectionRef, newDocument)
            return Promise.resolve();
        }
    };

    updateDocument = (id, updateDocument) => {
        const documentDoc = doc(db, `companyprofile/${compId}/document`, id);
        return updateDoc(documentDoc, updateDocument);
    };

    deleteDocument = (uid, id, file) => {
        if(file) {
            const storageRef = ref(storage, `/${compId}/${uid}/files/${file}`);
            deleteObject(storageRef)
        }
        const documentDoc = doc(db, `companyprofile/${compId}/document`, id);
        return deleteDoc(documentDoc);
    };

    getDocument = async (empId, type) => { 
        const q = query(documentCollectionRef, where("empId", "==", empId), where("type", "==", type));
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

export default new DocumentContext();
