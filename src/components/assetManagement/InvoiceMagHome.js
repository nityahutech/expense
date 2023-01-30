import React from "react";
import { Tabs } from "antd";
import InvoiceReimbursement from "./InvoiceReimbursement";
import InvoiceTable from "./InvoiceTable";
import "./AssetManag.css";

function InvoiceMagHome(props) {
  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        {props.roleView == "emp" ? (
          <Tabs.TabPane tab="Invoice Reimbursement Table" key="1">
            <InvoiceTable roleView={props.roleView} />
          </Tabs.TabPane>
        ) : null}
        <Tabs.TabPane tab="Invoice Reimbursement Request" key="2">
          <InvoiceReimbursement roleView={props.roleView} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default InvoiceMagHome;
