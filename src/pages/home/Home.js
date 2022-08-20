import React from "react";
import Navbar from "../../components/navbar/Navbar";
import NewSider from '../../components/sidebar/NewSidebar'
import Expenselist from "../../components/Expenselist";
import "./home.css";

const home = () => {
  return (
    <div className="home">

    <div className="sidecontainer">

      <NewSider />
    </div>

    <div className="homeContainer">
      <div className="table" >
        <Navbar />
      </div>

      <div className="tables">
        <Expenselist />
      </div>

    </div>
  </div>
  );
};

export default home;
