import Navbar from "../../components/navbar/Navbar";
import Profile from "../../components/Profilepage";
import Sidebar from "../../components/sidebar/NewSidebar";

const DashBoard = () => {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar 
          activeMenu={["21"]} selectedkey={['21']} />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
        <Profile />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default DashBoard;
