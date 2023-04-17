import { useState } from "react";
import { Divider, Layout, Menu } from "antd";
import { NavLink, Link } from "react-router-dom";
import expenseIcon from "../../images/Expense.png";
import dot from "../../images/dot.png";
import empIcon from "../../images/Employees.png";
import userIcon from "../../images/user.png";
import assetMag from "../../images/AssetManageLogo.svg";
import logo from "../../images/SidebarLogo.svg";
import appraisalIcon from "../../images/appraisal.png";
import Organization from "../../images/Organization.png";
import CompanyProfile from "../../images/Companyprofile.png";
import SettingIcon from "../../images/gear.png";
import homePage from "../../images/homeIcon.png";
import LeaveIcon from "../../images/smallLeaveLogo.png";
import SmallAttd from "../../images/attendanceSB.png";
import travel from "../../images/map.svg";
import "./newSlidebar.css";
import {
  CalendarFilled,
  CalendarOutlined,
  CompassFilled,
  CompassOutlined,
  DesktopOutlined,
  FundProjectionScreenOutlined,
  GlobalOutlined,
  HomeFilled,
  HomeOutlined,
  IdcardOutlined,
  PieChartFilled,
  ProfileFilled,
  ProfileOutlined,
  ScheduleFilled,
  ScheduleOutlined,
  SettingFilled,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
  WalletFilled,
  RadarChartOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

const NewSidebar = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [collapsePoint, setCollapsePoint] = useState(false);
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  const setCollapsibleStatus = () => collapsePoint && setCollapsed(true);
  return (
    <Layout className="sidelayout">
      <Sider
        className="sidelayoutSider"
        breakpoint="lg"
        style={{
          backgroundColor: "#045477",
          display: "flex",
          flexDirection: "column",
        }}
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          setCollapsed(broken);
          setCollapsePoint(broken);
        }}
        onCollapse={(collapsed, type) => {
          setCollapsed(collapsed);
        }}
        collapsed={collapsed}
      >
        <div
          className="sidelayout-div"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <div
            className="sidelayout-div-img"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              height: "100vh",
            }}
          >
            <div
              className="sidebarTittle"
              style={{
                height: "auto",
                backgroundColor: "#045477",
                margin: "0px",
                padding: "0px",
              }}
            >
              <img
                style={{
                  height: "auto",
                  width: "180px",
                  padding: "5px",
                  marginLeft: "10px",
                  marginTop: "5px",
                }}
                src={logo}
                alt="hello"
              />
            </div>
            <div
              className="sidelayout-menu"
              style={{
                overflowX: "hidden",
                overflowY: "auto",
                maxHeight: "82vh",
              }}
            >
              <Menu
                defaultOpenKeys={props.activeSubMenu || []}
                selectedKeys={props.activeMenu}
                mode="inline"
                onClick={() => {
                  setCollapsibleStatus();
                }}
                // style={{
                //   // paddingBottom: "40px",
                //   height: "100vh",
                // }}
              >
                <Menu.Item
                  className="arrow"
                  icon={
                    <HomeFilled
                      style={{ color: "#ffffff", fontSize: "17px" }}
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
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#ffffff",
                    }}
                    icon={
                      <GlobalOutlined
                        style={{ color: "#ffffff", fontSize: "17px" }}
                      />
                    }
                    key="sub5"
                    title="Organization"
                    mode="inline"
                  >
                    <Menu.Item
                      icon={<img src={dot} alt="onboarding" className="dot" />}
                      key="31"
                    >
                      <p className="sideFont">Onboarding</p>
                      <NavLink to="/Organization/Onboarding" />
                    </Menu.Item>
                  </Menu.SubMenu>
                ) : null}
                {role == "admin" || isHr ? (
                  <>
                    <Menu.Item
                      icon={
                        <ProfileOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="32"
                    >
                      <p className="sideFont">Company Profile</p>
                      <NavLink to="/CompanyProfile" />
                    </Menu.Item>

                    <Menu.SubMenu
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                      icon={
                        <TeamOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
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
                        <p className="sideFont">View Employees</p>
                        <NavLink to="/Employee/EmployeeList" />
                      </Menu.Item>
                      <Menu.Item
                        className="arrow"
                        icon={<img src={dot} alt="profile" className="dot" />}
                        key="25"
                      >
                        <p className="sideFont">Payroll Manager</p>
                        <NavLink to="/Employee/Payroll" />
                      </Menu.Item>
                    </Menu.SubMenu>
                  </>
                ) : null}
                {role != "super" ? (
                  <>
                    <Menu.Item
                      className="arrow"
                      icon={
                        <ScheduleFilled
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="6"
                    >
                      <p className="sideFont">Attendance</p>
                      <NavLink className="navLink" to="/Attendance" />
                    </Menu.Item>
                    <Menu.Item
                      icon={
                        <CalendarOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="7"
                    >
                      <p className="sideFont leaveletter">Leave</p>
                      <NavLink to="/Leave" />
                    </Menu.Item>
                    <Menu.SubMenu
                      className="arrow-div"
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                      icon={
                        <FundProjectionScreenOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
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
                    <Menu.Item
                      icon={
                        <DesktopOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="22"
                    >
                      <p className="sideFont">Assets</p>
                      <NavLink to="/Assets" />
                    </Menu.Item>
                    <Menu.SubMenu
                      className="arrow-div"
                      style={{
                        width: "100%",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#ffffff",
                      }}
                      icon={
                        <PieChartFilled
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="sub1"
                      title="Expense"
                      mode="inline"
                    >
                      {role == "admin" || isHr ? (
                        <>
                          <Menu.Item
                            className="arrow"
                            icon={
                              <img src={dot} alt="profile" className="dot" />
                            }
                            key="2"
                          >
                            <p className="sideFont">Add Expense</p>
                            <NavLink to="/Expense/AddExpense" />
                          </Menu.Item>
                          <Menu.Item
                            className="arrow"
                            icon={
                              <img src={dot} alt="profile" className="dot" />
                            }
                            key="3"
                          >
                            <p className="sideFont">Expense List</p>
                            <NavLink to="/Expense/ExpenseList" />
                          </Menu.Item>
                        </>
                      ) : null}
                      <Menu.Item
                        className="arrow"
                        icon={<img src={dot} alt="profile" className="dot" />}
                        key="23"
                      >
                        <p className="sideFont">Invoice Reimbursement</p>
                        <NavLink to="/Expense/InvoiceReimbursement" />
                      </Menu.Item>
                    </Menu.SubMenu>
                    <Menu.Item
                      icon={
                        <CompassOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="24"
                    >
                      <p className="sideFont">Travel Management</p>
                      <NavLink to="/TravelManagement" />
                    </Menu.Item>
                    <Menu.Item
                      icon={
                        <RadarChartOutlined
                          style={{ color: "#ffffff", fontSize: "17px" }}
                        />
                      }
                      key="25"
                    >
                      <p className="sideFont">Feedback</p>
                      <NavLink to="/Feedback" />
                    </Menu.Item>
                  </>
                ) : null}
                <Menu.Item
                  icon={
                    <UserOutlined
                      style={{ color: "#ffffff", fontSize: "15px" }}
                    />
                  }
                  key="21"
                >
                  <p className="sideFont">My Profile</p>
                  <NavLink to="/Profile" />
                </Menu.Item>
              </Menu>
            </div>
          </div>
          {/* --------------------setting---------------- */}
          <div
            className="sidelayout-setting"
            style={
              {
                // padding: '20px',
                // borderTop: '1px solid #6e6eff',
                // alignItems: 'center',
                // width: '80%',
                // height: '80px',
                // display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'
              }
            }
          >
            <div>
              <Divider
                style={{
                  margin: "0px",
                  borderWidth: 1,
                  // borderColor: 'rgb(5 70 179)',
                  borderColor: "#ffffff",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: "20px",
                marginLeft: "24px",
                marginTop: "10px",
              }}
            >
              <div>
                <SettingOutlined
                  style={{ color: "#ffffff", fontSize: "15px" }}
                />
              </div>

              <div>
                <Link
                  to="/Settings"
                  className="sideFont"
                  style={{
                    fontWeight: "normal",
                    paddingLeft: "10px",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: "#ffffff",
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
    </Layout>
  );
};

export default NewSidebar;
