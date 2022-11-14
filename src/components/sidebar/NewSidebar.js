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
import SmallAttd from "../../images/samllattlogo.png"
import "./newSlidebar.css";
import SmallerLogo from "../../images/smallerLogo.png"
import { NavLink } from "react-router-dom";

const { Sider } = Layout;


const NewSidebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const role = sessionStorage.getItem("role");


  return (
    <Layout className="sidelayout">
      <Sider
        breakpoint="lg"
        style={{
          backgroundColor: "#05445E",
        }}
        collapsedWidth="0"
        onBreakpoint={(broken) => { }}
        onCollapse={(collapsed, type) => { }}
      >
        <Menu
          defaultOpenKeys={props.activeSubMenu || []}
          selectedKeys={props.activeMenu}
          mode="inline"
          style={{
            paddingBottom: "40px",
            height: "100vh",
          }}
        >
          <div className="sidebarTittle" style={{ height: "auto" }}>
            <img
              style={{
                background: "#05445E",
                height: "100px",
              }}
              src={logo}
              alt="hello"
            />
          </div>
          <Menu.Item
            className="arrow"
            icon={
              <img
                src={homePage}
                width="16px"
                alt="home"
              />
            }
            key="30"
          >
            <p className="sideFont">Home</p>
            <NavLink to="/DashBoard" />
          </Menu.Item>
          {role == "super" ? (
            <Menu.SubMenu
              style={{
                width: "100%",
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffffff',
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
              <Menu.Item
                icon={
                  <img
                    src={dot}
                    alt="onboarding"
                    className="dot"
                  />
                }
                key="31"
              >
                <p className="sideFont">Onboarding</p>
                <NavLink to="/Organization/Onboarding" />
              </Menu.Item>
            </Menu.SubMenu>
          ) : null}
          {role == "hr" ? (
            <Menu.Item
              icon={
                <img
                  style={{ color: "white" }}
                  src={CompanyProfile}
                  alt="profile"
                  className="Dash"
                />
              }
              key="32"
            >
              <p className="sideFont">Company Profile</p>
              <NavLink to="/CompanyProfile" />
            </Menu.Item>
          ) : null}
          {role != "super" ? (
            <>
              <Menu.Item
                className="arrow"
                icon={
                  <img
                    src={SmallAttd}
                    alt="profile"
                    style={{
                      width: "21px",
                      marginLeft: "-5px",
                    }}
                  />
                }
                key="6"
              >
                <p className="sideFont">Attendance</p>
                <NavLink to="/Attendance" />
              </Menu.Item>
              <Menu.Item

                icon={
                  <img
                    src={LeaveIcon}
                    alt="profile"
                    className="dot"
                    style={{
                      width: "32px",
                      marginLeft: "-9px",
                    }}
                  />
                }
                key="7"
              >
                <p className="leaveletter">Leave</p>
                <NavLink to="/Leave" />
              </Menu.Item>
            </>
          ) : null}

          {role == "hr" ? (

            <Menu.SubMenu
              style={{
                width: "100%",
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffffff',
              }}
              icon={
                <img
                  style={{ color: "white" }}
                  src={empIcon}
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
                <p className="sideFont">Add Employee</p>
                <NavLink to="/Employee/AddEmployee" />
              </Menu.Item>
              <Menu.Item
                className="arrow"
                icon={<img src={dot} alt="profile" className="dot" />}
                key="9"
              >
                Employee List
                <NavLink to="/Employee/EmployeeList" />
              </Menu.Item>
              {/* <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="25"
                >
                  Hr PaySlip
                  <NavLink to="/Employee/Payroll" />
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
                fontSize: '13px',
                fontWeight: '600',
                color: '#ffffff',
              }}
              icon={
                <img
                  src={expenseIcon}
                  alt="profile"
                  className="Dash"
                />
              }
              key="sub1"
              title="Expense"
              mode="inline"
            >
              <Menu.Item
                className="arrow"
                icon={<img src={dot} alt="profile" className="dot" />}
                key="2"
              >
                <p className="sideFont">Add Expense</p>
                <NavLink to="/Expense/AddExpense" />
              </Menu.Item>
              <Menu.Item
                className="arrow"
                icon={<img src={dot} alt="profile" className="dot" />}
                key="3"
              >
                <p className="sideFont">Expense List</p>
                <NavLink to="/Expense/ExpenseList" />
              </Menu.Item>
            </Menu.SubMenu>
          ) : null}

          <Menu.Item
            icon={
              <img
                src={userIcon}
                alt="profile"
                className="Dash"
              />
            }
            key="21"
          >
            <p className="sideFont">My Profile</p>
            <NavLink to="/Profile" />
          </Menu.Item>
          {/* </Menu>
        // <Menu
        //   selectedKeys={props.activeMenu}
        //   mode="inline"
        //   style={{
        //     padding: "0px",
        //     position: "absolute",
        //     bottom: "0" 
        //     // height: "37%",
        //     // display: "flex",
        //     // flexDirection: "column",
        //     // justifyContent: "flex-end"
        //   }}
        // > */}

          <Menu.Item

            style={{
              padding: "20px",
              position: "absolute",
              bottom: "0",
              zIndex: 100,
              // backgroundColor: 'rgb(5, 68, 94)'


            }}
            icon={
              <img
                src={SettingIcon}
                alt="Setting"
                className="Dash"
              />
            }
            key="22"
          >
            <p className="sideFont">Settings</p>
            <NavLink to="/Settings" />
          </Menu.Item>

        </Menu>
        {/* <div
          style={{
            padding: "20px",
            position: "absolute",
            bottom: "0",
            zIndex: 100,
            backgroundColor: 'rgb(5, 68, 94)'


          }}

        >
          <p>dddd</p>

        </div> */}
      </Sider>

    </Layout>

  );
};

export default NewSidebar;
