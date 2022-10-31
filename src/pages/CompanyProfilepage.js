import React from 'react'
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";
import CompanyProfile from "../components/CompanyProfile";

function CompanyProfilepage() {
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar 
          activeMenu={["32"]} selectedkey={['32']}  />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
        <CompanyProfile />
        </div>
      </div>
    </div>
  )
}

export default CompanyProfilepage
