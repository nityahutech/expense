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
  Select,
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
import backIcon from "..//images/back-arrow-icon.svg"
import "../style/Settingpage.css";
import TextArea from "antd/lib/input/TextArea";

const options = [
  { label: 'Default Template', value: '1' },
  { label: 'Custom Template', value: '2' },
 
];


function NotifySettings(props) {
  console.log(props.data);
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(props.fileName || null);
  const [imageUrl, setImageUrl] = useState(props.imageUrl || "");
  const [previewBirthImg, setPreviewBirthImg] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const [previewAnniversaryImg, setPreviewAnniversaryImg] = useState("");
  const [checkBirthDisabled, setCheckBirthDisabled] = useState(true);
  const [checkAnniversaryDisabled, setCheckAnniversaryDisabled] =useState(true);
  const [showCustomTemplate, setShowCustomTemplate] = useState(true);
  const [selectedOptions, setSelectedOptions]= useState('1')
  

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

  
  const radioChange =({ target: { value } })=>{
    setSelectedOptions(value)
    // setShowCustomTemplate(value === '2')
    setCheckBirthDisabled(value === '2')
  }
   
  

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
          <div className="template-card-header">
            <div>
              <img
                className="birthdaytemplateImg"
                src={backIcon}
                width={25}
              />
            </div>
            <Select
              defaultValue="Reset"
              style={{width:"200px"}}
              options={[
                        {
                          value: 'reset',
                          label: 'Reset to Last Saved',
                        },
                        {
                          value: 'reset-whole',
                          label: 'Reset to Original',
                        },
                      ]}
                    />

          </div>
          {/* <Form.Item
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
          </Form.Item> */}
          <div
            // style={
            //   checkBirthDisabled
            //     ? {}
            //     : {
            //         pointerEvents: "none",
            //         opacity: "0.4",
            //         cursor: "not-allowed",
            //       }
            // }
          >
            <Divider orientation="left" orientationMargin={0}>Birthday Templates</Divider>
            <Row gutter={[16, 16]}>
              <Col span={15}>
                <Card className="birthdayPreviewDiv">
                <Divider orientation="left" orientationMargin={0}>
                    Preview
                    <Popover content={content} >
                      <InfoCircleOutlined className="informationLogo"/>
                    </Popover>
                  </Divider>
                  <div className="previewDivLayout" style={{border: "1px solid red"}}>
                    hi
                  </div>                   
                </Card>
              </Col>
              <Col span={9}>
                  <Card className="birthdayTempelateList">
                    <Form layout="vertical">
                        <Divider orientation="left" orientationMargin={0}>
                        Template
                        <Popover content={content} >
                          <InfoCircleOutlined className="informationLogo"/>
                        </Popover>
                        </Divider>
                      <div>
                      <Radio.Group style={{width:"100%"}} options={options} defaultValue={selectedOptions}  onChange={radioChange}/>
                      {/* {showCustomTemplate && (<> */}
                            <Col span={24}>
                            <Card 
                              className="birthdayTempelateList" 
                              title="Custom Template" 
                              bordered 
                              hoverable
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
                            <Divider orientation="left" orientationMargin={0}>
                                Background
                                <Popover content={content} >
                                  <InfoCircleOutlined className="informationLogo"/>
                                </Popover>
                              </Divider>
                              <Form layout="vertical">
                              <Col style={{height: "100%", display:"flex", justifyContent: "center", alignItems:"center"}}>
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
                                      width: "300px"
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
                                          Upload logo. Use the 200 kb size image. PNG or JPEG file
                                          format accepted
                                        </p>
                                      </>
                                    )}
                                  </div>
                                </Form.Item>
                              </Col>
                              {/* {previewBirthImg ? (
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
                              )} */}
                              
                              
                                  </Form>
                                  
                            </Card>
                            <Divider orientation="left" orientationMargin={0}>
                                Layout
                                <Popover content={content} >
                                  <InfoCircleOutlined className="informationLogo"/>
                                </Popover>
                              </Divider>
                              <Radio.Group style={{width:"100%"}}>
                              <Row gutter={[16,16]}>                             
                                <Col span={12} className="birthdayTemplates">
                                  <Radio value={1}>Landscape</Radio>
                                    {/* <Card hoverable={true} className="layoutCard">
                                      <img
                                        src={LayoutImage}
                                        width={80}
                                        onClick={() => {
                                          handleBirthImageclick(LayoutImage);
                                        }}
                                      />
                                    </Card> */}
                                  </Col>
                                  <Col span={12} className="birthdayTemplates">
                                  <Radio value={2}>Portrait</Radio>
                                    {/* <Card hoverable={true} className="layoutCard">
                                      <img
                                        src={LayoutImage2}
                                        width={80}
                                        onClick={() => {
                                          handleBirthImageclick(LayoutImage2);
                                        }}
                                      />
                                    </Card> */}
                                  </Col>                   
                              </Row>
                              </Radio.Group> 
                              {/* <Divider orientation="left" orientationMargin={0}>
                                  Content
                                  <Popover content={content} title="Title">
                                    <InfoCircleOutlined className="informationLogo"/>
                                  </Popover>
                                </Divider>
                                  <Row gutter={[16,16]}>
                                    <Col span={8}>
                                      <Form.Item
                                        label="Field 1"
                                                              
                                      >
                                      <Select
                                        defaultValue="logo"
                                        options={[
                                          {
                                            value: 'logo',
                                            label: 'Logo',
                                          },
                                          {
                                            value: 'message',
                                            label: 'Message',
                                          },
                                          {
                                            value: 'name',
                                            label: 'Name',
                                          },
                                        ]}
                                      />
                                      </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                      <Form.Item
                                        label="Field 2"
                                                              
                                      >
                                      <Select
                                        defaultValue="logo"
                                        // Style={{
                                        //   width:"100%",
                                        // }}
                                        options={[
                                          {
                                            value: 'logo',
                                            label: 'Logo',
                                          },
                                          {
                                            value: 'message',
                                            label: 'Message',
                                          },
                                          {
                                            value: 'name',
                                            label: 'Name',
                                          },
                                        ]}
                                      />
                                      </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                      <Form.Item
                                        label="Field 3"
                                                              
                                      >
                                      <Select
                                        defaultValue="logo"
                                        // Style={{
                                        //   width:"100%",
                                        // }}
                                        options={[
                                          {
                                            value: 'logo',
                                            label: 'Logo',
                                          },
                                          {
                                            value: 'message',
                                            label: 'Message',
                                          },
                                          {
                                            value: 'name',
                                            label: 'Name',
                                          },
                                        ]}
                                      />
                                      </Form.Item>
                                    </Col>
                                  </Row> */}
                            </Col>                            
                          {/* </>)} */}
                      </div>
                    </Form>
                  </Card>
              </Col>             
              <Col span={24}>
                <Card className="infoText">
                <Divider orientation="left" orientationMargin={0}>
                    Message 
                    <Popover content={content} title="Title">
                      <InfoCircleOutlined className="informationLogo"/>
                    </Popover>
                  </Divider>
                  <Form layout="vertical">
                      <Row gutter={[16,16]}>
                        <Col span={24}>
                          <Form.Item
                            label="Font"
                                                  
                          >
                          <Select
                            defaultValue="Font1"
                            options={[
                              {
                                value: 'font1',
                                label: 'Font1',
                              },
                              {
                                value: 'font2',
                                label: 'Font2',
                              },
                              {
                                value: 'font3',
                                label: 'Font3',
                              },
                            ]}
                          />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Text Colour"
                                                  
                          >
                          <Select
                            defaultValue="Colour1"
                            // Style={{
                            //   width:"100%",
                            // }}
                            options={[
                              {
                                value: 'colour1',
                                label: 'Colour1',
                              },
                              {
                                value: 'colour2',
                                label: 'Colour2',
                              },
                              {
                                value: 'colour3',
                                label: 'Colour3',
                              },
                            ]}
                          />
                          </Form.Item>
                        </Col>
                        <Col span={24}>
                          <Form.Item
                            label="Text"
                                                  
                          >
                          <TextArea autoSize={{ minRows: 4, maxRows: 0 }}/>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
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
