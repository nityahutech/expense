import React from "react";
import { Card, Col, Row } from "antd";
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
import Organization from "../images/organizationLogoNew.png"
import { Link } from "react-router-dom";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function MainDashBoard() {
  const isHr = sessionStorage.getItem("role");

  const organizationcon = () => {
    return(
      <Link to="/OnboardingPage/Onboarding">
        <Card
          bordered={false}
          hoverable={true}
          style={{ 
            fontWeight: "600", 
            fontSize: "20px", 
            letterSpacing: "1px",
            borderRadius: "15px",
          }}
        >
          <img style={{ width: "90px" }} alt="example" src={Organization} />
          Organization
        </Card>
      </Link>
    )
  };

  const attendanceIcon = () => {
    return (
      <Link to="/Attendance/AttendanceLog">
        <Card
          bordered={false}
          hoverable={true}
          style={{ 
            fontWeight: "600", 
            fontSize: "20px", 
            letterSpacing: "1px",
            borderRadius: "15px",
          }}
        >
          <img style={{ width: "90px" }} alt="example" src={Attendancelog} />
          Attendance Log
        </Card>
      </Link>
    );
  };

  const leaveIcon = () => {
    return (
      <Link to="/Employee/Leave">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px",borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={leaveicon} />
          Leave
        </Card>
      </Link>
    );
  };

  const paySlipIcon = () => {
    return (
      // <Link to="/PaySlipPage/PaySlip">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px",  borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Payslip} />
          Pay Slip Generator
        </Card>
      // </Link>
    );
  };

  const payrollIcon = () => {
    return (
      // <Link to="/Payslip2/HrPaySlip">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px",  borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Payroll} />
          Payroll
        </Card>
      // </Link>
    );
  };

  const employeeIcon = () => {
    return (
      <Link to="/EmployeeListPage/EmployeeList">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px",  borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Employeelist} />
          Employee List
        </Card>
      </Link>
    );
  };

  const expenseIcon = () => {
    return (
      <Link to="/Expense/ExpenseList">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px",   borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Expenses} />
          Expense
        </Card>
      </Link>
    );
  };

  const myProfileIcon = () => {
    return (
      <Link to="/Profile">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px", borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Myprofile} />
          My Profile
        </Card>
      </Link>
    );
  };

  const companyProfileIcon = () => {
    return (
      <Link to="/CompanyProfilepage">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px", borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Companyprofile} />
          Company Profile
        </Card>
      </Link>
    );
  };

  const settingIcon = () => {
    return (
      <Link to="/Setting">
        <Card
          bordered={false}
          hoverable={true}
          style={{ fontWeight: "600", fontSize: "20px", letterSpacing: "1px", borderRadius: "15px", }}
        >
          <img style={{ width: "90px" }} alt="example" src={Settings} />
          Setting
        </Card>
      </Link>
    );
  };

  return (
    <div className="icon-container" >

      {isHr == "emp" ? (
        <>
          <Row>
            <Col xs={8} sm={8} md={8}></Col>
            <Card style={{width:"25%"}}>
              <Row gutter={[24, 24]}>
                <Col xs={22} sm={15} md={24} className="hi">
                  {attendanceIcon()}
                </Col>

                <Col xs={22} sm={15} md={24} className="hi">
                  {leaveIcon()}
                </Col>

                <Col xs={22} sm={15} md={24} className="hi">
                  {myProfileIcon()}
                </Col>

                <Col xs={22} sm={15} md={24} className="hi">
                  {settingIcon()}
                </Col>

              </Row>
            </Card>
          </Row>
        </>
      ) : null}

      {isHr == "hr" ? (
        <>
          <Row>
            <Col xs={4} sm={4} md={4}></Col>
            <Card style={{width:"70%"}}>
              <Row gutter={[24, 24]}>
                <Col xs={24} sm={24} md={8} className="hi">
                  {attendanceIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {leaveIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {paySlipIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {payrollIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {employeeIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {expenseIcon()}
                </Col>

                <Col xs={24} sm={24} md={8} className="hi">
                  {myProfileIcon()}
                </Col>

                <Col xs={22} sm={15} md={8} className="hi">
                  {companyProfileIcon()}
                </Col>

                <Col xs={22} sm={15} md={8} className="hi">
                  {settingIcon()}
                </Col>
              </Row>
            </Card>
          </Row>
        </>
      ) : null}

      {isHr == "super" ? (
        <>
          <Row>
            <Col xs={8} sm={8} md={8}></Col>
            <Card 
            style={{width:"25%"}}
            >
              <Row gutter={[24, 24]}>

              <Col xs={22} sm={15} md={24} className="hi">
                  {myProfileIcon()}
                </Col>

                <Col xs={22} sm={15} md={24} className="hi">
                  {organizationcon()}
                </Col>

                <Col xs={22} sm={15} md={24} className="hi">
                  {settingIcon()}
                </Col>
               
              </Row>
            </Card>
          </Row>
        </>
      ) : null}

    </div>
  );
}
export default MainDashBoard;
