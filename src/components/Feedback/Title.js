import React from "react";
import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";

function Title(props) {
  console.log("propsss", props);
  return (
    <>
      {props.titleType === "startPage" ? (
        <>
          <span
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <h1 style={{ fontSize: "50px", color: "#ffffff" }}>360</h1>
            <div
              style={{
                marginLeft: "10px",
                display: "flex",
                flexDirection: "column",
                marginTop: "19px",
                fontWeight: "bold",
                letterSpacing: "2px",
                color: "#ffffff",
              }}
            >
              <span>FEEDBACK</span>
              <span>REVIEW</span>
            </div>
          </span>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "25px",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            This 360° feedback assessment is designed to help managers
            understand their top strengths and prioritize any areas to improve.
          </p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button className="startButton" onClick={() => props.onStart()}>
              Start Survey
              <RightOutlined />
            </Button>
          </div>
        </>
      ) : props.titleType === "thankyou" ? (
        <h1
          onClick={() => props.onStart()}
          style={{
            width: "300px",
            backgroundImage:
              "linear-gradient(to right, rgb(13, 15, 215), rgb(37, 154, 199))",
            color: "#ffffff",
            textAlign: "center",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Thank You
        </h1>
      ) : props.type ? (
        <div>
          <h1
            style={{
              marginTop: "2rem",
              fontWeight: "600",
              color: "#594b4b",
            }}
          >
            {props.type}
          </h1>

          <Button className="skillButton" onClick={props.onStart}>
            Continue <ArrowRightOutlined />
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default Title;
