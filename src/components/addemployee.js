import React from "react";
import {
  Col,
  Divider,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Space,
} from "antd";
import { useNavigate } from "react-router-dom";
import { createUser } from "../contexts/CreateContext";
const { Option } = Select;
function AddEmployee() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleListEmployee = () => {
    navigate("/EmployeeListPage/EmployeeList");
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
  const onFinish = async (values) => {
    let res = await createUser(values);
    navigate("/EmployeeListPage/EmployeeList");
    // const valuesToservice = {
    //   fname: values.fname,
    //   lname: values['lname'],
    //   email: values['email'],
    //   doj: values['doj'].format('DD-MM-YYYY'),
    //   phone: values['phone'],
    //   gender: values['gender'],
    //   designation: values['designation'],
    //   role: values['role'],
    //   // status: 'Unpaid',
    //   // status:  values['paymentDate'],
    //   // subtotal: values['subTotal'],
    // }
    // createUser.addExpenses(valuesToservice)
    //   .then(response => {
    //     navigate('/EmployeeListPage/EmployeeList');
    //   })
    //   .catch(error => {
    //   })
  };
  return (
    <>
      <div className="expForm" style={{ margin: "15px", background: "white" }}>
        <Form
          form={form}
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
            {/* -----------------Back button------------- */}
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
                  backgroundColor: "rgb(24, 154, 180)",
                  borderRadius: "5px",
                }}
              >
                Employee List
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                First Name<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="fname"
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
                  placeholder="Enter Your First Name"
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Last Name<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="lname"
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
                  placeholder="Enter Your Last Name"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Personal Email Id<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="email"
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
                    message: "Please enter Email Id",
                    type: "email",
                  },
                  {
                    // pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Email",
                  },
                ]}
              >
                <Input required placeholder="Enter Email Address" />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Date Of Joining<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="doj"
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
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Phone No.<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                className="numder-inputs"
                name="phone"
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
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Gender<span style={{ color: "red" }}> *</span>
              </Divider>
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
                  // showSearch
                  placeholder="Select a Gender"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Designation<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="designation"
                rules={[
                  {
                    required: true,
                    message: "Please Choose Designation",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select a Designation"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Internship">Internship</Option>
                  <Option value="Software Trainee">Software Trainee</Option>
                  <Option value="Asst. Software Developer">
                    Asst. Software Developer
                  </Option>
                  <Option value="Sr. Software Developer">
                    Sr. Software Developer
                  </Option>
                  <Option value="Jr. Software Developer">
                    Jr. Software Developer
                  </Option>
                  <Option value="Business Analyst(BA)">
                    Business Analyst(BA)
                  </Option>
                  <Option value="Quality Analyst(QA)">
                    Quality Analyst(QA)
                  </Option>
                  <Option value="Human Resource(HR)">Human Resource(HR)</Option>
                  <Option value="Manager">Manager</Option>
                  <Option value="Director">Director</Option>
                  <Option value="Chief Executive Officer(CEO)">
                    Chief Executive Officer(CEO)
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Employee Type<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="empType"
                rules={[
                  {
                    required: true,
                    message: "Please Choose a Type",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select Employee Type"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="fullTime">Full-Time</Option>
                  <Option value="partTime">Part-Time</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Reporting Manager<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="repManager"
                rules={[
                  {
                    required: true,
                    message: "Choose Reporting Manager",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select a Field"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Pravat Ranjan">PRAVAT RANJAN</Option>
                  <Option value="Amlana Aparajita">AMLANA APARAJITA</Option>
                  <Option value="Anisha Mariam Thomas">
                    ANISHA MARIAM THOMAS
                  </Option>
                  <Option value="Rajeev N. Iyer">RAJEEV N. IYER</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Secondary Manager<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="secManager"
                rules={[
                  {
                    required: true,
                    message: "Choose Secondary Manager",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder=""
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Swayamprava Nanda">SWAYAMPRAVA NANDA</Option>
                  {/* <Option value="emp"></Option> */}
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col span={6}></Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              span={18}
              className="Col-1-left"
              style={{ background: "" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Department<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                name="department"
                rules={[
                  {
                    required: true,
                    message: "Choose Your Department",
                  },
                ]}
              >
                <Select
                  // showSearch
                  placeholder="Select a Field"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="Consulting Service">Consulting Service</Option>
                  <Option value="Human Resource">Human Resource</Option>
                  <Option value="Finance">Finance</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={3}></Col>
          </Row>
          <Row gutter={[24, 16]}>
            <Col classsname="gutter-row" span={9}></Col>
            <Col classsname="gutter-row">
              <div className="submitButton">
                <Space>
                  <Form.Item className="submit">
                    <Button
                      style={{
                        background: "#C1C1C1",
                        borderRadius: "5px",
                        width: "80px",
                        marginTop: "25px",
                        color: "white",
                        cursor: "pointer",
                      }}
                      onClick={onReset}
                    >
                      Reset
                    </Button>
                  </Form.Item>
                  <Form.Item className="submit">
                    <button
                      style={{
                        background: "#189AB4",
                        borderRadius: "5px",
                        borderWidth: "0px",
                        width: "80px",
                        marginTop: "25px",
                        height: "30px",
                        color: "white",
                        cursor: "pointer",
                        marginLeft: "17px",
                      }}
                      type="primary"
                    >
                      Submit
                    </button>
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
