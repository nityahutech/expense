import React, { useEffect, useState } from "react";
import { Card, Form, Select, Input, AutoComplete, Button, Space } from "antd";
import { getManagersData, getUsers } from "../../contexts/CreateContext";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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

  // const onSearch = (searchText) => {
  //   let matchingName = showEmpName.filter((ex) => {
  //     return ex.value.toLowerCase().includes(searchText.toLowerCase());
  //   });
  //   setAutoOptions(!searchText ? [] : matchingName);
  // };

  return (
    <Card
      className="empFeedbackCard"
      style={{
        width: "581px",
        height: "412px",
        position: "relative",
        left: "22rem",
        top: "6rem",
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
  );
}

export default EmpFeedback;
