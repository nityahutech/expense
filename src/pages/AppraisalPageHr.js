import React, { useEffect, useState } from "react";
import AppraisalHr from "../components/quarterApp/appraisalHomePage";
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
          activeMenu={["20"]}
          accessToken={accessToken}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <AppraisalHr />
        </div>
      </div>
    </div>
  ) : null;
}
export default AppraisalPage;
