import React, { useState } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input, Checkbox } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import { Tabs } from "antd";
import { Menu } from "antd";
import Column from "antd/lib/table/Column";
import { Avatar } from "antd";

const { Meta } = Card;

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};

const Settingpage = () => {
  const [tabPosition] = useState("left");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event) => {
    if (!isValidEmail(event.target.value)) {
      setError("Email is invalid");
    } else {
      setError(null);
    }

    setMessage(event.target.value);
  };
  return (
    <>
      <Tabs tabPosition={tabPosition} defaultActiveKey="1">
        <Tabs.TabPane className="Psw" tab="Update Password" key="3">
          <Card
            className="Password"
            title="Update Password"
            style={{
              width: 550,
              color: "black",
            }}
          >
            <div
              className="foremail"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="emaildiv">
                Current Password<label style={{ color: "red" }}> </label>
              </div>
              <div className="pwdInputdiv">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Enter your password!",
                    },
                  ]}
                >
                  <Input.Password
                  // onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
            <div
              className="foremail"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="emaildiv">
                New Password<label style={{ color: "red" }}> </label>
              </div>
              <div className="pwdInputdiv">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Enter your password!",
                    },
                  ]}
                >
                  <Input.Password
                  // onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
            <div
              className="foremail"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <div className="emaildiv">
                Confirm new password<label style={{ color: "red" }}> </label>
              </div>
              <div className="pwdInputdiv">
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Enter your password!",
                    },
                  ]}
                >
                  <Input.Password
                  // onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </Form.Item>
              </div>
            </div>
            <div
              className="req-div"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div class="rec-sm" style={{ float: "" }}>
                <h2>Password requirements:</h2>
                <p class="mb-2">Ensure that these requirements are met:</p>
                <ul class="list-unstyled small">
                  <li>Minimum 8 characters long - the more, the better</li>
                  <li>At least one lowercase character</li>
                  <li>At least one uppercase character</li>
                  <li>At least one number, symbol</li>
                </ul>
              </div>
              <div>
                <Button type="primary">Save Change</Button>
              </div>
            </div>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Update Email Address" key="4">
          <Card
            className="Email"
            title="Update Email Address"
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
                <Form.Item
                  name="email"
                  type="email"
                  //   rules={[
                  //     {
                  //       required: true,
                  //       message: "Enter your new email address!",
                  //     },
                  //   ]}
                >
                  <Input
                    placeholder="Enter New Email Address"
                    id="message"
                    name="message"
                    value={message}
                    onChange={handleChange}
                    // onChange={(e) => setEmail(e.target.value)}
                  />
                  {error && <h2 style={{ color: "red" }}>{error}</h2>}
                </Form.Item>
                <div>
                  <Button type="primary">Save Change</Button>
                </div>
              </div>
            </div>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Delete Account" key="5">
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
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Settingpage;
