import React, { useState, useEffect } from "react";
import { Tabs, Layout, Table, Button, Modal, Form, Input } from "antd";
import "../style/AttendanceLog.css";

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
function AttendanceLog({  empDetails }) {
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

  const onFinish = (values) => {
    console.log(values);
    const newData = {
      code: "898",
      date:
        new Date().getDate() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getFullYear(),
      status: "-_",
      time1:
        new Date().getHours() +
        ":" +
        new Date().getMinutes() +
        ":" +
        new Date().getSeconds(),
      time2: "18:15:23",
      work: "-",
      report: values?.project_details || "-",
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
        code: emp.code + i,
        date: emp.date,
        status: emp.status,
        time1: emp.time1,
        time2: emp.time2,
        work: emp.work,
        report: emp.report,
      });
    });
    console.log({ newEmp });
    setEmpMonthly(newEmp);
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
        project: "project-" + (i + 1),
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
          {/* <Tabs.TabPane tab="Add Report" key="4" className="reportTabs">
            <Form
              {...layout}
              form={form}
              name="control-hooks"
              onFinish={onFinish}
              className="formItem"
            >
              <Form.Item
                name="project name"
                label="Project Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="name" />
              </Form.Item>
              <Form.Item
                name="project details"
                label="Project Details"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input className="name" />
              </Form.Item>
              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
            
          </Tabs.TabPane> */}
        </>
      )}
    </Tabs>
  );
}

export default AttendanceLog;
