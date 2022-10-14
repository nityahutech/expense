import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Leave from "../../components/Leave";
import Sidebar from "../../components/sidebar/NewSidebar";
const DashBoard = () => {
    const [accessToken, setAccessToken] = useState(null);
     useEffect(() => {
        let token = sessionStorage.getItem("accessToken");
        if (token === 'null') {
            window.location.href = "/";
        } else {
            setAccessToken(token);
        }
    }, []);
    return (
        <div className="home">
            <div className="sidecontainer">
            <Sidebar activeSubMenu={["sub2"]}
          activeMenu={["7"]} accessToken={accessToken}/>
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
    );
};
export default DashBoard;
