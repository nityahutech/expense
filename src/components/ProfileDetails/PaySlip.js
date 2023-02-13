import { useState, useEffect } from "react";
import { Affix, Button, Card, Table } from "antd";
import { DatePicker, Space } from "antd";
import "../../style/Payslip.css";
import EmployeeNetSalary from "../../contexts/EmployeeNetSalary";
import { getUsers } from "../../contexts/CreateContext";
import { createPdfFromHtml } from "./downloadLogic";
import hutechLogo from "../../images/hutechlogo.png";
import moment from 'moment';


function PaySlip(props) {
  const showRecord = props.showRecord;
  console.log('showRecord', showRecord)
  const [userid, setUserId] = useState(showRecord.id);
  const [month, setMonth] = useState(null);
  const [printContent, setPrintContent] = useState(null);
  const [paySlipData, setPaySlipData] = useState(false);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [data, setData] = useState()



  const currentMonth = moment();//current month
  const previousMonth = moment().subtract(1, 'month');//previous month
  const numberOfDaysInMonth = previousMonth.daysInMonth();//day in month
  const [nofDaysInMonth, setNofDaysInMonth] = useState(numberOfDaysInMonth);//set day in month
  const units = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const [selectedMonth, setSelectedMonth] = useState(`${previousMonth.format("MMM")}-${previousMonth.format("YYYY")}`);

  const updateSelectedMonth = (date, dateString) => {
    console.log("selected date string: ", dateString, date);
    const selectedDate = new Date(date);
    let month = selectedDate.getMonth();
    setMonth(month)
    const year = selectedDate.getFullYear();
    console.log("selected date: ", year);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const selectedMonthYear = `${monthNames[month]} ${year}`;
    console.log("selected month-year: ", selectedMonthYear);
    setSelectedMonth(selectedMonthYear);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    console.log("daysInMonth: ", daysInMonth)
    setNofDaysInMonth(daysInMonth);
  };
  const disabledDate = (currentDate) => {
    return currentDate && (currentDate.isAfter(currentMonth) || currentDate.isSame(currentMonth, 'month'));
  };

  useEffect(() => {

    if (month) {
      setPaySlipData(true);
    } else {
      setPaySlipData(false);
    }
    getSalaryData(props.showRecord.id);


  }, [month]);


  useEffect(() => {
    setUserId(props.showRecord.id)
    console.log('props.showRecord.id', props.showRecord.id)
    getSalaryData(props.showRecord.id)
    // getData()
    getDatas()

  }, [props.showRecord.id]);

  function RupeeSign({ amount }) {
    return (
      <span>₹ {amount}</span>
    );
  }
  // number to words
  function numberToWords(n) {
    if (n < 20) return units[n];
    if (n < 100) return tens[Math.floor(n / 10)] + (n % 10 !== 0 ? " " + units[n % 10] : "");
    if (n < 1000) return units[Math.floor(n / 100)] + " Hundred" + (n % 100 !== 0 ? " and " + numberToWords(n % 100) : "");
    if (n < 1000000) return numberToWords(Math.floor(n / 1000)) + " Thousand" + (n % 1000 !== 0 ? " " + numberToWords(n % 1000) : "");
    return numberToWords(Math.floor(n / 1000000)) + " Million" + (n % 1000000 !== 0 ? " " + numberToWords(n % 1000000) : "");
  }

  function formatNetSalary(amount) {
    return `( ${numberToWords(amount)} Only)`;
  }
  //salary detail
  async function getSalaryData(id) {
    console.log(id)
    const allSalaryPaySlip = await EmployeeNetSalary.getSalary(currentUser.uid);
    console.log("aaa", allSalaryPaySlip);
    setPaySlipData(allSalaryPaySlip);

  }
  //current user
  async function getDatas(id) {
    console.log(id)
    const currentUser = await EmployeeNetSalary.getUserCurrent(currentUser.uid);
    console.log("aaa", currentUser);
    setData(currentUser);
  }


  console.log('paySlipData', paySlipData)
  // console.log(props.showRecord.id, month)
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
                format="DD-MM-YYYY"
                style={{
                  width: "100%",
                  background: "#1890ff",
                  cursor: "pointer",
                }}
                allowClear
                defaultValue={previousMonth}
                disabledDate={disabledDate}
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
                flexDirection: "row-reverse",
              }}
            >
              <div></div>
              <div style={{ marginLeft: '-135px' }} className="heading">
                <h1 style={{ fontSize: "14px", textAlign: "center" }}>
                  Humantech Solutions India Private Limited
                </h1>
                <h2 style={{ fontSize: "14px", textAlign: "center" }}>
                  Payslip for the month of {selectedMonth}  {year}
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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.empId ? showRecord.empId : '0'}

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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.fname ? showRecord.fname : '0'}
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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.designation ? showRecord.designation : '0'}
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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {showRecord.doj ? showRecord.doj : '0'}
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
                        textAlign: 'left',
                        paddingLeft: '100px'
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
                        textAlign: 'left',
                        paddingLeft: '100px'
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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {/* {showRecord.bank[0].accountNo ? showRecord.bank[0].accountNo : 0} */}
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
                        textAlign: 'left',
                        paddingLeft: '100px'
                      }}
                    >
                      {/* {console.log('showRecord.bank[0].accountNo', showRecord.bank[0].accountNo)} */}
                      {/* {showRecord.bank[0].accountNo ? showRecord.bank[0].accountNo : 0} */}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.basic ? paySlipData.basic : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.hra ? paySlipData.hra : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.conveyance ? paySlipData.conveyance : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.medical ? paySlipData.medical : 0}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{
                        width: "700px",
                      }}
                    >
                      Prof. Development Allowance:
                    </td>
                    <td
                      style={{
                        width: "180px",
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.proffallowance ? paySlipData.proffallowance : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.specialallowance ? paySlipData.specialallowance : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.bonus ? paySlipData.bonus : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.lta ? paySlipData.lta : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.otherAllowance ? paySlipData.otherAllowance : 0}
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
                          textAlign: 'left',
                          paddingLeft: '40px'
                        }}
                      >
                        Deductions
                      </th>
                      <th
                        style={{
                          width: "180px",
                          textAlign: 'left',
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.pfem ? paySlipData.pfem : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.pfer ? paySlipData.pfer : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.esi ? paySlipData.esi : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.profTax ? paySlipData.profTax : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.tds ? paySlipData.tds : 0}
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
                        textAlign: 'left',
                        paddingLeft: '40px'
                      }}
                    >
                      {paySlipData.otherDeduction ? paySlipData.otherDeduction : 0}
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
                      <RupeeSign amount={paySlipData.totalEarning ? paySlipData.totalEarning : 0} />

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
                        width: "75px",
                        fontWeight: "500",
                        textAlign: "right",
                      }}
                    >
                      <RupeeSign amount={paySlipData.totalDeduction ? paySlipData.totalDeduction : 0} />
                      {/* {paySlipData.totalDeduction} */}
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <div className="netPay">
              <table>
                <tr>
                  <td>Net Pay:</td>
                  <td style={{ width: "178px", textAlign: "start" }}>
                    {" "}
                    <RupeeSign amount={paySlipData.netSalaryIncome} />

                  </td>
                  <td style={{ width: "420px" }}>{formatNetSalary(paySlipData.netSalaryIncome ? paySlipData.netSalaryIncome : 0)}</td>
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
