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

const expenseCollectionRef = collection(db, "expenses");

class ExpenseContext {

    addExpenses = (newExpense) => {
        return addDoc(expenseCollectionRef, newExpense);
    };

    updateExpense = (id, updateExpense) => {
        const expenseDoc = doc(db, "expenses", id);
        return updateDoc(expenseDoc, updateExpense);
    };

    deleteExpense = (id) => {
        const expenseDoc = doc(db, "expenses", id);
        return deleteDoc(expenseDoc);
    };

    getAllExpenses = () => {
        const q = query(expenseCollectionRef, orderBy("date", "desc"));
        // console.log(q);
        return getDocs(q);
    };


    getAllByTotal = () => {
        const q = query(expenseCollectionRef, orderBy("subtotal", "desc"));
        // console.log(q);
        return getDocs(q);
    };

    getExpense = (id) => { 
        const expenseDoc = doc(db, "expenses", id);
        return getDoc(expenseDoc);
    };
}

export default new ExpenseContext();
