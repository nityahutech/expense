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

let compId = sessionStorage.getItem("compId");
let companyInvoiceCollectionRef = collection(
  db,
  `companyprofile/${compId}/request`
);

class InvoiceContext {
  getCompId = () => {
    compId = sessionStorage.getItem("compId");
    companyInvoiceCollectionRef = collection(
      db,
      `companyprofile/${compId}/request`
    );
    return;
  };

  addInvoice = async (invoiceData, files) => {
    let payments = [...invoiceData.payments];
    invoiceData.payments = [];
    let data = await addDoc(companyInvoiceCollectionRef, invoiceData);
    console.log(data.id, payments, invoiceData);
    files.map((file, i) => {
      const storageRef = ref(storage, `/files/${file.name}`);
      console.log(file);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(i, url);
    
          updateDoc(doc(db, `companyprofile/${compId}/request`, data.id), {
            payments: arrayUnion({
              ...payments[i],
              upload: url,
              fileName: file.name,
            }),
          });
          console.log({
            ...payments[i],
            upload: url,
            fileName: file.name,
          });
        });
      });
    });
  };

  updateInvoiceData = (id, updateInvoice) => {
    return updateDoc(
      doc(db, `companyprofile/${compId}/request`, id),
      updateInvoice
    );
  };

  getInvoice = async () => {
    const getInvoiceData = await getDocs(companyInvoiceCollectionRef);
    let rec = getInvoiceData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    console.log('ssssssssssss',compId, companyInvoiceCollectionRef, rec);
    return rec;
  };
}

export default new InvoiceContext();
