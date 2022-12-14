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
  Spin,
  Pagination,
} from "antd";
import "../style/AttendanceLog.css";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { useAuth } from "../contexts/AuthContext";
import AttendanceContext from "../contexts/AttendanceContext";
import ProfileContext from "../contexts/ProfileContext";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
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
  const [selectemp, setSelectemp] = useState({ id: "" });
  const [activetab, setActivetab] = useState("1");
  console.log(activetab);
  const { currentUser } = useAuth();
  const [key, setKey] = useState("1");
  const [loading, setLoading] = useState(false);
  const [empMonthly, setEmpMonthly] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterCriteria, setFilterCriteria] = useState({
    search: "",
    date: [],
    category: "all",
  });
  const [filteredEmp, setFilteredEmp] = useState([]);

  const columns = [
    {
      title: "Employee Code",
      dataIndex: "empId",
      className: "code",
      key: "empId",

      render: (text) => <a>{text}</a>,
    },
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

  useEffect(() => {
    console.log(activetab);
    form.resetFields();
    if (empDetails.userType === "emp") {
      setTimeout(() => {
        console.log(currentUser.uid);
        setSelectemp({ id: currentUser.uid });
        // setActivetab("1");
        getEmpDetails(currentUser.uid, [
          moment().subtract(30, "days"),
          moment(),
        ]);
      }, 500);
      // getEmpMonthly();
    } else {
      if (activetab == "1") {
        allEmpDetails();
      }
    }
  }, [activetab]);

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
    await AttendanceContext.updateAttendance(
      currentUser.uid,
      values.date,
      newData
    );
    // let newAlldata = [newData, ...empMonthly];
    // console.log(newAlldata);
    // localStorage.setItem("newReport", JSON.stringify(newAlldata));
    setActivetab("1");
    //create new report obj with required data + ""
    //create newMonthlyAll=new+old monthly
    //set local with newMonthlyAll
    //set state for monthly with newMonthlyAll
  };
  // useEffect(() => {
  //   getEmpDetails(selectemp.id);
  //   // getEmpMonthly();
  // }, [activetab]);

  // useEffect(() => {

  // }, [loading])

  if (loading) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            margin: "-10px",
            zIndex: "100",
            opacity: "0.7",
            backgroundColor: "transparent",
          }}
        />
      </div>
    );
  }

  async function getEmpDetails(id, date) {
    // setLoading(true);
    console.log(id);
    let data = await AttendanceContext.getAllAttendance(id, date);

    console.log(data);
    setEmpMonthly(data);
    setLoading(false);
    return data;
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

  function allEmpDetails() {
    setLoading(true);
    // console.log(JSON.parse(localStorage.getItem("newReport")));
    AttendanceContext.getAllUsers().then((userdata) => {
      console.log(JSON.stringify(userdata));
      getWithLeave(userdata);
    });
    // setLoading(false);
  }

  function getWithLeave(userdata) {
    // setLoading(true);
    AttendanceContext.updateWithLeave(userdata).then((final) => {
      console.log(
        "test1",
        final ? JSON.parse(JSON.stringify(final)) : undefined
      );
      setallEmp(final);
      setFilteredEmp(final);
      setEmpMonthly(final);
      setLoading(false);
    });
  }
  // stats.map((rec) => {
  //   console.log("mooooooooooooooooooooooooooooo");
  // if (emp.id == rec.id) {
  //   emp.status = "Present";
  //   emp.project = rec.project;
  //   emp.report = rec.report;
  //   return;
  // }
  // })
  //   else {
  //     console.log("AAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHHHH");
  //     AttendanceContext.getLeaveStatus(emp.id).then((leave) => {
  //     if (leave) {
  //       emp.status = "On Leave";
  //     }
  //   })
  // }

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

  const onReset = () => {
    form.resetFields();
  };
  console.log(empDetails);
  // useEffect(() => {
  //   setFilteredEmp(filteredEmp);
  // }, [activetab]);

  // useEffect(() => {
  //   setFilteredEmp(filteredEmp);
  // }, [activetab]);

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
  // const data = [
  //   {
  //     key: "1",
  //     code: "HTS001",

  //     name: "Nitya",
  //     project: "Expenses",
  //     report: "xfddsfdvbgfgfbvbvbdffgfdgjfhjjkjfjfdgkj",
  //   },
  //   {
  //     key: "2",
  //     code: "HTS002",

  //     name: "Jatin",
  //     project: "Expenses",
  //     report: "xfddsfdvbgfgfbvbvb",
  //   },
  //   {
  //     key: "3",
  //     code: "HTS003",

  //     name: "Saswat",
  //     project: "Expenses",
  //     report: "xfddsfdvbgfgfbvbvb",
  //   },
  // ];
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
      title: "Break Time",
      key: "break",
      dataIndex: "break",
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

  async function onHrDateFilter(value) {
    if (value == null) {
      console.log("empMonthly");
      const modifiedFilterExpense = await getEmpDetails(selectemp.id, [
        moment().subtract(30, "days"),
        moment(),
      ]);
      setEmpMonthly(modifiedFilterExpense);
    } else {
      const begin = value.clone().startOf("month");
      const end = value.clone().endOf("month");
      let date = [begin, end];
      // let result = empMonthly.filter((ex) => {
      //   return (
      //     moment(ex.date, dateFormat).isSame(date[0], "day") ||
      //     moment(ex.date, dateFormat).isSame(date[1], "day") ||
      //     (moment(ex.date, dateFormat).isSameOrAfter(date[0]) &&
      //       moment(ex.date, dateFormat).isSameOrBefore(date[1]))
      //   );
      // });

      const modifiedFilterExpense = await getEmpDetails(selectemp.id, date);

      console.log(modifiedFilterExpense.reverse());
      setEmpMonthly(modifiedFilterExpense);
    }
  }
  const searchChange = (e) => {
    let search = e.target.value;
    setFilterCriteria({ ...filterCriteria, search: search });
    if (search) {
      let result = allEmp.filter((ex) =>
        ex.name.toLowerCase().includes(search.toLowerCase())
      );
      console.log({ result });
      setFilteredEmp(result);
    } else {
      setFilteredEmp(allEmp);
    }
  };

  console.log("test", filteredEmp[1]);
  console.log("test", JSON.stringify(filteredEmp[1]));
  console.log(
    "test",
    filteredEmp[1] ? JSON.parse(JSON.stringify(filteredEmp[1])) : "empty"
  );
  console.log(filteredEmp);
  // console.log("test",filteredEmp);
  // console.log("test",filteredEmp?JSON.parse(JSON.stringify(filteredEmp)):"empty");
  // setFilteredEmp(filteredEmp?JSON.parse(JSON.stringify(filteredEmp)):undefined)
  return (
    <>
      <div className="hrtab">
        <Tabs
          defaultActiveKey={activetab}
          activeKey={activetab}
          className="Tabs"
          onChange={(tabKey) => {
            setActivetab(tabKey);
            setSelectemp({ id: "" });
          }}
        >
          {role.userType === "emp" ? (
            <>
              <Tabs.TabPane tab="Monthly Log" key="1">
                <DatePicker
                  picker="month"
                  placeholder="Select Month"
                  className="Range"
                  bordered={true}
                  // defaultValue={[]}
                  format="MM-YYYY"
                  style={{
                    background: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "12rem",
                  }}
                  allowClear
                  onChange={onHrDateFilter}
                />
                <Table
                  loading={loading}
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
                    name="date"
                    label="Date"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className="pname"
                  >
                    <DatePicker
                      format={"DD-MM-YYYY"}
                      style={{ width: "50%" }}
                    />
                  </Form.Item>
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
              <Tabs.TabPane tab="Daily Log" key="1" forceRender="true">
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
                        getEmpDetails(record.id, [
                          moment().subtract(30, "days"),
                          moment(),
                        ]);
                        setActivetab("2");
                      }, // click row
                    };
                  }}
                  loading={loading}
                  columns={columns}
                  dataSource={filteredEmp}
                />
              </Tabs.TabPane>
              <Tabs.TabPane disabled={!selectemp.id} tab="Monthly Log" key="2">
                <DatePicker
                  picker="month"
                  placeholder="Select Month"
                  className="Range"
                  // defaultValue={[]}
                  format={"MM-YYYY"}
                  style={{
                    background: "#1890ff",
                    cursor: "pointer",
                    marginLeft: "12rem",
                  }}
                  allowClear
                  onChange={onHrDateFilter}
                />

                <Table
                  loading={loading}
                  className="monthly"
                  columns={columns1}
                  dataSource={empMonthly}
                  pagination={true}
                />

                {console.log(empMonthly || [])}
              </Tabs.TabPane>
            </>
          )}
        </Tabs>
      </div>
    </>
  );
}
export default AttendanceLog;
