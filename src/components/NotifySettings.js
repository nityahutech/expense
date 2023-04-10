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
  Select,
  message,
  Input,
  Modal,
} from "antd";
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import birthday from "../images/birthday.svg";
import anniversary from "../images/anniversary.svg";
import Landscape from "../images/Landscape.svg";
import Portrait from "../images/portrait.svg";
import FormItem from "antd/es/form/FormItem";
import "../style/Settingpage.css";
import { AutoComplete } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { getUsers, getBase64, } from "../contexts/CreateContext";
import html2canvas from "html2canvas";
import NotificationTemplateContext from "../contexts/NotificationTemplateContext";
import { useAuth } from "../contexts/AuthContext";
import { capitalize, checkAlphabets, checkNumbervalue, showNotification } from "../contexts/CreateContext";


const optionImage = [
  { label: "Default Template", value: "1" },
  { label: "Custom Template", value: "2" },
];

const optionsLayout = [
  { label: "Landscape", value: "3" },
  { label: "Portrait", value: "4" },
];

function NotifySettings() {
  const imgRef = React.useRef(null);
  const [form] = Form.useForm();
  const [formImage] = Form.useForm();
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState("1");
  const [selectedOptionsLayout, setSelectedOptionsLayout] = useState("3");
  const [award, setAward] = useState(false);
  const [isDefaultTemplateSelected, setIsDefaultTemplateSelected] =
    useState("1");
  const [layout, setLayout] = useState("3");
  const [allEmpName, setAllEmpName] = useState([]);
  const [optionsEmployee, setOptionsEmployee] = useState([]);
  const [emp, setEmp] = useState(null);
  const { currentUser } = useAuth();
  const [file, setFile] = useState("");
  const [imageData, setImageData] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

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

  const handleChangeCustom = (event) => {
    console.log(event, "dddddd");
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    console.log(fileUploaded, "dddddd");
    getBase64(fileUploaded, (url) => {
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  const awardTypes = [
    { type: "Birthday", imgSrc: birthday },
    { type: "Anniversary", imgSrc: anniversary },
  ];


  const handleOnFinish = (values,) => {
    console.log("values", values, selectedAward);

    const Template = {
      SelectedEmp: values.SelectedEmp,
      UploadEmpImage: '',
      message: values.message,

    };
    console.log("values", Template);

    try {
      if (selectedAward === "birthday") {
        NotificationTemplateContext.addBirthdayNotification(Template, selectedAward);
      } else if (selectedAward === "anniversary") {
        NotificationTemplateContext.addAnniversaryNotification(Template, selectedAward);
      }
      showNotification("success", "Success", "Updated Successfully!")
      form.resetFields();

    } catch (error) {
      console.log(error);
      showNotification("error", "Error", "Update Failed!")
      form.resetFields();
    }
  };

  function handleChange(event) {
    const file = event.target.files[0];
    console.log(file);
    setFile(null);
    const isPNG = file.type === "image/png";
    if (!isPNG) {
      message.error("You can only upload Pdf file!");
      form.resetFields();
      return;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return;
    }
    setFile(event.target.files[0]);
  }

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
  };

  const contentPreview = (
    <div>
      <p>Preview Template Here!!</p>
    </div>
  );
  const content = (
    <div>
      <p>Select Content !!</p>
    </div>
  );

  const BackToTemplate = () => {
    setAward(false);
  };

  const radioChange = (event) => {
    console.log(event.target.value);
    setIsDefaultTemplateSelected(event.target.value);
    if (event.target.value === "1") {
      setLayout("3");
    }
    if (event.target.value === "2") {
      setLayout("2");
    }
  };

  const radioChangeLayout = (event) => {
    console.log(event.target.value);
    setLayout(event.target.value);
  };

  const selectAward = (award) => {
    setAward(true);
    setSelectedAward(award);
  };


  const onSearch = (searchText) => {
    console.log("allData", searchText);
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOptionsEmployee(!searchText ? [] : matchingName);
  };

  const onSelect = (data) => {
    console.log("allData", data);
    if (data) {
      setEmp(data);
    }
  };

  async function getAllUser() {
    const allData = await getUsers();
    console.log("allData", allData);
    let codes = {};
    let temp = {};
    let allUsers = allData.docs.map((doc) => {
      temp = {
        ...temp,
        [`${doc.data().name}`]: doc.id,
      };
      console.log("allData", temp);
      codes = {
        ...codes,
        [`${doc.data().name}`]: doc.data().empId,
      };
      console.log("allData", codes);
      return {
        value: doc.data().name,
      };
    });
    console.log("allData", allUsers);
    setAllEmpName(allUsers);
  }

  useEffect(() => {
    getAllUser();
  }, []);

  const [previewVisible, setPreviewVisible] = useState(false);

  const handlePreviewClick = () => {
    setPreviewVisible(true);
    const previewDiv = document.querySelector(".previewDiv");
    console.log(previewDiv);
    html2canvas(previewDiv).then((canvas) => {
      const base64 = canvas.toDataURL("image/png");
      setImageData(base64);
    });
  };

  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handleSendTemplate = (values) => {
    console.log(values)
    // handleCancel();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {award === false ? (
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
              {awardTypes.map((award) => (
                <div
                  key={award.type}
                  onClick={() => selectAward(award.type)}
                  style={{
                    animation: "slidein 1s forwards",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <img className="birthdaytemplateImg" src={award.imgSrc} />
                  <p>{award.type}</p>
                </div>
              ))}
            </Col>
          </div>
        </Card>
      ) : (
        <Card
          style={{
            borderRadius: "5px",
            marginBottom: "25px",
            width: "90%",
          }}
        >
          <div>
            <Form form={form} onFinish={handleOnFinish}>
              <Col style={{ display: "flex" }} span={24}>
                <Col span={12} onClick={BackToTemplate}>
                  <ArrowLeftOutlined />
                  Back
                </Col>
                <Col span={12}>
                  <Form.Item name="reset">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="Please Select Option"
                      options={[
                        {
                          value: "reset",
                          label: "Reset to Last Saved",
                        },
                        {
                          value: "reset-whole",
                          label: "Reset to Original",
                        },
                      ]}
                    ></Select>
                  </Form.Item>
                </Col>
              </Col>
              <div>
                <Divider orientation="left" orientationMargin={0}>
                  {selectedAward}
                </Divider>
                <Row gutter={[16, 16]}>
                  <Col span={10} >
                    <Card className="birthdayPreviewDiv">
                      <Divider orientation="left" orientationMargin={0}>
                        Preview
                        <Popover content={contentPreview}>
                          <InfoCircleOutlined className="informationLogo" />
                        </Popover>
                      </Divider>
                      <>
                        <div
                          className="previewDiv"
                          style={{
                            border: "1px solid black",
                            backgroundColor: layout ? "" : "#c9c6c6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            height: layout === '2' ? "80%" : "80%"
                            // background: layout ? "white" : "grey",
                          }}
                        >
                          {layout === "3" && (
                            <>
                              <div
                                className="capture"
                                style={{ position: "relative" }}
                              >
                                <img
                                  src={Landscape}
                                  // onClick={() => handlePreview(Landscape)}
                                  style={{ width: "100%", height: "80%" }}
                                />
                                <h2
                                  style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    fontSize: "10px",
                                  }}
                                >
                                  {editorState
                                    .getCurrentContent()
                                    .getPlainText("\u0001")}
                                </h2>
                                <h2
                                  style={{
                                    position: "absolute",
                                    top: "30%",
                                    left: "50%",
                                    transform: "translate(-50%, -50%)",
                                    fontWeight: "bold",
                                    fontSize: "12px",
                                    color: "black",
                                  }}
                                >
                                  {emp}
                                </h2>
                              </div>
                            </>
                          )}
                          {layout === "4" && (
                            <>
                              <img
                                src={Portrait}
                                // onClick={() => handlePreview(Portrait)}
                                style={{ width: "100%", height: "100%" }}
                              />
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: "12px",
                                }}
                              >
                                {editorState
                                  .getCurrentContent()
                                  .getPlainText("\u0001")}
                              </h2>
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "30%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontWeight: "bold",
                                  fontSize: "10px",
                                  color: "black",
                                }}
                              >
                                {emp}
                              </h2>
                            </>
                          )}
                          {console.log(imageData, layout, "dddddd")}
                          {layout === "2" && imageUrl ? (
                            <div
                              className="capture"
                              style={{ position: "relative" }}
                            >
                              <img
                                src={imageUrl}
                                style={{ width: "100%", height: "100%" }}
                              />
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: "10px",
                                }}
                              >
                                {editorState
                                  .getCurrentContent()
                                  .getPlainText("\u0001")}
                              </h2>
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "30%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                  color: "black",
                                }}
                              >
                                {emp}
                              </h2>
                            </div>
                          ) : layout === "2" ? (
                            <div
                              style={{
                                width: "100%",
                                height: "100%",
                                backgroundColor: "grey",
                              }}
                            >
                              <div
                                style={{
                                  position: "relative",
                                  top: "50%",
                                  transform: "translateY(-50%)",
                                }}
                              >
                                <span
                                  style={{
                                    color: "white",
                                    textAlign: "center",
                                    display: "block",
                                  }}
                                >
                                  No image Uploaded
                                </span>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </>
                    </Card>
                  </Col>
                  <Col span={14}>
                    <Card className="birthdayPreviewDiv">
                      <Form layout="vertical">
                        <Col span={24}>
                          <Divider orientation="left" orientationMargin={0}>
                            Background
                          </Divider>
                        </Col>
                        <Col span={24}>
                          <Form.Item name="select">
                            <Radio.Group
                              style={{ width: "100%" }}
                              options={optionImage}
                              defaultValue={selectedOptions}
                              onChange={radioChange}
                            />
                          </Form.Item>
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
                                  onChange={(e) => handleChangeCustom(e)}
                                />
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
                                    Upload logo. Use the 200 kb size image. PNG
                                    or JPEG file format accepted
                                  </p>
                                </>
                                {/* )} */}
                              </div>
                            </Form.Item>
                          </Col>
                        ) : (
                          <>
                            <Col span={24}>
                              <Divider orientation="left" orientationMargin={0}>
                                Layout
                              </Divider>
                            </Col>
                            <Col span={24}>
                              <Form.Item name="selectLayout">
                                <Radio.Group
                                  name="selectLayout"
                                  style={{ width: "100%" }}
                                  options={optionsLayout}
                                  defaultValue={selectedOptionsLayout}
                                  onChange={radioChangeLayout}
                                />
                              </Form.Item>
                            </Col>
                          </>
                        )}
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Col span={24} style={{ margin: '10px' }}>
                  <FormItem>
                    <Button
                      htmlType="submit"
                      type="primary"
                      style={{ marginRight: "1rem" }}
                      onClick={handlePreviewClick}
                    >
                      {" "}
                      Preview
                    </Button>
                  </FormItem>
                </Col>

                <Row gutter={[16, 16]} >
                  <Col xs={24} sm={24} md={24}>
                    <Divider orientation="left" orientationMargin={0}>
                      Content
                      <Popover content={content}>
                        <InfoCircleOutlined className="informationLogo" />
                      </Popover>
                    </Divider>
                    <Row
                      gutter={[16, 16]}

                    >
                      <Col span={12} style={{ display: 'flex' }}>
                        <Form.Item
                          className="auto"
                          label="Select Employee"
                          name="SelectedEmp"

                        >
                          <AutoComplete className="autocomplete"
                            options={optionsEmployee}
                            style={{
                              width: 200,

                            }}
                            onSelect={onSelect}
                            onSearch={onSearch}
                            size="large"
                            placeholder="Enter Name"
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <FormItem label="Select Image" name="UploadEmpImage">
                          <div className="idpage">
                            <Input
                              type="file"
                              accept="application/pdf"
                              id="upload"
                              name="upload"
                              onChange={handleChange}
                            // beforeUpload={beforeUpload}
                            />
                          </div>
                        </FormItem>
                      </Col>
                    </Row>

                    <Form.Item label="" name="message">
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        editorState={editorState}
                        // onEditorStateChange={setEditorState}
                        onEditorStateChange={handleEditorChange}
                        wrapperStyle={{
                          border: "1px solid #ebebeb",
                          overflow: "hidden",
                        }}
                        editorStyle={{ height: "200px", overflow: "hidden", padding: '20px' }}
                      />
                    </Form.Item>

                    <Col span={24}>
                      <FormItem>
                        <Button
                          htmlType="submit"
                          type="primary"
                          style={{ marginRight: "1rem" }}
                        >
                          {" "}
                          SAVE
                        </Button>
                      </FormItem>
                    </Col>
                  </Col>
                </Row>
              </div>
            </Form>
          </div>

          <Modal
            visible={previewVisible}
            onCancel={handleCancel}
            footer={null}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: imageData ? `${imageData.width}px` : "auto",
              height: imageData
                ? `${imageData.height}px`
                : "auto",
              padding: "10px",
            }}
          >
            <Form form={form} onFinish={handleSendTemplate}>
              <Form.Item name="sendTemplate"
                style={{ display: "flex", flexDirection: "column" }}
              >
                {imageData && (
                  <img
                    src={imageData}
                    alt="preview"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      width: "auto",
                      height: "auto",
                    }}
                  />
                )}
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "auto", marginTop: "10px" }}
              >
                SEND TEMPLATE
              </Button>

            </Form>
          </Modal>
        </Card>
      )
      }
    </div >
  );
}

export default NotifySettings;
