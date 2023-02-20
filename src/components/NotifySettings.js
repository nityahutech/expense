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
import "../style/Settingpage.css"

function NotifySettings(props) {
  console.log(props.data);
  const [previewBirthImg, setPreviewBirthImg] = useState("");
  const [previewAnniversaryImg, setPreviewAnniversaryImg] = useState("");

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
            <Switch />
          </Form.Item>
          <Divider orientation="left">Birthday Templates</Divider>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card className="birthdayPreviewDiv" >
                {previewBirthImg && (
                  <>
                    <img 
                    className="birthdaytemplateImg"
                    src={previewBirthImg} />
                    <Button 
                    className="templateButton"
                    onClick={() => setPreviewBirthImg("")}>
                      {" "}
                      Close
                    </Button>
                  </>
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
            <Switch />
          </Form.Item>
          <Divider orientation="left">Anniversary Templates</Divider>
          <Row gutter={[16, 16]}>
            <Col span={18}>
              <Card className="anniversaryPreviewDiv">
                {previewAnniversaryImg && (
                  <>
                    <img 
                    className="anniversarytemplateImg"
                    src={previewAnniversaryImg} />
                    <Button 
                    className="templateButton"
                    onClick={() => setPreviewAnniversaryImg("")}>
                      {" "}
                      Close
                    </Button>
                  </>
                )}
              </Card>
            </Col>
            <Col span={6}>
              <Card
                className="anniversaryTempelateList"
              >
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

        </Form>
      </Card>
    </div>
  );
}

export default NotifySettings;
