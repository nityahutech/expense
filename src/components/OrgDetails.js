import React, { useState, useEffect } from "react";
import { Form, Input, Col, Row, Divider, message, Button, Select } from "antd";
import { DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "../style/Onboarding.css";
import { getBase64, getCountryCode } from "../contexts/CreateContext";
const { Option } = Select;

const OrgDetails = (props) => {
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(props.fileName || null);
  const [imageUrl, setImageUrl] = useState(props.imageUrl || "");
  const [isBigFile, setIsBigFile] = useState(false);
  const [codes, setCodes] = useState("");
  const [form] = Form.useForm();
  const [data, setData] = useState(props.data || {});
  const newCompId = props.data.orgcode;

  useEffect(() => {
    getCountryCode().then((res) => {
      setCodes(res);
    });
    setFileName(props.fileName || null);
    setImageUrl(props.imageUrl || "");
    setIsBigFile(false);
    setData(props.data || {});
  }, [props.data]);

  useEffect(() => {
    setIsBigFile(false);
  });

  const handleClick = () => {
    imgRef.current.click();
  };

  const handleOnChange = (value, event) => {
    console.log(value, event);
  };

  // const getBase64 = (img, callback) => {
  //   const reader = new FileReader();
  //   reader.addEventListener("load", () => callback(reader.result));
  //   reader.readAsDataURL(img);
  // };

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

  const checkAlphabetUpper = (event) => {
    if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }

  // useEffect(() => {
  //   getCountryCode().then((res) => {
  //     setCodes(res);
  //   });
  // }, []);

  const onFinishFailed = (errorInfo) => {
    props.setIsStepOneInvalid(true);
  };

  const prefixSelector = (
    <Form.Item initialValue={data.prefix} name="prefix" noStyle>
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
    <div style={{ margin: "13px", background: "#fff" }}>
      <div
        style={{
          // paddingTop: "13px",
          fontWeight: "600",
          fontSize: "14px",
          lineHeight: "32px",
        }}
      >
        Organization Details
      </div>
      <Divider />
      <Form
        className="details"
        style={{ padding: "11px" }}
        form={props.form}
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
        onFinish={(values) => props.changeSave(values, fileName, imageUrl)}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[24, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
              // initialValue={newCompId}
              name="preCode"
              label="Prefix Code"
              onKeyPress={(event) => {
                if (checkNumbervalue(event) && checkAlphabetUpper(event)) {
                  event.preventDefault();
                }
              }}
              rules={[
                {
                  required: true,
                  message: "Please Enter Code",
                },
                {
                  pattern: /^[0-9A-Z_\s]+$/,
                  message: "Please Enter Valid Code",
                },
              ]}
              initialValue={data?.preCode}
            >
              <Input
                maxLength={10}
                placeholder="Prefix Code"
                style={{
                  border: "1px solid #8692A6",
                  borderRadius: "4px",
                }}
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
                  message: "Please Enter Organization Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Name",
                },
              ]}
              initialValue={data?.regCompName}
            >
              <Input
                maxLength={50}
                placeholder="Organization Name"
                style={{
                  border: "1px solid #8692A6",
                  borderRadius: "4px",
                }}
                onChange={(e) => {
                  const inputval = e.target.value;
                  const str = e.target.value;
                  const newVal =
                    inputval.substring(0, 1).toUpperCase() +
                    inputval.substring(1);
                  const caps = str.split(" ").map(capitalize).join(" ");
                  // setPaidBy(newVal);
                  props.form.setFieldsValue({
                    regCompName: newVal,
                    regCompName: caps,
                  });
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
                  message: "Please Enter CIN Number",
                },
                {
                  pattern: /^[0-9a-zA-Z]+$/,
                  message: "Please Enter Valid Number",
                },
              ]}
              initialValue={data?.cinNumber}
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
                  message: "Please Enter GST Number",
                },
                {
                  pattern:
                    /^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Please Enter Valid Number",
                },
              ]}
              initialValue={data?.gst}
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
              initialValue={data?.domain}
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
              initialValue={data?.phone ? data.phone : "-"}
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
              initialValue={data?.addLine1}
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
              initialValue={data?.addLine2}
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
                  message: "Please Enter Valid Name",
                },
              ]}
              initialValue={data?.city}
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
              initialValue={data?.state}
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
                  message: "Please Enter Country Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please Enter Valid Name",
                },
              ]}
              initialValue={data?.country}
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
                  message: "Please Enter Pin Code",
                },
                {
                  pattern: /^[0-9\b]+$/,
                  message: "Please Enter Valid Code",
                },
              ]}
              initialValue={data?.pincode}
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
      </Form>
    </div>
  );
};

export default OrgDetails;
