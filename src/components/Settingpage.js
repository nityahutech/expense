import React, { useState, useEffect } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input, notification } from "antd";
import { Button } from "antd";
import { Tabs } from "antd";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Successfully",
    description: "Password changed successfully",
  });
};
const openUpdateEmail = (type) => {
  notification[type]({
    message: "Successfully",
    description: "Email Address changed successfully",
  });
};

const Settingpage = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [form] = Form.useForm();

  //   function isValidEmail(email) {
  //     return /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9])+@[a-z]+\.[a-z]{2,3}/.test(email);
  //   }

  //   const handleChange = (event) => {
  // if (!isValidEmail(event.target.value)) {
  //   setError("Email is invalid");
  // } else {
  //   setError(null);
  // }
  // setMessage(event.target.value);
  //   };

  useEffect(() => {
    setTabPosition(window.innerWidth <= 760 ? "top" : "left");
  }, []);

  window.addEventListener("resize", () => {
    setTabPosition(window.innerWidth <= 760 ? "top" : "left");
  });

  return (
    <>
      <Tabs tabPosition={tabPosition} defaultActiveKey="1">
        <Tabs.TabPane
          className="Psw"
          tab="Update Password"
          key="3"
          style={{ marinLeft: "2rem" }}
        >
          <Card
            className="Password"
            title="Update Password"
            style={{
              width: 550,
              color: "black",
              height: "310px",
            }}
          >
            <Form
              form={form}
              onFinish={() => {
                openNotificationWithIcon("success");
                form.resetFields();
              }}
              name="basic"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
            >
              <Row gutter={[48, 4]}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <div>Current Password</div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    key="currentpassword"
                    name="current password"
                    className="currentpsw"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password!",
                        // message: (
                        //   <div style={{ margineLeft: "-1.5rem" }}>
                        //     Please enter your current password!
                        //   </div>
                        // ),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password className="new" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[48, 4]}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <div>New Password</div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="password1"
                    key="password1"
                    // style={{ position: "relative", left: "24px" }}
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                        // message: (
                        //   <div style={{ margineLeft: "-1.5rem" }}>
                        //     Please enter your password!
                        //   </div>
                        // ),
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password className="new" />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[48, 4]}>
                <Col xs={24} sm={12} md={8} lg={8}>
                  <div>Confirm Password</div>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12}>
                  <Form.Item
                    name="password2"
                    key="password2"
                    dependencies={["password1"]}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password1") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(
                              "The two passwords that you entered do not match!"
                            )
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className="confirm"
                      // onChange={(e) => setLoginPassword(e.target.value)}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Button
                className="save"
                htmlType="submit"
                type="primary"
                // onClick={() => openNotificationWithIcon("success")}
              >
                Save Change
              </Button>
            </Form>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Update Email" key="4">
          <Card
            className="Email"
            title="Update Email"
            style={{
              width: 550,
              color: "black",
            }}
          >
            <div
              className="address"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="emailadd">
                New Email Address{" "}
                <label
                  className="Label"
                  style={{
                    color: "red",
                  }}
                >
                  {" "}
                </label>
              </div>
              <div className="email">
                <Form
                  onFinish={() => openNotificationWithIcon("success")}
                  name="basic"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                >
                  <Form.Item
                    name="email"
                    type="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Enter your new email address!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter New Email Address"
                      id="message"
                      name="message"
                      //   value={message}
                      //   onChange={handleChange}
                      // onChange={(e) => setEmail(e.target.value)}
                    />
                    {/* {error && <h2 style={{ color: "red" }}>{error}</h2>} */}
                  </Form.Item>

                  <div>
                    <Button
                      htmlType="submit"
                      type="primary"
                      //   onClick={() => openUpdateEmail("success")}
                    >
                      Save Change
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Card>
        </Tabs.TabPane>
        {/* <Tabs.TabPane tab="Delete Account" key="5">
          <Card
            className="Delete"
            title="Delete your account"
            // extra={<a href="#">Edit</a>}
            style={{
              width: 550,
            }}
          >
            <p>
              When you delete your account, you lose access to account services,
              and we permanently delete your personal data.
            </p>
            <p>Are you sure you want to close your account?</p>
            <p>
              <Checkbox style={{ color: "red" }} onChange={onChange}>
                Are you sure you want to close your account?
              </Checkbox>{" "}
            </p>
            <Button type="primary">Save Change</Button>
          </Card>
        </Tabs.TabPane> */}
      </Tabs>
    </>
  );
};

export default Settingpage;
