import { Tabs, Card } from "antd";
// import "../../style/BankAccount.css";
import "./Document.css"
import WorkID from "../ProfileDetails/WorkID";
import CertificateID from "../ProfileDetails/CertificateID";
import IDTags from "../ProfileDetails/IDTags";

function Document() {
  return (
    <div className="education">
      <Card
        className="document-tap-div"
        bordered={true}
        hoverable={true}
      >
        <Tabs 
          tabPosition="left"
          defaultActiveKey="1" 
          className="documents"
        >
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
