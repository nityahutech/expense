import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../components/navbar/Navbar';
import PaySlip from '../components/ProfileDetails/PaySlip';
import Sidebar from "../components/sidebar/NewSidebar";

const PaySlipPage = () => {
  const [accessToken, setAccessToken] = useState(null);
 
  useEffect(() => {
      let token = sessionStorage.getItem("accessToken");
      console.log({ token });
      if (token === 'null') {
          window.location.href = "/";
      } else {
          setAccessToken(token);
      }
  }, []);
  return (
<div className="home">
    <div className="sidecontainer">
    <Sidebar activeSubMenu={["sub3"]}
  activeMenu={["17"]} accessToken={accessToken}/>
    </div>

    <div className="homeContainer">
        <div className="table">
            <Navbar />
        </div>

        <div className="tables">
        <PaySlip />
        </div>
    </div>
</div>  )
}

export default PaySlipPage