import React from "react";

import { Tabs } from "antd";

import "../../style/Documents.css";

import WorkID from "../ProfileDetails/WorkID";
import CertificateID from "../ProfileDetails/CertificateID";
import IDTags from "../ProfileDetails/IDTags";

// ----------------------------------------------------------------------------------------------------------------------------



function Document() {
  
  return (
    <div
      className="education"
      style={{
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "800px",
          marginTop: "10px",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Tabs defaultActiveKey="1" className="tabs">
          {/* ------------------------------------IDs tabs------------------------------------- */}
          <Tabs.TabPane tab="IDs" key="1">
            <IDTags />
          </Tabs.TabPane>

          {/* ------------------------Certification tab---------------- */}

          <Tabs.TabPane tab="Certification" key="2">
            <CertificateID />
          </Tabs.TabPane>

          {/* -------------------------------------------------Work tabs-------------------------- */}

          <Tabs.TabPane tab="Work" key="3">
            <WorkID />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Document;
