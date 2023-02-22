import React, { useEffect, useState } from "react";
import {
  Tabs,
  Table,
  Button,
  Form,
  Input,
  DatePicker,
  Spin,
  Card,
  Divider,
  Radio,
  Switch,
  TimePicker,
  InputNumber,
  Row,
  Col,
} from "antd";
import Image1 from "../images/Attendance.png";
import Image2 from "../images/companyvision.png";
import Image3 from "../images/facebook.png";
import Image4 from "../images/twitter.png";
import "../style/Settingpage.css";

function NotifySettings(props) {
  console.log(props.data);
  const [previewBirthImg, setPreviewBirthImg] = useState("");
  const [previewAnniversaryImg, setPreviewAnniversaryImg] = useState("");
  const [checkBirthDisabled, setCheckBirthDisabled] = useState(true);
  const [checkAnniversaryDisabled, setCheckAnniversaryDisabled] =
    useState(true);

  const handleBirthImageclick = (src) => {
    setPreviewBirthImg(src);
  };

  const handleAnniversaryClick = (src) => {
    setPreviewAnniversaryImg(src);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "5px",
          marginBottom: "25px",
          width: "80%",
        }}
      >
        <Form>
          <Form.Item
            labelCol={{
              span: 23,
              // offset: 2,
            }}
            wrapperCol={{
              span: 14,
              // offset: 1,
            }}
            label="Birthday Notification"
            colon={true}
          >
            <Switch
              className="planSwitch"
              checkedChildren=""
              unCheckedChildren=""
              defaultChecked
              onChange={(e) => {
                setCheckBirthDisabled(e);
              }}
            />
          </Form.Item>
          <div
            style={
              checkBirthDisabled
                ? {}
                : {
                    pointerEvents: "none",
                    opacity: "0.4",
                    cursor: "not-allowed",
                  }
            }
          >
            <Divider orientation="left">Birthday Templates</Divider>
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <Card className="birthdayPreviewDiv">
                  {previewBirthImg ? (
                    <>
                      <img
                        className="birthdaytemplateImg"
                        src={previewBirthImg}
                        width={368}
                      />
                      <Button
                        className="templateButton"
                        onClick={() => setPreviewBirthImg("")}
                      >
                        Close
                      </Button>
                    </>
                  ) : (
                    <div
                      style={{
                        marginTop: "11rem",
                        fontSize: "24px",
                        fontWeight: "600",
                        height: "25vh",
                      }}
                    >
                      <p>Preview Template</p>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={6}>
                <Card className="birthdayTempelateList">
                  <Row gutter={[16, 16]}>
                    <Col span={24} className="birthdayTemplates">
                      <img
                        src={Image1}
                        width={80}
                        onClick={() => {
                          handleBirthImageclick(Image1);
                        }}
                      />
                    </Col>
                    <Col span={24} className="birthdayTemplates">
                      <img
                        src={Image2}
                        width={80}
                        onClick={() => {
                          handleBirthImageclick(Image2);
                        }}
                      />
                    </Col>
                    <Col span={24} className="birthdayTemplates">
                      <img
                        src={Image3}
                        width={80}
                        onClick={() => {
                          handleBirthImageclick(Image3);
                        }}
                      />
                    </Col>
                    <Col span={24} className="birthdayTemplates">
                      <img
                        src={Image4}
                        width={80}
                        onClick={() => {
                          handleBirthImageclick(Image4);
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <Divider />

          <Form.Item
            labelCol={{
              span: 23,
              // offset: 2,
            }}
            wrapperCol={{
              span: 14,
              // offset: 1,
            }}
            label="Aniversary Notification"
            colon={true}
          >
            <Switch
              className="planSwitch"
              checkedChildren=""
              unCheckedChildren=""
              defaultChecked
              onChange={(e) => {
                setCheckAnniversaryDisabled(e);
              }}
            />
          </Form.Item>
          <div
            style={
              checkAnniversaryDisabled
                ? {}
                : {
                    pointerEvents: "none",
                    opacity: "0.4",
                    cursor: "not-allowed",
                  }
            }
          >
            <Divider orientation="left">Anniversary Templates</Divider>
            <Row gutter={[16, 16]}>
              <Col span={18}>
                <Card className="anniversaryPreviewDiv">
                  {previewAnniversaryImg ? (
                    <>
                      <img
                        className="anniversarytemplateImg"
                        src={previewAnniversaryImg}
                        width={368}
                      />
                      <Button
                        className="templateButton"
                        onClick={() => setPreviewAnniversaryImg("")}
                      >
                        Close
                      </Button>
                    </>
                  ) : (
                    <div
                      style={{
                        marginTop: "11rem",
                        fontSize: "24px",
                        fontWeight: "600",
                        height: "25vh",
                      }}
                    >
                      <p>Preview Template</p>
                    </div>
                  )}
                </Card>
              </Col>
              <Col span={6}>
                <Card className="anniversaryTempelateList">
                  <Row gutter={[16, 16]}>
                    <Col span={24} className="anniversaryTemplates">
                      <img
                        src={Image1}
                        width={80}
                        onClick={() => {
                          handleAnniversaryClick(Image1);
                        }}
                      />
                    </Col>
                    <Col span={24} className="anniversaryTemplates">
                      <img
                        src={Image2}
                        width={80}
                        onClick={() => {
                          handleAnniversaryClick(Image2);
                        }}
                      />
                    </Col>
                    <Col span={24} className="anniversaryTemplates">
                      <img
                        src={Image3}
                        width={80}
                        onClick={() => {
                          handleAnniversaryClick(Image3);
                        }}
                      />
                    </Col>
                    <Col span={24} className="anniversaryTemplates">
                      <img
                        src={Image4}
                        width={80}
                        onClick={() => {
                          handleAnniversaryClick(Image4);
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default NotifySettings;
