import React, { useState } from "react";
import { Divider, Layout, Menu } from "antd";
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
import { NavLink, Link } from "react-router-dom";

const { Sider } = Layout;


const NewSidebar = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const role = sessionStorage.getItem("role");
  const isHr = role == "super" ? false : sessionStorage.getItem("isHr") == "true";


  return (
    <Layout className="sidelayout" >
      <Sider className="sidelayoutSider"
        breakpoint="lg"
        style={{
          backgroundColor: "#05445e",
          display: 'flex', flexDirection: 'column',

        }}
        collapsedWidth="0"
        onBreakpoint={(broken) => { }}
        onCollapse={(collapsed, type) => { }}
      >
        <div className="sidelayout-div" style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100vh'
        }}>
          <div className="sidelayout-div-img" style={{
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', height: '100vh'
          }}>
            <div className="sidebarTittle" style={{ height: "auto", }}>
              <img
                style={{

                  height: "100px",
                }}
                src={logo}
                alt="hello"
              />
            </div>
            <div className="sidelayout-menu" style={{
              overflowX: 'hidden',
              overflowY: 'auto',
              maxHeight: '70vh'
            }}>
              <Menu
                defaultOpenKeys={props.activeSubMenu || []}
                selectedKeys={props.activeMenu}
                mode="inline"
              // style={{
              //   // paddingBottom: "40px",
              //   height: "100vh",
              // }}
              >

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
                {role == "admin" || isHr ? (
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
                      <p className="sideFont leaveletter">Leave</p>
                      <NavLink to="/Leave" />
                    </Menu.Item>
                  </>
                ) : null}

                {role == "admin" || isHr ? (

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
                      <p className="sideFont">Employee List</p>
                      <NavLink to="/Employee/EmployeeList" />
                    </Menu.Item>
                    {/* <Menu.Item
                  className="arrow"
                  icon={<img src={dot} alt="profile" className="dot" />}
                  key="25"
                >
                  <p className="sideFont">Hr PaySlip</p>
                  <NavLink to="/Employee/Payroll" />
                </Menu.Item> */}
                  </Menu.SubMenu>
                ) : null}
                {role != "super" ? (
                  <Menu.SubMenu
                    className="arrow-div"
                    style={{
                      width: "100%",
                      fontSize: '13px',
                      fontWeight: '600',
                      color: '#ffffff',
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
                      <p className="sideFont">Quarter Appraisal</p>
                      <NavLink to="/Appraisal/AppraisalPageHr" />
                    </Menu.Item>
                    <Menu.Item
                      className="arrow"
                      icon={<img src={dot} alt="profile" className="dot" />}
                      key="20a"
                    >
                      <p className="sideFont">Half Year Goal</p>
                      <NavLink to="/Appraisal/HalfYearGoalPage" />
                    </Menu.Item>
                  </Menu.SubMenu>
                ) : null}
                {role == "admin" || isHr ? (
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


                {/* <Menu.Item

              // style={{
              //   padding: "20px",
              // }}
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

            </Menu.Item> */}

              </Menu>
            </div>
          </div>
          <div className="sidelayout-setting" style={{
            // padding: '20px',
            // borderTop: '1px solid #6e6eff',
            // alignItems: 'center',
            // width: '80%',
            // height: '80px',
            // display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'
          }}>
            <div>
              <Divider style={{

                margin: '0px',
                borderWidth: 1,
                // borderColor: 'rgb(5 70 179)',
                borderColor: '#ffffff',


              }} />
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginBottom: '20px',
              marginLeft: '24px',
              marginTop: '10px'

            }}>
              <div>
                <img style={{
                  height: '16px'

                }}
                  src={SettingIcon}
                  alt="Setting"
                // className="Dash"
                />
              </div>

              <div>

                <Link
                  to="/Settings"
                  className="sideFont"
                  style={{
                    fontWeight: "normal", paddingLeft: '10px', fontSize: '13px',
                    fontWeight: 600,
                    color: '#ffffff'

                  }}
                  rel="noopener noreferrer"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
        </div>



      </Sider>

    </Layout >

  );
};

export default NewSidebar;
