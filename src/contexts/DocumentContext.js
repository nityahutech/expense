import { db } from "../firebase-config";

import {
    collection,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const documentCollectionRef = collection(db, "document");

class DocumentContext {

    addDocument = (newDocument) => {
        return addDoc(documentCollectionRef, newDocument);
    };

    updateDocument = (id, updateDocument) => {
        const documentDoc = doc(db, "document", id);
        return updateDoc(documentDoc, updateDocument);
    };

    deleteDocument = (id) => {
        const documentDoc = doc(db, "document", id);
        return deleteDoc(documentDoc);
    };
    getDocument = (id) => { 
        const documentDoc = doc(db, "expenses", id);
        return getDoc(documentDoc);
    };

    // getAllDocument = () => {
    //     const q = query(documentCollectionRef, orderBy("date", "desc"));
    //     // console.log(q);
    //     return getDocs(q);
    // };
}

export default new DocumentContext();
