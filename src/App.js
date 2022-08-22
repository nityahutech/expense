import React from "react";
import LoginPage from "./components/LoginPage";
import "./App.css";
import DashBoard from './pages/dashBoard/DashBoard';
import ExpenseFrm from './pages/expenseFrm/AddExpense';
import NewSider from './components/sidebar/NewSidebar';
import ExpenseListpage from './pages/ExpenseList/ExpenseListpage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <Route path="/Home" element={<DashBoard />} /> */}
        <Route path="/DashBoard" element={<DashBoard />}  />
        <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
        <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
        <Route path="/New" element={<NewSider />} />
      </Routes>
    </BrowserRouter>
  );
  //return <ExpenseList />;
}

export default App;
