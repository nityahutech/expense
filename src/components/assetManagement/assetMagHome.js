import React from "react";
import { Tabs } from "antd";
import AllRequest from "./AllRequest";
import Requestpage from "./RepairReq";
import UpgradeReq from "./UpgradeReq";
import "./AssetManag.css";

function assetMagHome() {
  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="All Request" key="1">
          <AllRequest />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Repair Request" key="2">
          <Requestpage />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Upgrade Request" key="3">
          <UpgradeReq />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default assetMagHome;
