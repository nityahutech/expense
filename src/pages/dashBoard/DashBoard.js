import React, {useEffect, useState} from "react";
import Charts from "../../components/Charts";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/NewSidebar";
// import Tabledash from "../../components/Tabledash";
const DashBoard = () => {
  const [accessToken, setAccessToken] = useState(null)

  useEffect(() => {
    let token = sessionStorage.getItem ("accessToken")
    console.log(typeof token);
    if(token === 'null'){
      window.location.href="/"
    }
    else{
      setAccessToken(token)
    }
  }, [])
  return accessToken
  ?
   (
    
    <div className="home">
      <div className="sidecontainer">
        <Sidebar activeMenu={["1"]} selectedkey={['1']} accessToken={accessToken} />
      </div>

      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>

        <div className="tables">
          <Charts />
          {/* <Tabledash /> */}
        </div>
      </div>
    </div>
  ):null;
};

export default DashBoard;
