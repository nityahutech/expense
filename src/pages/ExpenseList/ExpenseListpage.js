import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Expenselist from "../../components/Expenselist";
import "../home/home.css";
const ExpenseListpage = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    let token = sessionStorage.getItem("accessToken");
    if (token === 'null') {
      window.location.href = "/";
    } else {
      setAccessToken(token);
    }
  }, []);
  return accessToken ?
  (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeSubMenu={["sub1"]}
          activeMenu={["3"]} accessToken={accessToken}/>
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Expenselist />
        </div>
      </div>
    </div>
  ): null;
};
export default ExpenseListpage;
