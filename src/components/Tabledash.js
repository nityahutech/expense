import { Row } from "antd";
import React from "react";
import "../style/Table.css";
import { EditOutlined } from "@ant-design/icons";
import { Space, Table, Tag, Button } from "antd";

const data = [
  {
    key: "1",
    sn: "1",
    expname: "Ekta",
    name: "nitya",
    paidname: "jatin",
    date: "21.08.2022",
    subtotal: "500",
  },
  {
    key: "2",
    sn: "2",
    expname: "puja",
    name: "saswat",
    paidname: "pallavi",
    date: "23.08.2022",
    subtotal: "1000",
  },
];

function Tabledash() {
  const columns = [
    {
      title: "SL No.",
      dataIndex: "sn",
      key: "sn",
      // responsive: ["sm"],
      //   fixed: "left",
      //   className: "row1",
      width: 74,
    },
    {
      title: "Expense Name",
      className: "row2",
      dataIndex: "expname",
      key: "expname",
      // responsive: ["sm"],
      // fixed: "left",
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      // sorter: (a, b) => a.catname - b.catname,
      onFilter: (value, record) => record.name.indexOf(value) === 0,

      render: (text) => <a className="catName">{text}</a>,
    },
    {
      title: "Paid By",
      className: "row3",
      dataIndex: "name",
      key: "name",
      // responsive: ["sm"],
    },
    {
      title: "Paid To",
      className: "row3",
      dataIndex: "paidname",
      key: "paidto",
      // responsive: ["sm"],
      // sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Date",
      className: "row4",
      dataIndex: "date",
      key: "date",
      // responsive: ["sm"],
    },
    {
      title: "Sub Total",
      className: "row8",
      dataIndex: "subtotal",
      key: "subtotal",
      // responsive: ["sm"],
    },
    {
      title: "Action",
      className: "row10",
      key: "action",
      // responsive: ["sm"],

      render: (_, record) => {
        // console.log("record:: ", record);
        return (
          record.key !== "subTotal" && (
            <>
              {/* <Space size="small"> */}
              <Button style={{ padding: 0 }} type="link" className="edIt">
                {<EditOutlined />}
              </Button>
            </>
          )
        );
      },
    },
  ];
  return (
    <div className="Maintable">
      <div className="Table1">
        <div className="Row">
          <div>
            <span className="Dot" style={{ backgroundColor: "#0ff40f" }}></span>
            Paid
          </div>
          <div>
            <span className="Dot" style={{ backgroundColor: "#f1a517" }}></span>
            Unpaid
          </div>
          <div>
            <span className="Dot" style={{ backgroundColor: "#ff0000" }}></span>
            Overdue
          </div>
          <div>
            <span className="Dot" style={{ backgroundColor: "#0db9fd" }}></span>
            Draft
          </div>
        </div>
        <div className="Newtable">
          <Table
            columns={columns}
            dataSource={data}
            // pagination={{
            //   position: ["bottomCenter"],
            // }}

            scroll={{ x: 1000 }}
          />
        </div>
      </div>

      <div className="Table2"></div>
    </div>
  );
}
export default Tabledash;
