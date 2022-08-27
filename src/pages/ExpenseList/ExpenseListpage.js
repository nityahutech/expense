import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Expenselist from "../../components/Expenselist";
import "../home/home.css";

const ExpenseListpage = () => {
    console.log("oota aitha");
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    let token = sessionStorage.getItem("accessToken");
    console.log({token});
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
        <Sidebar accessToken={accessToken}/>
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
