import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getDoc,
    query,
    orderBy,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const compId = sessionStorage.getItem("compId");

const expenseCollectionRef = collection(db, `companyprofile/${compId}/expense`);

class ExpenseContext {

    addExpenses = (newExpense) => {
        return addDoc(expenseCollectionRef, newExpense);
    };

    updateExpense = (id, updateExpense) => {
        const expenseDoc = doc(db, `companyprofile/${compId}/expense`, id);
        return updateDoc(expenseDoc, updateExpense);
    };

    deleteExpense = (id) => {
        const expenseDoc = doc(db, `companyprofile/${compId}/expense`, id);
        return deleteDoc(expenseDoc);
    };

    getAllExpenses = () => {
        const q = query(expenseCollectionRef, orderBy("date", "desc"));
        return getDocs(q);
    };


    getAllByTotal = () => {
        const q = query(expenseCollectionRef, orderBy("subtotal", "desc"));
        return getDocs(q);
    };

    getExpense = (id) => { 
        const expenseDoc = doc(db, `companyprofile/${compId}/expense`, id);
        return getDoc(expenseDoc);
    };
}

export default new ExpenseContext();
