import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
const ExpenseBreadCrumb = () => {

  return (
    <Breadcrumb
      style={{
        margin: "1px 10px -10px",
        textAlign: "left",
        FontStyle: " Bold",
        FontSize: " 14px",
      }}
    >
      <Breadcrumb.Item className="home-breadcrumb"> <Link to='/Dashboard'><strong>Dashboard</strong></Link></Breadcrumb.Item>
      {window.location.pathname === "/Dashboard" ? (
        <Breadcrumb.Item>
          {/* <strong>Dashboard</strong> */}
        </Breadcrumb.Item>
      ) : window.location.pathname === "/CompanyProfile" ? (
        <Breadcrumb.Item>
          <strong> Company Profile</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Expense/AddExpense" ? (
        <Breadcrumb.Item>
          <strong> Expense / Add Expense</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Expense/ExpenseList" ? (
        <Breadcrumb.Item>
          <strong> Expense / Expense List</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Profile" ? (
        <Breadcrumb.Item>
          <strong>Profile</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Leave" ? (
        <Breadcrumb.Item>
          <strong> Leave</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Attendance" ? (
        <Breadcrumb.Item>
          <strong> Attendance </strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Employee/AddEmployee" ? (
        <Breadcrumb.Item>
          <strong>Employee / Add Employee</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Employee/EmployeeList" ? (
        <Breadcrumb.Item>
          <strong>Employee / Employee List</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/PersonalPage/Personal" ? (
        <Breadcrumb.Item>
          <strong>Profile / Personal</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Organization/Onboarding" ? (
        <Breadcrumb.Item>
          <strong>Organization / Onboarding</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Appraisal/AppraisalPageHr" ? (
        <Breadcrumb.Item>
          <strong>Appraisal / Quarter Appraisal</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Appraisal/HalfYearGoalPage" ? (
        <Breadcrumb.Item>
          <strong>Appraisal / Half Year Goal</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Settings" ? (
        <Breadcrumb.Item>
          <strong>Settings</strong>
        </Breadcrumb.Item>
      ) : (
        ""
      )}
    </Breadcrumb>
  );
};

export default ExpenseBreadCrumb