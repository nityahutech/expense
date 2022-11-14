import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import Onboarding from "../components/Onboarding";

function OnboardingPage() {

  const accessToken = sessionStorage.getItem("accessToken");

  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub5"]}
          activeMenu={["31"]}
        
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Onboarding />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default OnboardingPage
