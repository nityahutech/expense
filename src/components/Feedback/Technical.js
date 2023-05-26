import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  MinusCircleOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import { Form, Input, Space, Button, Divider, Card } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../Feedback/FeedBack.css";
import { useNavigate } from "react-router-dom";

function Technical() {
  const headingSkills = "Technical Skills";
  const [editSkills, setEditSkills] = useState(false);
  const [questionDetails, setQuestionDetails] = useState([
    {
      id: 1,
      label: "Question 1",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 2,
      label: "Question 2",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 3,
      label: "Question 3",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
    {
      id: 4,
      label: "Question 4",
      questionText:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?",
    },
  ]);

  const navigate = useNavigate();

  const handleRemove = (id) => {
    const newQuestions = questionDetails.filter((title) => title.id !== id);
    setQuestionDetails(newQuestions);
  };

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

      <Form layout="vertical" style={{ margin: "30px" }}>
        {editSkills === false ? (
          <h1
            className="otherHeading"
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "35px",
              color: "#707070",
            }}
          >
            Technical Skills
            <EditFilled
              onClick={() => setEditSkills(true)}
              style={{
                fontSize: "20px",
                marginLeft: "20px",
                // position: "relative",
                // left: "58rem",
                // bottom: "5px",
              }}
            />
          </h1>
        ) : (
          <Input
            value={headingSkills}
            style={{
              fontStyle: "normal",
              fontWeight: "400",
              lineHeight: "35px",
              fontSize: "25px",
              color: "#707070",
              padding: "0px",
            }}
          />
        )}

        {questionDetails.map((title) => (
          <Form.Item
            label={
              editSkills ? (
                <div>
                  <Input
                    defaultValue={title?.label}
                    bordered={false}
                    style={{
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: "21px",
                      lineHeight: "25px",
                      width: "130px",
                    }}
                  />
                  <Button
                    style={{ border: "none", padding: "0px" }}
                    onClick={() => handleRemove(title.id)}
                  >
                    <MinusCircleOutlined
                      style={{
                        fontSize: "16px",
                        marginTop: "3px",
                      }}
                    />
                  </Button>
                </div>
              ) : (
                title?.label
              )
            }
            className="que1"
          >
            {editSkills ? (
              <TextArea className="queText" value={title?.questionText} />
            ) : (
              <p className="queTitle">{title?.questionText}</p>
            )}
          </Form.Item>
        ))}

        {editSkills ? (
          <Form.List name="fields" style={{ marginTop: "20px" }}>
            {(fields, { add, remove }) => {
              return (
                <div>
                  {fields.map((field, index) => (
                    <div key={field.key}>
                      <Form.Item name={[index, "label"]}>
                        <Input
                          placeholder="Question Number"
                          style={{ width: "200px" }}
                        />
                        {fields.length ? (
                          <Button
                            // type="danger"
                            onClick={() => remove(field.name)}
                            style={{ border: "none" }}
                          >
                            <MinusCircleOutlined style={{ fontSize: "16px" }} />
                          </Button>
                        ) : null}
                      </Form.Item>
                      <Form.Item name={[index, "questions"]}>
                        <TextArea placeholder="Enter Question Here" />
                      </Form.Item>

                      {/* <Form.Item
                        
                        name={[index, "type"]}
                        rules={[{ required: true }]}
                      >
                        <Select>
                          <Select.Option value="string">String</Select.Option>
                          <Select.Option value="dropdown">
                            Dropdown
                          </Select.Option>
                          <Select.Option value="number">Number</Select.Option>
                        </Select>
                      </Form.Item> */}
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
                </div>
              );
            }}
          </Form.List>
        ) : null}

        {editSkills ? (
          <Space className="submitCancel">
            <Button
              onClick={() => setEditSkills(false)}
              style={{ height: "36px", borderRadius: "5px" }}
            >
              <CloseOutlined />
              Cancel
            </Button>
            <Button className="submit">
              <CheckOutlined />
              Submit
            </Button>
          </Space>
        ) : null}
      </Form>
    </Card>
  );
}

export default Technical;
