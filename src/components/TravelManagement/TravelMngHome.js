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
import TravelManagement from "./travelManagement";
import InvoiceContext from "../../contexts/InvoiceContext";
import moment from "moment";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import ViewTravelMng from "./ViewTravelMng";

const { RangePicker } = DatePicker;

function TravelMngHome(props) {
  console.log("props", props);
  const [addTravel, setAddTravel] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [travelDetails, setTravelDetails] = useState([]);
  const [user, setUser] = useState({});
  const [viewTravelData, setViewTravelData] = useState({});
  const [durationArray, setDurationArray] = useState([]);
  const [openViewModal, setOpenViewModal] = useState(false);
  const role = props.roleView == "emp";
  console.log(props.roleView);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  function viewModal(data) {
    setOpenViewModal(true);
    setViewTravelData(data);
  }

  const travelColumns = [
    {
      title: "Travel Title",
      dataIndex: "travelName",
      key: "travelName",
      width: 200,
      align: "left",
    },
    {
      title: "Duration",
      dataIndex: "durationDate",
      key: "durationDate",
      width: 200,
      align: "left",
      render: (_, record, index) => {
        console.log("record", record);
        let temp = durationArray[index];
        // console.log("temp,", temp);
        let numberOfDays = moment(temp[temp.length - 1], "DD-MM-YYYY").diff(
          moment(temp[0], "DD-MM-YYYY"),
          "days"
        );

        return <div>{numberOfDays + 1}</div>;
      },
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
                onClick={() => {
                  viewModal(record);
                }}
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

  console.log("user;;", user);

  const handleCarChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  console.log("currentuser", currentUser);
  const onFinish = async (values) => {
    console.log("travelData", values);

    const allTravelData = {
      travelName: values.travelName,
      people: values.people,
      status: "Pending",
      empId: currentUser.uid,
      empName: user.name,
      empCode: user.empId,
      date: moment().format("DD-MM-YYYY"),
      travelType: values.users.map((type) => {
        console.log(type);
        switch (type.bookingOption) {
          case "travel":
            let temp = {
              bookingOption: "travel",
              durationDate: type.travelDate.format("DD-MM-YYYY"),
              depart: type.depart,
              arrival: type.arrival,
              transport: type.transport,
            };
            delete temp.travelDate;
            return temp;

          case "hotel":
            let hotelData = {
              bookingOption: "hotel",
              durationDate: type.duration.map((dt) => dt.format("DD-MM-YYYY")),
              location: type.location,
            };
            delete hotelData.duration;
            return hotelData;
          case "rental":
            let rentalData = {
              bookingOption: "rental",
              durationDate: type.rentalDate.map((dt) =>
                dt.format("DD-MM-YYYY")
              ),
              vehicleType: type.vehicleType,
              driver: type.driver,
            };
            delete rentalData.rentalDate;
            return rentalData;
        }
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

  const getAlltravelData = async () => {
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
    let travleData = await TravelContext.getAllTravel(currentUser.uid);
    console.log(travleData);
    setTravelDetails(travleData);
    setUser(userData);
    let data = travleData.map((record) => {
      let dur = record.travelType.map((dt) => dt.durationDate);
      let temp = [].concat.apply([], dur);

      console.log("dur", dur);
      temp.sort((a, b) => {
        return moment(a, "DD-MM-YYYY") - moment(b, "DD-MM-YYYY");
      });
      return temp;
    });
    console.log("data", data);
    setDurationArray(data);
  };

  console.log("travelDetails", travelDetails);

  useEffect(() => {
    getAlltravelData();
  }, []);

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
                  <Col xs={24} xm={24} md={12} lg={12}>
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
                          message: "Please Enter The Title",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please Enter Valid Title",
                        },
                      ]}
                    >
                      <Input maxLength={25} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} xm={24} md={12} lg={12}>
                    <Form.Item
                      label="No. of People"
                      name="people"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter the no. of People",
                        },
                        {
                          pattern: /^[0-9\s]*$/,
                          message: "Please Enter numbers only",
                        },
                      ]}
                    >
                      <Input maxLength={10} />
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
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={11}
                                                lg={11}
                                              >
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
                                              <Col
                                                xs={22}
                                                xm={22}
                                                md={11}
                                                lg={11}
                                              >
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
                                                      message:
                                                        "Please Enter the Hotel Address",
                                                    },
                                                    {
                                                      pattern:
                                                        /^[a-zA-Z0-9-,\s]*$/,
                                                      // message:
                                                      //   "Please Enter Valid Title",
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
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={4}
                                                lg={4}
                                              >
                                                <Form.Item
                                                  label="Date of Travel"
                                                  {...field}
                                                  name={[
                                                    field.name,
                                                    "travelDate",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "payment"]}
                                                  className="travelDatePicker"
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
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={6}
                                                lg={6}
                                              >
                                                <Form.Item
                                                  label="From"
                                                  {...field}
                                                  name={[field.name, "depart"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please Enter the name of place your journey starts from",
                                                    },
                                                    {
                                                      pattern: /^[a-zA-Z\s]*$/,
                                                      message:
                                                        "Please Enter Valid Title",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    placeholder="Booking From"
                                                    maxLength={25}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={6}
                                                lg={6}
                                              >
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
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please Enter the name of the place your Ends to",
                                                    },
                                                    {
                                                      pattern: /^[a-zA-Z\s]*$/,
                                                      message:
                                                        "Please Enter Valid Title",
                                                    },
                                                  ]}
                                                >
                                                  <Input
                                                    placeholder="Traveling to"
                                                    maxLength={25}
                                                  />
                                                </Form.Item>
                                              </Col>
                                              <Col
                                                xs={22}
                                                xm={22}
                                                md={6}
                                                lg={6}
                                              >
                                                <Form.Item
                                                  initialValue={"flight"}
                                                  label="Transport Type"
                                                  {...field}
                                                  name={[
                                                    field.name,
                                                    "transport",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "upload"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      // message: "Please select the mode of Transportation",
                                                    },
                                                  ]}
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
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={10}
                                                lg={10}
                                              >
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
                                              <Col
                                                xs={24}
                                                xm={24}
                                                md={9}
                                                lg={9}
                                              >
                                                <Form.Item
                                                  label="Type of Vehicle"
                                                  // {...field}
                                                  name={[
                                                    field.name,
                                                    "vehicleType",
                                                  ]}
                                                  // fieldKey={[field.fieldKey, "amount"]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message:
                                                        "Please select the Vehicle Type",
                                                    },
                                                  ]}
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
                                              <Col
                                                xs={22}
                                                xm={22}
                                                md={3}
                                                lg={3}
                                              >
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
            <Table
              className="travelTable"
              columns={travelColumns}
              dataSource={travelDetails}
            />
            <Modal
              destroyOnClose
              centered
              open={openViewModal}
              footer={null}
              title="TRAVEL DETAILS"
              closeIcon={
                <div
                  onClick={() => {
                    setOpenViewModal(false);
                  }}
                  style={{ color: "#ffff" }}
                >
                  X
                </div>
              }
              className="viewModal"
            >
              <ViewTravelMng
                setOpenViewModal={setOpenViewModal}
                viewTravelData={viewTravelData}
              />
            </Modal>
          </>
        ) : (
          <TravelManagement
            roleView={role}
            getTravelData={getAlltravelData}
            travelDetails={travelDetails}
            durationArray={durationArray}
            user={user}
          />
        )}
      </div>
    </>
  );
}

export default TravelMngHome;
