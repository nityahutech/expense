import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
import Expenselist from "../../components/Expenselist";
import "../home/home.css";

const ExpenseListpage = () => {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeSubMenu={["sub1"]}
          activeMenu={["3"]} />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Expenselist />
        </div>
      </div>
    </div>
  ) : window.location.href = "/";
};

export default ExpenseListpage;
