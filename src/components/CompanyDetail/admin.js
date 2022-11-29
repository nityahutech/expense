import React, { useState, useRef, useEffect } from "react";
import { Typography } from 'antd';
import CompanyProContext from "../../contexts/CompanyProContext";
import "./companystyle.css";
import {
  Button,
  Col,
  Space,
  Modal,
  Form,
  Input,
  Popconfirm,
  Row,
  Divider,
  Card
} from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined 
} from "@ant-design/icons";
const { Text, Link } = Typography;
const Admin = () => {
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editHrContactInfo, showEditHrContactInfo] = useState(false);
  const [editFinanceContactInfo, showEditFinanceContactInfo] = useState(false);
  const [editExecutiveContactInfo, showEditExecutiveContactInfo] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const onFinish = (values) => {
    const valuesToservice = {
      ceoAdmin: values.ceoAdmin
    };
    CompanyProContext.updateCompInfo(compId,valuesToservice);
    form.resetFields();
    getData();
    showEditContactInfo(false);
  };
  const onHRFinish=(values)=>{
    const value={
     hrAdmin:values.hrAdmin
    };
    CompanyProContext.updateCompInfo(compId,value);
    getData();
    showEditHrContactInfo(false);
  };
  const onFinanceFinish=(values)=>{
    const value={
     financerAdmin:values.financerAdmin
    };
    CompanyProContext.updateCompInfo(compId,value);
    getData();
    showEditFinanceContactInfo(false);
  };
  const onHRExeFinish=(values)=>{
    const value={
     hrExeAdmin:values.hrExeAdmin
    };
    CompanyProContext.updateCompInfo(compId,value);
    getData();
    showEditExecutiveContactInfo(false);
  }
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '10px',
          width: '100%'
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
           form={form}
          
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
         onFinish={onFinish}
         layout="vertical"
        >
          <div className="site-card-border-less-wrapper">
            <Card
              className="ceoCard"
              title="CEO"
              bordered={true}
              hoverable={true}
              style={{
                width: '100%',
                marginTop: 10,
                borderRadius:"10px",
                cursor:"default"
              }}
            >
              <p>CEO is the head of the organization.<br />
                For Organisation Chart, addition of CEO is required.
              </p>
              <p>CEO is also the HR Admin.<br />
                CEO's permissions apply to all employees.</p>
              <p>CEO can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile,<br />
                  View sensitive employee information (such as PAN Card, IDs and salary,)<br />
                  Edit employee profiles,<br />
                  Edit, Upload and Approve Attendance and Leaves,<br />
                  Create and remove admins, and edit admin permissions.</Text>
              </div>
              {/* ------------------------------------------------old code------------------------------------------- */}
              {/* {data?.ceoAdmin}
              <Divider ></Divider>
              {editContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Enter Name
                      </div>
                        <Form.Item
                          // initialValue={data ? data.ceoAdmin : null}
                          name="ceoAdmin"
                          rules={[
                            {
                              required: true,
                              message: "Enter CEO Name",
                              type: "text",
                            },
                            {
                              message: "Enter Valid Name ",
                            },
                          ]}
                        >
                          <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                        </Form.Item>
                        </div>
                  </Col>
                </Row>
              ) : null}
              {editContactInfo == false &&
              <div>
                <Button type="primary" onClick={() => { showEditContactInfo(!editContactInfo) }} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Add
                </Button>
              </div>
              }
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
                      style={{ marginLeft: "10px" }}
                    >
                      SAVE
                    </Button>
                  </Col>
                </Row>
              ) : null} */}
              {/* -------------------------------------------old Code----------------------------------------------- */}
              {/* -------------------------------------------new Code----------------------------------------------- */}
                  <Row>
                    <Col span={24}>
                      <div>
                        {editContactInfo === false ? (
                            <div style={{
                              border:'1px solid #ccc',
                              borderRadius:'2px',
                              marginTop:"10px",
                              marginBottom:"10px",
                              padding:"5px",
                              }}>
                              {data.ceoAdmin ? data.ceoAdmin : "-"}
                            </div>
                        ) : (
                          <Form.Item
                            style={{marginTop:'10px'}}
                            initialValue={data ? data.ceoAdmin : null}
                            name="ceoAdmin"
                          >
                            <Input
                              type="ceoAdmin"
                              placeholder="Enter CEO Name"
                              style={{
                                width: "100%",
                                padding:"5px",
                              }}
                              size="large"
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                  </Row>
                {editContactInfo === true ? (
                  <Row gutter={[16,16]}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  ><Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                    <Button
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditContactInfo(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{background: "#1963a6",border: "1px solid #1963A6" }}
                      >
                        <CheckOutlined /> SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
                {editContactInfo == false &&
                  <div>
                    <Button 
                      style={{ background: "#1963a6",border: "1px solid #1963A6",marginLeft: "10px"}}
                      type="primary" 
                      onClick={() => { showEditContactInfo(!editContactInfo) }} 
                      >
                      <PlusCircleOutlined />
                      Add
                    </Button>
                  </div>
                }
              {/* -------------------------------------------new Code----------------------------------------------- */}
            </Card>
          </div>
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
          marginBottom: '10px'
        }}
      >
        <Form
          style={{
            width: '75%'
          }}
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
         onFinish={onHRFinish}
        >
          <div className="site-card-border-less-wrapper">
            <Card
              className="hrCard"
              title="HR ADMIN"
              bordered={true}
              hoverable={true}
              style={{
                width: '100%',
                marginTop: 10,
                borderRadius:"10px",
                cursor:"default"
              }}
            >
              <p>HR Admin's permissions apply to all employees.
              </p>
              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile information,<br />
                  View sensitive employee information (such as PAN Card, IDs and salary,)<br />
                  Edit employee profiles,<br />
                  Edit, Upload and Approve Attendance and Leaves,<br />
                  Create and remove admins, and edit admin permissions.</Text>
              </div>
              {/* --------------------------------------- */}
              {/* {data?.hrAdmin}
              <Divider ></Divider>
              {editHrContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Enter Name
                      </div>
                        <Form.Item
                          //  initialValue={data ? data.hrAdmin : null}
                          name="hrAdmin"
                          rules={[
                            {
                              required: true,
                              message: "Enter Name",
                              type: "text",
                            },
                            {
                              message: "Enter Name ",
                            },
                          ]}
                        >
                          <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                        </Form.Item>
                        </div>
                  </Col>
                </Row>
              ) : null}
              {editHrContactInfo == false &&
                <Button type="primary" onClick={() => showEditHrContactInfo(!editHrContactInfo)} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Add
                </Button>
              }
              {editHrContactInfo === true ? (
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
                    onClick={() => showEditHrContactInfo(false)}
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
              ) : null} */}
              {/* --------------------------------------- */}
              {/* -------------------newCode------------- */}
                <Row>
                  <Col span={24}>
                    <div>
                    {editHrContactInfo === false ? (
                      <div style={{
                        border:'1px solid #ccc',
                        borderRadius:'2px',
                        marginTop:"10px",
                        marginBottom:"10px",
                        padding:"5px",
                        }}>
                        {data.hrAdmin ? data.hrAdmin : "-"}
                      </div>
                      ) : (
                        <Form.Item
                        style={{marginTop:'10px'}}
                        initialValue={data ? data.hrAdmin : null}
                        name="hrAdmin"
                      >
                        <Input
                          type="ceoAdmin"
                          placeholder="Enter HR Admin Name"
                          style={{
                            width: "100%",
                            padding:"5px",
                          }}
                          size="large"
                        />
                      </Form.Item>
                      )}     
                    </div>
                  </Col>
                </Row>
                {editHrContactInfo === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  ><Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                    <Button
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditHrContactInfo(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ fontSize: 15,marginLeft: "10px",background: "#1963a6",border: "1px solid #1963A6" }}
                      >
                       <CheckOutlined /> SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
                {editHrContactInfo == false &&
                  <div>
                    <Button
                      style={{ background: "#1963a6",border: "1px solid #1963A6", }} 
                      type="primary" 
                      onClick={() => { showEditHrContactInfo(!editHrContactInfo) }} 
                      >
                      <PlusCircleOutlined />
                      Add
                    </Button>
                  </div>
                }
              {/* -------------------newCode------------- */}
            </Card>
          </div>
        </Form>
      </div >

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '10px'
        }}
      >
        <Form
          style={{
            width: '75%'
          }}
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
         onFinish={onFinanceFinish}
        >
          <div className="site-card-border-less-wrapper">
            <Card
              className="financeCard"
              title="FINANCE ADMIN"
              bordered={true}
              hoverable={true}
              style={{
                width: '100%',
                marginTop: 10,
                borderRadius:"10px",
                cursor:"default"
              }}
            >
              <p>Finance admin's permissions apply to all employees.
              </p>
              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View salary and bank details of employee profiles,<br />
                  View sensitive employee information (such as PAN Card, IDs and salary.)<br />
                </Text>
              </div>
              {/* ------------------------------------------------------ */}
              {/* {data?.financerAdmin}
              <Divider ></Divider>
              {editFinanceContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Enter Name
                      </div>
                         <Form.Item
                          //  initialValue={data ? data.financerAdmin : null}
                          name="financerAdmin"
                          rules={[
                            {
                              required: true,
                              message: "Enter Name",
                              type: "text",
                            },
                            {
                              message: "Enter Name ",
                            },
                          ]}
                        >
                          <Input style={{ paddingLeft: '0px' }} required placeholder="" />
                        </Form.Item>
                         </div>
                  </Col>
                </Row>
              ) : null}
              {editFinanceContactInfo == false &&
                <Button
                  type="primary" onClick={() => showEditFinanceContactInfo(!editFinanceContactInfo)} style={{ marginLeft: "10px" }}
                >
                  <PlusCircleOutlined />
                  Add
                </Button>
              }
              {editFinanceContactInfo === true ? (
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
                    onClick={() => showEditFinanceContactInfo(false)}
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
              ) : null} */}
              {/* ----------------------------------------------------- */}
              {/* ----------------------newCode------------------------ */}
                <Row>
                  <Col span={24}>
                  {editFinanceContactInfo === false ? (
                    <div style={{
                      border:'1px solid #ccc',
                      borderRadius:'2px',
                      marginTop:"10px",
                      marginBottom:"10px",
                      padding:"5px",
                      }}>
                      {data.financerAdmin ? data.financerAdmin : "-"}
                    </div>
                    ) : (
                      <Form.Item
                            style={{marginTop:'10px'}}
                            initialValue={data ? data.financerAdmin : null}
                            name="financerAdmin"
                          >
                            <Input
                              type="ceoAdmin"
                              placeholder="Enter Finance Admin Name"
                              style={{
                                width: "100%",
                                padding:"5px",
                              }}
                              size="large"
                            />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                {editFinanceContactInfo === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  ><Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                    <Button
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditFinanceContactInfo(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#1963a6",border: "1px solid #1963A6" }}
                      >
                       <CheckOutlined />SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
                {editFinanceContactInfo == false &&
                <Button
                style={{ background: "#1963a6",border: "1px solid #1963A6"}}  
                type="primary" 
                  onClick={() => showEditFinanceContactInfo(!editFinanceContactInfo)} 
                >
                  <PlusCircleOutlined />
                  Add
                </Button>
              }
              {/* ----------------------newCode------------------------ */}
            </Card>
          </div>
        </Form>
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '10px'
        }}
      >
        <Form
          style={{

            width: '75%'
          }}
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
         onFinish={onHRExeFinish}
        >
          <div className="site-card-border-less-wrapper">
            <Card
              className="hreCard"
              title="HR EXECUTIVE"
              bordered={true}
              hoverable={true}
              style={{
                width: '100%',
                marginTop: 10,
                borderRadius:"10px",
                cursor:"default"
              }}
            >
              <p>HR Executive's permissions apply to all employees.
              </p>
              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile information (Non-payroll),<br />
                  View all employee profile information (Non-payroll),<br />
                  Add and edit employee profiles,<br />
                  Edit, Upload and Approve Attendance and Leaves,<br />
                  This Admin will not have any payroll access.<br />
                </Text>
              </div>
              {/* --------------------------------------------- */}
              {/* {data?.hrExeAdmin}
              <Divider ></Divider>
              {editExecutiveContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Enter Name
                      </div>
                          <Form.Item
                          //  initialValue={data ? data.hrExeAdmin : null}
                          name="hrExeAdmin"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Name",
                              type: "text",
                            },
                            {
                              message: "Please enter Name ",
                            },
                          ]}
                        >
                          <Input style={{ paddingLeft: '0px' }} type='AddressName' required placeholder="" />
                        </Form.Item>
                        </div>
                  </Col>
                </Row>
              ) : null}
              {editExecutiveContactInfo == false &&
                <Button type="primary" onClick={() => showEditExecutiveContactInfo(!editExecutiveContactInfo)} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Add
                </Button>}
              {editExecutiveContactInfo === true ? (
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
                    onClick={() => showEditExecutiveContactInfo(false)}
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
              ) : null} */}
              {/* --------------------------------------------- */}
              {/* -----------------newCard--------------------- */}
                  <Row>
                    <Col span={24}>
                    {editExecutiveContactInfo === false ? (
                      <div style={{
                        border:'1px solid #ccc',
                        borderRadius:'2px',
                        marginTop:"10px",
                        marginBottom:"10px",
                        padding:"5px",
                        }}>
                        {data.hrExeAdmin ? data.hrExeAdmin : "-"}
                      </div>
                    ) : (
                      <Form.Item
                        style={{marginTop:'10px'}}
                        initialValue={data ? data.hrExeAdmin : null}
                        name="hrExeAdmin"
                        
                      >
                        <Input
                          type="ceoAdmin"
                          placeholder="Enter HR Executive Name"
                          style={{
                            width: "100%",
                            padding:"5px",
                          }}
                          size="large"
                        />
                      </Form.Item>
                    )}
                    </Col>
                  </Row>
                {editExecutiveContactInfo === true ? (
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "3%",
                  }}
                >
                  <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                  <Button
                    type="text"
                    style={{ fontSize: 15 }}
                    onClick={() => showEditExecutiveContactInfo(false)}
                  >
                    <CloseOutlined /> CANCEL
                  </Button>
                  </Col>
                  <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ 
                        background: "#1963a6",
                        border: "1px solid #1963A6",
                        width:"119px", }}
                    >
                     <CheckOutlined /> SAVE
                    </Button>
                  </Col>
                </Row>
               ) : null} 
               {editExecutiveContactInfo == false &&
                <Button 
                style={{ background: "#1963a6",border: "1px solid #1963A6"}}
                type="primary" 
                onClick={() => showEditExecutiveContactInfo(!editExecutiveContactInfo)}>
                  <PlusCircleOutlined />
                  Add
                </Button>}
              {/* -----------------newCard--------------------- */}
            </Card>
          </div>
        </Form>
      </div>

    </>
  )
}

export default Admin