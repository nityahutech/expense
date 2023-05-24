import { useState, useEffect } from "react";
import { Typography } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import CompanyProContext from "../../contexts/CompanyProContext";
import { getUsers, showNotification } from "../../contexts/CreateContext";
import "./companystyle.css";
import {
  Button,
  Col,
  Modal,
  Form,
  Row,
  Card,
  Space,
  notification,
  Skeleton,
  Table,
  Input,
  Select,
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
  const [accessType, setAccessType] = useState(null);
  const [accessUsers, setAccessUsers] = useState();
  const [updateEmpNames, setUpdateEmpNames] = useState("");
  const [hrExAdmins, setHrExAdmins] = useState([]);
  const [options, setOptions] = useState([]);
  const [editAccessModal, setEditAccessModal] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setEditAccessModal(true);
  };
  const handleOk = () => {
    setEditAccessModal(false);
  };
  const handleCancel = () => {
    setAccessUsers("");
    setEditAccessModal(false);
    form.resetFields();
  };

  const handleEmpInputChange = (e) => {
    setAccessUsers(e.target.value);
  };

  const updateExcessDetails = () => {
    setUpdateEmpNames(accessUsers);
  };

  const onFinish = (type) => {
    const valuesToservice = {
      [`${type}`]: type == "ceoAdmin" ? ceoAdmin.value : hrAdmin.value,
    };
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
    let hrExPower = [];

    for (let i = 0; i < values.hrExeUser.length && i < 3; i++) {
      hrExPower.push(values.hrExeUser[i].hrExeAdmin);
    }
    const value = {
      hrExeAdmin: hrExPower,
    };
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
    // setFinanceAdmins(finTemp);
    setHrExAdmins(hrTemp);
    setLoading(false);
  };
  console.log("testt");

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

  const getColor = (index) => {
    const backgroundColor = [
      "aqua",
      "#2196F3",
      "#009688",
      "#8BC34A",
      "#FFEB3B",
    ];
    return backgroundColor[index % backgroundColor.length];
  };

  const imageStyle = {
    border: "1px solid #ccc",
    borderRadius: "25px",
    backgroundColor: "aqua",
    width: "30px",
    height: "30px",
    margin: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const divStyle = {
    border: "1px solid #ccc",
    borderRadius: "50px",
    marginTop: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    fontWeight: "lighter",
    display: "inline-flex",
    width: "auto",
    alignItems: "center",
    flexDirection: "row",
    marginRight: "10px",
  };
  console.log("financeadmin", financeAdmins);

  const columns = [
    {
      title: "Access",
      dataIndex: "access",
      key: "access",
      width: 90,
      align: "center",
      // render: (access) => (
      //   <div>
      //     {access.map((data) => (
      //       <div key={data} style={{ marginBottom: "1.5rem" }}>
      //         {data}
      //       </div>
      //     ))}
      //   </div>
      // ),
    },
    {
      title: "Employees Name",
      dataIndex: "employees",
      key: "employees",
      // width: 500,
      align: "center",
      render: (_, { employees }) => (
        <div style={{ textAlign: "left" }}>
          {employees.map((x, i) => (
            <div style={divStyle} key={i}>
              {" "}
              {x.profilePic ? (
                <img style={imageStyle} src={x.profilePic} />
              ) : (
                <div
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "25px",
                    // backgroundColor: getColor(),
                    width: "30px",
                    height: "30px",
                    margin: "3px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: getColor(i),
                  }}
                  // className="empImg"
                >
                  {getInitials(x.name)}
                </div>
              )}
              <span style={{ marginRight: "10px" }}>{x.name}</span>
            </div>
          ))}
        </div>

        // <div
        //   style={{
        //     display: "flex",
        //     flexDirection: "column",
        //     alignItems: "flex-end",
        //   }}
        // >
        //   {employees.map((data, index) => (
        //     <div key={data}>
        //       {record.showInput !== index && (
        //         <Button
        //           style={{ marginTop: "20px" }}
        //           type="primary"
        //           onClick={() => handleIconClick(record.key, index)}
        //         >
        //           <PlusCircleOutlined />
        //           Add
        //         </Button>
        //       )}
        //       {record.showInput === index && (
        //         <>
        //           <Form.List
        //             name="users"
        //             initialValue={[...financeAdmins]}
        //             key={index}
        //           >
        //             {(fields, { add, remove }) => (
        //               <>
        //                 {fields
        //                   .slice(0, 5)
        //                   .map(({ key, name, ...restField }) => (
        //                     <Space
        //                       key={key}
        //                       style={{
        //                         display: "flex",
        //                         // marginBottom: 8,
        //                       }}
        //                       align="baseline"
        //                     >
        //                       <Form.Item
        //                         // style={{ marginTop: "10px" }}
        //                         initialValue={
        //                           data.financerAdmin != null
        //                             ? data.financerAdmin[key]
        //                             : ""
        //                         }
        //                         {...restField}
        //                         name={[name, "financerAdmin"]}
        //                       >
        //                         <AutoComplete
        //                           // options={options}
        //                           style={{
        //                             width: 100,
        //                             padding: "5px",
        //                           }}
        //                           onSearch={onSearch}
        //                           size="large"
        //                           placeholder="Enter Finance Admin Name"
        //                         />
        //                       </Form.Item>

        //                       <MinusCircleOutlined
        //                         onClick={() => remove(name)}
        //                       />
        //                     </Space>
        //                   ))}
        //                 {console.log(fields.length)}
        //                 {fields.length > 5 ? (
        //                   <Space>
        //                     <Button>Save</Button>
        //                     <Button>Cancel</Button>
        //                   </Space>
        //                 ) : (
        //                   <Form.Item>
        //                     <Button
        //                       type="dashed"
        //                       onClick={() => add()}
        //                       block
        //                       icon={<PlusOutlined />}
        //                     >
        //                       Add field
        //                     </Button>
        //                   </Form.Item>
        //                 )}
        //               </>
        //             )}
        //           </Form.List>
        //         </>
        //       )}
        //     </div>
        //   ))}
        // </div>
      ),
    },
  ];
  const rowStyle = { border: "1px solid #ddd" };

  let temp = {
    Leave: [
      { name: "Swetha Vijay", profilePic: null },
      { name: "Ekta Dewangan", profilePic: null },
      { name: "Swetha Vijay", profilePic: null },
      { name: "Ekta Dewangan", profilePic: null },
      { name: "Ekta Dewangan", profilePic: null },
    ],
    Attendance: [],
    Assets: [],
    Invoices: [{ name: "Ekta Dewangan", profilePic: null }],
    Travels: [
      { name: "Swetha Vijay", profilePic: null },
      { name: "Ekta Dewangan", profilePic: null },
    ],
    Templates: [],
    Payroll: [{ name: "Swetha Vijay", profilePic: null }],
    "Employee Onboard": [],
    "Employee List": [],
    Expenses: [],
  };

  console.log(temp.Leave);

  let tempData = Object.keys(temp).map((x) => {
    return {
      access: x,
      employees: temp[x],
    };
  });

  console.log(tempData);

  const initialValue = tempData
    .flatMap((item) => item.employees)
    .map((employee) => employee.name)
    .join(", ");

  console.log(initialValue);

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
                      <p>CEO is the head of the organization.</p>
                      <p>CEO's permissions apply to all employees.</p>
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
          initialValues={{
            remember: true,
          }}
          fields={[]}
          autoComplete="off"
          onFinish={updateExcessDetails}
          form={form}
          layout="Horizontal"
        >
          {loading ? (
            <Skeleton active />
          ) : (
            <div className="site-card-border-less-wrapper">
              <Card
                className="financeCard"
                title="Access Details"
                bordered={true}
                hoverable={true}
                style={{
                  width: "auto",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
                extra={
                  <>
                    <Button
                      className="edit"
                      type="text"
                      style={{
                        color: "#ffff",
                        display: "none",
                        paddingTop: "2px",
                        paddingRight: "10px",
                        position: "absolute",
                        right: 10,
                        top: 10,
                      }}
                    >
                      <EditFilled onClick={showModal} />
                    </Button>
                  </>
                }
              >
                <Table
                  className="daily daily-table"
                  columns={columns}
                  dataSource={tempData}
                  bordered
                  pagination={false}
                />
                <Modal
                  className="accessModal"
                  title="Update Access Details"
                  open={editAccessModal}
                  footer={false}
                  style={{ height: "400px" }}
                  // onOk={handleOk}
                  onCancel={handleCancel}
                  closeIcon={
                    <div
                      onClick={() => {
                        handleCancel();
                      }}
                      style={{ color: "#ffffff" }}
                    >
                      X
                    </div>
                  }
                >
                  <Form.Item name="accessList" label="Access List">
                    <Select
                      onChange={(selected) => {
                        const selectedEmployees = tempData
                          ?.filter((t) => t?.access === selected)?.[0]
                          ?.employees?.map((e) => e.name)
                          ?.toString();
                        console.log({ selectedEmployees });
                        setAccessUsers(selectedEmployees);
                      }}
                      placeholder="Please Select Access Details"
                      options={tempData.map((x) => {
                        return {
                          value: x.access,
                          label: x.access,
                        };
                      })}
                    />
                  </Form.Item>
                  {console.log("tempp", accessType)}
                  {accessUsers && (
                    <Form.Item label="Employees">
                      <Input
                        onChange={handleEmpInputChange}
                        // defaultValue={accessUsers}
                        value={accessUsers}
                      />
                    </Form.Item>
                  )}
                  <Space
                    style={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      onClick={handleCancel}
                      className="accessModalCancel"
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleOk} className="accessModalSubmit">
                      Submit
                    </Button>
                  </Space>
                </Modal>
              </Card>

              {/* <Card
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
              </Card> */}
            </div>
          )}
        </Form>
      </div>

      {/* <div
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
      </div> */}
    </>
  );
};

export default Admin;
