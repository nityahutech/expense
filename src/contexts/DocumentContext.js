import { db } from "../firebase-config";

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
