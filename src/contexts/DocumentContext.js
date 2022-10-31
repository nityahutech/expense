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

const documentCollectionRef = collection(db, "document");

class DocumentContext {

    addDocument = (newDocument, file) => {
        if (file) {
            const storageRef = ref(storage, `/files/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    console.log(url);
                    newDocument.upload = url;
                    newDocument.fileName = file.name
                    console.log("FINAL", newDocument)
                    addDoc(documentCollectionRef, newDocument)
                    return Promise.resolve();
                })
            });
        } else {
            console.log("FINAL", newDocument) 
            addDoc(documentCollectionRef, newDocument)
            return Promise.resolve();
        }
    };

    updateDocument = (id, updateDocument) => {
        const documentDoc = doc(db, "document", id);
        return updateDoc(documentDoc, updateDocument);
    };

    deleteDocument = (id, file) => {
        if(file) {
            const storageRef = ref(storage, `/files/${file}`);
            deleteObject(storageRef)
        }
        const documentDoc = doc(db, "document", id);
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
        console.log(req)
        return req;
    };

}

export default new DocumentContext();
