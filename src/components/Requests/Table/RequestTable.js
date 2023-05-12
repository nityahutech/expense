import { DeleteOutlined, EyeFilled, SearchOutlined } from "@ant-design/icons";
import { Card, Col, Input, Modal, Row, Table, Tag } from "antd"
import { useState } from "react";
import ViewInvoice from "./ViewInvoice";

const RequestTable = (props) => {
    const [viewData, setViewData] = useState(null)
    const viewTypes = {
        "Invoice Reimbursement": <ViewInvoice data={viewData}/>,
        "Laptop Upgrade": null,
        "Laptop Repair": null,
        "Laptop Return": null,
        "Travel Booking": null,
    }
    const [data, setData] = useState([{
        date: "11-05-2023",
        type: "Invoice Reimbursement",
        status: "Approved",
        data: {
            name: "test invoice",
            totalAmount: "323"
        }
    },{
        date: "11-04-2023",
        type: "Travel Booking",
        status: "Pending",
        data: {
            name: "test booking",
            reason: "323"
        }
    }])
    const [filteredData, setFilteredData] = useState(data)

    const columns = [
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
          fixed: "left",
          align: "center",
        },
        {
          title: "Request Type",
          dataIndex: "type",
          key: "type",
          align: "center",
        },
        {
          title: "Status",
          dataIndex: "status",
          key: "status",
          align: "center",
          render: (_, { status }) =>
            status !== "" && (
              <Tag
                style={{ width: "80px", color: "black", textAlign: "center" }}
                className="statusTag"
                color={
                  status === "Approved"
                    ? "rgba(15, 255, 80, 0.2)"
                    : status === "Pending"
                    ? "rgba(205, 227, 36, 0.25)"
                    : "volcano"
                }
                key={status}
              >
                {status}
              </Tag>
            ),
        },
        {
          key: "5",
          title: "Actions",
          fixed: "right",
          align: "center",
          render: (record) => {
            return (
              <>
                {
                  <>
                    <EyeFilled
                        onClick={() => {
                            setViewData(record)
                        }}
                    />
                    <DeleteOutlined
                      onClick={() => {
                        // onDeleteLeave(record);
                      }}
                      style={
                        record?.status === "Approved"
                          ? { color: "green", marginLeft: 10 }
                          : record?.status === "Pending"
                          ? { color: "blue", marginLeft: 10 }
                          : { color: "red", marginLeft: 10 }
                      }
                    />
                  </>
                }
              </>
            );
          },
        },
      ];
      
  const searchChange = (e) => {
    let search = e.target.value;
    if (search) {
      let result = data.filter((ex) =>
        ex.date.toLowerCase().includes(search.toLowerCase())||
        ex.status.toLowerCase().includes(search.toLowerCase())||
        ex.type.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(result);
    } else {
      setFilteredData(data);
    }
  };

    return (
        <Card className="daily">
            <Row gutter={10} style={{justifyContent:"space-between"}}>
            <Col sm={24} md={8}>
            <Input
            className="daily"
            placeholder="Search"
            prefix={<SearchOutlined />}
            onChange={searchChange}
          />
            </Col>    
        </Row>
    
          <Table
            className="daily daily-table"
            // loading={loading}
            columns={columns}
            dataSource={filteredData}
            pagination={true}
            onChange={(pagination) => console.log(pagination)}
          />
          {console.log("yellow")}
          <Modal
            className="view-modal"
            open={viewData}
            footer={null}
            closeIcon={
                <div
                    onClick={() => setViewData(null)}
                    style={{ color: "#ffffff" }}
                >
                X
                </div>
            }
            title={viewData?.type}
            destroyOnClose
          >
            {viewTypes[viewData?.type]}
          </Modal>
        </Card>
    )
}

export default RequestTable


// import React, { useState, useEffect } from "react";
// import RepairRequestTable from "./RepairRequestTable"
// import InvoiceTable from "./InvoiceTable"
// import TravelTable from "./TravelTable"
// import EmpInfoContext from "../../../contexts/EmpInfoContext";
// import InvoiceContext from "../../../contexts/InvoiceContext";
// import { createUser } from "../../../contexts/CreateContext";

// //-------------------------------------------------------
// import AssetContext from "../../../contexts/AssetContext";

// //---------------------------------------------
// import TravelContext from "../../../contexts/TravelContext";
// import moment from "moment";


// const RequestTable = (props) => {

//     //---------------Invoice------------------------------
//     const [invoiceDetails, setInvoiceDetails] = useState([]);
//     const currentUser = JSON.parse(sessionStorage.getItem("user"));
//     const [user, setUser] = useState({});

//     //--------------laptop-----------------------------
//     const [repairLaptopData, setRepairLaptopData] = useState([]);
//     const [laptopAllot, setLaptopAllot] = useState(props.refresh);

//     const getAllInvoiceData = async () => {
//         console.log('getAllInvoiceData', getAllInvoiceData)
//         let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
//         let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
//         setUser(userData);
//         setInvoiceDetails(invoiceData);
//     };

//     //--------------------Travel-----------------------------

//     const [travelDetails, setTravelDetails] = useState([]);
//     const [durationArray, setDurationArray] = useState([]);


//     const getAlltravelData = async () => {
//         let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
//         let travleData = await TravelContext.getAllTravel(currentUser.uid);
//         console.log(travleData);
//         setTravelDetails(travleData);
//         setUser(userData);
//         let data = travleData.map((record) => {
//             let dur = record.travelType.map((dt) => dt.durationDate);
//             let temp = [].concat.apply([], dur);

//             console.log("dur", dur);
//             temp.sort((a, b) => {
//                 return moment(a, "DD-MM-YYYY") - moment(b, "DD-MM-YYYY");
//             });
//             return temp;
//         });
//         console.log("data", data);
//         setDurationArray(data);
//     };
//     console.log("travelDetails", travelDetails);
//     //------------------------------------------------------------
//     useEffect(() => {
//         getAlltravelData();
//     }, []);


//     useEffect(() => {
//         getRepairData();
//         setLaptopAllot(props.refresh);
//     }, [props.roleView]);

//     const getRepairData = async () => {
//         let repairData = await AssetContext.getRepairData(
//             currentUser.uid,
//         );
//         setRepairLaptopData(repairData);
//     };

//     useEffect(() => {
//         getAllInvoiceData();
//     }, []);

//     return (
//         <div>
//             <RepairRequestTable
//                 data={repairLaptopData}
//                 getData={getRepairData}
//                 roleView={props.roleView}
//             />
//             <InvoiceTable
//                 roleView={props.roleView}
//                 getData={getAllInvoiceData}
//                 invoiceDetails={invoiceDetails}
//                 user={user}
//             />
//             <TravelTable
//                 getData={getAlltravelData}
//                 durationArray={durationArray}
//                 travelDetails={travelDetails}
//             />
//         </div>
//     )
// }

// export default RequestTable