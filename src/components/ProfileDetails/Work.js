import React, { useState } from "react";
import { Card, Row, Col, Button, Select, DatePicker } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const { Option } = Select;
function Work() {
  const [editWork, setEditWork] = useState(false);
  return (
    <>
      <div
        className="workCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          title="WORK DETAILS"
          extra={
            <>
              {editWork === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => setEditWork(!editWork)}
                >
                  Edit
                </Button>
              ) : null}
            </>
          }
          style={{
            width: 800,
            margin: 20,
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Designation
              </div>
              {editWork === false ? (
                <div>Jr. Software Developer</div>
              ) : (
                <Select
                  placeholder="Select a Designation"
                  style={{ width: "100%" }}
                >
                  <Option value="intrn">Internship</Option>
                  <Option value="st">Software Trainee</Option>
                  <Option value="asd">Asst. Software Developer</Option>
                  <Option value="ssd">Sr. Software Developer</Option>
                  <Option value="jsd">Jr. Software Developer</Option>
                  <Option value="ba">Business Analyst(BA)</Option>
                  <Option value="qa">Quality Analyst(QA)</Option>
                  <Option value="hr">Human Resource(HR)</Option>
                  <Option value="mgr">Manager</Option>
                  <Option value="dr">Director</Option>
                  <Option value="ceo">Chief Executive Officer(CEO)</Option>
                </Select>
              )}
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Date of Joining
              </div>
              {editWork === false ? (
                <div>01-06-2022</div>
              ) : (
                <DatePicker style={{ width: "100%" }} />
              )}
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Probation Period
              </div>
              <div>90</div>
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Employee Type
              </div>
              <div>Full-Time</div>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Work Location
              </div>
              {editWork === false ? (
                <div>Registered Office</div>
              ) : (
                <Select
                  style={{ width: "100%" }}
                  placeholder="Your Work Location"
                >
                  <Option value="regOfc">Registered Office</Option>
                  <Option value="homeOfc">Home Office</Option>
                </Select>
              )}
            </Col>
            <Col span={12}>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Department
              </div>
              {editWork === false ? (
                <div>Consulting Service</div>
              ) : (
                <Select
                  style={{ width: "100%" }}
                  placeholder="Choose Department"
                >
                  <Option value="cs">Consulting Service</Option>
                  <Option value="hr">Human Resource</Option>
                  <Option value="Finance">Finance</Option>
                </Select>
              )}
            </Col>
          </Row>
          {editWork === true ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
              <Button
                onClick={() => setEditWork(false)}
                type="text"
                style={{ fontSize: 15 }}
              >
                <CloseOutlined /> CANCEL
              </Button>
              <Col>
                <Button type="primary" style={{ marginLeft: "10px" }}>
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Card>
      </div>
    </>
  );
}

export default Work;
