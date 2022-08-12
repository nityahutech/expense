
import React from "react";
import LoginPage from "./components/LoginPage";
import ExpenseList from "./components/Expenselist";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/home/Home';
import DashBoard from './pages/dashBoard/DashBoard';
import ExpenseFrm from './pages/expenseFrm/ExpenseFrm';





function App() {
  return (

    <BrowserRouter>


      <Routes>

        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/ExpenseFrm" element={<ExpenseFrm />} />
        <Route path="/ExpenseList" element={<ExpenseList />} />


      </Routes>


    </BrowserRouter>
  )
  //return <ExpenseList />;

}

export default App;
