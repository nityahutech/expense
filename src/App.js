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
import EmployeeListPage from "./pages/Employeelist/EmployeeListPage";
import Addemployee from "./pages/addemployee/Addemployee";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tabledash from "./components/Tabledash";
import { AuthProvider } from "./contexts/AuthContext";
import Attendance from "./pages/Attendance/Attendance";
import Notification from "./components/Notification";
import DocumentsPage from "./pages/DocumentsPage";
import PersonalPage from "./pages/PersonalPage";
import WorkPage from "./pages/WorkPage";
import TeamPage from "./pages/TeamPage";
import EducationPage from "./pages/EducationPage";
import FamilyPage from "./pages/FamilyPage";
import WorkWeekPage from "./pages/WorkWeekPage";
import PaySlipPage from "./pages/PaySlipPage";
import BankAccountpages from "./pages/BankAccountpages";
import Appraisal from "./pages/AppraisalPage";
import AppraisalHr from "./pages/AppraisalPageHr";
import Payslip2 from "./pages/Payslip2";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/SignupPage" element={<SignupPage />} />
          {/* <Route path="/Home" element={<DashBoard />} /> */}
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
          <Route path="/Attendance/AttendanceLog" element={<Attendance />} />
          <Route
            path="/EmployeeListPage/EmployeeList"
            element={<EmployeeListPage />}
          />
          <Route path="/DocumentsPage/Document" element={<DocumentsPage />} />
          <Route path="/PersonalPage/Personal" element={<PersonalPage />} />
          <Route path="/WorkPage/Work" element={<WorkPage />} />
          <Route path="/TeamPage/Team" element={<TeamPage />} />
          <Route path="/EducationPage/Education" element={<EducationPage />} />
          <Route path="/FamilyPage/Family" element={<FamilyPage />} />
          <Route path="/WorkWeekPage/WorkWeek" element={<WorkWeekPage />} />
          <Route path="/PaySlipPage/PaySlip" element={<PaySlipPage />} />
          <Route path="/Payslip2/HrPaySlip" element={<Payslip2 />} />
          <Route
            path="/BankAccountpages/BankAccount"
            element={<BankAccountpages />}
          />
          <Route path="/Addemployee/AddEmployee" element={<Addemployee />} />
          <Route path="/New" element={<NewSider />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/Employee/Leave" element={<Leave />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Appraisal/AppraisalPage" element={<Appraisal />} />
          <Route path="/Appraisal/AppraisalPageHr" element={<AppraisalHr />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
  //return <ExpenseList />;
}

export default App;
