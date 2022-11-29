import { Tabs, Card } from "antd";
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
      <Card
        className="document-tap-div"
        bordered={true}
        hoverable={true}
        style={{
          width: "100%",
          marginTop: "10px",
          backgroundColor: "white",
          padding: "0px",
          display: "flex",
          justifyContent: "center",
          borderRadius: "10px",
          cursor: "default",
          marginLeft: "12.5%",
          marginRight: "12.5%",
        }}
      >
        <Tabs defaultActiveKey="1" className="documents">
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
      </Card>
    </div>
  );
}

export default Document;
