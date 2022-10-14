// ------------------------------------Place for import
import React, { useEffect } from "react";
import moment from "moment";
import { useState } from "react";

import { Card, Col, Row, Input, DatePicker, Button, Form, Select } from "antd";

import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import FormItem from "antd/es/form/FormItem";
import { useAuth } from "../../contexts/AuthContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { async } from "@firebase/util";

// ----------------------------------------place for const declaration

const { Option } = Select;

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

// --------------------------------------place for functions

function Education() {
  const [editContent, showEditContent] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const { currentUser } = useAuth();
  const onFinish = (values) => {
    console.log("Success:", values);
    let record = {
      ...values,
      courseStartDate: dateStart,
      courseEndDate: dateEnd,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    setData(record);
    showEditContent(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const [data, setData] = useState([]);

  // console.log(data?data.stream:null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log(data);
    setData(data);
    setDateEnd(data.courseEndDate);
    setDateStart(data.courseStartDate);
  };

  console.log(data, dateEnd, dateStart);

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const [form] = Form.useForm();

  return (
    <div
      className="education"
      style={{
        margin: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title="EDUCATIONAL INFO"
        //   actions={[
        //   <EditOutlined key="edit" />,
        // ]}
        extra={
          <>
            {editContent === false ? (
              <Button
                type="text"
                style={{ color: "#4ec0f1" }}
                onClick={() => showEditContent(!editContent)}
              >
                Edit
              </Button>
            ) : null}
          </>
        }
        style={{
          width: 800,
          marginTop: 10,
        }}
      >
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            {/* --------------------------------------------------------Qulification Type */}
            <Col span={8}>
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Qualification Type
                </h1>
                {editContent === false ? (
                  <h4>{data ? data.qualificationType : null}</h4>
                ) : (
                  <Form.Item
                    name="qualificationType"
                    rules={[
                      {
                        required: false,
                        message: "Please input your qalification Type!",
                        transform:(v)=>v.toUpperCase()
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    initialValue={
                      data.qualificationType ? data.qualificationType : ""
                    }
                  >
                    <Input
                    onInput={(e)=>{
                      const inputval = e.target.value;
                      const str = e.target.value;
                      const newVal =
                        inputval.substring(0, 1).toUpperCase() +
                        inputval.substring(1);
                      const caps = str.split(" ").map(capitalize).join(" ");
                      console.log("caps", caps);
                      e.target.value= caps
                    }}
                
                      defaultValue={data ? data.qualificationType : null}
                      maxLength={25}
                      placeholder="Enter Qualification Type"
                    />
                  </Form.Item>
                )}
              </div>
            </Col>
            {/* --------------------------------------------------------------Course Name */}
            <Col span={8}>
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Course Name
                </h1>
                {editContent === false ? (
                  <h4>{data ? data.courseName : null}</h4>
                ) : (
                  <Form.Item
                    name="courseName"
                    rules={[
                      { required: false, message: "Please input course Name!" },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    initialValue={data.courseName ? data.courseName : null}
                  >
                    <Input
                       onInput={(e)=>{
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        console.log("caps", caps);
                        e.target.value= caps
                      }}
                      initialValue={data ? data.courseName : null}
                      placeholder="Enter Course Name"
                    />
                  </Form.Item>
                )}
              </div>
            </Col>
            {/* -------------------------------------------------------Course Type */}
            <Col span={8}>
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Course Type
                </h1>
                {editContent === false ? (
                  <h4>{data ? data.courseType : null}</h4>
                ) : (
                  <Form.Item
                    name="courseType"
                    rules={[
                      {
                        required: false,
                        message: "Please input your course Type!",
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    initialValue={data.courseType}
                  >
                    <Input
                      onInput={(e)=>{
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        console.log("caps", caps);
                        e.target.value= caps
                      }}
                      initialValue={data ? data.courseType : null}
                      placeholder="Enter Course Type"
                    />
                  </Form.Item>
                )}
              </div>
            </Col>
            {/* ----------------------------------------------------------Stream */}
            <Col span={8}>
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>Stream</h1>
                {editContent === false ? (
                  <h4>{data ? data.stream : null}</h4>
                ) : (
                  <Form.Item
                    name="stream"
                    rules={[
                      {
                        required: false,
                        message: "Please input your Stream Type!",
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    initialValue={data.stream}
                  >
                    <Input
                      onInput={(e)=>{
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        console.log("caps", caps);
                        e.target.value= caps
                      }}
                      defaultValue={data ? data.stream : null}
                      placeholder=""
                    />
                  </Form.Item>
                )}
              </div>
            </Col>
            {/* ---------------------------------------------------------Course Start Date */}
            <Col span={8}>
              <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                Course Start Date
              </h1>

              {/* <div> */}
              {editContent === false ? (
                <h4>{data ? data?.courseStartDate : null}</h4>
              ) : (
                <Form.Item
                  name="courseStartDate"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Course Start Date ",
                    },
                  ]}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 32 }}
                  initialValues={dateStart? moment(dateStart, "DD-MM-YYYY"):null}
                >
                  <DatePicker
                    // defaultValue={moment(dateStart, "DD-MM-YYYY")}
                    style={{ width: "100%" }}
                    format={"DD-MM-YYYY"}
                    onChange={(e) => {
                      setDateStart(e.format("DD-MM-YYYY"));
                    }}
                  />
                </Form.Item>
              )}
              {/* </div> */}
            </Col>
            {/* ----------------------------------------------------------Course End Date */}
            <Col span={8}>
              <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                Course End Date
              </h1>

              {/* <div> */}
              {editContent === false ? (
                <h4>{data ? data.courseEndDate : null}</h4>
              ) : (
                <Form.Item
                  name="courseEndDate"
                  rules={[
                    {
                      required: false,
                      message: "Please input your Course End Date",
                    },
                  ]}
                  labelCol={{ span: 8 }}
                  wrapperCol={{ span: 32 }}
                  initialValues={dateEnd? moment(dateEnd, "DD-MM-YYYY"):null}
                >
                  <DatePicker
                    // defaultValue={moment(dateEnd, "DD-MM-YYYY")}
                    style={{ width: "100%" }}
                    format={"DD-MM-YYYY"}
                    onChange={(e) => {
                      setDateEnd(e.format("DD-MM-YYYY"));
                    }}
                  />
                </Form.Item>
              )}
              {/* </div> */}
            </Col>
            {/* ----------------------------------------------------------University Name */}
            <Col span={8}>
              <div>
                <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                  University Name
                </h1>
                {editContent === false ? (
                  <h4>{data ? data.universityName : null}</h4>
                ) : (
                  <Form.Item
                    name="universityName"
                    rules={[
                      {
                        required: false,
                        message: "Please input your University Name !",
                      },
                    ]}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 32 }}
                    initialValue={data.universityName}
                  >
                    <Input
                      onInput={(e)=>{
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        console.log("caps", caps);
                        e.target.value= caps
                      }}
                      defaultValue={data ? data.universityName : null}
                      placeholder=""
                    />
                  </Form.Item>
                )}
              </div>
            </Col>
          </Row>

          {editContent === true ? (
            <Row
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "3%",
              }}
            >
              <Button
                onClick={() => showEditContent(false)}
                type="text"
                style={{ fontSize: 15 }}
              >
                <CloseOutlined /> CANCEL
              </Button>
              <Col>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "10px" }}
                >
                  <CheckOutlined />
                  SAVE
                </Button>
              </Col>
            </Row>
          ) : null}
        </Form>
      </Card>
    </div>
  );
}

export default Education;
