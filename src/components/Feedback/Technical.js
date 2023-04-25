import { EditFilled } from "@ant-design/icons";
import React, { useState } from "react";
import { Form, Input, Space, Button } from "antd";
import TextArea from "antd/lib/input/TextArea";
import "../Feedback/FeedBack.css";

function Technical() {
  const [editSkills, setEditSkills] = useState(false);

  const text =
    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus ?";

  const headingSkills = "Technical Skills";

  return (
    <div style={{ marginTop: "30px" }}>
      <Form layout="vertical">
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
              style={{ fontSize: "20px", position: "relative", left: "61rem" }}
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

        <Form.Item label="Question 1" className="que1">
          {editSkills ? (
            <TextArea className="queText" value={text} />
          ) : (
            <p className="queText">{text}</p>
          )}
          <div style={{ marginTop: "20px" }}>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              1
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              2
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              3
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              4
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                height: "30px",
                fontSize: "18px",
              }}
            >
              5
            </span>
          </div>
        </Form.Item>
        <Form.Item label="Question 2" className="que1">
          {editSkills ? (
            <TextArea className="queText" value={text} />
          ) : (
            <p className="queText">{text}</p>
          )}
          <div style={{ marginTop: "20px" }}>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              1
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              2
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              3
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              4
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                height: "30px",
                fontSize: "18px",
              }}
            >
              5
            </span>
          </div>
        </Form.Item>
        <Form.Item label="Question 3" className="que1">
          {editSkills ? (
            <TextArea className="queText" value={text} />
          ) : (
            <p className="queText">{text}</p>
          )}
          <div style={{ marginTop: "20px" }}>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              1
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              2
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              3
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              4
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                height: "30px",
                fontSize: "18px",
              }}
            >
              5
            </span>
          </div>
        </Form.Item>
        <Form.Item label="Question 4" className="que1">
          {editSkills ? (
            <TextArea className="queText" value={text} />
          ) : (
            <p className="queText">{text}</p>
          )}
          <div style={{ marginTop: "20px" }}>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              1
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              2
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              3
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                borderRight: "none",
                height: "30px",
                fontSize: "18px",
              }}
            >
              4
            </span>
            <span
              style={{
                width: "68px",
                border: "0.5px solid black",
                display: "inline-block",
                textAlign: "center",
                height: "30px",
                fontSize: "18px",
              }}
            >
              5
            </span>
          </div>
        </Form.Item>
        {editSkills ? (
          <Space>
            <Button onClick={() => setEditSkills(false)}>Cancel</Button>
            <Button>Submit</Button>
          </Space>
        ) : null}
      </Form>
    </div>
  );
}

export default Technical;
