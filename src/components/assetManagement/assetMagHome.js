import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import AssetContext from "../../contexts/AssetContext";
import AddAsset from "./AddAsset";
import AssetList from "./AssetList";

function AssetMagHome(props) {
  const [repairLaptopData, setRepairLaptopData] = useState([]);
  const [laptopAllot, setLaptopAllot] = useState(props.refresh);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  useEffect(() => {
    getRepairData();
    setLaptopAllot(props.refresh);
  }, [props.roleView]);

  const getRepairData = async () => {
    let repairData = await AssetContext.getRepairData(
      currentUser.uid,
    );
    setRepairLaptopData(repairData);
  };
  
  return (
    <div>
      <Tabs defaultActiveKey="1" className="assetTabs"> 
          <>
            <Tabs.TabPane tab="Laptop Request" key="1">
              <AllRequest
                roleView={props.roleView}
                getData={getRepairData}
                data={repairLaptopData}
                allot={laptopAllot}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Asset List" key="2">
              <AssetList />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Add Asset" key="3">
              <AddAsset />
            </Tabs.TabPane>
          </>
      </Tabs>
    </div>
  );
}

export default AssetMagHome;
