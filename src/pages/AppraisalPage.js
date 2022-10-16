import React, { useEffect, useState } from "react";
import Appraisal from "../components/Appraisal";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import { useAuth } from "../contexts/AuthContext";
function AppraisalPage() {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const { currentUser } = useAuth();
  // const role = getRole();
  // async function getRole() {
  //   let res = await ProfileContext.getProfile(currentUser.uid);
  //   return res.data();
  // }
  useEffect(() => {
    let role = sessionStorage.getItem("role");
    setRole(role)
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
          activeSubMenu={["sub4"]}
          activeMenu={["19"]}
          accessToken={accessToken}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Appraisal  />
        </div>
      </div>
    </div>
  ) : null;
}
export default AppraisalPage;
