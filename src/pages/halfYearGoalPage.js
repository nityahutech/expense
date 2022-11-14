import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import HalfYearGoalHome from '../components/halfYearGoal/halfYearGoalHome'

function HalfYearGoalPage() {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub4"]}
          activeMenu={["20a"]}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <HalfYearGoalHome />


        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default HalfYearGoalPage;
