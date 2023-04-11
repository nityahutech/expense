import { db, storage } from "../firebase-config";
import {
    addDoc,
    arrayUnion,
    collection,
    doc,
    setDoc,
    updateDoc,
} from "firebase/firestore";

let compId = sessionStorage.getItem("compId");
let companyNotificationTemplateCollectionRef = collection(
    db,
    `companyprofile/${compId}/template`
);

class notificationTemplate {
    // getCompId = () => {
    //     compId = sessionStorage.getItem("compId");
    //     companyTravelCollectionRef = collection(
    //         db,
    //         `companyprofile/${compId}/notificationTemplate`
    //     );
    //     return;
    // };

    addBirthdayNotification = async (templateData, fileName) => {
        console.log(templateData, fileName)
        await setDoc(companyNotificationTemplateCollectionRef, templateData, fileName);
        return;
    };

    // getAllTravel = async () => {
    //     const getTravelData = await getDocs(companyTravelCollectionRef);
    //     let rec = getTravelData.docs.map((doc) => {
    //         return {
    //             ...doc.data(),
    //             id: doc.id,
    //         };
    //     });
    //     return rec;
    // };

    // updateTravelData = async (id, updateTravel) => {
    //     return await updateDoc(
    //         doc(db, `companyprofile/${compId}/travels`, id),
    //         updateTravel
    //     );
    // };
}

export default new notificationTemplate();
