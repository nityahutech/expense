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
  const [lead, setLead] = useState("");
  const [location, setLocation] = useState("");
  const [isManager, setIsMgr] = useState("");
  const [isLead, setIsLd] = useState("");
  const [earnLeave, setEarnLeave] = useState("");
  const [sickLeave, setSickLeave] = useState("");
  const [optionalLeave, setOptionalLeave] = useState("");
  const [casualLeave, setCasualLeave] = useState("");
  const page = "addemployeePage";
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
        phonenumber,
        repManager,
        secManager,
        department,
        lead,
        location,
        isManager,
        isLead,
        earnLeave,
        sickLeave,
        casualLeave,
        optionalLeave,
      };
      let name =
        editedRecord.fname +
        (editedRecord.mname ? ` ${editedRecord.mname} ` : " ") +
        editedRecord.lname;
      let record = {
        ...editedRecord,
        name: name,
      };
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
    const leadVal = props.record ? props.record.lead : "";
    const locationVal = props.record ? props.record.location : "";
    const isLeadVal = props.record ? props.record.isLead : "";
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
    setLead(leadVal);
    setLocation(locationVal);
    setIsMgr(isMgrVal);
    setIsLd(isLeadVal);
    setEarnLeave(earnLeaveVal);
    setSickLeave(sickLeaveVal);
    setCasualLeave(casualLeaveVal);
    setOptionalLeave(optionalLeaveVal);
  }, [props]);
  function cancel() {
    props.setIsModalVisible(false);
  }
  const cancelStyle = {
    border: "1px solid #1565D8",
    color: "#1565D8",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
  };
  const buttonStyle = {
    border: "1px solid #1565D8",
    background: "#1565D8",
    color: "#ffffff",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "17px",
    width: "99px",
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
        layout="vertical"
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
            name: ["lead"],
            value: lead,
          },
          {
            name: ["location"],
            value: location,
          },
          {
            name: ["isLead"],
            value: isLead,
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
      >
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                maxLength={20}
                onChange={(e) => {
                  const inputval = e.target.value;
                  const newVal =
                    inputval.substring(0, 1).toUpperCase() +
                    inputval.substring(1);
                  setFname(newVal);
                }}
                style={{
                  border: "1px solid #8692A6",
                  borderRadius: "4px",
                }}
                // required
                // placeholder="Enter Your First Name"
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
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
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
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
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => {
                  setDoj(e.format(dateFormat));
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
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
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => setGender(e)}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
                {/* <Option value="pns">Prefer Not To Say</Option> */}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                onChange={(e) => setDesignation(e)}
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                placeholder="Select a Designation"
              >
                {configurations?.designations.map((des) => (
                  <Option value={des}>{des}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                onChange={(e) => setRepManager(e)}
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                placeholder="Select a Manager"
              >
                {configurations?.repManager.map((des) => (
                  <Option value={des}>{des}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                onChange={(e) => setSecManager(e)}
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                placeholder="Select a Manager"
              >
                {configurations?.secManager.map((des) => (
                  <Option value={des}>{des}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                placeholder="Select a Field"
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => setDepartment(e)}
              >
                {configurations?.field.map((des) => (
                  <Option value={des}>{des}</Option>
                ))}
              </Select>
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
                  required: false,
                  message: "Please enter Lead Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
                },
              ]}
            >
              <Input
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                maxLength={20}
                onChange={(e) => {
                  const inputval = e.target.value;
                  const newVal =
                    inputval.substring(0, 1).toUpperCase() +
                    inputval.substring(1);
                  setLead(newVal);
                }}
                // required
                placeholder="Enter Lead Name"
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                bordered={false}
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => setLocation(e)}
                placeholder="Select a Location"
              >
                {workLoc?.map((des) => (
                  <Option value={des}>{des}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
              className="managerError"
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
              {props.record.isManager == "true" ? (
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
                </Checkbox>
              ) : (
                <Checkbox
                  style={{ width: "80%" }}
                  maxLength={10}
                  onChange={(e) => {
                    const number = e.target.checked;
                    setIsMgr(number);
                  }}
                >
                  Manager
                </Checkbox>
              )}
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
              className="leadError"
              name="isLead"
              label="Is Lead"
              // rules={[
              //   {
              //     required: false,
              //     message: "Please enter Phone Number",
              //     // pattern: /^[0-9\b]+$/,
              //   },
              //   { whitespace: true },
              // ]}
              initialValue={props.record.isLead == "true"}
            >
              {props.record.isLead == "true" ? (
                <Checkbox
                  // defaultChecked={props.record.isManager == "true"}
                  defaultChecked={props.record.isLead == "true"}
                  style={{ width: "80%" }}
                  maxLength={10}
                  onChange={(e) => {
                    const number = e.target.checked;
                    setIsLd(number);
                  }}
                >
                  Lead
                </Checkbox>
              ) : (
                <Checkbox
                  style={{ width: "80%" }}
                  maxLength={10}
                  onChange={(e) => {
                    const number = e.target.checked;
                    setIsLd(number);
                  }}
                >
                  Lead
                </Checkbox>
              )}
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setEarnLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[34, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setSickLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setCasualLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
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
                style={{ border: "1px solid #8692A6", borderRadius: "4px" }}
                onChange={(e) => {
                  const newVal = e.target.value;
                  setOptionalLeave(newVal);
                }}
              ></Input>
            </Form.Item>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "end",
            marginRight: "40px",
            marginTop: "13px",
          }}
        >
          <Space>
            <Button style={cancelStyle} onClick={cancel}>
              Cancel
            </Button>
            <Button style={buttonStyle} onClick={submitEdit}>
              Submit
            </Button>
          </Space>
        </div>
      </Form>
    </>
  );
}

export default Editemployee;
