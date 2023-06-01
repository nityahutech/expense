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
  Modal,
} from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import { getManagersData, getUsers } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import "../../style/Onboarding.css";
import "../Feedback/FeedBack.css";
import { Content } from "antd/lib/layout/layout";

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
  const {currentUser} = useAuth()
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

  const submitFeedbackForm = (value) => {
    console.log("valueee", value);
    const feedbackFormData = (
      <Form
        layout="horizontal"
        labelCol={{
          span: 0,
        }}
        wrapperCol={{
          span: 0,
        }}
      >
        <Form.Item label="Sections::" className="feedbackSection">
          {value.sections.map((sec) => sec)?.toString()}
        </Form.Item>
        <Form.Item label="Employees::" className="feedbackSection">
          {value.employees.map((emp) => emp)?.toString()}
        </Form.Item>
      </Form>
    );
    Modal.confirm({
      title: `Are you sure you want to create a feedback for ${value.name} ?`,
      content: feedbackFormData,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        // navigate("/survey");
      },
    });
  };

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
            <Form layout="vertical" onFinish={submitFeedbackForm}>
              <Form.Item
                label="Name"
                name="name"
                className="FeedbackTitle"
                rules={[{ required: true, message: "Please select the name" }]}
              >
                <Select
                  placeholder="Please Select Name"
                  options={[
                    { value: "selfRaised", label: "Self Raised" },
                    ...showEmpName,
                  ]}
                  className="FeedbackSelect"
                />
              </Form.Item>
              <Form.Item
                label="Select Section"
                name="sections"
                className="FeedbackTitle"
                rules={[
                  {
                    required: true,
                    message: "Please select the atleast one skill",
                  },
                ]}
              >
                <Select
                  mode="multiple"
                  allowClear
                  placeholder="Please Select"
                  options={[
                    {
                      value: "Communication Skills",
                      label: "Communication Skills",
                    },
                    { value: "Technical Skills", label: "Technical Skills" },
                    {
                      value: "Programming Skills",
                      label: "Programming Skills",
                    },
                  ]}
                  className="FeedbackSelect"
                />
              </Form.Item>
              <Form.Item
                label="Select Employee"
                name="employees"
                className="FeedbackTitle"
                rules={[
                  {
                    required: true,
                    message: "Please select the atleast one employee",
                  },
                ]}
              >
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
                  htmlType="submit"
                  // onClick={submitFeedbackForm}
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
