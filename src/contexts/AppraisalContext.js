import { db } from "../firebase-config";
import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    orderBy,
    deleteDoc,
    updateDoc,
    where
} from "firebase/firestore";


const appraisalCollectionRef = collection(db, "appraisal");

class AppraisalContext {
    getAllAppraisal = () => {
        const q = query(appraisalCollectionRef, orderBy("Period", "desc"));
        return getDocs(q);
    };

    getUserAppraisal = (id) => {
        const q = query(appraisalCollectionRef, where("empId", "==", id));
        // console.log(q);
        return getDocs(q);
    }

    createAppraisal = (appraisal) => {
        console.log('appraisal', 'received in service')
        return addDoc(appraisalCollectionRef, appraisal);
    };

    deleteAppraisal = (id) => {
        const appraisal = doc(db, "appraisal", id);
        return deleteDoc(appraisal);
    };

    updateAppraisal = (id, updateAppraisal) => {
        const apprasialDoc = doc(db, "appraisal", id);
        return updateDoc(apprasialDoc, updateAppraisal);
    };
}


export default new AppraisalContext();
