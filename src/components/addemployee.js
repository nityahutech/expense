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
  AutoComplete,
} from "antd";
import "../style/Documents.css";
import { useNavigate } from "react-router-dom";
import {
  capitalize,
  checkAlphabets,
  createUser,
  getUsers,
  showNotification,
} from "../contexts/CreateContext";
import { getCountryCode } from "../contexts/CreateContext";
import ConfigureContext from "../contexts/ConfigureContext";
import CompanyProContext from "../contexts/CompanyProContext";
import { useCSVReader } from "react-papaparse";
const { Option } = Select;
function AddEmployee(props) {
  const page = "addemployeePage";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const compId = sessionStorage.getItem("compId");
  const [place, setPlace] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [orgHier, setOrgHier] = useState([]);
  const [codes, setCodes] = useState("");
  const [configurations, setConfigurations] = useState([]);
  const [workLoc, setWorkLoc] = useState(null);
  const [allEmp, setAllEmp] = useState(null);
  const [allEmpName, setAllEmpName] = useState(null);
  const [data, setData] = useState();
  const [parent, setParent] = useState(null);
  const [dataSource, setDataSource] = useState([]);
  const [selectInput, setSelectInput] = useState({
    div: true,
    depart: true,
    team: true,
  });
  const [domain, setDomain] = useState("");
  const [bu, setBu] = useState(null);
  const [div, setDiv] = useState(null);
  const [dept, setDept] = useState(null);
  const [team, setTeam] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  const [options, setOptions] = useState([]);

  const onSearch = (searchText) => {
    let matchingName = allEmpName.filter((ex) => { return ex.value.toLowerCase().includes(searchText.toLowerCase()) })
    setOptions(
      !searchText ? [] : matchingName,
    );
  };

  const getAllUser = async () => {
    const allData = await getUsers();
    let allUsers = allData.docs.map((doc, i) => {
      return {
        value: doc.data().fname + ' ' + doc.data().lname,
      };
    });
    setAllEmpName(allUsers)
    getData(allUsers);

  }
  const { CSVReader } = useCSVReader();
  const styles = {
    csvReader: {
      display: "flex",
      flexDirection: "row",
      marginBottom: 10,
    },
    browseFile: {
      width: "20%",
    },
    acceptedFile: {
      border: "1px solid #ccc",
      height: 45,
      lineHeight: 2.5,
      paddingLeft: 10,
      width: "80%",
    },
    remove: {
      borderRadius: 0,
      padding: "0 20px",
    },
    progressBarBackgroundColor: {
      backgroundColor: "red",
    },
  };

  useEffect(() => {
    getData();
    getAllUser();
  }, []);
  
  const disabledDiv = () => {
    if (bu == null) {
      form.setFieldsValue({ div: null });
      return true;
    }
    return false;
  };

  const disabledDept = () => {
    if (div == null) {
      form.setFieldsValue({ dept: null });
      return true;
    }
    return false;
  };

  const disabledTeam = () => {
    if (dept == null) {
      form.setFieldsValue({ team: null });
      return true;
    }
    return false;
  };

  const getOptions = (type) => {
    let temp = [];
    let place = order.indexOf(type);
    let par =
      place == 0
        ? null : bu + (place == 1
          ? "" : "/" + div + (place == 2 
            ? "" : "/" + dept));
    orgHier.map((d) => {
      if (d.type == type && d.parent == par) {
        temp.push(<Option value={d.name}>{d.name}</Option>);
      }
    });
    return temp.length == 0 ? [(<Option value={"Default"}>Default</Option>)] : temp;
  };

  const getData = async () => {
    let temp = await CompanyProContext.getCompanyProfile(compId);
    let data = await ConfigureContext.getConfigurations(page);
    getCountryCode().then((res) => {
      setCodes(res);
    });
    let add = ["Registered Office"];
    if (Object.keys(temp.corpOffice) != 0) {
      add.push("Corporate Office");
    }
    temp.address?.map((rec) => {
      add.push(rec.title);
    });
    setOrgHier(temp.departments);
    setDomain(temp.domain);
    setWorkLoc(add);
    setConfigurations(data);
    setDesignations(Object.keys(data.designations));
  };
  const handleListEmployee = () => {
    navigate("/Employee/EmployeeList");
  };
  function onReset() {
    form.resetFields();
  }
  const onFinish = (values) => {
    values.name =
      values.fname + (values.mname ? ` ${values.mname} ` : " ") + values.lname;
    createUser(values, compId)
      .then((response) => {
        showNotification("success", "Success", "Employee Created");
        navigate("/Employee/EmployeeList");
      })
      .catch((error) =>
        showNotification("error", "Error", "This user already exists!")
      );
  };

  const handleBulkOnboard = () => {
    // console.log(allEmp);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        allowClear={true}
        showSearch
        bordered={false}
        style={{
          width: 70,
          background: "#ffffff",
        }}
        // onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

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
            <Col
            // style={{
            //   background: "",
            //   height: "50px",
            //   display: "flex",
            //   justifyContent: "flex-start",
            // }}
            >
              {/* <CSVReader
                onUploadAccepted={(results) => {
                  console.log("---------------------------");
                  console.log(results);
                  console.log("---------------------------");
                }}
              >
                {({
                  getRootProps,
                  acceptedFile,
                  ProgressBar,
                  getRemoveFileProps,
                }) => (
                  <>
                    <div style={styles.csvReader}>
                      <button
                        type="button"
                        {...getRootProps()}
                        style={styles.browseFile}
                      >
                        Browse file
                      </button>
                      <div style={styles.acceptedFile}>
                        {acceptedFile && acceptedFile.name}
                      </div>
                      <button {...getRemoveFileProps()} style={styles.remove}>
                        Remove
                      </button>
                    </div>
                    <ProgressBar style={styles.progressBarBackgroundColor} />
                  </>
                )}
              </CSVReader> */}
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
                      let emailDomain = value.substring(value.indexOf("@") + 1);
                      let valid = domain == emailDomain;
                      if (!valid) {
                        return Promise.reject(
                          new Error("Please Enter Official Email Address")
                        );
                      }
                      return Promise.resolve();
                    },
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
                  addonBefore={prefixSelector}
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
                  <Option value="Other">Other</Option>
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
                {/* <Input.Group> */}
                <Select
                  bordered={false}
                  placeholder="Select a Designation"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    // width: "75%"
                  }}
                  onChange={(e) => setPlace(e)}
                >
                  {designations?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
                {/* <Select
                  bordered={false}
                  disabled={place == null}
                  defaultValue={1}
                  placeholder="Select a Grade"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    width: "25%"
                  }}
                > 
                  {  
                    [...Array(Number(designations?.[`${place}`] || 1)).keys()]?.map((grade) => (
                    <Option value={grade+1}>{grade+1}</Option>
                  ))}
                </Select>
              </Input.Group> */}
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
                  <Option value="Contract-Basis">Contract-Basis</Option>
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
                <AutoComplete
                  bordered={false}
                  options={options}
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  onSearch={onSearch}
                  placeholder="Enter Reporting Manager Name"
                />
                {/* <Select
                  // showSearch
                  placeholder="Select a Manager"
                  style={{
                  }}
                  // optionFilterProp="children"
                  //   onChange={onChange}
                  //   onSearch={onSearch}
                  // filterOption={(input, option) =>
                  //   option.children.toLowerCase().includes(input.toLowerCase())
                  // }
                >
                  {configurations?.repManager?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select> */}
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
                <AutoComplete
                  bordered={false}
                  options={options}
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  onSearch={onSearch}
                  placeholder="Enter Secondary Manager Name"
                />
                {/* <Select
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
                  {configurations?.secManager?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select> */}
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
                <AutoComplete
                  bordered={false}
                  options={options}
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  onSearch={onSearch}
                  placeholder="Enter Lead Name"
                />
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
                    form.setFieldsValue({ lead: newVal, lead: caps });
                  }}
                  placeholder="Enter Lead Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                /> */}
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

            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="bu"
                label="Business Unit"
                rules={[
                  {
                    required: true,
                    message: "Choose Business Unit",
                  },
                ]}
              >
                <Select
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  bordered={false}
                  placeholder="Select Business Unit"
                  allowClear
                  onChange={(e) => {
                    setBu(e || null);
                    setDiv(null);
                    setDept(null);
                    setTeam(null)
                  }}
                >
                  {getOptions("Business Unit")}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="div"
                label="Division"
                rules={[
                  {
                    required: true,
                    message: "Choose Division",
                  },
                ]}
              >
                <Select
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: disabledDiv()
                      ? "rgba(0,0,0,0.1)"
                      : "#ffffff",
                  }}
                  disabled={disabledDiv()}
                  bordered={false}
                  placeholder="Select Division"
                  allowClear
                  onChange={(e) => {
                    setDiv(e || null);
                    setDept(null);
                    setTeam(null)
                  }}
                >
                  {getOptions("Division")}
                </Select>
              </Form.Item>
            </Col>

            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="dept"
                label="Department"
                rules={[
                  {
                    required: true,
                    message: "Choose Department",
                  },
                ]}
              >
                <Select
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: disabledDept()
                      ? "rgba(0,0,0,0.1)"
                      : "#ffffff",
                  }}
                  disabled={disabledDept()}
                  bordered={false}
                  placeholder="Select Department"
                  allowClear
                  onChange={(e) => {
                    setDept(e || null);
                    setTeam(null)
                  }}
                >
                  {getOptions("Department")}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="team"
                label="Team"
                rules={[
                  {
                    required: true,
                    message: "Choose Team",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: disabledTeam()
                      ? "rgba(0,0,0,0.1)"
                      : "#ffffff",
                  }}
                  disabled={disabledTeam()}
                  placeholder="Select Team"
                  allowClear
                  onChange={(e) => setTeam(e || null)}
                >
                  {getOptions("Team")}
                </Select>
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
