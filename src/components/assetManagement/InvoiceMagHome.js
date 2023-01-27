import React from "react";
import { Tabs } from "antd";
import InvoiceReimbursement from "./InvoiceReimbursement";
import "./AssetManag.css";

function InvoiceMagHome(props) {
  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        <Tabs.TabPane tab="Invoice Reimbursement Request" key="2">
          <InvoiceReimbursement roleView={props.roleView} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default InvoiceMagHome;
