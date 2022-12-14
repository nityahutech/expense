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
import { capitalize, checkAlphabets, checkNumbervalue } from "../contexts/CreateContext";

const { Option } = Select;

const LeaveType = () => {
  const page = "leaveType"
  const [form] = Form.useForm();
  const [types, setTypes] = useState([
    {
      name: "Sick Leave",
      description:
        "These are one-day leaves taken for health-related reasons. This can only be taken for the current day or the next (1 day in advance).",
      count: 6,
      weekendBtwnLeave: false,
      holidaysBtwnLeave: false,
      creditable: true,
      frequency: "Monthly",
      period: "Start",
      probation: true,
      carryForward: false,
    },
    {
      name: "Optional Leave",
      description:
        "Optional holidays are those that the employee can choose to avail.",
      count: 2,
      weekendBtwnLeave: false,
      holidaysBtwnLeave: false,
      creditable: true,
      frequency: "Monthly",
      period: "Start",
      probation: true,
      carryForward: false,
    },
    {
      name: "Loss Of Pay",
      description:
        "Employees taking leave under loss of pay will not be compensated for the missing days in their salary.",
      count: 0,
      weekendBtwnLeave: false,
      holidaysBtwnLeave: false,
      probation: true,
    },
  ]);
  const [activeType, setActiveType] = useState(types[0]);
  const [sickLeave, setSickLeave] = useState(null);
  const [optionalLeave, setOptionalLeave] = useState(null);
  const [lossPay, setLossPay] = useState(null);
  const [editContent, showEditContent] = useState(false);
  const [editLeavesCount, setEditLeavesCount] = useState(false);
  const [editAccrual, setEditAccrual] = useState(false);
  const [editProbation, setEditProbation] = useState(false);
  const [editCarry, setEditCarry] = useState(false);
  const [editOptionalName, setEditOptionalName] = useState(false);
  const [editOptionalLeave, seteditOptionalLeave] = useState(false);
  const [editOptionalAccrual, setEditOptionalAccrual] = useState(false);
  const [editOptionalProbation, setEditOptionalProbation] = useState(false);
  const [editOptionalCarry, setEditOptionalCarry] = useState(false);
  const [editPayLossName, setEditPayLossName] = useState(false);
  const [editPayLossLeave, setEditPayLossLeave] = useState(false);
  const [editPayLossProbation, setEditPayLossProbation] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    getData()
  })

  const getData = async () => {
    let data = await ConfigureContext.getConfigurations(page);
    console.log(data)
    let place = [0, 0, 0]
    let temp = Object.keys(data).map((type, i) => {
      if (type == "Sick Leave") {place[0] = i}
      if (type == "Optional Leave") {place[1] = i}
      if (type == "Loss Of Pay") {place[2] = i}
      return {
        ...data[`${type}`],
        name: type
      }
    })
    place.forEach((i) => {
      let hold = {}
    })
    console.log(temp);
    // setTypes(data)
  }

  const sickLeaveUpdate = (values) => {
    showEditContent(false);
    let sickname = {
      ...data,
      name: values.name,
      describe: values.describe,
    };
    setData(sickname);
  };

  const leavesCountUpdate = (values) => {
    setEditLeavesCount(false);
    let leaveName = {
      ...data,
      year: values.year ? values.weekends : "",
      weekends: values.weekends ? values.weekends : "",
      holidays: values.holidays ? values.holidays : "",
    };
  };

  const accrualUpdate = (values) => {
    setEditAccrual(false);
    let accrualName = {
      ...data,
      creditable: values.creditable,
      frequency: values.frequency,
      period: values.period,
    };
  };

  const carryUpdate = (values) => {
    setEditCarry(false);
    let carryName = {
      ...data,
      carry: values.carry,
    };
  };
 
  const probationUpdate = (values) => {
    setEditProbation(false);
    let probationName = {
      ...data,
      probation: values.probation,
    };
  };

  const onCheckbox = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  const addNewRule = (values) => {
    console.log(values, "bro");
    ConfigureContext.leaveTypeConfiguration(types);
    setIsModalOpen(false);
  };

  return (
    <div className="wholePage">
      <Row>
        <Col xs={24} sm={22} md={6}>
          <ul className="sidecard">
            {types.map((type) => (
              <li
                className="sideCard"
                style={
                  activeType.name == type.name
                    ? { borderLeft: "4px solid #2094FF", color: "#2094FF" }
                    : null
                }
                onClick={() => setActiveType(type)}
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
                <Button onClick={() => { setIsModalOpen(true) }} style={{ width:"100%", border: "none" }}>
                  <PlusCircleOutlined />
                  Create New Rule
                </Button>
              <Modal
                title="Create New Rule"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={() => { setIsModalOpen(false) }}
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
                        const inputval = e.target.value;
                        const str = e.target.value;
                        const newVal =
                          inputval.substring(0, 1).toUpperCase() +
                          inputval.substring(1);
                        const caps = str.split(" ").map(capitalize).join(" ");
                        // setPaidBy(newVal);
                        form.setFieldsValue({
                          name: newVal,
                          name: caps,
                        });
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
                    <TextArea rows={2} />
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
                      console.log(checkNumbervalue(event));
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
          >
            <Form
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
              onFinish={sickLeaveUpdate}
            >
              <div className="personalCardDiv">
                <Row>
                  <Col xs={24} sm={24} md={15}>
                    <div>
                      <Row>
                        <Col xs={24} sm={24} md={23}>
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
                          <div style={{ marginBottom: "13px" }}>
                            {activeType.name}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col xs={24} sm={22} md={18}>
                    <div>
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
                      <div>{activeType.description}</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Form>
            <Divider />
            <Form
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
              onFinish={leavesCountUpdate}
            >
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
                    {editLeavesCount === false ? (
                      <div>{activeType.count}</div>
                    ) : (
                      <Form.Item initialValue={activeType.count} name="year">
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
                    {editLeavesCount === false ? (
                      <div>{activeType.weekendBtwnLeave}</div>
                    ) : (
                      <Form.Item
                        initialValue={activeType.weekendBtwnLeave}
                        name="weekends"
                      >
                        <Checkbox onChange={onCheckbox}>
                          Count as Leave
                        </Checkbox>
                      </Form.Item>
                    )}
                  </Col>
                  {editLeavesCount === false ? (
                    <Col xs={24} sm={24} md={1}>
                      <Button
                        className="leaves"
                        type="text"
                        bordered={false}
                        style={{
                          // color: "#ffff",
                          display: "none",
                          // paddingTop: "7px",
                          // paddingRight: "7px",
                          // position: "absolute",
                          // left: "17rem",
                          // top: 10,
                        }}
                        onClick={() => setEditLeavesCount(!editLeavesCount)}
                      >
                        <EditFilled />
                      </Button>
                    </Col>
                  ) : null}
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
                    {editLeavesCount === false ? (
                      <div
                        style={
                          {
                            // marginTop: "5px",
                            // marginRight: "4rem",
                          }
                        }
                      >
                        {activeType.holidaysBtwnLeave}
                      </div>
                    ) : (
                      <Form.Item
                        initialValue={activeType.holidaysBtwnLeave}
                        name="holidays"
                        style={{ marginRight: "0px" }}
                      >
                        <Checkbox onChange={onCheckbox}>
                          Count as Leave
                        </Checkbox>
                      </Form.Item>
                    )}
                    {/* </div> */}
                  </Col>
                  <Col xs={24} sm={22} md={9}></Col>
                </Row>
                {editLeavesCount === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        // form.resetFields();
                        setEditLeavesCount(false);
                      }}
                      type="text"
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "10px",
                          background: "#1963A6",
                          width: "90px",
                        }}
                        onClick={() => {
                          //   form.submit();
                        }}
                      >
                        <CheckOutlined />
                        SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </div>
            </Form>
            {activeType.name != "Loss Of Pay" ? (
              <>
                <Divider />
                <Form
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
                  onFinish={accrualUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editAccrual === false ? (
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
                              {data?.creditable ? data.creditable : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.creditable ? data.creditable : null
                            }
                            name="creditable"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editAccrual === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() => setEditAccrual(!editAccrual)}
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
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
                        {editAccrual === false ? (
                          <div>
                            {data?.frequency ? data.frequency : "Monthly"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.frequency ? data.frequency : null
                            }
                            name="frequency"
                          >
                            <Select
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
                        {editAccrual === false ? (
                          <div>{data?.period ? data.period : "start"}</div>
                        ) : (
                          <Form.Item
                            initialValue={data?.period ? data.period : null}
                            name="period"
                          >
                            <Select
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
                    {editAccrual === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditAccrual(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                              //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
              </>
            ) : null}
            <Divider />
            <Form
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
              onFinish={probationUpdate}
            >
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
                    {editProbation === false ? (
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
                          {data?.probation ? data.probation : "Yes"}
                        </div>
                      </>
                    ) : (
                      <Form.Item
                        initialValue={data?.probation ? data.probation : null}
                        name="probation"
                      >
                        <Checkbox
                          onChange={onCheckbox}
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
                  {editProbation === false ? (
                    <Col xs={24} sm={24} md={1}>
                      <Button
                        className="leaves"
                        type="text"
                        bordered={false}
                        style={{
                          // color: "#ffff",
                          display: "none",
                          // paddingTop: "7px",
                          // paddingRight: "7px",
                          // position: "absolute",
                          // left: "17rem",
                          // top: 10,
                        }}
                        onClick={() => setEditProbation(!editProbation)}
                      >
                        <EditFilled />
                      </Button>
                    </Col>
                  ) : null}
                </Row>
                {editProbation === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        // form.resetFields();
                        setEditProbation(false);
                      }}
                      type="text"
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "10px",
                          background: "#1963A6",
                          width: "90px",
                        }}
                        onClick={() => {
                          //   form.submit();
                        }}
                      >
                        <CheckOutlined />
                        SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </div>
            </Form>
            {activeType.name != "Loss Of Pay" ? (
              <>
                <Divider />
                <Form
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
                  onFinish={carryUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editCarry === false ? (
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
                              Carry Forward Enabled
                            </div>
                            <div style={{ marginBottom: "13px" }}>
                              {data?.carry ? data.carry : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={data?.carry ? data.carry : null}
                            name="carry"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                        )}
                      </Col>
                      {editCarry === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() => setEditCarry(!editCarry)}
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editCarry === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditCarry(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                              //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
              </>
            ) : null}
          </Card>
          {/*         
            {sickLeave ? (
              <Card
                className="sickCard"
                title="Sick Leave"
                bordered={true}
                style={{
                  marginLeft: "30px",

                  cursor: "default",
                }}
              >
                <Form
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
                  onFinish={sickLeaveUpdate}
                >
                  <div className="personalCardDiv">
                    <Row>
                      <Col xs={24} sm={24} md={15}>
                        <div>
                          <Row>
                            <Col xs={24} sm={24} md={23}>
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
                              <div style={{ marginBottom: "13px" }}>
                                Sick Leave
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col xs={24} sm={22} md={18}>
                        <div>
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
                          <div>
                            These are one-day leaves taken for
                            health-related reasons. This can only be
                            taken for the current day or the next (1 day
                            in advance).
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={leavesCountUpdate}
                >
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
                        {editLeavesCount === false ? (
                          <div>{data?.year ? data.year : "18.0"}</div>
                        ) : (
                          <Form.Item
                            initialValue={data?.year ? data.year : null}
                            name="year"
                          >
                            <Input
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                              }}
                              bordered={false}
                              initialValue={
                                data.year ? data.year : null
                              }
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
                        {editLeavesCount === false ? (
                          <div>
                            {data?.weekends
                              ? data.weekends
                              : "Not Considered"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.weekends ? data.weekends : null
                            }
                            name="weekends"
                          >
                            <Checkbox onChange={onCheckbox}>
                              Count as Leave
                            </Checkbox>
                          </Form.Item>
                        )}
                      </Col>
                      {editLeavesCount === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditLeavesCount(!editLeavesCount)
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} md={19}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                              color: "#07182B",
                              fontFamily: "Open Sans,sans-serif",
                              marginTop: "15px",
                            }}
                          >
                            Holidays Between Leave
                          </div>
                          {editLeavesCount === false ? (
                            <div
                              style={{
                                marginTop: "5px",
                                marginRight: "4rem",
                              }}
                            >
                              {data?.holidays
                                ? data.holidays
                                : "Not Considered"}
                            </div>
                          ) : (
                            <Form.Item
                              initialValue={
                                data?.holidays ? data.holidays : null
                              }
                              name="holidays"
                            >
                              <Checkbox onChange={onCheckbox}>
                                Count as Leave
                              </Checkbox>
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {editLeavesCount === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditLeavesCount(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={accrualUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editAccrual === false ? (
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
                              {data?.creditable
                                ? data.creditable
                                : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.creditable ? data.creditable : null
                            }
                            name="creditable"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editAccrual === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() => setEditAccrual(!editAccrual)}
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
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
                        {editAccrual === false ? (
                          <div>
                            {data?.frequency
                              ? data.frequency
                              : "Monthly"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.frequency ? data.frequency : null
                            }
                            name="frequency"
                          >
                            <Select
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                padding: "2px",
                              }}
                              bordered={false}
                            >
                              <Option value="Monthly">Monthly</Option>
                              <Option value="Quarterly">
                                Quarterly
                              </Option>
                              <Option value="Half Yearly">
                                Half Yearly
                              </Option>
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
                        {editAccrual === false ? (
                          <div>
                            {data?.period ? data.period : "start"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.period ? data.period : null
                            }
                            name="period"
                          >
                            <Select
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
                    {editAccrual === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditAccrual(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={probationUpdate}
                >
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
                        {editProbation === false ? (
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
                              {data?.probation ? data.probation : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.probation ? data.probation : null
                            }
                            name="probation"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editProbation === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditProbation(!editProbation)
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editProbation === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditProbation(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={carryUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editCarry === false ? (
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
                              Carry Forward Enabled
                            </div>
                            <div style={{ marginBottom: "13px" }}>
                              {data?.carry ? data.carry : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.carry ? data.carry : null
                            }
                            name="carry"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                        )}
                      </Col>
                      {editCarry === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() => setEditCarry(!editCarry)}
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editCarry === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditCarry(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
              </Card>
            ) : null}
            {optionalLeave ? (
              <Card
                className="sickCard"
                title="Optional Leave"
                bordered={true}
                style={{
                  marginLeft: "30px",

                  cursor: "default",
                }}
              >
                <Form
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
                  onFinish={sickLeaveUpdate}
                >
                  <div className="personalCardDiv">
                    <Row>
                      <Col xs={24} sm={24} md={15}>
                        <div>
                          <Row>
                            <Col xs={24} sm={24} md={23}>
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
                              <div style={{ marginBottom: "13px" }}>
                                Optional Leave
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col xs={24} sm={22} md={18}>
                        <div>
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
                          <div>
                            Optional holidays are those that the
                            employee can choose to avail.
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={leavesCountUpdate}
                >
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
                        {editOptionalLeave === false ? (
                          <div>{data?.year ? data.year : "18.0"}</div>
                        ) : (
                          <Form.Item
                            initialValue={data?.year ? data.year : null}
                            name="year"
                          >
                            <Input
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                              }}
                              bordered={false}
                              initialValue={
                                data.year ? data.year : null
                              }
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
                        {editOptionalLeave === false ? (
                          <div>
                            {data?.weekends
                              ? data.weekends
                              : "Not Considered"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.weekends ? data.weekends : null
                            }
                            name="weekends"
                          >
                            <Checkbox onChange={onCheckbox}>
                              Count as Leave
                            </Checkbox>
                          </Form.Item>
                        )}
                      </Col>
                      {editOptionalLeave === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              seteditOptionalLeave(!editOptionalLeave)
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    <Row>
                      <Col xs={24} sm={24} md={19}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                              color: "#07182B",
                              fontFamily: "Open Sans,sans-serif",
                              marginTop: "15px",
                            }}
                          >
                            Holidays Between Leave
                          </div>
                          {editOptionalLeave === false ? (
                            <div
                              style={{
                                marginTop: "5px",
                                marginRight: "4rem",
                              }}
                            >
                              {data?.holidays
                                ? data.holidays
                                : "Not Considered"}
                            </div>
                          ) : (
                            <Form.Item
                              initialValue={
                                data?.holidays ? data.holidays : null
                              }
                              name="holidays"
                            >
                              <Checkbox onChange={onCheckbox}>
                                Count as Leave
                              </Checkbox>
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row>
                    {editOptionalLeave === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            seteditOptionalLeave(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={accrualUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editOptionalAccrual === false ? (
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
                              {data?.creditable
                                ? data.creditable
                                : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.creditable ? data.creditable : null
                            }
                            name="creditable"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editOptionalAccrual === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditOptionalAccrual(
                                !editOptionalAccrual
                              )
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
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
                        {editOptionalAccrual === false ? (
                          <div>
                            {data?.frequency
                              ? data.frequency
                              : "Monthly"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.frequency ? data.frequency : null
                            }
                            name="frequency"
                          >
                            <Select
                              style={{
                                // marginTop: "10px",
                                width: "200px",
                                borderBottom: "1px solid #ccc ",
                                padding: "2px",
                              }}
                              bordered={false}
                            >
                              <Option value="Monthly">Monthly</Option>
                              <Option value="Quarterly">
                                Quarterly
                              </Option>
                              <Option value="Half Yearly">
                                Half Yearly
                              </Option>
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
                        {editOptionalAccrual === false ? (
                          <div>
                            {data?.period ? data.period : "start"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.period ? data.period : null
                            }
                            name="period"
                          >
                            <Select
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
                    {editOptionalAccrual === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditOptionalAccrual(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={probationUpdate}
                >
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
                        {editOptionalProbation === false ? (
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
                              {data?.probation ? data.probation : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.probation ? data.probation : null
                            }
                            name="probation"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editOptionalProbation === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditOptionalProbation(
                                !editOptionalProbation
                              )
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editOptionalProbation === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditOptionalProbation(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={carryUpdate}
                >
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
                      <Col xs={24} sm={20} md={16}>
                        {editOptionalCarry === false ? (
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
                              Carry Forward Enabled
                            </div>
                            <div style={{ marginBottom: "13px" }}>
                              {data?.carry ? data.carry : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.carry ? data.carry : null
                            }
                            name="carry"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                        )}
                      </Col>
                      {editOptionalCarry === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditOptionalCarry(!editOptionalCarry)
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editOptionalCarry === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditOptionalCarry(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
              </Card>
            ) : null}
            {lossPay ? (
              <Card
                className="sickCard"
                title="Loss of Pay"
                bordered={true}
                style={{
                  marginLeft: "30px",

                  cursor: "default",
                }}
              >
                <Form
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
                  onFinish={sickLeaveUpdate}
                >
                  <div className="personalCardDiv">
                    <Row>
                      <Col xs={24} sm={24} md={15}>
                        <div>
                          <Row>
                            <Col xs={24} sm={24} md={23}>
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

                              <div style={{ marginBottom: "13px" }}>
                                Loss of Pay
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </Col>
                      <Col xs={24} sm={22} md={18}>
                        <div>
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

                          <div>
                            Employees taking leave under loss of pay
                            will not be compensated for the missing days
                            in their salary.
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={leavesCountUpdate}
                >
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
                          Weekends Between Leave
                        </div>
                        {editPayLossLeave === false ? (
                          <div>
                            {data?.weekends
                              ? data.weekends
                              : "Not Considered"}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.weekends ? data.weekends : null
                            }
                            name="weekends"
                          >
                            <Checkbox onChange={onCheckbox}>
                              Count as Leave
                            </Checkbox>
                          </Form.Item>
                        )}
                      </Col>
                      <Col xs={24} sm={24} md={8}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "18px",
                              color: "#07182B",
                              fontFamily: "Open Sans,sans-serif",
                              // marginTop: "15px",
                            }}
                          >
                            Holidays Between Leave
                          </div>
                          {editPayLossLeave === false ? (
                            <div
                              style={{
                                marginTop: "5px",
                                marginRight: "4rem",
                              }}
                            >
                              {data?.holidays
                                ? data.holidays
                                : "Not Considered"}
                            </div>
                          ) : (
                            <Form.Item
                              initialValue={
                                data?.holidays ? data.holidays : null
                              }
                              name="holidays"
                            >
                              <Checkbox onChange={onCheckbox}>
                                Count as Leave
                              </Checkbox>
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      {editPayLossLeave === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditPayLossLeave(!editPayLossLeave)
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>

                    {editPayLossLeave === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditPayLossLeave(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
                <Form
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
                  onFinish={probationUpdate}
                >
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
                        {editPayLossProbation === false ? (
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
                              {data?.probation ? data.probation : "Yes"}
                            </div>
                          </>
                        ) : (
                          <Form.Item
                            initialValue={
                              data?.probation ? data.probation : null
                            }
                            name="probation"
                          >
                            <Checkbox
                              onChange={onCheckbox}
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
                      {editPayLossProbation === false ? (
                        <Col xs={24} sm={24} md={1}>
                          <Button
                            className="leaves"
                            type="text"
                            bordered={false}
                            style={{
                              // color: "#ffff",
                              display: "none",
                              // paddingTop: "7px",
                              // paddingRight: "7px",
                              // position: "absolute",
                              // left: "17rem",
                              // top: 10,
                            }}
                            onClick={() =>
                              setEditPayLossProbation(
                                !editPayLossProbation
                              )
                            }
                          >
                            <EditFilled />
                          </Button>
                        </Col>
                      ) : null}
                    </Row>
                    {editPayLossProbation === true ? (
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "3%",
                        }}
                      >
                        <Button
                          onClick={() => {
                            // form.resetFields();
                            setEditPayLossProbation(false);
                          }}
                          type="text"
                          style={{ fontSize: 15 }}
                        >
                          <CloseOutlined /> CANCEL
                        </Button>
                        <Col>
                          <Button
                            type="primary"
                            htmlType="submit"
                            style={{
                              marginLeft: "10px",
                              background: "#1963A6",
                              width: "90px",
                            }}
                            onClick={() => {
                            //   form.submit();
                            }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </Col>
                      </Row>
                    ) : null}
                  </div>
                </Form>
                <Divider />
              </Card>
            ) : null} */}
        </Col>
      </Row>
    </div>
  );
};

export default LeaveType;
