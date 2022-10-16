import React from 'react'
import { useState, useEffect } from "react";
import Navbar from '../components/navbar/Navbar';
import Sidebar from "../components/sidebar/NewSidebar";
import Document from '../components/ProfileDetails/Document';
function DocumentsPage() {
    const [accessToken, setAccessToken] = useState(null);
     useEffect(() => {
        let token = sessionStorage.getItem("accessToken");
        if (token === 'null') {
            window.location.href = "/";
        } else {
            setAccessToken(token);
        }
    }, []);
  return accessToken ? (
    <div className="home">
    <div className="sidecontainer">
    <Sidebar activeSubMenu={["sub3"]}
  activeMenu={["15"]} accessToken={accessToken}/>
    </div>
    <div className="homeContainer">
        <div className="table">
            <Navbar />
        </div>
        <div className="tables">
        <Document />
        </div>
    </div>
</div>
  ) : null;
}
export default DocumentsPage