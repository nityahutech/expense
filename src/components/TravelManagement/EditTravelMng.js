import React, { useState } from "react";
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
} from "@ant-design/icons";
import moment from "moment";
import {
  checkAlphabets,
  showNotification,
  capitalize,
} from "../../contexts/CreateContext";
import TravelContext from "../../contexts/TravelContext";

function EditTravelMng(props) {
  console.log("propss", props);
  const [selectedOption, setSelectedOption] = useState(
    props.viewTravelData.travelType.map((x) => x.bookingOption)
  );
  const [addTravel, setAddTravel] = useState(false);
  const { RangePicker } = DatePicker;
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);

  const editTravelData = props.viewTravelData;

  const editTravelDetails = props.viewTravelData.travelType.map((data) => {
    let temp = { ...data };
    switch (temp.bookingOption) {
      case "Travel":
        temp.travelDate = moment(temp.durationDate, "DD-MM-YYYY");
        break;
      case "Rental":
        temp.rentalDate = temp.durationDate.map((x) => moment(x, "DD-MM-YYYY"));
        break;
      case "Hotel":
        temp.duration = temp.durationDate.map((x) => moment(x, "DD-MM-YYYY"));
    }
    delete temp.durationDate;
    return temp;
  });

  console.log(editTravelDetails);

  const handleCarChange = (value) => {
    console.log(`Selected: ${value}`);
  };

  const onFinish = (values) => {
    console.log("updateTravel", values);

    const editTravelData = {
      travelName: values.travelName,
      reason: values.reason,
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

    console.log("updatetraveldata", editTravelData);

    TravelContext.updateTravelData(props.viewTravelData.id, editTravelData)
      .then((res) => {
        showNotification("success", "Success", "Edit Successful");
        props.getData();
      })
      .catch((error) => {
        console.log(error);
        showNotification("error", "Error", "Failed to edit");
      });
    props.setIsEditModalOpen(false);
  };

  return (
    <>
      <Form
        // className="addEmp"

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
              initialValue={editTravelData?.travelName}
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
              initialValue={editTravelData?.reason}
              label="Reason"
              name="reason"
              rules={[
                {
                  required: true,
                  message: "Please Enter the reason",
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

          {/* {addTravel ? ( */}
          <>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Form.List name="users" initialValue={[...editTravelDetails]}>
                  {(fields, { add, remove }) => {
                    return (
                      <div className="Form-div" style={{ width: "100%" }}>
                        {fields.map((field, i, ...edit) => (
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
                              <Row gutter={[16, 16]} style={{ width: "100%" }}>
                                <Divider
                                  orientation="left"
                                  orientationMargin="15px"
                                  style={{ margin: "0px" }}
                                >
                                  Expenditure No.{i + 1}
                                </Divider>
                                <Col span={24}>
                                  <Form.Item
                                    {...edit}
                                    label="Type of Booking"
                                    name={[i, "bookingOption"]}
                                    initialValue={selectedOption[i]}
                                  >
                                    <Select
                                      style={{
                                        width: "25%",
                                      }}
                                      onChange={(e) => {
                                        let temp = [...selectedOption];
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
                                    <Col xs={24} xm={24} md={11} lg={11}>
                                      <Form.Item
                                        {...edit}
                                        label="Duration"
                                        // {...field}
                                        name={[field.name, "duration"]}
                                        // fieldKey={[field.fieldKey, "payment"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing Payment Date",
                                          },
                                        ]}
                                      >
                                        <RangePicker
                                          style={{ width: "100%" }}
                                          format={"DD-MM-YYYY"}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={22} xm={22} md={11} lg={11}>
                                      <Form.Item
                                        initialValue={
                                          editTravelDetails?.location
                                        }
                                        label="Location"
                                        // {...field}
                                        name={[field.name, "location"]}
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
                                            pattern: /^[a-zA-Z0-9-,\s]*$/,
                                            // message:
                                            //   "Please Enter Valid Title",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Hotel Destination"
                                          maxLength={50}
                                          onChange={(e) => {
                                            const str = e.target.value;
                                            const caps = str
                                              .split(" ")
                                              .map(capitalize)
                                              .join(" ");
                                            form.setFieldsValue({
                                              location: caps,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </>
                                ) : selectedOption[i] === "Travel" ? (
                                  <>
                                    <Col xs={24} xm={24} md={4} lg={4}>
                                      <Form.Item
                                        label="Date of Travel"
                                        {...field}
                                        name={[field.name, "travelDate"]}
                                        // fieldKey={[field.fieldKey, "payment"]}
                                        className="travelDatePicker"
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing Payment Date",
                                          },
                                        ]}
                                      >
                                        <DatePicker format={"DD-MM-YYYY"} />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} xm={24} md={6} lg={6}>
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
                                            message: "Please Enter Valid Title",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Booking From"
                                          maxLength={25}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} xm={24} md={6} lg={6}>
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
                                            message: "Please Enter Valid Title",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Traveling to"
                                          maxLength={25}
                                          onChange={(e) => {
                                            const str = e.target.value;
                                            const caps = str
                                              .split(" ")
                                              .map(capitalize)
                                              .join(" ");
                                            form.setFieldsValue({
                                              arrival: caps,
                                            });
                                          }}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={22} xm={22} md={6} lg={6}>
                                      <Form.Item
                                        initialValue={"flight"}
                                        label="Transport Type"
                                        {...field}
                                        name={[field.name, "transport"]}
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
                                    <Col xs={24} xm={24} md={10} lg={10}>
                                      <Form.Item
                                        label="Date"
                                        // {...field}
                                        name={[field.name, "rentalDate"]}
                                        // fieldKey={[field.fieldKey, "payment"]}
                                        rules={[
                                          {
                                            required: true,
                                            message: "Missing Payment Date",
                                          },
                                        ]}
                                      >
                                        <RangePicker
                                          style={{ width: "100%" }}
                                          format={"DD-MM-YYYY"}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={24} xm={24} md={9} lg={9}>
                                      <Form.Item
                                        label="Type of Vehicle"
                                        // {...field}
                                        name={[field.name, "vehicleType"]}
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
                                              value: "Sedan",
                                              label: "SEDAN",
                                            },
                                            {
                                              value: "Hatchback",
                                              label: "HATCH BACK",
                                            },
                                            {
                                              value: "Suv",
                                              label: "SUV",
                                            },
                                            {
                                              value: "Muv",
                                              label: "MUV",
                                            },
                                            {
                                              value: "Luxury",
                                              label: "LUXURY",
                                            },
                                          ]}
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col xs={22} xm={22} md={3} lg={3}>
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

                                <Col span={2} className="actionButton">
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
                    // style={resetButton} onClick={onReset}
                    style={{
                      width: "100px",
                      height: "32px",
                      fontSize: "15px",
                      borderRadius: "5px",
                    }}
                    onClick={() => {
                      props.setIsEditModalOpen(false);
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
          {/* ) : ( */}
          {/* <Button
            className="addButtonTravel"
            onClick={() => {
              setAddTravel(true);
            }}
            block
          >
            <PlusOutlined style={{ fontSize: "16px" }} /> Add Travel
          </Button> */}
          {/* )} */}
        </Row>
      </Form>
    </>
  );
}

export default EditTravelMng;
