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
  Button,
  notification,
  Space,
  Select,
} from "antd";
import { CloseCircleOutlined, DeleteOutlined, PlusCircleOutlined } from "@ant-design/icons";
import "../style/Onboarding.css";
import CompanyProContext from "../contexts/CompanyProContext";
import reload from "../images/reload.png";
const { Option } = Select;

const OrgDetails = (props) => {
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(props.fileName || "");
  const [imageUrl, setImageUrl] = useState(props.fileName || "");
  const [isBigFile, setIsBigFile] = useState(false);
  const [data, setData] = useState(props.data || {});
  const [newCompId, setNewCompId] = useState(props.data.orgcode || null);

  useEffect(() => {
    if(newCompId == null) {
        setNewCompId(CompanyProContext.getOrgId());
    }
    setFileName(fileName);
    setIsBigFile(false);
  }, []);

  const onFinish = async (values) => {
    delete values.logo
    console.log("saved")
    localStorage.setItem("OrgDetails", JSON.stringify(values));
    localStorage.setItem("Logo", imageUrl);
    setData(values);
  };

  const handleClick = () => {
    imgRef.current.click();
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
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

//   const validateOrgId = async (rule, value, callback) => {
//     try {
//       let exists = await CompanyProContext.checkOrgIdExists(value);
//       if (exists) {
//         setOrgIdExists(true);
//         throw new Error("this id exists");
//       }
//       setOrgIdExists(false);
//       // return exists;
//     } catch (err) {
//       callback(err.message);
//     }
//     // CompanyProContext.checkOrgIdExists(value)
//   };

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
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );
        console.log(props)
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
        onFinish={(values) => props.changeSave(values, imageUrl)}
      >
        <Row gutter={[24, 8]}>
          <Col xs={22} sm={15} md={8}>
            <Form.Item
              initialValue={newCompId}
              name="orgcode"
              label="Organization Code"
            >
              <Input
                disabled
                placeholder="Organization Code"
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
                  message: "Please enter Organization Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
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
                  message: "Please enter CIN Number",
                },
                {
                  pattern: /^[0-9a-zA-Z]+$/,
                  message: "Please enter Valid Number",
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
                  required: true,
                  message: "Please enter GST Number",
                },
                {
                  pattern:
                    /^[0-9]{2}[A-Z]{3}[ABCFGHLJPTF]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                  message: "Please enter Valid Number",
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
                  message: "Please enter Phone Number",
                },
                {
                  pattern: /^[0-9]\d{9}$/,
                  message: "Please Enter Valid Number",
                },
              ]}
              initialValue={data?.phone}
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
                  message: "Please enter Valid Name",
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
                  message: "Please enter State",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
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
                  message: "Please enter Country Name",
                },
                {
                  pattern: /^[a-zA-Z\s]*$/,
                  message: "Please enter Valid Name",
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
                  message: "Please enter Pin Code",
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
            <Form.Item name="logo" className="uploadLogo">
              <div
                style={{
                //   border: "dashed #B9B9B9",
                //   borderWidth: "thin",
                //   borderRadius: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "10px 0"
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
                    <div className="hoverImgCont" style={{position: "relative"}}>
                  <img 
                    src={imageUrl}
                    style={{
                        maxWidth: "120px",
                        height: "auto",
                    }}
                  />
                  <div className="overlay">
                  <DeleteOutlined className="hoverIcon" onClick={onReset}/></div>
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
