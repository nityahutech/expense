import React, { useRef } from "react";
import { Button, Card, Carousel, Tooltip } from "antd";
import {
  ArrowRightOutlined,
  RightOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import "../../App.css";

function Title(props) {
  console.log("propsss", props);
  console.log("length", props.titleType);
  const outerCarouselRef = useRef(null);

  const redirectToLogin = () => {
    console.log("testttt");
    props.nextPage();
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  };

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
        <>
          <span
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h1
              style={{ fontSize: "50px", color: "#ffffff", marginTop: "4rem" }}
            >
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
        </>
      ) : props.titleType ? (
        <div>
          <div className="back-arrow">
            <ArrowLeftOutlined
              onClick={props.text ? props.backInner : props.backIn}
            />
            Back
          </div>
          <h1
            style={{
              marginTop: "20px",
              fontWeight: "600",
              color: "#ffffff",
              // marginLeft: "16px",
            }}
          >
            {props.titleType}
          </h1>
          <p style={{ marginTop: "22px", color: "#b99292", fontSize: "16px" }}>
            {props.text}
          </p>
          {props.text ? (
            <TextArea style={{ width: "50%", marginTop: "12px" }} />
          ) : null}

          <Button
            className={props.text ? "commentButton" : "skillButton"}
            onClick={() => {
              props.titleType === "Preview"
                ? redirectToLogin()
                : props.nextPage();
            }}
          >
            Continue <ArrowRightOutlined />
          </Button>
        </div>
      ) : null}
    </>
  );
}

export default Title;
