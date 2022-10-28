import React, { useState } from "react";
import { Layout, Menu } from "antd";
import expenseIcon from "../../images/Expense.png"
import dot from "../../images/dot.png"
import dashIcon from "../../images/Dashboard.png"
import empIcon from "../../images/employees.png"
import userIcon from "../../images/user.png"
import logo from "../../images/logo_1.png"
import appraisalIcon from "../../images/appraisal.png"
import "./newSlidebar.css";
import { NavLink } from "react-router-dom";

const { Sider } = Layout;

function getItem(label, key, icon, children = null, type = null) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const NewSidebar = (props) => {
  const [isHr, setIsHr] = useState(sessionStorage.getItem("role") === "hr" ? true : false);

  return (
    <Layout className="sidelayout">
      <Sider
        breakpoint="lg"
        style={{ backgroundColor: "#05445E" }}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
        }}
        onCollapse={(collapsed, type) => {
        }}
      >
        <Menu
          defaultOpenKeys={props.activeSubMenu || []}
          selectedKeys={props.activeMenu}
          // openKeys={props.openkey}
          // selectedKeys={props.selectedkey}
          onSelect={function ({ item, key, keyPath, selectedKeys, domEvent }) {
          }}
          mode="inline"
          style={{
            padding: "0px",
            height: "100vh",
          }}
        >
          <div className="sidebarTittle">
            <img
              style={{
                background: "#05445E",
                height: "30px",
              }}
              // src="/logo_1.png"
              src={logo}
              alt="hello"
            />
          </div>
          <Menu.Item
            icon={
              <img
                src={dashIcon}
                // src="/Dashboard.png" 
                alt="profile" className="Dash" />
            }
            key="1"
          >
            Dashboard
            <NavLink to="/DashBoard" />
          </Menu.Item>

          <Menu.SubMenu style={{

            width: '100%'
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
            title="Employee"
            mode="inline"
          >
            <Menu.Item className='arrow'
              icon={<img
                // src="/dot.png"
                src={dot}
                alt="profile" className="dot" />}
              key="6"
            >
              Attendance Log
              <NavLink to="/Attendance/AttendanceLog" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img
                // src="/dot.png"
                src={dot}
                alt="profile" className="dot" />}
              key="7"
            >
              Leave
              <NavLink to="/Employee/Leave" />
            </Menu.Item>
            {isHr ? <>
              <Menu.Item className='arrow'
                icon={<img
                  src={dot}
                  alt="profile" className="dot" />}
                key="8"
              >
                Add Employee
                <NavLink to="/Addemployee/AddEmployee" />
              </Menu.Item>
              <Menu.Item className='arrow'
                icon={<img
                  src={dot}
                  alt="profile" className="dot" />}
                key="9"
              >
                Employee List
                <NavLink to="/EmployeeListPage/EmployeeList" />
              </Menu.Item>
              <Menu.Item
                className="arrow"
                icon={<img
                  src={dot}
                  alt="profile" className="dot" />}
                key="25"
              >
                Hr PaySlip
                <NavLink to="/Payslip2/HrPaySlip" />
              </Menu.Item>
            </>
              :
              null
            }
          </Menu.SubMenu>

          {/* PREVIOUS PROFILE TABS COMMENTED */}
          {/* ---------------------------------------------------- */}

          {/* <Menu.SubMenu  style={{
            
            width:'100%'
             }}
            icon={
              <img
                style={{ color: "" }}
                src="/logo/user.png"
                alt="profile"
                className="Dash"
              />
            }
            key="sub3"
            title="Profile"
            mode="inline"
          >
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="10"
            >
              Personal
              <NavLink to="/PersonalPage/Personal" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="11"
            >
              Work
              <NavLink to="/WorkPage/work" />
            </Menu.Item>

            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="12"
            >
              Team
              <NavLink to="/TeamPage/Team" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="13"
            >
              Education
              <NavLink to="/EducationPage/Education" />
            </Menu.Item>
            <Menu.Item
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="14"
            >
              Family
              <NavLink to="/FamilyPage/Family" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="15"
            >
              Documents
              <NavLink to="/DocumentsPage/Document" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="16"
            >
              Work week
              <NavLink to="/WorkWeekPage/WorkWeek" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="17"
            >
              Pay Slip
              <NavLink to="/PaySlipPage/PaySlip" />
            </Menu.Item>
            {isHr ?
              <Menu.Item
                className="arrow"
                icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
                key="21"
              >
                Hr PaySlip
                <NavLink to="/Payslip2/HrPaySlip" />
              </Menu.Item>
              : null
            }
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="18"
            >
              Bank Account
              <NavLink to="/BankAccountpages/BankAccount" />
            </Menu.Item>
          </Menu.SubMenu> */}
          <Menu.Item
            icon={
              <img
                src={userIcon}
                // src="/user.png"
                alt="profile" className="Dash" />
            }
            key="21"
          >
            My Profile
            <NavLink to="/Profile" />
          </Menu.Item>

          {/* <Menu.Item
            icon={
              <img
                style={{ color: "" }}
                src="/user.png"
                alt="profile"
                className="Dash"
              />
            }
            key="4"
          >
            Profile
            <NavLink to="/Profile" />
          </Menu.Item> */}

          <Menu.SubMenu
            className="arrow-div"
            style={{
              width: "100%",
            }}
            icon={
              <img src={appraisalIcon} alt="appraisal" className="Dash" />
            }
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
          </Menu.SubMenu>

          {/* <Menu.Item className ='arrow'
            icon={
              <img
                style={{ color: "" }}
                src="/settings.png"
                alt="profile"
                className="Dash"
              />
            }
            key="5"
          >
            Settings
            <NavLink to="/Setting" />
          </Menu.Item> */}
          {isHr ?
            <><Menu.SubMenu className="arrow-div" style={{

              width: '100%'
            }}
              icon={
                <img
                  src={expenseIcon}
                  // src="/Expense.png"
                  alt="profile" className="Dash" />
              }
              key="sub1"
              title="Expense"
              mode="inline"
            >
              <Menu.Item className='arrow'
                //  style={{
                //     background: "#05445E",

                //   }}
                icon={<img
                  src={dot}
                  alt="profile" className="dot" />}
                key="2"
              >
                Add Expense
                <NavLink to="/Expense/AddExpense" />
              </Menu.Item>
              <Menu.Item className='arrow'
                icon={<img
                  src={dot}
                  alt="profile" className="dot" />}
                key="3"
              >
                Expense List
                <NavLink to="/Expense/ExpenseList" />
              </Menu.Item>
            </Menu.SubMenu>
            </>
            : null
          }


        </Menu>
      </Sider>
    </Layout>
  );
};

export default NewSidebar;