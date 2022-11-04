import { db } from "../firebase-config";
import {
    collection,
    getDoc,
    doc,
    addDoc,
    updateDoc,
    deleteDoc,

} from "firebase/firestore";
const companyProfileCollectionRef = collection(db, "companyprofile");

class CompanyProContext {
    getCompanyProfile = async(id) => {
        const profileInfo= doc(db,"companyprofile",id);
        let rec=await getDoc(profileInfo);
        let recordData=rec.data();
        return recordData;
    };
   
    createCompInfo = (newInfo) => {
        return addDoc(companyProfileCollectionRef,newInfo);
    };

    deleteCompInfo = (id) => {
        const deleteInfo = doc(db, "companyprofile", id);
        return deleteDoc(deleteInfo);
    };
    updateCompInfo = (id, updateCompInfo) => {
        const companyDoc = doc(db, "companyprofile", id);
        return updateDoc(companyDoc, updateCompInfo);
    };
}

export default new CompanyProContext();
