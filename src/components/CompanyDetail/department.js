import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Select,
  notification,
  Input,
  Form,
  Divider,
  Table,
  Modal,
  Space,
  message,
} from "antd";
import { CloseCircleOutlined, EditFilled,CheckOutlined,CloseOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./companystyle.css";
import DepartmentContext from "../../contexts/DepartmentContext";

// ------------------------------------------------------------------------------const part
const Department = () => {
  const [addDepartment, setAddDepartment] = useState(false);
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [addSubDepart, setAddSubDepart] = useState(false);
  const [subDepartList, setSubDepartList] = useState([]);
  const [dataSource, setData] = useState([]);

  useEffect(() => {
    getData();
  }, [])

  const getData = () => {
    DepartmentContext.getDept().then((res) => {
      setData(res)
      console.log(res)
    })
  }

  const showModal = () => {
    setAddDepartment(true);
    form.resetFields();
  };

  const showNotification = (type, msg, desc) => {
    notification[type]({
        message: msg,
        description: desc,
    });
  };

  const onFinish = (values) => {
    let record = {
      ...values,
      subDept: subDepartList
    }
    DepartmentContext.createDept(record).then((res) => {
      showNotification("success", "Success", "yay")
      getData();
    })
    console.log(record)
    setSubDepartList([])
    setAddDepartment(false);
  };

  const handleCancel = () => {
    setAddDepartment(false);
    form.resetFields();
  };

  function onDelete(delItem) {
    const filteredData = subDepartList.filter(
      (item) => item.hod1 !== delItem.hod1
    );
    setSubDepartList(filteredData);
  }

  function subDepartment(values) {
    setSubDepartList([...subDepartList, values]);
    form2.resetFields();
    setAddSubDepart(false);
  }

  function onReset() {
    form.resetFields();
    form2.resetFields();
  }

  // const dataSource = [
    // {
    //   dept: "dept-1",
    //   hod: "Debashish",
    //   subdept: "dept-3",
    //   hod1: "Kiran",
    //   workloc: "HSR",
    //   empnum: "3",
    // },
    // {
    //   dept: "dept-1",
    //   hod: "Debashish",
    //   subdept: "dept -5",
    //   hod1: "Kiran",
    //   workloc: "HSR",
    //   empnum: "3",
    // },
    // {
    //   dept: "dept-2",
    //   hod: "Swayamprava",
    //   subdept: "dept -6",
    //   hod1: "ekta",
    //   workloc: "BDA Complex",
    //   empnum: "3",
    // },
    // {
    //   dept: "dept-2",
    //   hod: "Swayamprava",
    //   subdept: "dept -4",
    //   hod1: "saswat",
    //   workloc: "HSR Layout",
    //   empnum: "10",
    // },
    // {
    //   dept: "dept-3",
    //   hod: "Person",
    //   workloc: "HSR Layout",
    //   empnum: "10",
    // },
  // ];
  // ---------------------------------usestate for adding Department
  // const sharedOnCell = (_, index) => {
  //   if (index === 4) {
  //     return {
  //       rowSpan: 0,
  //     };
  //   }
  //   return {};
  // };

  const columns = [
    {
      title: "Department",
      dataIndex: "dept",
      key: "dept",
      render: (value, row, index) => {
        console.log(value, row, index)
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && value === dataSource[index - 1].dept) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].dept;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
    },

    {
      title: "H.O.D.",
      dataIndex: "hod",
      key: "hod",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && value === dataSource[index - 1].hod) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].hod;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
    },
    {
      title: "Sub-Department",
      // colSpan: 1,
      key: "subDept",
      dataIndex: "subDept",
    },
    {
      title: "H.O.D.",
      key: "hod1",
      dataIndex: "hod1",
      // colSpan: 1,
      // onCell: sharedOnCell,
    },
    {
      title: "Work Location",
      dataIndex: "workloc",
      key: "workloc",
      // colSpan: 1,
      // onCell: sharedOnCell,
    },
    {
      title: "No. of Employee",
      dataIndex: "empnum",
      key: "empnum",
      align: "center",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (index >= 1 && value === dataSource[index - 1].empnum) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].empnum;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }
        return obj;
      },
    },
  ];

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
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
            <Card
              className="overview"
              title=" DEPARTMENT"
              bordered={true}
              hoverable={true}
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor:'default'
              }}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  bordered
                  pagination={false}
                  size="middle"
                  className="departTable"
                />
              </div>
              <Button
                style={{
                  background: "#1963a6",
                  marginLeft: "12px",
                  marginTop: "11px",
                }}
                type="primary"
                onClick={showModal}
              >
                Add Department
              </Button>

              <Modal
                centered
                className="addDepart"
                title="Add Department"
                open={addDepartment}
                // onOk={() => {
                //   handleOk();
                // }}
                // onCancel={handleCancel}
                // okText="Submit"
                footer={null}
                width={600}
                closeIcon={
                  <div
                    onClick={() => {
                      setAddDepartment(false);
                    }}
                    style={{ color: "#fff" }}
                  >
                    X
                  </div>
                }
              >
                <Form
                  action="/action_page.php"
                  form={form}
                  labelCol={{ span: 30 }}
                  wrapperCol={{ span: 30 }}
                  initialValues={{ remember: true }}
                  autoComplete="off"
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Row gutter={[24, 8]}>
                    <Col xs={22} sm={20} md={12}>
                      <Form.Item
                        label="Department"
                        name="department"
                        rules={[
                          {
                            required: true,
                            message: "Enter Department Name",
                          },
                          {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: "Please Enter Valid Name",
                          },
                        ]}
                      >
                        <Input
                          // style={{
                          //   width: "100%",
                          // }}
                          required
                          placeholder="Enter Department"
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={22} sm={20} md={12}>
                      <Form.Item
                        name="hod"
                        label="H.O.D."
                        rules={[
                          {
                            required: true,
                            message: "Enter HOD Name",
                          },
                          {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: "Please Enter HOD",
                          },
                        ]}
                      >
                        <Input
                          required
                          // style={{ width: "100%" }}

                          placeholder="Enter HOD"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form
                    form={form2}
                    layout="vertical"
                    labelCol={{ span: 20 }}
                    wrapperCol={{ span: 14 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    onFinish={subDepartment}
                  >
                    {subDepartList.map((sub, i) => (
                      <div style={{ marginTop: "10px" }} className="subInput">
                        <Row gutter={[0, 5]}>
                          <Col xs={22} sm={15} md={8}>
                            <div
                              style={{ fontSize: "13px", fontWeight: "600" }}
                            >
                              Sub-Department
                            </div>
                            <div>{sub.subdept}</div>
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <div
                              style={{ fontSize: "13px", fontWeight: "600" }}
                            >
                              H.O.D.
                            </div>
                            <div>{sub.hod1}</div>
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <div
                              style={{ fontSize: "13px", fontWeight: "600" }}
                            >
                              Work Location
                            </div>
                            <div>{sub.workloc}</div>

                            <Button
                              style={{
                                background: "#f8f8f8",
                                border: "none",
                                color: "#095AA4",
                                float: "right",
                                bottom: " 35px",
                                background: "#fff",
                              }}
                              onClick={() => {
                                onDelete(sub);
                              }}
                            >
                              <CloseCircleOutlined />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    ))}
                    {addSubDepart ? (
                      <div>
                        <Row gutter={[0, 5]} className="addSub">
                          <Col xs={22} sm={20} md={8}>
                            <Form.Item
                              name="subdept"
                              label="Sub-Department"
                              rules={[
                                {
                                  required: false,
                                  message: "Please Enter Sub-Department",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please Enter Sub-Department",
                                },
                              ]}
                            >
                              <Input
                                maxLength={15}
                                placeholder="Sub-Department"
                                style={{
                                  width: "150px",
                                  border: "1px solid #8692A6",
                                  borderRadius: "4px",
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={22} sm={20} md={8}>
                            <Form.Item
                              name="hod1"
                              label="H.O.D."
                              rules={[
                                {
                                  required: false,
                                  message: "Please Enter HOD",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please Enter HOD",
                                },
                              ]}
                            >
                              <Input
                                maxLength={20}
                                placeholder="H.O.D."
                                style={{
                                  width: "150px",
                                  border: "1px solid #8692A6",
                                  borderRadius: "4px",
                                }}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={22} sm={20} md={8}>
                            <Form.Item
                              name="workloc"
                              label="Work Location"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Location",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please Enter Location",
                                },
                              ]}
                            >
                              <Input
                                maxLength={15}
                                placeholder="Work Location"
                                style={{
                                  width: "150px",
                                  border: "1px solid #8692A6",
                                  borderRadius: "4px",
                                }}
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    ) : null}
                    <Button
                      onClick={() => {
                        if (addSubDepart) {
                          form2.submit();
                        }
                        setAddSubDepart(!addSubDepart);
                      }}
                      style={{
                        background: "#1963a6",
                        padding: "4px",

                        marginTop: "11px",
                        color: "#fff",
                      }}
                    >
                      {addSubDepart ? "Save" : "Add Sub-Department"}
                    </Button>
                  </Form>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "end",
                      position: "relative",
                      top: "30px",
                    }}
                  >
                    <Space>
                      <Form.Item>
                        <Button
                          type="text"
                          style={{
                            fontSize: "15",
                            lineHeight: "17px",
                            width: "119px",
                          }}
                          onClick={() => {
                            onReset();
                            handleCancel();
                          }}
                        >
                          CANCEL
                        </Button>
                      </Form.Item>
                      <Form.Item>
                        <Button
                          style={{
                            border: "1px solid #1963A6",
                            background: "#1963A6",
                            color: "#ffffff",
                            fontSize: "15",
                            lineHeight: "17px",
                            width: "119px",
                          }}
                          htmlType="submit"
                        >
                          SAVE
                        </Button>
                      </Form.Item>
                    </Space>
                  </div>
                </Form>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Department;
