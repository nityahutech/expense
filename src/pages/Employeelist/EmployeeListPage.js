import React, { useEffect, useState } from "react";
import AttendanceLog from "../../components/AttendanceLog";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import { useAuth } from "../../contexts/AuthContext";
import EmployeeList from "../../components/EmployeeList";
function EmployeeListPage() {
  const [accessToken, setAccessToken] = useState(null);
  const { currentUser, role } = useAuth();
  // const role = getRole();
  // async function getRole() {
  //   let res = await ProfileContext.getProfile(currentUser.uid);
  //   return res.data();
  // }
  useEffect(() => {
    let token = sessionStorage.getItem("accessToken");
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
          activeMenu={["9"]}
          accessToken={accessToken}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <EmployeeList />
        </div>
      </div>
    </div>
  ) : null;
}
export default EmployeeListPage;
