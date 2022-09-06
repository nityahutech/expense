import React, { useState } from "react";
import "../style/Settingpage.css";
import "antd/dist/antd.css";
import { Card, Col, Row, Form, Input, Checkbox } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
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
  return (
    <>
      <Tabs.TabPane tab="Update Password" key="3">
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
    </>
  );
};

export default Settingpage;
