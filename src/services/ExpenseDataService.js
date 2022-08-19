import { db } from "../firebase-config";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from "firebase/firestore";

const expenseCollectionRef = collection(db, "expenses");

class ExpenseDataService {

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
        return getDocs(expenseCollectionRef);
    };

    getExpense = (id) => {
        const expenseDoc = doc(db, "expenses", id);
        return getDoc(expenseDoc);
    };
}

export default new ExpenseDataService();
