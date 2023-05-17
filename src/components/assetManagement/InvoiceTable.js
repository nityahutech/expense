// import React, { useState, useEffect } from "react";
// import { Card, Button, Table, Tooltip, Tag, Modal } from "antd";
// import { EyeFilled, EditFilled } from "@ant-design/icons";
// import "./invoice.css";
// import ViewInvoiceDetails from "./ViewInvoiceDetails";
// import EditInvoiceDetails from "./EditInvoiceDetails";
// import InvoiceContext from "../../contexts/InvoiceContext";
// import Checkmark from "../../images/checkmark.png";
// import CheckReject from "../../images/rejected.png";

// function InvoiceTable(props) {
//   const [empInvoiceTable, setEmpInvoiceTable] = useState(
//     props.invoiceDetails || []
//   );
//   const [invoiceData, setInvoiceData] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const [user, setUser] = useState({});

//   const [file, setFile] = useState([]);

//   function openModal(data) {
//     setIsModalOpen(true);
//     setInvoiceData(data);
//   }

//   const setStatus = async (record, status) => {
//     Modal.confirm({
//       title: `Are you sure, you want to ${
//         status == "Approved" ? "approve" : "reject"
//       } this request?`,
//       okText: "Yes",
//       okType: "danger",
//       onOk: async () => {
//         const updateInvoiceReocrd = empInvoiceTable.map((allotInvoice) => {
//           if (allotInvoice.id == record.id) {
//             allotInvoice.status = status;
//             record.status = status;
//           }
//           return allotInvoice;
//         });
//         await InvoiceContext.updateInvoiceData(record.id, record);
//         setEmpInvoiceTable(updateInvoiceReocrd);
//       },
//     });
//   };

//   useEffect(() => {
//     setEmpInvoiceTable(props.invoiceDetails);
//     setUser(props.user);
//   }, [props.invoiceDetails]);

//   const showModal = (data) => {
//     setIsEditModalOpen(true);
//     setInvoiceData(data);

//     // setRepairLaptopData(repairLaptopData);
//   };

//   const invoiceColumns = [
//     {
//       title: "Employee Code",
//       dataIndex: "empCode",
//       key: "empCode",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//       width: 200,
//       align: "left",
//     },

//     {
//       title: "Invoice Date ",
//       dataIndex: "invoiceDate",
//       key: "invoiceDate",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Invoice Name",
//       dataIndex: "invoiceName",
//       key: "invoiceName",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Total Amount",
//       dataIndex: "totalAmt",
//       key: "totalAmt",
//       width: 150,
//       align: "left",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 200,
//       align: "left",
//       render: (_, { status }) =>
//         status !== "" && (
//           <Tag
//             style={{
//               width: "84px",
//               color: "#000000",
//               borderRadius: "10px",
//               display: "flex",
//               justifyContent: "center",
//               padding: "2px",
//             }}
//             className="statusTag"
//             color={
//               status === "Approved"
//                 ? "rgb(8 231 68 / 75%)"
//                 : status === "Pending"
//                 ? "rgb(244 209 105)"
//                 : "#f44336"
//             }
//             key={status}
//           >
//             {status}
//           </Tag>
//         ),
//     },
//     {
//       title: "Action",
//       dataIndex: "operation",
//       key: "operation",
//       width: 200,
//       align: "left",
//       render: (_, record) => (
//         <>
//           <div
//             className="employee-button"
//             style={{ display: "flex", flexDirection: "row" }}
//           >
//             <Tooltip placement="bottom" title="View" color="#1963A6">
//               <Button
//                 type="link"
//                 className="show"
//                 onClick={() => {
//                   openModal(record);
//                 }}
//               >
//                 {<EyeFilled style={{ color: "#000000" }} />}
//               </Button>
//             </Tooltip>
//             <Button
//               style={
//                 record.status == "Pending"
//                   ? {
//                       padding: 0,
//                       color: "rgb(39 151 44 / 74%)",
//                     }
//                   : { display: "none" }
//               }
//               type="link"
//               className="show"
//               onClick={() => {
//                 setStatus(record, "Approved");
//               }}
//             >
//               <img src={Checkmark} />
//             </Button>
//             <Button
//               style={record.status == "Pending" ? null : { display: "none" }}
//               type="link"
//               className="deleTe"
//               onClick={() => {
//                 setStatus(record, "Reject");
//               }}
//             >
//               <img src={CheckReject} width={20} />
//             </Button>
//           </div>
//         </>
//       ),
//     },
//   ];

//   const columns = [
//     {
//       title: "Invoice Date ",
//       dataIndex: "invoiceDate",
//       key: "invoiceDate",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Invoice Name",
//       dataIndex: "invoiceName",
//       key: "invoiceName",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Total Amount",
//       dataIndex: "totalAmt",
//       key: "totalAmt",
//       width: 200,
//       align: "left",
//     },
//     {
//       title: "Status",
//       dataIndex: "status",
//       key: "status",
//       width: 200,
//       align: "left",
//       render: (_, { status }) =>
//         status !== "" && (
//           <Tag
//             style={{
//               width: "84px",
//               color: "#000000",
//               borderRadius: "10px",
//               display: "flex",
//               justifyContent: "center",
//               padding: "2px",
//             }}
//             className="statusTag"
//             color={
//               status === "Approved"
//                 ? "rgb(8 231 68 / 75%)"
//                 : status === "Pending"
//                 ? "rgb(244 209 105)"
//                 : "#f44336"
//             }
//             key={status}
//           >
//             {status}
//           </Tag>
//         ),
//     },
//     {
//       title: "Action",
//       dataIndex: "operation",
//       key: "operation",
//       width: 100,
//       align: "center",
//       render: (_, record) => (
//         <>
//           <div
//             className="employee-button"
//             style={{ display: "flex", flexDirection: "row" }}
//           >
//             <Tooltip placement="bottom" title="View" color="#1963A6">
//               <Button
//                 type="link"
//                 className="show"
//                 onClick={() => {
//                   openModal(record);
//                 }}
//               >
//                 {<EyeFilled style={{ color: "#000000" }} />}
//               </Button>
//             </Tooltip>
//             {record.status == "Approved" || record.status == "Reject" ? (
//               <Button
//                 disabled={
//                   record.status == "Approved" || record.status == "Reject"
//                 }
//                 style={{ padding: 0, color: "rgb(64, 169, 255)" }}
//                 type="link"
//                 className="show"
//                 // onClick={() => {
//                 //   showModal(record);
//                 // }}
//               >
//                 {
//                   <EditFilled
//                     style={
//                       record.status == "Approved" || record.status == "Reject"
//                         ? { color: "lightgray" }
//                         : null
//                     }
//                     disabled={
//                       record.status == "Approved" || record.status == "Reject"
//                     }
//                   />
//                 }
//               </Button>
//             ) : (
//               <Tooltip placement="bottom" title="Edit" color="#1963A6">
//                 <Button
//                   disabled={record.status == "Approved"}
//                   style={{ padding: 0, color: "rgb(64, 169, 255)" }}
//                   type="link"
//                   className="show"
//                   onClick={() => {
//                     showModal(record);
//                   }}
//                 >
//                   {
//                     <EditFilled
//                       style={
//                         record.status == "Approved"
//                           ? { color: "lightgray" }
//                           : null
//                       }
//                       disabled={record.status == "Approved"}
//                     />
//                   }
//                 </Button>
//               </Tooltip>
//             )}
//           </div>
//         </>
//       ),
//     },
//   ];

//   var filteredPending = [];
//   var filteredApprove = [];

//   empInvoiceTable.forEach((record) => {
//     if (record.status == "Pending") {
//       filteredPending.push(record);
//     } else {
//       filteredApprove.push(record);
//     }
//   });

//   return (
//     <div className="invoiceDiv">
//       {props.roleView == "emp" ? (
//         <>
//           <Card title="Request Table" className="invoiceTable">
//             <Table
//               className="invoiceTable"
//               columns={columns}
//               dataSource={empInvoiceTable}
//             />
//           </Card>
//           {console.log(empInvoiceTable)}
//           <Modal
//             destroyOnClose
//             centered
//             open={isModalOpen}
//             footer={null}
//             title="INVOICE DETAILS"
//             closeIcon={
//               <div
//                 onClick={() => {
//                   setIsModalOpen(false);
//                 }}
//                 style={{ color: "#ffff" }}
//               >
//                 X
//               </div>
//             }
//             className="updateModal"
//           >
//             <ViewInvoiceDetails
//               setIsModalOpen={setIsModalOpen}
//               invoiceData={invoiceData}
//             />
//           </Modal>
//           <Modal
//             destroyOnClose
//             centered
//             open={isEditModalOpen}
//             footer={null}
//             title="INVOICE DETAILS"
//             width={750}
//             closeIcon={
//               <div
//                 onClick={() => {
//                   setIsEditModalOpen(false);
//                 }}
//                 style={{ color: "#ffff" }}
//               >
//                 X
//               </div>
//             }
//             className="updateModal"
//           >
//             {console.log(invoiceData)}
//             <EditInvoiceDetails
//               getData={props.getData}
//               invoiceData={invoiceData}
//               setIsEditModalOpen={setIsEditModalOpen}
//             />
//           </Modal>
//         </>
//       ) : (
//         <>
//           <Table
//             className="invoiceTable"
//             columns={invoiceColumns}
//             dataSource={filteredPending}
//           />
//           <Table
//             className="invoiceTable"
//             columns={invoiceColumns}
//             dataSource={filteredApprove}
//           />
//           <Modal
//             destroyOnClose
//             centered
//             open={isModalOpen}
//             footer={null}
//             title="INVOICE DETAILS"
//             closeIcon={
//               <div
//                 onClick={() => {
//                   setIsModalOpen(false);
//                 }}
//                 style={{ color: "#ffff" }}
//               >
//                 X
//               </div>
//             }
//             className="updateModal"
//           >
//             <ViewInvoiceDetails
//               setIsModalOpen={setIsModalOpen}
//               invoiceData={invoiceData}
//             />
//           </Modal>
//         </>
//       )}
//     </div>
//   );
// }

// export default InvoiceTable;
