import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../components/navbar/Navbar';
import Sidebar from "../components/sidebar/NewSidebar";
import Team from '../components/ProfileDetails/Team';
const TeamPage = () => {
  const [accessToken, setAccessToken] = useState(null);
   useEffect(() => {
      let token = sessionStorage.getItem("accessToken");
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
  activeMenu={["12"]} accessToken={accessToken}/>
    </div>
    <div className="homeContainer">
        <div className="table">
            <Navbar />
        </div>
        <div className="tables">
        <Team />
        </div>
    </div>
</div>
  )
}
export default TeamPage