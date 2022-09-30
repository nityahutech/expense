import React, { useState, useEffect } from "react";
import { Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import { DeleteOutlined } from "@ant-design/icons";

function PaySlip() {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  const [paySlip, setPaySlip] = useState(false);

  useEffect(() => {
    console.log({ month, year });
    if (month & year) {
      // alert("ok");
      setPaySlip(true);
    } else {
      // alert("NA");
      setPaySlip(false);
    }
  }, [month, year]);

  console.log({ month, year });
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
        <div
          className="date"
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <DatePicker
            picker="month"
            bordered={true}
            style={{
              width: "42%",
              background: "#1890ff",
              cursor: "pointer",
            }}
            clearIcon={<div onClick={() => setMonth(false)}>X</div>}
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
            clearIcon={<div onClick={() => setYear(false)}>X</div>}
            onSelect={setYear}
          />

          <Button
            className="button"
            style={{
              background: "#1890ff",
              color: "white",
              marginLeft: "27rem",
            }}
          >
            Download
          </Button>
        </div>
      </Space>
      {paySlip ? (
        <div className="mainBorder" id="payslip">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <div></div>
            <div className="heading">
              <h1 style={{ fontSize: "14px", textAlign: "center" }}>
                Humantech Solutions India Private Limited
              </h1>
              <h2 style={{ fontSize: "14px", textAlign: "center" }}>
                Payslip for the month of July - 2022
              </h2>
            </div>
            <div>
              <img
                src="https://hutechsolutions.com/img/hutech-logo.png"
                style={{
                  marginRight: "34px",
                  marginTop: "5px",
                  width: "100px",
                }}
              ></img>
            </div>
          </div>
          <div className="firstSplit">
            <div className="splitLeft">
              <table>
                <tr>
                  <td
                    style={{
                      width: "195px",
                    }}
                  >
                    Employee Code:
                  </td>
                  <td
                    style={{
                      width: "195px",
                    }}
                  >
                    HTS055
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "195px",
                    }}
                  >
                    Name:
                  </td>
                  <td
                    style={{
                      width: "195px",
                    }}
                  >
                    Neel
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Designation:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Software Developer
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Date of Joining:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    21/09/2022
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

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
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Total Days:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    31
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Days Paid:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    31
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Bank:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    HDFC Bank
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    Bank Account Number:
                  </td>
                  <td
                    style={{
                      width: "180px",
                    }}
                  >
                    1223354545444
                  </td>
                  <td
                    style={{
                      width: "30px",
                      textAlign: "end",

                      cursor: "pointer",
                    }}
                  >
                    <DeleteOutlined />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="secondSplit">
            <div className="splitSecond">
              <table>
                <thead>
                  <tr className="head1">
                    <th
                      style={{
                        width: "196px",
                        textAlign: "left",
                      }}
                    >
                      Earnings
                    </th>
                    <th
                      style={{
                        width: "196px",
                        textAlign: "right",
                      }}
                    >
                      Amount(INR)
                    </th>
                  </tr>
                </thead>

                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Basic Salary:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    3,500
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    House Rent Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1,700
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Conveyance Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    750
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Medical Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    -
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Professional Development Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1000
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Special Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1000
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Bonus:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    500
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    LTA:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    500
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Other Allowance:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1,500
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
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
                        width: "400px",
                        textAlign: "left",
                      }}
                    >
                      Deductions
                    </th>
                    <th
                      style={{
                        width: "180px",
                        textAlign: "right",
                      }}
                    >
                      Amount(INR)
                    </th>
                  </tr>
                </thead>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Provident Fund:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1,200
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    ESI:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    -
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Profession Tax:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1000
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Income Tax:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1,200
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      width: "700px",
                    }}
                  >
                    Other Deductions:
                  </td>
                  <td
                    style={{
                      width: "180px",
                      textAlign: "center",
                    }}
                  >
                    1,200
                  </td>
                  <td>
                    <DeleteOutlined
                      style={{
                        width: "30px",
                        textAlign: "end",

                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="thirdSplit">
            <div className="splitFourth">
              <table>
                <tr>
                  <td
                    style={{
                      width: "197px",
                      fontWeight: "500",
                    }}
                  >
                    Total Earnings(Rs)
                  </td>
                  <td
                    style={{
                      width: "165px",
                      fontWeight: "500",
                      textAlign: "center",
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
                      width: "197px",
                      fontWeight: "500",
                    }}
                  >
                    Total Deductions(Rs)
                  </td>
                  <td
                    style={{
                      width: "165px",
                      fontWeight: "500",
                      textAlign: "center",
                    }}
                  >
                    4000
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div className="netPay">
            <table>
              <tr>
                <td>Net Pay For The Month:</td>
                <td style={{ width: "236px", textAlign: "center" }}>8000</td>
                <td>(Eight Thousands Only)</td>
              </tr>
            </table>
          </div>
          <hr></hr>
          <p style={{ textAlign: "center", padding: "10px 0px 10px 0px" }}>
            This is a system generated payslip and does not require signature
          </p>
        </div>
      ) : null}
    </Card>
  );
}

export default PaySlip;
