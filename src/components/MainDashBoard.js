import React, { useEffect, useState } from "react";
import { Avatar, Badge, Calendar, Card, Col, Row, Tooltip } from "antd";
import "../style/MainDashBoard.css";
import Attendancelog from "../images/Attendancelog.png";
import leaveicon from "../images/leave-icon.png";
import Payslip from "../images/Payslip.png";
import Payroll from "../images/Payroll.png";
import Employeelist from "../images/Employeelist.png";
import Expenses from "../images/Expenses.png";
import Myprofile from "../images/Myprofile.png";
import Companyprofile from "../images/companyvision.png";
import Settings from "../images/Settings.png";
import Organization from "../images/organizationLogoNew.png";
import appraisalicon from "../images/list.png";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "antd/lib/radio";
import moment from "moment";
import { AlertTwoTone } from "@ant-design/icons";
import Notifications from "./Notifications";
import { getManagersData } from "../contexts/CreateContext";
// import { AlertTwoTone, CalendarTwoTone, ScheduleTwoTone } from "@ant-design/icons";

function MainDashBoard(props) {
  console.log("propsss", props);
  const role = sessionStorage.getItem("role");
  const compId = sessionStorage.getItem("compId");
  const navigate = useNavigate();
  const [selected, setSelected] = useState([
    moment().format("Do MMM, YYYY"),
    moment().format("MMM, YYYY"),
  ]);
  props.switchRole(role);
  const cardStyle = {
    fontWeight: "600",
    fontSize: "13px",
    letterSpacing: "1px",
    borderRadius: "15px",
    width: "125px",
    padding: "5px",
    margin: "auto",
  };
  const isHr =
    role == "super" ? false : sessionStorage.getItem("isHr") == "true";

  const organizationcon = () => {
    return (
      <Link to="/Organization/Onboarding">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Organization}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Organization
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const attendanceIcon = () => {
    return (
      <Link to="/my-attendance">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Attendancelog}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Attendance
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const leaveIcon = () => {
    return (
      <Link to="/leave">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={leaveicon}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>Leave</span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const paySlipIcon = () => {
    return (
      <Link to="/my-profile" state={{ active: "8" }}>
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Payslip}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Payslip
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const payrollIcon = () => {
    return (
      <Link to="/employees/payroll">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Payroll}
          />
          <span
            style={{
              paddingTop: "10px",
              textAlign: "center",
              textAlign: "center",
            }}
          >
            Payroll Generator
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };
  const employeeIcon = () => {
    return (
      <Link to="/employees/view">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Employeelist}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Employees
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const expenseIcon = () => {
    return (
      <Link to="/Expense/ExpenseList">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Expenses}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Expense
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const myProfileIcon = () => {
    return (
      <Link to="/my-profile">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Myprofile}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            My Profile
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const companyProfileIcon = () => {
    return (
      <Link to="/company-profile">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Companyprofile}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Company Profile
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const settingIcon = () => {
    return (
      <Link to="/settings">
        {/* <div style={{ display: "flex", justifyContent: "center" }}> */}
        <Card bordered hoverable style={cardStyle}>
          <img
            style={{
              width: "80%",
              backgroundColor: "#dce1e3",
              borderRadius: "5px",
              padding: "10px",
            }}
            alt="example"
            src={Settings}
          />
          <span style={{ paddingTop: "10px", textAlign: "center" }}>
            Settings
          </span>
        </Card>
        {/* </div> */}
      </Link>
    );
  };

  const appraisalIcon = () => {
    return (
      // <div style={{ display: "flex", justifyContent: "center" }}>
      <Card bordered hoverable style={cardStyle}>
        <img
          style={{
            width: "80%",
            backgroundColor: "#dce1e3",
            borderRadius: "5px",
            padding: "10px",
          }}
          alt="example"
          src={appraisalicon}
        />
        <span style={{ paddingTop: "10px", textAlign: "center" }}>
          Appraisal
        </span>
      </Card>
      // </div>
    );
  };
  useEffect(() => {
    getManagersData(compId, "Swetha Et Vijay");
  }, []);

  // const getListData = (value) => {
  //   let listData = [];
  //   let currdate = value.format("Do MMM, YYYY");
  //   let companyHolidayRecord = companyholiday.filter(
  //     (record) => record.date == currdate
  //   );
  //   if (companyHolidayRecord.length > 0) {
  //     listData = [
  //       {
  //         type: companyHolidayRecord[0].name,
  //         isOptional: companyHolidayRecord[0]?.optionalHoliday,
  //       },
  //     ];
  //   }
  //   let temp = duration.indexOf(currdate);
  //   if (temp != -1) {
  //     if (durStatus[temp] != "Rejected") {
  //       listData = [
  //         {
  //           type: durStatus[temp] == "Approved" ? "On Leave" : "Pending",
  //           status: durStatus[temp],
  //         },
  //       ];
  //     }
  //   }
  //   return listData;
  // };

  const disabledCalendarDate = (current) => {
    return moment(current).day() === 0 || current.day() === 6;
  };

  const monthCellRender = (value) => {
    const listData = [];
    let currdate = value.format("MMM, YYYY");
    props.data?.holidays?.forEach((hol) => {
      if (currdate == moment(hol.date, "Do MMM, YYYY").format("MMM, YYYY")) {
        listData.push({
          name: hol.name,
          optionalHoliday: hol.optionalHoliday,
        });
      }
    });
    let textVal = "";
    let bgColor = "#ffffff";
    let color = "#ffffff";
    let borderColor =
      currdate == moment().format("MMM, YYYY") ? "#1890ff" : "#e6e8eb";
    let bgSel = selected[1] == currdate ? " bg-sel" : "";
    return (
      // <div className="ant-calendar-date" title="">
      //   { listData.map((d) => {
      //     color = d.optionalHoliday
      //         ? "rgba(0, 119, 137, 0.96)"
      //         : "rgba(252, 143, 10, 1)"
      //     bgColor = d.optionalHoliday
      //       ? "rgba(154, 214, 224, 0.96)"
      //         : "rgba(252, 143, 10,0.2)"
      //         return(
      //     // <li style={{
      //     //   backgroundColor: bgColor,
      //     //   color: color,
      //     //   fontSize: "12px",
      //     //   paddingLeft: "5px",
      //     //   paddingRight: "5px",
      //     //   margin: "0px",
      //     //   borderRadius: "100px",
      //     //   justifyContent: "center",
      //     //   marginBottom: "3px"
      //     // }}>{d.name}</li>
      //     <Tooltip title={d.name} color={color}>
      //       <Badge color={color} />
      //     </Tooltip>
      //   )})}
      // </div>
      <div
        className={"ant-calendar-date" + bgSel}
        title=""
        style={{
          width: "90%",
          height: "70px",
          margin: "auto",
          // borderLength: "90%",
          padding: "5px",
          borderTop: "2px solid #f0f0f0",
          borderTopColor: borderColor,
          // backgroundColor: bgSel,
          // bottom: "0",
          // margin: "0",
          // border-left: 2px solid #f51c40,
        }}
      >
        {value.format("MMM")}
        <div
          style={{
            height: "30px",
            width: "85%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {listData.map((d) => {
            color = d.optionalHoliday
              ? "rgba(0, 119, 137, 0.96)"
              : "rgba(252, 143, 10, 1)";
            bgColor = d.optionalHoliday
              ? "rgba(154, 214, 224, 0.96)"
              : "rgba(252, 143, 10,0.2)";
            return (
              // <li style={{
              //   backgroundColor: bgColor,
              //   color: color,
              //   fontSize: "12px",
              //   paddingLeft: "5px",
              //   paddingRight: "5px",
              //   margin: "0px",
              //   borderRadius: "100px",
              //   justifyContent: "center",
              //   marginBottom: "3px"
              // }}>{d.name}</li>
              <Tooltip title={d.name} color={color}>
                {/* <Badge color={color} /> */}
                <Avatar size={10} style={{ backgroundColor: color }}></Avatar>
              </Tooltip>
            );
          })}
        </div>
      </div>
    );
  };

  const dateCellRender = (value) => {
    let listData = [];
    let currdate = value.format("Do MMM, YYYY");
    let companyHolidayRecord =
      props.data?.holidays?.filter((record) => record.date == currdate) || [];
    if (companyHolidayRecord.length > 0) {
      listData = [
        {
          type: companyHolidayRecord[0].name,
          isOptional: companyHolidayRecord[0]?.optionalHoliday,
        },
      ];
    }
    let textVal = "";
    let bgColor = "#ffffff";
    let color = "#ffffff";
    let borderColor =
      currdate == moment().format("Do MMM, YYYY") ? "#1890ff" : "#e6e8eb";
    let bgSel = selected[0] == currdate ? " bg-sel" : "";
    // rgba(74, 67, 67, 0.2)
    if (!(listData.length == 0)) {
      textVal = listData[0].type;
      color =
        listData[0].type == "On Leave"
          ? "rgba(0, 128, 0,  1)"
          : listData[0].type === "Pending"
          ? "rgb(166 168 69)"
          : listData[0].isOptional
          ? "rgba(0, 119, 137, 0.96)"
          : "rgba(252, 143, 10, 1)";
      bgColor =
        listData[0].type == "On Leave"
          ? "rgb(15, 255, 80,0.2)"
          : listData[0].type === "Pending"
          ? "rgb(205 227 36 / 25%)"
          : listData[0].isOptional
          ? "rgba(154, 214, 224, 0.96)"
          : "rgba(252, 143, 10,0.2)";
    }

    return (
      <div
        className={"ant-calendar-date" + bgSel}
        title=""
        style={{
          width: "90%",
          height: "70px",
          margin: "auto",
          // borderLength: "90%",
          padding: "5px",
          borderTop: "2px solid #f0f0f0",
          borderTopColor: borderColor,
          // backgroundColor: bgSel,
          // bottom: "0",
          // margin: "0",
          // border-left: 2px solid #f51c40,
        }}
      >
        {value.format("DD")}
        {/* <div style={{flexDirection: "column"}}> */}
        {textVal == "" ? null : (
          <div
            style={{
              height: "30px",
              width: "85%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
          >
            <Tooltip title={textVal} color={color}>
              {/* <div
                  // className="calendar-button"
                  // style={{
                  //       backgroundColor: bgColor,
                  //   //     color: color,
                  // }}
                  style={{backgroundColor: bgColor, width: "100%", height: "100%"}}
                >
                  
                </div> */}
              <Avatar size={10} style={{ backgroundColor: color }}></Avatar>
              {/* <Badge color={color} /> */}
            </Tooltip>
          </div>
          // <div
          //   className="events"
          //   style={{
          //     backgroundColor: bgColor,
          //     color: color,
          //     fontSize: "12px",
          //     paddingLeft: "5px",
          //     paddingRight: "5px",
          //     margin: "0px",
          //     borderRadius: "100px",
          //     justifyContent: "center",
          //   }}
          // >
          //   {/* <div className="ant-calendar-date" title={textVal}>
          //   {textVal}
          // </div> */}
          //   <div className="present"> {textVal} </div>
          // </div>
        )}
        {/* </div> */}
      </div>
    );
  };

  return (
    <>
      <Row style={{ padding: "30px 20px" }} gutter={20}>
        <Col sm={24} md={11}>
          <Card
            bordered
            hoverable
            style={{
              width: "100%",
              marginBottom: "15px",
              padding: "10px",
              borderRadius: "15px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "white",
                  justifyContent: "space-between",
                  paddingTop: "0px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <div
                    className="calendar-button"
                    style={{
                      backgroundColor: "rgba(154, 214, 224, 0.96)",
                    }}
                  >
                    <h5
                      style={{ color: "rgba(0, 119, 137, 0.96)" }}
                      className="rep-text"
                    >
                      Optional Holiday
                    </h5>
                  </div>
                  <div
                    className="calendar-button"
                    style={{
                      backgroundColor: "rgba(252, 143, 10,0.2)",
                    }}
                  >
                    <h5
                      style={{ color: "rgba(252, 143, 10, 1)" }}
                      className="rep-text"
                    >
                      Official Holiday
                    </h5>
                  </div>
                  <div
                    className="calendar-button"
                    style={{
                      backgroundColor: "rgba(74, 67, 67,0.2)",
                    }}
                  >
                    <h5
                      style={{ color: "rgba(74, 67, 67, 1)" }}
                      className="rep-text"
                    >
                      Weekly Off
                    </h5>
                  </div>
                </div>
              </div>

              <Calendar
                style={{ margin: "auto", marginTop: "30px" }}
                // value={date}
                // onChange={setDate}
                onSelect={(e) =>
                  setSelected([e.format("Do MMM, YYYY"), e.format("MMM, YYYY")])
                }
                dateFullCellRender={dateCellRender}
                disabledDate={disabledCalendarDate}
                monthFullCellRender={monthCellRender}
              />
            </div>
          </Card>
        </Col>
        <Col sm={24} md={13}>
          <Row>
            <Col style={{ width: "100%" }}>
              <Card
                title="Notifications"
                style={{ borderRadius: "15px", padding: "0" }}
                // scroll={{ x: "max-content" }}
                bordered
                hoverable
                headStyle={{ height: "45px" }}
              >
                <Notifications
                  notifications={props.notifications}
                  height={"200px"}
                />
                {/* {Notifications} */}
              </Card>
            </Col>
            <Col>
              <div className="icon-container">
                {role == "emp" && !isHr ? (
                  <>
                    <Row
                      gutter={[0, 10]}
                      // style={{ justifyContent: "space-between" }}
                    >
                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {attendanceIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {leaveIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {myProfileIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {paySlipIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {settingIcon()}
                      </Col>
                    </Row>
                  </>
                ) : null}

                {role == "admin" || isHr ? (
                  <>
                    <Row
                      gutter={[0, 10]}
                      // style={{ justifyContent: "space-between" }}
                    >
                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {companyProfileIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {employeeIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {attendanceIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {leaveIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {payrollIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {myProfileIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {paySlipIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} lg={8} xl={6} className="hi">
                        {settingIcon()}
                      </Col>
                    </Row>
                  </>
                ) : null}

                {role == "super" ? (
                  <>
                    <Row
                      gutter={[0, 10]}
                      // style={{ justifyContent: "space-between" }}
                    >
                      <Col xs={12} sm={12} md={8} className="hi">
                        {myProfileIcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} className="hi">
                        {organizationcon()}
                      </Col>

                      <Col xs={12} sm={12} md={8} className="hi">
                        {settingIcon()}
                      </Col>
                    </Row>
                  </>
                ) : null}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
export default MainDashBoard;
