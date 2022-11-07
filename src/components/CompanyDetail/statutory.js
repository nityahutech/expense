import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form, Tabs, Table, Divider } from "antd";
import { CloseOutlined, EditFilled, CheckOutlined, SearchOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";


const { TextArea } = Input;
const { Option } = Select;


const Statutory = () => {

  const [editContent, showEditContent] = useState(false);
  // -----------------------------------------------------states for company ID
  const [editCompanyID, showeditCompanyID] = useState(false);

  // ------------------------------------------------------states for Bank Info
  const [editBAI, setEditBAI] = useState(false);
  const [bIAList, setBIAList] = useState(false);

  // -------------------------------------------------------states for Director tag
  const [editDirectors, showEditDirectors] = useState(false);
  const [directorList, setDirectorList] = useState([]);
  const [form] = Form.useForm();

  // --------------------------------------------------------states for Auditor tag
  const [editAuditor, setEditAuditor] = useState(false);
  const [auditorList, setAuditorList] = useState([]);
  const [form1] = Form.useForm();

  // --------------------------------------------------------states for Company Secretary
  const [editCS, setEditCS] = useState(false);
  const [cSList, setCSList] = useState([]);
  const [form2] = Form.useForm();

  
  const [dob, setDob] = useState("");
  const [scrs, setScrs] = useState("");
  const [lccs, setLccs] = useState("");
 
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  // const [cancelEditContent, setcancelEditContent] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const onFinish = (value) => {
    let nameArray = value.name.split(" ");
    let fname = "";
    for (let i = 0; i < nameArray.length - 1; i++) {
      fname = i != 0 ? " " + fname + nameArray[i] : fname + nameArray[i];
    }
    let record = {
      ...value,
      lname: nameArray[nameArray.length - 1],
      fname: fname,
      dob: dob ? dob : null,
    };
    delete record["name"];
    
    getData();
    showEditContent(false);
  };
  
  const onContactFinish = (values) => {
   
    getData();
    showeditCompanyID(false);
  };
  
  const getData = async () => {
    // let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setData(data);
    setDob(data.dob ? data.dob : null);
    setLccs(data.lccs ? data.lccs : null);
    setScrs(data.scrs ? data.scrs : null);
  };
  


  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };


  // ------------------------------------function for addDirector
  function addDirector (values) {
    console.log(values);
    setDirectorList([...directorList,values])
    showEditDirectors(false)
    form.resetFields();
  }

  //-------------------------------------function for deleting data entered in the director tab
  function deleteDirector (deldir) {
    console.log(deldir);
    const filterDirectorData = directorList.filter(
      (item) => item.directoremailid !== deldir.directoremailid
    );
    setDirectorList(filterDirectorData);
  }

  // -----------------------------------function for addAuditor
  function addAuditor (values) {
    console.log(values);
    setAuditorList([...auditorList,values])
    setEditAuditor(false);
    form1.resetFields();
  }

  // ----------------------------------Function for deleting data entered in the auditor tab
  function deleteAuditor (delAudit) {
    console.log(delAudit);
    const filterAuditorData = auditorList.filter(
      (item) => item.auditormailid !== delAudit.auditormailid
    );
    setAuditorList(filterAuditorData);
  }

  // ------------------function for add Company Sacretary
  function addCS (values) {
    console.log(values);
    setCSList([...cSList,values])
    setEditCS(false);
    form2.resetFields();
  }

  // -------------function for deleting data entered in Company Sacretary tab
  function deleteCS (delComp) {
    // console.log(delComp);
    const filterCSData = cSList.filter(
      (item) => item.sacmailid !== delComp.sacmailid
    );
    setCSList(filterCSData);
  }

  return (

    <div
      style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}
    >
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
        onFinish={onContactFinish}
      >
        <Card
          title=" COMPANY ID"
          style={{marginTop:"1rem",width:'800px'}}
          // className="card1"
          extra={
            <>
              {editCompanyID === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showeditCompanyID(!editCompanyID)}
                >
                  <EditFilled />
                </Button>
              ) : null}
            </>
          }
          
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px", }}>
                  Entity Type
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.mailid : null}
                    
                    name="companyName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Company Name",
                        type: "name",
                      },
                      {
                        message: "Please enter Valid Company Name",
                      },
                    ]}
                  >
                    <Input type='CompamyName' required placeholder="Enter Comapany Name"bordered={false}
                   style={{borderBottom: '1px solid #ccc '}} />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  CIN
                </div>
                {editCompanyID === false ? (
                  <div>{data.contactEmail ? data.contactEmail : "-"}</div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.contactEmail : null}
                    name="brandName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Brand Name",
                        type: "email",
                      },
                      {
                        message: "Please enter Valid Brand Name",
                      },
                    ]}
                  >
                    <Input type='brandName' required placeholder="Enter Brand Name" bordered={false}
                   style={{borderBottom: '1px solid #ccc '}}/>
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Date of Incorporation
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.mailid : null}
                    name="websiteName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Website Name",
                        type: "Website",
                      },
                      {
                        message: "Please enter Valid Website Name",
                      },
                    ]}
                  >
                    <Input type='WebsiteName' required placeholder="Enter Website Name" bordered={false}
                   style={{borderBottom: '1px solid #ccc '}} />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "5%", }}>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Company PAN
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.mailid : null}
                    name="domain"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Domain Name",
                        type: "domain",
                      },
                      {
                        message: "Please enter Valid Domain Name",
                      },
                    ]}
                  >
                    <Input type='DomainName' required placeholder="Enter Domain Name" bordered={false}
                   style={{borderBottom: '1px solid #ccc '}} />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Company TAN
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.mailid : null}
                    name="domain"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Domain Name",
                        type: "domain",
                      },
                      {
                        message: "Please enter Valid Domain Name",
                      },
                    ]}
                  >
                    <Input type='DomainName' required placeholder="Enter Domain Name" bordered={false}
                   style={{borderBottom: '1px solid #ccc '}} />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  GST
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.mailid : null}
                    name="domain"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Domain Name",
                        type: "domain",
                      },
                      {
                        message: "Please enter Valid Domain Name",
                      },
                    ]}
                  >
                    <Input type='DomainName' required placeholder="Enter Domain Name" bordered={false}
                   style={{borderBottom: '1px solid #ccc '}} />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

          </Row>
          {editCompanyID === true ? (
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
                onClick={() => showeditCompanyID(false)}
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

        <Card style={{marginTop:"1rem",width:'800px'}}>
          <Tabs defaultActiveKey="1" className='tabs'>
            <Tabs.TabPane tab="Directors" key="1">
                <Card
                className="tabcard1"
                  title="Directors"
                  bordered={false}
                > 
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
                  {/* -----------------------------State of the director list ----------------------------- */}
                {directorList.map((u,i)=>(
                  <div >
                    <Row gutter={[20,8]}>
                      <Col xs={22} sm={15} md={6}>
                        <label>Name</label>
                        <Input
                          style={{
                            width: '100%',
                            borderBottom: '1px solid #ccc ',
                          }}
                          bordered={false}  
                          value={u.directorName} />
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label>Email ID</label>
                        <Input
                          style={{
                            width: '100%',
                            borderBottom: '1px solid #ccc ',
                          }}
                          bordered={false} 
                         value={u.directoremailid} />
                      </Col> 
                      <Col xs={22} sm={15} md={5}>
                        <label>DIN</label>
                        <Input
                        style={{
                          width: '100%',
                          borderBottom: '1px solid #ccc ',
                        }}
                        bordered={false}  
                        value={u.directordin} />
                      </Col>
                      <Col xs={22} sm={15} md={5}>
                        <label>Phone Number</label>
                        <Input
                         style={{
                          width: '100%',
                          borderBottom: '1px solid #ccc ',
                        }}
                        bordered={false} 
                        value={u.directorphone} />
                      </Col>
                      <Col xs={22} sm={15} md={2} 
                        style={{
                          display:'flex', 
                          justifyContent:'center', 
                          alignItems:'end'}}>
                        <Button
                          style={{
                            width:"10px",
                            border:'none',
                            display:"flex",
                            justifyContent:"center",
                            alignItems:"end",
                          }}
                          onClick={() => {
                            deleteDirector(u);
                          }}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Col>         
                    </Row>
                    <Divider className="divider"/>                   
                  </div>                 
              ))}
                {/* -------------------------------state of the director list form---------------- */}
                {editDirectors === false ? (
                  <Button 
                    type="primary"
                    onClick={() => showEditDirectors(!editDirectors)}
                    // style={{marginTop:'50px'}}
                  ><PlusCircleOutlined />Add</Button>
                ):(
                  <div style={{marginTop:'50px'}}>
                   
                      <Row gutter={[20,8]}>
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
                                message: 'Please enter your name',
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
                              width: '100%',
                              borderBottom: '1px solid #ccc ',
                            }}
                            bordered={false} 
                            />
                          </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                          <FormItem
                            name="directoremailid"
                            label="Email ID"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter valid email ID',
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
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                              bordered={false}
                            />
                          </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                          <FormItem
                            name="directordin"
                            label="DIN"
                            rules={[
                              {
                                required: true,
                                message: 'Please enter valid DIN',
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
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
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
                                message: 'Please enter your phone no',
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
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                              bordered={false}  
                            />
                          </FormItem>
                      </Col>
                      <Col span={24} style={{display:'flex', justifyContent:'flex-end'}}>
                          <FormItem>
                            <Button type='text' style={{marginRight:'1rem'}} onClick={() => showEditDirectors(false)}> <CloseOutlined />CANCLE</Button>
                            <Button type='primary' htmlType={editDirectors?'submit':'button'} onClick={()=>{if(!editDirectors){showEditDirectors(true)}}} > <CheckOutlined />SAVE</Button>
                          </FormItem>
                      </Col>
                      </Row>
                      <Button 
                        type="primary"
                        onClick={() => showEditDirectors(!editDirectors)}
                        htmlType='submit'
                      ><PlusCircleOutlined />Add</Button>

                  </div> 
                  )}
                </Form>                  
                </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Auditors" key="2">
                  <Card
                        title="Auditors"
                        bordered={false}
                      >
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
                            {/* ----------------------State for the Auditor List */}
                            {auditorList.map((u,i)=>(
                              <div>
                                <Row gutter={[20,8]}>
                                  <Col xs={22} sm={15} md={6}>
                                    <label>Name</label>
                                    <Input
                                      style={{
                                        width: '100%',
                                        borderBottom: '1px solid #ccc ',
                                      }}
                                      bordered={false}  
                                      value={u.auditorName}/>
                                  </Col>
                                  <Col xs={22} sm={15} md={6}>
                                    <label>Email ID</label>
                                    <Input 
                                     style={{
                                      width: '100%',
                                      borderBottom: '1px solid #ccc ',
                                    }}
                                    bordered={false} 
                                   value={u.auditormailid} />
                                  </Col>
                                  <Col xs={22} sm={15} md={5}>
                                    <lable>Type</lable>
                                    <Select
                                      value={u.auditortype} 
                                      defaultValue="Type"
                                      style={{
                                        width: '100%',
                                        borderBottom: '1px solid #ccc ',
                                      }}
                                      bordered={false}
                                      onChange={handleChange}
                                      options={[
                                        {
                                          value: 'Internal',
                                          label: 'Internal',
                                        },
                                        {
                                          value: 'Statutory',
                                          label: 'Statutory',
                                        },
                                      ]}
                                    />
                                  </Col>
                                  <Col xs={22} sm={15} md={5}>
                                    <lable>Phone Number</lable>
                                    <Input 
                                      style={{
                                        width: '100%',
                                        borderBottom: '1px solid #ccc ',
                                      }}
                                      bordered={false} 
                                      value={u.auditorphone}/>
                                  </Col>
                                  <Col xs={22} sm={15} md={2}
                                    style={{
                                      display:'flex', 
                                      justifyContent:'center', 
                                      alignItems:'end'}}
                                  >
                                    <Button
                                      style={{
                                        width:"10px",
                                        border:'none',
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"end",
                                      }}
                                      onClick={() => {
                                        deleteAuditor(u);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </Button>
                                  </Col>
                                </Row>
                                <Divider className="divider"/>
                              </div>
                            ))}
                            {/* ----------------------State for the Auditor List Form */}
                        {editAuditor === false ? (
                        <Button 
                          type="primary"
                          onClick={() => setEditAuditor(!editAuditor)}
                        ><PlusCircleOutlined />Add</Button>
                      ):(
                        <div>
                          
                            <Row gutter={[20,8]}>
                              <Col xs={22} sm={15} md={6}>
                                <FormItem
                                  label="Name"
                                  name="auditorName"
                                  onKeyPress={(event) => {
                                    if (checkAlphabets(event)) {
                                      event.preventDefault();
                                    }
                                  }}
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter your name',
                                      pattern:/^[a-zA-Z\s]*$/,
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
                                      width: '100%',
                                      borderBottom: '1px solid #ccc ',
                                    }}
                                  />
                                </FormItem>
                              </Col>
                              <Col xs={22} sm={15} md={6}>
                                <FormItem
                                  name="auditormailid"
                                  label="Email ID"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter valid email ID',
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
                                      width: '100%',
                                      borderBottom: '1px solid #ccc ',
                                    }}
                                  />
                                </FormItem>
                              </Col>
                              <Col xs={22} sm={15} md={6}>
                                <FormItem
                                  name="auditortype"
                                  label="Type"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter type',
                                    },
                                  ]}
                                >
                                  <Select 
                                    defaultValue="Type"
                                    style={{
                                      width: '100%',
                                      borderBottom: '1px solid #ccc ',
                                    }}
                                    bordered={false}
                                    onChange={handleChange}
                                    options={[
                                      {
                                        value: 'Internal',
                                        label: 'Internal',
                                      },
                                      {
                                        value: 'Statutory',
                                        label: 'Statutory',
                                      },
                                    ]}
                                  />
                                </FormItem>
                              </Col>
                              <Col xs={22} sm={15} md={6}>
                                <FormItem
                                  name="auditorphone"
                                  label="Phone Number"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter your phone no',
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
                                       width: '100%',
                                       borderBottom: '1px solid #ccc ',
                                     }}
                                     maxLength={10}
                                  />
                                </FormItem>
                              </Col>
                              <Col span={24} style={{display:'flex', justifyContent:'flex-end'}}>
                                <FormItem>
                                  <Button type='text' style={{marginRight:'1rem'}} onClick={() => setEditAuditor(false)}> <CloseOutlined />CANCLE</Button>
                                  <Button type='primary' htmlType="submit" > <CheckOutlined />SAVE</Button>
                                </FormItem>
                              </Col>
                            </Row>
                         
                          <Button 
                          type="primary"
                          onClick={() => setEditAuditor(!editAuditor)}
                          htmlType="submit"
                        ><PlusCircleOutlined />Add</Button>
                        </div> 
                        )}
                        </Form>
                  </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Company Secretary" key="3">
              <Card
                title="Company Secretary"
                bordered={false}
              >
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
                  {/* -----------------------State for the Company Sacretary */}
                    {cSList.map((u,i)=>(
                      <div>
                        <Row gutter={[20,8]}>
                          <Col xs={22} sm={15} md={6}>
                            <label>Name</label>
                            <Input 
                              style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                              bordered={false}
                              value={u.sacName} 
                            />
                          </Col>
                          <Col xs={22} sm={15} md={10}>
                            <label>Email ID</label>
                            <Input 
                             style={{
                              width: '100%',
                              borderBottom: '1px solid #ccc ',
                            }}
                            bordered={false}
                            value={u.sacmailid} 
                            />
                          </Col>
                          <Col xs={22} sm={15} md={6}>
                            <label>Phone Number</label>
                            <Input 
                              style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                              bordered={false}
                              value={u.sacphone}
                            />
                          </Col>
                          <Col xs={22} sm={15} md={2}
                            style={{
                              display:'flex', 
                              justifyContent:'center', 
                              alignItems:'end'}}
                          >
                            <Button
                                      style={{
                                        width:"10px",
                                        border:'none',
                                        display:"flex",
                                        justifyContent:"center",
                                        alignItems:"end",
                                      }}
                                      onClick={() => {
                                        deleteCS(u);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </Button>
                          </Col>
                        </Row>
                        <Divider />
                      </div>
                    ))}
                  {/* -------------------------State for the Comany Sacretary List form */}
                  {editCS === false ? (
                    <Button
                      type="primary"
                      onClick={() => setEditCS(!editCS)}
                    ><PlusCircleOutlined />Add</Button>
                  ):(
                    <div>
                      <Row gutter={[20,8]}>
                        <Col xs={22} sm={15} md={8}>
                          <FormItem
                                    label="Name"
                                    name="sacName"
                                    onKeyPress={(event) => {
                                      if (checkAlphabets(event)) {
                                        event.preventDefault();
                                      }
                                    }}
                                    rules={[
                                      {
                                        required: true,
                                        message: 'Please enter your name',
                                        pattern:/^[a-zA-Z\s]*$/,
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
                                        width: '100%',
                                        borderBottom: '1px solid #ccc ',
                                      }}
                                    />
                          </FormItem>
                        </Col>
                        <Col xs={22} sm={15} md={8}>
                        <FormItem
                                  name="sacmailid"
                                  label="Email ID"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter valid email ID',
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
                                      width: '100%',
                                      borderBottom: '1px solid #ccc ',
                                    }}
                                  />
                                </FormItem>
                        </Col>
                        <Col xs={22} sm={15} md={8}>
                        <FormItem
                                  name="sacphone"
                                  label="Phone Number"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please enter your phone no',
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
                                       width: '100%',
                                       borderBottom: '1px solid #ccc ',
                                     }}
                                     maxLength={10}
                                  />
                                </FormItem>
                        </Col>
                        <Col span={24}  style={{display:'flex', justifyContent:'flex-end'}}>
                          <FormItem>
                            <Button type='text' style={{marginRight:'1rem'}} onClick={() => setEditCS(false)}> <CloseOutlined />CANCLE</Button>
                            <Button type='primary' htmlType="submit" > <CheckOutlined />SAVE</Button>
                          </FormItem>
                        </Col>
                      </Row>
                      <Button
                      type="primary"
                      onClick={() => setEditCS(!editCS)}
                    ><PlusCircleOutlined />Add</Button>
                    </div>
                  )}
                </Form>
              </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>

        <Card
           title="BANK ACCOUNT INFO"
           style={{marginTop:"1rem",width:'800px'}}
        >
           <Form>
            {/* ----------State for the Bank Account information list */}
              {bIAList.map((u,i)=>(
                <div>

                </div>
              ))}
            {/* -----------------State for the Bank Account Information Form */}
          {editBAI === false ? (
            <Button 
              type="primary"
              onClick={() => setEditBAI(!editBAI)}
            ><PlusCircleOutlined />Add</Button>
          ):(
            <div>
              <Row gutter={[16,48]}>
                <Col span={24}>
                  <FormItem
                    name="accountitle"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter account title',
                      },
                    ]}
                  >
                    <Input
                    placeholder="Account Title"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                {/* <Col span={24}>
                  <Button type='primary'> <SearchOutlined /> FIND MY BRANCH</Button>
                </Col> */}
                <Col span={8}>
                  <FormItem
                    name="bankname"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter bank name',
                      },
                    ]}
                  >
                    <Input 
                    placeholder="Bank Name"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter city',
                      },
                    ]}
                  >
                    <Input
                    placeholder="City"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    name="branchname"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter branch name',
                      },
                    ]}
                  >
                    <Input
                    placeholder="Branch Name"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    name="ifsccode"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the IFSC code',
                      },
                    ]}
                  >
                    <Input
                    placeholder="IFSC Code"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    name="accounttype"
                    rules={[
                      {
                        required: true,
                        message: 'Please select account type',
                      },
                    ]}
                  >
                    <Select
                      defaultValue="Account Type"
                      style={{
                        width: '100%',
                        borderBottom: '1px solid #ccc ',
                      }}
                      bordered={false}
                      onChange={handleChange}
                      options={[
                        {
                          value: 'Account Type',
                          label: 'Account Type',
                        },
                        {
                          value: 'Current Account',
                          label: 'Current Account',
                        },
                        {
                          value: 'Fixed Deposit',
                          label: 'Fixed Deposit',
                        },
                      ]}
                    />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    name="accountnumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter account number',
                      },
                    ]}
                  >
                    <Input
                    placeholder="Account Number"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={24} style={{display:'flex', justifyContent:'flex-end'}}>
                  <FormItem>
                    <Button type='text' style={{marginRight:'1rem'}} onClick={() => setEditBAI(false)}> <CloseOutlined />CANCLE</Button>
                    <Button type='primary' htmlType="submit"> <CheckOutlined />SAVE</Button>
                  </FormItem>
                </Col>
              </Row>
            </div>
         )}
         </Form>
        </Card>
      
    </div>

  )
}

export default Statutory