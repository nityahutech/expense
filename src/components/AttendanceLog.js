import React, { useState, useEffect } from "react";
import { Tabs, Layout, Table } from "antd";
import "../style/AttendanceLog.css";

const { Content } = Layout;
function AttendanceLog({ empDetails }) {
  console.log(empDetails);
  const [role, setRole] = useState(empDetails);
  const [selectemp, setSelectemp] = useState(null);
  const [activetab, setActivetab] = useState(null);
  const columns = [
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
    },
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
      title: "Description",
      key: "description",
      dataIndex: "description",
      ellipsis: true,
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];

  useEffect(() => {
    console.log({ activetab });
    setActivetab(empDetails.userType === "emp" ? "1" : "2");
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
      date: "12-09-2022",
      empname: "Nitya",
      project: "Expenses",
      description: "xfddsfdvbgfgfbvbvbdffgfdgjfhjjkjfjfdgkj",
    },
    {
      key: "2",
      code: "HTS002",
      date: "12-09-2022",
      empname: "Jatin",
      project: "Expenses",
      description: "xfddsfdvbgfgfbvbvb",
    },
    {
      key: "3",
      code: "HTS003",
      date: "13-09-2022",
      empname: "Saswat",
      project: "Expenses",
      description: "xfddsfdvbgfgfbvbvb",
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
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    // {
    //   title: "Action",
    //   key: "action",
    // },
  ];
  //   const data1 = [
  //     {
  //       key: "1",
  //       date: "12/09/2022",
  //       status: "P",
  //       time1: "",
  //       time2: "",
  //       work: "",
  //       description: "dfdjdgjhgjhgjhfhfdj",
  //     },
  //     {
  //       key: "2",
  //       serial: 2,
  //       empname: "Jatin",
  //       project: "Expenses",
  //       description: "xfddsfdvbgfgfbvbvb",
  //     },
  //     {
  //       key: "3",
  //       serial: 3,
  //       empname: "Saswat",
  //       project: "Expenses",
  //       description: "xfddsfdvbgfgfbvbvb",
  //     },
  //   ];

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
        <Tabs.TabPane tab="Monthly Log" key="1">
          <Table columns={columns1} dataSource={[selectemp] || []} />
        </Tabs.TabPane>
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
                    // console.log(record.code);
                    setSelectemp(record);
                    setActivetab("3");
                  }, // click row
                };
              }}
              columns={columns}
              dataSource={data}
            />
          </Tabs.TabPane>
          <Tabs.TabPane disabled={!selectemp} tab="Monthly Log" key="3">
            <Table columns={columns1} dataSource={[selectemp] || []} />
          </Tabs.TabPane>
        </>
      )}
    </Tabs>
  );
}

export default AttendanceLog;
