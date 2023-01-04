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
  notification,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { getCountryCode } from "../contexts/CreateContext";
import CompanyProContext from "../contexts/CompanyProContext";
import {
  capitalize,
  checkNumbervalue,
  checkUpperCase,
} from "../contexts/CreateContext";
import "../style/Onboarding.css";

const { Option } = Select;

function AccessDetails(props) {
  const [addAccess, setAddAccess] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [orgHier, setOrgHier] = useState([]);
  const [editAccess, setEditAccess] = useState([false]);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [value, setValue] = useState(1);
  const [bu, setBu] = useState(null);
  const [div, setDiv] = useState(null);
  const [dept, setDept] = useState(null);
  const [team, setTeam] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  const [parent, setParent] = useState(null);
  const [codes, setCodes] = useState("");

  const dateFormat = "DD-MM-YYYY";

  useEffect(() => {
    getCountryCode().then((res) => {
      setCodes(res);
    });
    getData();
  }, []);

  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const disabledDate = (current) => {
    return current.isAfter(moment().subtract(20, "years"));
  };

  const disabledJoining = (current) => {
    return !current.isBetween(moment().subtract(35, "years"), moment());
  };

  const getData = async () => {
    let data = localStorage.getItem("OrgHier");
    setOrgHier(
      data
        ? JSON.parse(data)
        : Array(4).map((unit, i) => {
            return {
              name: "Default",
              description: "Default",
              parent: i == 0 ? null : Array(i).fill("Default").join("/"),
              type: order[i],
            };
          })
    );
    let temp = localStorage.getItem("OrgAccess");
    if (!temp) {
      localStorage.setItem("OrgAccess", "[]");
      props.setIsStepFourInvalid(true);
      return;
    }
    let t = JSON.parse(temp);
    setAccessList(t);
    if (t.length == 0) {
      props.setIsStepFourInvalid(true);
    } else {
      props.setIsStepFourInvalid(false);
    }
    let array = [...t];
    setEditAccess(array.fill(false));
  };

  const checkAlphabet = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkDesignation = (event) => {
    if (!/^[a-zA-Z-&() ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkAlphabetsName = (event) => {
    if (!/^[a-zA-Z-]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkNoAlphabets = (event) => {
    if (!/^[0-9-]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const handleOnChange = (value, event) => {
    console.log(value, event);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        allowClear={true}
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
        onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  function addUseRole(values) {
    let temp = [
      ...accessList,
      {
        ...values,
        dob: values.dob?._isValid ? values.dob.format(dateFormat) : null,
        doj: values.doj?._isValid ? values.doj.format(dateFormat) : null,
        empId: values.empId,
      },
    ];
    localStorage.setItem("OrgAccess", JSON.stringify(temp));
    getData();
    form.resetFields();
    setAddAccess(false);
  }

  function editUseRole(values) {
    let temp = [...accessList];
    let editIndex = editAccess.indexOf(true);
    temp[editIndex] = {
      ...values,
      dob: values.dob?._isValid ? values.dob.format(dateFormat) : null,
      doj: values.doj?._isValid ? values.doj.format(dateFormat) : null,
    };
    localStorage.setItem("OrgAccess", JSON.stringify(temp));
    getData();
    setEditAccess([...editAccess].fill(false));
    form1.resetFields();
  }

  function onReset() {
    form.resetFields();
    form1.resetFields();
    setAddAccess(false);
    setBu(null);
    setDiv(null);
    setDept(null);
    setTeam(null);
  }

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  function onDelete(i) {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        let temp = accessList.filter((user, index) => !(index == i));
        localStorage.setItem("OrgAccess", JSON.stringify(temp));
        showNotification("success", "Success", "Successfully deleted");
        setAccessList(temp);
        getData();
      },
    });
  }

  const disabledDiv = () => {
    if (bu == null) {
      form.setFieldsValue({ division: null });
      form1.setFieldsValue({ division: null });
      return true;
    }
    return false;
  };

  const disabledDept = () => {
    if (div == null) {
      form.setFieldsValue({ dept: null });
      form1.setFieldsValue({ dept: null });
      return true;
    }
    return false;
  };

  const disabledTeam = () => {
    if (dept == null) {
      form.setFieldsValue({ team: null });
      form1.setFieldsValue({ team: null });
      return true;
    }
    return false;
  };

  const getOptions = (type) => {
    let temp = [];
    let place = order.indexOf(type);
    let par =
      place == 0
        ? null
        : bu + (place == 1 ? "" : "/" + div + (place == 2 ? "" : "/" + dept));
    orgHier.map((d) => {
      if (d.type == type && d.parent == par) {
        temp.push(<Option value={d.name}>{d.name}</Option>);
      }
    });

    return temp.length == 0
      ? [<Option value={"Default"}>Default</Option>]
      : temp;
  };

  const generateEmpCode = () => {
    let res = accessList.length + 1;
    return props.preCode + ("00" + res.toString()).slice(-3);
  };

  return (
    <>
      {accessList != 0
        ? accessList.map((user, i) => (
            <Card
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
                display: "flex",
                flexDirection: "column",
                margin: "40px",
              }}
              extra={
                <>
                  {editAccess[i] === false ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        style={{
                          // marginLeft: "40px",
                          background: "#EEEEEE",
                          borderRadius: "10px",
                          width: "34px",
                        }}
                        onClick={() => {
                          let temp = [...editAccess].fill(false);
                          temp[i] = true;
                          setEditAccess(temp);
                          setBu(accessList[i].businessUnit || null);
                          setDiv(accessList[i].division || null);
                          setDept(accessList[i].dept || null);
                          setTeam(accessList[i].team || null);
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
                      <Button
                        style={{
                          marginLeft: "10px",
                          background: "#EEEEEE",
                          borderRadius: "10px",
                          width: "34px",
                        }}
                        onClick={() => {
                          onDelete(i);
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
                    </div>
                  ) : null}
                </>
              }
            >
              <Form
                colon={true}
                name="basic"
                form={form1}
                labelCol={{
                  span: 5,
                  offset: 3,
                }}
                wrapperCol={{
                  span: 10,
                  offset: 1,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                layout="horizontal"
                onFinish={(values) => editUseRole(values)}
              >
                {editAccess[i] ? (
                  <>
                    <Card
                      className="accessCard"
                      title="User Details"
                      bordered={false}
                      style={{ background: "#FAFAFA" }}
                    >
                      <Form.Item
                        initialValue={user ? user.fName : null}
                        className="userLabel"
                        name="fName"
                        colon={true}
                        label="First Name::"
                        onKeyPress={(event) => {
                          if (checkAlphabetsName(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter First Name",
                          },
                          {
                            pattern: /^[a-zA-Z-]*$/,
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
                          placeholder="First Name"
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
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            // setPaidBy(newVal);
                            form.setFieldsValue({
                              fName: newVal,
                              fName: caps,
                            });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.mName : null}
                        className="userLabel"
                        name="mName"
                        colon={true}
                        label="Middle Name::"
                        onKeyPress={(event) => {
                          if (checkAlphabet(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            pattern: /^[a-zA-Z\s]*$/,
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
                          placeholder="Middle Name"
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
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            // setPaidBy(newVal);
                            form.setFieldsValue({
                              mName: newVal,
                              mName: caps,
                            });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.lName : null}
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
                            pattern: /^[a-zA-Z-]*$/,
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
                          placeholder="Last Name"
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
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            // setPaidBy(newVal);
                            form.setFieldsValue({ lName: newVal, lName: caps });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={
                          moment(user?.dob, dateFormat)._isValid
                            ? moment(user?.dob, dateFormat)
                            : null
                        }
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
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.phone : null}
                        className="userLabel"
                        name="phone"
                        label="Phone Number::"
                        // labelCol={{
                        //   span: 3,
                        //   offset: 5,
                        // }}
                        // wrapperCol={{
                        //   span: 9,
                        //   offset: 1,
                        // }}
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
                          addonBefore={
                            <Form.Item
                              initialValue={user.prefix}
                              name="prefix"
                              noStyle
                            >
                              <Select
                                allowClear={true}
                                showSearch
                                bordered={false}
                                style={{
                                  width: 80,
                                  background: "#ffffff",
                                }}
                                onSelect={(value, event) =>
                                  handleOnChange(value, event)
                                }
                              >
                                {codes?.countries?.map((e) => (
                                  <Option key={e?.code} value={e?.code}>
                                    {e?.code}{" "}
                                  </Option>
                                ))}
                              </Select>
                            </Form.Item>
                          }
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
                        initialValue={user ? user.gender : null}
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
                        initialValue={user.empId}
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
                          placeholder="Employee ID"
                          style={{
                            width: "100%",
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
                        label="Email Address::"
                        // labelCol={{
                        //   span: 3,
                        //   offset: 5,
                        // }}
                        // wrapperCol={{
                        //   span: 9,
                        //   offset: 1,
                        // }}
                        rules={[
                          {
                            required: true,
                            message: "Please Enter Valid Email Address",
                            type: "email",
                            pattern:
                              "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                          },
                          {
                            validator: async (_, value) => {
                              let exists =
                                await CompanyProContext.checkUserExists(value);
                              if (exists) {
                                return Promise.reject(
                                  new Error(
                                    "This email address already exists!"
                                  )
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                          {
                            validator: (_, value) => {
                              let domain = value.substring(
                                value.indexOf("@") + 1
                              );
                              let valid = domain == props.domain;
                              if (!valid) {
                                return Promise.reject(
                                  new Error(
                                    "Please Enter Official Email Address"
                                  )
                                );
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
                          maxLength={50}
                          placeholder="Email Address"
                          style={{
                            width: "100%",
                            border: "1px solid #8692A6",
                            borderRadius: "4px",
                            background: "#ffffff",
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={
                          moment(user?.doj, dateFormat)._isValid
                            ? moment(user?.doj, dateFormat)
                            : null
                        }
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
                      <Form.Item
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
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.designation : null}
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
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            // setPaidBy(newVal);
                            form.setFieldsValue({
                              designation: newVal,
                              designation: caps,
                            });
                          }}
                        />
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.businessUnit : null}
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
                          allowClear
                          onChange={(e) => {
                            setBu(e || null);
                            setDiv(null);
                            setDept(null);
                            setTeam(null);
                          }}
                          bordered={false}
                          placeholder="Select Business Unit"
                          style={{
                            width: "100%",
                            border: "1px solid #8692A6",
                            borderRadius: "4px",
                            background: "#ffffff",
                          }}
                        >
                          {getOptions("Business Unit")}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.division : null}
                        className="userLabel"
                        name="division"
                        label="Division::"
                        rules={[
                          {
                            required: true,
                            message: "Please Select a Division",
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
                            setTeam(null);
                          }}
                        >
                          {getOptions("Division")}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.dept : null}
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
                            setTeam(null);
                          }}
                        >
                          {getOptions("Department")}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        initialValue={user ? user.team : null}
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
                          onChange={(e) => setTeam(e || null)}
                        >
                          {getOptions("Team")}
                        </Select>
                      </Form.Item>
                      {/* <Form.Item
                        initialValue={user ? user.managerSupervisor : null}
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
                        initialValue={user ? user.note : null}
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
                          className="text"
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
                  </>
                ) : (
                  <>
                    <Card
                      className="accessCardMap"
                      title="User Details"
                      bordered={false}
                      style={{ background: "#FAFAFA" }}
                    >
                      <div className="userMap" style={{ marginLeft: "9rem" }}>
                        <Row>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="First Name::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.fName}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Middle Name::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.mName}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Last Name::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.lName}</span>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Date of Birth::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.dob}</span>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Phone Number::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>
                                {(user.prefix ? user.prefix + " " : "") +
                                  user.phone}
                              </span>
                            </Form.Item>
                          </Col>

                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Gender::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.gender}</span>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                    <Card
                      className="accessCardMap"
                      title="Employment Details"
                      bordered={false}
                      style={{ background: "#FAFAFA" }}
                    >
                      <div className="userMap" style={{ marginLeft: "9rem" }}>
                        <Row>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Employee ID::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.empId}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Email Address::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.email}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Joining Date::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.doj}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Place of Business::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.pob}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Designation::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.designation}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Business Unit::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.businessUnit}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Division::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.division}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Department::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.dept}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Team::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.team}</span>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            {/* <Form.Item
                              label="Manager/Supervisor::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.managerSupervisor}</span>
                            </Form.Item> */}
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Note::"
                              // labelCol={{
                              //   span: 4,
                              //   offset: 5,
                              // }}
                              // wrapperCol={{
                              //   span: 9,
                              //   offset: 1,
                              // }}
                            >
                              <span>{user.note}</span>
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </>
                )}
                {editAccess[i] === true ? (
                  <Row>
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
                        onClick={() => {
                          setEditAccess([...editAccess].fill(false));
                          onReset();
                        }}
                      >
                        <CloseOutlined />
                        CANCEL
                      </Button>
                    </Col>
                    <Col>
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
                          marginLeft: "17%",
                        }}
                        onClick={() => {
                          form1.submit();
                        }}
                      >
                        <CheckOutlined />
                        SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Form>
            </Card>
          ))
        : null}

      {accessList.length == 3 ? null : (
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
            {addAccess ? (
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
                form={form}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={addUseRole}
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
                        pattern: /^[a-zA-Z-]*$/,
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
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        // setPaidBy(newVal);
                        form.setFieldsValue({
                          fName: newVal,
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
                      if (checkAlphabet(event)) {
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
                      placeholder="Middle Name"
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
                        form.setFieldsValue({
                          mName: newVal,
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
                        pattern: /^[a-zA-Z-]*$/,
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
                  </Form.Item>
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
                      addonBefore={prefixSelector}
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
                    initialValue={generateEmpCode()}
                    className="userLabel"
                    name="empId"
                    label="Employee ID::"
                    onKeyPress={(event) => {
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
                      className="disabledOffice"
                      disabled
                      maxLength={20}
                      placeholder="Employee ID"
                      style={{
                        width: "100%",
                        border: "1px solid #8692A6",
                        borderRadius: "4px",
                        background: "rgba(0,0,0,0.1)",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="userLabel"
                    name="email"
                    label="Email Address::"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Valid Email Address",
                        type: "email",
                        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                      },
                      {
                        validator: async (_, value) => {
                          let exists = await CompanyProContext.checkUserExists(
                            value
                          );
                          if (exists) {
                            return Promise.reject(
                              new Error("This email address already exists!")
                            );
                          }
                          return Promise.resolve();
                        },
                      },
                      {
                        validator: (_, value) => {
                          let domain = value.substring(value.indexOf("@") + 1);
                          let valid = domain == props.domain;
                          if (!valid) {
                            return Promise.reject(
                              new Error("Please Enter Official Email Address")
                            );
                          }
                          return Promise.resolve();
                        },
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
                      maxLength={50}
                      required
                      placeholder="Email Address"
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
                  <Form.Item
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
                  </Form.Item>
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
                        setTeam(null);
                      }}
                    >
                      {getOptions("Business Unit")}
                    </Select>
                  </Form.Item>
                  <Form.Item
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
                        setTeam(null);
                      }}
                    >
                      {getOptions("Division")}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    className="userLabel"
                    name="dept"
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
                        setTeam(null);
                      }}
                    >
                      {getOptions("Department")}
                    </Select>
                  </Form.Item>
                  <Form.Item
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
                      onChange={(e) => setTeam(e || null)}
                    >
                      {getOptions("Team")}
                    </Select>
                  </Form.Item>
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
                <Row>
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
                      onClick={onReset}
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
                </Row>
              </Form>
            ) : (
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
                  setTeam(null);
                }}
              >
                <PlusCircleOutlined /> Add
              </Button>
            )}
          </Card>
        </div>
      )}
    </>
  );
}

export default AccessDetails;
