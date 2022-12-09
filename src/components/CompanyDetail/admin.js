import React, { useState, useRef, useEffect } from "react";
import { Typography } from "antd";
import CompanyProContext from "../../contexts/CompanyProContext";
import { getUsers } from "../../contexts/CreateContext";
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
  Card,
} from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditFilled,
} from "@ant-design/icons";
import { AutoComplete } from 'antd';
const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});
const { Text, Link } = Typography;
const Admin = () => {
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editHrContactInfo, showEditHrContactInfo] = useState(false);
  const [editFinanceContactInfo, showEditFinanceContactInfo] = useState(false);
  const [editExecutiveContactInfo, showEditExecutiveContactInfo] =
    useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allEmpName, setAllEmpName] = useState([]);
  const [ceoAdmin, setCeoAdmin] = useState('');

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
      ceoAdmin: ceoAdmin,
    };
    CompanyProContext.updateCompInfo(compId, valuesToservice);
    form.resetFields();
    getData();
    showEditContactInfo(false);
  };
  const onHRFinish = (values) => {
    const value = {
      hrAdmin: values.hrAdmin,
    };
    CompanyProContext.updateCompInfo(compId, value);
    getData();
    showEditHrContactInfo(false);
  };
  const onFinanceFinish = (values) => {
    const value = {
      financerAdmin: values.financerAdmin,
    };
    CompanyProContext.updateCompInfo(compId, value);
    getData();
    showEditFinanceContactInfo(false);
  };
  const onHRExeFinish = (values) => {
    const value = {
      hrExeAdmin: values.hrExeAdmin,
    };
    CompanyProContext.updateCompInfo(compId, value);
    getData();
    showEditExecutiveContactInfo(false);
  };
  useEffect(() => {
    getData();
    getAllUser()
  }, []);
  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
  };


  const [options, setOptions] = useState([]);
  const onSearch = (searchText) => {
    console.log('onSearch', searchText);
    console.log('onSearch', allEmpName);
    let matchingName = allEmpName.filter((ex) => { return ex.value.toLowerCase().includes(searchText.toLowerCase()) })
    console.log('onSearch', matchingName);
    setOptions(
      !searchText ? [] : matchingName,
    );
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
    setCeoAdmin(data)
  };

  async function getAllUser() {
    const allData = await getUsers();
    let allUsers = allData.docs.map((doc, i) => {
      return {
        value: doc.data().fname + ' ' + doc.data().lname
      };
    });
    console.log('allUsers', allUsers)
    setAllEmpName(allUsers)
  }


  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
          width: "100%",
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
              layout="vertical"
            >
              <div className="site-card-border-less-wrapper">
                <Card
                  className="ceoCard"
                  title="CEO"
                  bordered={true}
                  hoverable={true}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <Row>
                    <Col span={24}>
                      <p>
                        CEO is the head of the organization.
                        <br />
                        For Organisation Chart, addition of CEO is required.
                      </p>
                      <p>
                        CEO is also the HR Admin.
                        <br />
                        CEO's permissions apply to all employees.
                      </p>
                      <p>CEO can:</p>
                      <div className="div-text" style={{ paddingLeft: "20px" }}>
                        <Text>
                          View all employee profile,
                          <br />
                          View sensitive employee information (such as PAN Card,
                          IDs and salary,)
                          <br />
                          Edit employee profiles,
                          <br />
                          Edit, Upload and Approve Attendance and Leaves,
                          <br />
                          Create and remove admins, and edit admin permissions.
                        </Text>
                      </div>
                    </Col>
                    <Col style={{ display: "inline-block" }} >
                      <div>
                        {editContactInfo === false ? (
                          !data.ceoAdmin ? (
                            <>
                              <Button
                                style={{
                                  background: "#1963a6",
                                  border: "1px solid #1963A6",
                                  color: "#ffff",
                                }}
                                onClick={() => {
                                  showEditContactInfo(!editContactInfo);
                                }}
                              >
                                <PlusCircleOutlined />
                                Add
                              </Button>
                            </>
                          ) : (
                            <>
                              <div
                                style={{
                                  border: "1px solid #ccc",
                                  borderRadius: "50px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  // padding:"5px",
                                  fontSize: "25px",
                                  fontWeight: "lighter",
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  className="initialCircle"
                                  style={{
                                    border: "1px solid #ccc",
                                    borderRadius: "25px",
                                    backgroundColor: "aqua",
                                    width: "50px",
                                    height: "50px",
                                    margin: "10px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  CE
                                </div>
                                <span style={{ marginRight: "10px" }}>
                                  {data.ceoAdmin ? data.ceoAdmin : null}{" "}
                                </span>
                              </div>
                              {editContactInfo == false ? (
                                <Button
                                  style={{
                                    background: "#1963a6",
                                    border: "1px solid #1963A6",
                                    color: "#ffff",
                                  }}
                                  onClick={() =>
                                    showEditContactInfo(!editContactInfo)
                                  }
                                >
                                  <EditFilled /> Change
                                </Button>
                              ) : null}
                            </>
                          )
                        ) : (
                          <>
                            <Form.Item
                              style={{ marginTop: "10px" }}
                              initialValue={data ? data.ceoAdmin : null}
                              name="ceoAdmin"
                            >
                              <AutoComplete
                                options={options}
                                style={{
                                  width: 200,
                                  padding: "5px",
                                }}
                                onSelect={onSelect}
                                onSearch={onSearch}
                                size="large"

                                placeholder="Enter CEO Name"
                              />
                            </Form.Item>

                          </>
                        )}
                      </div>
                    </Col>
                    <Col span={24}>
                      {editContactInfo === true ? (
                        <Row
                          gutter={[16, 16]}
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
                              onClick={() => showEditContactInfo(false)}
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
                              }}
                            >
                              <CheckOutlined /> SAVE
                            </Button>
                          </Col>
                        </Row>
                      ) : null}
                      {editContactInfo == false && <div></div>}
                    </Col>
                  </Row>
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
          marginBottom: "10px",
        }}
      >
        <Form
          style={{
            width: "75%",
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
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: "default",
              }}
            >
              <Row>
                <Col span={24}>
                  <p>HR Admin's permissions apply to all employees.</p>
                  <p>This admin can:</p>
                  <div className="div-text" style={{ paddingLeft: "20px" }}>
                    <Text>
                      View all employee profile information,
                      <br />
                      View sensitive employee information (such as PAN Card, IDs and
                      salary,)
                      <br />
                      Edit employee profiles,
                      <br />
                      Edit, Upload and Approve Attendance and Leaves,
                      <br />
                      Create and remove admins, and edit admin permissions.
                    </Text>
                  </div>
                </Col>

                <Col style={{ display: "inline-block" }} >
                  <div>
                    {editHrContactInfo === false ? (
                      !data.hrAdmin ? (
                        <>
                          <Button
                            style={{
                              background: "#1963a6",
                              border: "1px solid #1963A6",
                            }}
                            type="primary"
                            onClick={() => {
                              showEditHrContactInfo(!editHrContactInfo);
                            }}
                          >
                            <PlusCircleOutlined />
                            Add
                          </Button>
                        </>
                      ) : (
                        <>
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "50px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              // padding:"5px",
                              fontSize: "25px",
                              fontWeight: "lighter",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "25px",
                                backgroundColor: "aqua",
                                width: "50px",
                                height: "50px",
                                margin: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              HR </div>
                            <span style={{ marginRight: "10px" }}>
                              {data.hrAdmin ? data.hrAdmin : null}
                            </span>

                          </div>
                          {editHrContactInfo === false ? (
                            <Button
                              type="text"
                              className="edit"
                              style={{
                                background: "#1963a6",
                                border: "1px solid #1963A6",
                                color: "#ffff",
                              }}
                              onClick={() =>
                                showEditHrContactInfo(!editHrContactInfo)
                              }
                            >
                              <EditFilled /> Change
                            </Button>
                          ) : null}
                        </>
                      )
                    ) : (
                      <Form.Item
                        style={{ marginTop: "10px" }}
                        initialValue={data ? data.hrAdmin : null}
                        name="hrAdmin"
                      >
                        <AutoComplete
                          options={options}
                          style={{
                            width: 200,
                            padding: "5px",
                          }}
                          onSelect={onSelect}
                          onSearch={onSearch}
                          size="large"

                          placeholder="Enter HR Admin Name"
                        />
                      </Form.Item>

                    )}
                  </div>
                </Col>
                <Col span={24}>
                  {editHrContactInfo === true ? (
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
                          onClick={() => showEditHrContactInfo(false)}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                      </Col>
                      <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{
                            fontSize: 15,
                            marginLeft: "10px",
                            background: "#1963a6",
                            border: "1px solid #1963A6",
                          }}
                        >
                          <CheckOutlined /> SAVE
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                  {editHrContactInfo == false && <div></div>}
                </Col>
              </Row>
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
          marginBottom: "10px",
        }}
      >
        <Form
          style={{
            width: "75%",
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
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: "default",
              }}
            >
              <Row>
                <Col span={24}>
                  <p>Finance admin's permissions apply to all employees.</p>
                  <p>This admin can:</p>
                  <div className="div-text" style={{ paddingLeft: "20px" }}>
                    <Text>
                      View salary and bank details of employee profiles,
                      <br />
                      View sensitive employee information (such as PAN Card, IDs and
                      salary.)
                      <br />
                    </Text>
                  </div>
                </Col>

                <Col style={{ display: "inline-block" }}>
                  <div>
                    {editFinanceContactInfo === false ? (
                      !data.financerAdmin ? (
                        <Button
                          style={{
                            background: "#1963a6",
                            border: "1px solid #1963A6",
                          }}
                          type="primary"
                          onClick={() =>
                            showEditFinanceContactInfo(!editFinanceContactInfo)
                          }
                        >
                          <PlusCircleOutlined />
                          Add
                        </Button>
                      ) : (
                        <>
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "50px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              // padding:"5px",
                              fontSize: "25px",
                              fontWeight: "lighter",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "25px",
                                backgroundColor: "aqua",
                                width: "50px",
                                height: "50px",
                                margin: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              FA
                            </div>
                            <span style={{ marginRight: "10px" }}>{data.financerAdmin ? data.financerAdmin : "-"}</span>
                          </div>
                          {editFinanceContactInfo === false ? (
                            <Button
                              type="text"
                              className="edit"
                              style={{
                                background: "#1963a6",
                                border: "1px solid #1963A6",
                                color: "#ffff",
                              }}
                              onClick={() =>
                                showEditFinanceContactInfo(
                                  !editFinanceContactInfo
                                )
                              }
                            >
                              <EditFilled /> Change
                            </Button>
                          ) : null}
                        </>
                      )
                    ) : (
                      <Form.Item
                        style={{ marginTop: "10px" }}
                        initialValue={data ? data.financerAdmin : null}
                        name="financerAdmin"
                      >
                        <AutoComplete
                          options={options}
                          style={{
                            width: 200,
                            padding: "5px",
                          }}
                          onSelect={onSelect}
                          onSearch={onSearch}
                          size="large"

                          placeholder="Enter Finance Admin Name"
                        />
                      </Form.Item>

                    )}
                  </div>
                </Col>
                <Col span={24}>
                  {editFinanceContactInfo === true ? (
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
                          onClick={() => showEditFinanceContactInfo(false)}
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
                          }}
                        >
                          <CheckOutlined />
                          SAVE
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                  {
                    editFinanceContactInfo == false && <></>
                    // <Button
                    // style={{ background: "#1963a6",border: "1px solid #1963A6"}}
                    // type="primary"
                    //   onClick={() => showEditFinanceContactInfo(!editFinanceContactInfo)}
                    // >
                    //   <PlusCircleOutlined />
                    //   Add
                    // </Button>
                  }
                </Col>
                {/* ----------------------newCode------------------------ */}
              </Row>
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
          marginBottom: "10px",
        }}
      >
        <Form
          style={{
            width: "75%",
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
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: "default",
              }}
            >
              <Row>
                <Col span={24}>
                  <p>HR Executive's permissions apply to all employees.</p>
                  <p>This admin can:</p>
                  <div className="div-text" style={{ paddingLeft: "20px" }}>
                    <Text>
                      View all employee profile information (Non-payroll),
                      <br />
                      View all employee profile information (Non-payroll),
                      <br />
                      Add and edit employee profiles,
                      <br />
                      Edit, Upload and Approve Attendance and Leaves,
                      <br />
                      This Admin will not have any payroll access.
                      <br />
                    </Text>
                  </div>
                </Col>

                <Col style={{ display: "inline-block" }}>
                  <div>
                    {editExecutiveContactInfo === false ? (
                      !data.hrExeAdmin ? (
                        <Button
                          style={{
                            background: "#1963a6",
                            border: "1px solid #1963A6",
                          }}
                          type="primary"
                          onClick={() =>
                            showEditExecutiveContactInfo(
                              !editExecutiveContactInfo
                            )
                          }
                        >
                          <PlusCircleOutlined />
                          Add
                        </Button>
                      ) : (
                        <>
                          <div
                            style={{
                              border: "1px solid #ccc",
                              borderRadius: "50px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              // padding:"5px",
                              fontSize: "25px",
                              fontWeight: "lighter",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <div
                              style={{
                                border: "1px solid #ccc",
                                borderRadius: "25px",
                                backgroundColor: "aqua",
                                width: "50px",
                                height: "50px",
                                margin: "10px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >HR</div>
                            <span style={{ marginRight: "10px" }}>{data.hrExeAdmin ? data.hrExeAdmin : "-"}</span>
                          </div>
                          {editExecutiveContactInfo === false ? (
                            <Button
                              type="text"
                              className="edit"
                              style={{
                                background: "#1963a6",
                                border: "1px solid #1963A6",
                                color: "#ffff",
                              }}
                              onClick={() =>
                                showEditExecutiveContactInfo(
                                  !editExecutiveContactInfo
                                )
                              }
                            >
                              <EditFilled /> Change
                            </Button>
                          ) : null}
                        </>
                      )
                    ) : (
                      <Form.Item
                        style={{ marginTop: "10px" }}
                        initialValue={data ? data.hrExeAdmin : null}
                        name="hrExeAdmin"
                      >
                        <AutoComplete
                          options={options}
                          style={{
                            width: 200,
                            padding: "5px",
                          }}
                          onSelect={onSelect}
                          onSearch={onSearch}
                          size="large"

                          placeholder="Enter HR Executive Name"
                        />

                      </Form.Item>
                    )}
                  </div>
                </Col>
                <Col span={24}>
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
                            width: "119px",
                          }}
                        >
                          <CheckOutlined /> SAVE
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                  {editExecutiveContactInfo == false && <></>}
                </Col>
              </Row>

            </Card>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Admin;
