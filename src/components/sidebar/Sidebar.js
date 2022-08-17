
// import './sidebar.css';
import { useNavigate } from "react-router-dom";
import React from 'react'
import { useState } from 'react'
import {

  MenuFoldOutlined,
  MenuUnfoldOutlined,

} from "@ant-design/icons";
import { Button, Menu } from "antd";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [



  getItem('Dashboard', '1',
    <img
      src="logo/Dashboard.png" alt='hello'
      className="Dash"

    />
  ),
  getItem('Expense', 'sub1',
    <img
      src="logo/Expense.png" alt='hello'
      className="Dash"
    />
    , [

      getItem('Add Expense', '5',
        <img
          src="logo/dot.png" alt='hello'
          className="dot"
        />
      ),
      getItem('Expense List', '6',
        <img
          src="logo/dot.png" alt='hello'
          className="dot"
        />),
    ]),
];
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const history = useNavigate()
  const onClick = (e) => {
console.log(e);
    let pathkey = e.key
    switch (pathkey) {
      case "5":
        // window.location.href="/ExpenseFrm"
        history("/ExpenseFrm")
        break;

      case "6":
        // window.location.href = "/Home"
        history("/Home")
        break;

      case "1":
        // window.location.href = "/DashBoard"
        history("/DashBoard")
        break;
    }
    console.log('click ', e.key);
  };

  return (
    <div className="sidebarTop"
    
    >
      <div className="sidebarTittle">
        <img style={{
          display: collapsed ? "none" : "block",
          background: '#05445E'

        }} src="logo/logo_1.png" alt='hello' />

        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            marginBottom: 16,
            background: '#05445E',
         
            borderColor: '#05445E'
   
              

          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>

      <Menu
        onClick={()=>onClick()}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"

        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );

}

export default Sidebar