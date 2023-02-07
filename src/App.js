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
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import "./App.css";
import FormatPage from "./FormatPage";
import MainDashBoard from "./components/MainDashBoard";
import Settingpage from "./components/Settingpage";
import { useEffect, useState } from "react";
import AttendanceLog from "./components/AttendanceLog";
import InvoiceReimbursement from "./components/assetManagement/InvoiceReimbursement";
import InvoiceMagHome from "./components/assetManagement/InvoiceMagHome";

function App() {
  const [roleview, setRoleview] = useState('')

  const switchRole = (role) => {
    setRoleview(role);
  };

  const FirstRole = () => {
    const {roleView} = useAuth();
    console.log(roleView);
    setRoleview(roleView)
  }

  useEffect(() => {
    console.log(roleview);
  }, [roleview])

  console.log(roleview);

  return (
    <AuthProvider>
    {FirstRole}
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
          {roleview == "super" ? ( 
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
          ) : null}
          <Route
            path="/CompanyProfile"
            element={
              <FormatPage main={<CompanyProfile />} activeMenu={["32"]} />
            }
          />
          <Route
            path="/Attendance"
            element={
              <FormatPage
                main={<AttendanceLog roleView={roleview} />}
                activeMenu={["6"]}
                roleView={roleview}
                switchRole={switchRole}
              />
            }
          />
          <Route
            path="/Leave"
            element={
              <FormatPage
                main={<Leave roleView={roleview} />}
                activeMenu={["7"]}
                roleView={roleview}
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
            path="/Expense/InvoiceReimbursement"
            element={
              <FormatPage
                main={<InvoiceMagHome roleView={roleview} />}
                roleView={roleview}
                activeSubMenu={["sub1"]}
                activeMenu={["23"]}
                switchRole={switchRole}
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
                main={<AppraisalHr roleView={roleview} />}
                activeSubMenu={["sub4"]}
                activeMenu={["20"]}
                roleView={roleview}
                switchRole={switchRole}
              />
            }
          />
          <Route
            path="/Appraisal/HalfYearGoalPage"
            element={
              <FormatPage
                main={<HalfYearGoalHome roleView={roleview} />}
                activeSubMenu={["sub4"]}
                activeMenu={["20a"]}
                switchRole={switchRole}
                roleView={roleview}
              />
            }
          />
          <Route
            path="/Assets"
            element={
              <FormatPage
                main={<AssetMag roleView={roleview} />}
                activeSubMenu={["sub4"]}
                activeMenu={["22"]}
                roleView={roleview}
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
