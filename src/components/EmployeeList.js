import { Table, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import React from "react";

const data = [
  {
    key: "1",
    sn: "1",
    fname: "Saswat",
    lname: "Patel",
    email: "saswat@gmail.com",
    dob: "23/07/1992",
    gender: "mail",
    cnumber: "234456677",
  },
  {
    key: "2",
    sn: "2",
    fname: "Jatin",
    lname: "Yadav",
    email: "jatin@gmail.com",
    dob: "23/07/1993",
    gender: "mail",
    cnumber: "234456677",
  },
];

function EmployeeList() {
  const columns = [
    {
      title: "Sl. No.",
      dataIndex: "sn",
      key: "sn",
      width: 80,
    },
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname",
      width: 180,
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname",
      width: 180,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "D.O.B.",
      dataIndex: "dob",
      key: "dob",
      width: 150,
    },

    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      width: 150,
    },
    {
      title: "Contact No.",
      dataIndex: "cnumber",
      key: "cnumber",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",

      render: () => {
        return (
          <>
            <Button style={{ padding: 0 }} type="link" className="edIt">
              {<EditOutlined />}
            </Button>
          </>
        );
      },
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      pagination={{
        pageSize: 50,
      }}
      // scroll={{
      //   y: 240,
      // }}
    />
  );
}

export default EmployeeList;
