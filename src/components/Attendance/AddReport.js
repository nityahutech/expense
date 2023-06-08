import { Button, Card, DatePicker, Form, Input } from "antd";
import { showNotification } from "../../contexts/CreateContext";
import AttendanceContext from "../../contexts/AttendanceContext";
import { useAuth } from "../../contexts/AuthContext";
import moment from "moment";
import { useEffect, useState } from "react";

const AddReport = (props) => {
  console.log("propsss", props);
  const [form] = Form.useForm();
  const { currentUser } = useAuth();

  const onFinish = (values) => {
    const newData = {
      report: values?.report || "-",
      project: values?.projectName || "-",
    };
    AttendanceContext.updateAttendance(currentUser.uid, values.date, newData)
      .then((response) => {
        showNotification("success", "Success", "Record updated successfully!");
        form.resetFields();
      })
      .catch((error) => {
        showNotification(
          "error",
          "Error",
          "No records exist for this day! You were absent."
        );
      });
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card
        style={{
          width: "80%",
          borderRadius: "5px",
          marginBottom: "25px",
        }}
      >
        <Form
          form={form}
          labelCol={{
            span: 6,
            offset: 2,
          }}
          wrapperCol={{
            span: 12,
            offset: 1,
          }}
          onFinish={onFinish}
          className="form-layout"
        >
          <Form.Item
            name="date"
            label="Date"
            rules={[
              {
                required: true,
                message: "Please select a date",
              },
            ]}
          >
            <DatePicker
              placeholder=""
              disabledDate={(current) => current.isAfter(moment())}
              format={"DD-MM-YYYY"}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            name="projectName"
            label="Project Name"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="report"
            label="Report"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "4rem",
            }}
          >
            <Button
              htmlType="button"
              onClick={() => form.resetFields()}
              className="button-white"
            >
              Reset
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              className="button-color"
              style={{ marginLeft: "10px" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default AddReport;
