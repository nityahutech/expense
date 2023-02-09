import { useEffect, useState } from "react";
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
  const role = sessionStorage.getItem("role");
  const [showRecord, setshowRecord] = useState([]);
  return (
    <>
      <div className="myProfile">
        <Tabs defaultActiveKey="1" className="myProfileTabs">
          <Tabs.TabPane tab="Personal" key="1">
            <Personal />
          </Tabs.TabPane>
          {role != "super" ? (
            <>
              <Tabs.TabPane tab="Work" key="2">
                <Work />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Team" key="3">
                <Team />
              </Tabs.TabPane>
            </>
          ) : null}
          <Tabs.TabPane tab="Education" key="4">
            <Education />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Family" key="5">
            <Family />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Documents" key="6">
            <Document />
          </Tabs.TabPane>
          {role != "super" ? (
            <>
              <Tabs.TabPane tab="Work Week" key="7">
                <WorkWeek />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Pay Slip" key="8">
                <PaySlip showRecord={showRecord} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Bank Account" key="9">
                <BankAccount />
              </Tabs.TabPane>
            </>
          ) : null}
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
