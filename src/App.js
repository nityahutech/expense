import LoginPage from "./components/LoginPage";
import ExpenseFrm from "./components/ExpenceForm";
import Leave from "./components/Leave";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/addemployee";
import ExpenseList from "./components/Expenselist";
import AppraisalHr from "./components/quarterApp/appraisalHomePage";
import Payslip2 from "./components/ProfileDetails/HrPaySlip";
import AssetMag from "./components/assetManagement/assetMagHome";
import Profile from "./components/Profilepage";
import Onboarding from "./components/Onboarding";
import CompanyProfile from "./components/CompanyProfile";
import HalfYearGoalHome from "./components/halfYearGoal/halfYearGoalHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import FormatPage from "./FormatPage";
import MainDashBoard from "./components/MainDashBoard";
import Settingpage from "./components/Settingpage";
import { useEffect, useState } from "react";
import AttendanceLog from "./components/AttendanceLog";

function App() {
  const [roleView, setRoleView] = useState(sessionStorage.getItem("roleView"));

  const switchRole = (role) => {
    setRoleView(role)
  }

  useEffect(() => {
    console.log(roleView)
  }, [roleView])

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/DashBoard"
            element={
              <FormatPage
                main={<MainDashBoard />}
                activeSubMenu={["sub5"]}
                activeMenu={["30"]}
              />
            }
          />
          <Route
            path="/Organization/Onboarding"
            element={
              <FormatPage
                main={<Onboarding />}
                activeSubMenu={["sub5"]}
                activeMenu={["31"]}
              />
            }
          />
          <Route
            path="/CompanyProfile"
            element={
              <FormatPage main={<CompanyProfile />} activeMenu={["32"]} />
            }
          />
          <Route path="/Attendance" element={
              <FormatPage
                main={<AttendanceLog roleView={roleView}/>}
                activeMenu={["6"]}
                roleView={roleView}
                switchRole={switchRole}
              />
            }
          />
          <Route path="/Leave" element={
              <FormatPage
                main={<Leave roleView={roleView}/>}
                activeMenu={["7"]}
                roleView={roleView}
                switchRole={switchRole}
              />
            }
          />
          <Route
            path="/Employee/AddEmployee"
            element={
              <FormatPage
                main={<AddEmployee />}
                activeSubMenu={["sub2"]}
                activeMenu={["8"]}
              />
            }
          />
          <Route
            path="/Employee/EmployeeList"
            element={
              <FormatPage
                main={<EmployeeList />}
                activeSubMenu={["sub2"]}
                activeMenu={["9"]}
              />
            }
          />
          <Route
            path="/Employee/Payroll"
            element={
              <FormatPage
                main={<Payslip2 />}
                activeSubMenu={["sub2"]}
                activeMenu={["25"]}
              />
            }
          />
          <Route
            path="/Expense/AddExpense"
            element={
              <FormatPage
                main={<ExpenseFrm />}
                activeSubMenu={["sub1"]}
                activeMenu={["2"]}
              />
            }
          />
          <Route
            path="/Expense/ExpenseList"
            element={
              <FormatPage
                main={<ExpenseList />}
                activeSubMenu={["sub1"]}
                activeMenu={["3"]}
              />
            }
          />
          <Route
            path="/Profile"
            element={
              <FormatPage
                main={<Profile />}
                activeSubMenu={["21"]}
                activeMenu={["21"]}
              />
            }
          />
          <Route
            path="/Settings"
            element={<FormatPage main={<Settingpage />} activeMenu={["22"]} />}
          />
          <Route
            path="/Appraisal/AppraisalPageHr"
            element={
              <FormatPage
                main={<AppraisalHr />}
                activeSubMenu={["sub4"]}
                activeMenu={["20"]}
              />
            }
          />
          <Route
            path="/Appraisal/HalfYearGoalPage"
            element={
              <FormatPage
                main={<HalfYearGoalHome />}
                activeSubMenu={["sub4"]}
                activeMenu={["20a"]}
              />
            }
          />
          <Route
            path="/Assets"
            element={
              <FormatPage
                main={<AssetMag roleView={roleView}/>}
                activeSubMenu={["sub4"]}
                activeMenu={["22"]}
                roleView={roleView}
                switchRole={switchRole}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
