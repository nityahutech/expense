import { useState, useEffect } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input, notification, Divider } from "antd";
import { Button } from "antd";
import { Tabs } from "antd";
import { useAuth } from "../contexts/AuthContext";

const showNotification = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

const Settingpage = () => {
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNew] = useState("");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { updateMyPassword, updateMyEmail, login } = useAuth();

  useEffect(() => {
    // setTabPosition(window.innerWidth <= 768 ? "top" : "left");
  }, []);

  window.addEventListener("resize", () => {
    // setTabPosition(window.innerWidth <= 768 ? "top" : "left");
  });

  const handleEmailSubmit = async () => {
    try {
      await updateMyEmail(email);
      showNotification("success", "Success", "Record updated successfuly");
    } catch {
      showNotification("error", "Failed", "Record update failed");
    }
  };

  const checkPassword = async () => {
    try {
      await login(currentUser.email, password);
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
        defaultActiveKey="1"
        className="settingsTab"
      >
        <Tabs.TabPane tab="Update Password" key="1">
          <div className="update-card">
            <Card
              title="UPDATE PASSWORD"
              className="updatepsw"
              hoverable={true}
              bordered={true}
            >
              <div className="updatepsform">
                <Form
                    form={form}
                    onFinish={() => {
                      form.resetFields();
                    }}
                    name="basic"
                    key={"psw"}
                    
                    initialValues={{
                      remember: true,
                    }}
                    autoComplete="off"
                    colon={true}
                  >
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          label="Current Password"
                          key="currentpassword"
                          name="current password"
                          className="currentpsw"
                          rules={[
                            {
                              required: true,
                              message: "Please enter your current password!",
                              
                            },
                            {
                              pattern: /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,40}$/,
                              message: "Please enter min 8 character including special character,number,upper and lower letters. "
                            }
                          ]}
                          
                          onChange={(e) => setPassword(e.target.value)}
                          labelCol={{
                            span: 5,
                            offset: 6,
                          }}
                          wrapperCol={{
                            span: 7,
                            
                          }}
                        >
                          <Input.Password
                            className="new"
                            type="password"
                            maxLength={40}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          label="New Password"
                          name="password1"
                          key="password1"
                          rules={[
                            {
                              required: true,
                              message: "Please enter new password!",
                              
                            },
                            {
                              pattern: /^(?!.* )(?=.*\d)(?=.*[A-Z]).{8,40}$/,
                              message: "Please enter min 8 character including special character,number,upper and lower letters. "
                            }
                          ]}
                          
                          onChange={(e) => setNew(e.target.value)}
                          labelCol={{
                            span: 5,
                            offset: 6,
                          }}
                          wrapperCol={{
                            span: 7,
                            
                          }}
                        >
                          <Input.Password
                            className="new"
                            type="password"
                            maxLength={40}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                        labelCol={{
                          span: 5,
                          offset: 6,
                        }}
                        wrapperCol={{
                          span: 7,
                          
                        }}
                          label="Confirm Password"
                          name="password2"
                          key="password2"
                          dependencies={["password1"]}

                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (
                                  !value ||
                                  getFieldValue("password1") === value
                                ) {
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
                      <Col span={24} className="save-button-col">
                        <Button
                          style={{ background: "#1963A6" }}
                          className="save-button"
                          htmlType="submit"
                          type="primary"
                          onClick={handlePasswordSubmit}
                        >
                          Save Change
                        </Button>
                      </Col>
                    </Row>
                </Form>
              </div>
            </Card>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Update Email" key="2" className="tabPanel">
        <div className="update-card">
          <Card
            className="updatepsw"
            title="UPDATE EMAIL"
            hoverable={true}
          >
            <div style={{ background: "#fff", marginLeft: "10px" }}>
              <Form
                form={emailForm}
                onFinish={() => {
                  // openUpdateEmail("success");
                  emailForm.resetFields();
                }}
                name="email"
                key={"email"}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
              >
                <Row gutter={[8, 4]}>
                  <Col span={24}>
                    <Form.Item
                    labelCol={{
                      span: 5,
                      offset: 6,
                    }}
                    wrapperCol={{
                      span: 7,
                      
                    }}
                      label="New Email Address"
                      name="email"
                      rules={[
                        {
                          type: "email",
                          required: true,
                          message: "Enter your new email address!",
                          pattern:
                            "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
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
                  <Col span={24} className="save-button-col">
                    <Button
                      style={{ background: "#1963A6" }}
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
            </div>

            {/* </div>
            </div> */}
          </Card>
        </div>
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
