import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import Leave from "../../components/Leave";
import Sidebar from "../../components/sidebar/NewSidebar";
import { useAuth } from "../../contexts/AuthContext";

const DashBoard = () => {
    const [accessToken, setAccessToken] = useState(null);
    const { currentUser, role } = useAuth();
    useEffect(() => {
        let token = sessionStorage.getItem("accessToken");
        console.log({ token });
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
                    <Leave empDetails={{ userType: role, empid: 12 }} />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
