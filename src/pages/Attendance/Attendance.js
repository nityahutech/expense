import { useEffect, useState } from "react";
import AttendanceLog from "../../components/AttendanceLog";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";

function Attendance() {

  const accessToken = sessionStorage.getItem("accessToken");
  const [roleView, setRoleView] = useState(sessionStorage.getItem("roleView"));

  const switchRole = (role) => {
    setRoleView(role)
  }

  useEffect(() => {
    console.log(roleView)
  }, [roleView])

  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeMenu={["6"]}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar roleView={roleView} switchRole={switchRole} />
        </div>
        <div className="tables">
          <AttendanceLog roleView={roleView}/>
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default Attendance;
