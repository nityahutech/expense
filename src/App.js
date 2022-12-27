import LoginPage from "./components/LoginPage";
import ExpenseFrm from "./components/ExpenceForm";
import Setting from "./pages/setting/Setting";
import Leave from "./pages/leave/Leave";
import EmployeeList from "./components/EmployeeList";
import Addemployee from "./components/addemployee";
import ExpenseList from "./components/Expenselist";
import ExpenseListpage from "./pages/ExpenseList/ExpenseListpage";
import Attendance from "./pages/Attendance/Attendance";
import AppraisalHr from "./components/quarterApp/appraisalHomePage";
import Payslip2 from "./components/ProfileDetails/HrPaySlip";
import AssetMag from"./components/assetManagement/assetMagHome";
import Profile from "./components/Profilepage";
import Onboarding from "./components/Onboarding";
import CompanyProfile from "./components/CompanyProfile";
import HalfYearGoalHome from "./components/halfYearGoal/halfYearGoalHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import MainDashBoard from "./components/MainDashBoard";
import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";
import Settingpage from "./components/Settingpage";

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
          <Route path="/Organization/Onboarding" element={page(<Onboarding />)} />
          <Route path="/CompanyProfile" element={page(<CompanyProfile />,["32"],["32"])} />
          <Route path="/Attendance" element={<Attendance />} />
          <Route path="/Leave" element={<Leave />} />
          <Route path="/Employee/AddEmployee" element={page(<Addemployee />,["sub2"],["8"])} />
          <Route path="/Employee/EmployeeList" element={page(<EmployeeList />,["sub2"],["9"])} /> 
          {/* page giving the error */}
          <Route path="/Employee/Payroll" element={page(<Payslip2 />,["sub2"],["25"])} />
          <Route path="/Expense/AddExpense" element={page(<ExpenseFrm />,["sub1"],["2"])} />
          <Route path="/Expense/ExpenseList" element={page(<ExpenseList />,["sub1"],["3"])} />
          <Route path="/Profile" element={page(<Profile />, ["21"], ["21"])} />
          <Route path="/Settings" element={page(<Settingpage />)  } />
          <Route path="/Appraisal/AppraisalPageHr" element={page(<AppraisalHr />,["sub4"],["20"])} />
          <Route path="/Appraisal/HalfYearGoalPage" element={page(<HalfYearGoalHome />,["sub4"],["20a"])} />
          <Route path="/assetManagement/assetMagHome" element={page(<AssetMag />,["22"])} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
