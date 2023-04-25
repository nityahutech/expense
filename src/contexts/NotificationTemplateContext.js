import { db, storage } from "../firebase-config";
import {
    addDoc,
    getDocs,
    collection,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import {
    deleteObject,
    getDownloadURL,
    ref,
    uploadBytesResumable,
} from "firebase/storage";

let compId = sessionStorage.getItem("compId");
let companyNotificationTemplateCollectionRef = collection(
    db,
    `companyprofile/${compId}/template`
);

class notificationTemplate {

    addNotification = async (id, data,) => {
        console.log('values', id, data)
        const eduDoc = doc(companyNotificationTemplateCollectionRef, id);
        return setDoc(eduDoc, data)

    };


    addTemplate = async (id, data, file) => {
        console.log('values', id, data)
        const storageRef = ref(storage, `/${compId != "undefined" ? compId : "compId"}/templates/${id}/profilePic`);
        console.log('values', storageRef)
        uploadBytesResumable(storageRef, file).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                data.profilePic = url;
                const eduDoc = doc(companyNotificationTemplateCollectionRef, id);
                return setDoc(eduDoc, data)
            });
        });

    };

    getNotification = async () => {
        let req = await getDocs(companyNotificationTemplateCollectionRef)
        console.log('values', req)
        let data = req.docs.map((doc) => {
            return {
                ...doc.data(),
                id: doc.id,
            };
        });
        console.log('values', data)
        return data;
    }




}

export default new notificationTemplate();
