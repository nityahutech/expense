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

let compId = sessionStorage.getItem("compId");

class DocumentContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        return;
    }

    addDocument = (newDocument, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "admins"}/${newDocument.empId}/files/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    newDocument.upload = url;
                    newDocument.fileName = file.name
                    addDoc(collection(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document"), newDocument)
                    return Promise.resolve();
                })
            });
        } else {
            newDocument.upload = null;
            addDoc(collection(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document"), newDocument)
            return Promise.resolve();
        }
    };

    updateDocument = (id, updateDocument, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "admins"}/${updateDocument.empId}/files/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateDocument.upload = url;
                    updateDocument.fileName = file.name
                    const documentDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document", id);
                    updateDoc(documentDoc, updateDocument);
                    return Promise.resolve();
                })
            });
        } else {
            if (updateDocument?.upload && updateDocument.upload == null) {
                deleteObject(ref(storage, `/${compId != "undefined" ? compId : "admins"}/${updateDocument.empId}/files/${file.name}`));
            }
            const documentDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document", id);
            updateDoc(documentDoc, updateDocument);
            return Promise.resolve();
        }
    };

    deleteDocument = (uid, id, file) => {
        if(file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "admins"}/${uid}/files/${file}`);
            deleteObject(storageRef)
        }
        const documentDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document", id);
        return deleteDoc(documentDoc);
    };

    getDocument = async (empId, type) => { 
        const q = query(collection(db, compId != "undefined" ? `companyprofile/${compId}/document` : "admins/documents/document"), where("empId", "==", empId), where("type", "==", type));
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
