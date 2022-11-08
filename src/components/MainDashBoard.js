import React from 'react'
import { 
  Card,
  Col, 
  Row, 
 } from "antd";
import "../style/MainDashBoard.css";
import Attendancelog from "../images/Attendancelog.png"
import leaveicon from "../images/leave-icon.png"
import Payslip from "../images/Payslip.png"
import Payroll from "../images/Payroll.png"
import Employeelist from "../images/Employeelist.png"
import Expenses from "../images/Expenses.png"
import Myprofile from "../images/Myprofile.png"
import Companyprofile from "../images/Companyprofile.png"
import Settings from "../images/Settings.png"
import { Link } from 'react-router-dom';
function MainDashBoard() {
  const isHr = sessionStorage.getItem("role");
  return (
    <div className='icon-container'>
      <Card>
        <Row gutter={[8,24]}>
          <Col span={8} className="hi">
            <Link to="/Attendance/AttendanceLog">
              <Card 
                bordered={false}
                hoverable={true}
                style={{fontWeight:"600"}}
              >
                <img 
                style={{width:"70px"}}
                    alt="example"
                    src={Attendancelog}
              />
              Attendance Log
              </Card>
            </Link>
          </Col>
          <Col span={8} className="hi">
            <Link to="/Employee/Leave">
            <Card 
                bordered={false}
                hoverable={true}
                style={{fontWeight:"600"}}
              >
                <img
                    style={{width:"70px"}}
                    alt="example"
                    src={leaveicon}
              />
                Leave
              </Card>
            </Link>
          </Col>
          { isHr == "hr" ? (
            <Col span={8} className="hi">
            <Link to="/PaySlipPage/PaySlip">
              <Card 
                bordered={false}
                hoverable={true}
                style={{fontWeight:"600"}}
              >
                <img
                  style={{width:"70px"}}
                  alt="example"
                  src={Payslip}
                />
                Pay Slip Generator
              </Card>
            </Link>            
            </Col>
          ) : null}
          <Col span={8} className="hi">
            <Link to="/Payslip2/HrPaySlip">
          <Card
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                  style={{width:"70px"}} 
                  alt="example"
                  src={Payroll}
             />
              Payroll
            </Card>
            </Link>
          </Col>
          { isHr == "hr" ? (
            <>
          <Col span={8} className="hi">
            <Link to="/EmployeeListPage/EmployeeList">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                  style={{width:"70px"}}
                  alt="example"
                  src={Employeelist}
             />
              Employee List
            </Card>
            </Link>
          </Col>
          <Col span={8} className="hi">
            <Link to="/Expense/ExpenseList">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                  style={{width:"70px"}}
                  alt="example"
                  src={Expenses}
             />
              Expense
            </Card>
            </Link>
          </Col>
          </>
          ) :null}
          <Col span={8} className="hi">
            <Link to="/Profile">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                   style={{width:"70px"}}
                  alt="example"
                  src={Myprofile}
             />
              My Profile
            </Card>
            </Link>
          </Col>
          {/* <Col span={8} className="hi">
            <Link to="/Appraisal">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                   style={{width:"70px"}}
                  alt="example"
                  src={Appraisal}
             />
              Appraisal
            </Card>
            </Link>
          </Col> */}
          { isHr == "hr" ? (
            <Col span={8} className="hi">
            <Link to="/CompanyProfilepage">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                  style={{width:"70px"}}
                  alt="example"
                  src={Companyprofile}
             />
              Company Profile
            </Card>
            </Link>
          </Col>
          ) : null}
          <Col span={8} className="hi">
            <Link to="/Setting">
          <Card 
              bordered={false}
              hoverable={true}
              style={{fontWeight:"600"}}
            >
              <img
                  style={{width:"70px"}}
                  alt="example"
                  src={Settings}
             />
              Setting
            </Card>
            </Link>
          </Col>
        </Row>
      </Card>
    </div>
  )
}
export default MainDashBoard