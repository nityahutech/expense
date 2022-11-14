import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Settingpage from "../../components/Settingpage";

const Setting = () => {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeMenu={["22"]}  selectedkey={['22']}/>
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
  ) : window.location.href = "/";
};
export default Setting;
