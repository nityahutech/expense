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
  Spin,
  message,
  Input,
  Modal,
  Drawer,
} from "antd";
import {
  InfoCircleOutlined,
  PlusCircleOutlined,
  ArrowLeftOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import birthday from "../images/birthday.svg";
import anniversary from "../images/anniversary.svg";
import addTemplate from "../images/addTemplate.avif";
import Landscape from "../images/Landscape.svg";
import Portrait from "../images/portrait.svg";
import FormItem from "antd/es/form/FormItem";
import "../style/Settingpage.css";
import { AutoComplete } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, Modifier, SelectionState } from "draft-js";
import { getUsers, getBase64 } from "../contexts/CreateContext";
import html2canvas from "html2canvas";
import NotificationTemplateContext from "../contexts/NotificationTemplateContext";
import { showNotification } from "../contexts/CreateContext";
import notificationTemplate from "../contexts/NotificationTemplateContext";
import { sendEmail } from "../contexts/EmailContext";
import { getDoc, where, query, collection, getDocs, doc, documentId } from "firebase/firestore";
import { db } from "../firebase-config";

const optionImage = [
  { label: "Default Template", value: "1" },
  { label: "Custom Template", value: "2" },
];

function NotifySettings() {
  const imgRef = React.useRef(null);
  const [form] = Form.useForm();
  const [formPreview] = Form.useForm();
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const [selectedAward, setSelectedAward] = useState("Birthday");
  const [selectedOptions, setSelectedOptions] = useState("1");
  const [selectedOptionsLayout, setSelectedOptionsLayout] = useState("3");
  const [award, setAward] = useState(false);
  const [isDefaultTemplateSelected, setIsDefaultTemplateSelected] =
    useState("1");
  const [layout, setLayout] = useState("1");
  const [allEmpName, setAllEmpName] = useState([]);
  const [optionsEmployee, setOptionsEmployee] = useState([]);
  const [emp, setEmp] = useState(null);
  const [file, setFile] = useState("");
  const [imageData, setImageData] = useState(null);
  const [templatePreview, setTempalatePreview] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [showMessageContent, setShowMessageContent] = useState(false);
  const [isDisablePreview, setIsDisablePreview] = useState(true);
  const [editorMessage, setEditorMessage] = useState(true);

  const templates = [
    { id: 1, name: "", image: Landscape },
    { id: 2, name: "", image: Portrait },
    { id: 3, name: "", image: Landscape },
    { id: 4, name: "", image: Portrait },
  ];
  const [selectedTemplate, setSelectedTemplate] = useState({
    id: 1,
    name: "Template 1",
    image: Landscape,
  });
  console.log("selectedTemplate", selectedTemplate);
  const awardTypes = [
    { type: "Birthday", imgSrc: birthday },
    { type: "Anniversary", imgSrc: anniversary },
    { type: "Add Template", imgSrc: addTemplate },
  ];
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const toolbarOptions = {
    options: ["inline", "fontFamily", "fontSize", "colorPicker", "textAlign"],
    inline: {
      options: ["bold", "italic"],
    },
  };

  const handleClick = (e) => {
    console.log(e);
    imgRef.current.click();
  };

  const handleDeleteClick = () => {
    setImageUrl("");
  };

  const handleChangeCustom = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    if (fileUploaded && Math.round(fileUploaded.size / 1024) <= 800) {
      setIsLoading(true);
      setTimeout(() => {
        getBase64(fileUploaded, (url) => {
          setImageUrl(url);
          setIsDefaultTemplateSelected("2");
        });
        setFileName(fileUploaded);
        setIsBigFile(false);
        setIsLoading(false);
      }, 1000);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  };

  const handleOnFinish = (values) => {
    console.log("values", values, selectedAward);

    const Template = {
      message: values.message,
    };
    console.log("values", Template);

    try {
      NotificationTemplateContext.addNotification(
        selectedAward,
        Template,
        values.UploadEmpImage
      );
      showNotification("success", "Success", "Message Updated Successfully");
      setEditorState(EditorState.createEmpty());
      getData();
    } catch (error) {
      console.log(error);
      showNotification("error", "Error", "Update Failed!");
    }
  };

  const getData = async () => {
    let data = await notificationTemplate.getNotification();
    console.log("datasss", data, selectedAward);
    const filteredArray = data.filter((obj) => obj.id === selectedAward);
    console.log("datasss", filteredArray);
    setTempalatePreview(filteredArray);
  };

  useEffect(() => {
    getData();
  }, [selectedAward]);

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
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFile(reader.result);
    };
  }

  const handleClear = () => {
    setFile(null);
    form.resetFields(["UploadEmpImage"]);
  };

  const handleEditorChange = (editorState) => {
    setEditorState(editorState);
    setEditorMessage(
      editorState.getCurrentContent().getPlainText().trim().length === 0
    );

    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText();
    const maxLength = 100;

    if (plainText.length > maxLength) {
      const truncatedText = plainText.substring(0, maxLength);
      const newContentState = ContentState.createFromText(truncatedText);
      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters"
      );
      setEditorState(newEditorState);
      message.error("Maximum length exceeded");
    } else {
    }
  };

  const contentPreview = (
    <div>
      <p>Preview Template Here!!</p>
    </div>
  );

  const BackToTemplate = () => {
    setAward(false);
  };

  const radioChange = (event) => {
    console.log(event.target.value);
    setIsDefaultTemplateSelected(event.target.value);
    if (event.target.value === "1") {
      setLayout("1");
      setShowMessageContent(true);
    }
    if (event.target.value === "2") {
      setLayout("2");
      setShowMessageContent(false);
    }
  };

  const selectAward = (award) => {
    setIsLoading(true);
    console.log(award);
    setAward(true);
    setSelectedAward(award);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const onSearch = (searchText) => {
    console.log("allData", searchText);
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOptionsEmployee(!searchText ? [] : matchingName);
    if (searchText) {
      setShowMessageContent(true);
    } else {
      setShowMessageContent(false);
    }
  };

  const onSelect = (data) => {
    setIsDisablePreview(false);
    console.log("allData", data);
    if (data) {
      setEmp(data);
    }
  };
  const onBlur = (event) => {
    if (!event.target.value) {
      setEmp(null);
      setIsDisablePreview(true);
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

  // async function getAllData() {
  //   const allData = await getUsers();

  //   console.log(allData);

  //   let d = allData.docs.map((doc, i) => {
  //     return {
  //       name: doc.data().name,
  //       dob: doc.data().dob,
  //       doj: doc.data().doj,
  //       profilePic: doc.data().profilePic,
  //       id: doc.id,
  //       sn: i + 1,
  //       // age: age
  //     };
  //   });
  //   console.log(d);
  //   setDob(d);
  // }

  useEffect(() => {
    getAllUser();
    // getAllData();
  }, []);

  const [previewVisible, setPreviewVisible] = useState(false);
  const handleCancel = () => {
    setPreviewVisible(false);
  };

  const handlePreviewClick = () => {
    setPreviewVisible(true);
    const previewDiv = document.querySelector(".previewDiv");
    console.log(previewDiv);
    html2canvas(previewDiv).then((canvas) => {
      const base64 = canvas.toDataURL("image/png");
      setImageData(base64);
    });
  };

  const handleSendTemplate = async (values) => {
    try {
      const record = await getDoc(doc(db, 'companyprofile', sessionStorage.getItem("compId")));
      const UIDS = record.data().adminAccess.Templates;
      const q = query(
        collection(db, "users"),
        where(documentId(), "in", 
          UIDS
        ),
      );

      let data = await getDocs(q);
      const mails = data.docs.map(doc => doc.data().mailid);

      for(const mail of mails) {
        let mailOptions = {
          from: "hutechhr@gmail.com",
          to: mail,
          subject: "Image attachment",
          text: "Please find the attached image.",
          attachments: [
            {
              filename: "image.png",
              path: imageData,
              encoding: "base64",
            },
          ],
        };
        await sendEmail(mailOptions);
      }

      showNotification(
        "success",
        "Success",
        "Birthday Template successfully Send!"
      );
    } catch (err) {
      console.log("error", err);
      showNotification("error", "Error", "Update Failed!");
    }
  };

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const handleTemplateClick = (template) => {
    console.log("template", template);
    setSelectedTemplate(template);
  };

  if (isLoading) {
    return (
      <div
        style={{
          height: "70vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin
          size="large"
          style={{
            position: "absolute",
            top: "20%",
            left: "50%",
            margin: "-10px",
            zIndex: "100",
            opacity: "0.7",
            backgroundColor: "transparent",
          }}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        // flexDirection: "column",
        // alignItems: "center",
        marginTop: "40px",
      }}
    >
      {
        award === false ? (
          <Card title="System Award">
            {awardTypes.map((award) => (
              <Button
                onClick={() => selectAward(award.type)}
                className="addTemplate"
                style={{ marginLeft: "20px" }}
              >
                {award.type}
              </Button>
            ))}
          </Card>
        ) : (
          <Card
          // style={{
          //   borderRadius: "5px",
          //   marginBottom: "25px",
          //   width: "90%",
          // }}
          >
            <div>
              <Col style={{ display: "flex" }} span={24}>
                <Col
                  span={12}
                  onClick={BackToTemplate}
                  style={{ cursor: "pointer" }}
                >
                  <ArrowLeftOutlined />
                  Back
                </Col>
              </Col>
              <div>
                <Divider orientation="left" orientationMargin={0}>
                  {selectedAward}
                </Divider>
                <Form>
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
                </Form>

                <Row gutter={[16, 16]}>
                  <Col sm={24} md={10} lg={10}>
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
                            // border: "1px solid black",
                            backgroundColor: layout ? "" : "#c9c6c6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            height: layout === "2" ? " " : "",
                          }}
                        >
                          {layout === "1" ? (
                            <div style={{ display: "flex" }}>
                              <img
                                src={selectedTemplate?.image}
                                style={{ width: "100%", height: "100%" }}
                              />
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "55%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontSize: "10px",
                                  wordWrap: "break-word",
                                  maxWidth: "45%",
                                  textAlign: "center",
                                }}
                              >
                                {
                                  templatePreview?.[0]?.message?.blocks?.[0]
                                    ?.text
                                }
                              </h2>
                              <h2
                                style={{
                                  position: "absolute",
                                  top: "40%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontWeight: "bold",
                                  fontSize: "10px",
                                  color: "black",
                                }}
                              >
                                {emp}
                              </h2>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "45%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                  color: "black",
                                }}
                              >
                                {file && (
                                  <img
                                    style={{ width: "20px", height: "20px" }}
                                    src={file}
                                    alt="Uploaded Image"
                                  />
                                )}
                              </div>
                              <div
                                style={{
                                  position: "absolute",
                                  top: "32%",
                                  left: "50%",
                                  transform: "translate(-50%, -50%)",
                                  fontWeight: "bold",
                                  fontSize: "12px",
                                  color: "black",
                                }}
                              ></div>
                            </div>
                          ) : layout === "2" && imageUrl ? (
                            <>
                              <div
                                className="capture"
                                style={{ position: "relative" }}
                              >
                                <img
                                  src={imageUrl}
                                  style={{ width: "100%", height: "100%" }}
                                />
                              </div>
                              <div style={{ color: "green" }}>
                                {" "}
                                <DeleteOutlined
                                  onClick={() => handleDeleteClick(imageUrl)}
                                />
                              </div>
                            </>
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "100px",
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
                          )}
                        </div>
                      </>
                    </Card>
                  </Col>
                  <Col sm={24} md={14} lg={14}>
                    <Card className="birthdayPreviewDiv">
                      <Form layout="vertical">
                        {isDefaultTemplateSelected === "2" ? (
                          <Col span={24}>
                            <Form.Item
                              name="logo"
                              className="uploadLogo"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Upload the Template",
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
                                    Upload logo. Use the 800 kb size image. PNG
                                    or JPEG file format accepted
                                  </p>
                                </>
                              </div>
                              {isBigFile &&
                                message.error(
                                  "File size must be less than 800Kb."
                                )}
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
                                <Button type="" onClick={showDrawer}>
                                  Choose Template
                                </Button>
                                <Drawer
                                  style={{ padding: "0px" }}
                                  width={220}
                                  title="Select Template"
                                  placement="right"
                                  onClose={onClose}
                                  open={open}
                                >
                                  {templates.map((template) => (
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                      }}
                                      key={template.id}
                                      onClick={() =>
                                        handleTemplateClick(template)
                                      }
                                    >
                                      <img
                                        style={{
                                          width: "70%",
                                          border: "5px solid grey",
                                        }}
                                        src={template.image}
                                        alt={template.name}
                                      />
                                      <h3>{template.name}</h3>
                                    </div>
                                  ))}
                                </Drawer>
                              </Form.Item>
                            </Col>
                            <Col
                              span={24}
                              style={{ display: "flex", width: "100%" }}
                            >
                              <Form.Item
                                className="auto"
                                label="Select Employee"
                                name="SelectedEmp"
                              >
                                <AutoComplete
                                  className="autocomplete"
                                  options={optionsEmployee}
                                  style={{
                                    width: 300,
                                  }}
                                  onSelect={onSelect}
                                  onSearch={onSearch}
                                  onBlur={onBlur}
                                  size="large"
                                  placeholder="Enter Name"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <FormItem
                                label="Select Image"
                                name="UploadEmpImage"
                              >
                                <div className="idpage">
                                  <div className="input-with-clear">
                                    <Input
                                      type="file"
                                      accept="application/pdf"
                                      id="upload"
                                      name="upload"
                                      style={{
                                        display: "flex",
                                        width: "300px",
                                      }}
                                      onChange={handleChange}
                                    />
                                    {file && (
                                      <button
                                        className="clear-btn"
                                        onClick={handleClear}
                                      >
                                        X
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </FormItem>
                            </Col>
                          </>
                        )}
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Col span={24} style={{ margin: "10px" }}>
                  <FormItem>
                    {layout === "3" || layout === "4" ? (
                      <Button
                        htmlType="submit"
                        type="primary"
                        style={{ marginRight: "1rem" }}
                        onClick={handlePreviewClick}
                        disabled={isDisablePreview}
                      >
                        {" "}
                        Preview
                      </Button>
                    ) : (
                      <Button
                        htmlType="submit"
                        type="primary"
                        style={{ marginRight: "1rem" }}
                        onClick={handlePreviewClick}
                        // disabled={isDisablePreview}
                      >
                        {" "}
                        Preview
                      </Button>
                    )}
                  </FormItem>
                </Col>
                {showMessageContent && (
                  <>
                    <Col xs={24} sm={24} md={24}>
                      <Form form={form} onFinish={handleOnFinish}>
                        <Form.Item label="" name="message">
                          <Editor
                            toolbarClassName="toolbarClassName"
                            wrapperClassName="wrapperClassName"
                            editorClassName="editorClassName"
                            editorState={editorState}
                            toolbar={toolbarOptions}
                            onEditorStateChange={handleEditorChange}
                            wrapperStyle={{
                              border: "1px solid #ebebeb",
                              overflow: "hidden",
                            }}
                            editorStyle={{
                              height: "200px",
                              overflow: "hidden",
                              padding: "20px",
                            }}
                            placeholder="Please Type Your Message"
                          />
                        </Form.Item>
                        <Col span={24}>
                          <FormItem>
                            <Button
                              htmlType="submit"
                              type="primary"
                              style={{ marginRight: "1rem" }}
                              disabled={editorMessage}
                            >
                              {" "}
                              SAVE
                            </Button>
                          </FormItem>
                        </Col>
                      </Form>
                    </Col>
                  </>
                )}
              </div>
            </div>

            <Modal
              visible={previewVisible}
              onCancel={handleCancel}
              footer={null}
              style={{
                maxWidth: "90vw",
                maxHeight: "90vh",
                width: imageData ? `${imageData.width}px` : "auto",
                height: imageData ? `${imageData.height}px` : "auto",
                padding: "10px",
              }}
            >
              <Form
                form={formPreview}
                onFinish={() => handleSendTemplate(imageData)}
              >
                <Form.Item
                  name="sendTemplate"
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
        //   <>
        //     <Card
        //     // style={{
        //     //   borderRadius: "5px",
        //     //   marginBottom: "25px",
        //     //   width: "90%",
        //     // }}
        //     >
        //       <div>
        //         <Col>
        //           <p>System Award</p>
        //         </Col>
        //         <Col
        //           className="cardTemplate"
        //           style={{
        //             display: "flex",
        //             justifyContent: "space-evenly",
        //             cursor: "pointer",
        //           }}
        //         >
        //           {awardTypes.map((award) => (
        //             <div
        //               key={award.type}
        //               onClick={() => selectAward(award.type)}
        //               style={{
        //                 animation: "slidein 1s forwards",
        //                 display: "flex",
        //                 flexDirection: "column",
        //                 alignItems: "center",
        //               }}
        //             >
        //               <img
        //                 className="birthdaytemplateImg"
        //                 src={award.imgSrc}
        //                 style={
        //                   award.type === "Add Template"
        //                     ? {
        //                         width: "226px",
        //                         height: "92px",
        //                         borderRadius: "4px",
        //                       }
        //                     : {}
        //                 }
        //               />
        //               <p>{award.type}</p>
        //             </div>
        //           ))}
        //         </Col>
        //       </div>
        //     </Card>
        //   </>
        // ) : (
        //   <Card
        //   // style={{
        //   //   borderRadius: "5px",
        //   //   marginBottom: "25px",
        //   //   width: "90%",
        //   // }}
        //   >
        //     <div>
        //       <Col style={{ display: "flex" }} span={24}>
        //         <Col
        //           span={12}
        //           onClick={BackToTemplate}
        //           style={{ cursor: "pointer" }}
        //         >
        //           <ArrowLeftOutlined />
        //           Back
        //         </Col>
        //       </Col>
        //       <div>
        //         <Divider orientation="left" orientationMargin={0}>
        //           {selectedAward}
        //         </Divider>
        //         <Form>
        //           <Col span={24}>
        //             <Form.Item name="select">
        //               <Radio.Group
        //                 style={{ width: "100%" }}
        //                 options={optionImage}
        //                 defaultValue={selectedOptions}
        //                 onChange={radioChange}
        //               />
        //             </Form.Item>
        //           </Col>
        //         </Form>

        //         <Row gutter={[16, 16]}>
        //           <Col sm={24} md={10} lg={10}>
        //             <Card className="birthdayPreviewDiv">
        //               <Divider orientation="left" orientationMargin={0}>
        //                 Preview
        //                 <Popover content={contentPreview}>
        //                   <InfoCircleOutlined className="informationLogo" />
        //                 </Popover>
        //               </Divider>

        //               <>
        //                 <div
        //                   className="previewDiv"
        //                   style={{
        //                     // border: "1px solid black",
        //                     backgroundColor: layout ? "" : "#c9c6c6",
        //                     display: "flex",
        //                     alignItems: "center",
        //                     justifyContent: "center",
        //                     color: "#fff",
        //                     height: layout === "2" ? " " : "",
        //                   }}
        //                 >
        //                   {layout === "1" ? (
        //                     <div style={{ display: "flex" }}>
        //                       <img
        //                         src={selectedTemplate?.image}
        //                         style={{ width: "100%", height: "100%" }}
        //                       />
        //                       <h2
        //                         style={{
        //                           position: "absolute",
        //                           top: "55%",
        //                           left: "50%",
        //                           transform: "translate(-50%, -50%)",
        //                           fontSize: "10px",
        //                           wordWrap: "break-word",
        //                           maxWidth: "45%",
        //                           textAlign: "center",
        //                         }}
        //                       >
        //                         {templatePreview?.[0]?.message?.blocks?.[0]?.text}
        //                       </h2>
        //                       <h2
        //                         style={{
        //                           position: "absolute",
        //                           top: "40%",
        //                           left: "50%",
        //                           transform: "translate(-50%, -50%)",
        //                           fontWeight: "bold",
        //                           fontSize: "10px",
        //                           color: "black",
        //                         }}
        //                       >
        //                         {emp}
        //                       </h2>
        //                       <div
        //                         style={{
        //                           position: "absolute",
        //                           top: "45%",
        //                           left: "50%",
        //                           transform: "translate(-50%, -50%)",
        //                           fontWeight: "bold",
        //                           fontSize: "12px",
        //                           color: "black",
        //                         }}
        //                       >
        //                         {file && (
        //                           <img
        //                             style={{ width: "20px", height: "20px" }}
        //                             src={file}
        //                             alt="Uploaded Image"
        //                           />
        //                         )}
        //                       </div>
        //                       <div
        //                         style={{
        //                           position: "absolute",
        //                           top: "32%",
        //                           left: "50%",
        //                           transform: "translate(-50%, -50%)",
        //                           fontWeight: "bold",
        //                           fontSize: "12px",
        //                           color: "black",
        //                         }}
        //                       ></div>
        //                     </div>
        //                   ) : layout === "2" && imageUrl ? (
        //                     <>
        //                       <div
        //                         className="capture"
        //                         style={{ position: "relative" }}
        //                       >
        //                         <img
        //                           src={imageUrl}
        //                           style={{ width: "100%", height: "100%" }}
        //                         />
        //                       </div>
        //                       <div style={{ color: "green" }}>
        //                         {" "}
        //                         <DeleteOutlined
        //                           onClick={() => handleDeleteClick(imageUrl)}
        //                         />
        //                       </div>
        //                     </>
        //                   ) : (
        //                     <div
        //                       style={{
        //                         width: "100%",
        //                         height: "100px",
        //                         backgroundColor: "grey",
        //                       }}
        //                     >
        //                       <div
        //                         style={{
        //                           position: "relative",
        //                           top: "50%",
        //                           transform: "translateY(-50%)",
        //                         }}
        //                       >
        //                         <span
        //                           style={{
        //                             color: "white",
        //                             textAlign: "center",
        //                             display: "block",
        //                           }}
        //                         >
        //                           No image Uploaded
        //                         </span>
        //                       </div>
        //                     </div>
        //                   )}
        //                 </div>
        //               </>
        //             </Card>
        //           </Col>
        //           <Col sm={24} md={14} lg={14}>
        //             <Card className="birthdayPreviewDiv">
        //               <Form layout="vertical">
        //                 {isDefaultTemplateSelected === "2" ? (
        //                   <Col span={24}>
        //                     <Form.Item
        //                       name="logo"
        //                       className="uploadLogo"
        //                       rules={[
        //                         {
        //                           required: true,
        //                           message: "Please Upload the Template",
        //                         },
        //                       ]}
        //                     >
        //                       <div
        //                         style={{
        //                           border: "dashed #B9B9B9",
        //                           borderWidth: "thin",
        //                           borderRadius: "4px",
        //                           display: "flex",
        //                           justifyContent: "center",
        //                           width: "300px",
        //                         }}
        //                       >
        //                         <input
        //                           style={{
        //                             display: "none",
        //                           }}
        //                           type="file"
        //                           id="logo"
        //                           name="logo"
        //                           ref={imgRef}
        //                           onChange={(e) => handleChangeCustom(e)}
        //                         />
        //                         <>
        //                           <Button
        //                             onClick={(e) => handleClick(e)}
        //                             style={{
        //                               width: "60px",
        //                               height: "50px",
        //                               margin: "15px",
        //                             }}
        //                           >
        //                             <PlusCircleOutlined
        //                               style={{
        //                                 display: "flex",
        //                                 flexDirection: "column-reverse",
        //                                 alignItems: "center",
        //                               }}
        //                             />
        //                             <span
        //                               style={{
        //                                 display: "flex",
        //                                 justifyContent: "center",
        //                                 marginRight: "8px",
        //                               }}
        //                             >
        //                               Upload
        //                             </span>
        //                           </Button>
        //                           <p
        //                             style={{
        //                               fontWeight: "400",
        //                               fontSize: "13px",
        //                               lineHeight: "19px",
        //                               marginLeft: "5px",
        //                               marginTop: "10px",
        //                             }}
        //                           >
        //                             Upload logo. Use the 800 kb size image. PNG or
        //                             JPEG file format accepted
        //                           </p>
        //                         </>
        //                       </div>
        //                       {isBigFile &&
        //                         message.error(
        //                           "File size must be less than 800Kb."
        //                         )}
        //                     </Form.Item>
        //                   </Col>
        //                 ) : (
        //                   <>
        //                     <Col span={24}>
        //                       <Divider orientation="left" orientationMargin={0}>
        //                         Layout
        //                       </Divider>
        //                     </Col>
        //                     <Col span={24}>
        //                       <Form.Item name="selectLayout">
        //                         <Button type="" onClick={showDrawer}>
        //                           Choose Template
        //                         </Button>
        //                         <Drawer
        //                           style={{ padding: "0px" }}
        //                           width={220}
        //                           title="Select Template"
        //                           placement="right"
        //                           onClose={onClose}
        //                           open={open}
        //                         >
        //                           {templates.map((template) => (
        //                             <div
        //                               style={{
        //                                 display: "flex",
        //                                 flexDirection: "column",
        //                                 alignItems: "center",
        //                               }}
        //                               key={template.id}
        //                               onClick={() =>
        //                                 handleTemplateClick(template)
        //                               }
        //                             >
        //                               <img
        //                                 style={{
        //                                   width: "70%",
        //                                   border: "5px solid grey",
        //                                 }}
        //                                 src={template.image}
        //                                 alt={template.name}
        //                               />
        //                               <h3>{template.name}</h3>
        //                             </div>
        //                           ))}
        //                         </Drawer>
        //                       </Form.Item>
        //                     </Col>
        //                     <Col
        //                       span={24}
        //                       style={{ display: "flex", width: "100%" }}
        //                     >
        //                       <Form.Item
        //                         className="auto"
        //                         label="Select Employee"
        //                         name="SelectedEmp"
        //                       >
        //                         <AutoComplete
        //                           className="autocomplete"
        //                           options={optionsEmployee}
        //                           style={{
        //                             width: 300,
        //                           }}
        //                           onSelect={onSelect}
        //                           onSearch={onSearch}
        //                           onBlur={onBlur}
        //                           size="large"
        //                           placeholder="Enter Name"
        //                         />
        //                       </Form.Item>
        //                     </Col>
        //                     <Col span={24}>
        //                       <FormItem
        //                         label="Select Image"
        //                         name="UploadEmpImage"
        //                       >
        //                         <div className="idpage">
        //                           <div className="input-with-clear">
        //                             <Input
        //                               type="file"
        //                               accept="application/pdf"
        //                               id="upload"
        //                               name="upload"
        //                               style={{ display: "flex", width: "300px" }}
        //                               onChange={handleChange}
        //                             />
        //                             {file && (
        //                               <button
        //                                 className="clear-btn"
        //                                 onClick={handleClear}
        //                               >
        //                                 X
        //                               </button>
        //                             )}
        //                           </div>
        //                         </div>
        //                       </FormItem>
        //                     </Col>
        //                   </>
        //                 )}
        //               </Form>
        //             </Card>
        //           </Col>
        //         </Row>
        //         <Col span={24} style={{ margin: "10px" }}>
        //           <FormItem>
        //             {layout === "3" || layout === "4" ? (
        //               <Button
        //                 htmlType="submit"
        //                 type="primary"
        //                 style={{ marginRight: "1rem" }}
        //                 onClick={handlePreviewClick}
        //                 disabled={isDisablePreview}
        //               >
        //                 {" "}
        //                 Preview
        //               </Button>
        //             ) : (
        //               <Button
        //                 htmlType="submit"
        //                 type="primary"
        //                 style={{ marginRight: "1rem" }}
        //                 onClick={handlePreviewClick}
        //                 // disabled={isDisablePreview}
        //               >
        //                 {" "}
        //                 Preview
        //               </Button>
        //             )}
        //           </FormItem>
        //         </Col>
        //         {showMessageContent && (
        //           <>
        //             <Col xs={24} sm={24} md={24}>
        //               <Form form={form} onFinish={handleOnFinish}>
        //                 <Form.Item label="" name="message">
        //                   <Editor
        //                     toolbarClassName="toolbarClassName"
        //                     wrapperClassName="wrapperClassName"
        //                     editorClassName="editorClassName"
        //                     editorState={editorState}
        //                     toolbar={toolbarOptions}
        //                     onEditorStateChange={handleEditorChange}
        //                     wrapperStyle={{
        //                       border: "1px solid #ebebeb",
        //                       overflow: "hidden",
        //                     }}
        //                     editorStyle={{
        //                       height: "200px",
        //                       overflow: "hidden",
        //                       padding: "20px",
        //                     }}
        //                     placeholder="Please Type Your Message"
        //                   />
        //                 </Form.Item>
        //                 <Col span={24}>
        //                   <FormItem>
        //                     <Button
        //                       htmlType="submit"
        //                       type="primary"
        //                       style={{ marginRight: "1rem" }}
        //                       disabled={editorMessage}
        //                     >
        //                       {" "}
        //                       SAVE
        //                     </Button>
        //                   </FormItem>
        //                 </Col>
        //               </Form>
        //             </Col>
        //           </>
        //         )}
        //       </div>
        //     </div>

        //     <Modal
        //       visible={previewVisible}
        //       onCancel={handleCancel}
        //       footer={null}
        //       style={{
        //         maxWidth: "90vw",
        //         maxHeight: "90vh",
        //         width: imageData ? `${imageData.width}px` : "auto",
        //         height: imageData ? `${imageData.height}px` : "auto",
        //         padding: "10px",
        //       }}
        //     >
        //       <Form
        //         form={formPreview}
        //         onFinish={() => handleSendTemplate(imageData)}
        //       >
        //         <Form.Item
        //           name="sendTemplate"
        //           style={{ display: "flex", flexDirection: "column" }}
        //         >
        //           {imageData && (
        //             <img
        //               src={imageData}
        //               alt="preview"
        //               style={{
        //                 maxWidth: "100%",
        //                 maxHeight: "100%",
        //                 width: "auto",
        //                 height: "auto",
        //               }}
        //             />
        //           )}
        //         </Form.Item>
        //         <Button
        //           type="primary"
        //           htmlType="submit"
        //           style={{ width: "auto", marginTop: "10px" }}
        //         >
        //           SEND TEMPLATE
        //         </Button>
        //       </Form>
        //     </Modal>
        //   </Card>
      }
    </div>
  );
}

export default NotifySettings;
