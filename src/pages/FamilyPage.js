import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../components/navbar/Navbar';
import Family from '../components/ProfileDetails/Family';
import Sidebar from "../components/sidebar/NewSidebar";

const FamilyPage = () => {
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
  activeMenu={["14"]} accessToken={accessToken}/>
    </div>

    <div className="homeContainer">
        <div className="table">
            <Navbar />
        </div>

        <div className="tables">
        <Family />
        </div>
    </div>
</div>  )
}

export default FamilyPage