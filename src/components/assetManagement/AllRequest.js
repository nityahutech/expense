import React from "react";
import "./AllRequest.css";
import { Table, Button, Tag, Card } from "antd";
import {
  EditFilled,
  DeleteFilled,
  EyeFilled,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";

function AllRequest(props) {
  const columns2 = [
    // showed in the admin flow
    {
      title: "Sl.No. ",
      dataIndex: "slno",
      key: "sl.no.",
      width: 200,
    },
    {
      title: "Employee Code",
      dataIndex: "employeecode",
      key: "employeecode",
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
      dataIndex: "date",
      key: "date",
      width: 200,
    },
    {
      title: "Request Type",
      dataIndex: "requestype",
      key: "requesttype",
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
              // onClick={() => {
              //     showModal(record);
              // }}
            >
              <CheckOutlined />
            </Button>
            <Button type="link" className="deleTe">
              <CloseOutlined />
            </Button>
          </div>
        </>
      ),
    },
  ];

  const dataSource2 = [
    {
      key: "1",
      slno: "1",
      employeecode: "HTS001",
      name: "Saswat",
      date: "22/01/2023",
      requestype: "Repair",
    },
    {
      key: "2",
      slno: "2",
      employeecode: "HTS001",
      name: "Saswat",
      date: "22/01/2023",
      requestype: "Upgrade",
    },
  ];

  return (
    <div>
      <Card>
        <Table
          columns={columns2}
          dataSource={dataSource2}
          className="assetTable"
        />
      </Card>
    </div>
  );
}

export default AllRequest;
