import React from "react";
import "antd/dist/antd.css";
import { Card, Col, Row, Tabs } from "antd";
import Overview from "./CompanyDetail/overview";
import Address from "./CompanyDetail/address";
import Department from "./CompanyDetail/department";
import Designation from "./CompanyDetail/designation";
import Announcement from "./CompanyDetail/announcement";
import Policies from "./CompanyDetail/policies";
import Admin from "./CompanyDetail/admin";
import Statutory from "./CompanyDetail/statutory";
import MyPlan from "./CompanyDetail/myPlan";
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
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Address" key="2">
            <Address />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Department" key="3">
            <Department />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Designation" key="4">
            <Designation />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Announcement" key="5">
            <Announcement />
          </Tabs.TabPane> */}
          <Tabs.TabPane tab="Policies" key="6">
            <Policies />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="Admin" key="7">
            <Admin />
          </Tabs.TabPane> */}
          <Tabs.TabPane tab="Statutory" key="8">
            <Statutory />
          </Tabs.TabPane>
          {/* <Tabs.TabPane tab="My Plan" key="9">
            <MyPlan />
          </Tabs.TabPane> */}
        </Tabs>
      </div>
    </>
  );
}

export default CompanyProfile;
