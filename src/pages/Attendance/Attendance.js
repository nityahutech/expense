import React, { useEffect, useState } from "react";
import AttendanceLog from "../../components/AttendanceLog";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";

function Attendance() {
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
  return accessToken ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub2"]}
          activeMenu={["4"]}
          accessToken={accessToken}
        />
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
          <AttendanceLog empDetails={{ userType: "emp", empid: 12 }} />
        </div>
      </div>
    </div>
  ) : null;
}

export default Attendance;
