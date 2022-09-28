import React, { useState, useEffect } from "react";
import {
  Tabs,
  Layout,
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
} from "antd";
import "../style/AttendanceLog.css";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import AttendanceContext from "../contexts/AttendanceContext";
import ProfileContext from "../contexts/ProfileContext";
const { RangePicker } = DatePicker;

const { Content } = Layout;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};
const dateFormat = "DD-MM-YYYY";

function AttendanceLog({ empDetails }) {
  const [monthlydata, setMonthlydata] = useState([]);
  const [allEmp, setallEmp] = useState([]);
  const [role, setRole] = useState(empDetails);
  const [selectemp, setSelectemp] = useState(null);
  const [activetab, setActivetab] = useState("1");
  console.log(activetab);
  const { currentUser } = useAuth();
  const [key, setKey] = useState("1");
  const [empMonthly, setEmpMonthly] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [filteredEmp, setFilteredEmp] = useState([]);
  const columns = [
    {
      title: "Employee Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
    // {
    //   title: "Date",
    //   dataIndex: "date",
    //   key: "date",
    // },
    {
      title: "Employee Name",
      dataIndex: "name",
      key: "nFname",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },

    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
      ellipsis: true,
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];

  const [form] = Form.useForm();

  function getFormateDateString() {
    return (
      (new Date().getDate() > 9
        ? new Date().getDate()
        : "0" + new Date().getDate()) +
      "-" +
      (new Date().getMonth() + 1 > 9
        ? new Date().getMonth() + 1
        : "0" + (new Date().getMonth() + 1)) +
      "-" +
      new Date().getFullYear()
    );
  }
  function getFormatTimeString() {
    return (
      (new Date().getHours() > 9
        ? new Date().getHours()
        : "0" + new Date().getHours()) +
      ":" +
      (new Date().getMinutes() > 9
        ? new Date().getMinutes()
        : "0" + new Date().getMinutes()) +
      ":" +
      (new Date().getSeconds() > 9
        ? new Date().getSeconds()
        : "0" + new Date().getSeconds())
    );
  }

  const onFinish = async (values) => {
    console.log(values);
    const newData = {
      // code: "898",
      // date: getFormateDateString(),
      // status: "-_",
      // time1: getFormatTimeString(),
      // time2: "18:15:23",
      // work: "-",
      report: values?.project_details || "-",
      project: values?.project_name || "-",
    };
    console.log(currentUser.uid, { monthlydata });
    AttendanceContext.updateAttendance(currentUser.uid, newData);
    // let newAlldata = [newData, ...empMonthly];
    // console.log(newAlldata);
    // localStorage.setItem("newReport", JSON.stringify(newAlldata));
    setActivetab("1");
    //create new report obj with required data + ""
    //create newMonthlyAll=new+old monthly
    //set local with newMonthlyAll
    //set state for monthly with newMonthlyAll
  };
  useEffect(() => {
    getEmpDetails(currentUser.uid);
    // getEmpMonthly();
  }, [activetab]);
  async function getEmpDetails(id) {
    let data = await AttendanceContext.getAllAttendance(id);
    let d = data.docs.map((doc) => {
      return {
        ...doc.data(),
        id: doc.id,
      };
    });
    console.log(d);
    setEmpMonthly(d);
  }
  // function getEmpMonthly() {
  //   console.log(JSON.parse(localStorage.getItem("newReport")));
  //   let userlocal = JSON.parse(localStorage.getItem("newReport")) || [];
  //   let newEmp = [];
  //   userlocal.map((emp, i) => {
  //     newEmp.push({
  //       key: i,

  //       code: emp.code,
  //       date: emp.date,
  //       empname: "Nitya-" + (i + 1),
  //       status: emp.status,
  //       time1: emp.time1,
  //       time2: emp.time2,
  //       work: emp.work,
  //       report: emp.report,
  //       project: emp.project,
  //     });
  //   });
  //   console.log({ newEmp });
  //   setEmpMonthly(newEmp);
  //   // setallEmp(newEmp);
  // }

  async function allEmpDetails() {
    // console.log(JSON.parse(localStorage.getItem("newReport")));
    let userdata = await AttendanceContext.getAllUsers();
    let res = userdata.docs.map((doc) => {
      return {
        id: doc.id,
        empId: doc.data().empId,
        name: doc.data().employeename,
        status: "absent",
      };
    });
    console.log(res);

    // let newEmp = [];
    // userlocal.map((emp, i) => {
    //   newEmp.push({
    //     key: i,
    //     code: emp.code + i,
    //     date: emp.date,
    //     status: emp.status,
    //     time1: emp.time1,
    //     time2: emp.time2,
    //     empname: "Nitya-" + (i + 1),
    //     project: emp.project,
    //     report: emp.report,
    //   });
    // });
    // console.log({ newEmp });
    setallEmp(res);
    setFilteredEmp(res);
    setEmpMonthly(res);
  }
  const onReset = () => {
    form.resetFields();
  };
  console.log(empDetails);

  useEffect(() => {
    if (empDetails.userType === "emp") {
      setActivetab("1");
      getEmpDetails(currentUser.uid);
    } else {
      setActivetab("2");
      allEmpDetails();
    }
  }, []);

  //   const rowSelection = {
  //     onChange: (selectedRowKeys, selectedRows) => {
  //       setSelectemp(selectedRows[0].code);
  //       setActivetab("3");
  //     },
  //     getCheckboxProps: (record) => ({
  //       disabled: record.name === "Disabled User",
  //       // Column configuration not to be checked
  //       name: record.name,
  //     }),
  //     type: "radio",
  //   };
  //   const [selectionType, setSelectionType] = useState("");
  const data = [
    {
      key: "1",
      code: "HTS001",

      name: "Nitya",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvbdffgfdgjfhjjkjfjfdgkj",
    },
    {
      key: "2",
      code: "HTS002",

      name: "Jatin",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvb",
    },
    {
      key: "3",
      code: "HTS003",

      name: "Saswat",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvb",
    },
  ];
  const columns1 = [
    // {
    //   title: "Employee Code",
    //   dataIndex: "code",
    //   key: "code",
    //   render: (text) => <a>{text}</a>,
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "In Time",
      dataIndex: "clockIn",
      key: "clockIn",
    },
    {
      title: "Out Time",
      key: "clockOut",
      dataIndex: "clockOut",
    },
    {
      title: "Work Duration",
      key: "duration",
      dataIndex: "duration",
    },
    {
      title: "Project Name",
      dataIndex: "project",
      key: "project",
    },
    {
      title: "Report",
      key: "report",
      dataIndex: "report",
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];
  const data1 = [
    {
      key: "1",
      code: "8u",
      date: "12/09/2022",
      status: "P",
      time1: "",
      time2: "",
      work: "",
      report: "dfdjdgjhgjhgjhfhfdj",
    },
    {
      key: "2",
      code: "8u",
      date: "12/09/2022",
      status: "P",
      time1: "",
      time2: "",
      work: "",
      report: "dfdjdgjhgjhgjhfhfdj",
    },
    {
      key: "3",
      code: "8u",
      date: "12/09/2022",
      status: "P",
      time1: "",
      time2: "",
      work: "",
      report: "dfdjdgjhgjhgjhfhfdj",
    },
  ];

  function onDateFilter(date, dateString) {
    console.log({ date, dateString });
    if (date) {
      console.log(empMonthly);
      let result = empMonthly.filter((ex) => {
        return (
          moment(ex.date, dateFormat).isSame(date[0], "day") ||
          moment(ex.date, dateFormat).isSame(date[1], "day") ||
          (moment(ex.date, dateFormat).isSameOrAfter(date[0]) &&
            moment(ex.date, dateFormat).isSameOrBefore(date[1]))
        );
      });

      const modifiedFilterExpense = [...result];

      console.log({ modifiedFilterExpense });
      setEmpMonthly(modifiedFilterExpense);
    } else {
      setEmpMonthly(empMonthly);
    }
  }
  function onHrDateFilter(date, dateString) {
    console.log({ date, dateString });
    if (date) {
      console.log(empMonthly);
      let result = empMonthly.filter((ex) => {
        return (
          moment(ex.date, dateFormat).isSame(date[0], "day") ||
          moment(ex.date, dateFormat).isSame(date[1], "day") ||
          (moment(ex.date, dateFormat).isSameOrAfter(date[0]) &&
            moment(ex.date, dateFormat).isSameOrBefore(date[1]))
        );
      });

      const modifiedFilterExpense = [...result];

      console.log({ modifiedFilterExpense });
      setEmpMonthly(modifiedFilterExpense);
    } else {
      setEmpMonthly(empMonthly);
    }
  }
  const searchChange = (e) => {
    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allEmp.filter((ex) =>
        ex.empname.toLowerCase().includes(search.toLowerCase())
      );
      console.log({ result });
      setFilteredEmp(result);
    }
  };

  return (
    <>
      <div className="hrtab">
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp(null);
          }}
        >
          {role.userType === "emp" ? (
            <>
              <Tabs.TabPane tab="Monthly Log" key="1">
                <RangePicker
                  className="Range"
                  defaultValue={[]}
                  dateFormat
                  onChange={onDateFilter}
                />
                <Table
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly || []}
                />
              </Tabs.TabPane>
              <Tabs.TabPane
                tab="Add Report"
                key="2"
                className="reportTabs"
                // onClick={() => {
                //   setIsModalOpen(true);
                // }}
              >
                {/* <Button type="primary" onClick={showModal}>
              Open Modal
            </Button> */}
                {/* <Modal
              title="Basic Modal"
              visible={isModalOpen}
              footer={null}
              closeIcon={
                <div
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                >
                  X
                </div>
              }
            > */}
                <Form
                  {...layout}
                  form={form}
                  name="control-hooks"
                  onFinish={onFinish}
                  className="formItem"
                >
                  <Form.Item
                    name="project_name"
                    label="Project Name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item
                    name="project_details"
                    label="Project Details"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <Input className="name" />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="submit">
                      Submit
                    </Button>
                    <Button
                      htmlType="button"
                      onClick={onReset}
                      className="reset"
                    >
                      Reset
                    </Button>
                  </Form.Item>
                </Form>
                {/* </Modal> */}
              </Tabs.TabPane>
            </>
          ) : (
            <>
              <Tabs.TabPane tab="Daily Log" key="2">
                <Input
                  className="Daily"
                  placeholder="Search"
                  prefix={<SearchOutlined />}
                  onChange={searchChange}
                  // style={{ width: "95%" }}
                />
                <Table
                  //   rowSelection={{
                  //     type: selectionType,
                  //     ...rowSelection,
                  //   }}
                  className="DailyTable"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {
                        console.log(record);
                        setSelectemp({ ...record });
                        setActivetab("3");
                      }, // click row
                    };
                  }}
                  columns={columns}
                  dataSource={filteredEmp}
                />
              </Tabs.TabPane>
              <Tabs.TabPane disabled={!selectemp} tab="Monthly Log" key="3">
                <RangePicker
                  className="Range"
                  defaultValue={[]}
                  dateFormat
                  onChange={onHrDateFilter}
                />
                <Table
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly || []}
                />
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}

export default AttendanceLog;
