import React, {useState, useEffect} from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Settingpage from "../../components/Settingpage";

const DashBoard = () => {
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
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeMenu={["5"]}  selectedkey={['5']} accessToken={accessToken}/>
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
          <Settingpage />
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
