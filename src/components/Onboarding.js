import React, { useState, useRef } from "react";
import {
  Form,
  Tabs,
  Input,
  Col,
  Row,
  Divider,
  message,
  Upload,
  Button,
  Space,
  Card,
  Table,
  Tag,
  Modal,
} from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import reload from "../images/reload.png";
import ViewModal from "./ViewModal";
import EditOnboarding from "./EditOnboarding";

function Onboarding() {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [accessList, setAccessList] = useState([]);
  const [addAccess, setAddAccess] = useState(false);
  const [fileName, setFileName] = useState("");
  const [isFileSizeInvalid, setIsFileSizeInvalid] = useState(false);
  const imgRef = React.useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditOrganization, setIsEditOrganization] = useState(false);

  const handleClick = (event) => {
    console.log("imgRef:: ", imgRef);
    imgRef.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFileName(fileUploaded.name);
    checkFileSize(fileUploaded.size);
  };

  function checkFileSize(size) {
    if (Math.round(size / 1024) <= 200) {
      setIsFileSizeInvalid(false);
    } else {
      setIsFileSizeInvalid(true);
    }
  }

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const showModal = (record) => {
    // setmodaldata(record);
    setIsModalVisible(true);
  };

  const showOnboarding = (record) => {
    setIsEditOrganization(true);
  };

  const cancelOnboarding = () => {
    setIsEditOrganization(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);

    // submit form data
  };

  function onDelete(delItem) {
    console.log(delItem);
    const filteredData = accessList.filter(
      (item) => item.emailaddress !== delItem.emailaddress
    );
    setAccessList(filteredData);
  }

  function addUseRole(values) {
    setAccessList([...accessList, values]);
    form2.resetFields();
    setAddAccess(false);
    // setAccessList([...accessList, newAccess]);
    // setNewAccess({ userole: "", name: "", emailaddress: "", phone: "" });
  }
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: 120,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: 250,
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: 140,

      // responsive: ["md"],

      render: (_, { status }) => getStatusUi(status),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 180,
      align: "center",

      render: (_, record) => {
        return (
          <>
            <Button
              disabled={record?.disabled}
              style={{ width: "40px", marginRight: "10px" }}
              onClick={() => {
                showModal(record);
              }}
            >
              <EyeFilled
                disabled={record?.disabled}
                style={
                  record?.disabled
                    ? { color: "rgb(154 201 244)", marginLeft: "-2px" }
                    : { color: "#268FEE", marginLeft: "-2px" }
                }
              />
            </Button>
            <Button
              disabled={record?.disabled}
              style={
                record?.disabled
                  ? { width: "40px", marginRight: "10px" }
                  : { width: "40px", marginRight: "10px" }
              }
              onClick={() => {
                showOnboarding(record);
              }}
            >
              <EditFilled
                disabled={record?.disabled}
                style={
                  record?.disabled
                    ? { color: "rgb(154 201 244)", marginLeft: "-2px" }
                    : { color: "#268FEE", marginLeft: "-2px" }
                }
              />
            </Button>
            <Button
              disabled={record?.disabled}
              style={record?.disabled ? { width: "40px" } : { width: "40px" }}
            >
              {record?.disabled ? (
                <CheckCircleFilled
                  disabled={record?.disabled}
                  style={
                    record?.disabled
                      ? { color: "#268FEE", marginLeft: "-2px" }
                      : { color: "#268FEE", marginLeft: "-2px" }
                  }
                />
              ) : (
                <StopFilled
                  disabled={record?.disabled}
                  style={
                    record?.disabled
                      ? { color: "#268FEE", marginLeft: "-2px" }
                      : { color: "#268FEE", marginLeft: "-2px" }
                  }
                />
              )}
            </Button>
          </>
        );
      },
    },
  ];
  function getStatusUi(status) {
    switch (status) {
      case "Activated":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <CheckCircleFilled
                style={{ color: "#1fca1f", marginRight: "6px" }}
              />
            </div>
            {status}
          </div>
        );
      case "Pending":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <ClockCircleFilled
                style={{ color: "orange", marginRight: "6px" }}
              />
            </div>
            {status},
          </div>
        );
      case "Deactivated":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <StopFilled
                style={{ color: "rgb(129 212 236)", marginRight: "6px" }}
              />
            </div>
            {status}
          </div>
        );
      case "Reactivate":
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <img
                src={reload}
                style={{ color: "#1fca1f", marginRight: "6px" }}
              />
            </div>
            {status}
          </div>
        );
      default:
        return null;
    }
  }
  const dummyData = [
    {
      key: "1",
      name: "Hutech Solutions pvt ltd",
      code: "HS0000123",
      address: "HSR BDA Comples",
      status: "Activated",
    },
    {
      key: "2",
      name: "Blueelement Pvt Ltd",
      code: "HS0000124",
      address: "HSR BDA Comples",
      status: "Pending",
    },
    {
      key: "3",
      name: "Blueelement Pvt Ltd",
      code: "HS0000124",
      address: "HSR BDA Comples",
      status: "Deactivated",
      disabled: true,
    },
    {
      key: "4",
      name: "Blueelement Pvt Ltd",
      code: "HS0000124",
      address: "HSR BDA Comples",
      status: "Reactivate",
    },
  ];
  function onReset() {
    form.resetFields();
  }

  return (
    <div className="main">
      <Tabs
        defaultActiveKey="1"
        className="mainTabs"
        // onChange={onChange}
      >
        <Tabs.TabPane tab="Organization Onboarding" key="1">
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <div style={{ margin: "13px", background: "#fff" }}>
              <div
                style={{
                  paddingTop: "13px",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19px",
                }}
              >
                ORGANIZATION DETAILS
              </div>
              <Divider />
              <Form
                className="details"
                style={{ margin: "30px" }}
                form={form}
                layout="vertical"
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
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="orgcode"
                      label="Organization Code"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event) && checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Organization Code",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Code",
                        },
                      ]}
                    >
                      <Input
                        maxLength={15}
                        placeholder="Organization Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="orgname"
                      label="Organization Name"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Organization Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={20}
                        placeholder="Organization Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="cinnumber"
                      label="CIN Number"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event) && checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter CIN Number",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={21}
                        placeholder="CIN Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="gstnumber"
                      label="GST Number"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event) && checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter GST Number",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={22}
                        placeholder="GST Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="domname"
                      label="Domain Name"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Domain Name",
                        },
                        {
                          pattern:
                            "/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                          message: "Please Enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={25}
                        placeholder="Domain Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="address1"
                      label="Address Line1"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Company Address",
                        },
                        {
                          pattern: /^[0-9a-zA-Z.,]+$/,

                          message: "Please Enter Valid Address",
                        },
                      ]}
                    >
                      <Input
                        maxLength={50}
                        placeholder="Address Line1"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="address2"
                      label="Address Line2"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Company Address",
                        },
                        {
                          pattern: /^[0-9a-zA-Z.,]+$/,

                          message: "Please Enter Valid Address",
                        },
                      ]}
                    >
                      <Input
                        maxLength={50}
                        placeholder="Address Line2"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Phone Number",
                        },
                        {
                          pattern: /^[6-9]\d{9}$/,
                          message: "Please Enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="Phone"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please Enter City Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="City"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter State",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="State"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={15} md={4}>
                    <Form.Item
                      name="pincode"
                      label="Pin Code"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Pin Code",
                        },
                        {
                          pattern: /^[0-9\b]+$/,
                          message: "Please Enter Valid Code",
                        },
                      ]}
                    >
                      <Input
                        maxLength={6}
                        placeholder="Pin Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={4}>
                    <Form.Item
                      name="country"
                      label="Country"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Country Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="Country"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={8}>
                    <Form.Item name="file" className="uploadLogo">
                      <div
                        style={{
                          border: "dashed #B9B9B9",
                          borderWidth: "thin",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button
                          onClick={handleClick}
                          style={{
                            width: " 60px",
                            height: "60px",
                            margin: "10px",
                          }}
                        >
                          <PlusCircleOutlined
                            style={{
                              display: "flex",
                              flexDirection: "column-reverse",
                              alignItems: "center",
                            }}
                          />
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            Upload
                          </span>
                        </Button>
                        {isFileSizeInvalid ? "" : fileName}
                        {isFileSizeInvalid
                          ? message.error("File size must be less than 200Kb.")
                          : ""}
                        <input
                          style={{
                            height: "72px",
                            marginTop: "11px",
                            display: "none",
                          }}
                          type="file"
                          // accept="image/gif, image/jpeg, image/png"
                          id="myfile"
                          name="file"
                          ref={imgRef}
                          onChange={handleChange}
                        />
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "13px",
                            lineHeight: "19px",
                            marginLeft: "10px",
                          }}
                        >
                          Upload logo. Use the 200 kb size image. PNG or JPEG
                          file format accepted
                        </p>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            <Divider />
            <Card
              style={{
                margin: "56px",
                padding: "10px",
                background: "#f8f8f8",
                // height: "auto",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                Organization Access
              </div>
              <Divider />
              <Form
                className="form"
                style={{ margin: "30px" }}
                form={form2}
                layout="vertical"
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
                onFinish={addUseRole}
              >
                {accessList.map((u, i) => (
                  <div style={{ marginTop: "10px" }} className="inputLabel">
                    <Row gutter={[24, 20]}>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Use Role
                        </label>
                        <Input value={u.userole}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Name
                        </label>
                        <Input value={u.name}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Email Address
                        </label>
                        <Input value={u.emailaddress}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Phone Number
                        </label>

                        <Input value={u.phone}></Input>
                        <Button
                          style={{
                            background: "#f8f8f8",
                            border: "none",
                            color: "#095AA4",
                            position: "absolute",
                            width: "10px",
                          }}
                          onClick={() => {
                            onDelete(u);
                          }}
                        >
                          <CloseCircleOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                {addAccess ? (
                  <div style={{ marginRight: "60px", marginTop: "15px" }}>
                    <Row gutter={[20, 8]} className="addUserForm">
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="userole"
                          label="Use Role"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Role",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Role",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            placeholder="Use Role"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="name"
                          label="Name"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please Enter Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please Enter Valid Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={20}
                            placeholder="Name"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="emailaddress"
                          label="Email Address"
                          rules={[
                            {
                              type: "email",
                              required: true,
                              message: "Enter Email address",
                              pattern:
                                "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            placeholder="Email Address"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="phone"
                          label="Phone Number"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Phone Number",
                            },
                            {
                              pattern: /^[6-9]\d{9}$/,
                              message: "Please Enter Valid Number",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            placeholder="Phone Number"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <Button
                  style={{
                    border: "none",
                    // marginLeft: "49rem",
                    background: "#f8f8f8",
                    color: "#095AA4",
                    fontWeight: "600",
                    fontSize: "13px",
                    lineHeight: "14.4px",
                    float: "right",
                  }}
                  htmlType={addAccess ? "submit" : "button"}
                  onClick={() => {
                    if (!addAccess) {
                      setAddAccess(true);
                    }
                  }}
                >
                  <PlusCircleOutlined /> Add User
                </Button>
              </Form>
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "94px",
              }}
            >
              <Space>
                <Form.Item>
                  <Button
                    style={{
                      border: "1px solid #1565D8",
                      color: "#1565D8",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      width: "99px",
                    }}
                    onClick={onReset}
                  >
                    CANCEL
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      border: "1px solid #1565D8",
                      background: "#1565D8",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      width: "99px",
                    }}
                    htmlType="submit"
                  >
                    SAVE
                  </Button>
                </Form.Item>
              </Space>
            </div>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="View All Organization" key="2">
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <div style={{ background: "#fff" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19px",
                }}
              >
                Organization Details
              </div>
              <Divider />

              <Table
                className="tableTab"
                columns={columns}
                dataSource={dummyData}
                size="middle"
                rowClassName={(record) => record.disabled && "disabled-row"}
              />
              <Modal
                style={{ width: "800px" }}
                className="viewModal"
                centered
                visible={isModalVisible}
                footer={null}
                title="ORGANIZATION DETAILS"
                closeIcon={
                  <div
                    onClick={() => {
                      setIsModalVisible(false);
                    }}
                    style={{ color: "#ffffff" }}
                  >
                    X
                  </div>
                }
              >
                <ViewModal setIsModalVisible={setIsModalVisible} />
              </Modal>
              <Modal
                style={{ width: "840px" }}
                className="viewModal"
                // centered
                visible={isEditOrganization}
                footer={null}
                title="ORGANIZATION DETAILS"
                closeIcon={
                  <div
                    onClick={() => {
                      setIsEditOrganization(false);
                    }}
                    style={{ color: "#ffffff" }}
                  >
                    X
                  </div>
                }
              >
                <EditOnboarding setIsEditOrganization={setIsEditOrganization} />
              </Modal>
            </div>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default Onboarding;
