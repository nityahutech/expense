import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
// import InvoiceReimbursement from "../InvoiceReimbursement";
import InvoiceReimbursement from "./Form/InvoiceForm";

import "./AssetManag.css";
// import InvoiceContext from "./../../contexts/InvoiceContext";
import EmpInfoContext from "./../../contexts/EmpInfoContext";
import InvoiceContext from '../../contexts/InvoiceContext'
import { createUser } from "../../contexts/CreateContext";
import InvoiceTable from "./Table/InvoiceTable";

function InvoiceMagHome(props) {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState({});

  const getAllInvoiceData = async () => {
    console.log('getAllInvoiceData', getAllInvoiceData)
    let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setUser(userData);
    setInvoiceDetails(invoiceData);
  };

  useEffect(() => {
    getAllInvoiceData();
  }, []);

  return (
    <div className="primarydiva">
      <Tabs defaultActiveKey="1" className="assetTabs">
        <Tabs.TabPane tab="Invoice Reimbursement Table" key="1">
          <InvoiceTable
            roleView={props.roleView}
            getData={getAllInvoiceData}
            invoiceDetails={invoiceDetails}
            user={user}
          />
        </Tabs.TabPane>
        {/* {props.roleView == "emp" ? ( */}
        <Tabs.TabPane tab="Invoice Reimbursement Request" key="2">
          <InvoiceReimbursement
            roleView={props.roleView}
            getData={getAllInvoiceData}
            invoiceDetails={invoiceDetails}
            user={user}
          />
        </Tabs.TabPane>
        {/* ) : null} */}
      </Tabs>
    </div>
  );
}

export default InvoiceMagHome;
