import "antd/dist/antd.css";
import { Tabs } from "antd";
import Overview from "./CompanyDetail/overview";
import Designation from "./CompanyDetail/designation";
import Policies from "./CompanyDetail/policies";
import Admin from "./CompanyDetail/admin";
import Statutory from "./CompanyDetail/statutory";
import "../style/Onboarding.css";
import DepartmentNew from "./CompanyDetail/departmentNew";
import AddressOffice from "./CompanyDetail/addressOffice";
import AddressCorp from "./CompanyDetail/addressCorp";
import AddressCust from "./CompanyDetail/addressCust";
import CompanyCostCenter from "./CompanyDetail/CompanyCostCenter";

function CompanyProfile() {
  return (
    <>
      <div className="myProfile" style={{ margin: "10px", minHeight: "100vh" }}>
        <Tabs defaultActiveKey="1" className="profileTabs">
          <Tabs.TabPane tab="Overview" key="1">
            <Overview />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Address" key="2">
            <div style={{ marginBottom: "10px" }}>
              <AddressOffice />
              <AddressCorp />
              <AddressCust />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Organization" key="3">
            <DepartmentNew />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Cost Center" key="4">
            <CompanyCostCenter />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Designation" key="5">
            <Designation />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Policies" key="6">
            <Policies />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Admin" key="7">
            <Admin />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Statutory" key="8">
            <Statutory />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default CompanyProfile;
