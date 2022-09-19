import React from "react";
import LoginPage from "./components/LoginPage";
import "./App.css";
import SignupPage from "./components/SignupPage";
import DashBoard from "./pages/dashBoard/DashBoard";
import ExpenseFrm from "./pages/expenseFrm/AddExpense";
import NewSider from "./components/sidebar/NewSidebar";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import Leave from "./pages/leave/Leave";
import Addemployee from "./components/addemployee";
import EmployeeList from "./components/EmployeeList";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabledash from "./components/Tabledash";
import { AuthProvider } from "./contexts/AuthContext";
import Attendance from "./pages/Attendance/Attendance";
import Notification from "./components/Notification";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          {/* <Route path="/Home" element={<DashBoard />} /> */}
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
          <Route path="/Attendance/AttendanceLog" element={<Attendance />} />
          <Route path="/addemployee" element={<Addemployee />} />
          <Route path="/EmployeeList" element={<EmployeeList />} />
          <Route path="/New" element={<NewSider />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Employee/Leave" element={<Leave />} />
          <Route path="/Notification" element={<Notification />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  //return <ExpenseList />;
}

export default App;
