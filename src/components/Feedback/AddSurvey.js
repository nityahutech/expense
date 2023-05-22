import { Form, Input, Button, Divider, Space, Card } from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  MinusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import { useNavigate } from "react-router-dom";

function AddSurvey() {
  const navigate = useNavigate();

  return (
    <Card
      className="feedBackCard"
      style={{
        margin: "30px",
        background: "#FFFFFF",
        border: "1px solid #C0C0C0",
        borderRadius: "5px",
        height: "auto",
      }}
    >
      <ArrowLeftOutlined
        style={{ color: "#707070" }}
        onClick={() => navigate("/Feedback")}
      />
      <span
        style={{
          fontStyle: "normal",
          fontWeight: "400",
          fontSize: "15px",
          lineHeight: "15px",
          color: "#707070",
          marginLeft: "4px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/ConfigSurvey")}
      >
        Back
      </span>
      <Divider />
      <Form layout="horizontal" style={{ margin: "30px" }}>
        <Form.Item className="skillName">
          <Input placeholder="Enter Skills Name" style={{ width: "300px" }} />
        </Form.Item>

        <Form.List name="fields" style={{ marginTop: "20px" }}>
          {(fields, { add, remove }) => {
            return (
              <div>
                {fields.map((field, index) => (
                  <div key={field.key}>
                    <Form.Item
                      name={[index, "label"]}
                      label={"Question" + (index + 1)}
                      className="que1"
                    >
                      {fields.length ? (
                        <Button
                          // type="danger"
                          onClick={() => remove(field.name)}
                          style={{ border: "none" }}
                        >
                          <MinusCircleOutlined
                            style={{ fontSize: "16px" }}
                            className="minusRemove"
                          />
                        </Button>
                      ) : null}
                    </Form.Item>
                    <Form.Item name={[index, "questions"]}>
                      <TextArea placeholder="Enter Question Here" />
                    </Form.Item>
                  </div>
                ))}

                <Divider />
                <Form.Item>
                  <Button
                    className="addQue"
                    // type="dashed"
                    onClick={() => add()}
                  >
                    <PlusCircleOutlined />
                    Add Questions
                  </Button>
                </Form.Item>
                {fields.length >= 1 ? (
                  <Space>
                    <Button className="submit" style={{ marginTop: "20px" }}>
                      <CheckOutlined />
                      Save
                    </Button>
                  </Space>
                ) : null}
              </div>
            );
          }}
        </Form.List>
      </Form>
    </Card>
  );
}

export default AddSurvey;
