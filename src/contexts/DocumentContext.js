import { db } from "../firebase-config";

import {
    collection,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const documentCollectionRef = collection(db, "document");

class DocumentContext {

    addDocument = (id, newDocument) => {
        return setDoc(doc(db, "document",id), newDocument);
    };

    updateDocument = (id, updateDocument) => {
        const documentDoc = doc(db, "document", id);
        return updateDoc(documentDoc, updateDocument);
    };

    deleteDocument = (id) => {
        const documentDoc = doc(db, "document", id);
        return deleteDoc(documentDoc);
    };
    getDocument = async (id) => { 
        const documentDoc = doc(db, "document", id);
        let temp = await getDoc(documentDoc);
        return temp.data();
    };

}

export default new DocumentContext();
