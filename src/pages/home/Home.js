import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Expenselist from "../../components/Expenselist";
import "./home.css";

const home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="table">
          <div className="tables">
            <Expenselist />
          </div>
        </div>
      </div>
    </div>
  );
};

export default home;
