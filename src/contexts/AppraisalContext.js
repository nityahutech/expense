import { db } from "../firebase-config";


import {
    collection,
    getDocs,
    doc,
    addDoc,
    query,
    orderBy,
    deleteDoc,


  
} from "firebase/firestore";


const appraisalCollectionRef = collection(db, "appraisal");

class AppraisalContext {
    getAllAppraisal = () => {  
        const q = query(appraisalCollectionRef, orderBy("Period", "desc"));
        return getDocs(q);
        
    };
    
    createAppraisal = (appraisal) => {
        console.log('appraisal', 'received in service')
        return addDoc(appraisalCollectionRef, appraisal);
    };

    deleteAppraisal = (id) => {
        const Appraisal = doc(db, "appraisal", id);
        return deleteDoc(id);
    };

 
}


export default new AppraisalContext();
