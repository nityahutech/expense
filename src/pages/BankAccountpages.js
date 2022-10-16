import React from 'react'
import { useState, useEffect } from "react";
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import BankAccount from '../components/ProfileDetails/BankAccount';
const BankAccountpages = () => {
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
            <Sidebar activeSubMenu={["sub3"]}
          activeMenu={["18"]} accessToken={accessToken}/>
            </div>
            <div className="homeContainer">
                <div className="table">
                    <Navbar />
                </div>
                <div className="tables">
                <BankAccount />
                </div>
            </div>
        </div>
  );
};
export default BankAccountpages