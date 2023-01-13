import React, { useState, useEffect } from "react";
import "./AllRequest.css";
import { Table, Button, Tag, Card } from "antd";
import {
  EditFilled,
  DeleteFilled,
  EyeFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import AssetContext from "../../contexts/AssetContext";

function AllRequest(props) {
  console.log(props, "ektaaaaaaaaaaa");
  const [repairAllotReq, setRepairAllotReq] = useState(props.data || []);
  console.log(props.data);
  useEffect(() => {
    setRepairAllotReq(props.data);
  }, [props.data]);

  const setStatus = async (record, status) => {
    const updatedRepairRecord = repairAllotReq.map((allotRecord) => {
      if (allotRecord.id === record.id) {
        allotRecord.status = status;
        record.status = status;
      }

      return allotRecord;
    });
    await AssetContext.updateRepairData(record.id, record);
    setRepairAllotReq(updatedRepairRecord);
  };

  const columns2 = [
    // showed in the admin flow

    {
      title: "Employee Code",
      dataIndex: "empId",
      key: "empId",
      width: 200,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Date",
      dataIndex: "dateOfRepair",
      key: "dateOfRepair",
      width: 200,
    },
    {
      title: "Request Type",
      dataIndex: "type",
      key: "type",
      width: 200,
    },
    {
      title: "Status",
      key: "Status",
      width: 200,
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            style={{ width: "70px", color: "black" }}
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
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 100,
      align: "left",
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{ display: "flex", flexDirection: "row" }}
          >
            {/* {record.status === "Repair" ? ( */}
            <Button
              type="link"
              className="show"
              // onClick={() => {
              //     openModal(record);
              // }}
            >
              {<EyeFilled />}
            </Button>
            {/* ) : null} */}
            <Button
              style={{ padding: 0, color: "rgb(64, 169, 255)" }}
              type="link"
              className="show"
              onClick={() => {
                setStatus(record, "Approved");
              }}
            >
              <CheckOutlined />
            </Button>
            <Button
              type="link"
              className="deleTe"
              onClick={() => {
                setStatus(record, "Reject");
              }}
            >
              <CloseOutlined />
            </Button>
          </div>
        </>
      ),
    },
  ];

  //   const dataSource2 = [
  //     {
  //       key: "1",
  //       slno: "1",
  //       employeecode: "HTS001",
  //       name: "Saswat",
  //       date: "22/01/2023",
  //       requestype: "Repair",
  //     },
  //     {
  //       key: "2",
  //       slno: "2",
  //       employeecode: "HTS001",
  //       name: "Saswat",
  //       date: "22/01/2023",
  //       requestype: "Upgrade",
  //     },
  //   ];

  return (
    <div>
      <Card>
        <Table
          columns={columns2}
          dataSource={repairAllotReq}
          className="assetTable"
        />
      </Card>
    </div>
  );
}

export default AllRequest;
