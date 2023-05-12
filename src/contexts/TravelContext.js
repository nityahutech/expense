import { db, storage } from "../firebase-config";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { async } from "@firebase/util";

let compId = sessionStorage.getItem("compId");

let companyTravelCollectionRef = collection(
  db,
  `companyprofile/${compId}/request`
);

class travelContext {
  getCompId = () => {
    compId = sessionStorage.getItem("compId");
    companyTravelCollectionRef = collection(
      db,
      `companyprofile/${compId}/request`
    );
    return;
  };

  addTravel = async (travelData) => {
    await addDoc(companyTravelCollectionRef, travelData);
    return;
  };

  getAllTravel = async () => {
    const getTravelData = await getDocs(companyTravelCollectionRef);
    let rec = getTravelData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec;
  };

  updateTravelData = async (id, updateTravel) => {
    return await updateDoc(
      doc(db, `companyprofile/${compId}/request`, id),
      updateTravel
    );
  };
}

export default new travelContext();
