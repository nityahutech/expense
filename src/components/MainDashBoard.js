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
import Organization from "../images/organizationLogoNew.png";
import { Link } from "react-router-dom";
function MainDashBoard() {
  const role = sessionStorage.getItem("role");
  const isHr = JSON.parse(sessionStorage.getItem("isHr"));
  console.log(role, isHr)

  const organizationcon = () => {
    return (
      <Link to="/Organization/Onboarding">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Organization</span>
          </Card>
        </div>
      </Link>
    );
  };

  const attendanceIcon = () => {
    return (
      <Link to="/Attendance">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={true}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Attendance</span>
          </Card>
        </div>
      </Link>
    );
  };

  const leaveIcon = () => {
    return (
      <Link to="/Leave">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={true}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Leave</span>
          </Card>
        </div>
      </Link>
    );
  };

  const paySlipIcon = () => {
    return (
      // <Link to="/PaySlipPage/PaySlip">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          bordered={false}
          hoverable={true}
          style={{
            fontWeight: "600",
            fontSize: "20px",
            letterSpacing: "1px",
            borderRadius: "15px",
            width: "250px",
            padding: "10px",
          }}
        >
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
          <span style={{ paddingTop: "10px" }}>Appraisal</span>
        </Card>
      </div>
      // </Link>
    );
  };

  const payrollIcon = () => {
    return (
      // <Link to="/Employee/Payroll">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          bordered={false}
          hoverable={true}
          style={{
            fontWeight: "600",
            fontSize: "20px",
            letterSpacing: "1px",
            borderRadius: "15px",
            width: "250px",
            padding: "10px",
          }}
        >
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
          <span style={{ paddingTop: "10px" }}>Payroll Generator</span>
        </Card>
      </div>
      // </Link>
    );
  };
  const employeeIcon = () => {
    return (
      <Link to="/Employee/EmployeeList">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Employee List</span>
          </Card>
        </div>
      </Link>
    );
  };

  const expenseIcon = () => {
    return (
      <Link to="/Expense/ExpenseList">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Expense</span>
          </Card>
        </div>
      </Link>
    );
  };

  const myProfileIcon = () => {
    return (
      <Link to="/Profile">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>My Profile</span>
          </Card>
        </div>
      </Link>
    );
  };

  const companyProfileIcon = () => {
    return (
      <Link to="/CompanyProfile">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Company Profile</span>
          </Card>
        </div>
      </Link>
    );
  };

  const settingIcon = () => {
    return (
      <Link to="/Settings">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card
            bordered={false}
            hoverable={true}
            style={{
              fontWeight: "600",
              fontSize: "20px",
              letterSpacing: "1px",
              borderRadius: "15px",
              width: "250px",
              padding: "10px",
            }}
          >
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
            <span style={{ paddingTop: "10px" }}>Setting</span>
          </Card>
        </div>
      </Link>
    );
  };

  return (
    <div className="icon-container">
      {role == "emp" &&  !isHr ? (
        <>
          
              <Row gutter={[24, 24]}>
                <Col xs={22} sm={15} md={6} className="hi">
                  {attendanceIcon()}
                </Col>

                <Col xs={22} sm={15} md={6} className="hi">
                  {leaveIcon()}
                </Col>

                <Col xs={22} sm={15} md={6} className="hi">
                  {myProfileIcon()}
                </Col>

                <Col xs={22} sm={15} md={6} className="hi">
                  {settingIcon()}
                </Col>
              </Row>
        </>
      ) : null}

      {role == "admin" || isHr ? (
        <>
          <Row gutter={[24, 48]}>
            <Col xs={24} sm={24} md={6} className="hi">
              {attendanceIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {leaveIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {paySlipIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {payrollIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {employeeIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {expenseIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {myProfileIcon()}
            </Col>

            <Col xs={24} sm={24} md={6} className="hi">
              {companyProfileIcon()}
            </Col>

            {/* <Col xs={22} sm={15} md={6} className="hi">
              {settingIcon()}
            </Col> */}
          </Row>
        </>
      ) : null}

      {role == "super" ? (
        <>
          <Row gutter={[24, 24]}>
            <Col xs={22} sm={15} md={8} className="hi">
              {myProfileIcon()}
            </Col>

            <Col xs={22} sm={15} md={8} className="hi">
              {organizationcon()}
            </Col>

            <Col xs={22} sm={15} md={8} className="hi">
              {settingIcon()}
            </Col>
          </Row>
        </>
      ) : null}
    </div>
  );
}
export default MainDashBoard;
