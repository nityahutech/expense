import ExpenseContext from './ExpenseContext'
import React from 'react';  
import ReactDOM from 'react-dom';   
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
 

// function DashboardContext() {

    async function getData() {
        const allData = await ExpenseContext.getAllExpenses();
        let data = allData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        let exp = data.map((person) => ({
            catname: person.catname,
            subtotal: person.subtotal
        }));
        return exp;
    };

    export async function totalAmount() {
        let exp = await getData();
        const total = exp.reduce((acc, expense) => {
            acc += expense.subtotal;
            return acc;
        }, 0);
        return total; 
    };
    
    export async function avgAmountPerMonth() {
        let total = await totalAmount();
        return Math.round(total / 12);
    };
    
    // export async function topFiveExpenses() {
    //     let exp = await getData();
    //     console.log(exp)
        
    // };

// }

// export default new DashboardContext();
