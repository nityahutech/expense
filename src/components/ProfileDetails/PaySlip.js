import React from "react";
import { Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import { DeleteOutlined } from "@ant-design/icons";

function PaySlip() {
  return (
    <Card
      className="card"
      title="Pay Slip"
      style={{
        width: "900px",
        marginTop: "3px",
        marginLeft: "5rem",
        height: "auto",
      }}
    >
      <Space direction="vertical" size={12}>
        <div>
          <DatePicker
            picker="month"
            bordered={true}
            style={{
              width: "40%",
              background: "#1890ff",
            }}
          />

          <DatePicker
            picker="year"
            bordered={true}
            style={{ width: "40%", marginLeft: "2px", background: "#1890ff" }}
          />
        </div>
      </Space>
      <div className="mainBorder">
        <h1 style={{ fontSize: "14px", textAlign: "center" }}>
          Humantech Solutions India Private Limited
        </h1>
        <h2 style={{ fontSize: "14px", textAlign: "center" }}>
          Payslip for the month of July - 2022
        </h2>
        <img
          src="https://hutechsolutions.com/img/hutech-logo.png"
          style={{
            position: "relative",
            left: "45rem",
            bottom: "50px",
            width: "100px",
          }}
        ></img>
        <div className="splitLeft">
          <table>
            <tr>
              <td style={{ width: "174px" }}>Employee Code:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                HTS055
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Name:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                Neel
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Designation:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                Software Developer
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Date of Joining:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                21/09/2022
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
          </table>
        </div>
        <div className="splitRight">
          <table>
            <tr>
              <td style={{ width: "174px" }}>Total Days:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                31
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Days Paid:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                31
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Bank:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                HDFC Bank
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px" }}>Bank Account Number:</td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                1223354545444
              </td>
              <td
                style={{ width: "100px", position: "relative", left: "75px" }}
              >
                <DeleteOutlined />
              </td>
            </tr>
          </table>
        </div>
      </div>
      <Button
        style={{
          position: "relative",
          top: "6rem",
          left: "20rem",
          background: "#1890ff",
          color: "white",
        }}
      >
        Download
      </Button>
    </Card>
  );
}

export default PaySlip;
