import { useState, useEffect } from "react";
import { Affix, Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import { createPdfFromHtml } from "./downloadLogic";
import hutechLogo from "../../images/hutechlogo.png";


function PaySlip(props) {
  const showRecord = props.showRecord;
  console.log('showRecord', showRecord)
  const [userid, setUserId] = useState(showRecord.id);
  const [month, setMonth] = useState(null);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [printContent, setPrintContent] = useState(null);
  const [paySlipData, setPaySlipData] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [nofDaysInMonth, setNofDaysInMonth] = useState('-');

  const updateSelectedMonth = (date, dateString) => {
    console.log("selected date string: ", dateString, date);
    const selectedDate = new Date(date);
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
    console.log("selected date: ", year);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const selectedMonthYear = `${monthNames[month]}-${year}`;
    console.log("selected month-year: ", selectedMonthYear);
    setSelectedMonth(selectedMonthYear);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log("daysInMonth: ", daysInMonth)
    setNofDaysInMonth(daysInMonth);
  };

  useEffect(() => {

    if (month) {
      setPaySlipData(true);
    } else {
      setPaySlipData(false);
    }
    getSalaryData(month);

  }, [month,],);


  useEffect(() => {
    setUserId(props.showRecord.id)
    console.log('props.showRecord.id', props.showRecord.id)
  }, [props.showRecord.id]);

  async function getSalaryData() {
    const allSalaryPaySlip = await EmployeeNetSalary.getSalarySlip();
    console.log(allSalaryPaySlip);
    console.log("aaa", allSalaryPaySlip);
    if (allSalaryPaySlip.length > 0) {
      setPaySlipData(allSalaryPaySlip[0]);
    }
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          className="card"
          title="Pay Slip"
          style={{
            width: "790px",
            marginTop: "3px",

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
                className="picker"
                placeholder="Select MM & YY"
                bordered={true}
                format="YYYY-MM-DD"
                style={{
                  width: "100%",
                  background: "#1890ff",
                  cursor: "pointer",
                }}
                allowClear
                onChange={updateSelectedMonth}
              />
            </div>
          </Space>
          {paySlipData ? (
            <>
              <Button
                className="button"
                style={{
                  background: "#1890ff",
                  color: "white",
                  marginLeft: "40rem",
                }}
                type="button"
                onClick={() => {
                  createPdfFromHtml(printContent);
                }}
              >
                Download
              </Button>
              <div className="mainBorder A4" id="payslip">
                <div
                  ref={(el) => {
                    setPrintContent(el);
                  }}
                >
                  <SlipHtml
                    selectedMonth={selectedMonth}
                    nofDaysInMonth={nofDaysInMonth}
                    showRecord={showRecord}


                  />
                </div>
              </div>
            </>
          ) : null}
        </Card>
      </div>
    </>
  );

  function SlipHtml({ selectedMonth, year, nofDaysInMonth, showRecord, }) {
    console.log('showRecord', showRecord)


    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="sheet">
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
                  Payslip for the month of {selectedMonth} - {year}
                </h2>
              </div>
              <div>
                <img
                  src={hutechLogo}
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
                      {showRecord.empId ? showRecord.empId : '-'}
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
                      {showRecord.fname ? showRecord.fname : '-'}
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
                      {showRecord.designation ? showRecord.designation : '-'}
                    </td>
                    {/* <td
                style={{
                  width: "30px",
                  textAlign: "end",

                  cursor: "pointer",
                }}
              >
                <DeleteOutlined />
              </td> */}
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
                      {showRecord.doj ? showRecord.doj : '-'}
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
                      {nofDaysInMonth}
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
                      {nofDaysInMonth}
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
                      {/* {paySlipData[0].basic} */}
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
                      {/* {paySlipData[0].hra} */}
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
                      {/* {paySlipData[0].conveyance} */}
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
                      {/* {paySlipData[0].proffallowance} */}
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
                      {/* {paySlipData[0].specialallowance} */}
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
                      {/* {paySlipData[0].bonus} */}
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
                      {/* {paySlipData[0].lta} */}
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
                      {/* {paySlipData[0].otherAllowance} */}
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
                      Provident Fund Employee:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: "center",
                      }}
                    >
                      {/* {paySlipData[0].pfem} */}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      Provident Fund Employee:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: "center",
                      }}
                    >
                      {/* {paySlipData[0].pfer} */}
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
                      {/* {paySlipData[0].esi} */}
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
                      {/* {paySlipData[0].profTax} */}
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
                      {/* {paySlipData[0].tds} */}
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
                      {/* {paySlipData[0].otherDeduction} */}
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
                        width: "105px",
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      {/* {paySlipData[0].totalEarning} */}
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
                        width: "105px",
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      {/* {paySlipData[0].totalDeduction} */}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="netPay">
              <table>
                <tr>
                  <td>Net Pay For The Month:</td>
                  <td style={{ width: "178px", textAlign: "end" }}>
                    {" "}
                    {/* {paySlipData[0].netSalaryIncome} */}
                  </td>
                  <td style={{ width: "160px" }}>(Eight Thousands Only)</td>
                </tr>
              </table>
            </div>
            <hr style={{ marginRight: "28px" }}></hr>
            <p style={{ textAlign: "center", padding: "10px 0px 10px 0px" }}>
              This is a system generated payslip and does not require signature
            </p>
          </div>
        </div>
      </>
    );
  }
}
export default PaySlip;
