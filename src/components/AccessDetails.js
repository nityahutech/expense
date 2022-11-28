import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useState } from "react";
import { json } from "react-router-dom";
import "../style/Onboarding.css";

function AccessDetails() {
  const [addAccess, setAddAccess] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [editAccess, setEditAccess] = useState(false);
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const dateFormat = "DD-MM-YYYY";

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const checkAlphabet = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkUpperCase = (event) => {
    if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function addUseRole(values) {
    // console.log("accessList::: ", [...accessList]);
    // console.log("accessList::: ", [...accessList, values]);
    setAccessList([...accessList, values]);
    form.resetFields();
    setAddAccess(false);
    // setEditAccess(false);
  }

  //   function editUseRole() {
  //     setEditAccess(false);
  //     form.resetFields();
  //     form.submit();
  //     // setAccessList(false);
  //   }

  function onReset() {
    form.resetFields();
  }

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  function onDelete(delItem) {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "yes",
      okType: "danger",
      onOk: () => {
        const filteredData = accessList.filter(
          (item) => item.empId !== delItem.empId
        );

        showNotification("success", "Success", "Successfully deleted");
        setAccessList(filteredData);
      },
    });

    // CompanyProContext.deleteCompInfo(delItem.id)
    // .then((response) => {
    //            })
  }

  return (
    <>
      {accessList != 0
        ? accessList.map((user, i) => (
            <div>
              <Card
                style={{
                  background: "#FAFAFA",
                  border: "1px solid #EAEAEA",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  margin: " 5rem",
                }}
              >
                <Form
                  colon={true}
                  name="basic"
                  form={form}
                  labelCol={{
                    span: 5,
                    offset: 4,
                  }}
                  wrapperCol={{
                    span: 14,
                    offset: 1,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                  layout="horizontal"
                  //   onFinish={editUseRole}
                >
                  <Row>
                    <Col xs={22} sm={15} md={19}>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "17px",
                          color: "rgba(0,0,0,0.85)",
                        }}
                      >
                        AccessDetails
                      </div>
                    </Col>
                    {editAccess === false ? (
                      <Col xs={22} sm={15} md={3}>
                        <Button
                          style={{
                            marginLeft: "40px",
                            background: "#EEEEEE",
                            borderRadius: "10px",
                            width: "34px",
                          }}
                          onClick={() => {
                            // let array = [...editAccess];
                            // array[i] = !array[i];
                            setEditAccess(true);
                          }}
                        >
                          <EditFilled
                            style={{
                              position: "relative",
                              right: "5px",
                              color: "#007ACB",
                              // display: "flex",
                            }}
                          />
                        </Button>
                      </Col>
                    ) : null}
                    {editAccess === false ? (
                      <Col xs={22} sm={15} md={2}>
                        <Button
                          style={{
                            //   marginRight: "10px",
                            background: "#EEEEEE",
                            borderRadius: "10px",
                            width: "34px",
                          }}
                          onClick={() => {
                            onDelete(user);
                          }}
                        >
                          <DeleteFilled
                            style={{
                              position: "relative",
                              right: "6px",
                              color: "#007ACB",
                              // display: "flex",
                            }}
                          />
                        </Button>
                      </Col>
                    ) : null}
                    {editAccess ? (
                      <>
                        <Divider />
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#444444",
                            marginLeft: "14px",
                          }}
                        >
                          User Details
                        </div>
                        <Divider
                          style={{
                            borderTop: "1px dashed #8C8C8C",
                            margin: "12px",
                          }}
                        />
                        <div
                          className="userDetails"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "25px",
                            width: "100%",
                          }}
                        >
                          <Form.Item
                            initialValue={user ? user.fName : null}
                            className="userLabel"
                            name="fName"
                            colon={true}
                            label="First Name:"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter First Name",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Please Enter Valid Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="First Name"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.lName : null}
                            className="userLabel"
                            name="lName"
                            label="Last Name"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Last Name",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Please Enter Valid Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Last Name"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.dob : null}
                            className="userLabel"
                            name="dob"
                            value="dob"
                            label="Date of Birth:"
                          >
                            <DatePicker
                              format={dateFormat}
                              placeholder="Date of Birth"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.phone : null}
                            className="userLabel"
                            name="phone"
                            label="Phone Number"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please Enter Phone Number",
                            //   },
                            //   {
                            //     pattern: /^[a-zA-Z\s]*$/,
                            //     message: "Please Enter Valid Number",
                            //   },
                            // ]}
                          >
                            <Input
                              placeholder="Phone Number"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.gender : null}
                            className="userLabel"
                            name="gender"
                            label="Gender"
                          >
                            <Radio.Group onChange={onChange} value={value}>
                              <Radio className="radio" value={1}>
                                Male
                              </Radio>
                              <Radio className="radio" value={2}>
                                Female
                              </Radio>
                              <Radio className="radio" value={3}>
                                Other
                              </Radio>
                            </Radio.Group>
                          </Form.Item>
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#444444",
                            marginLeft: "14px",
                            marginTop: "35px",
                          }}
                        >
                          Employment Details
                        </div>
                        <Divider
                          style={{
                            borderTop: "1px dashed #8C8C8C",
                            margin: "12px",
                          }}
                        />
                        <div
                          className="userDetails"
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            marginTop: "25px",
                            width: "100%",
                          }}
                        >
                          <Form.Item
                            initialValue={user.empId}
                            className="userLabel"
                            name="empId"
                            label="Employee ID"
                          >
                            <Input
                              placeholder="Employee ID"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.email : null}
                            className="userLabel"
                            name="email"
                            label="Email Address"
                            // rules={[
                            //   {
                            //     required: true,
                            //     message: "Please Enter Email Address",
                            //     type: "email",
                            //   },
                            //   {
                            //     pattern: /^[a-zA-Z\s]*$/,
                            //     message: "Please Enter Valid Address",
                            //   },
                            // ]}
                          >
                            <Input
                              placeholder="Email Address"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.doj : null}
                            className="userLabel"
                            name="doj"
                            value="doj"
                            label="Date of Joining"
                          >
                            <DatePicker
                              placeholder="Date of Joining"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.businessPlace : null}
                            className="userLabel"
                            name="businessPlace"
                            label="Place of Business"
                            rules={[
                              {
                                required: true,
                                message: "Please Enter Place",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Please Enter Valid Name",
                              },
                            ]}
                          >
                            <Select
                              bordered={false}
                              placeholder="Select Team"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                              options={[
                                {
                                  value: "head",
                                  label: "Head Office",
                                },
                                {
                                  value: "branch",
                                  label: "Branch Office",
                                },
                              ]}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.designation : null}
                            className="userLabel"
                            name="designation"
                            label="Designation"
                          >
                            <Input
                              placeholder="Enter Designation"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.businessUnit : null}
                            className="userLabel"
                            name="businessUnit"
                            label="Business Unit"
                          >
                            <Select
                              bordered={false}
                              placeholder="Default"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                              //   options={[
                              //     {
                              //       value: "head",
                              //       label: "Head Office",
                              //     },
                              //     {
                              //       value: "branch",
                              //       label: "Branch Office",
                              //     },
                              //   ]}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.division : null}
                            className="userLabel"
                            name="division"
                            label="Division"
                          >
                            <Select
                              bordered={false}
                              placeholder="Default"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.department : null}
                            className="userLabel"
                            name="department"
                            label="Department"
                          >
                            <Select
                              bordered={false}
                              placeholder="Default"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.team : null}
                            className="userLabel"
                            name="team"
                            label="Team"
                          >
                            <Input
                              placeholder="Default"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.managerSupervisor : null}
                            className="userLabel"
                            name="managerSupervisor"
                            label="Manager/Supervisor"
                          >
                            <Input
                              placeholder="default"
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                          <Form.Item
                            initialValue={user ? user.note : null}
                            className="userLabel"
                            name="note"
                            label="Note"
                          >
                            <TextArea
                              className="text"
                              rows={4}
                              style={{
                                width: "330px",
                                border: "1px solid #8692A6",
                                borderRadius: "4px",
                                background: "#ffffff",
                              }}
                            />
                          </Form.Item>
                        </div>
                      </>
                    ) : (
                      <>
                        <Divider />
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#444444",
                            marginLeft: "14px",
                          }}
                        >
                          User Details
                        </div>
                        <Divider
                          style={{
                            borderTop: "1px dashed #8C8C8C",
                            margin: "12px",
                          }}
                        />
                        <div className="userMap" style={{ marginLeft: "9rem" }}>
                          <Row>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="First Name:">
                                <span>{user.fName}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Last Name:">
                                <span>{user.lName}</span>
                              </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Date of Birth:">
                                <span>
                                  {`${new Date(user?.dob?._d).getDate()}/${
                                    new Date(user?.dob?._d).getMonth() + 1
                                  }/${new Date(user?.dob?._d).getFullYear()}`}
                                </span>
                              </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Phone Number:">
                                <span>{user.phone}</span>
                              </Form.Item>
                            </Col>

                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Gender:">
                                <span>{user.gender}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                        <div
                          style={{
                            fontWeight: "600",
                            fontSize: "14px",
                            lineHeight: "16px",
                            color: "#444444",
                            marginLeft: "14px",
                            marginTop: "35px",
                          }}
                        >
                          Employment Details
                        </div>
                        <Divider
                          style={{
                            borderTop: "1px dashed #8C8C8C",
                            margin: "12px",
                          }}
                        />
                        <div className="userMap" style={{ marginLeft: "9rem" }}>
                          <Row>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Employee ID:">
                                <span>{user.empId}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Email Address :">
                                <span>{user.email}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Joining Date :">
                                <span>{`${new Date(user?.doj?._d).getDate()}/${
                                  new Date(user?.doj?._d).getMonth() + 1
                                }/${new Date(
                                  user?.doj?._d
                                ).getFullYear()}`}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Place of Business :">
                                <span>{user.businessPlace}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Designation :">
                                <span>{user.designation}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Business Unit :">
                                <span>{user.businessUnit}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Division :">
                                <span>{user.division}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Department :">
                                <span>{user.department}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Team :">
                                <span>{user.team}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Manager/Supervisor">
                                <span>{user.managerSupervisor}</span>
                              </Form.Item>
                            </Col>
                            <Col xs={24} sm={24} md={24}>
                              <Form.Item label="Note :">
                                <span>{user.note}</span>
                              </Form.Item>
                            </Col>
                          </Row>
                        </div>
                      </>
                    )}
                    {editAccess === true ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                          marginLeft: "28rem",
                        }}
                      >
                        <Space>
                          <Button
                            style={{
                              border: "1px solid #DFE2E8",
                              color: "#717171",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "17px",
                              width: "99px",
                              borderRadius: "4px",
                            }}
                            onClick={() => {
                              //   let array = [...editAccess];
                              //   array[i] = !array[i];
                              setEditAccess(false);
                            }}
                          >
                            <CloseOutlined />
                            CANCEL
                          </Button>
                          <Button
                            type="primary"
                            style={{
                              border: "1px solid #FAFAFA",
                              background: "#095AA4",
                              color: "#FFFFFF",
                              fontWeight: "400",
                              fontSize: "14px",
                              lineHeight: "17px",
                              width: "99px",
                              borderRadius: "4px",
                            }}
                            onClick={() => {
                              form.submit();
                              setEditAccess(false);
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Space>
                      </div>
                    ) : null}
                  </Row>
                </Form>
              </Card>
            </div>
          ))
        : null}
      <Form
        colon={true}
        name="basic"
        form={form}
        labelCol={{
          span: 4,
          offset: 4,
        }}
        wrapperCol={{
          span: 14,
          offset: 1,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        layout="horizontal"
        onFinish={addUseRole}
      >
        {addAccess ? (
          <Card
            style={{
              background: "#FAFAFA",
              border: "1px solid #EAEAEA",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              margin: " 5rem",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                color: "rgba(0,0,0,0.85)",
              }}
            >
              AccessDetails
            </div>
            <Divider />
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#444444",
                marginLeft: "14px",
              }}
            >
              User Details
            </div>
            <Divider
              style={{
                borderTop: "1px dashed #8C8C8C",
                margin: "12px",
              }}
            />
            <div
              className="userDetails"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
              }}
            >
              <Form.Item
                className="userLabel"
                name="fName"
                colon={true}
                label="First Name::"
                onKeyPress={(event) => {
                  if (checkAlphabet(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  required
                  placeholder="First Name"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ fName: newVal, fName: caps });
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="lName"
                label="Last Name::"
                onKeyPress={(event) => {
                  if (checkAlphabet(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  required
                  placeholder="Last Name"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ lName: newVal, lName: caps });
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="dob"
                value="dob"
                label="Date of Birth:"
              >
                <DatePicker
                  format={dateFormat}
                  placeholder="Date of Birth"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Phone Number",
                  },
                  {
                    pattern: /^[6-9]\d{9}$/,
                    message: "Please Enter Valid Number",
                  },
                ]}
              >
                <Input
                  required
                  maxLength={10}
                  placeholder="Phone Number"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="gender" label="Gender">
                <Radio.Group onChange={onChange} value={value}>
                  <Radio className="radio" value={1}>
                    Male
                  </Radio>
                  <Radio className="radio" value={2}>
                    Female
                  </Radio>
                  <Radio className="radio" value={3}>
                    Other
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#444444",
                marginLeft: "14px",
                marginTop: "35px",
              }}
            >
              Employment Details
            </div>
            <Divider
              style={{
                borderTop: "1px dashed #8C8C8C",
                margin: "12px",
              }}
            />
            <div
              className="userDetails"
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "25px",
              }}
            >
              <Form.Item
                className="userLabel"
                name="empId"
                label="Employee ID"
                onKeyPress={(event) => {
                  console.log(checkNumbervalue(event), checkUpperCase(event));
                  if (checkNumbervalue(event) && checkUpperCase(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: false,
                    pattern: /^[0-9A-Z]+$/,
                    message: "Please Enter Employee ID",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  placeholder="Employee ID"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email Address",
                    type: "email",
                    pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                  },
                ]}
              >
                <Input
                  maxLength={30}
                  required
                  placeholder="Email Address"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="doj"
                value="doj"
                label="Date of Joining"
              >
                <DatePicker
                  format={dateFormat}
                  placeholder="Date of Joining"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="businessPlace"
                label="Place of Business"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Place",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  placeholder="Select Team"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  options={[
                    {
                      value: "head",
                      label: "Head Office",
                    },
                    {
                      value: "branch",
                      label: "Branch Office",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="designation"
                label="Designation"
                onKeyPress={(event) => {
                  if (checkAlphabet(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: false,
                    message: "Please Enter Last Name",
                    pattern: /^[a-zA-Z\s]*$/,
                  },
                ]}
              >
                <Input
                  placeholder="Enter Designation"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({
                      designation: newVal,
                      designation: caps,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="businessUnit"
                label="Business Unit"
              >
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  //   options={[
                  //     {
                  //       value: "head",
                  //       label: "Head Office",
                  //     },
                  //     {
                  //       value: "branch",
                  //       label: "Branch Office",
                  //     },
                  //   ]}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="division" label="Division">
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="department"
                label="Department"
              >
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="team" label="Team">
                <Input
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="managerSupervisor"
                label="Manager/Supervisor"
              >
                <Input
                  placeholder="default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="note" label="Note">
                <TextArea
                  rows={4}
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                marginLeft: "16rem",
              }}
            >
              <Space>
                <Button
                  style={{
                    border: "1px solid #DFE2E8",
                    color: "#717171",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                    borderRadius: "4px",
                  }}
                  onClick={onReset}
                >
                  <CloseOutlined />
                  CANCEL
                </Button>
                <Button
                  style={{
                    border: "1px solid #FAFAFA",
                    background: "#095AA4",
                    color: "#FFFFFF",
                    fontWeight: "400",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    form.submit();
                  }}
                >
                  <CheckOutlined />
                  SAVE
                </Button>
              </Space>
            </div>
          </Card>
        ) : null}
      </Form>
      <Card
        style={{
          background: "#FAFAFA",
          border: "1px solid #EAEAEA",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          margin: " 5rem",
        }}
      >
        <div
          style={{ fontWeight: "600", fontSize: "14px", lineHeight: "17px" }}
        >
          AccessDetails
        </div>
        <Divider />

        <Button
          style={{
            color: "#095AA4",
            border: "none",
            backgroundColor: "#FAFAFA",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "17px",
          }}
          onClick={() => {
            if (addAccess) {
              form.submit();
            }
            setAddAccess(!addAccess);
          }}
        >
          <PlusCircleOutlined /> Add
        </Button>
      </Card>
    </>
  );
}

export default AccessDetails;
