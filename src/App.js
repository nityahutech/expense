import LoginPage from "./components/LoginPage";
import ExpenseFrm from "./components/ExpenceForm";
import Leave from "./components/Leave";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/addemployee";
import ExpenseList from "./components/Expenselist";
// import AppraisalHr from "./components/quarterApp/appraisalHomePage";
import Payslip2 from "./components/ProfileDetails/HrPaySlip";
import AssetMag from "./components/assetManagement/assetMagHome";
import Profile from "./components/Profilepage";
import Onboarding from "./components/Onboarding";
import CompanyProfile from "./components/CompanyProfile";
// import HalfYearGoalHome from "./components/halfYearGoal/halfYearGoalHome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";
import FormatPage from "./FormatPage";
import MainDashBoard from "./components/MainDashBoard";
import Settingpage from "./components/Settingpage";
import InvoiceMagHome from "./components/InvoiceManagment/InvoiceMagHome";
import TravelMngHome from "./components/TravelManagement/TravelMngHome";
import EmailVerification from "./EmailVerification";
import ConfigSurvey from "./components/Feedback/ConfigSurvey";
import Communication from "./components/Feedback/Communication";
import Technical from "./components/Feedback/Technical";
import AddSurvey from "./components/Feedback/AddSurvey";
import FeedbackAdmin from "./components/Feedback/FeedbackAdmin";
import AddClient from "./components/Client/AddClient";
import ViewClient from "./components/Client/ViewClient";
import DailyLog from "./components/Attendance/DailyLog";
import AdminAttendance from "./components/Attendance/AdminAttendance";
import MonthlyLog from "./components/Attendance/MonthlyLog";
import RegularizeAttendance from "./components/Attendance/RegularizeAttendance";
import ConfigureAttendance from "./components/Attendance/ConfigureAttendance";
import Approvals from "./components/Leave/Approvals";
import Request from "./components/Leave/Request";
import Holidays from "./components/Leave/Holidays";
import Types from "./components/Leave/Types";
import AdminLeave from "./components/Leave/AdminLeave";
import UserAttendance from "./components/Attendance/UserAttendance";
import AddReport from "./components/Attendance/AddReport";
import Survey from "./components/Feedback/Survey";
import RequestHome from "./components/Requests/RequestHome";
import Forms from "./components/Requests/Form/Forms";
import RequestTable from "./components/Requests/Table/RequestTable";
import RegistrationPage from "./components/Registration/RegistrationPage";
import RegisterAccount from "./components/Registration/RegisterAccount";
import RegisterCompany from "./components/Registration/RegisterCompany";
import RegisterEmployee from "./components/Registration/RegisterEmployee";
import HomePage from "./components/Home/HomePage";
import Policies from "./components/Policies";
import NotifySettings from "./components/NotifySettings";
import UserLeave from "./components/Leave/UserLeave";
import ManagerApproval from "./components/Leave/ManagerApproval";
import ApprovalConfig from "./components/ApprovalConfig";
import LeaveType from "./components/LeaveType";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-acoount" element={<RegisterAccount />} />
          <Route path="/register" element={<RegistrationPage />}>
            <Route path="company" element={<RegisterCompany />} />
            <Route path="employee" element={<RegisterEmployee />} />
          </Route>
          <Route
            path="/dashboard"
            element={
              <FormatPage
                main={MainDashBoard}
                activeSubMenu={["sub5"]}
                activeMenu={["30"]}
              />
            }
          />
          <Route
            path="/organization/onboarding"
            element={
              <FormatPage
                main={Onboarding}
                activeSubMenu={["sub5"]}
                activeMenu={["31"]}
              />
            }
          />
          <Route
            path="/company-profile"
            element={<FormatPage main={CompanyProfile} activeMenu={["32"]} />}
          />
          <Route
            path="/attendance"
            element={<FormatPage main={AdminAttendance} activeMenu={["6"]} />}
          >
            <Route path="daily-log" element={<DailyLog />} />
            <Route path="daily-log/employee" element={<MonthlyLog />} />
            <Route path="configurations" element={<ConfigureAttendance />} />
            <Route path="regularize" element={<RegularizeAttendance />} />
          </Route>
          <Route
            path="/my-attendance"
            element={<FormatPage main={UserAttendance} activeMenu={["6"]} />}
          >
            <Route path="" element={<MonthlyLog />} />
            <Route path="daily-log" element={<DailyLog />} />
            <Route path="daily-log/employee" element={<MonthlyLog />} />
            <Route path="report" element={<AddReport />} />
          </Route>
          <Route
            path="/leave"
            element={<FormatPage main={UserLeave} activeMenu={["7"]} />}
          >
            <Route path="" element={<Holidays />} />
            <Route path="approval" element={<ManagerApproval />} />
            <Route path="history" element={<Request />} />
          </Route>
          <Route
            path="/hr-leave"
            element={<FormatPage main={AdminLeave} activeMenu={["7"]} />}
          >
            <Route path="requests" element={<Request />} />
            <Route path="holidays" element={<Holidays />} />
            <Route path="type" element={<LeaveType />} />
            <Route path="approval" element={<ApprovalConfig />} />
          </Route>
          <Route
            path="/employees/onboard"
            element={
              <FormatPage
                main={AddEmployee}
                activeSubMenu={["sub2"]}
                activeMenu={["8"]}
              />
            }
          />
          <Route
            path="/employees/view"
            element={
              <FormatPage
                main={EmployeeList}
                activeSubMenu={["sub2"]}
                activeMenu={["9"]}
              />
            }
          />
          <Route
            path="/employees/payroll"
            element={
              <FormatPage
                main={Payslip2}
                activeSubMenu={["sub2"]}
                activeMenu={["25"]}
              />
            }
          />
          <Route
            path="/assets"
            element={
              <FormatPage
                main={AssetMag}
                activeSubMenu={["sub4"]}
                activeMenu={["22"]}
              />
            }
          />
          <Route
            path="/expenses/create"
            element={
              <FormatPage
                main={ExpenseFrm}
                activeSubMenu={["sub1"]}
                activeMenu={["2"]}
              />
            }
          />
          <Route
            path="/expenses/view"
            element={
              <FormatPage
                main={ExpenseList}
                activeSubMenu={["sub1"]}
                activeMenu={["3"]}
              />
            }
          />
          {/* <Route
            path="/expenses/invoices"
            element={
              <FormatPage
                main={InvoiceMagHome}
                activeSubMenu={["sub1"]}
                activeMenu={["23"]}
              />
            }
          /> */}
          {/* <Route
            path="/Appraisal/AppraisalPageHr"
            element={
              <FormatPage
                main={AppraisalHr}
                activeSubMenu={["sub4"]}
                activeMenu={["20"]}
              />
            }
          /> */}
          {/* <Route
            path="/Appraisal/HalfYearGoalPage"
            element={
              <FormatPage
                main={HalfYearGoalHome}
                activeSubMenu={["sub4"]}
                activeMenu={["20a"]}
              />
            }
          /> */}
          <Route
            path="/travel"
            element={<FormatPage main={TravelMngHome} activeMenu={["24"]} />}
          />
          <Route
            path="/invoices"
            element={<FormatPage main={InvoiceMagHome} activeMenu={["24a"]} />}
          />
          <Route
            path="/Feedback"
            element={<FormatPage main={FeedbackAdmin} activeMenu={["30"]} />}
          />
          <Route
            path="/Policies"
            element={<FormatPage main={Policies} activeMenu={["31"]} />}
          />
          {/* <Route
            path="/FeedbackTable"
            element={<FormatPage main={FeedbackTable} activeMenu={["25"]} />}
          /> */}
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
            path="/my-profile"
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
            path="/templates"
            element={
              <FormatPage
                main={NotifySettings}
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
            path="/requests"
            element={<FormatPage main={RequestHome} activeMenu={["33"]} />}
          >
            <Route path="view" element={<RequestTable />} />
            <Route path="forms" element={<Forms />} />
          </Route>
          <Route
            path="/settings"
            element={<FormatPage main={Settingpage} activeMenu={["22"]} />}
          />
          <Route path="/VerifyEmail" element={<EmailVerification />} />
          <Route path="/survey" element={<Survey />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
