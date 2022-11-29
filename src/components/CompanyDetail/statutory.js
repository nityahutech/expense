import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Form,
  Modal,
  Tabs,
  Table,
  Divider,
} from "antd";
import {
  CloseOutlined,
  EditFilled,
  CheckOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";
import CompanyProContext from "../../contexts/CompanyProContext";
import "../../components/CompanyDetail/companystyle.css";
import moment from "moment";

const { TextArea } = Input;
const compId = sessionStorage.getItem("compId");

const Statutory = () => {
  const [editContent, showEditContent] = useState(false);
  const [editCompanyID, showeditCompanyID] = useState(false);
  const [editBai, setEditBAI] = useState(false);
  const [baiList, setBAIList] = useState([]);
  const [form3] = Form.useForm();
  const [editDirectors, showEditDirectors] = useState(false);
  const [directorList, setDirectorList] = useState([]);
  const [form] = Form.useForm();
  const [editAuditor, setEditAuditor] = useState(false);
  const [auditorList, setAuditorList] = useState([]);
  const [form1] = Form.useForm();
  const [editCS, setEditCS] = useState(false);
  const [cSList, setCSList] = useState([]);
  const [form2] = Form.useForm();
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState([]);
  const onFinish = (value) => {
    const valuesToservice = {
      entityType: value.entityType,
      cinNumber: value.cinNumber,
      dateOfIncorp: value.dateOfIncorp.format("Do MMM, YYYY"),
      compPan: value.compPan,
      compTan: value.compTan,
      gst: value.gst,
    };

    CompanyProContext.updateCompInfo(compId, valuesToservice);
    getData();
    showEditContent(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
    setDirectorList(data.director);
    setAuditorList(data.auditor);
    setCSList(data.secretary);
    setBAIList(data.bank);
  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };
  function addDirector(values) {
    const record = {
      directorName: values.directorName,
      directoremailid: values.directoremailid,
      directordin: values.directordin,
      directorphone: values.directorphone,
    };
    CompanyProContext.addCompInfo(compId, { director: record });
    form.resetFields();
    getData();
    showEditDirectors(false);
  }

  const onDeleteDirector = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Director?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { director: record })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
  };

  function addAuditor(values) {
    let record1 = {
      auditorName: values.auditorName,
      auditormailid: values.auditormailid,
      auditortype: values.auditortype,
      auditorphone: values.auditorphone,
    };
    CompanyProContext.addCompInfo(compId, { auditor: record1 });
    form1.resetFields();
    getData();
    setEditAuditor(false);
  }

  const onDeleteAuditor = (record1) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Auditor?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { auditor: record1 })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
  };

     function addCS(values) {
    let record2 = {
      secName: values.secName,
      secmailid: values.secmailid,
      secphone: values.secphone,
    };
    CompanyProContext.addCompInfo(compId, { secretary: record2 });
    form2.resetFields();
    getData();
    setEditCS(false);
  }
  const onDeleteSecretary = (record2) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Secretary?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { secretary: record2 })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
  };
  
  function addBAI(values) {
    let record3 = {
      baiaccountitle: values.baiaccountitle,
      baiifsccode: values.baiifsccode,
      baiaccounttype: values.baiaccounttype,
      baibankname: values.baibankname,
      baicity: values.baicity,
      baibranchname: values.baibranchname,
      baiaccountnumber: values.baiaccountnumber,
    };
    CompanyProContext.addCompInfo(compId, { bank: record3 });
    form3.resetFields();
    getData();
    setEditBAI(false);
  }
  const onDeleteBank = (record3) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Bank Account?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { bank: record3 })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
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
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Col span={24} >
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
              onFinish={onFinish}
            >
              <Card
                title=" COMPANY ID"
                bordered={true}
                hoverable={true}
                style={{
                  width: '100%',
                  marginTop: 10,
                  borderRadius:"10px",
                  cursor:'default'
                }}
                className="companyCard"
                // className="card1"
                extra={
                  <>
                    {editContent === false ? (
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
                        onClick={() => showEditContent(!editContent)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
              >
                <Row gutter={[16,16]}>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Entity Type</div>
                      {editContent === false ? (
                        <div>{data.entityType ? data.entityType : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.entityType : null}
                          name="entityType"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Company Name",
                              type: "name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Company Name",
                            },
                          ]}
                        >
                          <Input
                            type="CompamyName"
                            required
                            placeholder="Enter Comapany Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">CIN</div>
                      {editContent === false ? (
                        <div>{data.cinNumber ? data.cinNumber : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.cinNumber : null}
                          name="cinNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Brand Name",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Brand Name",
                            },
                          ]}
                        >
                          <Input
                            type="cinNumber"
                            maxLength={21}
                            required
                            placeholder="Enter CIN Number"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Date of Incorporation</div>
                      {editContent === false ? (
                        <div>{data.dateOfIncorp ? data.dateOfIncorp : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? moment(data.dateOfIncorp, "Do MMM, YYYY") : null}
                          name="dateOfIncorp"
                          rules={[
                            {
                              required: false,
                              message: "Please select date",
                            },
                          ]}
                        >
                          {/* <Input
                            type="D.O.I"
                            required
                            placeholder="Enter D.O.I"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          /> */}

                          <DatePicker
                            format="Do MMM, YYYY"
                            required
                            placeholder="Enter D.O.I"
                            bordered={true}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }} />

                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Company PAN</div>
                      {editContent === false ? (
                        <div>{data.compPan ? data.compPan : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.compPan : null}
                          name="compPan"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Company PAN",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Company PAN",
                            },
                          ]}
                        >
                          <Input
                            maxlength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Company TAN</div>
                      {editContent === false ? (
                        <div>{data.compTan ? data.compTan : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.compTan : null}
                          name="compTan"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Domain Name",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Domain Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">GST</div>
                      {editContent === false ? (
                        <div>{data.gst ? data.gst : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.gst : null}
                          name="gst"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Domain Name",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Domain Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
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
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditContent(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "10px" }}
                      >
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
          style={{
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <Col span={24}>
            <Card 
              className="tagsCard" 
              bordered={true}
              hoverable={true}
              style={{ 
                marginTop: 10, 
                width: "100%",
                borderRadius:"10px",
                cursor:'default' 
                }}
              >
              <Tabs defaultActiveKey="1" className="tabs">
                <Tabs.TabPane tab="Directors" key="1">
                  <Form
                    wrappercol={{
                      span: 14,
                    }}
                    labelcol={{
                      span: 4,
                    }}
                    layout="vertical"
                    onFinish={addDirector}
                    form={form}
                  >
                    {/* <Card className="tabcard1" title="Directors" bordered={false}> */}
                      {directorList.map((u, i) => (
                        <div>
                          <Row gutter={[20, 8]}>
                            <Col xs={22} sm={15} md={6}>
                              <label>Name</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.directorName}
                              />
                            </Col>
                            <Col xs={22} sm={15} md={8}>
                              <label>Email ID</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.directoremailid}
                              />
                            </Col>
                            <Col xs={22} sm={15} md={4}>
                              <label>DIN</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.directordin}
                              />
                            </Col>
                            <Col xs={22} sm={15} md={5}>
                              <label>Phone Number</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.directorphone}
                              />
                            </Col>
                            <Col
                              xs={22}
                              sm={15}
                              md={1}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "end",
                              }}
                            >
                              <Button
                                style={{
                                  width: "10px",
                                  border: "none",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                                onClick={() => {
                                  onDeleteDirector(u);
                                }}
                              >
                                <DeleteOutlined />
                              </Button>
                            </Col>
                          </Row>
                          <Divider className="divider" />
                        </div>
                      ))}
                      {editDirectors === false ? (
                        <Button
                          type="primary"
                          onClick={() => showEditDirectors(!editDirectors)}
                          // style={{marginTop:'50px'}}
                        >
                          <PlusCircleOutlined />
                          Add
                        </Button>
                      ) : (
                        <div style={{ marginTop: "50px" }}>
                          <Row gutter={[20, 8]}>
                            <Col xs={22} sm={15} md={6}>
                              <FormItem
                                label="Name"
                                name="directorName"
                                onKeyPress={(event) => {
                                  if (checkAlphabets(event)) {
                                    event.preventDefault();
                                  }
                                }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your name",
                                  },
                                  {
                                    pattern: /^[a-zA-Z\s]*$/,
                                    message: "Please enter Valid Name",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Name"
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                  bordered={false}
                                />
                              </FormItem>
                            </Col>
                            <Col xs={22} sm={15} md={8}>
                              <FormItem
                                name="directoremailid"
                                label="Email ID"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter valid email ID",
                                  },
                                  // {
                                  //   pattern:
                                  //     "/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                                  //   message: "Please Enter Valid Name",
                                  // },
                                ]}
                              >
                                <Input
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                  bordered={false}
                                />
                              </FormItem>
                            </Col>
                            <Col xs={22} sm={15} md={4}>
                              <FormItem
                                name="directordin"
                                label="DIN"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter valid DIN",
                                  },
                                  {
                                    pattern: /^[0-9\s]+$/,
                                    message: "Please enter Valid Number",
                                  },
                                ]}
                              >
                                <Input
                                  maxLength={8}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                  bordered={false}
                                />
                              </FormItem>
                            </Col>
                            <Col xs={22} sm={15} md={6}>
                              <FormItem
                                name="directorphone"
                                label="Phone Number"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your phone no",
                                  },
                                  {
                                    pattern: /^[6-9]\d{9}$/,
                                    message: "Please Enter Valid Number",
                                  },
                                ]}
                              >
                                <Input
                                  maxLength={10}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                  bordered={false}
                                />
                              </FormItem>
                            </Col>
                            <Col
                              span={24}
                              style={{ display: "flex", justifyContent: "flex-end" }}
                            >
                              <FormItem>
                                <Button
                                  type="text"
                                  style={{ marginRight: "1rem" }}
                                  onClick={() => showEditDirectors(false)}
                                >
                                  {" "}
                                  <CloseOutlined />
                                  CANCLE
                                </Button>
                                <Button
                                  type="primary"
                                  htmlType={editDirectors ? "submit" : "button"}
                                  onClick={() => {
                                    if (!editDirectors) {
                                      showEditDirectors(true);
                                    }
                                  }}
                                >
                                  {" "}
                                  <CheckOutlined />
                                  SAVE
                                </Button>
                              </FormItem>
                            </Col>
                          </Row>
                          <Button
                            type="primary"
                            onClick={() => showEditDirectors(!editDirectors)}
                            htmlType="submit"
                          >
                            <PlusCircleOutlined />
                            Add
                          </Button>
                        </div>
                      )}
                    {/* </Card> */}
                  </Form>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Auditors" key="2">
                      {/* <Card title="Auditors" bordered={false}> */}
                        <Row>
                          <Col xs={24} sm={24} md={24}>
                            <Form
                              wrappercol={{
                                span: 14,
                              }}
                              labelcol={{
                                span: 4,
                              }}
                              layout="vertical"
                              onFinish={addAuditor}
                              form={form1}
                            >
                              {auditorList.map((u, i) => (
                                <div>
                                  <Row gutter={[20, 8]}>
                                    <Col xs={22} sm={15} md={6}>
                                      <label className="div-discription">Name</label>
                                      <Input
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #ccc ",
                                        }}
                                        bordered={false}
                                        value={u.auditorName}
                                      />
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                      <label className="div-discription">
                                        Email ID
                                      </label>
                                      <Input
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #ccc ",
                                        }}
                                        bordered={false}
                                        value={u.auditormailid}
                                      />
                                    </Col>
                                    <Col xs={22} sm={15} md={4}>
                                      <lable className="div-discription">Type</lable>
                                      <Select
                                        value={u.auditortype}
                                        defaultValue="Type"
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #ccc ",
                                        }}
                                        bordered={false}
                                        options={[
                                          {
                                            value: "Internal",
                                            label: "Internal",
                                          },
                                          {
                                            value: "Statutory",
                                            label: "Statutory",
                                          },
                                        ]}
                                      />
                                    </Col>
                                    <Col xs={22} sm={15} md={5}>
                                      <lable className="div-discription">
                                        Phone Number
                                      </lable>
                                      <Input
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #ccc ",
                                        }}
                                        bordered={false}
                                        value={u.auditorphone}
                                      />
                                    </Col>
                                    <Col
                                      xs={22}
                                      sm={15}
                                      md={1}
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "end",
                                      }}
                                    >
                                      <Button
                                        style={{
                                          width: "10px",
                                          border: "none",
                                          display: "flex",
                                          justifyContent: "center",
                                          alignItems: "end",
                                        }}
                                        onClick={() => {
                                          onDeleteAuditor(u);
                                        }}
                                      >
                                        <DeleteOutlined />
                                      </Button>
                                    </Col>
                                  </Row>
                                  <Divider className="divider" />
                                </div>
                              ))}
                              {editAuditor === false ? (
                                <Button
                                  type="primary"
                                  onClick={() => setEditAuditor(!editAuditor)}
                                >
                                  <PlusCircleOutlined />
                                  Add
                                </Button>
                              ) : (
                                <div>
                                  <Row gutter={[20, 8]}>
                                    <Col xs={22} sm={15} md={6}>
                                      <FormItem
                                        label="Name"
                                        name="auditorName"
                                        style={{
                                          fontWeight: 600,
                                          lineHeight: "18px",
                                          color: "#07182b",
                                          fontSize: "14px",
                                          fontFamily: "Open Sans,sans-serif",
                                        }}
                                        onKeyPress={(event) => {
                                          if (checkAlphabets(event)) {
                                            event.preventDefault();
                                          }
                                        }}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter your name",
                                            pattern: /^[a-zA-Z\s]*$/,
                                          },
                                          {
                                            pattern: /^[a-zA-Z\s]*$/,
                                            message: "Please enter Valid Name",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Name"
                                          bordered={false}
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                          }}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col xs={22} sm={15} md={8}>
                                      <FormItem
                                        name="auditormailid"
                                        label="Email ID"
                                        style={{
                                          fontWeight: 600,
                                          lineHeight: "18px",
                                          color: "#07182b",
                                          fontSize: "14px",
                                          fontFamily: "Open Sans,sans-serif",
                                        }}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter valid email ID",
                                          },
                                          // {
                                          //   pattern:
                                          //     "/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                                          //   message: "Please Enter Valid Name",
                                          // },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Email ID"
                                          bordered={false}
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                          }}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col xs={22} sm={15} md={4}>
                                      <FormItem
                                        name="auditortype"
                                        label="Type"
                                        style={{
                                          fontWeight: 600,
                                          lineHeight: "18px",
                                          color: "#07182b",
                                          fontSize: "14px",
                                          fontFamily: "Open Sans,sans-serif",
                                        }}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter type",
                                          },
                                        ]}
                                      >
                                        <Select
                                          defaultValue="Type"
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                          }}
                                          bordered={false}
                                          options={[
                                            {
                                              value: "Internal",
                                              label: "Internal",
                                            },
                                            {
                                              value: "Statutory",
                                              label: "Statutory",
                                            },
                                          ]}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col xs={22} sm={15} md={6}>
                                      <FormItem
                                        name="auditorphone"
                                        label="Phone Number"
                                        style={{
                                          fontWeight: 600,
                                          lineHeight: "18px",
                                          color: "#07182b",
                                          fontSize: "14px",
                                          fontFamily: "Open Sans,sans-serif",
                                        }}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Please enter your phone no",
                                          },
                                          {
                                            pattern: /^[0-9\b]+$/,
                                            message: "Please Enter Valid Number",
                                          },
                                        ]}
                                      >
                                        <Input
                                          name="Phone Number"
                                          bordered={false}
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                          }}
                                          maxLength={10}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col
                                      span={24}
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                      }}
                                    >
                                      <FormItem>
                                        <Button
                                          type="text"
                                          style={{ marginRight: "1rem" }}
                                          onClick={() => setEditAuditor(false)}
                                        >
                                          {" "}
                                          <CloseOutlined />
                                          CANCLE
                                        </Button>
                                        <Button type="primary" htmlType="submit">
                                          {" "}
                                          <CheckOutlined />
                                          SAVE
                                        </Button>
                                      </FormItem>
                                    </Col>
                                  </Row>

                                  <Button
                                    type="primary"
                                    onClick={() => setEditAuditor(!editAuditor)}
                                    htmlType="submit"
                                  >
                                    <PlusCircleOutlined />
                                    Add
                                  </Button>
                                </div>
                              )}
                            </Form>
                          </Col>
                        </Row>
                      {/* </Card> */}
                </Tabs.TabPane>
                <Tabs.TabPane tab="Company Secretary" key="3">
                  {/* <Card title="Company Secretary" bordered={false}> */}
                    <Form
                      wrappercol={{
                        span: 14,
                      }}
                      labelcol={{
                        span: 4,
                      }}
                      layout="vertical"
                      onFinish={addCS}
                      form={form2}
                    >
                      {cSList.map((u, i) => (
                        <div>
                          <Row gutter={[20, 8]}>
                            <Col xs={22} sm={15} md={6}>
                              <label>Name</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.secName}
                              />
                            </Col>
                            <Col xs={22} sm={15} md={10}>
                              <label>Email ID</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.secmailid}
                              />
                            </Col>
                            <Col xs={22} sm={15} md={6}>
                              <label>Phone Number</label>
                              <Input
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                                value={u.secphone}
                              />
                            </Col>
                            <Col
                              xs={22}
                              sm={15}
                              md={2}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "end",
                              }}
                            >
                              <Button
                                style={{
                                  width: "10px",
                                  border: "none",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "end",
                                }}
                                onClick={() => {
                                  onDeleteSecretary(u);
                                }}
                              >
                                <DeleteOutlined />
                              </Button>
                            </Col>
                          </Row>
                          <Divider />
                        </div>
                      ))}
                      {editCS === false ? (
                        <Button type="primary" onClick={() => setEditCS(!editCS)}>
                          <PlusCircleOutlined />
                          Add
                        </Button>
                      ) : (
                        <div>
                          <Row gutter={[20, 8]}>
                            <Col xs={22} sm={15} md={8}>
                              <FormItem
                                label="Name"
                                name="secName"
                                onKeyPress={(event) => {
                                  if (checkAlphabets(event)) {
                                    event.preventDefault();
                                  }
                                }}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your name",
                                    pattern: /^[a-zA-Z\s]*$/,
                                  },
                                  {
                                    pattern: /^[a-zA-Z\s]*$/,
                                    message: "Please enter Valid Name",
                                  },
                                ]}
                              >
                                <Input
                                  placeholder="Name"
                                  bordered={false}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                />
                              </FormItem>
                            </Col>
                            <Col xs={22} sm={15} md={8}>
                              <FormItem
                                name="secmailid"
                                label="Email ID"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter valid email ID",
                                  },
                                  // {
                                  //   pattern:
                                  //     "/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                                  //   message: "Please Enter Valid Name",
                                  // },
                                ]}
                              >
                                <Input
                                  placeholder="Email ID"
                                  bordered={false}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                />
                              </FormItem>
                            </Col>
                            <Col xs={22} sm={15} md={8}>
                              <FormItem
                                name="secphone"
                                label="Phone Number"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please enter your phone no",
                                  },
                                  {
                                    pattern: /^[6-9]\d{9}$/,
                                    message: "Please Enter Valid Number",
                                  },
                                ]}
                              >
                                <Input
                                  name="Phone Number"
                                  bordered={false}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                  maxLength={10}
                                  placeholder="Phone Number"
                                />
                              </FormItem>
                            </Col>
                            <Col
                              span={24}
                              style={{ display: "flex", justifyContent: "flex-end" }}
                            >
                              <FormItem>
                                <Button
                                  type="text"
                                  style={{ marginRight: "1rem" }}
                                  onClick={() => setEditCS(false)}
                                >
                                  {" "}
                                  <CloseOutlined />
                                  CANCLE
                                </Button>
                                <Button type="primary" htmlType="submit">
                                  {" "}
                                  <CheckOutlined />
                                  SAVE
                                </Button>
                              </FormItem>
                            </Col>
                          </Row>
                          <Button type="primary" onClick={() => setEditCS(!editCS)}>
                            <PlusCircleOutlined />
                            Add
                          </Button>
                        </div>
                      )}
                    </Form>
                  {/* </Card> */}
                </Tabs.TabPane>
              </Tabs>
            </Card>
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
        style={{
          width: '75%',
          margin: '10px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Col span={24}>
          <Card
            title="BANK ACCOUNT INFO"
            bordered={true}
            hoverable={true}
            style={{
              width: '100%',
              marginTop: 10,
              borderRadius:"10px",
              cursor:'default'
            }}
            className="baiCard"
          >
            <Form
              wrappercol={{
                span: 14,
              }}
              labelcol={{
                span: 4,
              }}
              layout="vertical"
              onFinish={addBAI}
              form={form3}
            >
              {baiList.map((u, i) => (
                <>
                  {/* <div>
                    <Row>
                      <Col xs={22} sm={15} md={22}>
                        <Row gutter={[16, 48]}>
                          <Col xs={22} sm={15} md={24}>
                            <label>Account Title</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baiaccountitle}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <label>Bank Name</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baibankname}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <label>City</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baicity}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <label>Branch Name</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baibranchname}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <label>IFSC Code</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baiifsccode}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <lable>Type</lable>
                            <Select
                              value={u.baiaccounttype}
                              defaultValue="Account Type"
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              onChange={handleChange}
                              options={[
                                {
                                  value: "Account Type",
                                  label: "Account Type",
                                },
                                {
                                  value: "Current Account",
                                  label: "Current Account",
                                },
                                {
                                  value: "Fixed Deposit",
                                  label: "Fixed Deposit",
                                },
                              ]}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <label>Account Number</label>
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              value={u.baiaccountnumber}
                            />
                          </Col>                 
                        </Row>
                      </Col>
                      <Col xs={22} sm={15} md={2}
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Button
                              style={{
                                width: "10px",
                                border: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "end",
                              }}
                              onClick={() => {
                                onDeleteBank(u);
                              }}
                            >
                              <DeleteOutlined />
                            </Button>  
                      </Col>
                    </Row>
                    <Divider />
                  </div> */}
                  
                  <Divider />
                  <Row>
                    <Col xs={22} sm={15} md={22}>
                      <Row>
                        <Col span={24}><h2>{u.baiaccountitle} </h2></Col>
                        <Col span={24}>Bank Name : {u.baibankname}</Col>
                        <Col span={24}>City : {u.baicity}</Col>
                        <Col span={24}>Branch Name : {u.baibranchname}</Col>
                        <Col span={24}>IFSC Code : {u.baiifsccode}</Col>
                        <Col span={24}>Account Type : {u.baiaccounttype}</Col>
                        <Col span={24}>Account Number : {u.baiaccountnumber}</Col>
                      </Row>
                    </Col>
                    <Col xs={2} sm={2} md={2} style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "start",
                            }}>
                      <Button
                              style={{
                                width: "10px",
                                border: "none",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "end",
                              }}
                              onClick={() => {
                                onDeleteBank(u);
                              }}
                            >
                              <DeleteOutlined />
                      </Button>          
                    </Col>
                  </Row>
                  <Divider />
                </>
              ))}

              {editBai === false ? (
                <Button type="primary" onClick={() => setEditBAI(!editBai)}>
                  <PlusCircleOutlined />
                  Add
                </Button>
              ) : (
                <div>
                  <Row gutter={[16, 48]}>
                    <Col xs={22} sm={15} md={24}>
                      <FormItem
                        label="Account Title"
                        name="baiaccountitle"
                        rules={[
                          {
                            pattern: /^[a-zA-Z-0-9\s]*$/,
                            required: true,
                            message: "Please enter account title",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Account Title"
                          bordered={false}
                          maxLength={25}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="Bank Name"
                        name="baibankname"
                        rules={[
                          {
                            pattern: /^[a-zA-Z\s]*$/,
                            required: true,
                            message: "Please enter bank name",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Bank Name"
                          bordered={false}
                          maxLength={25}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="City"
                        name="baicity"
                        rules={[
                          {
                            pattern: /^[a-zA-Z\s]*$/,
                            required: true,
                            message: "Please enter city",
                          },
                        ]}
                      >
                        <Input
                          placeholder="City"
                          bordered={false}
                          maxLength={25}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="Branch Name"
                        name="baibranchname"
                        rules={[
                          {
                            pattern: /^[a-zA-Z\s]*$/,
                            required: true,
                            message: "Please enter branch name",
                          },
                        ]}
                      >
                        <Input
                          placeholder="Branch Name"
                          bordered={false}
                          maxLength={25}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="IFSC Code"
                        name="baiifsccode"
                        rules={[
                          {
                            pattern: /^[A-Z0-9\s]*$/,
                            required: true,
                            message: "Please enter the IFSC code",
                          },
                        ]}
                      >
                        <Input
                          maxLength={11}
                          placeholder="IFSC Code"
                          bordered={false}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="Account Type"
                        name="baiaccounttype"
                        rules={[
                          {
                            required: true,
                            message: "Please select account type",
                          },
                        ]}
                      >
                        <Select
                          defaultValue="Account Type"
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                          bordered={false}
                          options={[
                            {
                              value: "Account Type",
                              label: "Account Type",
                            },
                            {
                              value: "Current Account",
                              label: "Current Account",
                            },
                            {
                              value: "Fixed Deposit",
                              label: "Fixed Deposit",
                            },
                            {
                              value: "Salary Account",
                              label: "Salary Account",
                            },
                          ]}
                        />
                      </FormItem>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <FormItem
                        label="Account Number"
                        name="baiaccountnumber"
                        rules={[
                          {
                            pattern: /^[0-9\b]+$/,
                            required: true,
                            message: "Please enter account number",
                          },
                        ]}
                      >
                        <Input
                          maxLength={14}
                          placeholder="Account Number"
                          bordered={false}
                          style={{
                            width: "100%",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                            marginTop: "10px",
                          }}
                        />
                      </FormItem>
                    </Col>
                    <Col
                      xs={22} sm={15} md={24}
                      style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                      <FormItem>
                        <Button
                          type="text"
                          style={{ marginRight: "1rem" }}
                          onClick={() => setEditBAI(false)}
                        >
                          {" "}
                          <CloseOutlined />
                          CANCLE
                        </Button>
                        <Button type="primary" htmlType="submit">
                          {" "}
                          <CheckOutlined />
                          SAVE
                        </Button>
                      </FormItem>
                    </Col>
                  </Row>
                </div>
              )}
            </Form>
          </Card>
        </Col>
      </Row>
      </div>

    </>
  );
};

export default Statutory;
