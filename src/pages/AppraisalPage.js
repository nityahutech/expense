import Appraisal from "../components/quarterApp/appraisalForm";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";

function AppraisalPage() {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub4"]}
          activeMenu={["19"]}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Appraisal />
          {/* <appraisalEmployeeList /> */}
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default AppraisalPage;
