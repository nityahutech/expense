import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import InvoiceTable from "./InvoiceTable";
import "./AssetManag.css";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";

function InvoiceMagHome(props) {
  const [invoiceDetails, setInvoiceDetails] = useState([]);
  const {currentUser} = useAuth()
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllInvoiceData = async () => {
    setLoading(true)
    console.log('getAllInvoiceData', getAllInvoiceData)
    let invoiceData = await InvoiceContext.getInvoice();
    console.log('invoiceData', invoiceData)
    let filterType = invoiceData.filter((type) => { return type.type === 'Invoice Reimbursement' })
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    setInvoiceDetails(filterType)
    setUser(userData);
    setLoading(false)
  };
  console.log("travelDetails", invoiceDetails);

  useEffect(() => {
    getAllInvoiceData();
  }, []);



  return (
    <div className="hrtab">
      <Tabs defaultActiveKey="1" className="page-tabs">
        <Tabs.TabPane tab="Invoice Reimbursement Table" key="1">
          <InvoiceTable
            roleView={props.roleView}
            getData={getAllInvoiceData}
            invoiceDetails={invoiceDetails}
            user={user}
            loading={loading}
          />
        </Tabs.TabPane>

      </Tabs>
    </div>
  );
}

export default InvoiceMagHome;
