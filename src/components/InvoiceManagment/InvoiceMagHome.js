import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import InvoiceTable from "./InvoiceTable";
import "./AssetManag.css";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { createUser } from "../../contexts/CreateContext";

function InvoiceMagHome(props) {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [user, setUser] = useState({});

  const getAllInvoiceData = async () => {
    console.log('getAllInvoiceData', getAllInvoiceData)
    let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
    let filterType = invoiceData.filter((type) => { return type.type === 'Invoice Reimbursement' })
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setInvoiceDetails(filterType)
    setUser(userData);
    // setInvoiceDetails(invoiceData);

  };
  console.log("travelDetails", invoiceDetails);



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

      </Tabs>
    </div>
  );
}

export default InvoiceMagHome;
