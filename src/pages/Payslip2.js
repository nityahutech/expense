import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import HrPaySlip from "../components/ProfileDetails/HrPaySlip";
import Sidebar from "../components/sidebar/NewSidebar";

const Payslip2 = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    let token = sessionStorage.getItem("accessToken");
    console.log({ token });
    if (token === "null") {
      window.location.href = "/";
    } else {
      setAccessToken(token);
    }
  }, []);
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub2"]}
          activeMenu={["25"]}
          accessToken={accessToken}
        />
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
          <HrPaySlip />
        </div>
      </div>
    </div>
  );
};

export default Payslip2;
