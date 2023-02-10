import { useState, useEffect } from "react";
import { Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CompanyProContext from "../../contexts/CompanyProContext";
import { getUsers, showNotification } from "../../contexts/CreateContext";
import "./companystyle.css";
import {
  Button,
  Col,
  Form,
  Row,
  Card,
  Space,
  notification,
  Skeleton,
} from "antd";
import {
  PlusCircleOutlined,
  CloseOutlined,
  CheckOutlined,
  EditFilled,
} from "@ant-design/icons";
import { AutoComplete } from "antd";

const { Text } = Typography;
const Admin = () => {
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editHrContactInfo, showEditHrContactInfo] = useState(false);
  const [editFinanceContactInfo, showEditFinanceContactInfo] = useState(false);
  const [editExecutiveContactInfo, showEditExecutiveContactInfo] =
    useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const compId = sessionStorage.getItem("compId");
  const [allEmpName, setAllEmpName] = useState([]);
  const [ceoAdmin, setCeoAdmin] = useState();
  const [hrAdmin, setHrAdmin] = useState();
  const [financeAdmins, setFinanceAdmins] = useState([]);
  const [hrExAdmins, setHrExAdmins] = useState([]);
  const [options, setOptions] = useState([]);

  const onFinish = (type) => {
    const valuesToservice = {
      [`${type}`]: type == "ceoAdmin" ? ceoAdmin.value : hrAdmin.value,
    };
    console.log(valuesToservice);
    CompanyProContext.updateCompInfo(compId, valuesToservice).then((res) => {
      showNotification(
        "success",
        "Success",
        `${type == "ceoAdmin" ? "CEO" : "HR Admin"} Changed`
      );
    });
    showEditContactInfo(false);
    showEditHrContactInfo(false);
  };

  const onFinanceFinish = (values) => {
    let finPower = [];

    for (let i = 0; i < values.users.length && i < 3; i++) {
      finPower.push(values.users[i].financerAdmin);
    }
    const value = {
      financerAdmin: finPower,
    };
    CompanyProContext.updateCompInfo(compId, value).then((res) => {
      showNotification("success", "Success", "Finnance Admin Added ");
      getData();
    });
    showEditFinanceContactInfo(false);
  };

  const onHRExeFinish = (values) => {
    console.log("valuesHrEx", values);

    let hrExPower = [];

    for (let i = 0; i < values.hrExeUser.length && i < 3; i++) {
      hrExPower.push(values.hrExeUser[i].hrExeAdmin);
    }
    const value = {
      hrExeAdmin: hrExPower,
    };
    console.log("valueshr", value);
    CompanyProContext.updateCompInfo(compId, value).then((res) => {
      showNotification("success", "Success", "Hr Executive Added ");
      getData();
    });

    getData();
    showEditExecutiveContactInfo(false);
  };

  useEffect(() => {
    getAllUser();
  }, []);

  const getData = async (allUserData) => {
    setLoading(true);
    let allUsers = allUserData || allEmpName;
    let compProfile = await CompanyProContext.getCompanyProfile(compId);
    setData(compProfile);
    let finTemp = [],
      hrTemp = [];
    allUsers.forEach((emp) => {
      console.log(emp);
      if (emp.value == compProfile.ceoAdmin) {
        setCeoAdmin(emp);
      }
      if (emp.value == compProfile.hrAdmin) {
        setHrAdmin(emp);
      }
      if (compProfile.financerAdmin?.includes(emp.value)) {
        finTemp.push(emp);
      }
      if (compProfile.hrExeAdmin?.includes(emp.value)) {
        hrTemp.push(emp);
      }
    });
    setFinanceAdmins(finTemp);
    setHrExAdmins(hrTemp);
    setLoading(false);
  };

  const onSearch = (searchText) => {
    let matchingName = allEmpName.filter((ex) => {
      return ex.value.toLowerCase().includes(searchText.toLowerCase());
    });
    setOptions(!searchText ? [] : matchingName);
  };

  async function getAllUser() {
    const allData = await getUsers();
    let allUsers = allData.docs.map((doc, i) => {
      return {
        value: doc.data().fname + " " + doc.data().lname,
        profilePic: doc.data().profilePic,
      };
    });
    setAllEmpName(allUsers);
    getData(allUsers);
  }

  function getInitials(text) {
    const myArray = text.split(" ");
    let initials = myArray[0][0] + myArray[myArray.length - 1][0];
    return initials;
  }

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
  };

  const divStyle = {
    border: "1px solid #ccc",
    borderRadius: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "25px",
    fontWeight: "lighter",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginRight: "10px",
  };

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
            {loading ? (
              <Skeleton active />
            ) : (
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
                    <Col style={{ display: "inline-block" }}>
                      <div>
                        {editContactInfo === false ? (
                          !ceoAdmin ? (
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
                              <EditFilled /> Add
                            </Button>
                          ) : (
                            <>
                              <div style={divStyle}>
                                {" "}
                                {ceoAdmin.profilePic ? (
                                  <img
                                    style={imageStyle}
                                    src={ceoAdmin.profilePic}
                                  />
                                ) : (
                                  <div style={imageStyle}>
                                    {getInitials(ceoAdmin.value)}
                                  </div>
                                )}
                                <span style={{ marginRight: "10px" }}>
                                  {ceoAdmin ? ceoAdmin.value : "-"}
                                </span>
                              </div>
                              <Button
                                style={{
                                  marginTop: "10px",
                                  background: "#1963a6",
                                  border: "1px solid #1963A6",
                                  color: "#ffff",
                                }}
                                onClick={() => showEditContactInfo(true)}
                              >
                                <EditFilled /> Changed
                              </Button>
                            </>
                          )
                        ) : (
                          <AutoComplete
                            options={options}
                            style={{
                              width: 200,
                              padding: "5px",
                              marginTop: "10px",
                            }}
                            onSelect={(data) => {
                              let temp = allEmpName.filter(
                                (emp) => emp.value == data
                              );
                              setCeoAdmin(temp[0]);
                            }}
                            onSearch={onSearch}
                            size="large"
                            placeholder="Enter CEO Name"
                          />
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
                              onClick={() => onFinish("ceoAdmin")}
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
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
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
            {loading ? (
              <Skeleton />
            ) : (
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

                    <Col style={{ display: "inline-block" }}>
                      <div>
                        {editHrContactInfo === false ? (
                          !hrAdmin ? (
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
                                <EditFilled /> Add
                              </Button>
                            </>
                          ) : (
                            <>
                              <div style={{ display: "flex" }}>
                                <Row style={{ display: "flex" }}>
                                  <Col style={divStyle}>
                                    {hrAdmin.profilePic ? (
                                      <img
                                        style={imageStyle}
                                        src={hrAdmin.profilePic}
                                      />
                                    ) : (
                                      <div style={imageStyle}>
                                        {getInitials(hrAdmin.value)}
                                      </div>
                                    )}

                                    <span style={{ marginRight: "10px" }}>
                                      {hrAdmin ? hrAdmin.value : "-"}
                                    </span>
                                  </Col>
                                </Row>
                              </div>
                              <Button
                                style={{
                                  marginTop: "10px",
                                  background: "#1963a6",
                                  border: "1px solid #1963A6",
                                  color: "#ffff",
                                }}
                                onClick={() => showEditHrContactInfo(true)}
                              >
                                <EditFilled /> Change
                              </Button>
                            </>
                          )
                        ) : (
                          <AutoComplete
                            options={options}
                            style={{
                              width: 200,
                              padding: "5px",
                              marginTop: "10px",
                            }}
                            onSelect={(data) => {
                              let temp = allEmpName.filter(
                                (emp) => emp.value == data
                              );
                              setHrAdmin(temp[0]);
                            }}
                            onSearch={onSearch}
                            size="large"
                            placeholder="Enter HR Admin Name"
                          />
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
                              onClick={() => onFinish("hrAdmin")}
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
                    </Col>
                  </Row>
                </Card>
              </div>
            )}
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
          labelcol={{
            span: 4,
          }}
          wrappercol={{
            span: 14,
          }}
          initialValues={{
            remember: true,
          }}
          fields={[]}
          autoComplete="off"
          onFinish={onFinanceFinish}
        >
          {loading ? (
            <Skeleton active />
          ) : (
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
                        View sensitive employee information (such as PAN Card,
                        IDs and salary.)
                        <br />
                      </Text>
                    </div>
                  </Col>

                  <Col style={{ display: "inline-block" }}>
                    <div>
                      {editFinanceContactInfo === false ? (
                        financeAdmins.length == 0 ? (
                          <Button
                            style={{
                              marginTop: "10px",
                              background: "#1963a6",
                              border: "1px solid #1963A6",
                            }}
                            type="primary"
                            onClick={() =>
                              showEditFinanceContactInfo(
                                !editFinanceContactInfo
                              )
                            }
                          >
                            <PlusCircleOutlined />
                            Add
                          </Button>
                        ) : (
                          <>
                            <div style={{ display: "flex" }}>
                              <Row style={{ display: "flex" }}>
                                {financeAdmins?.map((person) => (
                                  <div style={divStyle}>
                                    {" "}
                                    {person.profilePic ? (
                                      <img
                                        style={imageStyle}
                                        src={person.profilePic}
                                      />
                                    ) : (
                                      <div style={imageStyle}>
                                        {getInitials(person.value)}
                                      </div>
                                    )}
                                    <span style={{ marginRight: "10px" }}>
                                      {person.value ? person.value : "-"}
                                    </span>
                                  </div>
                                ))}
                              </Row>
                            </div>
                            <Button
                              type="text"
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
                          </>
                        )
                      ) : (
                        <>
                          <Form.List
                            name="users"
                            initialValue={[...financeAdmins]}
                          >
                            {(fields, { add, remove }) => (
                              <>
                                {fields
                                  .slice(0, 3)
                                  .map(({ key, name, ...restField }) => (
                                    <Space
                                      key={key}
                                      style={{
                                        display: "flex",
                                        marginBottom: 8,
                                      }}
                                      align="baseline"
                                    >
                                      <Form.Item
                                        style={{ marginTop: "10px" }}
                                        initialValue={
                                          data.financerAdmin != null
                                            ? data.financerAdmin[key]
                                            : ""
                                        }
                                        // {...restField}
                                        name={[name, "financerAdmin"]}
                                      >
                                        <AutoComplete
                                          options={options}
                                          style={{
                                            width: 200,
                                            padding: "5px",
                                          }}
                                          onSearch={onSearch}
                                          size="large"
                                          placeholder="Enter Finance Admin Name"
                                        />
                                      </Form.Item>

                                      <MinusCircleOutlined
                                        onClick={() => remove(name)}
                                      />
                                    </Space>
                                  ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                  >
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
                  </Col>
                </Row>
              </Card>
            </div>
          )}
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
          {loading ? (
            <Skeleton active />
          ) : (
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
                            <div style={{ display: "flex" }}>
                              <Row style={{ display: "flex" }}>
                                {hrExAdmins?.map((personHrExe) => (
                                  <div style={divStyle}>
                                    {" "}
                                    {personHrExe.profilePic ? (
                                      <img
                                        style={imageStyle}
                                        src={personHrExe.profilePic}
                                      />
                                    ) : (
                                      <div style={imageStyle}>
                                        {getInitials(personHrExe.value)}
                                      </div>
                                    )}
                                    <span style={{ marginRight: "10px" }}>
                                      {personHrExe.value
                                        ? personHrExe.value
                                        : "-"}
                                    </span>
                                  </div>
                                ))}
                              </Row>
                            </div>
                            <Button
                              type="text"
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
                          </>
                        )
                      ) : (
                        <>
                          <Form.List
                            name="hrExeUser"
                            initialValue={[...hrExAdmins]}
                          >
                            {(fields, { add, remove }) => (
                              <>
                                {fields.slice(0, 3).map(({ key, name }) => (
                                  <Space
                                    key={key}
                                    style={{
                                      display: "flex",
                                      marginBottom: 8,
                                    }}
                                    align="baseline"
                                  >
                                    <Form.Item
                                      style={{ marginTop: "10px" }}
                                      initialValue={
                                        data.hrExeAdmin != null
                                          ? data.hrExeAdmin[key]
                                          : ""
                                      }
                                      name={[name, "hrExeAdmin"]}
                                    >
                                      <AutoComplete
                                        options={options}
                                        style={{
                                          width: 200,
                                          padding: "5px",
                                        }}
                                        // onSelect={onSelect}
                                        onSearch={onSearch}
                                        size="large"
                                        placeholder="Enter HR Admin Name"
                                      />
                                    </Form.Item>

                                    <MinusCircleOutlined
                                      onClick={() => remove(name)}
                                    />
                                  </Space>
                                ))}
                                <Form.Item>
                                  <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    block
                                    icon={<PlusOutlined />}
                                  >
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
                  </Col>
                </Row>
              </Card>
            </div>
          )}
        </Form>
      </div>
    </>
  );
};

export default Admin;
