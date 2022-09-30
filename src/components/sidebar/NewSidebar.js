import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";

import "./newSlidebar.css";
import { useNavigate, NavLink } from "react-router-dom";
import { SettingOutlined, ProfileOutlined } from "@ant-design/icons";

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
  const [isHr, setIsHr] = useState(sessionStorage.getItem("role")==="hr"?true:false);

  console.log(props.openkey);
  const history = useNavigate();

  // useEffect(() => {
  //   let role = sessionStorage.getItem("role");
  //   setRole(role)
  //   setIsHr(role === "hr")
  // })
  // const onClick = (e) => {
  //     let pathkey = e.key
  //     switch (pathkey) {
  //         case "5":
  //             window.location.href="/ExpenseFrm"
  //             history("/Expense/AddExpense")
  //             break;
  //         case "6":
  //             window.location.href = "/Home"
  //             history("/Expense/ExpenseList")
  //             break;
  //         case "1":
  //             window.location.href = "/DashBoard"
  //             history("/DashBoard")
  //             break;
  //     }
  //     console.log('click ', e.key);
  // };

  return (
    <Layout className="sidelayout">
      <Sider
        breakpoint="lg"
        style={{ backgroundColor: "#05445E" }}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <Menu
          defaultOpenKeys={props.activeSubMenu || []}
          selectedKeys={props.activeMenu}
          // openKeys={props.openkey}
          // selectedKeys={props.selectedkey}
          onSelect={function ({ item, key, keyPath, selectedKeys, domEvent }) {
            console.log(item, key, keyPath, selectedKeys, domEvent);
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
              src="/logo/logo_1.png"
              alt="hello"
            />
          </div>
          <Menu.Item
            icon={
              <img src="/logo/Dashboard.png" alt="profile" className="Dash" />
            }
            key="1"
          >
            Dashboard
            <NavLink to="/DashBoard" />
          </Menu.Item>
            { isHr ? 
            <><Menu.SubMenu className="arrow-div"  style={{
            
            width:'100%'
             }}
           icon={
             <img src="/logo/Expense.png" alt="profile" className="Dash" />
           }
           key="sub1"
           title="Expense"
           mode="inline"
         >
           <Menu.Item className ='arrow'
           //  style={{
           //     background: "#05445E",
             
           //   }}
             icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
             key="2"
           >
             Add Expense
             <NavLink to="/Expense/AddExpense" />
           </Menu.Item>
           <Menu.Item className ='arrow'
             icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
             key="3"
           >
             Expense List
             <NavLink to="/Expense/ExpenseList" />
           </Menu.Item>
         </Menu.SubMenu>
          </>
         : null
         }
          

          <Menu.SubMenu style={{

            width: '100%'
          }}
            icon={
              <img
                style={{ color: "white" }}
                src="/logo/employees.png"
                alt="profile"
                className="Dash"
              />
            }
            key="sub2"
            title="Employee"
            mode="inline"
          >
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="6"
            >
              Attendance Log
              <NavLink to="/Attendance/AttendanceLog" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="7"
            >
              Leave
              <NavLink to="/Employee/Leave" />
            </Menu.Item>
            { isHr ? <>
            <Menu.Item className ='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="8"
            >
              Add Employee
              <NavLink to="/Addemployee/AddEmployee" />
            </Menu.Item>
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="9"
            >
              Employee List
              <NavLink to="/EmployeeListPage/EmployeeList" />
            </Menu.Item>
            </>
            :
            null
            }
          </Menu.SubMenu>

          <Menu.SubMenu style={{

            width: '100%'
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
            <Menu.Item className='arrow'
              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="18"
            >
              Bank Account
              <NavLink to="/BankAccountpages/BankAccount" />
            </Menu.Item>
          </Menu.SubMenu>

          {/* <Menu.Item
            icon={
              <img
                style={{ color: "" }}
                src="/logo/user.png"
                alt="profile"
                className="Dash"
              />
            }
            key="4"
          >
            Appraisal
            <NavLink to="/Profile" />
          </Menu.Item> */}

          <Menu.SubMenu className="arrow-div" style={{

            width: '100%'
          }}
            icon={
              <img src="/logo/appraisal.png" alt="appraisal" className="Dash" />
            }
            key="sub4"
            title="Appraisal"
            mode="inline"
          >
            <Menu.Item className='arrow'

              icon={<img src="/logo/dot.png" alt="appraisal" className="dot" />}
              key="19"
            >
              Employees
              <NavLink to="/Appraisal/AppraisalPage" />
            </Menu.Item>

            <Menu.Item className='arrow'

              icon={<img src="/logo/dot.png" alt="profile" className="dot" />}
              key="20"
            >
              Hr Corner
              <NavLink to="/Appraisal/AppraisalPageHr" />
            </Menu.Item>

          </Menu.SubMenu>

          <Menu.Item className='arrow'
            icon={
              <img
                style={{ color: "" }}
                src="/logo/settings.png"
                alt="profile"
                className="Dash"
              />
            }
            key="5"
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
