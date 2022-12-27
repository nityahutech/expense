import React from 'react';
import { Tabs } from 'antd';
import LaptopAllot from './laptopAllot';
import Requestpage from "./RepairReq";
import UpgradeReq from './UpgradeReq';
import "./AssetManag.css"

function assetMagHome() {
  return (
    <div className='primarydiv'>
        <Tabs defaultActiveKey='1' className='tabs'>
            <Tabs.TabPane tab="Laptop Allortment" key="1">
                <LaptopAllot />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Repair Request" key="2">
                <Requestpage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Upgrade Request" key="3">
                <UpgradeReq />
            </Tabs.TabPane>
        </Tabs>
    </div>
  )
}

export default assetMagHome
