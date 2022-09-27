import React from "react";

import { useState } from "react";

import { Card, Col, Row, Input, DatePicker, Button, Form } from "antd";

import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditTwoTone,
} from "@ant-design/icons";
import "../../style/BankAccount.css";

function BankAccount() {
  const [editContent, showEditContent] = useState(false);
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card title="Bank Account" className="card">
      <Row>
        <Col xs={22} sm={22} md={12}>
          <Button
            type="text"
            style={{ background: "#40a9ff", color: "white" }}
            onClick={() => showEditContent(!editContent)}
          >
            <PlusCircleOutlined />
            Add Bank Account
          </Button>
        </Col>
      </Row>
      {editContent === true ? (
        <Form
          className="form"
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
          <Form.Item
            className="name"
            label="Bank Name"
            name="bankname"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter bank name!",
              },
              {
                pattern: /^[a-zA-Z\s]*$/,
                message: "Please enter Valid Name",
              },
            ]}
          >
            <Input className="inputName" />
          </Form.Item>
          <Form.Item
            className="number"
            label="Account Number"
            name="accountnumber"
            onKeyPress={(event) => {
              if (checkNumbervalue(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter account number!",
              },
            ]}
          >
            <Input maxLength={17} className="inputNumber" />
          </Form.Item>
          <Form.Item
            className="ifsc"
            label="IFSC Code"
            name="ifsccode"
            rules={[
              {
                required: true,
                message: "Please enter valid code!",
              },
            ]}
          >
            <Input className="inputCode" />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <div style={{ position: "relative", left: "4rem" }}>
              {" "}
              <Button type="primary" className="save" htmlType="submit">
                Save
              </Button>
              <Button
                onClick={() => showEditContent(!editContent)}
                className="cancel"
              >
                {/* <CloseOutlined /> */}
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Form>
      ) : null}
    </Card>
  );
}

export default BankAccount;
