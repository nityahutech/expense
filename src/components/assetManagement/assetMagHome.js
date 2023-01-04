import React from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import Requestpage from "./RepairReq";
import InvoiceReimbursement from "./InvoiceReimbursement";
import "./AssetManag.css";

function assetMagHome() {
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        {role == "admin" || isHr ? (
          <>
            <Tabs.TabPane tab="All Request" key="1">
              <AllRequest />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Request Form" key="2">
              <Requestpage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Invoice Reimbursement" key="3">
              <InvoiceReimbursement />
            </Tabs.TabPane>
          </>
        ) : (
          <>
            <Tabs.TabPane tab="All Request" key="1">
              <AllRequest />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Request Form" key="2">
              <Requestpage />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default assetMagHome;
