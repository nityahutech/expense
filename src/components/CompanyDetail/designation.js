import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  Space,
  Table,
  Modal,
  Switch,
  Typography
} from "antd";
import EmpInfoContext from "../../contexts/EmpInfoContext"
import ConfigureContext from "../../contexts/ConfigureContext";
import { DeleteOutlined, EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./companystyle.css";
import { capitalize, checkNumbervalue, getDesigNo, showNotification } from "../../contexts/CreateContext";

const { Text } = Typography

const Designation = () => {
  const page = "addemployeePage";
  const [editContent, showEditContent] = useState(false);
  const [editGrade, showEditGrade] = useState(false);
  const [data, setData] = useState({});
  const [grade, setGrade] = useState({});
  const [des, setDes] = useState(null);
  const [gra, setGra] = useState(null);
  const [old, setOld] = useState(null);
  const [designations, setDesignations] = useState(null);
  const [editInfo, setEditInfo] = useState(false);
  const [exists, setExists] = useState(false);
  const [names, setNames] = useState({});
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [showNewColumn, setshowNewColumn] = useState(false);

  const getData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    setDesignations(data.designations)
    console.log(data)
    setshowNewColumn(data.enabled)
    let designNo = await getDesigNo()
    let keys = Object.keys(data.designations)
    let grade = Object.values(data.designations)
    setNames(designNo.names)
    let temp = keys.map((d, i) => {
      return {
        grade: grade[i],
        designation: d,
        employees: designNo[`${d}`] ? designNo[`${d}`] : 0,
      }
    })
    temp.sort(function (a, b) {
      return a.designation.localeCompare(b.designation);
    });
    setDataSource(temp)
  };

  const columns = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",

    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Action",
      align: 'center',
      render: (record) => (
        <Row
          style={{
            width: "100px",
            textAlign: "-webkit-right",
          }}
        >
          <Col span={12}>
            <Button
              className="editbutton"
              type="text"
              style={{
                color: "rgb(64, 169, 255)",
                display: "none",
                border: "none",
                padding: "0",
              }}
              onClick={() => {
                setEditInfo(true);
                setDes(record.designation);
                setGra(record.grade);
                setOld(record.designation);
              }}
            >
              <EditFilled />
            </Button>
          </Col>
          <Col span={12}>
            <Button
              className="editbutton"
              type="text"
              style={{
                color: "#f04747",
                display: "none",
                border: "none",
                padding: "0",
              }}
              onClick={() => onDelete(record)}
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  const [filterdColumns, setColumns] = useState(columns)

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(showNewColumn)
    let temp =[...columns]
    delete temp[2]
    setColumns(showNewColumn ? columns : temp)
  }, [showNewColumn]);

  const desExists = async (value) => {
    let list = Object.keys(names)
    delete list[list.indexOf(old)]
    let exists = list.includes(value.split(" ").map(capitalize).join(" "));
    if (exists) {
      setDes(old)
      setExists(true)
      return;
    }
    setDes(value)
    setExists(false)
  };

  const onDelete = (record) => {
    if (record.employees != 0) {
      showNotification(
        "error",
        "Error",
        "Designation cannot be deleted successfully!"
      );
      return;
    }
    Modal.confirm({
      title: `Are you sure, you want to delete "${record.designation}" designation?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        let temp = {...designations}
        delete temp[`${record.designation}`]
        ConfigureContext.editConfiguration(page, { designations: temp })
          .then((response) => {
            showNotification(
              "success",
              "Success",
              "Designation deleted successfully!"
            );
            getData();
          })
          .catch((error) => {
            showNotification("error", "Error", error.message);
          });
      },
    });
  };

  const onEdit = () => {
    if (exists) { return; }
    let temp = {...designations};
    delete temp[`${old}`];
    temp[`${des}`] = gra != null ? gra : 1;
    ConfigureContext.editConfiguration(page, { designations: temp })
      .then((response) => {
        names[`${old}`].map((id) => {
          EmpInfoContext.updateEduDetails(id, {designation: des})
        })
        showNotification(
          "success",
          "Success",
          "Designation edited successfully!"
        );
        getData();
        setEditInfo(false);
        setDes(null);
        setOld(null);
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
  };

  const onFinish = (values, extra) => {
    let temp = {...designations};
    Object.values(values).forEach((key, i) => {
        temp[`${key}`] = extra[`${i}`]
      })
    ConfigureContext.editConfiguration(page, {designations: temp})
      .then((response) => {
        showNotification(
          "success",
          "Success",
          "Designation added successfully!"
        );
        getData();
        showEditContent(false);
        setData({});

        form.resetFields();
      })
      .catch((error) => {
        showNotification("error", "Error", error.message);
      });
  };

  function handleAddColumn(e) {
    ConfigureContext.editConfiguration(page, {enabled: e})
    setshowNewColumn(e)
  }

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
              title=" DESIGNATIONS"
              bordered={true}
              hoverable={true}
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: 'default'
              }}
              extra={
                <>
                  <Button
                    onClick={() => showEditGrade(true)}
                    className="personal"
                    type="text"
                    style={{
                      color: "#ffff",
                      display: "none",
                      paddingTop: "7px",
                      paddingRight: "7px",
                      position: "absolute",
                      right: 10,
                      top: 10,
                    }}
                  >
                    <EditFilled />
                  </Button>
                </>
              }
            >
              <div className="table-responsive">
                <Table
                  columns={filterdColumns}
                  dataSource={dataSource}
                  pagination={false}
                  className="designationTable"
                  summary={(pageData) => {
                    let totalEmp = 0;
                    pageData.forEach(({ employees, }) => {
                      totalEmp += employees;
                    });
                    return (
                        <Table.Summary.Row>
                          <Table.Summary.Cell index={0}>Total</Table.Summary.Cell>
                          <Table.Summary.Cell index={1}>
                            <Text type="danger">{totalEmp}</Text>
                          </Table.Summary.Cell>
                        </Table.Summary.Row>
                    );
                  }}
                />
              </div>

              <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                <Form form={form} style={{ width: "100%" }} autoComplete="off">
                  {editContent ? (
                    <>
                      <Form.List name="users">
                        {(fields, { add, remove }) => (
                          <>
                            <Row style={{ width: "100%" }}>
                              {fields.map(({ key, name, ...restField }) => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  <Space key={key} align="baseline">
                                    <Form.Item
                                      {...restField}
                                      name={[name, "first"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please Enter Designation",
                                        },
                                        {
                                          validator: (rule, value, callback) => {
                                            let exists = Object.keys(names).includes(value);
                                            if (exists) {
                                              return Promise.reject(new Error("This designations already exists!"));
                                            }
                                          },
                                          message: "This designation already exists!",
                                        }
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Designation"
                                        onChange={(e) => {
                                          let temp = {
                                            ...data,
                                            [`${key}`]: e.target.value,
                                          };
                                          setData(temp);
                                        }}
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "second"]}
                                      onKeyPress={(event) => {
                                        if (checkNumbervalue(event)) {
                                          event.preventDefault();
                                        }
                                      }}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter Grade",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Grade"
                                        onChange={(e) => {
                                          let temp = {
                                            ...grade,
                                            [`${key}`]: e.target.value,
                                          };
                                          setGrade(temp);
                                        }}
                                      />
                                    </Form.Item>

                                    <MinusCircleOutlined
                                      onClick={() => {
                                        delete data[`${key}`];
                                        delete grade[`${key}`];
                                        remove(name);
                                      }}
                                    />
                                  </Space>
                                </Col>
                              ))}
                            </Row>

                            <Form.Item>
                              <Button
                                type="dashed"
                                style={{ width: "150px" }}
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
                      <Form.Item>
                        <Button
                          type="text"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setData({});
                            showEditContent(false);
                            form.resetFields();
                          }}
                        >
                          <CloseOutlined />Cancel
                        </Button>
                        <Button
                          style={{
                            border: "1px solid #1963A6",
                            background: "#1963A6",
                            color: "#ffffff",
                            fontSize: "15",
                            lineHeight: "17px",
                            // width: "119px",
                          }}
                          type="primary"
                          onClick={() => {
                            onFinish(data, grade);
                          }}
                        >
                          <CheckOutlined />Submit
                        </Button>
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item>
                      <Button
                        style={{
                          background: "#1963a6",
                          marginLeft: "20px",
                        }}
                        type="primary"
                        onClick={() => showEditContent(true)}
                      >
                        Add Designations
                      </Button>
                    </Form.Item>
                  )}
                </Form>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
      <Modal
        centered
        className="editDesignation"
        title="Edit Designation"
        open={editInfo}
        onOk={onEdit}
        destroyOnClose
        onCancel={() => {
          setEditInfo(false);
        }}
      >{console.log(exists)}
          <Input
            type="text"
            status={exists ? "error" : null}
            defaultValue={des}
            onChange={(e) => desExists(e.target.value)}
          />
          <Input
            style={{marginTop: "5px", width: "100%"}}
            type="number"
            defaultValue={gra}
            onChange={(e) => setGra(e.target.value)}
          />
      </Modal>
      <Modal
        destroyOnClose
        open={editGrade}
        centered
        className="editDesignation"
        title="Edit Grade"
        onOk={() => showEditGrade(false)}
        cancelButtonProps={{ style: { display: 'none' } }}
        closable={false}
        // afterClose={() => showEditGrade(false)}
      >
        <Form>
          <Form.Item
            label="Configuration for Grade::"
            labelCol={{ offset: 6 }}
            // wrapperCol={{span:12,offset:10}}
            style={{ marginBottom: "0px" }}
            initialValue={showNewColumn}
          >
            <Switch defaultChecked={showNewColumn} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={(e) => handleAddColumn(e)} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Designation;
