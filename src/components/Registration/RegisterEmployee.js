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
  Form,
  Input,
  Modal,
  Radio,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import {
  capitalize,
  checkAlphabets,
  checkAlphabetsName,
  checkNoAlphabets,
  showNotification,
} from "../../contexts/CreateContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import "../../style/Onboarding.css";
import PrefixSelector from "./../PrefixSelector";

const { Option } = Select;

function RegisterEmployee(props) {
  const [accessList, setAccessList] = useState([]);
  const [orgHier, setOrgHier] = useState([]);
  const [editAccess, setEditAccess] = useState([false]);
  // const [form] = Form.useForm();
  // const [form1] = Form.useForm();
  const [value, setValue] = useState(1);
  const [bu, setBu] = useState(null);
  const [div, setDiv] = useState(null);
  const [dept, setDept] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  console.log("officialEmailofficialEmailofficialEmail", props?.officialEmail);
  const dateFormat = "DD-MM-YYYY";

  // useEffect(() => {
  //   getData();
  // }, []);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const disabledDate = (current) => {
    return current.isAfter(moment().subtract(14, "years"));
  };

  const disabledJoining = (current) => {
    return !current.isBetween(moment().subtract(50, "years"), moment());
  };

  // let domain = props.officialEmail.split("@")[1];

  // console.log("domain", domain);

  // const getData = async () => {
  //   let data = localStorage.getItem("OrgHier");
  //   setOrgHier(
  //     data
  //       ? JSON.parse(data)
  //       : Array(4).map((unit, i) => {
  //           return {
  //             name: "Default",
  //             description: "Default",
  //             parent: i == 0 ? null : Array(i).fill("Default").join("/"),
  //             type: order[i],
  //           };
  //         })
  //   );
  //   let temp = localStorage.getItem("OrgAccess");
  //   if (!temp) {
  //     localStorage.setItem("OrgAccess", "[]");
  //     // props.setIsStepFourInvalid(true);
  //     return;
  //   }
  //   let t = JSON.parse(temp);
  //   setAccessList(t);
  //   if (t.length == 0) {
  //     props.setIsStepFourInvalid(true);
  //   } else {
  //     props.setIsStepFourInvalid(false);
  //   }
  //   let array = [...t];
  //   setEditAccess(array.fill(false));
  // };

  const checkDesignation = (event) => {
    if (!/^[a-zA-Z-&() ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  // function addUseRole(values) {
  //   let temp = [
  //     ...accessList,
  //     {
  //       ...values,
  //       dob: values.dob?._isValid ? values.dob.format(dateFormat) : null,
  //       doj: values.doj?._isValid ? values.doj.format(dateFormat) : null,
  //       empId: values.empId,
  //     },
  //   ];
  //   localStorage.setItem("OrgAccess", JSON.stringify(temp));
  //   getData();
  //   form.resetFields();
  //   setAddAccess(false);
  // }

  // function editUseRole(values) {
  //   let temp = [...accessList];
  //   let editIndex = editAccess.indexOf(true);
  //   temp[editIndex] = {
  //     ...values,
  //     dob: values.dob?._isValid ? values.dob.format(dateFormat) : null,
  //     doj: values.doj?._isValid ? values.doj.format(dateFormat) : null,
  //   };
  //   localStorage.setItem("OrgAccess", JSON.stringify(temp));
  //   getData();
  //   setEditAccess([...editAccess].fill(false));
  //   form1.resetFields();
  // }

  // function onReset() {
  //   form.resetFields();
  //   form1.resetFields();
  //   setAddAccess(false);
  //   setBu(null);
  //   setDiv(null);
  //   setDept(null);
  // }

  // function onDelete(i) {
  //   Modal.confirm({
  //     title: "Are you sure, you want to delete this record?",
  //     okText: "Yes",
  //     okType: "danger",
  //     onOk: () => {
  //       let temp = accessList.filter((user, index) => !(index == i));
  //       localStorage.setItem("OrgAccess", JSON.stringify(temp));
  //       showNotification("success", "Success", "Successfully deleted");
  //       setAccessList(temp);
  //       getData();
  //     },
  //   });
  // }

  // const disabledDiv = () => {
  //   if (bu == null) {
  //     form.setFieldsValue({ division: null });
  //     form1.setFieldsValue({ division: null });
  //     return true;
  //   }
  //   return false;
  // };

  // const disabledDept = () => {
  //   if (div == null) {
  //     form.setFieldsValue({ department: null });
  //     form1.setFieldsValue({ department: null });
  //     return true;
  //   }
  //   return false;
  // };

  // const disabledTeam = () => {
  //   if (dept == null) {
  //     form.setFieldsValue({ team: null });
  //     form1.setFieldsValue({ team: null });
  //     return true;
  //   }
  //   return false;
  // };

  // const getOptions = (type) => {
  //   let temp = [];
  //   let place = order.indexOf(type);
  //   let par =
  //     place == 0
  //       ? null
  //       : bu + (place == 1 ? "" : "/" + div + (place == 2 ? "" : "/" + dept));
  //   orgHier.map((d) => {
  //     if (d.type == type && d.parent == par) {
  //       temp.push(<Option value={d.name}>{d.name}</Option>);
  //     }
  //   });

  //   return temp.length == 0
  //     ? [<Option value={"Default"}>Default</Option>]
  //     : temp;
  // };

  const generateEmpCode = () => {
    let res = accessList.length + 1;
    return props.preCode + ("000000" + res.toString()).slice(-6);
  };

  return (
    <>
      {/* {accessList.length == 3 ? null : ( */}
      <div>
        <Card
          className="mainAccess"
          title={
            <div
              style={{
                fontWeight: "600",
                fontSize: "16px",
                lineHeight: "17px",
                color: "rgba(0,0,0,0.85)",
                margin: "15px",
              }}
            >
              Access Details
            </div>
          }
          style={{
            background: "#FAFAFA",
            border: "1px solid #EAEAEA",
            borderRadius: "5px",
            margin: "40px",
          }}
        >
          {/* {addAccess ? ( */}
          <Form
            labelCol={{
              span: 5,
              offset: 3,
            }}
            wrapperCol={{
              span: 10,
              offset: 1,
            }}
            name="basic"
            form={props.form}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={(e) => props.registerCompany(e)}
            layout="horizontal"
          >
            <Card
              className="accessCard"
              title="User Details"
              bordered={false}
              style={{ background: "#FAFAFA" }}
            >
              <Form.Item
                className="userLabel"
                name="fName"
                colon={true}
                label="First Name::"
                onKeyPress={(event) => {
                  if (checkAlphabetsName(event)) {
                    event.preventDefault();
                  }
                }}
                style={{ width: "100%" }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z-\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}

                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Input
                  maxLength={20}
                  required
                  placeholder="First Name"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    props.form.setFieldsValue({
                      fName: caps,
                    });
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="mName"
                colon={true}
                label="Middle Name::"
                onKeyPress={(event) => {
                  if (checkAlphabetsName(event)) {
                    event.preventDefault();
                  }
                }}
                style={{ width: "100%" }}
                rules={[
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  maxLength={20}
                  placeholder="Middle Name"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    props.form.setFieldsValue({
                      mName: caps,
                    });
                  }}
                />
              </Form.Item>

              <Form.Item
                className="userLabel"
                name="lName"
                label="Last Name::"
                onKeyPress={(event) => {
                  if (checkAlphabetsName(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                  {
                    pattern: /^[a-zA-Z-\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Input
                  maxLength={20}
                  required
                  placeholder="Last Name"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  onChange={(e) => {
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    props.form.setFieldsValue({ lName: caps });
                  }}
                />
              </Form.Item>
              {/* <Form.Item
                    className="userLabel"
                    name="dob"
                    value="dob"
                    label="Date of Birth::"
                    onKeyPress={(event) => {
                      if (checkNoAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}
                    // labelCol={{
                    //   span: 3,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   offset: 1,
                    // }}
                  >
                    <DatePicker
                      format={dateFormat}
                      placeholder="Date of Birth"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "#ffffff",
                      }}
                      disabledDate={disabledDate}
                    />
                  </Form.Item> */}
              <Form.Item
                className="userLabel"
                name="phone"
                label="Phone Number::"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Phone Number",
                  },
                  {
                    pattern: /^[0-9]\d{9}$/,
                    message: "Please Enter Valid Number",
                  },
                ]}
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Input
                  addonBefore={<PrefixSelector name={"prefix"} />}
                  required
                  maxLength={10}
                  placeholder="Phone Number"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="gender"
                label="Gender::"
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Radio.Group
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                >
                  <Radio className="radio" value={"Male"}>
                    Male
                  </Radio>
                  <Radio className="radio" value={"Female"}>
                    Female
                  </Radio>
                  <Radio className="radio" value={"Other"}>
                    Other
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </Card>
            <Card
              className="accessCard"
              title="Employment Details"
              bordered={false}
              style={{ background: "#FAFAFA" }}
            >
              <Form.Item
                className="userLabel"
                name="empId"
                label="Employee ID::"
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Input
                  // defaultValue={props.officialEmail}
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                // initialValue={emailId}
                className="userLabel"
                name="email"
                label="Email Address::"
                // rules={[
                //   {
                //     required: true,
                //     message: "Please Enter Valid Email Address",
                //     type: "email",
                //     pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                //   },
                //   {
                //     validator: async (_, value) => {
                //       let exists = await CompanyProContext.checkUserExists(
                //         value
                //       );
                //       if (exists) {
                //         return Promise.reject(
                //           new Error("This email address already exists!")
                //         );
                //       }
                //       return Promise.resolve();
                //     },
                //   },
                //   {
                //     validator: (_, value) => {
                //       let domain = value.substring(value.indexOf("@") + 1);
                //       let valid = domain == props.compData.domain;
                //       if (!valid) {
                //         return Promise.reject(
                //           new Error("Please Enter Official Email Address")
                //         );
                //       }
                //       return Promise.resolve();
                //     },
                //   },
                // ]}
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                {/* {JSON.stringify(props?.officialEmail)} */}
                <Input
                  defaultValue={props?.officialEmail}
                  readOnly
                  maxLength={50}
                  required
                  placeholder="Email Addresss"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  // onChange={(e) => setEmailId(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="doj"
                value="doj"
                label="Date of Joining::"
                onKeyPress={(event) => {
                  if (checkNoAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <DatePicker
                  disabledDate={disabledJoining}
                  format={dateFormat}
                  placeholder="Date of Joining"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              {/* <Form.Item
                    initialValue={"Registered Office"}
                    className="userLabel"
                    name="pob"
                    label="Place of Business::"
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
                    // labelCol={{
                    //   span: 4,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   // offset: 1,
                    // }}
                  >
                    <Select
                      className="disabledOffice"
                      disabled
                      bordered={false}
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "rgba(0,0,0,0.1)",
                      }}
                    />
                  </Form.Item> */}
              <Form.Item
                className="userLabel"
                name="designation"
                label="Designation::"
                onKeyPress={(event) => {
                  if (checkDesignation(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter Designation",
                    pattern: /^[a-zA-Z-&()\s]*$/,
                  },
                ]}
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <Input
                  required
                  placeholder="Enter Designation"
                  style={{
                    width: "100%",
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
                    props.form.setFieldsValue({
                      designation: newVal,
                      designation: caps,
                    });
                  }}
                />
              </Form.Item>
              {/* <Form.Item
                    className="userLabel"
                    name="businessUnit"
                    label="Business Unit::"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Business Unit",
                      },
                    ]}
                    // labelCol={{
                    //   span: 3,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   offset: 1,
                    // }}
                  >
                    <Select
                      bordered={false}
                      placeholder="Select Business Unit"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "#ffffff",
                      }}
                      allowClear
                      onChange={(e) => {
                        setBu(e || null);
                        setDiv(null);
                        setDept(null);
                      }}
                    >
                      {getOptions("Business Unit")}
                    </Select>
                  </Form.Item> */}
              {/* <Form.Item
                    className="userLabel"
                    name="division"
                    label="Division::"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Division",
                      },
                    ]}
                    // initialValue={() => {
                    //   let temp = getOptions("Division")
                    //   temp.length == 1
                    // }}
                    // labelCol={{
                    //   span: 3,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   offset: 1,
                    // }}
                  >
                    <Select
                      disabled={disabledDiv()}
                      bordered={false}
                      placeholder="Select Division"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: disabledDiv()
                          ? "rgba(0,0,0,0.1)"
                          : "#ffffff",
                      }}
                      allowClear
                      onChange={(e) => {
                        setDiv(e || null);
                        setDept(null);
                      }}
                    >
                      {getOptions("Division")}
                    </Select>
                  </Form.Item> */}
              {/* <Form.Item
                    className="userLabel"
                    name="department"
                    label="Department::"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Department",
                      },
                    ]}
                    // labelCol={{
                    //   span: 3,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   offset: 1,
                    // }}
                  >
                    <Select
                      disabled={disabledDept()}
                      bordered={false}
                      placeholder="Select Department"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: disabledDept()
                          ? "rgba(0,0,0,0.1)"
                          : "#ffffff",
                      }}
                      allowClear
                      onChange={(e) => {
                        setDept(e || null);
                      }}
                    >
                      {getOptions("Department")}
                    </Select>
                  </Form.Item> */}
              {/* <Form.Item
                    className="userLabel"
                    name="team"
                    label="Team::"
                    rules={[
                      {
                        required: true,
                        message: "Please Select a Team",
                      },
                    ]}
                    // labelCol={{
                    //   span: 3,
                    //   offset: 5,
                    // }}
                    // wrapperCol={{
                    //   span: 9,
                    //   offset: 1,
                    // }}
                  >
                    <Select
                      disabled={disabledTeam()}
                      bordered={false}
                      placeholder="Select Team"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: disabledTeam()
                          ? "rgba(0,0,0,0.1)"
                          : "#ffffff",
                      }}
                      allowClear
                    >
                      {getOptions("Team")}
                    </Select>
                  </Form.Item> */}
              {/* <Form.Item
                      className="userLabel"
                      name="managerSupervisor"
                      label="Manager/Supervisor::"
                      // labelCol={{
                      //   span: 4,
                      //   offset: 5,
                      // }}
                      // wrapperCol={{
                      //   span: 9,
                      //   // offset: 1,
                      // }}
                    >
                      <Input
                        placeholder="default"
                        style={{
                          width: "100%",
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                          background: "#ffffff",
                        }}
                      />
                    </Form.Item> */}
              <Form.Item
                className="userLabel"
                name="note"
                label="Note::"
                // labelCol={{
                //   span: 3,
                //   offset: 5,
                // }}
                // wrapperCol={{
                //   span: 9,
                //   offset: 1,
                // }}
              >
                <TextArea
                  rows={4}
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
            </Card>
            {/* <Row>
                <Col
                  span={15}
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "end",
                  }}
                >
                  <Button
                    style={{
                      border: "1px solid #DFE2E8",
                      color: "#717171",
                      fontWeight: "400",
                      fontSize: "14px",
                      lineHeight: "17px",
                      width: "110px",
                      borderRadius: "4px",
                    }}
                    // onClick={onReset}
                  >
                    <CloseOutlined />
                    CANCEL
                  </Button>
                </Col>
                <Col>
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
                      marginLeft: "17%",
                    }}
                    onClick={() => form.submit()}
                  >
                    <CheckOutlined />
                    SAVE
                  </Button>
                </Col>
              </Row> */}
          </Form>
          {/* ) : (
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
                  return;
                }
                setAddAccess(true);
                setEditAccess([...editAccess].fill(false));
                setBu(null);
                setDiv(null);
                setDept(null);
              }}
            >
              <PlusCircleOutlined /> Add
            </Button>
          )} */}
        </Card>
      </div>
      {/* )} */}
    </>
  );
}

export default RegisterEmployee;
