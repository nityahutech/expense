import React from "react";
import LoginPage from "./components/LoginPage";
import "./App.css";
import DashBoard from "./pages/dashBoard/DashBoard";
import ExpenseFrm from "./pages/expenseFrm/AddExpense";
import NewSider from "./components/sidebar/NewSidebar";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabledash from "./components/Tabledash";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Route path="/Home" element={<DashBoard />} /> */}
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
          <Route path="/New" element={<NewSider />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  //return <ExpenseList />;
}

export default App;