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
import moment from "moment";

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
  const [key, setKey] = useState("1");
  const [empMonthly, setEmpMonthly] = useState([]);
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
      dataIndex: "empname",
      key: "empname",
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

  const onFinish = (values) => {
    console.log(values);
    const newData = {
      code: "898",
      date: getFormateDateString(),
      status: "-_",
      time1: getFormatTimeString(),
      time2: "18:15:23",
      work: "-",
      report: values?.project_details || "-",
      project: values?.project_name || "-",
    };
    console.log({ monthlydata });
    
    let newAlldata = [newData, ...empMonthly];
    console.log(newAlldata);
    localStorage.setItem("newReport", JSON.stringify(newAlldata));
    setActivetab("1");
    //create new report obj with required data + ""
    //create newMonthlyAll=new+old monthly
    //set local with newMonthlyAll
    //set state for monthly with newMonthlyAll
  };
  useEffect(() => {
    getEmpMonthly();
  }, [activetab]);

  function getEmpMonthly() {
    console.log(JSON.parse(localStorage.getItem("newReport")));
    let userlocal = JSON.parse(localStorage.getItem("newReport")) || [];
    let newEmp = [];
    userlocal.map((emp, i) => {
      newEmp.push({
        key: i,

        code: emp.code,
        date: emp.date,
        empname: "Nitya-" + (i + 1),
        status: emp.status,
        time1: emp.time1,
        time2: emp.time2,
        work: emp.work,
        report: emp.report,
        project: emp.project,
      });
    });
    console.log({ newEmp });
    setEmpMonthly(newEmp);
    // setallEmp(newEmp);
  }

  function allEmpDetails() {
    console.log(JSON.parse(localStorage.getItem("newReport")));
    let userlocal = JSON.parse(localStorage.getItem("newReport")) || [];
    let newEmp = [];
    userlocal.map((emp, i) => {
      newEmp.push({
        key: i,
        code: emp.code + i,
        date: emp.date,
        status: emp.status,
        time1: emp.time1,
        time2: emp.time2,
        empname: "Nitya-" + (i + 1),
        project: emp.project,
        report: emp.report,
      });
    });
    console.log({ newEmp });
    setallEmp(newEmp);
    setEmpMonthly(newEmp);
  }
  const onReset = () => {
    form.resetFields();
  };
  console.log(empDetails);

  useEffect(() => {
    if (empDetails.userType === "emp") {
      setActivetab("1");
      getEmpMonthly();
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

      empname: "Nitya",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvbdffgfdgjfhjjkjfjfdgkj",
    },
    {
      key: "2",
      code: "HTS002",

      empname: "Jatin",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvb",
    },
    {
      key: "3",
      code: "HTS003",

      empname: "Saswat",
      project: "Expenses",
      report: "xfddsfdvbgfgfbvbvb",
    },
  ];
  const columns1 = [
    {
      title: "Employee Code",
      dataIndex: "code",
      key: "code",
      render: (text) => <a>{text}</a>,
    },
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
      dataIndex: "time1",
      key: "time1",
    },
    {
      title: "Out Time",
      key: "time2",
      dataIndex: "time2",
    },
    {
      title: "Work Duration",
      key: "work",
      dataIndex: "work",
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

  return (
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
            <Table columns={columns1} dataSource={empMonthly || []} />
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
                <Button htmlType="button" onClick={onReset} className="reset">
                  Reset
                </Button>
              </Form.Item>
            </Form>
            {/* </Modal> */}
          </Tabs.TabPane>

          <Tabs.TabPane
            tab={
              <RangePicker
                defaultValue={[]}
                dateFormat
                style={{
                  width: "95%",
                  position: "relative",
                  left: "40rem",
                  marginTop: "4px",
                }}
                onChange={onDateFilter}
              />
            }
            key="3"
          >
            <Table columns={columns1} dataSource={empMonthly || []} />
          </Tabs.TabPane>
        </>
      ) : (
        <>
          <Tabs.TabPane tab="Daily Log" key="2">
            <Table
              //   rowSelection={{
              //     type: selectionType,
              //     ...rowSelection,
              //   }}
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
              dataSource={allEmp}
            />
          </Tabs.TabPane>
          <Tabs.TabPane disabled={!selectemp} tab="Monthly Log" key="3">
            <Table columns={columns1} dataSource={[selectemp] || []} />
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
              <RangePicker
                defaultValue={[]}
                dateFormat
                style={{
                  width: "95%",
                  position: "relative",
                  left: "40rem",
                  marginTop: "4px",
                }}
                onChange={onDateFilter}
              />
            }
            key="3"
            disabled={!empMonthly}
          >
            <Table columns={columns1} dataSource={empMonthly || []} />
          </Tabs.TabPane>
        </>
      )}
    </Tabs>
  );
}

export default AttendanceLog;
