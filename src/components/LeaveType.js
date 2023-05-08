import { useState, useEffect } from "react";
import {
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import ConfigureContext from "../contexts/ConfigureContext";
import "../style/leave.css";
import {
  capitalize,
  checkAlphabets,
  checkNumbervalue,
  showNotification,
} from "../contexts/CreateContext";

const { Option } = Select;

const LeaveType = (props) => {
  const page = "leaveType";
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [types, setTypes] = useState([]);
  const [activeType, setActiveType] = useState({});
  const [editLeaves, setEditLeaves] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creditable, setCreditable] = useState(false);

  useEffect(() => {
    setTypes(props.data);
    let data =
      Object.keys(activeType).length == 0
        ? props.data[0]
        : props.data.find((x) => x.name == activeType.name);
    setActiveType(data);
    setCreditable(data?.creditable);
  }, [props.data]);

  const leaveUpdate = (values) => {
    let record = {
      ...activeType,
      ...values,
    };
    delete record.name;
    let name = activeType.name;
    ConfigureContext.editConfiguration(page, { [`${name}`]: record })
      .then((res) => {
        showNotification("success", "Success", "Updated Successfully!");
        setEditLeaves(false);
        editForm.resetFields();
        props.getData();
      })
      .catch((err) => {
        showNotification("error", "Error", "Update Failed!");
      });
  };

  const addNewRule = (config) => {
    let name = config.name;
    delete config.name;
    config = {
      ...config,
      weekendBtwnLeave: false,
      holidaysBtwnLeave: false,
      creditable: true,
      frequency: "Monthly",
      period: "Start",
      probation: true,
      carryForward: false,
    };
    ConfigureContext.editConfiguration(page, { [`${name}`]: config });
    form.resetFields();
    props.getData();
    setIsModalOpen(false);
  };

  return (
    <div className="wholePage">
      <Row>
        <Col xs={24} sm={22} md={6}>
          <ul className="sidecard" style={{ cursor: "pointer" }}>
            {types.map((type) => (
              <li
                className="sideCard"
                style={
                  activeType.name == type.name
                    ? {
                        borderLeft: "4px solid #2094FF",
                        color: "#2094FF",
                      }
                    : null
                }
                onClick={() => {
                  setActiveType(type);
                  setCreditable(type.creditable);
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    lineHeight: "18px",
                    margin: "10px 0",
                  }}
                >
                  {type.name}
                </div>
              </li>
            ))}
            <li className="sideCreate">
              <Button
                onClick={() => {
                  setIsModalOpen(true);
                }}
                style={{ width: "100%", border: "none" }}
              >
                <PlusCircleOutlined />
                Create New Rule
              </Button>
              <Modal
                destroyOnClose
                title="Create New Rule"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                  setIsModalOpen(false);
                }}
              >
                <Form
                  form={form}
                  name="basic"
                  labelCol={{
                    span: 8,
                    offset: 4,
                  }}
                  wrapperCol={{
                    span: 16,
                    offset: 4,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  autoComplete="off"
                  layout="vertical"
                  onFinish={addNewRule}
                >
                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Name",
                      },
                      {
                        message: "Please Enter Valid Name",
                        pattern: /^[a-zA-Z\s]*$/,
                      },
                    ]}
                    onKeyPress={(event) => {
                      if (checkAlphabets(event)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Input
                      maxLength={20}
                      onChange={(e) => {
                        const str = e.target.value;
                        const caps = str.split(" ").map(capitalize).join(" ");
                        form.setFieldsValue({ name: caps });
                      }}
                    />
                  </Form.Item>

                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Description",
                      },
                    ]}
                  >
                    <TextArea
                      rows={2}
                      onChange={(e) => {
                        const str = e.target.value;
                        const caps = str.split(". ").map(capitalize).join(". ");
                        form.setFieldsValue({ description: caps });
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Leave Count"
                    name="count"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Leave Count",
                      },
                      {
                        pattern: /^[0-9\b]+$/,
                        message: "Please Enter  Number",
                      },
                    ]}
                    onKeyPress={(event) => {
                      if (checkNumbervalue(event)) {
                        event.preventDefault();
                      }
                    }}
                  >
                    <Input maxLength={3} />
                  </Form.Item>
                </Form>
              </Modal>
            </li>
          </ul>
        </Col>
        <Col xs={24} sm={22} md={18}>
          <Card
            className="sickCard"
            title={activeType.name}
            bordered={true}
            style={{
              marginLeft: "30px",
              cursor: "default",
              marginTop: "10px",
            }}
            extra={
              !editLeaves ? (
                <Button
                  type="text"
                  bordered={false}
                  onClick={() => setEditLeaves(true)}
                >
                  <EditFilled />
                </Button>
              ) : null
            }
          >
            <Form
              form={editForm}
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
              onFinish={leaveUpdate}
            >
              <div
                className="personalCardDiv"
                style={{ flexDirection: "column" }}
              >
                <Row style={{ width: "100%" }}>
                  <Col>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "7px",
                      }}
                    >
                      Name
                    </div>
                    {!editLeaves ? (
                      <div style={{ marginBottom: "13px" }}>
                        {activeType.name}
                      </div>
                    ) : (
                      <Form.Item initialValue={activeType.name} name="name">
                        <Input
                          style={{
                            marginBottom: "13px",
                            width: "200px",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row style={{ width: "100%" }}>
                  <Col style={{ width: "90%" }}>
                    <div
                      style={{
                        fontWeight: 600,
                        lineHeight: "18px",
                        color: "#07182b",
                        fontSize: "15px",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "6px",
                      }}
                    >
                      Description
                    </div>
                    {!editLeaves ? (
                      <div style={{ marginBottom: "13px" }}>
                        {activeType.description}
                      </div>
                    ) : (
                      <Form.Item
                        initialValue={activeType.description}
                        name="description"
                      >
                        {/* <Input
                          style={{
                            marginBottom: "13px",
                            width: "200px",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                        /> */}

                        <TextArea
                          rows={2}
                          onChange={(e) => {
                            const str = e.target.value;
                            const caps = str
                              .split(". ")
                              .map(capitalize)
                              .join(". ");
                            editForm.setFieldsValue({ description: caps });
                          }}
                        />
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </div>
              <Divider />
              <div className="leavesCount">
                <Row>
                  <Col xs={24} sm={20} md={7}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "13px",
                      }}
                    >
                      Leaves Count
                    </div>
                  </Col>
                  <Col xs={24} sm={20} md={8}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "7px",
                      }}
                    >
                      Leaves Allowed in a Year
                    </div>
                    {editLeaves === false ? (
                      <div>{activeType.count}</div>
                    ) : (
                      <Form.Item initialValue={activeType.count} name="count">
                        <Input
                          style={{
                            // marginTop: "10px",
                            width: "200px",
                            borderBottom: "1px solid #ccc ",
                            paddingLeft: "0px",
                          }}
                          bordered={false}
                          initialValue={activeType.count}
                        />
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} sm={20} md={8}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "7px",
                      }}
                    >
                      Weekends Between Leave
                    </div>
                    {editLeaves === false ? (
                      <div>{activeType?.weekendBtwnLeave ? "Yes" : "No"}</div>
                    ) : (
                      <Form.Item
                        initialValue={activeType?.weekendBtwnLeave}
                        name="weekendBtwnLeave"
                        valuePropName="checked"
                      >
                        <Checkbox defaultChecked={activeType?.weekendBtwnLeave}>
                          Count as Leave
                        </Checkbox>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} sm={22} md={7}></Col>
                  <Col xs={24} sm={24} md={8}>
                    {/* <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    > */}
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "10px",
                      }}
                    >
                      Holidays Between Leave
                    </div>
                    {editLeaves === false ? (
                      <>{activeType?.holidaysBtwnLeave ? "Yes" : "No"}</>
                    ) : (
                      <Form.Item
                        initialValue={activeType?.holidaysBtwnLeave}
                        name="holidaysBtwnLeave"
                        style={{ marginRight: "0px" }}
                        valuePropName="checked"
                      >
                        <Checkbox
                          defaultChecked={activeType?.holidaysBtwnLeave}
                        >
                          Count as Leave
                        </Checkbox>
                      </Form.Item>
                    )}
                  </Col>
                  <Col xs={24} sm={22} md={9}></Col>
                </Row>
              </div>
              {activeType.name != "Loss Of Pay" ? (
                <>
                  <Divider />
                  <div className="leavesCount">
                    <Row>
                      <Col xs={24} sm={20} md={7}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                            marginBottom: "13px",
                          }}
                        >
                          Accrual
                        </div>
                      </Col>
                      <Col xs={24} sm={20} md={8}>
                        {editLeaves === false ? (
                          <>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "18px",
                                color: "#07182B",
                                fontFamily: "Open Sans,sans-serif",
                                marginBottom: "7px",
                              }}
                            >
                              Creditable on Accrual Basis
                            </div>
                            <div style={{ marginBottom: "13px" }}>
                              {activeType?.creditable ? "Yes" : "No"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              activeType?.creditable
                                ? activeType.creditable
                                : null
                            }
                            name="creditable"
                            valuePropName="checked"
                          >
                            <Checkbox
                              onChange={(e) => setCreditable(e.target.checked)}
                              defaultChecked={activeType?.creditable}
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "18px",
                                color: "#07182B",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Creditable on Accrual Basis
                            </Checkbox>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={24} sm={22} md={7}></Col>
                      <Col xs={24} sm={22} md={8}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                            marginBottom: "7px",
                          }}
                        >
                          Accrual Frequency
                        </div>
                        {editLeaves === false ? (
                          <div>
                            {activeType?.frequency
                              ? activeType.frequency
                              : "Monthly"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              activeType?.frequency
                                ? activeType.frequency
                                : null
                            }
                            name="frequency"
                          >
                            <Select
                              disabled={!creditable}
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                padding: "2px",
                              }}
                              bordered={false}
                            >
                              <Option value="Monthly">Monthly</Option>
                              <Option value="Quarterly">Quarterly</Option>
                              <Option value="Half Yearly">Half Yearly</Option>
                            </Select>
                          </Form.Item>
                        )}
                      </Col>
                      <Col xs={24} sm={22} md={9}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                            marginBottom: "7px",
                          }}
                        >
                          Accrual Period
                        </div>
                        {editLeaves === false ? (
                          <div>
                            {activeType?.period ? activeType.period : "start"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              activeType?.period ? activeType.period : null
                            }
                            name="period"
                          >
                            <Select
                              disabled={!creditable}
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                padding: "2px",
                              }}
                              bordered={false}
                            >
                              <Option value="Start">Start</Option>
                              <Option value="End">End</Option>
                            </Select>
                          </Form.Item>
                        )}
                      </Col>
                    </Row>
                  </div>
                </>
              ) : null}
              <Divider />
              <div className="leavesCount">
                <Row>
                  <Col xs={24} sm={20} md={7}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "18px",
                        color: "#07182B",
                        fontFamily: "Open Sans,sans-serif",
                        marginBottom: "13px",
                      }}
                    >
                      Applicability
                    </div>
                  </Col>
                  <Col xs={24} sm={20} md={16}>
                    {editLeaves === false ? (
                      <>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                            marginBottom: "7px",
                          }}
                        >
                          Allowed Under Probation
                        </div>
                        <div style={{ marginBottom: "13px" }}>
                          {activeType?.probation ? "Yes" : "No"}
                        </div>
                      </>
                    ) : (
                      <Form.Item
                        initialValue={
                          activeType?.probation ? activeType.probation : null
                        }
                        name="probation"
                        valuePropName="checked"
                      >
                        <Checkbox
                          defaultChecked={activeType?.probation}
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Allowed Under Probation
                        </Checkbox>
                      </Form.Item>
                    )}
                  </Col>
                </Row>
              </div>
              {activeType.name != "Loss Of Pay" ? (
                <>
                  <Divider />
                  <div className="leavesCount">
                    <Row>
                      <Col xs={24} sm={20} md={7}>
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "18px",
                            color: "#07182B",
                            fontFamily: "Open Sans,sans-serif",
                            marginBottom: "13px",
                          }}
                        >
                          Carry Forward
                        </div>
                      </Col>
                      {editLeaves === false ? (
                        <>
                          <Col xs={24} sm={20} md={16}>
                            <div
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "18px",
                                color: "#07182B",
                                fontFamily: "Open Sans,sans-serif",
                                marginBottom: "7px",
                              }}
                            >
                              Carry Forward Enabled
                            </div>
                            <div style={{ marginBottom: "13px" }}>
                              {activeType?.carryForward ? "Yes" : "No"}
                            </div>
                          </Col>
                        </>
                      ) : (
                        <Col xs={24} sm={20} md={16}>
                          <Form.Item
                            initialValue={activeType?.carryForward || null}
                            name="carryForward"
                            valuePropName="checked"
                          >
                            <Checkbox
                              defaultChecked={activeType?.carryForward}
                              style={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "18px",
                                color: "#07182B",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Carry Forward Enabled
                            </Checkbox>
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </div>
                </>
              ) : null}
              {editLeaves === true ? (
                <Row
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "3%",
                  }}
                >
                  <Button
                    onClick={() => {
                      editForm.resetFields();
                      setEditLeaves(false);
                    }}
                    type="text"
                    style={{ fontSize: 15 }}
                  >
                    <CloseOutlined /> CANCEL
                  </Button>
                  <Col>
                    <Button
                      type="primary"
                      style={{
                        marginLeft: "10px",
                        background: "#1963A6",
                        width: "90px",
                      }}
                      onClick={() => {
                        editForm.submit();
                      }}
                    >
                      <CheckOutlined />
                      SAVE
                    </Button>
                  </Col>
                </Row>
              ) : null}
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default LeaveType;
