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
  `companyprofile/${compId}/invoices`
);

class InvoiceContext {
  getCompId = () => {
    compId = sessionStorage.getItem("compId");
    companyInvoiceCollectionRef = collection(
      db,
      `companyprofile/${compId}/invoices`
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
          // invoiceData.payments[i].upload = url;
          // invoiceData.payments[i].fileName = file.name;

          updateDoc(doc(db, `companyprofile/${compId}/invoices`, data.id), {
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

          // return Promise.resolve();
        });
      });
      //   } else {
      //     invoiceData.payments[i].upload = null;
      //     // addDoc(companyInvoiceCollectionRef, invoiceData);
      //     // return Promise.resolve();
      //   }
    });

    // setTimeout(() => {
    //   console.log(invoiceData);
    //   addDoc(companyInvoiceCollectionRef, invoiceData);
    // }, 4000);
  };

  updateInvoiceData = (id, updateInvoice) => {
    return updateDoc(
      doc(db, `companyprofile/${compId}/invoices`, id),
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
