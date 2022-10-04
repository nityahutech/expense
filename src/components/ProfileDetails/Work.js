import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, DatePicker, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";



const { Option } = Select;
function Work() {
  const [editWork, setEditWork] = useState(false);
  const{currentUser}=useAuth()
  const [data, setData] = useState([]);
  const [designation, setDesignation] = useState("");
  const [doj, setDoj] = useState("");
  const [department, setDepartment] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [empType, setEmpType] = useState("");


  useEffect(() => {
    getData();
  }, [])
  
  const getData=async()=>{
    let data=await EmpInfoContext.getEduDetails(currentUser.uid)
    console.log(data)
    //setData(data)
    setDesignation(data.designation?data.designation:null)
    setDoj(data.doj?data.doj:null)
    setWorkLocation(data.workLocation?data.workLocation:null)
    setDepartment(data.department?data.department:null)
    setEmpType(data.empType?data.empType:null)

    // setScrs(data.scrs?data.scrs:null)
  }
  console.log(data)
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
        <Form
          // form={form}
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          // onFinish={onFinish}
        >
          <Card
            title="WORK DETAILS"
            // extra={
            //   <>
            //     {editWork === false ? (
            //       <Button
            //         type="text"
            //         style={{ color: "#4ec0f1" }}
            //         onClick={() => setEditWork(!editWork)}
            //       >
            //         Edit
            //       </Button>
            //     ) : null}
            //   </>
            // }
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
                  <div>{designation}</div>
                ) : (
                  <Form.Item
                    // initialValue={data ? data.bloodGroup : null}
                    name="designation"
                    rules={[
                      {
                        required: true,
                        // message: "Please Choose Blood Groop",
                      },
                    ]}
                  >
                    <Select
                      // disabled={true}
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
                  </Form.Item>
                )}
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Date of Joining
                </div>
                {editWork === false ? (
                  <div>{doj}</div>
                ) : (
                  <Form.Item
                    // initialValue={dob}
                    name="doj"
                    rules={[
                      {
                        required: true,
                        message: "Please Choose a Date",
                      },
                    ]}
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      // format={dateFormatList}
                      //         onChange={(e) => {
                      //           setDob(e.format("DD-MM-YYYY"));
                      //           console.log(e.format("DD-MM-YYYY"));
                      //         }}
                      //  disabledDate={disabledDate}
                      // value={dob}
                      placeholder="Choose Date"
                    />
                  </Form.Item>
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
                {editWork === false ? (<div>{empType}</div>)
                : (<Form.Item
                // initialValue={data ? data.bloodGroup : null}
                name="empType"
                rules={[
                  {
                    required: true,
                    // message: "Please Choose Blood Groop",
                  },
                ]}
              >
              <Select
                style={{ width: "100%" }}
                placeholder="Your Work Location"
              >
                <Option value="ptime">Part-Time</Option>
                <Option value="ftime">Full-Time</Option>
              </Select></Form.Item>)}
                
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Work Location
                </div>
                {editWork === false ? (
                  <div>{workLocation}</div>
                ) : (
                  <Form.Item
                    // initialValue={data ? data.bloodGroup : null}
                    name="workLocation"
                    rules={[
                      {
                        required: true,
                        // message: "Please Choose Blood Groop",
                      },
                    ]}
                  >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Your Work Location"
                  >
                    <Option value="regOfc">Registered Office</Option>
                    <Option value="homeOfc">Home Office</Option>
                  </Select></Form.Item>
                )}
              </Col>
              <Col span={12}>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Department
                </div>
                {editWork === false ? (
                  <div>{department}</div>
                ) : (
                  <Form.Item
                    // initialValue={data ? data.bloodGroup : null}
                    name="department"
                    rules={[
                      {
                        required: true,
                        // message: "Please Choose Blood Groop",
                      },
                    ]}
                  >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="Choose Department"
                  >
                    <Option value="cs">Consulting Service</Option>
                    <Option value="hr">Human Resource</Option>
                    <Option value="Finance">Finance</Option>
                  </Select></Form.Item>
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
        </Form>
      </div>
    </>
  );
}

export default Work;
