import React, { useEffect, useState } from "react";
import {
  Col,
  Divider,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  notification,
  Space,
} from "antd";
import "../style/Documents.css";
import { useNavigate } from "react-router-dom";
import { createUser } from "../contexts/CreateContext";
import ConfigureContext from "../contexts/ConfigureContext";
import CompanyProContext from "../contexts/CompanyProContext";
const { Option } = Select;
function AddEmployee() {
  const page = "addemployeePage";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const compId = sessionStorage.getItem("compId");
  const [configurations, setConfigurations] = useState(null);
  const [workLoc, setWorkLoc] = useState(null);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let temp = await CompanyProContext.getCompanyProfile(compId);
    let data = await ConfigureContext.getConfigurations(page);
    let add = ["Registered Office"];
    if (temp.corpOffice) {
      add.push("Corporate Office");
    }
    temp.address?.map((rec) => {
      add.push(rec.title);
    });
    setWorkLoc(add);
    setConfigurations(data);
  };
  const handleListEmployee = () => {
    navigate("/Employee/EmployeeList");
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function onReset() {
    form.resetFields();
  }
  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };
  const onFinish = (values) => {
    createUser(values, "compId001")
      .then((response) => {
        showNotification("success", "Success", "Employee Created");
        navigate("/EmployeeListPage/EmployeeList");
      })
      .catch((error) =>
        showNotification("error", "Error", "This user already exists!")
      );
  };
  return (
    <>
      <div className="expForm" style={{ margin: "15px", background: "#fff" }}>
        <Form
          className="addEmp"
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
          onFinish={onFinish}
        >
          <Row
            className="rowform"
            gutter={[0, 8]}
            style={{
              marginBottom: "1.5rem",
              marginTop: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignitems: "center",
              justifyContent: "space-around",
            }}
          >
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-center"
              style={{
                background: "",
                height: "50px",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Button
                className="listExpense"
                type="primary"
                onClick={handleListEmployee}
                style={{
                  width: "120px",
                  cursor: "pointer",
                  backgroundColor: "#1963A6",
                  borderRadius: "5px",
                }}
              >
                Employee List
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="fname"
                label="First Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ fname: newVal, fname: caps });
                  }}
                  required
                  placeholder="Enter First Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="mname"
                label="Middle Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Middle Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ mname: newVal, mname: caps });
                  }}
                  placeholder="Enter Middle Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="lname"
                label="Last Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,

                    message: "Please enter Last Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ lname: newVal, lname: caps });
                  }}
                  required
                  placeholder="Enter Last Name"
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
                name="mailid"
                label="Official Email Id"
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
                <Input
                  required
                  placeholder="Enter Email Address"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="email"
                label="Personal Email Id"
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
                <Input
                  required
                  placeholder="Enter Email Address"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                className="numder-inputs"
                name="phone"
                label="Phone Number"
                // onKeyPress={(event) => {
                //   if (checkNumbervalue(event)) {
                //     event.preventDefault();
                //   }
                // }}
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
                  //   onChange={(e) => {
                  //     const amt = e.target.value;
                  //     setAmount(amt);
                  //     setTotal(amt * quantity);
                  //     form.setFieldsValue({ subTotal: amt * quantity });
                  //   }}
                  placeholder="Enter Phone Number"
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
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please Choose Gender",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select a Gender"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="designation"
                label="Designation"
                rules={[
                  {
                    required: true,
                    message: "Please Choose Designation",
                  },
                ]}
              >
                <Select
                  // showSearch
                  bordered={false}
                  placeholder="Select a Designation"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {configurations?.designations.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="empType"
                label="Employee Type"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Type",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select Employee Type"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Full-Time">Full-Time</Option>
                  <Option value="Part-Time">Part-Time</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="repManager"
                label="Reporting Manager"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: false,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Reporting Manager Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select a Manager"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {configurations?.repManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({
                      repManager: newVal,
                      repManager: caps,
                    });
                  }}
                  placeholder="Enter Reporting Manager Name"
                /> */}
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="secManager"
                label="Secondary Manager"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: false,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Sec. Manager Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select a Manager"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {configurations?.secManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({
                      secManager: newVal,
                      secManager: caps,
                    });
                  }}
                  placeholder="Enter Secondary Manager Name"
                /> */}
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="lead"
                label="Lead"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    minLength: 3,
                    maxLength: 20,
                    message: "Please enter Lead Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ lead: newVal, lead: caps });
                  }}
                  required
                  placeholder="Enter Lead Name"
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
                name="doj"
                label="Date Of Joining"
                placeholder="Choose Date"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Date",
                  },
                ]}
              >
                {/* format={dateFormatList} */}
                <DatePicker
                  format={"DD-MM-YYYY"}
                  //  disabledDate={disabledDate}
                  placeholder="Choose Date"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="department"
                label="Department"
                rules={[
                  {
                    required: false,
                    message: "Choose Department",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select a Field"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {configurations?.field.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="location"
                label="Work Loaction"
                // onKeyPress={(event) => {
                //   if (checkAlphabets(event)) {
                //     event.preventDefault();
                //   }
                // }}
                rules={[
                  {
                    required: true,
                    // minLength: 3,
                    // maxLength: 20,
                    message: "Please enter Location",
                  },
                  {
                    // pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Location",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  // showSearch
                  placeholder="Select a Location"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {workLoc?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
                {/* <Input
                  maxLength={20}
                  onChange={(e) => {
                    const inputval = e.target.value;
                    const str = e.target.value;
                    const newVal =
                      inputval.substring(0, 1).toUpperCase() +
                      inputval.substring(1);
                    const caps = str.split(" ").map(capitalize).join(" ");
                    // setPaidBy(newVal);
                    form.setFieldsValue({ location: newVal, location: caps });
                  }}
                  required
                  placeholder="Enter Location"
                /> */}
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[24, 16]}>
            <Col classsname="gutter-row" span={9}></Col>
            <Col classsname="gutter-row">
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
                        marginTop: "25px",
                        cursor: "pointer",
                      }}
                      onClick={onReset}
                    >
                      Reset
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
                        marginTop: "25px",
                        cursor: "pointer",
                        marginLeft: "17px",
                      }}
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Space>
              </div>
            </Col>
            {/* <Col classsname='gutter-row' span={3}></Col> */}
          </Row>
        </Form>
      </div>
    </>
  );
}
export default AddEmployee;
