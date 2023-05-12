import React, { useState, useEffect } from "react";
import {

  Button,
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

} from "@ant-design/icons";
import "../travelManagement.css";
import {
  checkAlphabets,
  showNotification,
  capitalize,
} from "../../../contexts/CreateContext";
import TravelContext from "../../../contexts/TravelContext";
import moment from "moment";


const { RangePicker } = DatePicker;

function TravelMngHome() {
  const [addTravel, setAddTravel] = useState(false);
  const [selectedOption, setSelectedOption] = useState([]);
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [user, setUser] = useState({});
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;

  const currentUser = JSON.parse(sessionStorage.getItem("user"));


  const handleCarChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  console.log("currentuser", currentUser);
  const onFinish = async (values) => {
    console.log("travelData", values);

    const allTravelData = {
      travelName: values.travelName,
      reason: values.reason,
      status: "Pending",
      empId: currentUser.uid,
      empName: user.name,
      empCode: user.empId,
      date: moment().format("DD-MM-YYYY"),
      travelType: values.users.map((type) => {
        console.log(type);
        switch (type.bookingOption) {
          case "Travel":
            let temp = {
              bookingOption: "Travel",
              durationDate: type.travelDate.format("DD-MM-YYYY"),
              depart: type.depart,
              arrival: type.arrival,
              transport: type.transport,
            };
            delete temp.travelDate;
            return temp;

          case "Hotel":
            let hotelData = {
              bookingOption: "Hotel",
              durationDate: type.duration.map((dt) => dt.format("DD-MM-YYYY")),
              location: type.location,
            };
            delete hotelData.duration;
            return hotelData;
          case "Rental":
            let rentalData = {
              bookingOption: "Rental",
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



  return (
    <>
      <div className="travelDiv">

        <>  
          <Form
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
                  <Input
                    maxLength={25}
                    onChange={(e) => {
                      const str = e.target.value;
                      const caps = str.split(" ").map(capitalize).join(" ");
                      form.setFieldsValue({ travelName: caps });
                    }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} xm={24} md={12} lg={12}>
                <Form.Item
                  label="Reason"
                  name="reason"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Reason",
                    },
                  ]}
                >
                  <TextArea maxLength={10} />
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
                                                value: "Travel",
                                                label: "Travel Booking",
                                              },
                                              {
                                                value: "Hotel",
                                                label: "Hotel Booking",
                                              },
                                              {
                                                value: "Rental",
                                                label: "Rental Booking",
                                              },
                                            ]}
                                          />
                                        </Form.Item>
                                      </Col>
                                      {selectedOption[i] === "Hotel" ? (
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
                                              onKeyPress={(event) => {
                                                if (checkAlphabets(event)) {
                                                  event.preventDefault();
                                                }
                                              }}
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
                                                  const str =
                                                    e.target.value;
                                                  const caps = str
                                                    .split(" ")
                                                    .map(capitalize)
                                                    .join(" ");
                                                  let temp =
                                                    form.getFieldsValue();
                                                  temp.users[
                                                    field.key
                                                  ].location = caps;
                                                  form.setFieldsValue(temp);
                                                }}
                                              />
                                            </Form.Item>
                                          </Col>
                                        </>
                                      ) : selectedOption[i] === "Travel" ? (
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
                                              onKeyPress={(event) => {
                                                if (checkAlphabets(event)) {
                                                  event.preventDefault();
                                                }
                                              }}
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
                                                onChange={(e) => {
                                                  const str =
                                                    e.target.value;
                                                  const caps = str
                                                    .split(" ")
                                                    .map(capitalize)
                                                    .join(" ");
                                                  let temp =
                                                    form.getFieldsValue();
                                                  temp.users[
                                                    field.key
                                                  ].depart = caps;
                                                  form.setFieldsValue(temp);
                                                }}
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
                                              onKeyPress={(event) => {
                                                if (checkAlphabets(event)) {
                                                  event.preventDefault();
                                                }
                                              }}
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
                                                onChange={(e) => {
                                                  const str =
                                                    e.target.value;
                                                  const caps = str
                                                    .split(" ")
                                                    .map(capitalize)
                                                    .join(" ");
                                                  let temp =
                                                    form.getFieldsValue();
                                                  temp.users[
                                                    field.key
                                                  ].arrival = caps;
                                                  form.setFieldsValue(temp);
                                                }}
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
                                                    value: "Flight",
                                                    label: "Flight",
                                                  },
                                                  {
                                                    value: "Train",
                                                    label: "Train",
                                                  },
                                                  {
                                                    value: "Bus",
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
                                                    value:
                                                      "Sedan(5 Seater)",
                                                    label:
                                                      "Sedan(5 Seater)",
                                                  },
                                                  {
                                                    value:
                                                      "Hatchback(5 Seater)",
                                                    label:
                                                      "Hatchback(5 Seater)",
                                                  },
                                                  {
                                                    value: "Suv(7 Seater)",
                                                    label: "Suv(7 Seater)",
                                                  },
                                                  {
                                                    value: "Muv(7 Seater)",
                                                    label: "Muv(7 Seater)",
                                                  },
                                                  {
                                                    value:
                                                      "Luxury(2 Seater)",
                                                    label:
                                                      "Luxury(2 Seater)",
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
                                    temp.push("Travel");
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
              
                          htmlType="submit"
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
        </>

      </div>
    </>
  );
}

export default TravelMngHome;
