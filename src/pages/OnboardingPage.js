import React from 'react'
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/NewSidebar";

import Onboarding from "../components/Onboarding";

function OnboardingPage() {
  return (
    <div className="home">
      <div className="sidecontainer">
        <Sidebar
          activeSubMenu={["sub5"]}
          activeMenu={["31"]}
        
        />
      </div>
      <div className="homeContainer">
        <div className="table">
          <Navbar />
        </div>
        <div className="tables">
          <Onboarding />
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
