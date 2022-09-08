import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profilepage";
import Sidebar from "../../components/sidebar/NewSidebar";

const DashBoard = () => {
 
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar 
          activeMenu={["4"]} selectedkey={['4']}  />
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
        <Profile />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
