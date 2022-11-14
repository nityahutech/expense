import Navbar from "../../components/navbar/Navbar";
import Leave from "../../components/Leave";
import Sidebar from "../../components/sidebar/NewSidebar";

const DashBoard = () => {
    
    const accessToken = sessionStorage.getItem("accessToken");
    
    return accessToken && !(accessToken == "null") ? (
        <div className="home">
            <div className="sidecontainer">
            <Sidebar activeSubMenu={["sub2"]}
          activeMenu={["7"]} />
            </div>
            <div className="homeContainer">
                <div className="table">
                    <Navbar />
                </div>
                <div className="tables">
                    <Leave  />
                </div>
            </div>
        </div>
    ) : window.location.href = "/";
};

export default DashBoard;
