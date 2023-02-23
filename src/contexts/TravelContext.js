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
  `companyprofile/${compId}/travels`
);

class travelContext {
  getCompId = () => {
    compId = sessionStorage.getItem("compId");
    companyTravelCollectionRef = collection(
      db,
      `companyprofile/${compId}/travels`
    );
    return;
  };

  addTravel = async (travelData) => {
    await addDoc(companyTravelCollectionRef, travelData);
    return;
  };
}

export default new travelContext();
