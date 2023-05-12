import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Select,
  Input,
  AutoComplete,
  Button,
  Space,
  Tabs,
  Table,
} from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import { getManagersData, getUsers } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import "../../style/Onboarding.css";
import "../Feedback/FeedBack.css";

const dataSource = [
  {
    key: "1",
    name: "Mike",
    date: "02.05.2023",
    status: "10 Downing Street",
    action: "",
  },
  {
    key: "2",
    name: "Mike",
    date: "01.05.2023",
    status: "10 Downing Street",
    action: "",
  },
];

function EmpFeedback() {
  const [showEmpName, setShowEmpName] = useState([]);
  const [autoOptions, setAutoOptions] = useState([]);
  const compId = sessionStorage.getItem("compId");
  const [allEmpName, setAllEmpName] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  async function getData() {
    const empData = await getManagersData(compId, currentUser.displayName);
    console.log("empdata", empData);
    let list = Object.values(empData).map((emp) => {
      return { value: emp.name, label: emp.name };
    });
    console.log(list);
    setShowEmpName(list);
  }

  async function getAllUser() {
    const allData = await getUsers();
    let allUsers = allData.docs.map((doc) => {
      return { value: doc.data().name, label: doc.data().name };
    });

    setAllEmpName(allUsers);
  }
  console.log("allEmpName", allEmpName);

  useEffect(() => {
    getData();
    getAllUser();
  }, []);

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "left",
      render: (_, record) => {
        return (
          <>
            <Button>pending</Button>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "left",
      render: (_, record) => {
        return (
          <div>
            <EyeFilled style={{ fontSize: "17px", color: "#707070" }} />
          </div>
        );
      },
    },
  ];

  // const onSearch = (searchText) => {
  //   let matchingName = showEmpName.filter((ex) => {
  //     return ex.value.toLowerCase().includes(searchText.toLowerCase());
  //   });
  //   setAutoOptions(!searchText ? [] : matchingName);
  // };

  return (
    <div className="myProfile" style={{ margin: "10px", minHeight: "100vh" }}>
      <Tabs defaultActiveKey="1" className="profileTabs">
        <Tabs.TabPane tab="Feedback Form" key="1">
          <Card
            className="empFeedbackCard"
            style={{
              width: "581px",
              height: "412px",
              position: "relative",
              left: "20rem",
              top: "2rem",
              borderRadius: "10px",
            }}
            title="Feedback"
          >
            <Form layout="vertical">
              <Form.Item label="Name" className="FeedbackTitle">
                <Select
                  placeholder="Please Select Name"
                  options={[
                    { value: "selfRaised", label: "Self Raised" },
                    ...showEmpName,
                  ]}
                  className="FeedbackSelect"
                />
              </Form.Item>
              <Form.Item label="Select Section" className="FeedbackTitle">
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please Select"
                  options={[
                    { value: "communication", label: "Communication Skills" },
                    { value: "technical", label: "Technical Skills" },
                    { value: "programming", label: "Programming Skills" },
                  ]}
                  className="FeedbackSelect"
                />
              </Form.Item>
              <Form.Item label="Select Employee" className="FeedbackTitle">
                <Select
                  options={[...allEmpName]}
                  mode="multiple"
                  placeholder="Please Select Employee"
                  className="FeedbackSelect"
                />
              </Form.Item>
              <Space>
                <Button
                  style={{
                    position: "relative",
                    left: "13rem",
                    background: "rgb(4, 84, 119)",
                    color: "rgb(255, 255, 255)",
                    width: "107px",
                    borderRadius: "5px",
                    height: "37px",
                  }}
                  className="submitBtn"
                  onClick={() => navigate("/EmployeeSurvey")}
                >
                  Submit
                </Button>
              </Space>
            </Form>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Feedback Table" key="2">
          <Card
            className="empFeedbackCard"
            style={{
              width: "695px",
              height: "auto",
              position: "relative",
              left: "16rem",
              top: "2rem",
              borderRadius: "10px",
            }}
          >
            <Table
              columns={columns}
              dataSource={dataSource}
              className="feebBackTable"
              pagination={false}
            />
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default EmpFeedback;
