import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  message,
  Select,
  Form,
  Divider,
} from "antd";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditFilled,
  UploadOutlined,
} from "@ant-design/icons";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import "./Personal.css";
import moment from "moment";
import {
  capitalize,
  checkAlphabetsName,
  checkNoAlphabets,
  checkNumbervalue,
  getBase64,
} from "../../contexts/CreateContext";
import PrefixSelector from "../PrefixSelector";
import { useAuth } from "../../contexts/AuthContext";
const { TextArea } = Input;
const { Option } = Select;

function Personal() {
  const imgRef = React.useRef(null);
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isBigFile, setIsBigFile] = useState(false);
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [dob, setDob] = useState("");
  const [scrs, setScrs] = useState("");
  const [lccs, setLccs] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const [form] = Form.useForm();

  const onFinish = (value) => {
    let nameArray = value.name.split(" ");
    let mname = "";
    for (let i = 1; i < nameArray.length - 1; i++) {
      mname = mname + ((i != 1 ? " " : "") + nameArray[i]);
    }
    let record = {
      ...value,
      lname: nameArray[nameArray.length - 1],
      fname: nameArray[0],
      dob: dob ? dob : null,
      bloodGroup: value.bloodGroup ? value.bloodGroup : null,
      maritalStatus: value.maritalStatus ? value.maritalStatus : null,
      mname: mname,
      profilePic: imageUrl || null,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record, fileName);
    setTimeout(() => {
      getData();
    }, 2000);
    showEditContent(false);
  };

  const handleClick = () => {
    imgRef.current.click();
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

  const onContactFinish = (values) => {
    let record = {
      ...values,
      profilePic: data.profilePic || null,
      altPhnNo: values.altPhnNo ? values.altPhnNo : "",
      prefix: values.prefix ? values.prefix : "",
      prefix2: values.prefix2 ? values.prefix2 : "",
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    getData();
    showEditContactInfo(false);
  };

  const onEditAddressFinish = (values) => {
    let record = {
      currentAdd: values.currentAdd ? values.currentAdd : "",
      houseType: values.houseType ? values.houseType : "",
      permanentAdd: values.permanentAdd ? values.permanentAdd : "",
      scrs: scrs ? scrs : null,
      lccs: lccs ? lccs : null,
      profilePic: data.profilePic || null,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    showEditAddressInfo(false);
    getData();
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setIsBigFile(false);
  });

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setData(data);
    setImageUrl(data.profilePic);
    setDob(data?.dob ? data.dob : null);
    setLccs(data?.lccs ? data.lccs : null);
    setScrs(data?.scrs ? data.scrs : null);
  };

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }

  const layoutName = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
      md: { span: 4 },
      lg: { span: 3 },
      xl: { span: 3 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };

  const layoutDOB = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 10 },
      xl: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };

  const layoutGender = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 10 },
      xl: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };

  const layoutBlood = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 12 },
      lg: { span: 10 },
      xl: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
      xl: { span: 16 },
    },
  };

  const layoutMaritalStatus = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 14 },
      lg: { span: 10 },
      xl: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };

  const imgDiv = () => {
    if (imageUrl == "" || imageUrl == null) {
      return editContent == false ? (
        <div className="noImage">No Image</div>
      ) : (
        <Button
          className="imgDel"
          onClick={(e) => handleClick(e)}
        >
          <input
            className="imgInp"
            style={{
              display: "none",
            }}
            type="file"
            id="logo"
            name="logo"
            ref={imgRef}
            onChange={(e) => handleChange(e)}
          />
          <UploadOutlined /> Upload Photo
        </Button>
      );
    } else {
      return (
        <div
          className={editContent === true ? "hoverImgCont" : null}
          style={{
            position: "relative",
            width: "150px",
            height: "170px",
          }}
        >
          <img
            src={imageUrl}
            style={{
              width: "150px",
              height: "170px",
              border: "1px solid #05445e",
            }}
            alt=""
          />
          {editContent === true ? (
            <div className="imageOverlay">
              <DeleteOutlined className="hoverIcon" onClick={onReset} />
            </div>
          ) : null}
        </div>
      );
    }
  };

  const disabledDate = (current) => {
    return current.isAfter(moment().subtract(14, "years"));
  };

  const disabledScrs = (current) => {
    return current.isAfter(moment());
  };

  const disabledLccs = (current) => {
    return current.isAfter(moment());
  };

  return (
    <>
      <div className="personalCardDiv">
        <Row className="Row-Card">
          <Col span={24}>
            <Form
              form={form}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={onFinish}
              layout="horizontal"
            >
              <Card
                className="personalCardOne"
                hoverable={true}
                bordered={true}
              >
                <Row gutter={[16, 16]}>
                  <Col
                    className="profileImagediv"
                    xs={24}
                    sm={24}
                    md={7}
                    lg={6}
                    xl={6}
                    xxl={6}
                  >
                    {isBigFile
                      ? message.error("File size must be less than 200Kb.")
                      : ""}
                    {imgDiv()}
                  </Col>
                  <Col xs={24} sm={24} md={17} lg={18} xl={18} xxl={18}>
                    {editContent === false ? (
                      <>
                        <div
                          style={{
                            height: "100%",
                            width: "100%",
                            marginRight: "10px"
                          }}
                        >
                          <div className="headerTitle">
                            {data ? data.name : "-"}
                            <Button
                              className="editButtonOne"
                              type="text"
                              onClick={() => showEditContent(!editContent)}
                            >
                              <EditFilled />
                            </Button>
                          </div>
                          <Divider
                            style={{
                              borderTop: "1.5px solid #05445e",
                              marginTop: "0px",
                              marginBottom: "15px",
                            }}
                          />
                          <Row>
                            <Col span={24}>
                              <Row gutter={[16, 16]}>
                                <Col
                                  xs={24}
                                  sm={24}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        lineHeight: "18px",
                                        color: "#07182b",
                                        fontSize: "15px",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Date of Birth
                                    </div>
                                    <div>{data?.dob ? data.dob : "-"}</div>
                                  </div>
                                </Col>
                                <Col
                                  xs={24}
                                  sm={24}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        lineHeight: "18px",
                                        color: "#07182b",
                                        fontSize: "15px",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Gender
                                    </div>
                                    <div>{data ? data.gender : null}</div>
                                  </div>
                                </Col>
                                <Col
                                  xs={24}
                                  sm={24}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        lineHeight: "18px",
                                        color: "#07182b",
                                        fontSize: "15px",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Blood Group
                                    </div>
                                    <div>
                                      {data?.bloodGroup ? data.bloodGroup : "-"}
                                    </div>
                                  </div>
                                </Col>
                                <Col
                                  xs={24}
                                  sm={24}
                                  md={12}
                                  lg={12}
                                  xl={12}
                                  xxl={12}
                                >
                                  <div>
                                    <div
                                      style={{
                                        fontWeight: 600,
                                        lineHeight: "18px",
                                        color: "#07182b",
                                        fontSize: "15px",
                                        fontFamily: "Open Sans,sans-serif",
                                      }}
                                    >
                                      Marital Status
                                    </div>
                                    <div>
                                      {data?.maritalStatus ? data.maritalStatus : "-"}
                                    </div>
                                  </div>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </div>
                      </>
                    ) : (
                      <>
                        <Row gutter={[16, 16]}>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              label="Name::"
                              initialValue={data.name}
                              name="name"
                              colon
                              onKeyPress={(event) => {
                                if (checkAlphabetsName(event)) {
                                  event.preventDefault();
                                }
                              }}
                              rules={[
                                {
                                  required: true,
                                  minLength: 3,
                                  maxLength: 50,
                                },
                              ]}
                              {...layoutName}
                            >
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                }}
                                bordered={false}
                                initialValue={data.name ? data.name : null}
                                maxLength={50}
                                required
                                placeholder="Enter Your Name"
                                onChange={(e) => {
                                  const str = e.target.value;
                                  const caps = str.split(" ").map(capitalize).join(" ");
                                  form.setFieldsValue({ name: caps });
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                              label="Date Of Birth::"
                              colon={true}
                              initialValue={
                                dob ? moment(dob, "DD-MM-YYYY") : null
                              }
                              name="dob"
                              rules={[
                                {
                                  required: false,
                                  message: "Please Choose a Date",
                                },
                              ]}
                              {...layoutDOB}
                              onKeyPress={(event) => {
                                if (checkNoAlphabets(event)) {
                                  event.preventDefault();
                                }
                              }}
                            >
                              <DatePicker
                                style={{
                                  backgroundColor: "#ffffff",
                                  width: "90%",
                                  border: "none",
                                  borderBottom: "1px solid #ccc",
                                  borderRadius: 0,
                                  padding: "5px 10px",
                                }}
                                onChange={(e) => {
                                  setDob(e.format("DD-MM-YYYY"));
                                }}
                                disabledDate={disabledDate}
                                value={dob}
                                placeholder="Choose Date"
                                format={"DD-MM-YYYY"}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                              label="Gender::"
                              name="gender"
                              initialValue={data.gender ? data.gender : "-"}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Choose Gender",
                                },
                              ]}
                              {...layoutGender}
                            >
                              <Select
                                placeholder="Select a Gender"
                                style={{
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                                allowClear={true}
                              >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
                                <Option value="Others">Others</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                              label="Blood Group::"
                              initialValue={data ? data.bloodGroup : null}
                              name="bloodGroup"
                              rules={[
                                {
                                  required: false,
                                  message: "Please Choose Blood Groop",
                                },
                              ]}
                              {...layoutBlood}
                            >
                              <Select
                                placeholder="Select a Blood Group"
                                style={{
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                                allowClear={true}
                              >
                                <Option value="A+">A+</Option>
                                <Option value="A-">A-</Option>
                                <Option value="O+">O+</Option>
                                <Option value="O-">O-</Option>
                                <Option value="B+">B+</Option>
                                <Option value="B-">B-</Option>
                                <Option value="AB+">AB+</Option>
                                <Option value="AB-">AB-</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={12} lg={12} xl={12} xxl={12}>
                            <Form.Item
                              label="Marital Status::"
                              initialValue={data ? data.maritalStatus : null}
                              name="maritalStatus"
                              rules={[
                                {
                                  required: false,
                                  message: "Your Marrige Status",
                                },
                              ]}
                              {...layoutMaritalStatus}
                            >
                              <Select
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                                allowClear={true}
                              >
                                <Option value="Single">Single</Option>
                                <Option value="Married">Married</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Col>
                </Row>
                {editContent === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        showEditContent(false);
                        setFileName(null);
                        setImageUrl(data.profilePic);
                      }}
                      type="text"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        marginLeft: "10px",
                        background: "#1963a6",
                        width: "90px",
                      }}
                    >
                      <CheckOutlined />
                      SAVE
                    </Button>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="personalCardDiv">
        <Row className="Row-Card">
          <Col span={24}>
            <Form
              labelcol={{
                span: 4,
              }}
              wrappercol={{
                span: 14,
              }}
              s
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={onContactFinish}
            >
              <Card
                title="CONTACT INFO"
                className="personal"
                bordered={true}
                hoverable={true}
                extra={
                  <>
                    {editContactInfo === false ? (
                      <Button
                        className="personal"
                        type="text"
                        style={{
                          color: "#ffff",
                          display: "none",
                          paddingTop: "7px",
                          paddingRight: "7px",
                          position: "absolute",
                          right: 10,
                          top: 10,
                        }}
                        onClick={() => showEditContactInfo(!editContactInfo)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Official Email ID
                      </div>
                      {editContactInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.mailid ? data.mailid : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="mailid"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Email Id",
                              type: "email",
                            },
                            {
                              message: "Please enter Valid Email",
                            },
                          ]}
                        >
                          <Input
                            maxLength={50}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              padding: "2px",
                            }}
                            bordered={false}
                            disabled={true}
                            required
                            placeholder="Enter Email Address"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Personal Email ID
                      </div>
                      {editContactInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.contactEmail ? data.contactEmail : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.contactEmail : null}
                          name="contactEmail"
                          rules={[
                            {
                              required: true,
                              message: "Please Enter Email Id",
                            },
                            {
                              type: "email",
                              message: "Please Enter Valid Email Id",
                            },
                          ]}
                        >
                          <Input
                            maxLength={50}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              padding: "2px",
                            }}
                            bordered={false}
                            required
                            placeholder="Enter Email Address"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Phone Number
                      </div>
                      {editContactInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.phonenumber
                            ? `${data.prefix} ${data.phonenumber}`
                            : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.phonenumber : null}
                          className="numder-inputs"
                          name="phonenumber"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              message: "Please enter Phone Number",
                              pattern: /^[0-9]\d{9}$/,
                            },
                            { whitespace: true },
                          ]}
                        >
                          <Input
                            addonBefore={(<PrefixSelector name="prefix" initial={data.prefix} />)}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              padding: "2px",
                            }}
                            bordered={false}
                            maxLength={10}
                            required
                            placeholder="Enter Phone Number"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Alternate Phone Number
                      </div>
                      {editContactInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.altPhnNo
                            ? `${data.prefix2} ${data.altPhnNo}`
                            : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.altPhnNo : null}
                          className="numder-inputs"
                          name="altPhnNo"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please enter Phone Number",
                              pattern: /^[0-9]\d{9}$/,
                            },
                            { whitespace: true },
                          ]}
                        >
                          <Input
                            addonBefore={(<PrefixSelector name="prefix2" initial={data.prefix2} />)}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              padding: "2px",
                            }}
                            bordered={false}
                            maxLength={10}
                            placeholder="Enter Alternate Number"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                {editContactInfo === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditContactInfo(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        marginLeft: "10px",
                        background: "#1963a6",
                        width: "90px",
                      }}
                    >
                      <CheckOutlined />
                      SAVE
                    </Button>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

      <div className="personalCardDivLast">
        <Row className="Row-Card">
          <Col span={24}>
            <Form
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
              onFinish={onEditAddressFinish}
            >
              <Card
                title="ADDRESS"
                className="personalCardLast"
                hoverable={true}
                bordered={true}
                extra={
                  <>
                    {editAddressInfo === false ? (
                      <Button
                        className="editButtonLast"
                        type="text"
                        onClick={() => showEditAddressInfo(!editAddressInfo)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Current Address
                      </div>
                      {editAddressInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.currentAdd ? data.currentAdd : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.currentAdd : null}
                          name="currentAdd"
                          rules={[
                            {
                              // required: true,
                              // minLength: 3,
                              // maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{5,100}$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            maxLength={80}
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            rows={4}

                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Permanent Address
                      </div>
                      {editAddressInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.permanentAdd ? data.permanentAdd : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.permanentAdd : null}
                          name="permanentAdd"
                          rules={[
                            {
                              // required: true,
                              // minLength: 3,
                              // maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^[a-zA-Z\s]*$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            maxLength={80}
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            rows={4}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        House Type
                      </div>
                      {editAddressInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.houseType ? data.houseType : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.houseType : null}
                          name="houseType"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 30,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^[a-zA-Z\s]*$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          {/* <Input
                    
                        maxLength={50}
                        // required
                        placeholder="Enter Your HouseType"
                          //defaultValue = {data?data.fname+" "+data.lname:null}
                      /> */}
                          <Select
                            defaultValue=""
                            placeholder="Please Select House Type"
                            allowClear={true}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc",
                              padding: "2px",
                            }}
                            bordered={false}
                          >
                            <Option value="Owned by Self/Spouse">
                              Owned by Self/Spouse
                            </Option>
                            <Option value="Owned by Parent/Sibling">
                              Owned by Parent/Sibling
                            </Option>
                            <Option value="Rented - with Family">
                              Rented - with Family
                            </Option>
                            <Option value="Rented - with Friends">
                              Rented - with Friends
                            </Option>
                            <Option value="Rented - Staying Alone">
                              Rented - Staying Alone
                            </Option>
                            <Option value="Paying Guest">Paying Guest</Option>
                            <Option value="Hostel">Hostel</Option>
                            <Option value="Company Provided">
                              Company Provided
                            </Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Staying at Current Residence Since
                      </div>
                      {editAddressInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.scrs ? data.scrs : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={
                            scrs ? moment(scrs, "DD-MM-YYYY") : null
                          }
                          name="scrs"
                          onKeyPress={(event) => {
                            if (checkNoAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                        >
                          <DatePicker
                            format={"DD-MM-YYYY"}
                            disabledDate={disabledScrs}
                            onChange={(e) => {
                              setScrs(e?.format("DD-MM-YYYY") || "");
                            }}
                            style={{
                              backgroundColor: "#ffffff",
                              marginTop: "10px",
                              width: "100%",
                              border: "none",
                              borderBottom: "1px solid #ccc",
                              borderRadius: 0,
                              padding: "5px 15px",
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Living in Current City Since
                      </div>
                      {editAddressInfo === false ? (
                        <div style={{ marginTop: "7px" }}>
                          {data?.lccs ? data.lccs : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={
                            lccs ? moment(lccs, "DD-MM-YYYY") : null
                          }
                          name="lccs"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          <DatePicker
                            format={"DD-MM-YYYY"}
                            disabledDate={disabledLccs}
                            onChange={(e) => {
                              setLccs(e?.format("DD-MM-YYYY") || "");
                            }}
                            style={{
                              backgroundColor: "#ffffff",
                              marginTop: "10px",
                              width: "100%",
                              border: "none",
                              borderBottom: "1px solid #ccc",
                              borderRadius: 0,
                              padding: "5px 15px",
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                {editAddressInfo === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() => showEditAddressInfo(false)}
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined />
                      CANCEL
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{
                        marginLeft: "10px",
                        background: "#1963a6",
                        width: "90px",
                      }}
                    >
                      <CheckOutlined />
                      SAVE
                    </Button>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Personal;
