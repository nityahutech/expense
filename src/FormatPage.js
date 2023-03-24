import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";
import "./style/home.css";
import { useEffect, useState } from "react";
import IdleTimeOutHandler from "./IdleTimeoutHandler";

const FormatPage = (props) => {
    const [roleView, setRoleView] = useState(sessionStorage.getItem("roleView"))
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState({})
    let accessToken = sessionStorage.getItem("accessToken");

    useEffect(() => {
      getData();
    }, [])

    const getData = async () => {
      //getLeave
      //getConfigurations
      //
    }
  
    const switchRole = (role) => {
      setRoleView(role);
    };
  
    const switchRefresh = (value) => {
      setRefresh(value);
    };
    
    return accessToken && !(accessToken == "null") ? (
      <div className="home">
        <IdleTimeOutHandler switchRefresh={switchRefresh} />
        <div className="sidecontainer">
          <NewSidebar
            activeSubMenu={props.activeSubMenu}
            activeMenu={props.activeMenu}
          />
        </div>
        <div className="homeContainer">
          <div className="table">
            <Navbar
              roleView={roleView}
              switchRefresh={switchRefresh}
              switchRole={switchRole}
            />
          </div>
          <div className="tables">
            <props.main roleView={roleView} switchRole={switchRole} refresh={refresh} switchRefresh={switchRefresh} />
          </div>
        </div>
      </div>
    ) : window.location.href = "/";
}

export default FormatPage;