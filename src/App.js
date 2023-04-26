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
import AttendanceLog from "./components/AttendanceLog";
import InvoiceMagHome from "./components/assetManagement/InvoiceMagHome";
import TravelMngHome from "./components/TravelManagement/TravelMngHome";
import FeedbackTable from "./components/Feedback/FeedbackTable";
import EmailVerification from "./EmailVerification";
import ConfigSurvey from "./components/Feedback/ConfigSurvey";
import Communication from "./components/Feedback/Communication";
import Technical from "./components/Feedback/Technical";
import AddSurvey from "./components/Feedback/AddSurvey";
import AddClient from "./components/Client/AddClient";
import ViewClient from "./components/Client/ViewClient";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/DashBoard"
            element={
              <FormatPage
                main={MainDashBoard}
                activeSubMenu={["sub5"]}
                activeMenu={["30"]}
              />
            }
          />
          <Route
            path="/Organization/Onboarding"
            element={
              <FormatPage
                main={Onboarding}
                activeSubMenu={["sub5"]}
                activeMenu={["31"]}
              />
            }
          />
          <Route
            path="/CompanyProfile"
            element={<FormatPage main={CompanyProfile} activeMenu={["32"]} />}
          />
          <Route
            path="/Attendance"
            element={<FormatPage main={AttendanceLog} activeMenu={["6"]} />}
          />
          <Route
            path="/Leave"
            element={<FormatPage main={Leave} activeMenu={["7"]} />}
          />
          <Route
            path="/Employee/AddEmployee"
            element={
              <FormatPage
                main={AddEmployee}
                activeSubMenu={["sub2"]}
                activeMenu={["8"]}
              />
            }
          />
          <Route
            path="/Employee/EmployeeList"
            element={
              <FormatPage
                main={EmployeeList}
                activeSubMenu={["sub2"]}
                activeMenu={["9"]}
              />
            }
          />
          <Route
            path="/Employee/Payroll"
            element={
              <FormatPage
                main={Payslip2}
                activeSubMenu={["sub2"]}
                activeMenu={["25"]}
              />
            }
          />
          <Route
            path="/Assets"
            element={
              <FormatPage
                main={AssetMag}
                activeSubMenu={["sub4"]}
                activeMenu={["22"]}
              />
            }
          />
          <Route
            path="/Expense/AddExpense"
            element={
              <FormatPage
                main={ExpenseFrm}
                activeSubMenu={["sub1"]}
                activeMenu={["2"]}
              />
            }
          />
          <Route
            path="/Expense/ExpenseList"
            element={
              <FormatPage
                main={ExpenseList}
                activeSubMenu={["sub1"]}
                activeMenu={["3"]}
              />
            }
          />
          <Route
            path="/Expense/InvoiceReimbursement"
            element={
              <FormatPage
                main={InvoiceMagHome}
                activeSubMenu={["sub1"]}
                activeMenu={["23"]}
              />
            }
          />
          <Route
            path="/Appraisal/AppraisalPageHr"
            element={
              <FormatPage
                main={AppraisalHr}
                activeSubMenu={["sub4"]}
                activeMenu={["20"]}
              />
            }
          />
          <Route
            path="/Appraisal/HalfYearGoalPage"
            element={
              <FormatPage
                main={HalfYearGoalHome}
                activeSubMenu={["sub4"]}
                activeMenu={["20a"]}
              />
            }
          />
          <Route
            path="/TravelManagement"
            element={<FormatPage main={TravelMngHome} activeMenu={["24"]} />}
          />
          <Route
            path="/Feedback"
            element={<FormatPage main={FeedbackTable} activeMenu={["25"]} />}
          />
          <Route
            path="/ConfigSurvey"
            element={<FormatPage main={ConfigSurvey} activeMenu={["26"]} />}
          />
          <Route
            path="/Communication"
            element={<FormatPage main={Communication} activeMenu={["27"]} />}
          />
          <Route
            path="/Technical"
            element={<FormatPage main={Technical} activeMenu={["28"]} />}
          />
          <Route
            path="addSurvey"
            element={<FormatPage main={AddSurvey} activeMenu={["29"]} />}
          />
          <Route
            path="/Profile"
            element={
              <FormatPage
                main={Profile}
                activeSubMenu={["21"]}
                activeMenu={["21"]}
              />
            }
          />
          <Route
            path="/Client/AddClient"
            element={
              <FormatPage
                main={AddClient}
                activeSubMenu={["sub30"]}
                activeMenu={["30a"]}
              />
            }
          />
          <Route
            path="/Client/ViewClient"
            element={
              <FormatPage
                main={ViewClient}
                activeSubMenu={["sub30"]}
                activeMenu={["30b"]}
              />
            }
          />
          <Route
            path="/Settings"
            element={<FormatPage main={Settingpage} activeMenu={["22"]} />}
          />
          <Route path="/VerifyEmail" element={<EmailVerification />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
