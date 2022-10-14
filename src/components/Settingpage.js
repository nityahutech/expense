import React, { useState, useEffect } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input, notification } from "antd";
import { Button } from "antd";
import { Tabs } from "antd";
import { useAuth } from "../contexts/AuthContext";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const showNotification = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
const openNotificationWithIcon = (type) => {
  notification[type]({
    message: "Successfully",
    description: "Password changed successfully",
  });
};

const Settingpage = () => {
  const [tabPosition, setTabPosition] = useState("left");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNew] = useState("");

  const { currentUser, updateMyPassword, deletePerson, updateMyEmail, login } =
    useAuth();

  const openUpdateEmail = (type) => {
    notification[type]({
      message: "Successfully",
      description: "Email Address changed successfully",
    });
  };

  useEffect(() => {
    setTabPosition(window.innerWidth <= 768 ? "top" : "left");
  }, []);

  window.addEventListener("resize", () => {
    setTabPosition(window.innerWidth <= 768 ? "top" : "left");
  });

  const handleEmailSubmit = async () => {
    console.log(email);
    try {
      await updateMyEmail(email);
      showNotification("success", "Success", "Record updated successfuly");
    } catch {
      showNotification("error", "Failed", "Record update failed");
    }
  };

  const checkPassword = async () => {
    try {
      let check = await login(currentUser.email, password);
      console.log(check);
      console.log("Correct Password!");
      return true;
    } catch {
      showNotification("error", "Failed", "Incorrect password");
      return false;
    }
  };

  const handlePasswordSubmit = async () => {
    let check = await checkPassword();
    if (check) {
      try {
        await updateMyPassword(newPassword);
        showNotification("success", "Success", "Record updated successfuly");
      } catch {
        showNotification("error", "Failed", "Record update failed");
      }
    }
  };

  return (
    <>
      <Tabs
        tabPosition={tabPosition}
        defaultActiveKey="1"
        className="settingsTab"
      >
        <Tabs.TabPane className="tabPanel" tab="Update Password" key="3">
          <Card className="settingsCard" title="Update Password">
            <Form
              form={form}
              onFinish={() => {
                form.resetFields();
              }}
              name="basic"
              className="uppsw"
              key={"psw"}
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
              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  <div className="cupsw">Current Password</div>
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
                  <Form.Item
                    key="currentpassword"
                    name="current password"
                    className="currentpsw"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password!",
                      },
                    ]}
                    hasFeedback
                    onChange={(e) => setPassword(e.target.value)}
                  >
                    <Input.Password
                      className="new"
                      type="password"
                      maxLength={40}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  <div className="npsw">New Password</div>
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
                  <Form.Item
                    name="password1"
                    key="password1"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                    hasFeedback
                    onChange={(e) => setNew(e.target.value)}
                  >
                    <Input.Password
                      className="new"
                      type="password"
                      maxLength={40}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  <div className="copsw">Confirm Password</div>
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
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
                      type="password"
                      maxLength={40}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  {" "}
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
                  <Button
                    className="save"
                    htmlType="submit"
                    type="primary"
                    onClick={handlePasswordSubmit}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Update Email" key="4" className="tabPanel">
          <Card
            className="settingsCard"
            title="Update Email"
            // style={{
            //   width: 550,
            //   color: "black",
            // }}
          >
            {/* <div
              className="address"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="email"> */}
            <Form
              form={emailForm}
              onFinish={() => {
                // openUpdateEmail("success");
                emailForm.resetFields();
              }}
              name="email"
              key={"email"}
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
              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  New Email Address
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "Enter your new email address!",
                        pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Enter New Email Address"
                      id="message"
                      name="message"
                      //   value={message}
                      //   onChange={handleChange}
                      onChange={(e) => setEmail(e.target.value)}
                      maxLength={40}
                    />
                    {/* {error && <h2 style={{ color: "red" }}>{error}</h2>} */}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[8, 4]}>
                <Col xs={22} sm={10} md={8} lg={6}>
                  {" "}
                </Col>
                <Col xs={22} sm={10} md={10} lg={10}>
                  <Button
                    className="newemail"
                    htmlType="submit"
                    type="primary"
                    onClick={handleEmailSubmit}
                  >
                    Save Change
                  </Button>
                </Col>
              </Row>
            </Form>
            {/* </div>
            </div> */}
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
