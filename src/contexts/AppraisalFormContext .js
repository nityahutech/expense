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


const appraisalFormCollectionRef = collection(db, "appraisalForm");

class AppraisalFormContext {
    getAllAppraisal = () => {  
        const q = query(appraisalFormCollectionRef);
        return getDocs(q);
        
    };
    
    // createAppraisal = (appraisal) => {
    //     console.log('appraisal', 'received in service')
    //     return addDoc(appraisalCollectionRef, appraisal);
    // };

  

 
}


export default new AppraisalFormContext();
