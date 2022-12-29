import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Tabs,
  Input,
  Col,
  Row,
  Divider,
  message,
  Upload,
  Spin,
  Button,
  Space,
  Card,
  Select,
  Table,
  Tag,
  Modal,
  notification,
} from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  StopFilled,
  EyeFilled,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import imageavailable from "../images/imageavailable.png";
import reload from "../images/reload.png";
import { getCountryCode } from "../contexts/CreateContext";
import CompanyProContext from "../contexts/CompanyProContext";
import { showNotification } from "../contexts/CreateContext";

const { Option } = Select;

function EditOnboarding(props) {
  const [fileName, setFileName] = useState(props.modalData.logo);
  const [fileEdited, setFileEdited] = useState(false);
  const [imageUrl, setImageUrl] = useState(props.modalData.logo || "");
  const [isBigFile, setIsBigFile] = useState(false);
  const imgRef = React.useRef(null);
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState(props.modalData);
  const [loading, setLoading] = useState(false);
  const [codes, setCodes] = useState("");

  const timer = setTimeout(() => {
    setLoading(false);
  }, 500);
  useEffect(() => {
    getCountryCode().then((res) => {
      setCodes(res);
    });
    setModalData(props.modalData);
  }, []);

  useEffect(() => {
    setIsBigFile(false);
  });

  const handleClick = () => {
    imgRef.current.click();
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      // setLoading(false);
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
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
    props.setIsEditOrganization(false);
    form.resetFields();
    setModalData(props.modalData);
  }
  const onFinish = (values) => {
    const valuesToservice = {
      regCompName: values.regCompName,
      regOffice: {
        addLine1: values.addLine1,
        addLine2: values.addLine2,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,
      },
      cinNumber: values.cinNumber,
      gst: values.gst,
      domain: values.domain,
      phone: values.phone,
    };
    CompanyProContext.updateCompInfo(
      values.orgcode,
      valuesToservice,
      fileEdited ? fileName : null
    )
      .then(() => showNotification("success", "Success", "Edit Successful"))
      .catch(() => showNotification("error", "Error", "Failed to edit"));
    onReset();
    props.getData();
    props.setIsEditOrganization(false);
  };

  const handleEdit = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    checkFileSize(fileUploaded.size, fileUploaded);
  };
  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
      setFileEdited(true);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }
  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkCharacterRole = (event) => {
    if (!/^[a-zA-Z ().-]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  const checkAlphabetUpper = (event) => {
    if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const handleOnChange = (value, event) => {
    console.log(value, event);
  };

  const prefixSelector = (
    <Form.Item initialValue={modalData.prefix} name="prefix" noStyle>
      <Select
        allowClear={true}
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
        onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  return (
    <Card
      style={{
        background: "#fff",
        // marginRight: "30px",
        // height: "55rem",
      }}
    >
      <div style={{ background: "#fff" }}>
        <div
          style={{
            fontWeight: "600",
            fontSize: "16px",
            lineHeight: "19px",
          }}
        >
          ORGANIZATION DETAILS
        </div>
        <Divider />
        <Form
          className="organization"
          form={form}
          layout="vertical"
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
          onFinish={onFinish}
        >
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="preCode"
                label="Prefix Code"
                initialValue={props.modalData.id}
                // rules={[
                //   {
                //     required: false,
                //     message: "Please Enter Code",
                //   },
                //   {
                //     pattern: /^[0-9A-Z_\s]+$/,
                //     message: "Please Enter Valid Code",
                //   },
                // ]}
              >
                <Input
                  maxLength={10}
                  placeholder="Prefix Code"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="regCompName"
                label="Organization Name"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Organization Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
                initialValue={props.modalData.regCompName}
              >
                <Input
                  maxLength={30}
                  placeholder="Organization Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="cinNumber"
                label="CIN Number"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event) && checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter CIN Number",
                  },
                  {
                    pattern: /^[0-9a-zA-Z]+$/,
                    message: "Please enter Valid Number",
                  },
                ]}
                initialValue={props.modalData.cinNumber}
              >
                <Input
                  maxLength={21}
                  placeholder="CIN Number"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="gst"
                label="GST Number"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event) && checkAlphabetUpper(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: false,
                    message: "Please enter GST Number",
                  },
                  {
                    pattern:
                      /^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                    message: "Please enter Valid Number",
                  },
                ]}
                initialValue={props.modalData.gst}
              >
                <Input
                  maxLength={15}
                  placeholder="GST Number"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="domain"
                label="Domain Name"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Domain Name",
                  },
                  {
                    pattern:
                      /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,
                    message: "Please Enter Valid Name",
                  },
                ]}
                initialValue={props.modalData.domain}
              >
                <Input
                  maxLength={30}
                  placeholder="Domain Name"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="phone"
                label="Phone"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Phone Number",
                  },
                  {
                    pattern: /^[0-9]\d{9}$/,
                    message: "Please Enter Valid Number",
                  },
                ]}
                initialValue={props?.modalData?.phone}
              >
                <Input
                  addonBefore={prefixSelector}
                  maxLength={10}
                  placeholder="Phone"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="addLine1"
                label="Address Line 1"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Company Address",
                  },
                  {
                    pattern: /^[0-9a-zA-Z.,\s]+$/,
                    message: "Please Enter Valid Address",
                  },
                ]}
                initialValue={props.modalData.regOffice?.addLine1}
              >
                <Input
                  maxLength={50}
                  placeholder="Address Line 1"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="addLine2"
                label="Address Line 2"
                rules={[
                  {
                    required: true,
                    message: "Please Enter Company Address",
                  },
                  {
                    pattern: /^[0-9a-zA-Z.,\s]+$/,
                    message: "Please Enter Valid Address",
                  },
                ]}
                initialValue={props.modalData.regOffice?.addLine2}
              >
                <Input
                  maxLength={50}
                  placeholder="Address Line 2"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="city"
                label="City"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please Enter City Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
                initialValue={props.modalData.regOffice?.city}
              >
                <Input
                  maxLength={20}
                  placeholder="City"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 8]}>
            <Col xs={22} sm={15} md={8}>
              <Form.Item
                name="state"
                label="State"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter State",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
                initialValue={props.modalData.regOffice?.state}
              >
                <Input
                  maxLength={25}
                  placeholder="State"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={4}>
              <Form.Item
                name="country"
                label="Country"
                onKeyPress={(event) => {
                  if (checkAlphabets(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Country Name",
                  },
                  {
                    pattern: /^[a-zA-Z\s]*$/,
                    message: "Please enter Valid Name",
                  },
                ]}
                initialValue={props.modalData.regOffice?.country}
              >
                <Input
                  maxLength={20}
                  placeholder="Country"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={4}>
              <Form.Item
                name="pincode"
                label="Pin Code"
                onKeyPress={(event) => {
                  if (checkNumbervalue(event)) {
                    event.preventDefault();
                  }
                }}
                rules={[
                  {
                    required: true,
                    message: "Please enter Pin Code",
                  },
                  {
                    pattern: /^[0-9\b]+$/,
                    message: "Please Enter Valid Code",
                  },
                ]}
                initialValue={props.modalData.regOffice?.pincode}
              >
                <Input
                  maxLength={6}
                  placeholder="Pin Code"
                  style={{
                    border: "1px solid #8692A6",
                    borderRadius: "4px",
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={22} sm={15} md={8}>
              <Form.Item name="logo" className="uploadLogo">
                <div
                  style={{
                    border: "dashed #B9B9B9",
                    borderWidth: "thin",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
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
                    <div
                      className="hoverImgCont"
                      style={{ margin: "10px auto" }}
                    >
                      <img
                        src={imageUrl}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          maxWidth: "170px",
                          height: "100px",
                          padding: "10px",
                        }}
                      />
                      <div className="editOverlay">
                        <DeleteOutlined
                          className="hoverIcon"
                          onClick={() => {
                            setFileName(null);
                            setImageUrl("");
                          }}
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
          </Row>
          <Divider />
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              marginRight: "19px",
            }}
          >
            <Space>
              <Form.Item>
                <Button
                  style={{
                    border: "1px solid #1963a6",
                    color: "#1963a6",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                  }}
                  onClick={onReset}
                >
                  CANCEL
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    border: "1px solid #1963a6",
                    background: "#1963a6",
                    color: "#ffffff",
                    fontWeight: "600",
                    fontSize: "14px",
                    lineHeight: "17px",
                    width: "99px",
                  }}
                  htmlType="submit"
                >
                  SAVE
                </Button>
              </Form.Item>
            </Space>
          </div>
        </Form>
      </div>
    </Card>
  );
}

export default EditOnboarding;
