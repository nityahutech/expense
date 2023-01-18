import { useState, useEffect } from "react";
import { Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import CompanyProContext from "../../contexts/CompanyProContext";
import { getUsers } from "../../contexts/CreateContext";
import "./companystyle.css";
import {
  Button,
  Col,
  Form,
  Row,
  Card,
  Space,
  notification
} from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditFilled,
} from "@ant-design/icons";
import { AutoComplete } from 'antd';

const { Text } = Typography;
const Admin = () => {
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editHrContactInfo, showEditHrContactInfo] = useState(false);
  const [editFinanceContactInfo, showEditFinanceContactInfo] = useState(false);
  const [editExecutiveContactInfo, showEditExecutiveContactInfo] =
    useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId");
 
  const [allEmpName, setAllEmpName] = useState([]);
  const [ceoAdmin, setCeoAdmin] = useState('');
  const [ceoAdminImg, setCeoAdminImg] = useState('');

  const [financeAdmins, setFinanceAdmins] = useState([]);

  const [hrAdminImg, setHrAdminImg] = useState('');
  const [hrExAdmins, setHrExAdmins] = useState([]);

  const [curHrExe, setCurHrExe] = useState([]);


  //------------------------------------------------------ceo
  const onFinish = (values) => {
    const valuesToservice = {
      ceoAdmin: ceoAdmin,
    };
    CompanyProContext.updateCompInfo(compId, valuesToservice).then((res) => {
      showNotification("success", "Success", "CEO Added ")
      getData();
    })

    form.resetFields();
    getData(allEmpName);
    showEditContactInfo(false);
  };
  //------------------------------------------------------hrAdmin
  const onHRFinish = (values) => {
    console.log('valueshr', values)


    const value = {
      hrAdmin: values.hrAdmin,

    }
    CompanyProContext.updateCompInfo(compId, value).then((res) => {
      showNotification("success", "Success", "Hr Admin Added ")
      getData();
    })
    getData(allEmpName);
    showEditHrContactInfo(false);

  };
  //------------------------------------------------------financerAdmin
  const onFinanceFinish = (values) => {
    console.log('valuesFin', values)
    let finPower = []

    for (let i = 0; i < values.users.length && i < 3; i++) {
      finPower.push(values.users[i].financerAdmin)
    }
    const value = {
      financerAdmin: finPower,
    };
    console.log('valuesFin1', value)
    CompanyProContext.updateCompInfo(compId, value).then((res) => {
      showNotification("success", "Success", "Finnance Admin Added ")
      getData();
    })
    getData(allEmpName);
    showEditFinanceContactInfo(false);
  };
  //------------------------------------------------------hrExeAdmin
  const onHRExeFinish = (values) => {
    console.log('valuesHrEx', values)

    let hrExPower = []

    for (let i = 0; i < values.hrExeUser.length && i < 3; i++) {
      hrExPower.push(values.hrExeUser[i].hrExeAdmin)
    }
    const value = {
      hrExeAdmin: hrExPower,
    };
    console.log('valueshr', value)
    CompanyProContext.updateCompInfo(compId, value).then((res) => {
      showNotification("success", "Success", "Hr Executive Added ")
      getData();
    })

    getData(allEmpName);
    showEditExecutiveContactInfo(false);
  };

  useEffect(() => {
    getAllUser()
  }, []);

  const getData = async (allUsers) => {
    let compProfile = await CompanyProContext.getCompanyProfile(compId);
    setData(compProfile);
    setCurHrExe(compProfile.hrExeAdmin)
    let ceoImageUrl = null
    console.log('aaaaaaaaa', compProfile)
    const filteredArray = allUsers.filter(element => compProfile.financerAdmin?.includes(element.value));
    console.log('financerAdmin', filteredArray)
    setFinanceAdmins(filteredArray)

    const filteredArrayHrExe = allUsers.filter(element => compProfile.hrExeAdmin?.includes(element.value));
    console.log('hrExeAdmin', filteredArrayHrExe)
    setHrExAdmins(filteredArrayHrExe)

    for (let i = 0; i < allUsers?.length; i++) {
      console.log('data2', allUsers[i])
      let empName = allUsers[i].value
      if (empName === compProfile.ceoAdmin) {
        setCeoAdminImg(allUsers[i].profilePic)
      }
      else if (empName === compProfile.hrAdmin) {
        setHrAdminImg(allUsers[i].profilePic)
      }
    }

    console.log('data3', ceoImageUrl)
  };

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
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
    console.log('allUsers', allData)
    let allUsers = allData.docs.map((doc, i) => {
      return {
        value: doc.data().fname + ' ' + doc.data().lname,
        profilePic: doc.data().profilePic,

      };
    });
    console.log('allUsers', allUsers)
    setAllEmpName(allUsers)
    getData(allUsers);

  }

  function getInitials(text) {
    const myArray = text.split(" ");
    let initials = myArray[0][0] + myArray[myArray.length - 1][0]
    return initials;
  }
  /************* style **************************/
  const imageStyle = {
    border: "1px solid #ccc",
    borderRadius: "25px",
    backgroundColor: "aqua",
    width: "50px",
    height: "50px",
    margin: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }

  const divStyle = {

    border: "1px solid #ccc",
    borderRadius: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    // padding:"5px",
    fontSize: "25px",
    fontWeight: "lighter",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginRight: '10px'


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
                                  marginTop: "10px",
                                  background: "#1963a6",
                                  border: "1px solid #1963A6",
                                  color: "#ffff",
                                }}
                                onClick={() => {
                                  showEditContactInfo(!editContactInfo);
                                }}
                              >
                                <EditFilled /> Change
                              </Button>
                            </>
                          ) : (
                            <>
                              <div
                                style={divStyle}
                              > {
                                  ceoAdminImg ? <img
                                    style={imageStyle}
                                    src={ceoAdminImg}
                                    alt={getInitials(data.ceoAdmin)}

                                  /> : <div style={imageStyle}>{getInitials(data.ceoAdmin)}</div>
                                }

                                <span style={{ marginRight: "10px" }}>
                                  {data.ceoAdmin ? data.ceoAdmin : "-"}</span>
                              </div>

                              {editContactInfo == false ? (
                                <Button
                                  style={{
                                    marginTop: "10px",
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
                              marginTop: "10px",
                              background: "#1963a6",
                              border: "1px solid #1963A6",
                              color: "#ffff",
                            }}
                            onClick={() => {
                              showEditHrContactInfo(!editHrContactInfo);
                            }}
                          >
                            <EditFilled /> Change
                          </Button>

                        </>
                      ) : (
                        <>
                          <div style={{ display: 'flex' }}>
                            <Row style={{ display: 'flex' }}>
                              <Col
                                style={divStyle}
                              >
                                {
                                  hrAdminImg ? <img
                                    style={imageStyle}
                                    src={hrAdminImg}
                                    alt={getInitials(data.hrAdmin)}

                                  />
                                    :
                                    <div style={imageStyle}>
                                      {getInitials(data.hrAdmin)}

                                    </div>
                                }

                                <span style={{ marginRight: "10px" }}>
                                  {data.hrAdmin ? data.hrAdmin : "-"}
                                </span>
                              </Col>

                            </Row>
                          </div>
                          {editHrContactInfo == false ? (
                            <Button
                              style={{
                                marginTop: "10px",
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
                      <>

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



                      </>

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
          fields={[

          ]}
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
                            marginTop: "10px",
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
                          <div style={{ display: 'flex' }}>
                            <Row style={{ display: 'flex' }}>

                              {financeAdmins?.map((person) => (
                                <div
                                  style={divStyle}
                                > {
                                    person.profilePic ? <img
                                      style={imageStyle}
                                      src={person.profilePic}
                                      alt={getInitials(person.value)}

                                    /> : <div style={imageStyle}>{getInitials(person.value)}</div>
                                  }

                                  <span style={{ marginRight: "10px" }}>
                                    {person.value ? person.value : "-"}</span>
                                </div>
                              ))}
                            </Row>

                          </div>

                          {editFinanceContactInfo === false ? (
                            <Button
                              type="text"
                              className="edit"
                              style={{
                                marginTop: "10px",
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
                      <>


                        <Form.List name="users">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.slice(0, 3).map(({ key, name, ...restField }) => (
                                <Space
                                  key={key}
                                  style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                  }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    style={{ marginTop: "10px" }}
                                    initialValue={data.financerAdmin != null ? data.financerAdmin[key] : ''}
                                    // {...restField}
                                    name={[name, 'financerAdmin']}
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

                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>

                      </>

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

                  }
                </Col>
                {/* ----------------------newCode------------------------ */}
              </Row>
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
                            marginTop: "10px",
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
                          <div style={{ display: 'flex' }}>
                            <Row style={{ display: 'flex' }}>

                              {hrExAdmins?.map((personHrExe) => (
                                <div
                                  style={divStyle}
                                > {
                                    personHrExe.profilePic ? <img
                                      style={imageStyle}
                                      src={personHrExe.profilePic}
                                      alt={getInitials(personHrExe.value)}

                                    /> : <div style={imageStyle}>{getInitials(personHrExe.value)}</div>
                                  }

                                  <span style={{ marginRight: "10px" }}>
                                    {personHrExe.value ? personHrExe.value : "-"}</span>
                                </div>
                              ))}
                            </Row>

                          </div>
                          {editExecutiveContactInfo === false ? (
                            <Button
                              type="text"
                              className="edit"
                              style={{
                                marginTop: "10px",
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
                      <>


                        <Form.List name="hrExeUser">
                          {(fields, { add, remove }) => (
                            <>
                              {fields.slice(0, 3).map(({ key, name, }) => (
                                <Space
                                  key={key}
                                  style={{
                                    display: 'flex',
                                    marginBottom: 8,
                                  }}
                                  align="baseline"
                                >
                                  <Form.Item
                                    style={{ marginTop: "10px" }}
                                    initialValue={data.hrExeAdmin != null ? data.hrExeAdmin[key] : ''}
                                    // {...restField}
                                    name={[name, 'hrExeAdmin']}
                                  // rules={[
                                  //   {
                                  //     required: true,
                                  //     message: "Please Enter Designation",
                                  //   },
                                  //   {
                                  //     validator: (rule, value, callback) => {
                                  //       console.log('lllllll', value, curHrExe)
                                  //       let exists = curHrExe?.includes(value);
                                  //       if (exists) {
                                  //         return Promise.reject(new Error("This designations already exists!"));
                                  //       }
                                  //       else {
                                  //         curHrExe.push(value)
                                  //         const uniqueArray = [...new Set(curHrExe)]
                                  //         setCurHrExe(uniqueArray)
                                  //       }
                                  //     },
                                  //     message: "This designation already exists!",
                                  //   }
                                  // ]}

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

                                  <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                              ))}
                              <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>

                      </>
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
