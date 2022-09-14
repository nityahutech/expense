import React from "react";
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
  console.log(props.openkey);
  const history = useNavigate();
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
                    onSelect={function ({ item, key, keyPath, selectedKeys, domEvent })  { console.log(item, key, keyPath, selectedKeys, domEvent); }}
                    mode='inline' style={{
                        padding: '0px', height: '100vh',
                    }}>
                    <div className='sidebarTittle'>

                        <img style={{

                            background: '#05445E',
                            height: '30px',

                        }} src="/logo/logo_1.png" alt='hello' />

                    </div>
                    <Menu.Item icon={<img src="/logo/Dashboard.png" alt="profile" className="Dash" />} key="1">
                        Dashboard
                        <NavLink to="/DashBoard" />
                    </Menu.Item>

                    <Menu.SubMenu icon={<img  src="/logo/Expense.png" alt="profile" className="Dash" />} key="sub1" title="Expense" mode='inline'>

                        <Menu.Item icon={<img src="/logo/dot.png" alt="profile" className="dot" />} key="2">
                            Add Expense
                            <NavLink to="/Expense/AddExpense" />
                        </Menu.Item>
                        <Menu.Item icon={<img  src="/logo/dot.png" alt="profile" className="dot" />} key="3">
                            Expense List
                            <NavLink to="/Expense/ExpenseList" />
                        </Menu.Item>

                    </Menu.SubMenu>

                    <Menu.SubMenu icon={<img style={{color:'white', backgroundColor:'white'}} src="/logo/Time-Attendance.png"alt="profile" className="Dash" />} key="sub2" title="Employee" mode='inline'>

                        <Menu.Item icon={<img src="/logo/dot.png" alt="profile" className="dot" />} key="4">
                            Attendance Log
                            <NavLink to="/" />
                        </Menu.Item>
                        <Menu.Item icon={<img src="/logo/dot.png" alt="profile" className="dot" />} key="7">
                            Leave 
                            <NavLink to="/Employee/Leave" />
                        </Menu.Item>

                    </Menu.SubMenu>

                    <Menu.Item icon={<ProfileOutlined style={{ color: "#FFFFFF" }} />} key="4">
                        Profile
                        <NavLink to="/Profile" />
                    </Menu.Item>
                    <Menu.Item icon={<SettingOutlined style={{ color: "#FFFFFF" }} />} key="5">
                        Settings
                        <NavLink to="/Setting" />
                    </Menu.Item>



                </Menu>

             
            </Sider>
        </Layout>
)}

export default NewSidebar;