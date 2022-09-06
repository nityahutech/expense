import ExpenseContext from './ExpenseContext'
import React from 'react';  
import ReactDOM from 'react-dom';   
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
const dateFormat = "DD-MM-YYYY";
 
async function getData() {
    const allData = await ExpenseContext.getAllByTotal();
    let data = allData.docs.map((doc) =>{      
      var longDateStr = moment(doc.data()['date'], dateFormat);
      return ({
        ...doc.data(),date:longDateStr,dt:new Date(longDateStr),
        id: doc.id,
      })});
    let exp = data.map((person) => ({
        catname: person.catname,
        date: person.date,
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

export async function topSixExpenses(month, year) {
    let exp = await getData();
    let result = exp.filter((ex) => {
        return (
          ex.date.isSame(moment(`${year}-${month}-01`), 'month')
        );
      });
    return result;

    
};
