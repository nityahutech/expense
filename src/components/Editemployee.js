import React from "react";
import { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Space,
  notification,
  Checkbox,
} from "antd";
// import { useNavigate } from 'react-router-dom';
import moment from "moment";
import EmpInfoContext from "../contexts/EmpInfoContext";
import "../style/CertificationID.css";
import { getDatasetAtEvent } from "react-chartjs-2";
import ConfigureContext from "../contexts/ConfigureContext";
import CompanyProContext from "../contexts/CompanyProContext";

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
  const [mname, setMname] = useState("");
  const [lname, setLname] = useState("");
  const [mailid, setMailid] = useState("");
  const [doj, setDoj] = useState("");
  const [designation, setDesignation] = useState("");
  const [gender, setGender] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [repManager, setRepManager] = useState("");
  const [secManager, setSecManager] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");
  const [isManager, setIsMgr] = useState("");
  const [earnLeave, setEarnLeave] = useState("");
  const [sickLeave, setSickLeave] = useState("");
  const [optionalLeave, setOptionalLeave] = useState("");
  const [casualLeave, setCasualLeave] = useState("");
  const page = "addemployeePage"
  const [compId, setCompId] = useState(sessionStorage.getItem("compId"));
  const [configurations, setConfigurations] = useState(null);
  const [workLoc, setWorkLoc] = useState(null);
  async function submitEdit() {
    try {
      const editedRecord = {
        fname,
        mname,
        lname,
        mailid,
        doj,
        designation,
        gender,
        repManager,
        secManager,
        department,
        location,
        isManager,
        earnLeave,
        sickLeave,
        casualLeave,
        optionalLeave,
      };
      let name = editedRecord.fname + (editedRecord.mname?` ${editedRecord.mname} `:" ") + editedRecord.lname
      let record = {
        ...editedRecord,
        name: name
      }
      EmpInfoContext.updateEduDetails(props.record.id, record);
      props.setIsModalVisible(false);
      // props.reloadData();
      showNotification("success", "Success", "Record updated successfully");
      return;
    } catch (error) {
      props.setIsModalVisible(false);
      showNotification("error", "Failed", "Record update failed");
    }
  }
  const getData = async () => {
    let temp = await CompanyProContext.getCompanyProfile(compId)
    let data = await ConfigureContext.getConfigurations(page)
    let add = ["Registered Office"]
    if(temp.corpOffice) {add.push("Corporate Office")}
    temp.address?.map((rec) => {
      add.push(rec.title)
    })
    setWorkLoc(add)
    setConfigurations(data)
  }
  useEffect(() => {
    getData();
    const fnameVal = props.record ? props.record.fname : "";
    const mnameVal = props.record ? props.record.mname : "";
    const lnameVal = props.record ? props.record.lname : "";
    const mailidVal = props.record ? props.record.mailid : "";
    const dojVal = props.record ? props.record.doj : "";
    const designationVal = props.record ? props.record.designation : "";
    const genderVal = props.record ? props.record.gender : "";
    const phonenumberVal = props.record ? props.record.phonenumber : "";
    const repManagerVal = props.record ? props.record.repManager : "";
    const secManagerVal = props.record ? props.record.secManager : "";
    const setDepartmentVal = props.record ? props.record.department : "";
    const locationVal = props.record ? props.record.location : "";
    const isMgrVal = props.record ? props.record.isManager : "";
    const earnLeaveVal = props.record ? props.record.earnLeave : "";
    const sickLeaveVal = props.record ? props.record.sickLeave : "";
    const casualLeaveVal = props.record ? props.record.casualLeave : "";
    const optionalLeaveVal = props.record ? props.record.optionalLeave : "";
    setFname(fnameVal);
    setMname(mnameVal);
    setLname(lnameVal);
    setMailid(mailidVal);
    setDoj(dojVal);
    setDesignation(designationVal);
    setGender(genderVal);
    setPhonenumber(phonenumberVal);
    setRepManager(repManagerVal);
    setSecManager(secManagerVal);
    setDepartment(setDepartmentVal);
    setLocation(locationVal);
    setIsMgr(isMgrVal);
    setEarnLeave(earnLeaveVal);
    setSickLeave(sickLeaveVal);
    setCasualLeave(casualLeaveVal);
    setOptionalLeave(optionalLeaveVal);
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
        fields={[
          {
            name: ["fname"],
            value: fname,
          },
          {
            name: ["mname"],
            value: mname,
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
          // {
          //   name: ["phonenumber"],
          //   value: phonenumber,
          // },
          {
            name: ["repManager"],
            value: repManager,
          },
          {
            name: ["secManager"],
            value: secManager,
          },
          {
            name: ["department"],
            value: department,
          },
          {
            name: ["location"],
            value: location,
          },
          {
            name: ["isManager"],
            value: isManager,
          },
          {
            name: ["earnLeave"],
            value: earnLeave,
          },
          {
            name: ["sickLeave"],
            value: sickLeave,
          },
          {
            name: ["casualLeave"],
            value: casualLeave,
          },
          {
            name: ["optionalLeave"],
            value: optionalLeave,
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
              name="mname"
              label="Middle Name"
              onKeyPress={(event) => {
                if (checkAlphabets(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: false,

                  message: "Please enter Middle Name",
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
                  setMname(newVal);
                }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
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
              name="email"
              label="Email Id&nbsp;"
              // disabled={{mailid.split('@')[1]==="hutechsolutions"}}
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
                disabled={mailid.split("@")[1] === "hutechsolutions.com"}
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
                onChange={(e) => setGender(e)}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
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
                  onChange={(e) => setDesignation(e)}
                  style={{ width: "80%" }}
                  placeholder="Select a Designation"
                >
                {
                  configurations?.designations.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
            </Form.Item>
          </Col>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="repManager"
              label="Reporting Manager"
              rules={[
                {
                  required: false,
                  message: "Please enter Reporting Manager Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
                },
              ]}
            >
              <Select
                  onChange={(e) => setRepManager(e)}
                  style={{ width: "80%" }}
                  placeholder="Select a Manager"
                >
                {
                  configurations?.repManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="secManager"
              label="Secondary Manager"
              rules={[
                {
                  required: false,
                  message: "Please enter Sec. Manager Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
                },
              ]}
            >
              <Select
                  onChange={(e) => setSecManager(e)}
                  style={{ width: "80%" }}
                  placeholder="Select a Manager"
                >
                {
                  configurations?.secManager.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
            </Form.Item>
          </Col>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="department"
              label="Department"
              rules={[
                {
                  required: false,
                  message: "Choose Your Department",
                },
              ]}
            >
              <Select
                  placeholder="Select a Field"
                  style={{ width: "80%" }}
                  onChange={(e) => setDepartment(e)}
                >
                {
                  configurations?.field.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
                </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              className="managerError"
              style={{ marginBottom: "17px" }}
              name="isManager"
              label="Is Manager"
              // rules={[
              //   {
              //     required: false,
              //     message: "Please enter Phone Number",
              //     // pattern: /^[0-9\b]+$/,
              //   },
              //   { whitespace: true },
              // ]}
              initialValue={props.record.isManager == "true"}
            >
            {props.record.isManager == "true"? (
              <Checkbox
                // defaultChecked={props.record.isManager == "true"}
                defaultChecked={props.record.isManager == "true"}
                style={{ width: "80%" }}
                maxLength={10}
                onChange={(e) => {
                  const number = e.target.checked;
                  setIsMgr(number);
                }}
              >
                Manager
              </Checkbox>) 
              : (
              <Checkbox
                style={{ width: "80%" }}
                maxLength={10}
                onChange={(e) => {
                  const number = e.target.checked;
                  setIsMgr(number);
                }}
              >
                Manager
              </Checkbox>) }
            </Form.Item>
          </Col>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="location"
              label="Work Location&nbsp;"
              onKeyPress={(event) => {
                if (checkAlphabets(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,

                  message: "Please enter Location",
                },
                {
                  // pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Location",
                },
              ]}
            >
              <Select
                  style={{ width: "80%" }}
                  onChange={(e) => setWorkLoc(e)}
                  placeholder="Select a Location"
                >
                {
                  workLoc?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))
                }
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="earnLeave"
              label="Earn Leave&nbsp;"
              onKeyPress={(event) => {
                if (checkNumbervalue(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  maxLength: 2,
                  message: "Please enter Earn Leave",
                },
              ]}
            >
              <Input
                maxLength={2}
                style={{ width: "80%" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setEarnLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="sickLeave"
              label="Sick Leave&nbsp;"
              onKeyPress={(event) => {
                if (checkNumbervalue(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  maxLength: 2,
                  message: "Please enter Sick Leave",
                },
              ]}
            >
              <Input
                maxLength={2}
                style={{ width: "80%" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setSickLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="casualLeave"
              label="Casual Leave&nbsp;"
              onKeyPress={(event) => {
                if (checkNumbervalue(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  maxLength: 2,
                  message: "Please enter Casual Leave",
                },
              ]}
            >
              <Input
                maxLength={2}
                style={{ width: "80%" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setCasualLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col xs={22} sm={22} md={12}>
            <Form.Item
              style={{ marginBottom: "17px" }}
              name="optionalLeave"
              label="Optional Leave&nbsp;"
              onKeyPress={(event) => {
                if (checkNumbervalue(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  maxLength: 2,
                  message: "Please enter Optional Leave",
                },
              ]}
            >
              <Input
                maxLength={2}
                style={{ width: "80%" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setOptionalLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
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
