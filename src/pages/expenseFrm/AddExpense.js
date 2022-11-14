import Navbar from '../../components/navbar/Navbar';
import Sidebar from "../../components/sidebar/NewSidebar";
import ExpenceForm from '../../components/ExpenceForm';

const ExpenseFrm = () => {

  const accessToken = sessionStorage.getItem("accessToken");
  
  return accessToken && !(accessToken == "null") ? (
        <div className="home">
        <div className="sidecontainer">
            <Sidebar activeSubMenu={["sub1"]}
          activeMenu={["2"]} />
        </div>
        <div className="homeContainer">
            <div className="table" >
                <Navbar />
            </div>
            <div className="tables">
                <ExpenceForm />
            </div>
        </div>
    </div>
  ) : window.location.href = "/";
};

export default ExpenseFrm