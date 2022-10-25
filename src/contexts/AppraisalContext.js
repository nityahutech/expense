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
    where,
    getFirestore,
    writeBatch

} from "firebase/firestore";


const appraisalCollectionRef = collection(db, "appraisal");

class AppraisalContext {
    getAllAppraisal = () => {
        const q = query(appraisalCollectionRef, orderBy("quarter", "desc"));
        return getDocs(q);
    };

    getLeadAppraisal = (leadName) => {
        const q = query(appraisalCollectionRef, where("lead", "==", leadName));
        return getDocs(q);
    };

    getManagerAppraisal = (mgrName) => {
        const q = query(appraisalCollectionRef, where("repManager", "==", mgrName));
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

    createBatchAppraisal = (appraisalList) => {
        console.log('appraisal received in service', appraisalList)
        var db = getFirestore();
        const batch = writeBatch(db);

        appraisalList.forEach((appraisal) => {
            addDoc(appraisalCollectionRef, appraisal);
        });
        return batch.commit()

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
