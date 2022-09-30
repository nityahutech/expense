import React, { useState } from "react";
import { Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import { DeleteOutlined } from "@ant-design/icons";

function PaySlip() {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [paySlip, setPaySlip] = useState(false);
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
              cursor: "pointer",
            }}
            onSelect={setMonth}
          />

          <DatePicker
            picker="year"
            bordered={true}
            style={{
              width: "40%",
              marginLeft: "2px",
              background: "#1890ff",
              cursor: "pointer",
            }}
            onSelect={setYear}
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
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Employee Code:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                HTS055
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Name:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                Neel
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Designation:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                Software Developer
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Date of Joining:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                21/09/2022
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
          </table>
        </div>
        <div className="splitRight">
          <table>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Total Days:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                31
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Days Paid:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                31
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Bank:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                HDFC Bank
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
            <tr>
              <td style={{ width: "174px", position: "relative", left: "5px" }}>
                Bank Account Number:
              </td>
              <td style={{ width: "131px", position: "relative", left: "0px" }}>
                1223354545444
              </td>
              <td
                style={{
                  width: "100px",
                  position: "relative",
                  left: "75px",
                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td>
            </tr>
          </table>
        </div>
        <div className="splitSecond">
          <table>
            <thead>
              <tr className="head1">
                <th
                  style={{
                    width: "180px",
                    fontWeight: "500",
                    position: "relative",
                    right: "52px",
                  }}
                >
                  Earnings
                </th>
                <th
                  style={{
                    width: "205px",
                    fontWeight: "500",
                    position: "relative",
                    left: "75px",
                  }}
                >
                  Amount(INR)
                </th>
              </tr>
            </thead>

            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Basic Salary:
              </td>
              <td style={{ position: "relative", left: "150px" }}>3,500</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                House Rent Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>1,700</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Conveyance Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>750</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Medical Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>-</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Professional Development Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>1000</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Special Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>1000</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>Bonus:</td>
              <td style={{ position: "relative", left: "150px" }}>500</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>LTA:</td>
              <td style={{ position: "relative", left: "150px" }}>500</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Other Allowance:
              </td>
              <td style={{ position: "relative", left: "150px" }}>1,500</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
          </table>
        </div>
        <div className="splitThird">
          <table>
            <thead>
              <tr className="head2">
                <th
                  style={{
                    width: "197px",
                    fontWeight: "500",
                    position: "relative",
                    right: "52px",
                  }}
                >
                  Deductions
                </th>
                <th
                  style={{
                    width: "205px",
                    fontWeight: "500",
                    position: "relative",
                    left: "75px",
                  }}
                >
                  Amount(INR)
                </th>
              </tr>
            </thead>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Provident Fund:
              </td>
              <td style={{ position: "relative", left: "147px" }}>1,200</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>ESI:</td>
              <td style={{ position: "relative", left: "147px" }}>-</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Profession Tax:
              </td>
              <td style={{ position: "relative", left: "147px" }}>1000</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>Income Tax:</td>
              <td style={{ position: "relative", left: "147px" }}>1,200</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
            <tr>
              <td style={{ position: "relative", left: "5px" }}>
                Other Deductions:
              </td>
              <td style={{ position: "relative", left: "147px" }}>1,200</td>
              <td>
                <DeleteOutlined style={{ cursor: "pointer" }} />
              </td>
            </tr>
          </table>
        </div>
        <div className="splitFourth">
          <table>
            <tr>
              <td
                style={{
                  padding: "5px",

                  fontWeight: "500",
                }}
              >
                Total Earnings(Rs)
              </td>
              <td
                style={{
                  padding: "5px",
                  position: "relative",
                  left: "197px",
                  fontWeight: "500",
                }}
              >
                10450
              </td>
            </tr>
          </table>
        </div>
        <div className="splitFifth">
          <table>
            <tr>
              <td
                style={{
                  padding: "5px",

                  fontWeight: "500",
                }}
              >
                Total Deductions(Rs)
              </td>
              <td
                style={{
                  padding: "5px",
                  position: "relative",
                  left: "197px",
                  fontWeight: "500",
                }}
              >
                4000
              </td>
            </tr>
          </table>
        </div>

        <div className="netPay">
          <table>
            <tr>
              <td style={{ position: "relative", top: "16px" }}>
                Net Pay For The Month:
              </td>
              <td style={{ position: "relative", left: "51%", top: "16px" }}>
                {" "}
                8000
              </td>
              <td
                style={{
                  position: "relative",
                  top: "81px",
                  right: " 189px",
                  fontWeight: "400",
                }}
              >
                {" "}
                (Eight Thousands Only)
              </td>
            </tr>
          </table>
        </div>
        <hr style={{ position: "relative", bottom: "16rem" }}></hr>
        <p style={{ position: "relative", bottom: "13rem", left: "228px" }}>
          {" "}
          This is a system generated payslip and does not require signature
        </p>
      </div>

      <Button
        style={{
          position: "relative",
          top: "1rem",
          left: "47rem",
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
