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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
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
  // addAsset = async (assetData) => {
  //   return addDoc(companyAssetCollectionRef, assetData);
  // };

  addAsset = (newLaptop, file) => {
    if (file) {
      const storageRef = ref(
        storage,
        `/${compId != "undefined" ? compId : "admins"}/${
          newLaptop.empId
        }/files/${file.name}`
      );
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          newLaptop.upload = url;
          newLaptop.fileName = file.name;
          addDoc(
            collection(
              db,
              compId != "undefined"
                ? `companyprofile/${compId}/assets`
                : "admins/assets"
            ),
            newLaptop
          );
          return Promise.resolve();
        });
      });
    } else {
      newLaptop.upload = null;
      addDoc(companyAssetCollectionRef, newLaptop);
      return Promise.resolve();
    }
  };

  addRepairRequest = async (repairRequestData) => {
    return addDoc(companyAssetCollectionRef, repairRequestData);
  };

  getRepairData = async (id) => {
    const q = query(
      companyAssetCollectionRef,
      where("empId", "==", id),
      where("type", "in", ["Repair", "Upgrade"])
      // where("type", "==", "Repair")
    );

    const empRepair = await getDocs(q);
    let rec = empRepair.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec;
  };

  updateRepairData = (id, updateRepair) => {
    updateDoc(doc(companyAssetCollectionRef, id), updateRepair);
    return Promise.resolve();
  };

  deleteRepairData = (id) => {
    const deleteData = doc(companyAssetCollectionRef, id);
    return deleteDoc(deleteData);
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
      where("type", "==", "Allotment")
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
