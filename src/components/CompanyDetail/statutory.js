import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form,Modal, Tabs, Table, Divider } from "antd";
import { CloseOutlined, EditFilled, CheckOutlined, SearchOutlined, PlusCircleOutlined, DeleteOutlined } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";
import CompanyProContext from "../../contexts/CompanyProContext";

const { TextArea } = Input;
const compId = sessionStorage.getItem("compId");
const { Option } = Select;

const Statutory = () => {

  const [editContent, showEditContent] = useState(false);
  // -----------------------------------------------------states for company ID
  const [editCompanyID, showeditCompanyID] = useState(false);

  // ------------------------------------------------------states for Bank Info
  const [editBai, setEditBAI] = useState(false);
  const [baiList, setBAIList] = useState([]);
  const [form3] = Form.useForm();

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
 
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  // const [cancelEditContent, setcancelEditContent] = useState(false);
  const [data, setData] = useState([]);
  const onFinish = (value) => {
    const valuesToservice = {
      entityType: value.entityType,
      cinName: value.cinName,
      dateOfIncorp: value.dateOfIncorp,
      compPan: value.compPan,
      compTan: value.compTan,
      gst: value.gst      
    }
    
    CompanyProContext.updateCompInfo("compId001",valuesToservice);
    getData();
    showEditContent(false);
  };
  
  useEffect(() => {
    getData();
    }, []);
    const getData = async () => {
      let data = await CompanyProContext.getCompanyProfile("compId001");
      setData(data);
      setDirectorList(data.director);
      setAuditorList(data.auditor);
      setCSList(data.secretary);
      setBAIList(data.bank);
      
    };
    
  // const onContactFinish = (values) => {
   
  //   getData();
  //   showeditCompanyID(false);
  // };
  
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
    const record = {
      directorName: values.directorName,
      directoremailid: values.directoremailid,
      directordin: values.directordin,
      directorphone: values.directorphone,    
    }
    console.log(record)
    CompanyProContext.addCompInfo("compId001", { director: record });
        form.resetFields()
        getData();
        showEditDirectors(false);
      };

  //-------------------------------------function for deleting data entered in the director tab
  // function deleteDirector (deldir) {
  //   let record={
  //     directorName:null,
  //     directoremailid: null,
  //     directordin: null,
  //     directorphone: null, 
  //   }
  //   console.log(deldir);
  //   const filterDirectorData = directorList.filter(
  //     (item) => item.directoremailid !== deldir.directoremailid
  //   );
  //   CompanyProContext.updateCompInfo(compId,record)
  //   .then((response) => {
  //              console.log(response);
  //              })
  //     setDirectorList(filterDirectorData);
  //     showEditDirectors(false)
  // }
  const onDeleteDirector = (record) => {
    Modal.confirm({
    title: "Are you sure, you want to delete Director?",
    okText: "Yes",
    okType: "danger",

    onOk: () => {
        CompanyProContext.deleteCompInfo("compId001", { director: record })
        .then((response) => {
          console.log(response);
          getData();
        })
        .catch((error) => {
          console.log(error.message);
        });
    },
  });
  }
  
 // // -----------------------------------function for addAuditor
  function addAuditor (values) {
    let record1={
      auditorName:values.auditorName,
      auditormailid:values.auditormailid,
      auditortype:values.auditortype,
      auditorphone: values.auditorphone, 
    }
    console.log(record1)
    CompanyProContext.addCompInfo("compId001", { auditor: record1 });
        form1.resetFields()
        getData();
        setEditAuditor(false);
      };

      const onDeleteAuditor = (record1) => {
        Modal.confirm({
        title: "Are you sure, you want to delete Auditor?",
        okText: "Yes",
        okType: "danger",
    
        onOk: () => {
            CompanyProContext.deleteCompInfo("compId001", { auditor: record1 })
            .then((response) => {
              console.log(response);
              getData();
            })
            .catch((error) => {
              console.log(error.message);
            });
        },
      });
      }
      
   // ----------------------------------Function for deleting data entered in the auditor tab
  // function deleteAuditor (delAudit) {
  //   let record1={
  //     auditorName:null,
  //     auditormailid: null,
  //     auditortype: null,
  //     auditorphone: null, 
  //   }
  //   console.log(delAudit);
  //   const filterAuditorData = auditorList.filter(
  //     (item) => item.auditormailid !== delAudit.auditormailid
  //   );
  //   CompanyProContext.updateCompInfo(compId,record1)
  //   .then((response) => {
  //              console.log(response);
  //              })
  //     setAuditorList(filterAuditorData);
  //     setEditAuditor(false)
  // }

  // ------------------function for add Company Sacretary
  function addCS (values) {
    let record2={
      secName:values.secName,
      secmailid:values.secmailid,
      secphone:values.secphone,
    }
    CompanyProContext.addCompInfo("compId001", { secretary: record2 });
        form2.resetFields()
        getData();
        setEditCS(false);
      };
      const onDeleteSecretary = (record2) => {
        Modal.confirm({
        title: "Are you sure, you want to delete Secretary?",
        okText: "Yes",
        okType: "danger",
    
        onOk: () => {
            CompanyProContext.deleteCompInfo("compId001", { secretary: record2 })
            .then((response) => {
              console.log(response);
              getData();
            })
            .catch((error) => {
              console.log(error.message);
            });
        },
      });
      }
        // -------------function for deleting data entered in Company Sacretary tab
  // function deleteCS (delComp) {
  //   // console.log(delComp);
  //   const filterCSData = cSList.filter(
  //     (item) => item.sacmailid !== delComp.sacmailid
  //   );
  //   setCSList(filterCSData);
  // }
  //------------function for adding Bank Account Information
  function addBAI (values) {
    let record3={
      baiaccountitle:values.baiaccountitle,
      baiifsccode:values.baiifsccode,
      baiaccounttype:values.baiaccounttype,
      baibankname:values.baibankname,
      baicity:values.baicity,
      baibranchname:values.baibranchname,
      baiaccountnumber:values.baiaccountnumber,
    }
    CompanyProContext.addCompInfo("compId001", { bank: record3 });
        form3.resetFields()
        getData();
        setEditBAI(false);
      };
      const onDeleteBank = (record3) => {
        Modal.confirm({
        title: "Are you sure, you want to delete Bank Account?",
        okText: "Yes",
        okType: "danger",
    
        onOk: () => {
            CompanyProContext.deleteCompInfo("compId001", { bank: record3 })
            .then((response) => {
              console.log(response);
              getData();
            })
            .catch((error) => {
              console.log(error.message);
            });
        },
      });
      }
      
  // // ---------function for deleting data entered in Bank account Information
  // function deleteBAI (delBAI) {
  //   console.log(delBAI);
  //   const filterBAIData = baiList.filter(
  //     (item) => item.baibranchname !== delBAI.baibranchname
  //   );
  //   setBAIList(filterBAIData);
  // }

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
        onFinish={onFinish}
      >
        <Card
          title=" COMPANY ID"
          style={{marginTop:"1rem",width:'800px'}}
          // className="card1"
          extra={
            <>
              {editContent === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showEditContent(!editContent)}
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
                {editContent === false ? (
                  <div>{data.entityType ? data.entityType : "-"}
                  </div>
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
                {editContent === false ? (
                  <div>{data.cinName ? data.cinName : "-"}</div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.cinName : null}
                    name="cinName"
                    rules={[
                      {
                        // required: true,
                        // message: "Please enter Brand Name",
                        // type: "email",
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
                {editContent === false ? (
                  <div>{data.dateOfIncorp ? data.dateOfIncorp : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.dateOfIncorp : null}
                    name="dateOfIncorp"
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
                {editContent === false ? (
                  <div>{data.compPan ? data.compPan : "-"}
                  </div>
                ) : (
                  <Form.Item
                    initialValue={data ? data.compPan : null}
                    name="compPan"
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
                {editContent === false ? (
                  <div>{data.compTan ? data.compTan : "-"}
                  </div>
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
                {editContent === false ? (
                  <div>{data.gst ? data.gst : "-"}
                  </div>
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
                            onDeleteDirector(u);
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
                                        onDeleteAuditor(u);
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
                              value={u.secName} 
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
                            value={u.secmailid} 
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
                              value={u.secphone}
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
                                    name="secName"
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
                                  name="secmailid"
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
                                  name="secphone"
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
             {/* ----------State for the Bank Account information list */}
              {baiList.map((u,i)=>(
                <div>
                  <Row gutter={[16,48]}>
                    <Col span={24}>
                      <label>Account Title</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baiaccountitle} 
                      />
                    </Col>
                    <Col span={8}>
                      <label>Bank Name</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baibankname} 
                            />
                    </Col>
                    <Col span={8}>
                      <label>City</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baicity} 
                            />
                    </Col>
                    <Col span={8}>
                      <label>Branch Name</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baibranchname} 
                            />
                    </Col>
                    <Col span={8}>
                      <label>IFSC Code</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baiifsccode} 
                            />
                    </Col>
                    <Col span={8}>
                    <lable>Type</lable>
                                    <Select
                                      value={u.baiaccounttype} 
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
                    </Col>
                    <Col span={8}>
                      <label>Account Number</label>
                      <Input 
                        style={{
                                width: '100%',
                                borderBottom: '1px solid #ccc ',
                              }}
                        bordered={false}
                        value={u.baiaccountnumber} 
                            />
                    </Col>
                    <Col 
                      span={24} 
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
                                        onDeleteBank(u);
                                      }}
                                    >
                                      <DeleteOutlined />
                                    </Button>
                    </Col>
                    <Divider />
                  </Row>
                </div>
              ))} 
            {/* -----------------State for the Bank Account Information Form */}
          {editBai === false ? (
            <Button 
              type="primary"
              onClick={() => setEditBAI(!editBai)}
            ><PlusCircleOutlined />Add</Button>
          ):(
            <div>
              <Row gutter={[16,48]}>
                <Col span={24}>
                  <FormItem
                    label="Account Title"
                    name="baiaccountitle"
                    rules={[
                      {
                        pattern: /^[a-zA-Z\s]*$/,
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
                <Col span={8}>
                  <FormItem
                    label="Bank Name"
                    name="baibankname"
                    rules={[
                      {
                        pattern: /^[a-zA-Z\s]*$/,
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
                    label="City"
                    name="baicity"
                    rules={[
                      {
                        pattern: /^[a-zA-Z\s]*$/,
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
                    label="Branch Name"
                    name="baibranchname"
                    rules={[
                      {
                        pattern: /^[a-zA-Z\s]*$/,
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
                    label="IFSC Code"
                    name="baiifsccode"
                    rules={[
                      {
                        pattern: /^[A-Z0-9\s]*$/,
                        required: true,
                        message: 'Please enter the IFSC code',
                      },
                    ]}
                  >
                    <Input
                    maxLength={11}
                    placeholder="IFSC Code"
                    bordered={false}
                    style={{borderBottom: '1px solid #ccc '}} />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label="Account Type"
                    name="baiaccounttype"
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
                        {
                          value: 'Salary Account',
                          label: 'Salary Account',
                        },
                      ]}
                    />
                  </FormItem>
                </Col>
                <Col span={8}>
                  <FormItem
                    label="Account Number"
                    name="baiaccountnumber"
                    rules={[
                      {
                        pattern: /^[0-9\b]+$/,
                        required: true,
                        message: 'Please enter account number',
                      },
                    ]}
                  >
                    <Input
                    maxLength={14}
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

