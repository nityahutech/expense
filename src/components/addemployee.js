import { useEffect, useState } from "react";
import {
  Col,
  Row,
  Form,
  Button,
  Input,
  DatePicker,
  Select,
  Space,
  Modal,
  AutoComplete,
} from "antd";
import "../style/Documents.css";
import "../style/addEmployee.css"
import moment from "moment";
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
import Papa from 'papaparse';
import EmpInfoContext from "../contexts/EmpInfoContext";
import { DownloadOutlined } from "@ant-design/icons";
import PrefixSelector from "./PrefixSelector";

const { Option } = Select;

function AddEmployee() {
  const page = "addemployeePage";
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const compId = sessionStorage.getItem("compId");
  const [place, setPlace] = useState(null);
  const [designations, setDesignations] = useState([]);
  const [orgHier, setOrgHier] = useState([]);
  const [codes, setCodes] = useState("");
  const [errorFile, setErrorFile] = useState(null);
  const [configurations, setConfigurations] = useState([]);
  const [workLoc, setWorkLoc] = useState(null);
  const [allEmp, setAllEmp] = useState(null);
  const [allEmpName, setAllEmpName] = useState(null);
  const [domain, setDomain] = useState("");
  const [preCode, setPreCode] = useState("");
  const [bu, setBu] = useState(null);
  const [div, setDiv] = useState(null);
  const [dept, setDept] = useState(null);
  const [team, setTeam] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  const [options, setOptions] = useState([]);
  const [enableBulk, setEnableBulk] = useState(false);
  const [bulkModal, openBulkModal] = useState(false);
  const [heads, setHeaders] = useState([]);
  const template = [
    ["Employee ID", "First Name", "Middle Name", "Last Name", "Date Of Birth", "Phone Number", "Gender", "Employee Type", "Official Email Id", "Personal Email Id", "Date Of Joining", "Work Location", "Designation", "Reporting Manager", "Secondary Manager", "Team Lead", "Business Unit", "Division", "Department", "Team", "Note"],
    ["EMP000001", "Rohit", "Ram", "Sharma", "YYYY-MM-DD", "1234567890", "Male/Female", "Full-Time/Part-Time/Contract-Basis/Intern", "email_handle@domain.com", "email_handle@domain.com", "YYYY-MM-DD", "Work Location", "Designation", "Reporting Manager", "Secondary Manager", "Team Lead", "Business Unit", "Division", "Department", "Team", "Note"] 
  ]

  const showBulkModal = () => {
    openBulkModal(true);
  };
  const handleBulkModal = () => {
    openBulkModal(false);
  };
  const handleCancel = () => {
    openBulkModal(false);
  };

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
    setAllEmpName(allUsers);
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
      // height: 45,
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
    setAllEmp([]);
    setEnableBulk(false)
    getData();
    getAllUser();
  }, []);
  
  const disabledDiv = () => {
    if (bu == null) {
      form.setFieldsValue({ division: null });
      return true;
    }
    return false;
  };

  const disabledDept = () => {
    if (div == null) {
      form.setFieldsValue({ department: null });
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
    setPreCode(temp.precode)
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

  const disabledDate = (current) => {
    return current.isAfter(moment().subtract(14, "years"));
  };

  const disabledJoining = (current) => {
    return !current.isBetween(moment().subtract(50, "years"), moment());
  };
  const onFinish = (values) => {
    values.name =
      values.fname + (values.mname ? ` ${values.mname} ` : " ") + values.lname;
      values.doj = values.doj.format("DD-MM-YYYY") || null
    createUser(values, compId)
      .then((response) => {
        showNotification("success", "Success", "Employee Created");
        navigate("/Employee/EmployeeList");
      })
      .catch((error) =>{
        console.log(error.message)
        showNotification("error", "Error", "This user already exists!")
      });
  };

  const handleBulkOnboard = () => {
    // let officialEmail = heads.indexOf("Offical Email Id");
    // let ids = allEmp.map(x => x[officialEmail])
    // ids.shift()
    // console.log(ids)
    // deleteUsers(ids)
    let temp = [...allEmp];
    let headers = heads;
    let firstName = headers.indexOf("First Name");
    let middleName = headers.indexOf("Middle Name");
    let lastName = headers.indexOf("Last Name");
    let id = headers.indexOf("Employee ID");
    let officialEmail = headers.indexOf("Offical Email Id");
    let contactEmail = headers.indexOf("Personal Email Id");
    let dob = headers.indexOf("Date of Birth");
    let doj = headers.indexOf("Date of Joining");
    let phone = headers.indexOf("Phone Number");
    let gender = headers.indexOf("Gender");
    let des = headers.indexOf("Designation");
    let empType = headers.indexOf("Employee Type");
    let workLocation = headers.indexOf("Work Location");
    let repManager = headers.indexOf("Reporting Manager");
    let secManager = headers.indexOf("Secondary Manager");
    let lead = headers.indexOf("Team Lead");
    let bu = headers.indexOf("Business Unit");
    let div = headers.indexOf("Division");
    let dept = headers.indexOf("Department");
    let team = headers.indexOf("Team");
    let role = headers.indexOf("Role");
    let note = headers.indexOf("Note");
    temp.forEach(((emp, i) => {
      let temp = {
        empId: emp[id],
        fname: emp[firstName],
        mname: emp[middleName],
        lname: emp[lastName],
        name: emp[firstName] + (emp[middleName] ? ` ${emp[middleName]} ` : " ") + emp[lastName],
        doj: emp[doj],
        dob: emp[dob],
        mailid: emp[officialEmail],
        email: emp[contactEmail],
        phone: emp[phone],
        gender: emp[gender],
        designation: emp[des],
        // role: emp[role]? emp[firstName] :
        //   (emp[firstName].includes("Admin")
        //     ? "admin"
        //     : "emp"),
        empType: emp[empType],
        repManager: emp[repManager] || "",
        secManager: emp[secManager] || "",
        lead: emp[lead] || "",
        businessUnit: emp[bu],
        department: emp[div],
        division: emp[dept],
        team: emp[team],
        workLocation: emp[workLocation],
        remark: emp[note] || "",
      }
      createUser(temp, compId).then(res => {
        if(i == temp.length-1) {
          showNotification("success", "Success", "Bulk Onboarding Complete!")
        }
      })
    }))
    setEnableBulk(false);
  };

  const validateCSV = async (data, headers, model) => {
    let errors = [["Email Id", "Field", "Error"]];
    let emps = allEmpName.map((ex) => { return ex.value })
    let firstName = headers.indexOf("First Name");
    let middleName = headers.indexOf("Middle Name");
    let lastName = headers.indexOf("Last Name");
    let id = headers.indexOf("Employee ID");
    let officialEmail = headers.indexOf("Offical Email Id");
    let contactEmail = headers.indexOf("Personal Email Id");
    let dob = headers.indexOf("Date of Birth");
    let doj = headers.indexOf("Date of Joining");
    let phone = headers.indexOf("Phone Number");
    let gender = headers.indexOf("Gender");
    let empType = headers.indexOf("Employee Type");
    let des = headers.indexOf("Designation");
    let workLocation = headers.indexOf("Place of Business");
    let repManager = headers.indexOf("Reporting Manager");
    let secManager = headers.indexOf("Secondary Manager");
    let lead = headers.indexOf("Team Lead");
    let bu = headers.indexOf(order[0]);
    let div = headers.indexOf(order[1]);
    let dept = headers.indexOf(order[2]);
    data.forEach(async (emp, i) => {
      if(i == data.length-1) { return; }
      emp.forEach((field, i) => {emp[i] = field.trim()})
      emp[firstName] = emp[firstName].split(" ").map(x => capitalize(x.toLowerCase())).join(" ");
      emp[middleName] = emp[middleName] ? emp[middleName].split(" ").map(x => capitalize(x.toLowerCase())).join(" ") : null;
      emp[lastName] = emp[lastName].split(" ").map(x => capitalize(x.toLowerCase())).join(" ");
      emp[gender] = capitalize(emp[gender].toLowerCase());
      emp[empType] = emp[empType].split("-").map(x => capitalize(x.toLowerCase())).join("-");
      // emp[phone] = emp[phone].contains("+");
      // try {
      order.forEach((type, place) => {
        let value = emp[headers.indexOf(type)];
        let par =
          place == 0
            ? null : emp[bu] + (place == 1
              ? "" : "/" + emp[div] + (place == 2 
                ? "" : "/" + emp[dept]));
        let orgValid = orgHier.filter((d) => d.name == value && d.type == type && d.parent == par);
        if (orgValid.length == 0) { errors.push([emp[officialEmail], type, `${value} does not exist!`]); }
      })
      let idExists = await EmpInfoContext.idExists(emp[id]);
      if (idExists) { errors.push([emp[officialEmail], "Employee ID", "This employee code already exists!"]); }
      let valid = /^[a-zA-Z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emp[officialEmail]);
      if (!valid) { errors.push([emp[officialEmail], "Offical Email Id", "Invalid email address!"]); }
      let emailDomain = emp[officialEmail].substring(emp[officialEmail].indexOf("@") + 1);
      valid = domain == emailDomain;
      if (!valid) { errors.push([emp[officialEmail], "Offical Email Id", "Official email required!"]); }
      let exists = await CompanyProContext.checkUserExists(emp[officialEmail]);
      if (exists) { errors.push([emp[officialEmail], "Offical Email Id", "This email already exists!"]); }
      let contactValid = /^[a-zA-Z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(emp[contactEmail]);
      if (!contactValid) { errors.push([emp[officialEmail], "Personal Email Id", "Invalid contact email address!"]); }
      let validPhone = emp[phone].length == 10
      if (!validPhone) {errors.push([emp[officialEmail], "Phone Number", "Invalid phone number!"]); }
      let validDoj = disabledJoining(moment(emp[doj], "YYYY-MM-DD"))
      let validDob = disabledDate(moment(emp[dob], "YYYY-MM-DD"))
      if (validDob || validDoj) { errors.push([emp[officialEmail], "DOB/DOJ", `Invalid ${validDob ? "DOB " + emp[dob] + (validDoj ? " & DOJ " + emp[doj] : "") : "DOJ " + emp[doj]}`]); };
      let desVaild = designations.includes(emp[des])
      if (!desVaild) { errors.push([emp[officialEmail], "Designation", "Designation Does Not Exist"]); }
      let locVaild = workLoc.includes(emp[workLocation])
      if (!locVaild) { errors.push([emp[officialEmail], "Work Location", "Work Location Does Not Exist"]); }
      if (repManager != -1) {
        let repManExists = emp[repManager] == "" || emps.includes(emp[repManager])
        if (!repManExists) { errors.push([emp[officialEmail], "Reporting Manager", "Reporting Manager Does Not Exist"]); }
      }
      if (secManager != -1) {
        let secManExists = emp[secManager] == "" || emps.includes(emp[secManager])
        if (!secManExists) { errors.push([emp[officialEmail], "Secondary Manager", "Secondary Manager Does Not Exist"]); }
      }
      if (lead != -1) {
        let leadExists = emp[lead] == "" || emps.includes(emp[lead])
        if (!leadExists) { errors.push([emp[officialEmail], "Lead", "Lead Does Not Exist"]); }
      }
    })
    if(data[data.length-1].length == 1) {
        data.pop()
    }
    setErrorFile(null)
    const timer = setTimeout(() => {
      if (errors.length > 1) {
        showNotification("error", "Error", "Please correct errors in upload file!")
        setErrorFile(<Button style={{marginRight: "10px"}} onClick={() => downloadFile(errors)}> Download Error File</Button>)
        return;
      }
      showNotification("success", "Success", "All Fields Valid!")
      setAllEmp(data)
      setHeaders(headers)
      setEnableBulk(true)
    }, [5000])
  }

  const downloadFile = (errors) => {
    const csv = Papa.unparse(errors);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'errorFile.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  // const prefixSelector = (
  //   <Form.Item name="prefix" 
  //   noStyle
  //   >
  //     <Select
  //       allowClear={true}
  //       showSearch
  //       bordered={false}
  //       style={{
  //         width: 70,
  //         background: "#ffffff",
  //         borderRadius: "4px"
  //       }}
  //     >
  //       {codes?.countries?.map((e) => (
  //         <Option key={e?.code} value={e?.code}>
  //           {e?.code}{" "}
  //         </Option>
  //       ))}
  //     </Select>
  //   </Form.Item>
  // );

  return (
    <>
      <div className="addEmpFormDiv" >
        <Form
          className="addEmp"
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
            className="buttonRowEmp"
            gutter={[16, 16]}
          >
            <Col
              // xs={{ span: 24 }}
              // sm={{ span: 24 }}
              // md={{span:6}}
              // lg={{span:6}}
              // xl={{span:4}}
              // xxl={{span:6}}

            >
              <Button
                className="listEmployee"
                type="default"
                onClick={handleListEmployee}
              >
                Employee List
              </Button>
            </Col>
            <Col
                // xs={{ span: 24 }}
                // sm={{ span: 24 }}
                // md={{span:6}}
            >
            <Button 
              className="bulkEmployee"
              type="primary" 
              onClick={showBulkModal}
            >
              <div className="bulkButton">Bulk Employee Onboarding</div>
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
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ fname: caps });
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
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ mname: caps });
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
                    const str = e.target.value;
                    const caps = str.split(" ").map(capitalize).join(" ");
                    form.setFieldsValue({ lname: caps });
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
                    message: "Please Enter Email Id",
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
                  addonBefore={(<PrefixSelector />)}
                  maxLength={10}
                  required
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
                <Select
                  bordered={false}
                  placeholder="Select a Designation"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  onChange={(e) => setPlace(e)}
                >
                  {designations?.map((des) => (
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
                  placeholder="Select Employee Type"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                >
                  <Option value="Full-Time">Full-Time</Option>
                  <Option value="Part-Time">Part-Time</Option>
                  <Option value="Contract-Basis">Contract-Basis</Option>
                  <Option value="Intern">Intern</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
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
                <DatePicker
                  format={"DD-MM-YYYY"}
                   disabledDate={disabledJoining}
                  placeholder="Choose Date"
                  style={{
                    width: "100%",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff"
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="workLocation"
                label="Work Loaction"
                rules={[
                  {
                    required: true,
                    message: "Please enter Location",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  placeholder="Select a Location"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                >
                  {workLoc?.map((des) => (
                    <Option value={des}>{des}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="businessUnit"
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
                name="division"
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
                name="department"
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
            <Col span={24} classsname="gutter-row">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Space>
                  <Form.Item>
                    <Button
                      style={{
                        border: "1px solid #1963A6",
                        color: "#1963A6",
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
                        border: "1px solid #1963A6",
                        background: "#1963A6",
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
      <Modal
       title="Basic Modal" 
       open={bulkModal} 
       onOk={handleBulkModal} 
       onCancel={handleCancel}
       footer={false}
       className="bulkOnboardingModal"
       closeIcon={
        <div
            onClick={() => {
              openBulkModal(false);
            }}
            style={{ color: "#ffffff" }}
        >
            X
        </div>
    }
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
            <Col>
              <Button style={{marginBottom: "10px"}} onClick={() => downloadFile(template)}> 
                <DownloadOutlined />
                Download File Template
              </Button>
            </Col>
            <Col>
              <CSVReader
                onUploadAccepted={(results) => {
                  let temp = [...results.data];
                  let headers = temp.shift();
                  let model = temp.shift();
                  validateCSV(temp, headers, model);
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
                        {!acceptedFile && setEnableBulk(false)}
                        {!acceptedFile && setErrorFile(null)}
                      </div>
                      <button {...getRemoveFileProps()} style={styles.remove}>
                        Remove
                      </button>
                    </div>
                    <ProgressBar style={styles.progressBarBackgroundColor} />
                  </>
                )}
              </CSVReader>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 12 }}
              md={{ span: 24 }}
              className="Col-1-center"
              style={{
                background: "",
                height: "50px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            > 
              {errorFile}
              <Button
                className="listExpense"
                disabled={!enableBulk}
                type="primary"
                onClick={handleBulkOnboard}
                style={{
                  // cursor: "pointer",
                  backgroundColor: "#1963A6",
                  borderRadius: "5px",
                  color:'#ffff'
                }}
              >
                Bulk Onboard Emloyees
              </Button>
            </Col>
          </Row>
      </Modal>
    </>
  );
}
export default AddEmployee;
