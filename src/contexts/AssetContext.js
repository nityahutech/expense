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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { async } from "@firebase/util";

let compId = sessionStorage.getItem("compId");

let companyAssetCollectionRef = collection(
  db,
  `companyprofile/${compId}/assets`
);

let companyEmpAssetCollectionRef = collection(
  db,
  `companyprofile/${compId}/empAssets`
);

console.log("compidddd", compId);

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

  addEmpAsset = (newAsset, file) => {
    if (file) {
      console.log("uploadimaggg", newAsset, file);
      const storageRef = ref(storage, `/${compId}/empAssets/${file.name}`);
      console.log("imagesss", storageRef);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          newAsset.upload = url;
          newAsset.file = file.name;
          addDoc(
            collection(
              db,
              compId != "undefined"
                ? `companyprofile/${compId}/empAssets`
                : `companyprofile/${compId}/empAssets`
            ),
            newAsset
          );
          return Promise.resolve();
        });
      });
    } else {
      newAsset.upload = null;
      addDoc(companyEmpAssetCollectionRef, newAsset);
      return Promise.resolve();
    }
  };

  updateEmpAsset = (id, updateAsset, file) => {
    // return new Promise((resolve, reject) => {
    if (file) {
      const storageRef = ref(storage, `/${compId}/empAssets/${file.name}`);
      console.log("storage", storageRef);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          updateAsset.upload = url;
          updateAsset.file = file.name;
          const documentDoc = doc(db, `companyprofile/${compId}/empAssets`, id);
          updateDoc(documentDoc, updateAsset);
          return Promise.resolve();
        });
      });
    } else {
      if (updateAsset?.upload && updateAsset.upload === null) {
        deleteObject(ref(storage, `/${compId}/empAssets/${file.name}`));
      }
      const documentDoc = doc(db, `companyprofile/${compId}/empAssets`, id);
      updateDoc(documentDoc, updateAsset);
      return Promise.resolve();
    }
    // });
  };

  deleteEmpAsset = (id) => {
    const deleteData = doc(companyEmpAssetCollectionRef, id);
    return deleteDoc(deleteData);
  };

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
      where(
        "type",
        "in",
        typeValues
          ? ["Allotment"]
          : ["Laptop Upgrade", "Laptop Return", "Allotment", "Laptop Repair"]
      )
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

  getEmpAsset = async () => {
    const list = await getDocs(companyEmpAssetCollectionRef);
    console.log("listtass", list);
    let rec = list.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec;
  };
}

export default new AssetContext();
