import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import EmployeeList from "../../components/EmployeeList";

function EmployeeListPage() {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub2"]}
          activeMenu={["9"]}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <EmployeeList />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default EmployeeListPage;
