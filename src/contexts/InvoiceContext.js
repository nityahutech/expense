import { db, storage } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

const companyInvoiceCollectionRef = collection(
  db,
  `companyprofile/${compId}/invoices`
);

class InvoiceContext {
  addInvoice = (invoiceData) => {
    return addDoc(companyInvoiceCollectionRef, invoiceData);
  };

   getInvoice = async ()=>{
    const getInvoiceData = await getDocs(companyInvoiceCollectionRef)
    let rec =  getInvoiceData.docs.map((doc)=>{
      return {
        ...doc.data(),
        id: doc.id,
      }
    })
    return rec;

  }
}

export default new InvoiceContext();
