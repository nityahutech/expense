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
import "../../style/BankAccount.css";
import moment from "moment";
import { capitalize, getBase64, getCountryCode } from "../../contexts/CreateContext";
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
  const [codes, setCodes] = useState("");
  const [lccs, setLccs] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState([]);
  console.log(data);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
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
      profilePic: imageUrl || data.profilePic || null,
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record, fileName);
    const timer = setTimeout(() => {
      3();
    }, 5000);
    showEditContent(false);
    return () => {
      clearTimeout(timer);
    };
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
      // setLoading(false);
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  const onContactFinish = (values) => {
    let record = {
      ...values,
      profilePic: data.profilePic || null,
      altPhnNo: values.altPhnNo ? values.altPhnNo : "",
    };
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    //  setData(values)
    getData();
    showEditContactInfo(false);
  };
  // const [addressdata, setAddressData] = useState([]);
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
  getCountryCode().then((res)=>{
  setCodes(res);
})
    getData();
  }, []);

  useEffect(() => {
    setIsBigFile(false);
  });

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log("storage", data);
    setData(data);
    setFileName(data.profilePic);
    setImageUrl(data.profilePic);
    setDob(data?.dob ? data.dob : null);
    setLccs(data?.lccs ? data.lccs : null);
    setScrs(data?.scrs ? data.scrs : null);
  };

  const handleOnChange=(value,event)=>{
    console.log(value,event);
  }

  const prefixSelector = (
    <Form.Item  name="prefix" noStyle>
      <Select
      showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}

        onSelect={(value, event) => handleOnChange(value, event)}


      >
      { codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
    ) }
        
      </Select>
    </Form.Item>
  );

  const prefixSelector2 = (
    <Form.Item  name="prefix2" noStyle>
      <Select
      showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}

        onSelect={(value, event) => handleOnChange(value, event)}


      >
      { codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
    ) }
        
      </Select>
    </Form.Item>
  );
  
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
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };
  const layoutGender = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 12 },
      md: { span: 6 },
      lg: { span: 10 },
      xl: { span: 10 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 24 },
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
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };
  const layoutMaritalStatus = {
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
      md: { span: 24 },
      lg: { span: 24 },
      xl: { span: 24 },
    },
  };

  const imgDiv = () => {
    if (fileName == "" || fileName == null) {
      return editContent == false ? (
        <div
          style={{
            width: "150px",
            height: "170px",
            border: "1px solid #05445e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          No Image
        </div>
      ) : (
        <Button
          style={{
            width: "150px",
            height: "170px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
          onClick={(e) => handleClick(e)}
        >
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
          <UploadOutlined /> Upload Photo
        </Button>
      );
    } else {
      return (
        <div
          className={editContent === true ? "hoverImgCont" : null}
          style={{ position: "relative" }}
        >
          <img
            src={imageUrl}
            style={{
              width: "150px",
              height: "170px",
              border: "1px solid #05445e",
            }}
          />
          {editContent === true ? (
            <div className="overlay">
              <DeleteOutlined className="hoverIcon" onClick={onReset} />
            </div>
          ) : null}
        </div>
      );
    }
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
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
                className="personal"
                hoverable={true}
                bordered={true}
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col
                    xs={24}
                    sm={24}
                    md={7}
                    lg={6}
                    xl={6}
                    xxl={6}
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "center",
                      flexDirection: "column",
                    }}
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
                            // display: "flex",
                            // alignItems: 'flex-start',

                            // justifyContent: "flex-start",
                            // flexDirection: "column",
                          }}
                        >
                          <div
                            style={{
                              fontWeight: "lighter",
                              fontSize: "27px",
                              // marginTop:"-12px",
                              color: "black",
                            }}
                          >
                            {data ? data.name : "-"}
                            <Button
                              className="personal"
                              type="text"
                              style={{
                                color: "black",
                                display: "none",
                                paddingLeft: "5px",
                                position: "absolute",
                                right: 1,
                                top: 1,
                              }}
                              onClick={() => showEditContent(!editContent)}
                            >
                              <EditFilled />
                            </Button>
                            <Divider
                              style={{
                                borderTop: "1.5px solid #05445e",
                                marginTop: "0px",
                                marginBottom: "15px",
                              }}
                            />
                          </div>
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
                                    {editContent === false ? (
                                      <div>{data?.dob ? data.dob : "-"}</div>
                                    ) : (
                                      <Form.Item
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
                                      >
                                        {/* format={dateFormatList} */}
                                        <DatePicker
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                          }}
                                          // format={dateFormatList}
                                          // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                                          onChange={(e) => {
                                            setDob(e.format("DD-MM-YYYY"));
                                          }}
                                          //  disabledDate={disabledDate}
                                          value={dob}
                                          placeholder="Choose Date"
                                        />
                                      </Form.Item>
                                    )}
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
                                    {editContent === false ? (
                                      <div>{data ? data.gender : null}</div>
                                    ) : (
                                      <Form.Item
                                        name="gender"
                                        initialValue={
                                          data.gender ? data.gender : "-"
                                        }
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please Choose Gender",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select a Gender"
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                            paddingLeft: "0px",
                                          }}
                                          bordered={false}
                                        >
                                          <Option value="Male">Male</Option>
                                          <Option value="Female">Female</Option>
                                        </Select>
                                      </Form.Item>
                                    )}
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
                                    {editContent === false ? (
                                      <div>
                                        {data?.bloodGroup
                                          ? data.bloodGroup
                                          : "-"}
                                      </div>
                                    ) : (
                                      <Form.Item
                                        initialValue={
                                          data ? data.bloodGroup : null
                                        }
                                        name="bloodGroup"
                                        rules={[
                                          {
                                            required: false,
                                            message:
                                              "Please Choose Blood Groop",
                                          },
                                        ]}
                                      >
                                        <Select
                                          placeholder="Select a Blood Group"
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                            paddingLeft: "0px",
                                          }}
                                          bordered={false}
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
                                    )}
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
                                    {editContent === false ? (
                                      <div>
                                        {data?.maritalStatus
                                          ? data.maritalStatus
                                          : "-"}
                                      </div>
                                    ) : (
                                      <Form.Item
                                        initialValue={
                                          data ? data.maritalStatus : null
                                        }
                                        name="maritalStatus"
                                        rules={[
                                          {
                                            required: false,
                                            message: "Your Marrige Status",
                                          },
                                        ]}
                                      >
                                        <Select
                                          style={{
                                            marginTop: "10px",
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                            paddingLeft: "0px",
                                          }}
                                          bordered={false}
                                        >
                                          <Option value="Single">Single</Option>
                                          <Option value="Married">
                                            Married
                                          </Option>
                                        </Select>
                                      </Form.Item>
                                    )}
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
                              rules={[
                                {
                                  required: true,
                                  minLength: 3,
                                  maxLength: 50,
                                  // message: "Please enter First Name",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please enter Valid Name",
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
                                // disabled={true}
                                initialValue={data.name ? data.name : null}
                                maxLength={50}
                                required
                                placeholder="Enter Your Name"
                                onChange={(e) => {
                                  const inputval = e.target.value;
                                  const str = e.target.value;
                                  const newVal =
                                    inputval.substring(0, 1).toUpperCase() +
                                    inputval.substring(1);
                                  const caps = str
                                    .split(" ")
                                    .map(capitalize)
                                    .join(" ");
                                  form.setFieldsValue({
                                    name: newVal,
                                    name: caps,
                                  });
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
                            >
                              {/* format={dateFormatList} */}
                              <DatePicker
                                style={{
                                  // borderBottom: "1px solid #ccc ",
                                  width: "100%",
                                }}
                                // format={dateFormatList}
                                // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                                onChange={(e) => {
                                  setDob(e.format("DD-MM-YYYY"));
                                }}
                                //  disabledDate={disabledDate}
                                value={dob}
                                placeholder="Choose Date"
                                // bordered={false}
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
                                  // width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                              >
                                <Option value="Male">Male</Option>
                                <Option value="Female">Female</Option>
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
                                  // width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
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
                      onClick={() => showEditContent(false)}
                      type="text"
                      style={{
                        fontSize: "14px",
                        // color: "#1963A6",
                        // marginRight: "10px",
                        // border: "1px solid #1963A6",
                        // width: "90px",
                      }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>

                    <Col>
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
                    </Col>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            <Form
              // form={form}
              labelcol={{
                span: 4,
              }}
              wrappercol={{
                span: 14,
              }}s
              initialValues={{
                remember: true,
                "prefix2":"+91",
                "prefix":"+91"

              }}
              autoComplete="off"
              onFinish={onContactFinish}
            >
              <Card
                title="CONTACT INFO"
                className="personal"
                bordered={true}
                hoverable={true}
                //   actions={[
                //   <EditOutlined key="edit" />,
                // ]}
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
                        <div>{data?.mailid ? data.mailid : "-"}</div>
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
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
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
                        <div>
                          {data?.contactEmail ? data.contactEmail : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.contactEmail : null}
                          name="contactEmail"
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
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
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
                        <div>
                          {data?.phonenumber
                          ?`${data.prefix} ${data.phonenumber}`
                          : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.phonenumber : null}
                          className="numder-inputs"
                          name="phonenumber"
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
                            addonBefore={prefixSelector}
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
                        <div>
                          {data?.altPhnNo
                            ?  `${data.prefix2} ${data.altPhnNo}` 
                            : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.altPhnNo : null}
                          className="numder-inputs"
                          name="altPhnNo"
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
                            addonBefore={prefixSelector2}
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
                    <Col>
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
                    </Col>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            <Form
              // form={form}
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
                className="personal"
                hoverable={true}
                bordered={true}
                extra={
                  <>
                    {editAddressInfo === false ? (
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
                        <div>{data?.currentAdd ? data.currentAdd : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.currentAdd : null}
                          name="currentAdd"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{5,100}$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            autoSize={{ minRows: 3, maxRows: 5 }}
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
                        <div>
                          {data?.permanentAdd ? data.permanentAdd : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.permanentAdd : null}
                          name="permanentAdd"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^[a-zA-Z\s]*$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            autoSize={{ minRows: 3, maxRows: 5 }}
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
                        <div>{data?.houseType ? data.houseType : "-"}</div>
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
                            placeholder="Select Your HouseType"
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              padding: "2px",
                            }}
                            bordered={false}
                          >
                            <Option value="House Type">House Type</Option>
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
                        <div>{data?.scrs ? data.scrs : "-"}</div>
                      ) : (
                        <Form.Item
                          // name="dob"
                          initialValue={
                            scrs ? moment(scrs, "DD-MM-YYYY") : null
                          }
                          name="scrs"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          <DatePicker
                            // format={dateFormatList}
                            // defaultValue= {scrs?moment(scrs, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setScrs(e.format("DD-MM-YYYY"));
                            }}
                            style={{ width: "100%", marginTop: "10px" }}
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
                        <div>{data?.lccs ? data.lccs : "-"}</div>
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
                            // format={dateFormatList}
                            // defaultValue= {lccs?moment(lccs, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setLccs(e.format("DD-MM-YYYY"));
                            }}
                            style={{ width: "100%", marginTop: "10px" }}
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
                    <Col>
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
                    </Col>
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
