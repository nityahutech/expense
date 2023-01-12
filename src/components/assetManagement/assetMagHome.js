import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import Requestpage from "./RepairReq";
import InvoiceReimbursement from "./InvoiceReimbursement";
import "./AssetManag.css";
import AssetContext from "../../contexts/AssetContext";
import RepairRequestTable from "./RepairRequestTable";

function AssetMagHome(props) {
  const [repairLaptopData, setRepairLaptopData] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  useEffect(() => {
    getRepairData();
    // console.log(getRepairData);
  }, []);

  const getRepairData = async () => {
    let repairData = await AssetContext.getRepairData(currentUser.uid);
    console.log("values", repairData);
    setRepairLaptopData(repairData);
  };

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
                data={repairLaptopData}
                roleView={props.roleView}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Request Form" key="2">
              <Requestpage roleView={props.roleView} getData={getRepairData} />
            </Tabs.TabPane>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default AssetMagHome;
