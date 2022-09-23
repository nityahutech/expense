import React from "react";
import { useState, useEffect } from "react";
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
  notification,
} from "antd";
// import { useNavigate } from 'react-router-dom';
import { createUser } from "../contexts/CreateContext";
import moment from "moment";

const { Option } = Select;
const showNotification = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
const dateFormat = "DD-MM-YYYY";

function Editemployee(props) {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [mailid, setMailid] = useState("");
  const [doj, setDoj] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  console.log(props);

  async function submitEdit() {
    try {
      const editedRecord = {
        fname,
        lname,
        mailid,
        doj,
        designation,
        gender,
        phonenumber,
      };
      props.setIsModalVisible(false);
      props.reloadData();
      showNotification("success", "Success", "Record updated successfully");

      return;
    } catch (error) {
      props.setIsModalVisible(false);
      showNotification("error", "Failed", "Record update failed");
    }
  }

  useEffect(() => {
    const fnameVal = props.record ? props.record.fname : "";
    const lnameVal = props.record ? props.record.lname : "";
    const mailidVal = props.record ? props.record.mailid : "";
    const dojVal = props.record ? props.record.doj : "";
    const designationVal = props.record ? props.record.designation : "";
    const genderVal = props.record ? props.record.gender : "";
    const phonenumberVal = props.record ? props.record.phonenumber : "";

    setFname(fnameVal);
    setLname(lnameVal);
    setMailid(mailidVal);
    setDoj(dojVal);
    setDesignation(designationVal);
    setGender(genderVal);
    setPhonenumber(phonenumberVal);
  }, [props]);
  function cancel() {
    props.setIsModalVisible(false);
  }

  const cancelStyle = {
    float: "right",
  };
  const buttonStyle = {
    marginRight: "5px",
    color: "white",
    backgroundColor: "#1890ff",
    float: "right",
  };
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
  // const navigate = useNavigate();
  // const handleListEmployee = () => {
  //   navigate("/Expense/ExpenseList");
  // }
  // const {signup} = useAuth();
  const onFinish = async (values) => {
    console.log("Received values of form: ", values);
    let res = await createUser(values);
    console.log("DONE!!!!!!!!!");
    // console.log(res);
    // const valuesToservice = {

    //   fname: values['fname'],
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

    // console.log('valuesToservice: ', valuesToservice);

    // ExpenseContext.addExpenses(valuesToservice)
    //   .then(response => {
    //     console.log(response);
    //     navigate('/Expense/ExpenseList');
    //   })
    //   .catch(error => {
    //     console.log(error.message);

    //   })
  };

  return (
    <>
      <div className="expForm" style={{ margin: "15px", background: "white" }}>
        <Form
          //   form={form}
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
          fields={[
            {
              name: ["fname"],
              value: fname,
            },
            {
              name: ["lname"],
              value: lname,
            },
            {
              name: ["email"],
              value: mailid,
            },
            {
              name: ["doj"],
              value: moment(doj, dateFormat),
            },
            {
              name: ["designation"],
              value: designation,
            },
            {
              name: ["gender"],
              value: gender,
            },
            {
              name: ["phonenumber"],
              value: phonenumber,
            },
          ]}
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
          </Row>

          <Row gutter={[24, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "", height: "80px" }}
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
                  //   onChange={(e) => {

                  //     const inputval = e.target.value;
                  //     const str = e.target.value;
                  //     const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                  //     const caps = str.split(' ').map(capitalize).join(' ');
                  // setPaidBy(newVal);
                  // form.setFieldsValue({ expence: newVal, expence: caps });

                  //   }}

                  required
                  placeholder="Enter Your First Name"
                />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "", height: "80px" }}
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
                  //   onChange={(e) => {

                  //     const inputval = e.target.value;
                  //     const str = e.target.value;
                  //     const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                  //     const caps = str.split(' ').map(capitalize).join(' ');
                  // setPaidBy(newVal);
                  // form.setFieldsValue({ expence: newVal, expence: caps });

                  //   }}

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
              style={{ background: "", height: "80px" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Email Id<span style={{ color: "red" }}> *</span>
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
                <Input
                  maxLength={20}
                  //   onChange={(e) => {

                  //     const inputval = e.target.value;
                  //     const str = e.target.value;
                  //     const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                  //     const caps = str.split(' ').map(capitalize).join(' ');
                  // setPaidBy(newVal);
                  // form.setFieldsValue({ expence: newVal, expence: caps });

                  //   }}

                  required
                  placeholder="Enter Email Address"
                />
              </Form.Item>
            </Col>

            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              className="Col-1-left"
              style={{ background: "", height: "80px" }}
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
                  format={dateFormat}
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
              style={{ background: "", height: "80px" }}
            >
              <Divider orientation="left" orientationMargin={0}>
                Phone No.<span style={{ color: "red" }}> *</span>
              </Divider>
              <Form.Item
                className="numder-inputs"
                name="phonenumber"
                // onKeyPress={(event) => {
                //   if (checkNumbervalue(event)) {
                //     event.preventDefault();
                //   }
                // }}
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
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
              style={{ background: "", height: "80px" }}
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
              style={{ background: "", height: "80px" }}
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
                  <Option value="ceo">Cheap Executive Officer(CEO)</Option>
                </Select>
              </Form.Item>
            </Col>
            {/* <Col */}
            {/* xs={{ span: 24 }} */}
            {/* sm={{ span: 12 }} */}
            {/* className="Col-1-left" */}
            {/* style={{ background: "", height: "80px" }} */}
            {/* > */}
            {/* <Divider orientation="left" orientationMargin={0}> */}
            {/* Role<span style={{ color: "red" }}> *</span> */}
            {/* </Divider> */}
            {/* <Form.Item */}
            {/* name="role" */}
            {/* rules={[ */}
            {/* {
                    required: true,
                    message: "Please Choose a Role",
                  },
                ]}
              > */}
            {/* <Select
                  // showSearch
                  placeholder="Select a Role"
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  <Option value="admin">Admin</Option>
                  <Option value="emp">Employee</Option>
                  {/* <Option value="pns">Prefer Not To Say</Option> */}
            {/* </Select> */}
            {/* </Form.Item>
            </Col> */}
          </Row>

          <br />
          <Button style={cancelStyle} onClick={cancel}>
            Cancel
          </Button>
          <Button style={buttonStyle} onClick={submitEdit}>
            Submit
          </Button>
          <br />
        </Form>
      </div>
    </>
  );
}

export default Editemployee;
