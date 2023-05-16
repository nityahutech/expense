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
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";

import { async } from "@firebase/util";

let compId = sessionStorage.getItem("compId");

let companyAssetCollectionRef = collection(
    db,
    `companyprofile/${compId}/request`
);

class RequestContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        companyAssetCollectionRef = collection(
            db,
            `companyprofile/${compId}/request`
        );
        return;
    };

    addAsset = (newLaptop, file) => {
        if (file) {
            const storageRef = ref(
                storage,
                `/${compId != "undefined" ? compId : "admins"}/${newLaptop.empId
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
                                ? `companyprofile/${compId}/request`
                                : "admins/request"
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


    //-------------------Repair Request------------------------------------

    addRepairRequest = (repairRequestData, file) => {
        if (file) {
            console.log("ffff", repairRequestData, file);
            const storageRef = ref(
                storage,
                `/${compId != "undefined" ? compId : "admins"}/${repairRequestData.empId
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
                                ? `companyprofile/${compId}/request`
                                : "admins/request"
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
    updateRepairData = (id, updateRepair, file) => {
        if (file) {
            const storageRef = ref(storage, `/${compId != "undefined" ? compId : "compId"}/request/${file.name}`);
            uploadBytesResumable(storageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    updateRepair.upload = url;
                    updateRepair.fileName = file.name
                    const documentDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/request` : "admins/documents/document", id);
                    updateDoc(documentDoc, updateRepair);
                    return Promise.resolve();
                })
            });
        } else {
            if (updateRepair?.upload && updateRepair.upload == null) {
                deleteObject(ref(storage, `/${compId != "undefined" ? compId : "admins"}/${updateRepair.empId}/files/${file.name}`));
            }
            const documentDoc = doc(db, compId != "undefined" ? `companyprofile/${compId}/request` : "admins/documents/document", id);
            updateDoc(documentDoc, updateRepair);
            return Promise.resolve();
        }
    };

    // updateRepairData = (id, updateRepair) => {
    //     updateDoc(doc(companyAssetCollectionRef, id), updateRepair);
    //     return Promise.resolve();
    // };

    deleteRepairData = (id) => {
        const deleteData = doc(companyAssetCollectionRef, id);
        return deleteDoc(deleteData);
    };

    //---------------------------------------------------------------

    getAllAsset = async () => {
        const q = await getDocs(companyAssetCollectionRef);
        console.log('ddddd', q)
        let rec = q.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        return rec;
    };
}

export default new RequestContext();
