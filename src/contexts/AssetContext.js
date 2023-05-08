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

let compId = sessionStorage.getItem("compId");

let companyAssetCollectionRef = collection(
  db,
  `companyprofile/${compId}/assets`
);

class AssetContext {

  getCompId = () => {
      compId = sessionStorage.getItem("compId");
      companyAssetCollectionRef = collection(
        db,
        `companyprofile/${compId}/assets`
      );
      return;
  };

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

  // addRepairRequest = async (repairRequestData) => {
  //   return addDoc(companyAssetCollectionRef, repairRequestData);
  // };

  //-------------------Repair Request------------------------------------

  addRepairRequest = (repairRequestData, file) => {
    if (file) {
      console.log("ffff", repairRequestData, file);
      const storageRef = ref(
        storage,
        `/${compId != "undefined" ? compId : "admins"}/${
          repairRequestData.empId
        }/files/${file.name}`
      );
      console.log("ffff", storageRef);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          repairRequestData.upload = url;
          repairRequestData.file = file.name;
          addDoc(
            collection(
              db,
              compId != "undefined"
                ? `companyprofile/${compId}/assets`
                : "admins/assets"
            ),
            repairRequestData
          );
          return Promise.resolve();
        });
      });
    } else {
      repairRequestData.upload = null;
      addDoc(companyAssetCollectionRef, repairRequestData);
      return Promise.resolve();
    }
  };

  getRepairData = async (id, typeValues) => {
    const q = query(
      companyAssetCollectionRef,
      where("empId", "==", id),
      where("type", "in", typeValues ? ["Allotment"] : ["Repair", "Upgrade", "Allotment", "Return"])
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

  //----------------------Update------------------

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
}

export default new AssetContext();
