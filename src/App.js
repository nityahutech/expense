import LoginPage from "./components/LoginPage";
import ExpenseFrm from "./pages/expenseFrm/AddExpense";
import Profile from "./pages/profile/Profile";
import Setting from "./pages/setting/Setting";
import Leave from "./pages/leave/Leave";
import EmployeeListPage from "./pages/Employeelist/EmployeeListPage";
import Addemployee from "./pages/addemployee/Addemployee";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import Attendance from "./pages/Attendance/Attendance";
import AppraisalHr from "./pages/AppraisalPageHr";
import Payslip2 from "./pages/Payslip2";
import MainDashboardPage from "./pages/MainDashboardPage";
import OnboardingPage from "./pages/OnboardingPage";
import CompanyProfilepage from "./pages/CompanyProfilepage";
import HalfYearGoalPage from "./pages/halfYearGoalPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/DashBoard" element={<MainDashboardPage />} />
          <Route path="/Organization/Onboarding" element={<OnboardingPage />} />
          <Route path="/CompanyProfile" element={<CompanyProfilepage />} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/Employee/AddEmployee" element={<Addemployee />} />
          <Route path="/Employee/EmployeeList" element={<EmployeeListPage />} />
          <Route path="/Employee/Payroll" element={<Payslip2 />} />
          <Route path="/Expense/AddExpense" element={<ExpenseFrm />} />
          <Route path="/Expense/ExpenseList" element={<ExpenseListpage />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Settings" element={<Setting />} />
          <Route path="/Appraisal/AppraisalPageHr" element={<AppraisalHr />} />
          <Route path="/Appraisal/HalfYearGoalPage" element={<HalfYearGoalPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
