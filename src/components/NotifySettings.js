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
  Popover,
  message,
} from "antd";
import { InfoCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined
} from "@ant-design/icons";
import Image1 from "../images/Attendancelog.png";
import Image2 from "../images/companyvision.png";
import Image3 from "../images/facebook.png";
import Image4 from "../images/twitter.png";
import LayoutImage from "../images/Vertical-Layout.svg"
import LayoutImage2 from "../images/Block-Layout.svg";
import "../style/Settingpage.css";

function NotifySettings(props) {
  console.log(props.data);
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(props.fileName || null);
  const [imageUrl, setImageUrl] = useState(props.imageUrl || "");
  const [previewBirthImg, setPreviewBirthImg] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
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

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }

  const handleClick = () => {
    imgRef.current.click();
  };

  const handleChange = (event) => {
    // if (!event) {
    //   return;
    // }
    // const fileUploaded = event.target.files[0];
    // getBase64(fileUploaded, (url) => {
    //   setImageUrl(url);
    // });
    // checkFileSize(fileUploaded.size, fileUploaded);
  };

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

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
                  {/* <Row gutter={[16, 16]}>
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
                  </Row> */}
                  <Divider orientation="left">
                    Background 
                    <Popover content={content} title="Title">
                      <InfoCircleOutlined className="informationLogo"/>
                    </Popover>
                  </Divider>
                  <Col >
                      <Form.Item
                        name="logo"
                        className="uploadLogo"
                        rules={[
                          { required: true, message: "Please Upload the Company Logo" },
                        ]}
                      >
                        <div
                          style={{
                            border: "dashed #B9B9B9",
                            borderWidth: "thin",
                            borderRadius: "4px",
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          {isBigFile
                            ? message.error("File size must be less than 200Kb.")
                            : ""}
                          <input
                            style={{
                              display: "none",
                            }}
                            type="file"
                            id="logo"
                            name="logo"
                            ref={imgRef}
                            onChange={(e) => handleChange(e)}
                          />
                          {fileName ? (
                            <div className="hoverImgCont">
                              <img
                                // src={imageUrl}
                                style={{
                                  maxWidth: "170px",
                                  height: "100px",
                                  padding: "10px",
                                }}
                              />
                              <div className="onboardOverlay">
                                <DeleteOutlined className="hoverIcon" 
                                onClick={onReset} 
                                />
                              </div>
                            </div>
                          ) : (
                            <>
                              <Button
                                onClick={(e) => handleClick(e)}
                                style={{
                                  width: "60px",
                                  height: "50px",
                                  margin: "10px",
                                }}
                              >
                                <PlusCircleOutlined
                                  style={{
                                    display: "flex",
                                    flexDirection: "column-reverse",
                                    alignItems: "center",
                                  }}
                                />
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginRight: "8px",
                                  }}
                                >
                                  Upload
                                </span>
                              </Button>
                              <p
                                style={{
                                  fontWeight: "400",
                                  fontSize: "13px",
                                  lineHeight: "19px",
                                  marginLeft: "5px",
                                  marginTop: "10px",
                                }}
                              >
                                Upload logo. Use the 200 kb size image. PNG or JPEG file
                                format accepted
                              </p>
                            </>
                          )}
                        </div>
                      </Form.Item>
                    </Col>
                  <Divider orientation="left">
                    Layout 
                    <Popover content={content} title="Title">
                      <InfoCircleOutlined className="informationLogo"/>
                    </Popover>
                  </Divider>
                  <Row gutter={[16,16]}>
                    <Col span={24} className="birthdayTemplates">
                        <Card hoverable={true} className="layoutCard">
                          <img
                            src={LayoutImage}
                            width={80}
                            onClick={() => {
                              handleBirthImageclick(LayoutImage);
                            }}
                          />
                        </Card>
                      </Col>
                      <Col span={24} className="birthdayTemplates">
                        <Card hoverable={true} className="layoutCard">
                          <img
                            src={LayoutImage2}
                            width={80}
                            onClick={() => {
                              handleBirthImageclick(LayoutImage2);
                            }}
                          />
                        </Card>
                      </Col>
                      <Divider orientation="left">
                      Form 
                      <Popover content={content} title="Title">
                        <InfoCircleOutlined className="informationLogo"/>
                      </Popover>
                    </Divider>
                    
                  </Row>
                </Card>
              </Col>
            </Row>
          </div>
          <Divider />

          {/* <Form.Item
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
          </div> */}
        </Form>
      </Card>
    </div>
  );
}

export default NotifySettings;
