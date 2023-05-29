import { Table } from "antd"
import { useState } from "react";

const AssetList = (props) => {

    const [filteredData, setFilteredData] = useState([])

    const columns = [
        {
          title: "Serial Number",
          dataIndex: "empCode",
          key: "empCode",
          width: 150,
          align: "left",
        },
        {
          title: "Asset Name",
          dataIndex: "name",
          key: "name",
          width: 200,
          align: "left",
        },
        {
          title: "Type",
          dataIndex: "dateOfRepair",
          key: "dateOfRepair",
          width: 150,
          align: "left",
        },
        // {
        //   title: "Request Type",
        //   dataIndex: "type",
        //   key: "type",
        //   width: 150,
        //   align: "left",
        // },
        // {
        //   title: "Status",
        //   key: "Status",
        //   width: 120,
        //   align: "left",
        //   render: (_, { status }) =>
        //     status !== "" && (
        //       <Tag
        //         style={{
        //           width: "84px",
        //           color: "#000000",
        //           borderRadius: "10px",
        //           display: "flex",
        //           justifyContent: "center",
        //           padding: "2px",
        //         }}
        //         className="statusTag"
        //         color={
        //           status === "Approved"
        //             ? "rgb(8 231 68 / 75%)"
        //             : status === "Reject"
        //             ? "#f44336"
        //             : "rgb(244 209 105)"
        //         }
        //         key={status}
        //       >
        //         {status}
        //       </Tag>
        //     ),
        // },
        {
          title: "Action",
          dataIndex: "operation",
          key: "operation",
          width: 170,
          align: "center",
        //   render: (_, record) => (
        //     <>
        //       <div
        //         className="employee-button"
        //         style={{
        //           display: "flex",
        //           flexDirection: "row",
        //           justifyContent: "center",
        //         }}
        //       >
        //         <Button
        //           onClick={() => openModal(record)}
        //           type="link"
        //           className="show"
        //           style={
        //             record.status == "Approved" || "Reject"
        //               ? { marginLeft: "2rem", color: "#000000" }
        //               : { marginLeft: "1rem", color: "#000000" }
        //           }
        //         >
        //           {<EyeFilled />}
        //         </Button>
    
        //         <Button
        //           style={
        //             record.status == "Pending"
        //               ? {
        //                   padding: 0,
        //                   color: "rgb(39 151 44 / 74%)",
        //                 }
        //               : { display: "none" }
        //           }
        //           type="link"
        //           className="show"
        //           onClick={() => {
        //             setStatus(record, "Approved");
        //           }}
        //         >
        //           <img src={Checkmark} />
        //         </Button>
        //         <Button
        //           style={record.status == "Pending" ? null : { display: "none" }}
        //           type="link"
        //           className="deleTe"
        //           onClick={() => {
        //             setStatus(record, "Reject");
        //           }}
        //         >
        //           <img src={CheckReject} width={20} />
        //         </Button>
        //       </div>
        //     </>
        //   ),
        },
      ];

    return (
      <Table
      size="small"
      columns={columns}
      dataSource={filteredData}
      className="assetTable"
    />
    )
}

export default AssetList