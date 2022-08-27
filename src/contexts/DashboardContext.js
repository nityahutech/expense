import ExpenseContext from './ExpenseContext'
import React from 'react';  
import ReactDOM from 'react-dom';   
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 

class DashboardContext{

//     // getData = async () => {
//         allData = await ExpenseContext.getAllExpenses();
//         data=allData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//         exp = data.map((person) => ({
//             subtotal: person.subtotal
//         }));
//     //     return exp;
//     // };

    totalAmount = async () => {
        // let exp = getData();
        const allData = await ExpenseContext.getAllExpenses();
        let data = allData.docs.map((doc) => ({...doc.data(), id: doc.id }))
        console.log(data);
        let exp = data.map((person) => ({
            subtotal: person.subtotal
        }));
        console.log(exp);
        const total = exp.reduce((acc, expense) => {
            acc += expense.subtotal;
            return acc;
        }, 0);
        return total; 
    };
    
//     avgAmountPerMonth = () => {
    
//     };
    
//     topFiveExpenses = () => {
    
//     };

}

export default new DashboardContext();
