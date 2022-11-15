import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Tabs } from "antd";
import Overview from "./CompanyDetail/overview";
import Address from "./CompanyDetail/address";
import Department from "./CompanyDetail/department";
import Designation from "./CompanyDetail/designation";
import Policies from "./CompanyDetail/policies";
import Admin from "./CompanyDetail/admin";
import Statutory from "./CompanyDetail/statutory";
import "../style/Onboarding.css";

const { Meta } = Card;
function CompanyProfile() {
  return (
    <>
      <div className="myProfile">
        {/* <div style={{ backgroundColor: 'green' }}
        >
          <h2 >COMPANY PROFILE</h2>
        </div> */}
        <Tabs defaultActiveKey="1" className="profileTabs">
          <Tabs.TabPane tab="Overview" key="1">
            <Overview></Overview>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Address" key="2">
            <Address></Address>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Department" key="3">
            <Department></Department>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Designation" key="4">
            <Designation></Designation>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Policies" key="6">
            <Policies></Policies>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Admin" key="7">
            <Admin></Admin>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Statutory" key="8">
            <Statutory></Statutory>
          </Tabs.TabPane>
          
        </Tabs>
      </div>
    </>
  );
}

export default CompanyProfile;
