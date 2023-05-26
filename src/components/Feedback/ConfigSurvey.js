import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Divider,
  Row,
  Col,
  Tabs,
  Form,
  Input,
  InputNumber,
  Radio,
  Space,
} from "antd";
import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons";
import Communication from "./Communication";
import Technical from "./Technical";
import AddSurvey from "./AddSurvey";
import { useNavigate } from "react-router-dom";
import EmpFeedback from "./EmpFeedback";
import "../Feedback/FeedBack.css";

function ConfigSurvey(props) {
  // const [rankValue, setRankValue] = useState(0);
  const [addInputField, setaddInputField] = useState(0);
  const [selectRankingType, setSelectRankingType] = useState("number");

  console.log("propss", props);
  const navigate = useNavigate();
  const role = props.roleView == "admin";

  const onRankValueChange = (value) => {
    setaddInputField(value);
  };

  const radioOnChange = (e) => {
    console.log("radio checked", e.target.value);
    setSelectRankingType(e.target.value);
  };

  const renderInputField = () => {
    const inputField = [];

    for (let i = 1; i <= addInputField; i++) {
      // const label = `Input ${i} (${i}/${addInputField})`;

      inputField.push(
        <Form.Item
          key={i}
          label={i === 1 ? `Lowest ` : i === addInputField ? `Highest ` : null}
        >
          <Input
            style={
              i === 1
                ? { width: "200px" }
                : i === addInputField
                  ? { width: "200px" }
                  : { width: "200px", marginLeft: "55px" }
            }
          />
        </Form.Item>
      );
    }

    return inputField;
  };
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const isMobile = screenWidth < 600;
  const tabPosition = isMobile ? 'top' : 'left';
  return (
    <>
      {/* {role ? ( */}
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
          onClick={() => navigate("/Feedback")}
        >
          Back
        </span>
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
        <div className="responsive-tabs">
          <Tabs tabPosition={tabPosition} className="feedbackTabs">
            <Tabs.TabPane tab="Survey Questions" key="1">
              <div >
                <Row gutter={[40, 16]}>
                  <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                    <Button
                      className="comunication"
                      onClick={() => {
                        navigate("/Communication");
                      }}
                    >
                      Communication Skills
                    </Button>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={8}>
                    <Button
                      className="comunication"
                      onClick={() => {
                        navigate("/Technical");
                      }}
                    >
                      Technical Skills
                    </Button>
                  </Col>
                  <Col xs={24} sm={24} md={12} lg={12} xl={8}>
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
            </Tabs.TabPane>
            <Tabs.TabPane tab="Survey Settings" key="2">
              <div style={{ marginLeft: "20px" }}>
                <Form layout="horizontal">
                  <h2>Rankings</h2>
                  <Radio.Group
                    onChange={radioOnChange}
                    value={selectRankingType}
                  >
                    <Space direction="vertical">
                      <Radio value="number">
                        <h3>Number</h3>
                        <div style={{ display: "flex", marginTop: "13px" }}>
                          <Form.Item label="Start::">
                            <Input
                              style={{ width: "200px" }}
                              disabled={
                                selectRankingType === "custom" ? true : false
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            label="End::"
                            style={{ marginLeft: "25px" }}
                          >
                            <Input
                              style={{ width: "200px" }}
                              disabled={
                                selectRankingType === "custom" ? true : false
                              }
                            />
                          </Form.Item>
                        </div>
                      </Radio>
                      <Radio value="custom">
                        <h3> Custom</h3>
                        <Form.Item
                          label="Number of Ranks"
                          style={{ marginTop: "20px" }}
                        >
                          <InputNumber
                            min={1}
                            max={5}
                            // value={rankValue}
                            onChange={onRankValueChange}
                            disabled={
                              selectRankingType === "number" ? true : false
                            }
                          />
                        </Form.Item>
                      </Radio>
                    </Space>
                  </Radio.Group>
                  {addInputField > 0 && renderInputField()}
                </Form>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Card>

      {/* ) : (
        <EmpFeedback />
      )} */}
    </>
  );
}

export default ConfigSurvey;
