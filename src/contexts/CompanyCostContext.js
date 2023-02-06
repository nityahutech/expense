import { db, storage } from "../firebase-config";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  orderBy,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

const companyCostCollectionRef = collection(
  db,
  `companyprofile/${compId}/costCenter`
);

class CompanyCostContext {
  addCostCenter = (newCost) => {
    addDoc(companyCostCollectionRef, newCost);
    return;
  };

  getCostCenter = async () => {
    const q = await getDocs(companyCostCollectionRef);
    let rec = q.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec;
  };

  updateCostCenter = (id, updateCenter) => {
    updateDoc(doc(companyCostCollectionRef, id), updateCenter);
    return;
  };

  deleteCostCenter = (id) => {
    const deleteData = doc(companyCostCollectionRef, id);
    return deleteDoc(deleteData);
  };
}

export default new CompanyCostContext();
