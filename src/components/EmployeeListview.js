import { Col, Divider, Row, Form } from "antd";
import React from "react";
import hutechlogo from "../images/hutechlogo.png";
import imageavailable from "../images/imageavailable.png";

function EmployeeListview(props) {
  const showRecord = props.showRecord;
  console.log('showRecord', showRecord)
  return (
    <div>


      <Row style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }} gutter={[16, 8]}>
        <Col span={12} xs={22} sm={15} md={8} >
          <div style={{}}>
            <div>
              <h3
                style={{
                  fontWeight: "600",
                  fontSize: "20px",
                  lineheight: "20px",
                }}
              >
                Profile Details
              </h3>
            </div>
            <Divider />
            


            <div className="userM" >
              <Row >
                <Col xs={24} sm={24} md={24}>
                  <Form.Item style={{ marginBottom: '0px' }} label="First Name:">
                    <span>{showRecord.fname}</span>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item style={{ marginBottom: '0px' }} label="Middle Name:">
                    <span>{showRecord.mname}</span>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item style={{ marginBottom: '0px' }} label="Last Name:">
                    <span>{showRecord.lname}</span>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item style={{ marginBottom: '0px' }} label="Date Of Joining:">
                    <span>{showRecord.doj}</span>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={24}>
                  <Form.Item style={{ marginBottom: '0px' }} label="Email Id:">
                    <span>{showRecord.mailid}</span>
                  </Form.Item>
                </Col>
              </Row>
            </div>


          </div>
        </Col>

        <Col xs={22} sm={15} md={8}>
          <div>
            <h4
              style={{
                fontWeight: "600",
                fontSize: "20px",
                lineheight: "20px",
              }}
            >
              Employee Image
            </h4>
            <Divider />
            <div
              style={{
                border: "1px solid #d0d0d0",
                Width: "300px",
                height: "auto",
                borderRadius: "6px",
                display: "inline-block",
              }}
            >
              <img
                // src={modalData.logo ? modalData.logo : imageavailable}
                style={{
                  maxWidth: "200px",
                  padding: "10px",
                  height: "70px",
                }}
                alt={"logo not found"}
              />
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 8]} style={{ marginTop: "25px", marginLeft: '65px' }}>
        <div>
          <h2
            style={{
              fontWeight: "600",
              fontSize: "20px",
              lineheight: "20px",
            }}
          >
            Personal Details
          </h2>
          <Divider style={{ width: '30%', minWidth: '30%' }} />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "17px",
            }}
          >
            <Row >
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Designation:">
                  <span>{showRecord.designation}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Gender:">
                  <span>{showRecord.gender}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Personal Email: ">
                  <span>{showRecord.contactEmail}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Contact No.:">
                  <span>{showRecord.phonenumber}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Reporting Manager: ">
                  <span>{showRecord.repManager}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Secondary Manager: ">
                  <span>{showRecord.secManager}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Lead:">
                  <span>{showRecord.isLead}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Department: ">
                  <span>{showRecord.department}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Manager:  ">
                  <span>{showRecord.isManager}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Work Location: ">
                  <span>{showRecord.location}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Earn Leave: ">
                  <span>{showRecord.earnLeave}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Sick Leave: ">
                  <span>{showRecord.sickLeave}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Casual Leave: ">
                  <span>{showRecord.casualLeave}</span>
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24}>
                <Form.Item style={{ marginBottom: '0px' }} label="Optional Leave: ">
                  <span>{showRecord.optionalLeave}</span>
                </Form.Item>
              </Col>
            </Row>

          </div>
        </div>
      </Row>
    </div>
  );
}

export default EmployeeListview;
