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
import Companyprofile from "../images/Companyprofile.png";
import Settings from "../images/Settings.png";
import { Link } from "react-router-dom";

function MainDashBoard() {
  return (
    <div className="icon-container">
      <Card>
        <Row gutter={[8, 24]}>
          <Col span={8} className="hi">
            <Link>
              <Card bordered={false} hoverable={true}>
                <img
                  style={{ width: "150px" }}
                  alt="example"
                  src={Attendancelog}
                />
                Attendance Log
              </Card>
            </Link>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={leaveicon} />
              Leave
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={Payslip} />
              Pay Slip Generator
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={Payroll} />
              Payroll
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img
                style={{ width: "150px" }}
                alt="example"
                src={Employeelist}
              />
              Employee List
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={Expenses} />
              Expense
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={Myprofile} />
              My Profile
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img
                style={{ width: "150px" }}
                alt="example"
                src={Companyprofile}
              />
              Company Profile
            </Card>
          </Col>
          <Col span={8} className="hi">
            <Card bordered={false} hoverable={true}>
              <img style={{ width: "150px" }} alt="example" src={Settings} />
              Setting
            </Card>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default MainDashBoard;
