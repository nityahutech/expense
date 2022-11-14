import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Typography } from 'antd';
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
  CloseOutlined

} from "@ant-design/icons";
const { Text, Link } = Typography;


const Admin = () => {
  const [allWorkDetails, setAllWorkDetails] = useState([

  ]);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editHrContactInfo, showEditHrContactInfo] = useState(false);
  const [editFinanceContactInfo, showEditFinanceContactInfo] = useState(false);
  const [editExecutiveContactInfo, showEditExecutiveContactInfo] = useState(false);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const compId = sessionStorage.getItem("compId")


  const showModal = () => {
    setIsModalOpen(true);
    setVisible(true);
    form.resetFields();
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setVisible(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setVisible(false);
    form.resetFields();
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
        <Form style={{

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
        // onFinish={onContactFinish}
        >
          {/* //----------------CEO----------------------- */}

          <div className="site-card-border-less-wrapper">
            <Card
              title="CEO"
              bordered={false}
              style={{
                width: '100%',
              }}
            >


              <p>CEO is the head of the organization.<br />
                For Organisation Chart, addition of CEO is required.
              </p>
              <p>CEO is also the HR Admin.<br />
                CEO's permissions apply to all employees.</p>

              <p>CEO can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile<br />
                  View sensitive employee information (such as PAN Card, IDs and salary)<br />
                  Edit employee profiles<br />
                  Edit, Upload and Approve Attendance and Leaves<br />
                  Create and remove admins, and edit admin permissions</Text>
              </div>
              <Divider ></Divider>

              {editContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Find Employee
                      </div>
                      {editContactInfo === false ? (
                        <div>
                          {data.mailid ? data.mailid : ""}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="FindEmployee"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Name",
                              type: "text",
                            },
                            {
                              message: "Please enter Valid Name ",
                            },
                          ]}
                        >
                          <Input style={{ paddingLeft: '0px' }} type='AddressName' required placeholder="" />

                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
              ) : null}
              {editContactInfo == false &&
                <Button type="primary" onClick={() => { showEditContactInfo(!editContactInfo) }} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Change
                </Button>
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
              ) : null}
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
        // onFinish={onContactFinish}
        >
          {/* //----------------HR----------------------- */}

          <div className="site-card-border-less-wrapper">
            <Card
              title="HR ADMIN"
              bordered={false}
              style={{
                width: '100%',
              }}
            >


              <p>HR Admin's permissions apply to all employees.
              </p>


              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile information<br />
                  View sensitive employee information (such as PAN Card, IDs and salary)<br />
                  Edit employee profiles<br />
                  Edit, Upload and Approve Attendance and Leaves<br />
                  Create and remove admins, and edit admin permissions</Text>
              </div>
              <Divider ></Divider>

              {editHrContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Find Employee
                      </div>
                      {editHrContactInfo === false ? (
                        <div>
                          {data.mailid ? data.mailid : ""}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="FindHrEmployee"
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
                      )}
                    </div>
                  </Col>
                </Row>
              ) : null}
              {editHrContactInfo == false &&
                <Button type="primary" onClick={() => showEditHrContactInfo(!editHrContactInfo)} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Change
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
              ) : null}
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
        // onFinish={onContactFinish}
        >
          {/* //----------------FINANCE----------------------- */}

          <div className="site-card-border-less-wrapper">
            <Card
              title="FINANCE ADMIN"
              bordered={false}
              style={{
                width: '100%',
              }}
            >


              <p>Finance admin's permissions apply to all employees.
              </p>


              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View salary and bank details of employee profiles<br />
                  View sensitive employee information (such as PAN Card, IDs and salary)<br />

                </Text>
              </div>
              <Divider ></Divider>
              {editFinanceContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Find Employee
                      </div>
                      {editFinanceContactInfo === false ? (
                        <div>
                          {data.mailid ? data.mailid : ""}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="FindFinEmployee"
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
                      )}
                    </div>
                  </Col>
                </Row>
              ) : null}

              {editFinanceContactInfo == false &&
                <Button
                  type="primary" onClick={() => showEditFinanceContactInfo(!editFinanceContactInfo)} style={{ marginLeft: "10px" }}

                >
                  <PlusCircleOutlined />
                  Change
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
              ) : null}
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
        // onFinish={onContactFinish}
        >
          {/* //----------------EXECUTIVE----------------------- */}

          <div className="site-card-border-less-wrapper">
            <Card
              title="HR EXECUTIVE"
              bordered={false}
              style={{
                width: '100%',
              }}
            >


              <p>HR Executive's permissions apply to all employees.
              </p>


              <p>This admin can:</p>
              <div className="div-text" style={{ paddingLeft: '20px' }}>
                <Text>View all employee profile information (Non-payroll)<br />
                  View all employee profile information (Non-payroll)<br />
                  Add and edit employee profiles<br />
                  Edit, Upload and Approve Attendance and Leaves<br />
                  This Admin will not have any payroll access.<br />

                </Text>
              </div>
              <Divider ></Divider>
              {editExecutiveContactInfo === true ? (
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <div>
                      <div className='div-discription'>
                        Find Employee
                      </div>
                      {editExecutiveContactInfo === false ? (
                        <div>
                          {data.mailid ? data.mailid : ""}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="FindExeEmployee"
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
                      )}
                    </div>
                  </Col>
                </Row>
              ) : null}

              {editExecutiveContactInfo == false &&
                <Button type="primary" onClick={() => showEditExecutiveContactInfo(!editExecutiveContactInfo)} style={{ marginLeft: "10px" }}>
                  <PlusCircleOutlined />
                  Change
                </Button>
              }

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
              ) : null}
            </Card>
          </div>
        </Form>
      </div>

    </>

  )
}

export default Admin