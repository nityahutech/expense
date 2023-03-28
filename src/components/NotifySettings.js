import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Card,
  Divider,
  Radio,
  Row,
  Col,
  Popover,
  message,
  Input,
  Image,
} from "antd";
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
  CloseOutlined,
  CheckOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import birthday from "../images/birthday.svg";
import anniversary from "../images/anniversary.svg";
import NewJoining from "../images/NewJoining.svg";
import FormItem from "antd/es/form/FormItem";
import "../style/Settingpage.css";
import TextArea from "antd/lib/input/TextArea";

const options = [
  { label: "Default Template", value: "1" },
  { label: "Custom Template", value: "2" },
];

function NotifySettings(props) {
  console.log(props.data);
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(props.fileName || null);
  const [imageUrl, setImageUrl] = useState(props.imageUrl || "");
  const [isBigFile, setIsBigFile] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [checkBirthDisabled, setCheckBirthDisabled] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState("1");
  const [award, setAward] = useState(false);
  const [isDefaultTemplateSelected, setIsDefaultTemplateSelected] =
    useState("1");

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

  const handleChange = (event) => { };

  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const radioChange = (event) => {
    // setSelectedOptions(value);
    // // setShowCustomTemplate(value === '2')
    // setCheckBirthDisabled(value === "2");
    setIsDefaultTemplateSelected(event.target.value);
  };

  const selectAward = (award) => {
    setAward(true);
    setSelectedAward(award);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Card
        style={{
          borderRadius: "5px",
          marginBottom: "25px",
          width: "90%",
        }}
      >
        <div>
          <Col>
            <p>System Award</p>
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              cursor: "pointer",
            }}
          >
            <div
              onClick={() => selectAward("Birthday")}
              style={{
                animation: "slidein 1s forwards",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img className="birthdaytemplateImg" src={birthday} />
              <p>BirthDay</p>
            </div>
            <div
              onClick={() => selectAward("Anniversary")}
              style={{
                animation: "slidein 1s forwards",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img className="birthdaytemplateImg" src={anniversary} />
              <p>Anniversary</p>
            </div>
            <div
              onClick={() => selectAward("New Joining")}
              style={{
                animation: "slidein 1s forwards",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img className="birthdaytemplateImg" src={NewJoining} />
              <p>New Joining</p>
            </div>
          </Col>
        </div>
      </Card>

      {award && (
        <Card
          style={{
            borderRadius: "5px",
            marginBottom: "25px",
            width: "90%",
          }}
        >
          <div>
            <Form>
              <div>
                <Divider orientation="left" orientationMargin={0}>
                  {selectedAward}
                </Divider>
                <Row gutter={[16, 16]}>
                  <Col span={10}>
                    <Card className="birthdayPreviewDiv">
                      <Divider orientation="left" orientationMargin={0}>
                        Preview
                        <Popover content={content}>
                          <InfoCircleOutlined className="informationLogo" />
                        </Popover>
                      </Divider>
                      <div
                        className="previewDivLayout"
                        style={{ border: "1px solid red" }}
                      >
                        hi
                      </div>
                    </Card>
                  </Col>
                  <Col span={14}>
                    <Card className="birthdayPreviewDiv">
                      <Form layout="vertical">
                        <Col span={24}>
                          <Divider orientation="left" orientationMargin={0}>
                            Select Employee
                            <Popover content={content} title="Title">
                              <InfoCircleOutlined className="informationLogo" />
                            </Popover>
                          </Divider>

                          <Row gutter={[16, 16]}>
                            <Col span={24}>
                              <Form.Item label="Select Employee">
                                <Input />
                              </Form.Item>
                            </Col>
                          </Row>
                        </Col>
                        <Divider orientation="left" orientationMargin={0}>
                          Template
                          <Popover content={content}>
                            <InfoCircleOutlined className="informationLogo" />
                          </Popover>
                        </Divider>
                        <Col span={24}>
                          <Radio.Group
                            style={{ width: "100%" }}
                            options={options}
                            defaultValue={selectedOptions}
                            onChange={radioChange}
                          />
                        </Col>
                        <Col span={24}>
                          <Divider orientation="left" orientationMargin={0}>
                            Background
                            <Popover content={content}>
                              <InfoCircleOutlined className="informationLogo" />
                            </Popover>
                          </Divider>
                        </Col>
                        {isDefaultTemplateSelected === "2" ? (
                          <Col span={24}>
                            <Form.Item
                              name="logo"
                              className="uploadLogo"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Upload the Company Logo",
                                },
                              ]}
                            >
                              <div
                                style={{
                                  border: "dashed #B9B9B9",
                                  borderWidth: "thin",
                                  borderRadius: "4px",
                                  display: "flex",
                                  justifyContent: "center",
                                  width: "300px",
                                }}
                              >
                                {isBigFile
                                  ? message.error(
                                    "File size must be less than 200Kb."
                                  )
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
                                      <DeleteOutlined
                                        className="hoverIcon"
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
                                        margin: "15px",
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
                                      Upload logo. Use the 200 kb size image.
                                      PNG or JPEG file format accepted
                                    </p>
                                  </>
                                )}
                              </div>
                            </Form.Item>
                          </Col>
                        ) : (
                          <Image.PreviewGroup
                            preview={{
                              onChange: (current, prev) =>
                                console.log(
                                  `current index: ${current}, prev index: ${prev}`
                                ),
                            }}
                          >
                            <Image width={200} src={anniversary} />
                            <Image width={200} src={birthday} />
                          </Image.PreviewGroup>
                        )}
                        <Col span={24}>
                          <Divider orientation="left" orientationMargin={0}>
                            Message
                            <Popover content={content} title="Title">
                              <InfoCircleOutlined className="informationLogo" />
                            </Popover>
                          </Divider>
                          <Form.Item label="Text">
                            <TextArea autoSize={{ minRows: 4, maxRows: 0 }} />
                          </Form.Item>
                        </Col>
                        <Col
                          xs={24}
                          sm={24}
                          md={24}
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <FormItem>
                            <Button
                              type="text"
                              style={{ marginRight: "1rem" }}
                            // onClick={() => setAddBank(false)}
                            >
                              {" "}
                              <CloseOutlined />
                              CANCEL
                            </Button>
                            <Button
                              type="primary"
                              // onClick={() => {
                              //   addBankForm.submit();
                              //   setAddBank(false);
                              // }}
                              style={{ background: "#1963A6", width: "90px" }}
                            >
                              <CheckOutlined />
                              SAVE
                            </Button>
                          </FormItem>
                        </Col>
                      </Form>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>
        </Card>
      )}
    </div>
  );
}

export default NotifySettings;
