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
} from "antd";
import ConfigureContext from "../../contexts/ConfigureContext";
import { DeleteOutlined, EditFilled, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./companystyle.css";
import { getDesigNo, showNotification } from "../../contexts/CreateContext";
import FormItem from "antd/es/form/FormItem";

const Designation = () => {
  const page = "addemployeePage";
  const [editContent, showEditContent] = useState(false);
  const [editGrade, showEditGrade] = useState(false);
  const [all, setAll] = useState({});
  const [data, setData] = useState({});
  const [grade, setGrade] = useState({});
  const [des, setDes] = useState(null);
  const [gra, setGra] = useState(null);
  const [old, setOld] = useState(null);
  const [editInfo, setEditInfo] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [form] = Form.useForm();
  const [showNewColumn, setshowNewColumn] = useState(false)


  const showModal = () => {
    showEditGrade(true);
  };

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    console.log('aaaaaaaaaa', data)
    setAll(data)
    setshowNewColumn(data?.enable)
    let designNo = await getDesigNo()
    console.log('aaaaaaaaaa', designNo)
    let temp = data.designations.map((des) => {
      let keys = Object.keys(des)
      let grade = des[`${keys[0]}`]
      return {
        grade: grade,
        designation: keys[0],
        employees: designNo[`${keys[0]}`] ? designNo[`${keys[0]}`] : 0,
      }
    })
    temp.sort(function (a, b) {
      return a.designation.localeCompare(b.designation);
    });
    console.log('aaaaaaaaaa2', temp)
    setDataSource(temp)

  };

  const columns = [
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
      // sorter: (a, b) => a.designation.localeCompare(b.designation),

    },
    {
      title: "Grade",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees",
    },
    {
      title: "Action",
      align: 'center',
      // dataIndex: "action",
      // key: "action",
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
                // setOld(record.designation);
                setGra(record.grade);
                // setOld({record.designation: record.grade})
                setOld({ [`${record.designation}`]: record.grade });

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
              onClick={() => onDelete(record)}
            >
              <DeleteOutlined />
            </Button>
          </Col>
        </Row >
      ),
    },
  ];

  const onDelete = (record) => {
    Modal.confirm({
      title: `Are you sure, you want to delete "${record.designation}" designation?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        let temp = {}
        temp[`${record.designation}`] = record.grade
        // temp['grade'] = record.grade
        ConfigureContext.deleteConfigurations(page, { designations: temp })
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
    console.log('aaa4', des, gra);

    ConfigureContext.updateConfigurations(
      page,
      { designations: old },
      { designations: { [`${des}`]: gra } },

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

  const onFinish = (values, extra) => {
    console.log("Received values of form:", extra, values);

    let record = {
      designations: Object.keys(values).map((key) => {
        let field = values[`${key}`]
        return {
          [`${field}`]: extra[`${key}`]
        }
      }),
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

  const filterdColumns = columns.filter((col) => col.title !== "Grade");


  function handleAddColumn(e) {
    ConfigureContext.createConfiguration(page, {
      ...all,
      enabled: e
    })
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
                    onClick={showModal}
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
                  columns={!showNewColumn ? filterdColumns : columns}
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
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
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
      >
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter designation",
            },
          ]}
        >
          <Input
            type="text"
            defaultValue={des}
            onChange={(e) => setDes(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Please enter Grade",
            },
          ]}
        >

          <Input

            onKeyPress={(event) => {
              if (checkNumbervalue(event)) {
                event.preventDefault();
              }
            }}
            type="text"

            defaultValue={gra}
            onChange={(e) => setGra(e.target.value)}
          />
        </Form.Item>

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
          <FormItem
            label="Configuration for Grade::"
            labelCol={{ offset: 6 }}
            // wrapperCol={{span:12,offset:10}}
            style={{ marginBottom: "0px" }}
            initialValue={showNewColumn}
          >
            <Switch defaultChecked={showNewColumn} checkedChildren="Enabled" unCheckedChildren="Disabled" onChange={(e) => handleAddColumn(e)} />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
};

export default Designation;
