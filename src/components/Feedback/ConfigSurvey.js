import React, { useState } from "react";
import { Button, Card, Divider, Row, Col } from "antd";
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Communication from "./Communication";
import Technical from "./Technical";
import AddSurvey from "./AddSurvey";
import { useNavigate } from "react-router-dom";
import EmpFeedback from "./EmpFeedback";

function ConfigSurvey(props) {
  console.log("propss", props);
  const navigate = useNavigate();
  const role = props.roleView == "admin";

  return (
    <>
      {role ? (
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
          <h5
            style={{
              fontStyle: "normal",
              fontWeight: "500",
              fontSize: "32px",
              lineHeight: "32px",
              color: "#707070",
              margin: "30px",
            }}
          >
            Feedback
          </h5>
          <Divider style={{ border: "0.5px inset rgb(240 232 232)" }} />
          <div style={{ margin: "30px" }}>
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
              onClick={() => navigate("/Feedback")}
            >
              Back
            </span>
            <Row style={{ marginTop: "30px" }}>
              <Col span={8}>
                <Button
                  className="comunication"
                  onClick={() => {
                    navigate("/Communication");
                  }}
                >
                  Communication Skills
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  className="comunication"
                  onClick={() => {
                    navigate("/Technical");
                  }}
                >
                  Technical Skills
                </Button>
              </Col>
              <Col span={8}>
                <Button
                  className="comunication"
                  onClick={() => {
                    navigate("/addSurvey");
                  }}
                >
                  <PlusCircleOutlined />
                  Add Survey
                </Button>
              </Col>
            </Row>
          </div>
        </Card>
      ) : (
        <EmpFeedback />
      )}
    </>
  );
}

export default ConfigSurvey;
