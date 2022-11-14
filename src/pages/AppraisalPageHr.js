import AppraisalHr from "../components/quarterApp/appraisalHomePage";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";

function AppraisalPage() {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub4"]}
          activeMenu={["20"]}
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
  ) : window.location.href = "/";
};

export default AppraisalPage;
