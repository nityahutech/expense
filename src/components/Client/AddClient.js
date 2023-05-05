import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Col, Row, Divider, message, Button, Space } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import {
  capitalize,
  checkAlphabets,
  checkNumbervalue,
  getBase64,
  showNotification,
} from "../../contexts/CreateContext";
import axios from "axios";
import ClientContext from "../../contexts/ClientContext";
import { useNavigate } from "react-router-dom";

const AddClient = () => {
  const [fileName, setFileName] = useState();
  const [fileEdited, setFileEdited] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [isBigFile, setIsBigFile] = useState(false);
  const imgRef = useRef(null);
  const [form] = Form.useForm();
  const [modalData, setModalData] = useState();
  const [clientData, setClientdata] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setIsBigFile(false);
  });

  const handleClick = () => {
    imgRef.current.click();
  };

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  function onReset() {
    setFileEdited(false);
    setFileName();
    setImageUrl();
    form.resetFields();
    setModalData();
  }

  const onFinish = async (values) => {
    console.log("clientAdd", values);
    const clientExists = clientData.find(
      (clientPresent) =>
        clientPresent.regCompName === values.regCompName ||
        clientPresent.phone === values.phone
    );
    if (clientExists) {
      showNotification(
        "error",
        "Error",
        `Client with the Name ${values.regCompName} or phone number already exists!`
      );
      return;
    }
    try {
      let clientAdd = {
        contact: {
          addLine1: values.addLine1,
          addLine2: values.addLine2 || null,
          city: values.city,
          state: values.state,
          country: values.country,
          pincode: values.pincode,
        },
        regCompName: values.regCompName,
        domain: values.domain,
        phone: values.phone,
        logo: values.logo,

      };
      console.log("clientAdd", clientAdd);

      await ClientContext.addClient(clientAdd, fileName);
      showNotification("success", "Success", "Client Add Successfully");
      navigate('/Client/ViewClient')
      
    } catch (error) {
      console.log("error", error);
      showNotification("error", "Error", "Failed to addClient!");
    }
    form.resetFields();
  };

  const getClientData = async () => {
    let data = await ClientContext.getClient();
    console.log("clientget", data);
    setClientdata(data);
  };

  useEffect(() => {
    getClientData();
  }, []);

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
      setFileEdited(true);
    } else {
      setFileName(null);
      setIsBigFile(true);
      setFileEdited(false);
    }
  }

  const handlePinCode = async (event) => {
    console.log("pincode", event);
    let zip = event.target.value;

    console.log("pincode", zip);
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${zip}`
    );
    console.log("pincode", response?.data?.[0].PostOffice?.[0]);
    const addressInfo = response?.data?.[0].PostOffice?.[0];

    const city = addressInfo?.District;
    const state = addressInfo?.State;
    const country = addressInfo?.Country;
    console.log("pincode", city, state, country, addressInfo);

    form.setFieldsValue({
      city: city,
      state: state,
      country: country,
    });
  };
  return (
    <div style={{ margin: "13px", background: "#fff" }}>
      <div
        style={{
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "32px",
        }}
      >
        Add Client
      </div>
      <Divider />
      <Form
        className="details"
        style={{ padding: "11px" }}
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
              name="regCompName"
              label="Company Name"
              rules={[
                {
                  required: true,
                  message: "Please Enter Comapany Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Name",
                },
              ]}
            >
              <Input
                maxLength={50}
                placeholder="Comapany Name"
                style={{
                  border: "1px solid #8692A6",
                  borderRadius: "4px",
                }}
                onChange={(e) => {
                  const str = e.target.value;
                  const caps = str.split(" ").map(capitalize).join(" ");
                  form.setFieldsValue({ regCompName: caps });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
              name="domain"
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Please Enter Email Id",
                  type: "email",
                },
                {
                  message: "Please enter Valid Email",
                },
              ]}
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
                  message: "Please Enter Phone Number",
                },
                {
                  pattern: /^[0-9]\d{9}$/,
                  message: "Please Enter Valid Number",
                },
              ]}

            >
              <Input
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
                  required: false,
                  message: "Please Enter Company Address",
                },
                {
                  pattern: /^[0-9a-zA-Z.,\s]+$/,
                  message: "Please Enter Valid Address",
                },
              ]}
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
                  message: "Please Enter Pin Code",
                },
                {
                  pattern: /^[0-9\b]+$/,
                  message: "Please Enter Valid Code",
                },
              ]}
            >
              <Input
                maxLength={6}
                placeholder="Pin Code"
                style={{
                  border: "1px solid #8692A6",
                  borderRadius: "4px",
                }}
                onBlur={handlePinCode}
              />
            </Form.Item>
          </Col>
          <Col xs={22} sm={15} md={4}>
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
                  message: "Please Enter Valid Name",
                },
              ]}
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
                  message: "Please Enter State Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Name",
                },
              ]}
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
          <Col xs={22} sm={15} md={8}>
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
                  message: "Please Enter Country Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Name",
                },
              ]}
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
          <Col xs={22} sm={15} md={8}>
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
                      src={imageUrl}
                      style={{
                        maxWidth: "170px",
                        height: "100px",
                        padding: "10px",
                      }}
                    />
                    <div className="onboardOverlay">
                      <DeleteOutlined className="hoverIcon" onClick={onReset} />
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
  );
};

export default AddClient;
