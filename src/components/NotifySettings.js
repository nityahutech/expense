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
              span: 18,
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
          <Divider orientation="left">Templates</Divider>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card style={{ height: "29.5vh", borderRadius: "10px" }}>
                {previewBirthImg && (
                  <>
                    <img src={previewBirthImg} />
                    <Button onClick={() => setPreviewBirthImg("")}>
                      {" "}
                      Close
                    </Button>
                  </>
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <img
                      src={Image1}
                      width={80}
                      onClick={() => {
                        handleBirthImageclick(Image1);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={Image2}
                      width={80}
                      onClick={() => {
                        handleBirthImageclick(Image2);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={Image3}
                      width={80}
                      onClick={() => {
                        handleBirthImageclick(Image3);
                      }}
                    />
                  </Col>
                  <Col span={12}>
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
              span: 18,
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
          <Divider orientation="left">Templates</Divider>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card style={{ height: "29.5vh", borderRadius: "10px" }}>
                {previewAnniversaryImg && (
                  <>
                    <img src={previewAnniversaryImg} />
                    <Button onClick={() => setPreviewAnniversaryImg("")}>
                      {" "}
                      Close
                    </Button>
                  </>
                )}
              </Card>
            </Col>
            <Col span={12}>
              <Card
                style={{
                  borderRadius: "10px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <img
                      src={Image1}
                      width={80}
                      onClick={() => {
                        handleAnniversaryClick(Image1);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={Image2}
                      width={80}
                      onClick={() => {
                        handleAnniversaryClick(Image2);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <img
                      src={Image3}
                      width={80}
                      onClick={() => {
                        handleAnniversaryClick(Image3);
                      }}
                    />
                  </Col>
                  <Col span={12}>
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
