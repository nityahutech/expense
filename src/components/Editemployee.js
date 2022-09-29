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
import { useAuth } from "../contexts/AuthContext";
import moment from "moment";
import ProfileContext from "../contexts/ProfileContext";
import EmployeeContext from "../contexts/EmployeeContext";

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
  const { currentUser } = useAuth();

  async function submitEdit() {
    console.log("***************************");
    try {
      const editedRecord = {
        fname,
        lname,
        // mailid,
        doj,
        designation,
        gender,
        phonenumber,
      };
      console.log("editedRecord");
      console.log(props.record.id, editedRecord);
      EmployeeContext.updateEmployee(props.record.id, editedRecord);
      props.setIsModalVisible(false);
      // props.reloadData();
      showNotification("success", "Success", "Record updated successfully");

      return;
    } catch (error) {
      console.log(error);
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
    position: "relative",
    bottom: "4px",
    left: "20rem",
    width: "25%",
  };
  const buttonStyle = {
    marginRight: "5px",
    color: "white",
    backgroundColor: "#1890ff",
    position: "relative",
    bottom: "4px",
    left: "6rem",
    width: "25%",
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
    let res = await ProfileContext.updateProfile(values.id, values);
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
      <Form
        //   form={form}
        labelcol={{
          span: 20,
        }}
        wrappercol={{
          span: 20,
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
        layout="vertical"
      >
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="fname"
              label="First Name&nbsp;"
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
                style={{ width: "80%" }}
                maxLength={20}
                onChange={(e) => {
                  const inputval = e.target.value;

                  const newVal =
                    inputval.substring(0, 1).toUpperCase() +
                    inputval.substring(1);

                  setFname(newVal);
                }}

                // required
                // placeholder="Enter Your First Name"
              />
            </Form.Item>
          </Col>

          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="lname"
              label="Last Name&nbsp;"
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
                style={{ width: "80%" }}
                maxLength={20}
                onChange={(e) => {
                  const inputval = e.target.value;

                  const newVal =
                    inputval.substring(0, 1).toUpperCase() +
                    inputval.substring(1);

                  setLname(newVal);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="email"
              label="Email Id&nbsp;"
              // onKeyPress={(event) => {
              //   if (checkAlphabets(event)) {
              //     event.preventDefault();
              //   }
              // }}

              rules={[
                {
                  required: true,

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
                style={{ width: "80%" }}
                maxLength={20}
                // onChange={(e) => {
                //   const inputval = e.target.value;

                //   const newVal =
                //     inputval.substring(0, 1).toUpperCase() +
                //     inputval.substring(1);

                //   setMailid(newVal);
                // }}
                readonly
                value={mailid}
                disabled={true}
              />
            </Form.Item>
          </Col>

          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="doj"
              label="Date of Joining&nbsp;"
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
                style={{ width: "80%" }}
                onChange={(e) => {
                  setDoj(e.format(dateFormat));
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="phonenumber"
              label="Phone No.&nbsp;"
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
                style={{ width: "80%" }}
                maxLength={10}
                onChange={(e) => {
                  const number = e.target.value;
                  setPhonenumber(number);
                }}

                //   onChange={(e) => {
                //     const amt = e.target.value;
                //     setAmount(amt);
                //     setTotal(amt * quantity);
                //     form.setFieldsValue({ subTotal: amt * quantity });

                //   }}
              />
            </Form.Item>
          </Col>

          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="gender"
              label="Gender&nbsp;"
              rules={[
                {
                  required: true,
                  message: "Please Choose Gender",
                },
              ]}
            >
              <Select
                style={{ width: "80%" }}
                onChange={(e) => setGender(e.target.value)}
                // showSearch

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
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="designation"
              label="Designation&nbsp;"
              rules={[
                {
                  required: true,
                  message: "Please Choose Designation",
                },
              ]}
            >
              <Select
                style={{ width: "80%" }}
                onChange={(e) => setDesignation(e.target.value)}
                // showSearch

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
    </>
  );
}

export default Editemployee;
