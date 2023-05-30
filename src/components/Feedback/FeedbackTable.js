import {
  Button,
  Card,
  Divider,
  Input,
  Row,
  Col,
  Table,
  Tag,
  Popover,
} from "antd";
import { EyeFilled, SearchOutlined } from "@ant-design/icons";
import React from "react";
import "../Feedback/FeedBack.css";
import { useNavigate } from "react-router-dom";
import EmpFeedback from "./EmpFeedback";

function FeedbackTable(props) {
  const navigate = useNavigate();
  const role = props.roleView == "admin";

  const pendingContent = (
    <div>
      <p>Ekta Dewangan : 11-05-2023</p>
      <p>
        Jatin Yadav : <span style={{ color: "red" }}>not submitted</span>
      </p>
    </div>
  );

  const approveContent = (
    <div>
      <p>Swetha Vijay : 20.05.2023</p>
      <p>Kiran : 19.05.2023</p>
    </div>
  );

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "left",
    },
    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      align: "left",
    },
    {
      title: "Employee Name",
      dataIndex: "empName",
      key: "empName",
      align: "left",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "left",
      render: (_, record) => {
        console.log(record.status);
        return (
          <>
            <Popover
              placement="bottom"
              title="Status"
              content={
                record.status === "pending" ? pendingContent : approveContent
              }
            >
              <Tag
                style={{
                  width: "84px",
                  color: "#000000",
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
                className="statusTag"
                color={
                  record.status === "approved"
                    ? "rgb(8 231 68 / 75%)"
                    : "rgb(244 209 105)"
                }
              >
                {record.status === "pending" ? "Pending" : "Approved"}
              </Tag>
            </Popover>
          </>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: "right",
      render: (_, record) => {
        return (
          <div>
            <EyeFilled style={{ fontSize: "17px", color: "#707070" }} />
          </div>
        );
      },
    },
  ];

  const FeedbackTable = [
    {
      key: "1",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      status: "pending",
      align: "center",
    },
    {
      key: "2",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      status: "approved",
    },
    {
      key: "3",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      status: "pending",
    },
    {
      key: "4",
      date: "Date",
      empCode: "Employee Code",
      empName: "Employee Name",
      status: "approved",
    },
  ];

  console.log(FeedbackTable.map((item) => item));

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col xs={24} xm={24} md={9}>
          <Input
            key="empSearch"
            className="empSearch"
            style={{ marginLeft: "10px" }}
            placeholder="Search for Employee"
            suffix={<SearchOutlined />}
            //   onChange={searchData}
          />
        </Col>
        <Col xs={24} xm={24} md={11}></Col>
        <Col xs={24} xm={24} md={4}>
          <Button
            className="configSur"
            onClick={() => {
              navigate("/ConfigSurvey");
            }}
          >
            Survey Configuration
          </Button>
        </Col>
        <Col xs={24} sm={24} md={24}>
          <Table
            className="feebBackTable"
            columns={columns}
            dataSource={FeedbackTable}
            scroll={{ x: 600 }}
          />
        </Col>
      </Row>
    </>
  );
}

export default FeedbackTable;
