import React, { useState } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

function Personal() {
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  // const [cancelEditContent, setcancelEditContent] = useState(false);

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
          // onFinish={onFinish}
        >
          <Card
            title="PERSONAL INFO"
            //   actions={[
            //   <EditOutlined key="edit" />,
            // ]}
            extra={
              <>
                {editContent === false ? (
                  <Button
                    type="text"
                    style={{ color: "#4ec0f1" }}
                    onClick={() => showEditContent(!editContent)}
                  >
                    Edit
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
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Name
                  </div>
                  {editContent === false ? (
                    <div>Nitya priya sahu</div>
                  ) : (
                    <Form.Item
                      name="name"
                      rules={[
                        {
                          required: true,
                          minLength: 3,
                          maxLength: 20,
                          message: "Please enter First Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        required
                        placeholder="Enter Your Name"
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Date of Birth
                  </div>
                  {editContent === false ? (
                    <div>14/02/2014</div>
                  ) : (
                    <Form.Item
                      name="dateOfBirth"
                      rules={[
                        {
                          required: true,
                          message: "Please Choose a Date",
                        },
                      ]}
                    >
                      {/* format={dateFormatList} */}
                      <DatePicker
                        style={{ width: "100%" }}
                        //  disabledDate={disabledDate}
                        placeholder="Choose Date"
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Gender
                  </div>
                  {editContent === false ? (
                    <div>Male</div>
                  ) : (
                    <Form.Item
                      name="gender"
                      rules={[
                        {
                          required: true,
                          message: "Please Choose Gender",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Gender"
                        style={{ width: "100%" }}
                      >
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Blood Group
                  </div>
                  {editContent === false ? (
                    <div>O+</div>
                  ) : (
                    <Form.Item
                      name="bloodGroup"
                      rules={[
                        {
                          required: true,
                          message: "Please Choose Blood Groop",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Blood Group"
                        style={{ width: "100%" }}
                      >
                        <Option value="ap">A+</Option>
                        <Option value="an">A-</Option>
                        <Option value="op">O+</Option>
                        <Option value="on">O-</Option>
                        <Option value="bp">B+</Option>
                        <Option value="bn">B-</Option>
                        <Option value="abp">AB+</Option>
                        <Option value="abn">AB-</Option>
                      </Select>
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Marital Status
                  </div>
                  {editContent === false ? (
                    <div>Single</div>
                  ) : (
                    <Form.Item
                      name="maritalStatus"
                      rules={[
                        {
                          required: true,
                          message: "Your Marrige Status",
                        },
                      ]}
                    >
                      <Select style={{ width: "100%" }}>
                        <Option value="single">Single</Option>
                        <Option value="married">Married</Option>
                      </Select>
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>
            {editContent === true ? (
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "3%",
                }}
              >
                <Button
                  onClick={() => showEditContent(false)}
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
          // onFinish={onFinish}
        >
          <Card
            title="CONTACT INFO"
            //   actions={[
            //   <EditOutlined key="edit" />,
            // ]}
            extra={
              <>
                {editContactInfo === false ? (
                  <Button
                    type="text"
                    style={{ color: "#4ec0f1" }}
                    onClick={() => showEditContactInfo(!editContactInfo)}
                  >
                    Edit
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Official Email ID
                  </div>
                  {editContactInfo === false ? (
                    <div>nityapriya.sahu@hutechsolutions.com</div>
                  ) : (
                    <Form.Item
                      name="officialEmailId"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Email Id",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Email",
                        },
                      ]}
                    >
                      <Input required placeholder="Enter Email Address" />
                    </Form.Item>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Personal Email ID
                  </div>
                  {editContactInfo === false ? (
                    <div>nityapriya.sahu@gmail.com</div>
                  ) : (
                    <Form.Item
                      name="personalEmailId"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Email Id",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Email",
                        },
                      ]}
                    >
                      <Input required placeholder="Enter Email Address" />
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Phone Number
                  </div>
                  {editContactInfo === false ? (
                    <div>6363442929</div>
                  ) : (
                    <Form.Item
                      className="numder-inputs"
                      name="phnNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Phone Number",
                          pattern: /^[0-9\b]+$/,
                        },
                        { whitespace: true },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        required
                        placeholder="Enter Phone Number"
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Alternate Phone Number
                  </div>
                  {editContactInfo === false ? (
                    <div>1234567890</div>
                  ) : (
                    <Form.Item
                      className="numder-inputs"
                      name="alternatePhnNumber"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Phone Number",
                          pattern: /^[0-9\b]+$/,
                        },
                        { whitespace: true },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        required
                        placeholder="Enter Alternate Number"
                      />
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
                  <Button type="primary" style={{ marginLeft: "10px" }}>
                    SAVE
                  </Button>
                </Col>
              </Row>
            ) : null}
          </Card>
        </Form>
      </div>

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
          // onFinish={onFinish}
        >
          <Card
            title="ADDRESSES"
            //   actions={[
            //   <EditOutlined key="edit" />,
            // ]}
            extra={
              <>
                {editAddressInfo === false ? (
                  <Button
                    type="text"
                    style={{ color: "#4ec0f1" }}
                    onClick={() => showEditAddressInfo(!editAddressInfo)}
                  >
                    Edit
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Current Address
                  </div>
                  {editAddressInfo === false ? (
                    <div>xxxxxxxxxxxxxxxxxxxxx</div>
                  ) : (
                    <TextArea
                    name="currentAdd"
                      // value={value}
                      // onChange={e => setValue(e.target.value)}
                      placeholder="Enter Address in Details"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Permanent Address
                  </div>
                  {editAddressInfo === false ? (
                    <div>xxxxxxxxxxxxxxxxxxxxx</div>
                  ) : (
                    <TextArea
                    name="permanentAdd"
                      // value={value}
                      // onChange={e => setValue(e.target.value)}
                      placeholder="Enter Address in Details"
                      autoSize={{ minRows: 3, maxRows: 5 }}
                    />
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    House Type
                  </div>
                  {editAddressInfo === false ? (
                    <div>Owned - with Family</div>
                  ) : (
                    <Input name="houseType"/>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Staying at Current Residence Since
                  </div>
                  {editAddressInfo === false ? (
                    <div>12/02/2000</div>
                  ) : (
                    <DatePicker name="scrs" style={{ width: "100%" }} />
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Living in Current City Since
                  </div>
                  {editAddressInfo === false ? (
                    <div>12/02/2000</div>
                  ) : (
                    <DatePicker name="lcss" style={{ width: "100%" }} />
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
            </Row>
            {editAddressInfo === true ? (
              <Row
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "3%",
                }}
              >
                <Button
                  type="text"
                  onClick={() => showEditAddressInfo(false)}
                  style={{ fontSize: 15 }}
                >
                  <CloseOutlined />
                  CANCEL
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

export default Personal;
