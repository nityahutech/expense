import { useEffect, useState } from "react";
import {
  Divider,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Form,
  Input,
  Card,
  Skeleton,
} from "antd";
import {
  DeleteOutlined,
  EditFilled,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "./departmentNew.css";
import { capitalize, showNotification } from "../../contexts/CreateContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";

// ------------------------------------------------------------------------------const part
const DepartmentNew = () => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [type, setType] = useState("Business Unit");
  const [parent, setParent] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  const [dataSource, setDataSource] = useState([]);
  const [editRecord, setEditRecord] = useState([]);
  const [data, setData] = useState();
  const compId = sessionStorage.getItem("compId");

  useEffect(() => {
    CompanyProContext.getCompanyProfile(compId).then((res) => {
      setData(res?.departments);
      getData(res?.departments);
    });
  }, []);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = (dept) => {
    setLoading(true);
    let d = dept || data;
    if (!d) {
      return;
    }
    let temp = [];
    let place = order.indexOf(type);
    let par =
      place == 0
        ? null
        : parent[`${order[1]}`].name +
          (place == 1
            ? ""
            : "/" +
              parent[`${order[2]}`].name +
              (place == 2 ? "" : "/" + parent[`${order[3]}`].name));
    d.map((d) => {
      if (d.type == type && d.parent == par) {
        temp.push(d);
      }
    });
    setDataSource(temp);
    setLoading(false);
  };

  const onFinish = (values) => {
    let temp = data;
    let place = order.indexOf(type);
    let par =
      place == 0
        ? null
        : parent[`${order[1]}`].name +
          (place == 1
            ? ""
            : "/" +
              parent[`${order[2]}`].name +
              (place == 2 ? "" : "/" + parent[`${order[3]}`].name));
    // temp.push({
    //   ...values,
    //   parent: par,
    //   type: type,
    // });
    // CompanyProContext.addCompInfo(compId, {
    //   departments: {
    //     ...values,
    //     parent: par,
    //     type: type,
    //   }
    // });
    // if (type == order[0]) {
    //   temp.push(
    //     {
    //       ...values,
    //       parent: values.name,
    //       type: order[1]
    //     },
    //     {
    //       ...values,
    //       parent: `${values.name}/${values.name}`,
    //       type: order[2]
    //     },
    //     {
    //       ...values,
    //       parent: `${values.name}/${values.name}/${values.name}`,
    //       type: order[3]
    //     },
    //   )
    //   CompanyProContext.addCompInfo(compId, {
    //     departments: {
    //       ...values,
    //       parent: values.name,
    //       type: order[1]
    //     }
    //   });
    //   CompanyProContext.addCompInfo(compId, {
    //     departments: {
    //       ...values,
    //       parent: `${values.name}/${values.name}`,
    //       type: order[2]
    //     }
    //   });
    //   CompanyProContext.addCompInfo(compId, {
    //     departments: {
    //       ...values,
    //       parent: `${values.name}/${values.name}/${values.name}`,
    //       type: order[3]
    //     }
    //   });
    // }
    switch (type) {
      case order[0]:
        temp.push({
          ...values,
          parent: null,
          type: order[0],
        });
        CompanyProContext.addCompInfo(compId, {
          departments: {
            ...values,
            parent: null,
            type: order[0],
          },
        });
        par = values.name;
      case order[1]:
        temp.push({
          ...values,
          parent: par,
          type: order[1],
        });
        CompanyProContext.addCompInfo(compId, {
          departments: {
            ...values,
            parent: par,
            type: order[1],
          },
        });
        par = par + `/${values.name}`;
      case order[2]:
        temp.push({
          ...values,
          parent: par,
          type: order[2],
        });
        CompanyProContext.addCompInfo(compId, {
          departments: {
            ...values,
            parent: par,
            type: order[2],
          },
        });
        par = par + `/${values.name}`;
      case order[3]:
        temp.push({
          ...values,
          parent: par,
          type: order[3],
        });
        CompanyProContext.addCompInfo(compId, {
          departments: {
            ...values,
            parent: par,
            type: order[3],
          },
        });
    }
    form.resetFields();
    setIsModalOpen(false);
    setData(temp);
    getData(temp);
  };

  const onFinishEdit = async (values) => {
    let ppl = await CompanyProContext.getAllUsersByOrg(
      compId,
      editRecord.name,
      editRecord.parent,
      type
    );
    let edited = data.map((d) => {
      if (d.parent == editRecord.parent && d.name == editRecord.name) {
        return {
          name: values.editname,
          description: values.editdescription,
          parent: d.parent,
          type: type,
        };
      }
      if (d.parent != null) {
        let par =
          editRecord.parent == null
            ? editRecord.name
            : `${editRecord.parent}/${editRecord.name}`;
        if (d.parent.startsWith(par)) {
          return {
            ...d,
            parent: d.parent.replace(editRecord.name, values.editname),
          };
        }
      }
      return d;
    });
    CompanyProContext.updateCompInfo(compId, { departments: edited });
    ppl.forEach((emp) => {
      EmpInfoContext.updateEduDetails(emp.id, {
        [`${type == "Business Unit" ? "businessUnit" : type.toLowerCase()}`]:
          values.editname,
      });
    });
    setEditRecord({});
    form1.resetFields();
    setIsEditModalOpen(false);
    setData(edited);
    getData(edited);
  };

  const deleteData = async (record) => {
    let ppl = await CompanyProContext.getAllUsersByOrg(
      compId,
      record.name,
      record.parent,
      type
    );
    if (ppl.length != 0) {
      showNotification("error", "Error", `This ${type} is not empty!`);
      return;
    }
    Modal.confirm({
      title: `Are you sure, you want to delete this ${type}?`,
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        let deleted = data.filter((d) => {
          if (d.parent == record.parent && d.name == record.name) {
            return false;
          }
          if (d.parent != null) {
            let par =
              record.parent == null
                ? record.name
                : `${record.parent}/${record.name}`;
            if (d.parent.startsWith(par)) {
              return false;
            }
          }
          return true;
        });
        CompanyProContext.updateCompInfo(compId, { departments: deleted });
        setData(deleted);
        getData(deleted);
      },
    });
  };

  function onReset() {
    form.resetFields();
    // form2.resetFields();
  }

  const columns = [
    // Table.EXPAND_COLUMN,
    {
      title: `${type} Name`,
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "left",
      render: (_, record) => (
        <a
          href="#"
          onClick={() => {
            let temp = order.indexOf(type) + 1;
            if (temp > 3) {
              return;
            }
            setType(order[temp]);
            let d = parent == null ? {} : parent;
            d[`${order[temp]}`] = {
              name: record.name,
              description: record.description,
            };
            setParent(order[temp] == order[0] ? null : d);
          }}
        >
          {record.name}
        </a>
      ),
    },

    {
      title: `${type} Description`,
      key: "description",
      dataIndex: "description",
      width: 300,
      align: "left",
      // responsive: ["md"],
      // render: (_, { status }) => getStatusUi(status),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 150,
      align: "left",
      render: (_, record) => {
        return (
          <>
            <Row gutter={[0, 0]}>
              <Col xs={22} sm={15} md={8}>
                <Button
                  className="editbuttononboard"
                  type="text"
                  style={{
                    color: " #007ACB",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "36px",
                    background: "#EEEEEE",
                    borderRadius: "10px",
                  }}
                  onClick={() => {
                    {
                      setEditRecord(record);
                      form1.resetFields();
                      setIsEditModalOpen(true);
                    }
                  }}
                >
                  <EditFilled />
                </Button>
              </Col>
              <Col xs={22} sm={15} md={8}>
                <Button
                  className="editbuttononboard"
                  type="text"
                  style={{
                    color: " #007ACB",
                    border: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "35px",
                    height: "36px",
                    background: "#EEEEEE",
                    borderRadius: "10px",
                  }}
                  onClick={() => deleteData(record)}
                >
                  <DeleteOutlined />
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  return (
    <>
      <div className="education">
        <Row className="Row-Card">
          <Col span={24}>
            {loading ? (
              <Skeleton active />
            ) : (
              <Card
                title="Organization"
                className="organisationCard"
                bordered={true}
                hoverable={true}
              >
                <div
                  style={{
                    margin: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "19px",
                        }}
                      >
                        <div>
                          <span
                            className="pathSymbol"
                            style={
                              type == "Business Unit"
                                ? { color: "black" }
                                : { color: "#007ACB" }
                            }
                            onClick={() => {
                              setType("Business Unit");
                              setParent(null);
                            }}
                          >
                            Business Unit
                          </span>
                          {type == order[0] ? null : (
                            <>
                              {" > "}
                              <span
                                className="pathSymbol"
                                style={
                                  type == "Division"
                                    ? { color: "black" }
                                    : { color: "#007ACB" }
                                }
                                onClick={() => {
                                  setType("Division");
                                  let temp = parent;
                                  delete temp[`${order[2]}`];
                                  delete temp[`${order[3]}`];
                                  setParent(temp);
                                }}
                              >
                                Division
                              </span>
                              {type == order[1] ? null : (
                                <>
                                  {" > "}
                                  <span
                                    className="pathSymbol"
                                    style={
                                      type == "Department"
                                        ? { color: "black" }
                                        : { color: "#007ACB" }
                                    }
                                    onClick={() => {
                                      setType("Department");
                                      let temp = parent;
                                      delete temp[`${order[3]}`];
                                      setParent(temp);
                                    }}
                                  >
                                    Department
                                  </span>
                                  {type == order[2] ? null : (
                                    <>
                                      {" > "}
                                      <span
                                        className="pathSymbol"
                                        style={
                                          type == "Team"
                                            ? { color: "black" }
                                            : { color: "#007ACB" }
                                        }
                                      >
                                        Team
                                      </span>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          fontWeight: "600",
                          fontSize: "14px",
                          lineHeight: "19px",
                        }}
                      >
                        <Button
                          type="default"
                          onClick={() => setIsModalOpen(true)}
                          style={{
                            margin: "10px 10px 0px 0px",
                            background: "#1963A6",
                            color: "#ffffff",
                            borderRadius: "5px",
                          }}
                        >
                          + Add {type}{" "}
                        </Button>
                      </div>
                    </div>
                    <Divider />

                    {/* {type != order[0] ? (
              <Row
                style={{ display: "flex", flexDirection: "column", margin: "20px" }}
              >
                <Row>
                  <Col style={{ fontWeight: 600 }} span={24}>
                    {parent[`${type}`]?.name}
                  </Col>
                </Row>
                <Row>
                  <Col span={24}> {parent[`${type}`]?.description} </Col>
                </Row>
              </Row>
            ) : null} */}

                    <Table
                      className="tableTab"
                      columns={columns}
                      dataSource={dataSource}
                      size="middle"
                      // expandable={type == order[3] ? ({
                      //   expandedRowRender: (record) => (
                      //     <p
                      //       style={{
                      //         margin: 0,
                      //       }}
                      //     >
                      //       {type == order[3] ? (
                      //         record.name + ' ' + record.description) : null}
                      //     </p>
                      //   ),
                      //   // rowExpandable: (record,) => record.name,
                      // }) : null}
                      onRow={(record, rowIndex) => {
                        // return {
                        //     onClick: () => {
                        //         let temp = order.indexOf(type) + 1
                        //         if (temp > 3) { return }
                        //         setType(order[temp]);
                        //         console.log(temp, order[temp])
                        //     }, // click row
                        // };
                      }}
                    />
                  </div>

                  {/* //---------------------------------add Modal */}
                  <Row>
                    <Col xs={22} sm={20} md={18}>
                      <Modal
                        // bodyStyle={{ overflowY: 'scroll' }}
                        // style={{ height: 'calc(100vh - 200px)' }}
                        bodyStyle={{
                          overflowY: "auto",
                          maxHeight: "calc(100vh - 200px)",
                          marginLeft: "40px",
                          marginRight: "40px",
                        }}
                        className="viewAppraisal"
                        centered
                        width={550}
                        visible={ismodalOpen}
                        // footer={null}
                        destroyOnClose
                        onCancel={() => {
                          setIsModalOpen(false);
                        }}
                        cancelText={
                          <div>
                            <CloseOutlined style={{ marginRight: "10px" }} />
                            CANCEL
                          </div>
                        }
                        onOk={() => {
                          form.submit();
                        }}
                        okText={
                          <div>
                            <CheckOutlined style={{ marginRight: "10px" }} />
                            SAVE
                          </div>
                        }
                        title={type}
                        closeIcon={
                          <div
                            onClick={() => {
                              setIsModalOpen(false);
                            }}
                            style={{ color: "#ffffff" }}
                          >
                            X
                          </div>
                        }
                      >
                        <Row
                          className="apply-leave"
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <Col
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                              background: "flex",
                              padding: "10px",
                              // width: "400px",
                            }}
                          >
                            <Form
                              labelCol={{
                                span: 9,
                              }}
                              wrapperCol={{
                                span: 16,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              form={form}
                              onFinish={onFinish}
                            >
                              <Form.Item
                                labelAlign="left"
                                name="name"
                                style={{ marginBottom: "20px" }}
                                label={
                                  <label
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {type} Name
                                  </label>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message: `Please enter ${type} Name`,
                                  },
                                  {
                                    pattern: /^[0-9a-zA-Z.,-\s]+$/,
                                    message: "Please enter Valid Name",
                                  },
                                  {
                                    validator: (_, value) => {
                                      let matchingName = dataSource.filter(
                                        (item) => item.name === value
                                      );
                                      if (matchingName.length > 0) {
                                        return Promise.reject(
                                          new Error("This name already exists!")
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <Input
                                  maxLength={30}
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

                              <Form.Item
                                labelAlign="left"
                                name="description"
                                style={{ marginBottom: "20px" }}
                                label={
                                  <label
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Description:
                                  </label>
                                }
                                rules={[
                                  {
                                    required: true,
                                    message: `Please enter ${type} Description`,
                                  },
                                  {
                                    pattern: /^[0-9a-zA-Z.,-\s]+$/,
                                    message: "Please enter Valid Name",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  maxLength={120}
                                  rows={4}
                                  onChange={(e) => {
                                    const inputval = e.target.value;
                                    const str = e.target.value;
                                    const newVal =
                                      inputval.substring(0, 1).toUpperCase() +
                                      inputval.substring(1);
                                    const caps = str
                                      .split(". ")
                                      .map(capitalize)
                                      .join(". ");
                                    form.setFieldsValue({
                                      description: newVal,
                                      description: caps,
                                    });
                                  }}
                                />
                              </Form.Item>
                            </Form>
                          </Col>
                        </Row>
                      </Modal>
                    </Col>
                  </Row>

                  {/* //---------------------------------edit Modal */}
                  <Row>
                    <Col xs={22} sm={20} md={18}>
                      <Modal
                        bodyStyle={{
                          overflowY: "auto",
                          maxHeight: "calc(100vh - 200px)",
                          marginLeft: "40px",
                          marginRight: "40px",
                        }}
                        className="viewAppraisal"
                        centered
                        width={550}
                        visible={isEditModalOpen}
                        destroyOnClose
                        onCancel={() => {
                          setIsEditModalOpen(false);
                        }}
                        cancelText={
                          <div>
                            <CloseOutlined style={{ marginRight: "10px" }} />
                            CANCEL
                          </div>
                        }
                        onOk={() => {
                          form1.submit();
                        }}
                        okText={
                          <div>
                            <CheckOutlined style={{ marginRight: "10px" }} />
                            SAVE
                          </div>
                        }
                        title={<div> Edit {type}</div>}
                        closeIcon={
                          <div
                            onClick={() => {
                              setIsEditModalOpen(false);
                              form1.resetFields();
                            }}
                            style={{ color: "#ffffff" }}
                          >
                            X
                          </div>
                        }
                      >
                        <Row
                          className="apply-leave"
                          style={{
                            marginTop: "10px",
                          }}
                        >
                          <Col
                            xl={24}
                            lg={24}
                            md={24}
                            sm={24}
                            xs={24}
                            style={{
                              background: "flex",
                              padding: "10px",
                              // width: "400px",
                            }}
                          >
                            <Form
                              labelCol={{
                                span: 8,
                              }}
                              wrapperCol={{
                                span: 16,
                              }}
                              initialValues={{
                                remember: true,
                              }}
                              form={form1}
                              onFinish={onFinishEdit}
                            >
                              <Form.Item
                                labelAlign="left"
                                name="editname"
                                style={{ marginBottom: "20px" }}
                                label={
                                  <label
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                    }}
                                  >
                                    {type} Name
                                  </label>
                                }
                                initialValue={editRecord.name}
                                rules={[
                                  {
                                    required: true,
                                    message: `Please enter ${type} Name`,
                                  },
                                  {
                                    pattern: /^[0-9a-zA-Z.,-\s]+$/,
                                    message: "Please enter Valid Name",
                                  },
                                  {
                                    validator: (_, value) => {
                                      let matchingName = dataSource.filter(
                                        (item) =>
                                          item.name == editRecord.name
                                            ? false
                                            : item.name === value
                                      );
                                      if (matchingName.length > 0) {
                                        return Promise.reject(
                                          new Error("This name already exists!")
                                        );
                                      }
                                      return Promise.resolve();
                                    },
                                  },
                                ]}
                              >
                                <Input
                                  maxLength={30}
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
                                    form1.setFieldsValue({
                                      editname: newVal,
                                      editname: caps,
                                    });
                                  }}
                                />
                              </Form.Item>

                              <Form.Item
                                labelAlign="left"
                                name="editdescription"
                                style={{ marginBottom: "20px" }}
                                label={
                                  <label
                                    style={{
                                      color: "black",
                                      fontWeight: "400",
                                    }}
                                  >
                                    Description:
                                  </label>
                                }
                                initialValue={editRecord.description}
                                rules={[
                                  {
                                    required: true,
                                    message: `Please enter ${type} Description`,
                                  },
                                  {
                                    pattern: /^[0-9a-zA-Z.,-\s]+$/,
                                    message: "Please enter Valid Name",
                                  },
                                ]}
                              >
                                <Input.TextArea
                                  maxLength={120}
                                  rows={4}
                                  onChange={(e) => {
                                    const inputval = e.target.value;
                                    const str = e.target.value;
                                    const newVal =
                                      inputval.substring(0, 1).toUpperCase() +
                                      inputval.substring(1);
                                    const caps = str
                                      .split(". ")
                                      .map(capitalize)
                                      .join(". ");
                                    form1.setFieldsValue({
                                      editdescription: newVal,
                                      editdescription: caps,
                                    });
                                  }}
                                />
                              </Form.Item>
                            </Form>
                          </Col>
                        </Row>
                      </Modal>
                    </Col>
                  </Row>
                </div>
              </Card>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DepartmentNew;
