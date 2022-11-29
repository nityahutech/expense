import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { Card, Col, Row, Input, DatePicker, Button, Form } from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditFilled,
} from "@ant-design/icons";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import "../../style/BankAccount.css";

function Education() {
  const [editContent, showEditContent] = useState(false);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const onFinish = (value) => {
    let record = {
      qualificationType: value.qualificationType
        ? value.qualificationType
        : null,
      courseName: value.courseName ? value.courseName : null,
      courseType: value.courseType ? value.courseType : null,
      stream: value.stream ? value.stream : null,
      universityName: value.universityName ? value.universityName : null,
      courseStartDate: dateStart ? dateStart : null,
      courseEndDate: dateEnd ? dateEnd : null,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    setData(record);
    showEditContent(false);
  };

  const onFinishFailed = (errorInfo) => { };
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setData(data);
    setDateEnd(data.courseEndDate);
    setDateStart(data.courseStartDate);
  };
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabets = (event) => {
    if (!/^[ A-Za-z.]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkSpecial = (event) => {
    if (!/^[ A-Za-z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const [form] = Form.useForm();

  return (
    <div
      className="education"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Row
        className="Row-Card"
        style={{
          width: '75%',
          margin: '10px',
          display: 'flex',
          alignItems: 'center'
        }}>
        <Col span={24}>
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Card
              title="EDUCATIONAL INFO"
              className="personal"
              hoverable={true}
              bordered={true}
              //   actions={[
              //   <EditOutlined key="edit" />,
              // ]}
              extra={
                <>
                  {editContent === false ? (
                    <Button
                      className="personal"
                      type="text"
                      style={{
                        color: "#ffff",
                        display: "none",
                        paddingTop: "7px",
                        paddingRight: "7px",
                        position: "absolute",
                        right: 10,
                        top: 10,
                      }}
                      onClick={() => showEditContent(!editContent)}
                    >
                      <EditFilled />
                    </Button>
                  ) : null}
                </>
              }
              style={{
                width: '100%',
                // marginTop: 10,
                borderRadius: "10px",
                cursor:'default',
              }}
            >
              <Row gutter={[16, 16]}>
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                      }}
                    >
                      Qualification Type
                    </h1>
                    {editContent === false ? (
                      <div>
                        {data?.qualificationType ? data.qualificationType : "-"}
                      </div>
                    ) : (
                      <Form.Item
                        name="qualificationType"
                        onKeyPress={(event) => {
                          if (checkSpecial(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: false,
                            minLength: 3,
                            maxLength: 25,
                            message: "Please Enter Qualification type",
                            pattern: /^[a-zA-Z.\s]*$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue={
                          data?.qualificationType ? data.qualificationType : ""
                        }
                      >
                        <Input
                          defaultValue={data ? data.qualificationType : null}
                          maxLength={25}
                          placeholder="Enter Qualification Type"
                          style={{ 
                            marginTop: "10px", 
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                      }}
                    >
                      Course Name
                    </h1>
                    {editContent === false ? (
                      <h4>{data?.courseName ? data.courseName : "-"}</h4>
                    ) : (
                      <Form.Item
                        name="courseName"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: false,
                            minLength: 3,
                            maxLength: 25,
                            message: "Please Enter Valid Course Name",
                            pattern: /^[ A-Za-z.]*$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue={data?.courseName ? data.courseName : null}
                      >
                        <Input
                          initialValue={data ? data.courseName : null}
                          placeholder="Enter Course Name"
                          style={{ 
                            marginTop: "10px", 
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                      }}
                    >
                      Course Type
                    </h1>
                    {editContent === false ? (
                      <h4>{data?.courseType ? data.courseType : "-"}</h4>
                    ) : (
                      <Form.Item
                        name="courseType"
                        onKeyPress={(event) => {
                          if (checkSpecial(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: false,
                            minLength: 3,
                            maxLength: 25,
                            message: "Please Enter Course Type",
                            pattern: /^[a-zA-Z\s]*$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue={data?.courseType ? data.courseType : null}
                      >
                        <Input
                          onInput={(e) => {
                            const inputval = e.target.value;
                            const str = e.target.value;
                            const newVal =
                              inputval.substring(0, 1).toUpperCase() +
                              inputval.substring(1);
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            e.target.value = caps;
                          }}
                          initialValue={data ? data.courseType : null}
                          placeholder="Enter Course Type"
                          style={{ 
                            marginTop: "10px", 
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                      }}
                    >
                      Stream
                    </h1>
                    {editContent === false ? (
                      <h4>{data?.stream ? data.stream : "-"}</h4>
                    ) : (
                      <Form.Item
                        name="stream"
                        onKeyPress={(event) => {
                          if (checkSpecial(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: false,
                            minLength: 3,
                            maxLength: 25,
                            message: "Please Enter Stream",
                            pattern: /^[a-zA-Z\s]*$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue={data?.stream ? data.stream : null}
                      >
                        <Input
                          onInput={(e) => {
                            const inputval = e.target.value;
                            const str = e.target.value;
                            const newVal =
                              inputval.substring(0, 1).toUpperCase() +
                              inputval.substring(1);
                            const caps = str
                              .split(" ")
                              .map(capitalize)
                              .join(" ");
                            e.target.value = caps;
                          }}
                          defaultValue={data ? data.stream : null}
                          placeholder="Enter Stream"
                          style={{ 
                            marginTop: "10px", 
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        />
                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col xs={22} sm={15} md={8}>
                  <h1
                    style={{
                      fontWeight: 600,
                      lineHeight: "18px",
                      color: "#07182b",
                      fontSize: "15px",
                      fontFamily: "Open Sans,sans-serif",
                    }}
                  >
                    Course Start Date
                  </h1>

                  {editContent === false ? (
                    <div>
                      {data?.courseStartDate ? data.courseStartDate : "-"}
                    </div>
                  ) : (
                    <Form.Item
                      name="courseStartDate"
                      rules={[
                        {
                          required: false,
                          message: "Please select Start Date ",
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                      initialValues={
                        dateStart ? moment(dateStart, "DD-MM-YYYY") : null
                      }
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
                <Col xs={22} sm={15} md={8}>
                  <h1
                    style={{
                      fontWeight: 600,
                      lineHeight: "18px",
                      color: "#07182b",
                      fontSize: "15px",
                      fontFamily: "Open Sans,sans-serif",
                    }}
                  >
                    Course End Date
                  </h1>

                  {/* <div> */}
                  {editContent === false ? (
                    <div>{data?.courseEndDate ? data.courseEndDate : "-"}</div>
                  ) : (
                    <Form.Item
                      name="courseEndDate"
                      rules={[
                        {
                          required: false,
                          message: "Please select End Date",
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                      initialValues={
                        dateEnd ? moment(dateEnd, "DD-MM-YYYY") : null
                      }
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
                <Col xs={22} sm={15} md={8}>
                  <div>
                    <h1
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                      }}
                    >
                      University Name
                    </h1>
                    {editContent === false ? (
                      <div>
                        {data?.universityName ? data.universityName : "-"}
                      </div>
                    ) : (
                      <Form.Item
                        name="universityName"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: false,
                            minLength: 3,
                            maxLength: 25,
                            message: "Please Enter University Name",
                            pattern: /^[a-zA-Z.\s]*$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue={
                          data?.universityName ? data.universityName : null
                        }
                      >
                        <Input
                          defaultValue={
                            data?.universityName ? data.universityName : null
                          }
                          placeholder="Enter University Name"
                          style={{ 
                            marginTop: "10px", 
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
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
            </Card>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Education;
