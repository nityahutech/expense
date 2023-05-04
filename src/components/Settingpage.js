import { useState } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input } from "antd";
import { Button } from "antd";
import { Tabs } from "antd";
import { useAuth } from "../contexts/AuthContext";
import { showNotification } from "../contexts/CreateContext";
import NotifySettings from "./NotifySettings";

const Settingpage = (props) => {
  console.log('propsroleView', props.roleView);
  const [form] = Form.useForm();
  const [password, setPassword] = useState("");
  const [newPassword, setNew] = useState("");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const { updateMyPassword, login } = useAuth();

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
        {props.roleView === 'admin' &&
          <Tabs.TabPane tab="Notifications" key="2">
            <NotifySettings data={"hi"} />
          </Tabs.TabPane>
        }
      </Tabs>
    </>
  );
};

export default Settingpage;
