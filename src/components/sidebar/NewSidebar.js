import React, { useState } from "react";
import { Layout, Menu } from "antd";
import expenseIcon from "../../images/Expense.png";
import dot from "../../images/dot.png";
import dashIcon from "../../images/Dashboard.png";
import empIcon from "../../images/employees.png";
import userIcon from "../../images/user.png";
import logo from "../../images/NewHUTechLogowhite.png";
import appraisalIcon from "../../images/appraisal.png";
import Organization from "../../images/Organization.png";
import CompanyProfile from "../../images/Companyprofile.png";
import SettingIcon from "../../images/gear.png";
import homePage from "../../images/homeIcon.png";
import LeaveIcon from "../../images/smallLeaveLogo.png";
import "./newSlidebar.css";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;


const NewSidebar = (props) => {
  const role = sessionStorage.getItem("role");

  return (
    <Layout className="sidelayout">
      <Sider
        breakpoint="lg"
        style={{ backgroundColor: "#05445E" }}
        collapsedWidth="0"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
      >
        <Menu
          defaultOpenKeys={props.activeSubMenu || []}
          selectedKeys={props.activeMenu}
          // openKeys={props.openkey}
          // selectedKeys={props.selectedkey}
          onSelect={function ({
            item,
            key,
            keyPath,
            selectedKeys,
            domEvent,
          }) {}}
          mode="inline"
          style={{
            padding: "0px",
            height: "100vh",
          }}
        >
          <div className="sidebarTittle" style={{height:"auto"}}>
            <img
              style={{
                background: "#05445E",
                height: "100px",
              }}
              // src="/logo_1.png"
              src={logo}
              alt="hello"
            />
          </div>
          <Menu.Item
            className="arrow"
            icon={
              <img
                // src="/dot.png"
                src={homePage}
                width="16px"
                alt="home"
              />
            }
            key="30"
          >
            Home
            <NavLink to="/MainDashboardPage/MainDashBoard" />
          </Menu.Item>
          { role == "super" ? (
            <Menu.SubMenu
            style={{
              width: "100%",
            }}
            icon={
              <img
                style={{ color: "white" }}
                src={Organization}
                alt="organization"
                className="Dash"
              />
            }
            key="sub5"
            title="Organization"
            mode="inline"
          >
            {/* <Menu.Item
              className="arrow"
              icon={
                <img
                  // src="/dot.png"
                  src={dot}
                  alt="profile"
                  className="dot"
                />
              }
              key="30"
            >
              Dashboard
              <NavLink to="/MainDashboardPage/MainDashBoard" />
            </Menu.Item> */}
            <Menu.Item
              icon={
                <img
                  // src="/dot.png"
                  src={dot}
                  alt="onboarding"
                  className="dot"
                />
              }
              key="31"
            >
              Onboarding
              <NavLink to="/OnboardingPage/Onboarding" />
            </Menu.Item>
          </Menu.SubMenu>
          ) : null}
          { role == "hr" ? (
            <Menu.Item
            icon={
              <img
                style={{ color: "white" }}
                src={CompanyProfile}
                // src="/user.png"
                alt="profile"
                className="Dash"
              />
            }
            key="32"
          >
            Company Profile
            <NavLink to="/CompanyProfilepage" />
          </Menu.Item>
          ) : null}
          { role != "super" ?(
            <>
            <Menu.Item
              className="arrow"
              icon={
                <img
                  // src="/dot.png"
                  src={dot}
                  alt="profile"
                  className="dot"
                />
              }
              key="6"
            >
              Attendance
              <NavLink to="/Attendance/AttendanceLog" />
            </Menu.Item>
            <Menu.Item
              className="arrow"
              icon={
                <img
                  // src="/dot.png"
                  src={LeaveIcon}
                  alt="profile"
                  className="dot"
                />
              }
              key="7"
            >
              Leave
              <NavLink to="/Employee/Leave" />
            </Menu.Item>
            </>
            ): null}
            
            {role == "hr" ? (

          <Menu.SubMenu
            style={{
              width: "100%",
            }}
            icon={
              <img
                style={{ color: "white" }}
                src={empIcon}
                // src="/employees.png"
                alt="profile"
                className="Dash"
              />
            }
            key="sub2"
            title="Employees"
            mode="inline"
          >
                <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="8"
                >
                  Add Employee
                  <NavLink to="/Addemployee/AddEmployee" />
                </Menu.Item>
                <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="9"
                >
                  Employee List
                  <NavLink to="/EmployeeListPage/EmployeeList" />
                </Menu.Item>
                {/* <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="25"
                >
                  Hr PaySlip
                  <NavLink to="/Payslip2/HrPaySlip" />
                </Menu.Item> */}
          </Menu.SubMenu>
            ) : null}
          {/* <Menu.SubMenu
            className="arrow-div"
            style={{
              width: "100%",
            }}
            icon={<img src={appraisalIcon} alt="appraisal" className="Dash" />}
            key="sub4"
            title="Appraisal"
            mode="inline"
          >
            <Menu.Item
              className="arrow"
              icon={<img src={dot} alt="profile" className="dot" />}
              key="20"
            >
              Quarter Appraisal
              <NavLink to="/Appraisal/AppraisalPageHr" />
            </Menu.Item>
            <Menu.Item
              className="arrow"
              icon={<img src={dot} alt="profile" className="dot" />}
              key="20a"
            >
              Half Year Goal
              <NavLink to="/Appraisal/HalfYearGoalPage" />
            </Menu.Item>
          </Menu.SubMenu> */}
          {role == "hr" ? (
            <Menu.SubMenu
                className="arrow-div"
                style={{
                  width: "100%",
                }}
                icon={
                  <img
                    src={expenseIcon}
                    // src="/Expense.png"
                    alt="profile"
                    className="Dash"
                  />
                }
                key="sub1"
                title="Expense"
                mode="inline"
              >
                {/* <Menu.Item
                  className="arrow"
                  //  style={{
                  //     background: "#05445E",

                  //   }}
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="1"
                >
                  Dashboard
                  <NavLink to="/DashBoard" />
                </Menu.Item> */}
                <Menu.Item
                  className="arrow"
                  //  style={{
                  //     background: "#05445E",

                  //   }}
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="2"
                >
                  Add Expense
                  <NavLink to="/Expense/AddExpense" />
                </Menu.Item>
                <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="3"
                >
                  Expense List
                  <NavLink to="/Expense/ExpenseList" />
                </Menu.Item>
              </Menu.SubMenu>
          ) : null}

          <Menu.Item
            icon={
              <img
                src={userIcon}
                // src="/user.png"
                alt="profile"
                className="Dash"
              />
            }
            key="21"
          >
            My Profile
            <NavLink to="/Profile" />
          </Menu.Item>
          <Menu.Item
            icon={
              <img
                src={SettingIcon}
                // src="/user.png"
                alt="Setting"
                className="Dash"
              />
            }
            key="22"
          >
            Settings
            <NavLink to="/Setting" />
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default NewSidebar;
