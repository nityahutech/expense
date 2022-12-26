import LoginPage from "./components/LoginPage";
// import ExpenseFrm from "./pages/expenseFrm/AddExpense";
// import Setting from "./pages/setting/Setting";
// import Leave from "./pages/leave/Leave";
// import EmployeeListPage from "./pages/Employeelist/EmployeeListPage";
// import Addemployee from "./pages/addemployee/Addemployee";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
// import Attendance from "./pages/Attendance/Attendance";
// import AppraisalHr from "./pages/AppraisalPageHr";
// import Payslip2 from "./pages/Payslip2";

import Profile from "./components/Profilepage";
// import CompanyProfilepage from "./pages/CompanyProfilepage";
// import HalfYearGoalPage from "./pages/halfYearGoalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import MainDashBoard from "./components/MainDashBoard";
import FormatPage from "./FormatPage";
import Onboarding from "./components/Onboarding";
import CompanyProfile from "./components/CompanyProfile";
import AddEmployee from "./components/addemployee";
import EmployeeList from "./components/EmployeeList";
import Settingpage from "./components/Settingpage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/DashBoard" element={<FormatPage main={<MainDashBoard />} activeSubMenu={["sub5"]} activeMenu={["30"]} />} />
          <Route path="/Organization/Onboarding" element={<FormatPage main={<Onboarding />} activeSubMenu={["sub5"]} activeMenu={["31"]} />} />
          <Route path="/CompanyProfile" element={<FormatPage main={<CompanyProfile />} activeMenu={["32"]} />} />
          {/* <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Leave" element={<Leave />} /> */}
          <Route path="/Employee/AddEmployee" element={<FormatPage main={<AddEmployee />} activeSubMenu={["sub2"]} activeMenu={["8"]} />} />
          <Route path="/Employee/EmployeeList" element={<FormatPage main={<EmployeeList />} activeSubMenu={["sub2"]} activeMenu={["9"]} />} />
          {/* <Route path="/Employee/Payroll" element={<Payslip2 />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} /> */}
          <Route path="/Profile" element={<FormatPage main={<Profile />} activeSubMenu={["21"]} activeMenu={["21"]} />} />
          <Route path="/Settings" element={<FormatPage main={<Settingpage />} activeMenu={["22"]} />} />
          {/* <Route path="/Appraisal/AppraisalPageHr" element={<AppraisalHr />} />
          <Route path="/Appraisal/HalfYearGoalPage" element={<HalfYearGoalPage />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
