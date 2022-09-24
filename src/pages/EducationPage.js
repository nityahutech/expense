import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../components/navbar/Navbar';
import Sidebar from "../components/sidebar/NewSidebar";
import Education from '../components/ProfileDetails/Education';


const EducationPage = () => {
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
  activeMenu={["13"]} accessToken={accessToken}/>
    </div>

    <div className="homeContainer">
        <div className="table">
            <Navbar />
        </div>

        <div className="tables">
        <Education />
        </div>
    </div>
</div>
  )
}

export default EducationPage