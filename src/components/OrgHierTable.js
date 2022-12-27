import React, { useEffect, useState } from "react";
import {
  Divider,
  Card,
  Button,
  Table,
  Row,
  Col,
  Modal,
  Form,
  Input,
  notification,
} from "antd";
import {
  DeleteOutlined,
  EditFilled,
  CloseOutlined,
  CheckOutlined,
} from "@ant-design/icons";
import "../style/CostCenter.css";
import { capitalize } from "../contexts/CreateContext";

const OrgHierTable = () => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [type, setType] = useState("Business Unit");
  const [parent, setParent] = useState(null);
  const order = ["Business Unit", "Division", "Department", "Team"];
  const [dataSource, setDataSource] = useState([]);
  const [editRecord, setEditRecord] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [type]);

  const getData = async () => {
    let data = localStorage.getItem("OrgHier");
    if (!data) {
      localStorage.setItem("OrgHier", "[]");
      return;
    }
    setData(JSON.parse(data));
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
    JSON.parse(data).map((d) => {
      if (d.type == type && d.parent == par) {
        temp.push(d);
      }
    });
    setDataSource(temp);
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
    temp.push({
      ...values,
      parent: par,
      type: type,
    });
    localStorage.setItem("OrgHier", JSON.stringify(temp));
    form.resetFields();
    setIsModalOpen(false);
    getData();
  };

  const onFinishEdit = (values) => {
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
          editRecord.parent == null ? editRecord.name : editRecord.parent;
        if (d.parent.startsWith(par)) {
          return {
            ...d,
            parent: d.parent.replace(editRecord.name, values.editname),
          };
        }
      }
      return d;
    });
    localStorage.setItem("OrgHier", JSON.stringify(edited));
    setEditRecord({});
    form1.resetFields();
    setIsEditModalOpen(false);
    getData();
  };

  const deleteData = (record) => {
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
        localStorage.setItem("OrgHier", JSON.stringify(deleted));
        getData();
      },
    });
  };

  const columns = [
    {
      title: `${type} Name`,
      dataIndex: "name",
      key: "name",
      width: 100,
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
      width: 200,
      // responsive: ["md"],
      // render: (_, { status }) => getStatusUi(status),
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",
      width: 80,
      // align: "center",
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
    <div style={{ margin: "13px", background: "#fff" }}>
      <div style={{ background: "#FAFAFA" }}>
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
        {type != order[0] ? (
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
        ) : null}

        <Table
          className="tableTab"
          columns={columns}
          dataSource={dataSource}
          style={{ background: "#FAFAFA" }}
          size="middle"
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
            destroyOnClose={true}
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
                    span: 8,
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
                      <label style={{ color: "black", fontWeight: "400" }}>
                        {type} Name
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Please Enter ${type} Name`,
                      },
                      {
                        pattern: /^[0-9a-zA-Z.,-/&()\s]+$/,
                        message: "Please Enter Valid Name",
                      },
                      {
                        validator: (_, value) => {
                          let matchingName = dataSource.filter((item) => item.name === value);
                          if (matchingName.length > 0) {
                            return Promise.reject(new Error("This name already exists!"));
                          }
                          return Promise.resolve();
                        }
                      }
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
                        const caps = str.split(" ").map(capitalize).join(" ");
                        form.setFieldsValue({ name: newVal, name: caps });
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    labelAlign="left"
                    name="description"
                    style={{ marginBottom: "20px" }}
                    label={
                      <label style={{ color: "black", fontWeight: "400" }}>
                        Description:
                      </label>
                    }
                    rules={[
                      {
                        required: true,
                        message: `Please Enter ${type} Description`,
                      },
                      {
                        pattern: /^[0-9a-zA-Z.,-\s]+$/,
                        message: "Please Enter Valid Name",
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
                        const caps = str.split(". ").map(capitalize).join(". ");
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
                      <label style={{ color: "black", fontWeight: "400" }}>
                        {type} Name
                      </label>
                    }
                    initialValue={editRecord.name}
                    rules={[
                      {
                        required: true,
                        message: `Please Enter ${type} Name`,
                      },
                      {
                        pattern: /^[0-9a-zA-Z.,-/&()\s]+$/,
                        message: "Please Enter Valid Name",
                      },
                      {
                        validator: (_, value) => {
                          let matchingName = dataSource.filter(
                            (item) => item.name === value
                          );
                          if (matchingName.length > 0) {
                            return Promise.reject(new Error("This name already exists!"));
                          }
                          return Promise.resolve();
                        }
                      }
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
                        const caps = str.split(" ").map(capitalize).join(" ");
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
                      <label style={{ color: "black", fontWeight: "400" }}>
                        Description:
                      </label>
                    }
                    initialValue={editRecord.description}
                    rules={[
                      {
                        required: true,
                        message: `Please Enter ${type} Description`,
                      },
                      {
                        pattern: /^[0-9a-zA-Z.,-\s]+$/,
                        message: "Please Enter Valid Name",
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
                        const caps = str.split(". ").map(capitalize).join(". ");
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
  );
};

export default OrgHierTable;
