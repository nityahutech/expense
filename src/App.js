import LoginPage from "./components/LoginPage";
import ExpenseFrm from "./pages/expenseFrm/AddExpense";
import Setting from "./pages/setting/Setting";
import Leave from "./pages/leave/Leave";
import EmployeeListPage from "./pages/Employeelist/EmployeeListPage";
import Addemployee from "./pages/addemployee/Addemployee";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import Attendance from "./pages/Attendance/Attendance";
import AppraisalHr from "./pages/AppraisalPageHr";
import Payslip2 from "./pages/Payslip2";

import Profile from "./components/Profilepage";
import OnboardingPage from "./pages/OnboardingPage";
import CompanyProfilepage from "./pages/CompanyProfilepage";
import HalfYearGoalPage from "./pages/halfYearGoalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import MainDashBoard from "./components/MainDashBoard";
import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";

function App() {
  const page = (main, activeSubMenu, activeMenu) => {
    let accessToken = sessionStorage.getItem("accessToken");
    return accessToken && !(accessToken == "null") ? (
      <div className="home">
        <div className="sidecontainer">
          <NewSidebar
            activeSubMenu={activeSubMenu}
            activeMenu={activeMenu}
          />
        </div>
        <div className="homeContainer">
          <div className="table">
            <Navbar />
          </div>
          <div className="tables">
            {main}
          </div>
        </div>
      </div>
    ) : window.location.href = "/";
  }
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/DashBoard" element={page(<MainDashBoard />, ["sub5"], ["30"])} />
          <Route path="/Organization/Onboarding" element={<OnboardingPage />} />
          <Route path="/CompanyProfile" element={<CompanyProfilepage />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/Employee/AddEmployee" element={<Addemployee />} />
          <Route path="/Employee/EmployeeList" element={<EmployeeListPage />} />
          <Route path="/Employee/Payroll" element={<Payslip2 />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
          <Route path="/Profile" element={page(<Profile />, ["21"], ["21"])} />
          <Route path="/Settings" element={<Setting />} />
          <Route path="/Appraisal/AppraisalPageHr" element={<AppraisalHr />} />
          <Route path="/Appraisal/HalfYearGoalPage" element={<HalfYearGoalPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
