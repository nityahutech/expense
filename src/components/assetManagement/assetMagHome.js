import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import AssetContext from "../../contexts/AssetContext";
import AddAsset from "./AddAsset";
import AssetList from "./AssetList";
import RequestContext from "../../contexts/RequestContext";
import AssetConfig from "./AssetConfig";

function AssetMagHome(props) {
  const [repairLaptopData, setRepairLaptopData] = useState([]);
  const [laptopAllot, setLaptopAllot] = useState(props.refresh);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");
  const [loading, setLoading] = useState(false);
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  useEffect(() => {
    getRepairData();
    setLaptopAllot(props.refresh);
  }, [props.roleView]);

  const getRepairData = async () => {
    setLoading(true);
    let repairData = await RequestContext
      .getAllAsset
      // currentUser.uid,
      ();
    console.log("repairData", repairData);
    let filterType = repairData.filter((type) => {
      return (
        type?.type === "Laptop Upgrade" ||
        type?.type === "Laptop Repair" ||
        type?.type === "Laptop Return"
      );
    });
    console.log("repairData", filterType);
    setRepairLaptopData(filterType);
    setLoading(false);
  };

  return (
    <div className="hrtab">
      <Tabs defaultActiveKey="1" className="page-tabs">
        <>
          <Tabs.TabPane tab="Laptop Request" key="1">
            <AllRequest
              roleView={props.roleView}
              getData={getRepairData}
              data={repairLaptopData}
              allot={laptopAllot}
              loading={loading}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Asset List" key="2">
            <AssetList />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Add Asset" key="3">
            <AddAsset />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Configuration" key="4">
            <AssetConfig />
          </Tabs.TabPane>
        </>
      </Tabs>
    </div>
  );
}

export default AssetMagHome;
