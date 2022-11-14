import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import CompanyProfile from "../components/CompanyProfile";

function CompanyProfilepage() {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeMenu={["32"]} selectedkey={["32"]} />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <CompanyProfile />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default CompanyProfilepage;
