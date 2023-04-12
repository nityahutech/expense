import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import { CloudDownloadOutlined } from "@ant-design/icons";
import "./Document.css";

function Background() {
  const [backStatus, setBackStatus] = useState("Pending");

  return (
    <Form>
      <Button
        style={{
          marginTop: "25px",
          marginLeft: "20px",
          width: "150px",
          background: "#1963a6",
          color: "#ffffff",
        }}
      >
        Download File
        <CloudDownloadOutlined />
      </Button>
      <Form.Item
        label="Background Status ::"
        name="status"
        className="background"
      >
        <Input
          className="backInput"
          bordered={false}
          defaultValue={backStatus}
        />
      </Form.Item>
      <div style={{ marginLeft: "25px", fontWeight: "600" }}>
        Message :
        <span className={backStatus == "Pending" ? "message" : "errorMessage"}>
          {" "}
          {backStatus === "Pending"
            ? "Your background check is currently in progress. Please contact your HR for any further queries."
            : "Your background check contains discrepancies. Please contact your HR within 24 hours to resolve this issue. Failure to do so will result in deactivating your account"}
        </span>
      </div>
    </Form>
  );
}

export default Background;
