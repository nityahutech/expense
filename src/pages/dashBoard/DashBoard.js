import React from "react";
import Charts from "../../components/Charts";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";


const DashBoard = () => {
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar />
      </div>

      <div className="sidecontainer">
        <Sidebar />
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
        <Charts />
        
        </div>  
      </div>
    </div>
  );
};

export default DashBoard;
