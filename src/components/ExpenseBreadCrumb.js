import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
const ExpenseBreadCrumb = () => {
  // const breadcrumbs = useBreadcrumbs();
  // breadcrumbs.splice(0, 1)
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
      ) : window.location.pathname === "/Employee/Leave" ? (
        <Breadcrumb.Item>
          <strong>Employee / Leave</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Attendance/AttendanceLog" ? (
        <Breadcrumb.Item>
          <strong>Employee / Attendance Log</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Addemployee/AddEmployee" ? (
        <Breadcrumb.Item>
          <strong>Employee / Add Employee</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/EmployeeListPage/EmployeeList" ? (
        <Breadcrumb.Item>
          <strong>Employee / Employee List</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/PersonalPage/Personal" ? (
        <Breadcrumb.Item>
          <strong>Profile / Personal</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/WorkPage/work" ? (
        <Breadcrumb.Item>
          <strong>Profile / Work</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/TeamPage/Team" ? (
        <Breadcrumb.Item>
          <strong>Profile / Team</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/EducationPage/Education" ? (
        <Breadcrumb.Item>
          <strong>Profile / Education</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/FamilyPage/Family" ? (
        <Breadcrumb.Item>
          <strong>Profile / Family</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/DocumentsPage/Document" ? (
        <Breadcrumb.Item>
          <strong>Profile / Document</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/WorkWeekPage/WorkWeek" ? (
        <Breadcrumb.Item>
          <strong>Profile / Work Week</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/PaySlipPage/PaySlip" ? (
        <Breadcrumb.Item>
          <strong>Profile / Pay Slip</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/BankAccountpages/BankAccount" ? (
        <Breadcrumb.Item>
          <strong>Profile / Bank Account</strong>
        </Breadcrumb.Item>
      ) : window.location.pathname === "/Setting" ? (
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