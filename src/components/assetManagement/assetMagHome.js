import React from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import Requestpage from "./RepairReq";
import InvoiceReimbursement from "./InvoiceReimbursement";
import "./AssetManag.css";
import RepairRequestTable from "./RepairRequestTable";

function assetMagHome(props) {
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        {props.roleView == "admin" ? (
          <>
            <Tabs.TabPane tab="Laptop Request" key="1">
              <AllRequest roleView={props.roleView} />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Invoice Reimbursement" key="2">
              <InvoiceReimbursement roleView={props.roleView} />
            </Tabs.TabPane>
          </>
        ) : (
          <>
            <Tabs.TabPane tab="All Request" key="1">
              <RepairRequestTable
                roleView={props.roleView}
                repairLaptopData={props.repairLaptopData}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Request Form" key="2">
              <Requestpage roleView={props.roleView} />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default assetMagHome;
