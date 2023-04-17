import React, { useState } from "react";
import { Button, Card, Divider, Row, Col } from "antd";
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Communication from "./Communication";
import Technical from "./Technical";
import { useNavigate } from "react-router-dom";

function ConfigSurvey() {
  const navigate = useNavigate();
  const [surveyType, setSurveyType] = useState(null);

  return (
    <>
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
                  setSurveyType("communication");
                }}
              >
                Comunication Skills
              </Button>
            </Col>
            <Col span={8}>
              <Button
                className="comunication"
                onClick={() => {
                  setSurveyType("technical");
                }}
              >
                Technical Skills
              </Button>
            </Col>
            <Col span={8}>
              <Button
                className="comunication"
                onClick={() => {
                  setSurveyType("addsurvey");
                }}
              >
                <PlusCircleOutlined />
                Add Survey
              </Button>
            </Col>
          </Row>
          {surveyType === "communication" && <Communication />}
          {surveyType === "technical" && <Technical />}
          {surveyType === "addsurvey" && (
            <Row style={{ marginTop: "30px" }}>
              <h1>addsurvey</h1>
            </Row>
          )}
        </div>
      </Card>
    </>
  );
}

export default ConfigSurvey;
