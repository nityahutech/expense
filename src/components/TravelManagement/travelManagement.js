import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Table,
  Tooltip,
  Tag,
  Modal,
  Space,
  Row,
  Divider,
  Col,
  Form,
  Input,
  DatePicker,
  Select,
  Switch,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  EditFilled,
  UserAddOutlined,
} from "@ant-design/icons";
import "./travelManagement.css";
// import { EyeFilled, EditFilled } from "@ant-design/icons";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";
import { checkAlphabets, showNotification } from "../../contexts/CreateContext";
import TravelContext from "../../contexts/TravelContext";

const { RangePicker } = DatePicker;

function TravelManagement(prop) {
  const [addTravel, setAddTravel] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const role = prop.roleView == "emp";
  console.log(prop.roleView);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const columns = [
    {
      title: "Employee Code ",
      dataIndex: "employeeCode",
      key: "employeeCode",
      width: 200,
      align: "left",
    },
    {
      title: "employeeName",
      dataIndex: "employeeName",
      key: "employeeName",
      width: 200,
      align: "left",
    },
    {
      title: "Travel Title",
      dataIndex: "travelTitle",
      key: "traveltitle",
      width: 200,
      align: "left",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      align: "left",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      width: 200,
      align: "left",
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmt",
      key: "totalAmt",
      width: 200,
      align: "left",
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 200,
      align: "center",
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Tooltip placement="bottom" title="View" color="#1963A6">
              <Button
                type="link"
                className="show"
                // onClick={() => {
                //   openModal(record);
                // }}
              >
                {<EyeFilled style={{ color: "#000000" }} />}
              </Button>
            </Tooltip>
            {record.status == "Approved" || record.status == "Reject" ? (
              <Button
                disabled={
                  record.status == "Approved" || record.status == "Reject"
                }
                style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                type="link"
                className="show"
                // onClick={() => {
                //   showModal(record);
                // }}
              >
                {
                  <EditFilled
                    style={
                      record.status == "Approved" || record.status == "Reject"
                        ? { color: "lightgray" }
                        : null
                    }
                    disabled={
                      record.status == "Approved" || record.status == "Reject"
                    }
                  />
                }
              </Button>
            ) : (
              <Tooltip placement="bottom" title="Edit" color="#1963A6">
                <Button
                  disabled={record.status == "Approved"}
                  style={{ padding: 0, color: "rgb(64, 169, 255)" }}
                  type="link"
                  className="show"
                  //   onClick={() => {
                  //     showModal(record);
                  //   }}
                >
                  {
                    <EditFilled
                      style={
                        record.status == "Approved"
                          ? { color: "lightgray" }
                          : null
                      }
                      disabled={record.status == "Approved"}
                    />
                  }
                </Button>
              </Tooltip>
            )}
          </div>
        </>
      ),
    },
  ];
  const travelColumns = [
    {
      title: "Travel Title",
      dataIndex: "travelTitle",
      key: "travelTitle",
      width: 200,
      align: "left",
    },
    {
      title: "Duration",
      dataIndex: "durationDate",
      key: "durationDate",
      width: 200,
      align: "left",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 200,
      align: "left",
      render: (_, { status }) =>
        status !== "" && (
          <Tag
            style={{
              width: "84px",
              color: "#000000",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              padding: "2px",
            }}
            className="statusTag"
            color={
              status === "Approved"
                ? "rgb(8 231 68 / 75%)"
                : status === "Pending"
                ? "rgb(244 209 105)"
                : "#f44336"
            }
            key={status}
          >
            {status}
          </Tag>
        ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      width: 200,
      align: "left",
      render: (_, record) => (
        <>
          <div
            className="employee-button"
            style={{ display: "flex", flexDirection: "row" }}
          >
            <Tooltip placement="bottom" title="View" color="#1963A6">
              <Button
                type="link"
                className="show"
                // onClick={() => {
                //   openModal(record);
                // }}
              >
                {<EyeFilled style={{ color: "#000000" }} />}
              </Button>
            </Tooltip>
            <Button
              style={
                record.status == "Pending"
                  ? {
                      padding: 0,
                      color: "rgb(39 151 44 / 74%)",
                    }
                  : { display: "none" }
              }
              type="link"
              className="show"
              //   onClick={() => {
              //     setStatus(record, "Approved");
              //   }}
            >
              <img src={Checkmark} />
            </Button>
            <Button
              style={record.status == "Pending" ? null : { display: "none" }}
              type="link"
              className="deleTe"
              //   onClick={() => {
              //     setStatus(record, "Reject");
              //   }}
            >
              <img src={CheckReject} width={20} />
            </Button>
          </div>
        </>
      ),
    },
  ];

  const handleCarChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = async (values) => {
    console.log("travelData", values);

    const allTravelData = {
      travelName: values.travelName,
      people: values.people,
      status: "Pending",
      empId: currentUser.uid,

      travelType: values.users.map((type) => {
        console.log(type);
        switch (type.bookingOption) {
          case "travel":
            return {
              ...type,
              travelDate: type.travelDate.format("DD-MM-YYYY"),
              depart: type.depart,
              arrival: type.arrival,
              transport: type.transport,
            };
          case "hotel":
            return {};
        }
        // return {
        //   ...type,
        //   bookingOption: type.bookingOption,
        //   duration: type.duration.format(["DD-MM-YYYY"]),
        //   location: type.location,
        //   travelDate: type.travelDate.format("DD-MM-YYYY"),
        //   depart: type.depart,
        //   arrivel: type.arrivel,
        //   transport: type.transport,
        //   rentalDate: type.rentalDate.format("DD-MM-YYYY"),
        //   vehicleType: type.vehicleType,
        //   driver: type.driver,
        // };
      }),
    };
    console.log("deatislTravel", allTravelData);
    try {
      await TravelContext.addTravel(allTravelData);
      showNotification("success", "Success", "Travel Request Added");
      setTimeout(() => {
        setAddTravel(false);
        form.resetFields();
      }, 5000);
    } catch (error) {
      console.log("error", error);
      showNotification("error", "Error", "Error In Invoice");
    }
  };

  return (
    <>
      <div className="travelDiv">
        {role ? (
          <>
            <Card className="travelCard" title="Travel Management">
              <Form
                // className="addEmp"
                form={form}
                layout="vertical"
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
                // form={form}
                onFinish={onFinish}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item
                      label="Travel Management Title"
                      name="travelName"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Invoice",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please Enter Valid Title",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="No. of People" name="people">
                      <Input />
                    </Form.Item>
                  </Col>

                  {addTravel ? (
                    <>
                      <Col span={24}>
                        <Row gutter={[16, 16]}>
                          <Form.List name="users">
                            {(fields, { add, remove }) => {
                              return (
                                <div
                                  className="Form-div"
                                  style={{ width: "100%" }}
                                >
                                  {fields.map((field, i) => (
                                    <>
                                      <div
                                        key={field.key}
                                        style={{
                                          // display: "flex",
                                          // marginBottom: 8,
                                          width: "100%",
                                        }}
                                        // align="start"
                                      >
                                        {console.log(fields, field)}
                                        <Row
                                          gutter={[16, 16]}
                                          style={{ width: "100%" }}
                                        >
                                          <Divider
                                            orientation="left"
                                            orientationMargin="15px"
                                            style={{ margin: "0px" }}
                                          >
                                            Expenditure No.{i + 1}
                                          </Divider>
                                          <Col span={24}>
                                            <Form.Item
                                              label="Type of Booking"
                                              name={[i, "bookingOption"]}
                                              initialValue={selectedOption[i]}
                                            >
                                              <Select
                                                style={{
                                                  width: "25%",
                                                }}
                                                onChange={(e) => {
                                                  let temp = [
                                                    ...selectedOption,
                                                  ];
                                                  temp[i] = e;
                                                  setSelectedOption(temp);
                                                }}
                                                options={[
                                                  {
                                                    value: "travel",
                                                    label: "Travel Booking",
                                                  },
                                                  {
                                                    value: "hotel",
                                                    label: "Hotel Booking",
                                                  },
                                                  {
                                                    value: "rental",
                                                    label: "Rental Booking",
                                                  },
                                                ]}
                                              />
                                            </Form.Item>
                                          </Col>
                                          {selectedOption[i] === "hotel" ? (
                                            <>
                                              <Col span={10}>
                                                <Form.Item
                                                  label="Duration"
                                                  // {...field}
                                                  name={[
                                                    field.name,
                                                    "duration",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "payment"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Missing Payment Date",
                                                    },
                                                  ]}
                                                >
                                                  <RangePicker
                                                    style={{ width: "100%" }}
                                                    format={"DD-MM-YYYY"}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col span={12}>
                                                <Form.Item
                                                  label="Location"
                                                  // {...field}
                                                  name={[
                                                    field.name,
                                                    "location",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "amount"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message: "Missing Amount",
                                                    },
                                                    {
                                                      pattern: /^[a-zA-Z,\s]*$/,
                                                      message:
                                                        "Please Enter Valid Title",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    placeholder="Hotel Destination"
                                                    maxLength={50}
                                                    onChange={(e) => {
                                                      // console.log(e.target.value);
                                                      // const amt = e.target.value;
                                                      // setAmount(amt);
                                                      let temp = 0;
                                                      // fields.map((field) => {
                                                      //   let data = form.getFieldValue([
                                                      //     "users",
                                                      //     field.name,
                                                      //     "amount",
                                                      //   ]);
                                                      //   temp = temp + Number(data);
                                                      // });

                                                      // form.setFieldsValue({
                                                      //   totalAmt: temp,
                                                      // });
                                                    }}
                                                  />
                                                </Form.Item>
                                              </Col>
                                            </>
                                          ) : selectedOption[i] === "travel" ? (
                                            <>
                                              <Col span={4}>
                                                <Form.Item
                                                  label="Date of Travel"
                                                  {...field}
                                                  name={[
                                                    field.name,
                                                    "travelDate",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "payment"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Missing Payment Date",
                                                    },
                                                  ]}
                                                >
                                                  <DatePicker
                                                    format={"DD-MM-YYYY"}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col span={6}>
                                                <Form.Item
                                                  label="From"
                                                  {...field}
                                                  name={[field.name, "depart"]}
                                                >
                                                  <Input
                                                    placeholder="Booking From"
                                                    maxLength={10}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col span={6}>
                                                <Form.Item
                                                  label="To"
                                                  {...field}
                                                  name={[field.name, "arrival"]}
                                                  // fieldKey={[
                                                  //   field.fieldKey,
                                                  //   "description",
                                                  // ]}
                                                  // rules={[
                                                  //   {
                                                  //     required: true,
                                                  //     message: "Missing Description",
                                                  //   },
                                                  // ]}
                                                >
                                                  <Input placeholder="Traveling to" />
                                                </Form.Item>
                                              </Col>
                                              <Col span={6}>
                                                <Form.Item
                                                  initialValue={"flight"}
                                                  label="Transport Type"
                                                  {...field}
                                                  name={[
                                                    field.name,
                                                    "transport",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "upload"]}
                                                  // rules={[
                                                  //   {
                                                  //     required: true,
                                                  //     message: "Missing Images",
                                                  //   },
                                                  // ]}
                                                >
                                                  <Select
                                                    defaultValue="Flight"
                                                    style={{
                                                      width: "100%",
                                                    }}
                                                    // onChange={handleChange}
                                                    options={[
                                                      {
                                                        value: "flight",
                                                        label: "Flight",
                                                      },
                                                      {
                                                        value: "train",
                                                        label: "Train",
                                                      },
                                                      {
                                                        value: "bus",
                                                        label: "Bus",
                                                      },
                                                    ]}
                                                  />
                                                </Form.Item>
                                              </Col>
                                            </>
                                          ) : (
                                            <>
                                              <Col span={10}>
                                                <Form.Item
                                                  label="Date"
                                                  // {...field}
                                                  name={[
                                                    field.name,
                                                    "rentalDate",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "payment"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Missing Payment Date",
                                                    },
                                                  ]}
                                                >
                                                  <RangePicker
                                                    style={{ width: "100%" }}
                                                    format={"DD-MM-YYYY"}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col span={9}>
                                                <Form.Item
                                                  label="Type of Vehicle"
                                                  // {...field}
                                                  name={[
                                                    field.name,
                                                    "vehicleType",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "amount"]}
                                                  // rules={[
                                                  //   {
                                                  //     required: true,
                                                  //     message: "Missing Amount",
                                                  //   },
                                                  //   {
                                                  //     pattern: /^[a-zA-Z,\s]*$/,
                                                  //     message:
                                                  //       "Please Enter Valid Title",
                                                  //   },
                                                  // ]}
                                                >
                                                  <Select
                                                    placeholder="Select Vehicle"
                                                    onChange={handleCarChange}
                                                    options={[
                                                      {
                                                        value: "sedan",
                                                        label: "SEDAN",
                                                      },
                                                      {
                                                        value: "hatchback",
                                                        label: "HATCH BACK",
                                                      },
                                                      {
                                                        value: "suv",
                                                        label: "SUV",
                                                      },
                                                      {
                                                        value: "muv",
                                                        label: "MUV",
                                                      },
                                                      {
                                                        value: "luxury",
                                                        label: "LUXURY",
                                                      },
                                                    ]}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col span={3}>
                                                <Form.Item
                                                  initialValue={true}
                                                  label="Driver Required"
                                                  name={[field.name, "driver"]}
                                                >
                                                  <Switch
                                                    checkedChildren="Yes"
                                                    unCheckedChildren="No"
                                                    defaultChecked
                                                    onChange={(e) =>
                                                      console.log("test", e)
                                                    }
                                                  />
                                                </Form.Item>
                                              </Col>
                                            </>
                                          )}

                                          <Col
                                            span={2}
                                            className="actionButton"
                                          >
                                            <MinusCircleOutlined
                                              onClick={() => {
                                                remove(field.name);
                                                let temp = [...file];
                                                // delete temp[i];
                                                temp.splice(i, 1);
                                                console.log(temp);
                                                setFile(temp);
                                              }}
                                            />
                                          </Col>
                                        </Row>
                                      </div>
                                    </>
                                  ))}
                                  <Col span={24}>
                                    <Button
                                      className="addFieldTravel"
                                      onClick={() => {
                                        add();
                                        let temp = [...selectedOption];
                                        temp.push("travel");
                                        setSelectedOption(temp);
                                      }}
                                      block
                                    >
                                      <PlusOutlined /> Add field
                                    </Button>
                                  </Col>
                                </div>
                              );
                            }}
                          </Form.List>
                        </Row>

                        <Col span={24} className="buttonCol">
                          <Space>
                            <Button
                              // style={resetButton} onClick={onReset}
                              style={{
                                width: "100px",
                                height: "32px",
                                fontSize: "15px",
                                borderRadius: "5px",
                              }}
                              onClick={() => {
                                setAddTravel(false);
                                form.resetFields();
                                setFile([]);
                              }}
                            >
                              <CloseOutlined />
                              Cancel
                            </Button>

                            <Button
                              //   style={submitButton}
                              htmlType="submit"
                              // onClick={() => form.submit(handleSubmit3)}
                              style={{
                                width: "100px",
                                height: "32px",
                                fontSize: "15px",
                                color: "#ffffff",
                                backgroundColor: "#35527F",
                                borderRadius: "5px",
                              }}
                              type="primary"
                            >
                              <CheckOutlined />
                              Submit
                            </Button>
                          </Space>
                        </Col>
                      </Col>
                    </>
                  ) : (
                    <Button
                      className="addButtonTravel"
                      onClick={() => {
                        setAddTravel(true);
                      }}
                      block
                    >
                      <PlusOutlined style={{ fontSize: "16px" }} /> Add Travel
                    </Button>
                  )}
                </Row>
              </Form>
            </Card>
            <Table className="travelTable" columns={travelColumns} />
            <Table className="travelTable" columns={travelColumns} />
          </>
        ) : (
          <>
            <Table className="travelTable" columns={columns} />
          </>
        )}
      </div>
    </>
  );
}

export default TravelManagement;
