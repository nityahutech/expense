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
  notification,
} from "antd";
import ConfigureContext from "../../contexts/ConfigureContext";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./companystyle.css";
import { getDesigNo } from "../../contexts/CreateContext";

const Designation = () => {
  const page = "addemployeePage";
  const [editContent, showEditContent] = useState(false);
  const [data, setData] = useState({});
  const [des, setDes] = useState(null);
  const [old, setOld] = useState(null);
  const [editInfo, setEditInfo] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    getDesigNo().then((res) => {
      setDataSource(
        data.designations.map((des) => {
          return {
            designation: des,
            employees: res[`${des}`] ? res[`${des}`] : 0,
          };
        })
      );
    });
  };

  const columns = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designatione",
    },

    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
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
                // paddingTop: "7px",
                // paddingRight: "7px",
                // marginRight: "10px",
              }}
              onClick={() => {
                setEditInfo(true);
                setDes(record.designation);
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
                // paddingTop: "7px",
                // paddingRight: "7px",
              }}
              onClick={() => onDelete(record.designation)}
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const onDelete = (record) => {
    Modal.confirm({
      title: `Are you sure, you want to delete "${record}" designation?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        ConfigureContext.deleteConfigurations(page, { designations: record })
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
    console.log(des);
    ConfigureContext.updateConfigurations(
      page,
      { designations: old },
      { designations: des }
    )
      .then((response) => {
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

  const onFinish = (values) => {
    let record = {
      designations: Object.values(values),
    };
    console.log("Received values of form:", record);
    ConfigureContext.addConfigurations(page, record)
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
                cursor:'default'
              }}
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                  className="designationTable"
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
                                <Col xs={24} sm={24} md={12} lg={8} xl={6}>
                                  <Space key={key} align="baseline">
                                    <Form.Item
                                      {...restField}
                                      name={[name, "first"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Please enter designation",
                                        },
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

                                    <MinusCircleOutlined
                                      onClick={() => {
                                        delete data[`${key}`];
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
                          type="default"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            setData({});
                            showEditContent(false);
                            form.resetFields();
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            onFinish(data);
                          }}
                        >
                          Submit
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
      >
        <Input
          type="text"
          defaultValue={des}
          onChange={(e) => setDes(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default Designation;
