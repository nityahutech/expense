import { db, storage } from "../firebase-config";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { async } from "@firebase/util";

const compId = sessionStorage.getItem("compId");

const companyAssetCollectionRef = collection(
  db,
  `companyprofile/${compId}/assets`
);

class AssetContext {
  addAsset = async (assetData) => {
    return addDoc(companyAssetCollectionRef, assetData);
  };

  getAllAsset = async () => {
    const q = await getDocs(companyAssetCollectionRef);
    let rec = q.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
  };

  getEmpAllot = async (id) => {
    const q = query(
      companyAssetCollectionRef,
      where("empId", "==", id),
      where("type", "==", "Allotment")
    );
    const empAllot = await getDocs(q);
    let rec = empAllot.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });

    return rec;
  };
}

export default new AssetContext();
