
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";

import MainDashBoard from "../components/MainDashBoard";
function MainDashboardPage() {

  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub5"]}
          activeMenu={["30"]}
        
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <MainDashBoard />
        </div>
      </div>
    </div>
  ) 
}
export default MainDashboardPage;
