import { db, storage } from "../firebase-config";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  doc
} from "firebase/firestore";
import { async } from "@firebase/util";

const compId = sessionStorage.getItem("compId");

const companyAssetCollectionRef = collection(
  db,
  `companyprofile/${compId}/assets`
);


// const companyRepairCollectionRef = collection(
//   db, `companyprofile/${compId}/assets`, "repairs"
// );

class AssetContext {
  addAsset = async (assetData) => {
    return addDoc(companyAssetCollectionRef, assetData);
  };

  addRepairRequest = async (repairRequestData) => {
    // addDoc(collection(db, compId != "undefined" ? `companyprofile/${compId}/assets/repair` : "admins/assets/repair"), repairRequestData)
    // return addDoc(companyRepairCollectionRef, repairRequestData);
    // setDoc(doc(db, `companyprofile/${compId}/assets`, "repairs"), {
    //   lapname: repairRequestData.lapname,
    //   modalName: repairRequestData.modalName,
    //   serialNum: repairRequestData.serialNum,
    //   dateOfRepair: repairRequestData.dateOfRepair,
    //   repairDes: repairRequestData.repairDes,
    //   empId: repairRequestData.empId,
    // });

    return addDoc(companyAssetCollectionRef, repairRequestData);
  };

  getRepairData = async (id) => {
    const q = query(
      companyAssetCollectionRef,
      where("empId", "==", id),
      where("type", "==", "Repair"),
      // where("type", "==", "Repair")
    );
    console.log('qqqqq', q)
    const empRepair = await getDocs(q);
    let rec = empRepair.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec
  };

  //---------------------------------------------------------------

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
      where("type", "==", "Allotment"),
      // where("type", "==", "Repair")
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
