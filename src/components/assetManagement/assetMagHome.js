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
  const [laptopAllot, setLaptopAllot] = useState(props.refresh);
  console.log(props.refresh);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  useEffect(() => {
    getRepairData();
    setLaptopAllot(props.refresh);
    // console.log(getRepairData);
  }, [props.roleView]);

  const getRepairData = async () => {
    const typeValues =
      props.roleView == "admin"
        ? ["Repair", "Upgrade", "Allotment", "Return"]
        : ["Repair", "Upgrade", "Return"];
    let repairData = await AssetContext.getRepairData(
      currentUser.uid,
      typeValues
    );
    console.log("values", repairData);
    setRepairLaptopData(repairData);
  };
  console.log("props.roleView::: ", props.roleView);
  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        {props.roleView == "admin" ? (
          <>
            <Tabs.TabPane tab="Laptop Request" key="1">
              <AllRequest
                roleView={props.roleView}
                getData={getRepairData}
                data={repairLaptopData}
                allot={laptopAllot}
              />
            </Tabs.TabPane>
          </>
        ) : (
          <>
            <Tabs.TabPane tab="All Request" key="1">
              <RepairRequestTable
                data={repairLaptopData}
                getData={getRepairData}
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
