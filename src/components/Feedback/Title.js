import React from "react";
import { Button, Card, Carousel, Tooltip } from "antd";
import { ArrowRightOutlined, RightOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";

function Title(props) {
  console.log("propsss", props);
  console.log("length", props.titleType);
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
            <Button className="startButton" onClick={() => props.nextPage()}>
              Start Survey
              <RightOutlined />
            </Button>
          </div>
        </>
      ) : props.titleType === "thankyou" ? (
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "50px", color: "#ffffff", marginTop: "4rem" }}>
            Thank You
          </h1>
          <p
            style={{
              fontSize: "20px",
              fontWeight: "600",
              marginLeft: "25px",
              textAlign: "center",
              color: "#ffffff",
            }}
          >
            Your survey has been submitted. The results will be calculated
            according to your feedback.
          </p>
        </span>
      ) : props.titleType ? (
        <div>
          <h1
            style={{
              marginTop: "2rem",
              fontWeight: "600",
              color: "#594b4b",
            }}
          >
            {props.titleType}
          </h1>
          <p style={{ marginTop: "22px", color: "#000000", fontSize: "16px" }}>
            {props.text}
          </p>
          {props.text ? <TextArea /> : null}

          <Button
            className={props.text ? "commentButton" : "skillButton"}
            onClick={() => props.nextPage()}
          >
            Continue <ArrowRightOutlined />
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default Title;
