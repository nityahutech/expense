import Navbar from "./components/navbar/Navbar";
import NewSidebar from "./components/sidebar/NewSidebar";
import "./style/home.css";

const FormatPage = (props) => {
    let accessToken = sessionStorage.getItem("accessToken");
    return accessToken && !(accessToken == "null") ? (
      <div className="home">
        <div className="sidecontainer">
          <NewSidebar
            activeSubMenu={props.activeSubMenu}
            activeMenu={props.activeMenu}
          />
        </div>
        <div className="homeContainer">
          <div className="table">
            <Navbar />
          </div>
          <div className="tables">
            {props.main}
          </div>
        </div>
      </div>
    ) : window.location.href = "/";
}

export default FormatPage;