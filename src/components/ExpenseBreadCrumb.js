import { Breadcrumb } from "antd";
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
// import useBreadcrumbs from 'use-react-router-breadcrumbs';

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
      <Breadcrumb.Item className="home-breadcrumb"> <Link to ='/Dashboard'><strong>Dashboard</strong></Link></Breadcrumb.Item>
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