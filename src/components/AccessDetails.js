import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  DatePicker,
  Divider,
  Form,
  Input,
  Radio,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import "../style/Onboarding.css";

function AccessDetails() {
  const [addAccess, setAddAccess] = useState(false);
  const [accessList, setAccessList] = useState([]);
  const [form] = Form.useForm();
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  function addUseRole(values) {
    form.resetFields();
    setAddAccess(false);
  }

  return (
    <>
      <Form
        name="basic"
        form={form}
        layout="horizontal"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
        onFinish={addUseRole}
      >
        {addAccess ? (
          <Card
            style={{
              background: "#FAFAFA",
              border: "1px solid #EAEAEA",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              margin: " 5rem",
            }}
          >
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "17px",
                color: "rgba(0,0,0,0.85)",
              }}
            >
              AccessDetails
            </div>
            <Divider />
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#444444",
                marginLeft: "14px",
              }}
            >
              User Details
            </div>
            <Divider
              style={{
                borderTop: "1px dashed #8C8C8C",
                margin: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: " relative",
                left: "9rem",
                top: "20px",
              }}
            >
              <Form.Item
                className="userLabel"
                name="fName"
                label="First Name:"
                rules={[
                  {
                    required: true,
                    message: "Please Enter First Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  placeholder="First Name"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="lName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Last Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="dob" label="Date of Birth">
                <DatePicker
                  placeholder="Date of Birth"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Phone Number",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Number",
                  },
                ]}
              >
                <Input
                  placeholder="Phone Number"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="gender" label="Gender">
                <Radio.Group onChange={onChange} value={value}>
                  <Radio className="radio" value={1}>
                    Male
                  </Radio>
                  <Radio className="radio" value={2}>
                    Female
                  </Radio>
                  <Radio className="radio" value={3}>
                    Other
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
            <div
              style={{
                fontWeight: "600",
                fontSize: "14px",
                lineHeight: "16px",
                color: "#444444",
                marginLeft: "14px",
                marginTop: "35px",
              }}
            >
              Employment Details
            </div>
            <Divider
              style={{
                borderTop: "1px dashed #8C8C8C",
                margin: "12px",
              }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                position: " relative",
                left: "9rem",
                top: "20px",
              }}
            >
              <Form.Item className="userLabel" name="empId" label="Employee ID">
                <Input
                  placeholder="Employee ID"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="email"
                label="Email Address"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Email Address",
                    type: "email",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Address",
                  },
                ]}
              >
                <Input
                  placeholder="Email Address"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="doj"
                label="Date of Joining"
              >
                <DatePicker
                  placeholder="Date of Joining"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="businessPlace"
                label="Place of Business"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Place",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
              >
                <Select
                  bordered={false}
                  placeholder="Select Team"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  options={[
                    {
                      value: "head",
                      label: "Head Office",
                    },
                    {
                      value: "branch",
                      label: "Branch Office",
                    },
                  ]}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="designation"
                label="Designation"
              >
                <Input
                  placeholder="Enter Designation"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="businessUnit"
                label="Business Unit"
              >
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                  //   options={[
                  //     {
                  //       value: "head",
                  //       label: "Head Office",
                  //     },
                  //     {
                  //       value: "branch",
                  //       label: "Branch Office",
                  //     },
                  //   ]}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="division" label="Division">
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="department"
                label="Department"
              >
                <Select
                  bordered={false}
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="team" label="Team">
                <Input
                  placeholder="Default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item
                className="userLabel"
                name="managerSupervisor"
                label="Manager/Supervisor"
              >
                <Input
                  placeholder="default"
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
              <Form.Item className="userLabel" name="note" label="Note">
                <TextArea
                  rows={4}
                  style={{
                    width: "330px",
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                    background: "#ffffff",
                  }}
                />
              </Form.Item>
            </div>
          </Card>
        ) : null}
      </Form>
      <Card
        style={{
          background: "#FAFAFA",
          border: "1px solid #EAEAEA",
          borderRadius: "5px",
          display: "flex",
          flexDirection: "column",
          margin: " 5rem",
        }}
      >
        <div
          style={{ fontWeight: "600", fontSize: "14px", lineHeight: "17px" }}
        >
          AccessDetails
        </div>
        <Divider />

        <Button
          style={{
            color: "#095AA4",
            border: "none",
            backgroundColor: "#FAFAFA",
            fontWeight: "600",
            fontSize: "14px",
            lineHeight: "17px",
          }}
          onClick={() => {
            if (addAccess) {
              form.submit();
            }
            setAddAccess(!addAccess);
          }}
        >
          <PlusCircleOutlined /> Add
        </Button>
      </Card>
    </>
  );
}

export default AccessDetails;
