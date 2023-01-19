import { db, storage } from "../firebase-config";
import { addDoc, collection } from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

const companyInvoiceCollectionRef = collection(
  db,
  `companyprofile/${compId}/invoices`
);

class InvoiceContext {
  addInvoice = (invoiceData) => {
    return addDoc(companyInvoiceCollectionRef, invoiceData);
  };
}

export default new InvoiceContext();
