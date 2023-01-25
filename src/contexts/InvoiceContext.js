import { db, storage } from "../firebase-config";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const compId = sessionStorage.getItem("compId");

const companyInvoiceCollectionRef = collection(
  db,
  `companyprofile/${compId}/invoices`
);

class InvoiceContext {
  addInvoice = async (invoiceData, files) => {
    await addDoc(companyInvoiceCollectionRef, invoiceData);
    files.map((file, i) => {
      const storageRef = ref(storage, `/files/${file.name}`);
      uploadBytesResumable(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          invoiceData.payments[i].upload = url;
          invoiceData.payments[i].fileName = file.name;
          console.log(i, url);

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

  getInvoice = async () => {
    const getInvoiceData = await getDocs(companyInvoiceCollectionRef);
    let rec = getInvoiceData.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    return rec;
  };
}

export default new InvoiceContext();
