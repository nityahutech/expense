import React from "react";
import "antd/dist/antd.css";
import "../style/profile.css";
import { Tabs } from "antd";
import "../style/profilepage.css";

import Personal from "./ProfileDetails/Personal";
import Work from "./ProfileDetails/Work";
import Team from "./ProfileDetails/Team";
import Education from "./ProfileDetails/Education";
import Family from "./ProfileDetails/Family";
import Document from "./ProfileDetails/Document";
import WorkWeek from "./ProfileDetails/WorkWeek";
import PaySlip from "./ProfileDetails/PaySlip";
import BankAccount from "./ProfileDetails/BankAccount";

const Profile = () => {
  return (
    <>
      <div className="myProfile" style={{}}>
        <Tabs defaultActiveKey="1" className="tabs">
          <Tabs.TabPane tab="Personal" key="1">
            <Personal></Personal>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Work" key="2">
            <Work></Work>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Team" key="3">
            <Team></Team>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Education" key="4">
            <Education></Education>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Family" key="5">
            <Family></Family>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Documents" key="6">
            <Document></Document>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Work Week" key="7">
            <WorkWeek></WorkWeek>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Pay Slip" key="8">
            <PaySlip></PaySlip>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Bank Account" key="9">
            <BankAccount></BankAccount>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
