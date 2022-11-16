import { Tabs } from "antd";
import "../../style/BankAccount.css";
import WorkID from "../ProfileDetails/WorkID";
import CertificateID from "../ProfileDetails/CertificateID";
import IDTags from "../ProfileDetails/IDTags";

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
          width: "75%",
          marginTop: "10px",
          backgroundColor: "white",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          borderRadius: "10px",
        }}
      >
        <Tabs defaultActiveKey="1" className="tabs">
          <Tabs.TabPane tab="IDs" key="1">
            <IDTags />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Certification" key="2">
            <CertificateID />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Work" key="3">
            <WorkID />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Document;
