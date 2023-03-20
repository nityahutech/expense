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
import EmpInfoContext from "../contexts/EmpInfoContext";



const Profile = () => {
  const role = sessionStorage.getItem("role");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [record, setRecord] = useState([]);
  const [marriage, setMarraige] = useState(false)

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log('data', data)
    setRecord(data);
    setMarraige(data?.maritalStatus == 'Married');
  }



  return (
    <>
      <div className="myProfile">
        <Tabs defaultActiveKey="1" className="myProfileTabs">
          <Tabs.TabPane tab="Personal" key="1">
            <Personal data={record} getData={getData} />
          </Tabs.TabPane>
          {role != "super" ? (
            <>
              <Tabs.TabPane tab="Work" key="2">
                <Work data={record} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Team" key="3">
                <Team data={record} />
              </Tabs.TabPane>
            </>
          ) : null}
          <Tabs.TabPane tab="Education" key="4">
            <Education data={record} getData={getData} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Family" key="5">
            <Family data={record} getData={getData} marriage={marriage} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Documents" key="6">
            <Document data={record} getData={getData} />
          </Tabs.TabPane>
          {role != "super" ? (
            <>
              <Tabs.TabPane tab="Work Week" key="7">
                <WorkWeek data={record} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Pay Slip" key="8">
                <PaySlip data={record} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="Bank Account" key="9">
                <BankAccount data={record} getData={getData} />
              </Tabs.TabPane>
            </>
          ) : null}
        </Tabs>
      </div>
    </>
  );
};

export default Profile;
