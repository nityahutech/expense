import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Divider,
  Input,
  Button,
  Space,
  DatePicker,
  Select,
  Form,
} from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Option } = Select;

function BankAccount() {
  const [editContent, showEditContent] = useState(false);
  const [bankName, setBankName] = useState("HDFC Bangluru");
  const [accountNumber, setAccountNumber] = useState("12345678987");
  const [ifscCode, setIfscCode] = useState("HDFC00000076");
  return (
    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        title="Bank Account Details"
        //   actions={[
        //   <EditOutlined key="edit" />,
        // ]}
        extra={
          <>
            {editContent === false ? (
              <Button
                type="text"
                style={{ color: "#4ec0f1" }}
                onClick={() => showEditContent(!editContent)}
              >
                Edit
              </Button>
            ) : null}
          </>
        }
        style={{
          width: 800,
          marginTop: 10,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Bank Name
              </div>
              {editContent === false ? (
                <div>{bankName}</div>
              ) : (
                <Input placeholder="Enter Bank Name" />
              )}
            </div>
          </Col>
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                Account Number
              </div>
              {editContent === false ? (
                <div>{accountNumber}</div>
              ) : (
                <Input placeholder="Enter Account Number" />
              )}
            </div>
          </Col>
          <Col span={10}>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                IFSC Code
              </div>
              {editContent === false ? (
                <div>{ifscCode}</div>
              ) : (
                <Input placeholder="Enter IFSC Code" />
              )}
            </div>
          </Col>
        </Row>

        {editContent === true ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "3%",
            }}
          >
            <Button
              onClick={() => showEditContent(false)}
              type="text"
              style={{ fontSize: 15 }}
            >
              <CloseOutlined /> CANCEL
            </Button>
            <Col>
              <Button type="primary" style={{ marginLeft: "10px" }}>
                SAVE
              </Button>
            </Col>
          </Row>
        ) : null}
      </Card>
    </div>
  );
}

export default BankAccount;
