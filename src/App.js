import React from "react";
import LoginPage from "./components/LoginPage";
import ExpenseList from "./components/Expenselist";
import "./App.css";
import Home from "./pages/home/Home";
import DashBoard from "./pages/dashBoard/DashBoard";
import ExpenseFrm from "./pages/expenseFrm/ExpenseFrm";
import NewSider from "./components/sidebar/NewSidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/DashBoard" element={<DashBoard />} />
        <Route path="/ExpenseFrm" element={<ExpenseFrm />} />
        <Route path="/ExpenseList" element={<ExpenseList />} />
        <Route path="/New" element={<NewSider />} />
      </Routes>
    </BrowserRouter>
  );
  //return <ExpenseList />;
}

export default App;
