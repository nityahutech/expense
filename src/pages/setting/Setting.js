import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Settingpage from "../../components/Settingpage";

const DashBoard = () => {
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeMenu={["5"]}  selectedkey={['5']}/>
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
          <Settingpage />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
