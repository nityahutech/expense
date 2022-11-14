import Navbar from "../components/navbar/Navbar";
import HrPaySlip from "../components/ProfileDetails/HrPaySlip";
import Sidebar from "../components/sidebar/NewSidebar";

const Payslip2 = () => {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub2"]}
          activeMenu={["25"]}
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <HrPaySlip />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default Payslip2;
