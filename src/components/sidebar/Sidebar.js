
import './sidebar.css';
import { Link } from "react-router-dom";
import { Menu } from 'antd';
import React from 'react'
import { useState } from 'react'


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
    src="logo/Dashboard.png" 
    className="Dash"
   
  />
  ),
  getItem('Expense', 'sub1', 
  <img
    src="logo/Expense.png" 
    className="Dash"
  />
    , [

      getItem('Add Expense', '5', 
      <img
        src="logo/dot.png"
        className="dot"
      />
      ),
      getItem('Expense List', '6', 
      <img
        src="logo/dot.png" 
        className="dot"
      />),


    ]),

];


const Sidebar = () => {


  const onClick = (e) => {
    let pathkey=e.key
    switch(pathkey){
      case "5":
        window.location.href="/ExpenseFrm"
        break;
        case "6":
          window.location.href="/Home"
          break;  case "1":
          window.location.href="/DashBoard"
          break;


    }
    console.log('click ', e.key);
  };



  return (
    <div className='sidebar' >

      <div className='top'>

        <div className='tops'>
          <img
            src="logo/logo_1.png" 
            className="logos"
          />
        </div>

        <div >
          <img
            src="logo/collapse.png" 
            className="collapse"
          />
        </div>

      </div>


      <Menu
        onClick={onClick}
        style={{
          width: 210,
        }}

        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}

        mode="inline"
        items={items}
      />

    </div>


  )
}

export default Sidebar