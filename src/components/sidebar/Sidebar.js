
import './sidebar.css';
import { useNavigate } from "react-router-dom";
import React from 'react'
import { useState } from 'react'
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined
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
      src="logo/Dashboard.png" alt='image'
      className="Dash"

    />
  ),
  getItem('Expense', 'sub1',
    <img
      src="logo/Expense.png" alt='image'
      className="Dash"
    />
    , [

      getItem('Add Expense', '5',
        <img
          src="logo/dot.png" alt='image'
          className="dot"
        />
      ),
      getItem('Expense List', '6',
        <img
          src="logo/dot.png" alt='image'
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
      // style={{
      //   width: 256,
      //   height: "1000px",
      //   background: '#05445E'
      // }}
    >
      <div className="sidebarTittle">
        <img style={{
          display: collapsed ? "none" : "block",
          background: '#05445E'

        }} src="logo/logo_1.png" alt='image' />

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
        onClick={onClick}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="light"

        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
  //   return (


  //     // org
  //     <div style={{ width: collapsed ? "200px" : "50px" }} className='sidebar' >
  //       <div className='top_section'>
  //         {/* <div className='tops'>
  //           <img
  //             src="logo/logo_1.png" alt='image'
  //             className="logos"
  //           />
  //         </div> */}

  //         {/* <div className="Tittle" >
  //           <h2 style={{color: "#FFFFFF"}}>exepense</h2>
  //         </div> */}

  //         <div className="Tittle">
  //           <img style={{
  //             display: collapsed ? "block" : "none",
  //             background:'#05445E'

  //           }}src="logo/logo_1.png" alt='image' />
  // {/* 
  //           <h2 style={{
  //             display: collapsed ? "block" : "none",
  //             color: 'white',

  //           }}
  //             className="logo">exepense</h2> */}
  //         </div>

  //         <div style={{
  //           marginLeft: collapsed ? "10px" : "0px",
  //           marginTop: collapsed ? "10px" : "10px",
  //           marginBottom: collapsed ? "10px" : "10px",
  //         }}
  //           className="bars">
  //           <MenuUnfoldOutlined onClick={toggleCollapsed} />


  //         </div>


  //         {/*         
  //         <icon
  //           type="primary"
  //           onClick={toggleCollapsed}
  //           style={{
  //             marginBottom: 16,
  //             marginTop: 10,
  //             marginLeft: 10,


  //           }}
  //         >
  //           {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
  //         </icon> */}


  //       </div>

  //       <Menu
  //         onClick={onClick}
  //         style={{
  //           width: 210,
  //           height: "1000px"

  //         }}

  //         defaultSelectedKeys={['1']}
  //         defaultOpenKeys={['sub1']}
  //         mode="inline"
  //         style={{
  //           height: "1000px"
  //         }}

  //         // inlineCollapsed={collapsed}
  //         items={items}
  //       />

  //     </div>

  //   )
}

export default Sidebar