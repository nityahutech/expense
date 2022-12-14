import { db, storage } from "../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId")
let policyCollectionRef = collection(db, `companyprofile/${compId}/policy`);

class PolicyContext {

    getCompId = () => {
        compId = sessionStorage.getItem("compId");
        policyCollectionRef = collection(db, `companyprofile/${compId}/policy`);
        return;
    }

    createPolicy = (updateCompInfo, file) => {
        const storageRef = ref(storage, `/${compId}/policy/${updateCompInfo.title.replace(" ", "")}_${file.name}_v1`);
        uploadBytesResumable(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                updateCompInfo.versions[0] = {
                    ...updateCompInfo.versions[0],
                    url: url,
                    file: file.name,
                }
                addDoc(policyCollectionRef, updateCompInfo)
                return Promise.resolve();
            })
        });
    };

    updatePolicy = (updateCompInfo, file) => {
        const storageRef = ref(storage, `/${compId}/policy/${updateCompInfo.title.replace(" ", "")}_${file.name}_v${updateCompInfo.versions.length}`);
        uploadBytesResumable(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                let len = updateCompInfo.versions.length - 1
                updateCompInfo.versions[len] = {
                    ...updateCompInfo.versions[len],
                    url: url,
                    file: file.name,
                }
                console.log(updateCompInfo)
                updateDoc(doc(db, `companyprofile/${compId}/policy`, updateCompInfo.id), updateCompInfo)
                return Promise.resolve();
            })
        });
    };

    deletePolicy = (record) => {
        record.versions.forEach((rec) => {
            let storageRef = ref(storage, `/${compId}/policy/${record.title.replace(" ", "")}_${rec.file}_v${rec.version}`);
            deleteObject(storageRef)
        })            
        const documentDoc = doc(db, `companyprofile/${compId}/policy`, record.id);
        return deleteDoc(documentDoc);
    };



    getPolicy = async () => {
        const q = query(policyCollectionRef);
        let temp = await getDocs(q);
        let req = temp.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id
            };
        });
        return req;
    };

}

export default new PolicyContext();
