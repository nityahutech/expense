import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";

import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;

function Address() {
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [dob, setDob] = useState("");
  const [scrs, setScrs] = useState("");
  const [lccs, setLccs] = useState("");
  // const [houseType, setHouseType] = useState("");
  // const [currentAdd, setCurrentAdd] = useState("");
  // const [permanentAdd, setPermanentAdd] = useState("");
  // const [contactEmail, setContactEmail] = useState("");
  // const [phonenumber, setPhoneNumber] = useState("");
  // const [mailid, setMailId] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  // const [cancelEditContent, setcancelEditContent] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  // useEffect(() => {
  //   getData();
  // }, [])
  // const getData = async () => {
  //   let data = await EmpInfoContext.getEduDetails(currentUser.uid)
  //   //setData(data)
  //   setDesignation(data.designation ? data.designation : null)
  //   setDoj(data.doj ? data.doj : null)
  //   setWorkLocation(data.workLocation ? data.workLocation : null)
  //   setDepartment(data.department ? data.department : null)
  //   setEmpType(data.empType ? data.empType : null)
  //   // setScrs(data.scrs?data.scrs:null)
  // }
  return (
    <>
      <div
        className="personalCardDiv"
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
        // onFinish={onContactFinish}
        >
          <Card
            title=" Registered Company Name"
            extra={
              <>
                {editContactInfo === false ? (
                  <Button
                    type="text"
                    style={{ color: "#4ec0f1" }}
                    onClick={() => showEditContactInfo(!editContactInfo)}
                  >
                    <EditFilled />
                  </Button>
                ) : null}
              </>
            }
            style={{
              width: 800,
              marginTop: 10,
            }}
          >
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Address Line 1
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="Address1"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Address",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Address ",
                    //   },
                    // ]}
                    >
                      <Input type='AddressName' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={24}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Address Line 2
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="mailid"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Website Name",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Website Name",
                    //   },
                    // ]}
                    >
                      <Input type='AddressName2' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={6}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    City
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item style={{ width: '100%' }}
                      initialValue={data ? data.mailid : null}
                      name="City"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Website Name",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Website Name",
                    //   },
                    // ]}
                    >
                      <Input type='City' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    State
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item style={{ width: '100%' }}
                      initialValue={data ? data.mailid : null}
                      name="State"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Website Name",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Website Name",
                    //   },
                    // ]}
                    >
                      <Input type='State' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Country
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="Country"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Website Name",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Website Name",
                    //   },
                    // ]}
                    >
                      <Input type='Country' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={6}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Pin Code
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="Pin"
                    // rules={[
                    //   {
                    //     required: true,
                    //     message: "Please enter Website Name",
                    //     type: "email",
                    //   },
                    //   {
                    //     message: "Please enter Valid Website Name",
                    //   },
                    // ]}
                    >
                      <Input type='Pin' required placeholder="" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>

            </Row>

            {editContactInfo === true ? (
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "3%",
                }}
              >
                <Button
                  type="text"
                  style={{ fontSize: 15 }}
                  onClick={() => showEditContactInfo(false)}
                >
                  <CloseOutlined /> CANCEL
                </Button>
                <Col>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ marginLeft: "10px" }}
                  >
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
export default Address;
