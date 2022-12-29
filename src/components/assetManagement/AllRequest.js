import React from "react";
import "./AllRequest.css";
import { Table } from "antd";

function AllRequest(props) {
  const isHr = props.roleView == "admin";
  const columns1 = [
    {
      title: "Sl. No.",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
    },
    {
      title: "Request Type",
      dataIndex: "reqType",
      key: "reqType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  const columns2 = [
    {
      title: "Sl. No.",
      dataIndex: "serial",
      key: "serial",
    },
    {
      title: "Request Type",
      dataIndex: "reqType",
      key: "reqType",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];

  return (
    <div>
      {isHr ? (
        <>
          <Table columns={columns1} />
        </>
      ) : (
        <Table columns={columns2} />
      )}
    </div>
  );
}

export default AllRequest;
