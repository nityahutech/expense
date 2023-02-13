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
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import "./travelManagement.css";
// import { EyeFilled, EditFilled } from "@ant-design/icons";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";

function TravelManagement(prop) {
  const role = prop.roleView == "emp";
  console.log(prop.roleView);
  const { TextArea } = Input;
  const { RangePicker } = DatePicker;
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
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      width: 200,
      align: "left",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "Date",
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
  return (
    <>
      <div className="travelDiv">
        {role ? (
          <>
            <Card className="travelCard" title="Travel Management">
              <Form
                // className="addEmp"
                // form={form}
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
                // onFinish={onFinish}
              >
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <Form.Item label="Title">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="No. of People">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[16, 16]}>
                      <Divider
                        orientation="left"
                        orientationMargin="15px"
                        style={{ margin: "0px" }}
                      >
                        Expenditure No.1
                      </Divider>
                      <Col span={24}>
                        <Form.Item
                          label="No. of People"
                          // wrappercol={{
                          //   span: 12,
                          // }}
                          // labelcol={{
                          //   span: 4,
                          // }}
                        >
                          <Select
                            defaultValue="Travel Booking"
                            style={{
                              width: "25%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                value: "Travel Booking",
                                label: "Travel Booking",
                              },
                              {
                                value: "Hotel Booking",
                                label: "Hotel Booking",
                              },
                              {
                                value: "Rental Booking",
                                label: "Rental Booking",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={4}>
                        <Form.Item
                          label="Date of Payment"
                          // {...field}
                          // name={[field.name, "paymentDate"]}
                          // fieldKey={[field.fieldKey, "payment"]}
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
                      <Col span={6}>
                        <Form.Item
                          label="From"
                          // {...field}
                          // name={[field.name, "amount"]}
                          // fieldKey={[field.fieldKey, "amount"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Amount",
                            },
                            {
                              pattern: /^[0-9\s]*$/,
                              message: "Please Enter Valid Title",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Booking From"
                            maxLength={10}
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
                      <Col span={6}>
                        <Form.Item
                          label="To"
                          // {...field}
                          // name={[field.name, "description"]}
                          // fieldKey={[
                          //   field.fieldKey,
                          //   "description",
                          // ]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Description",
                            },
                          ]}
                        >
                          <Input placeholder="Traveling to" />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <Form.Item
                          label="Upload Image"
                          // {...field}
                          // name={[field.name, "upload"]}
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
                      <Col span={2} className="actionButton">
                        <MinusCircleOutlined
                        // onClick={() => {
                        //   remove(field.name);
                        //   let temp = [...file];
                        //   // delete temp[i];
                        //   temp.splice(i, 1);
                        //   console.log(temp);
                        //   setFile(temp);
                        // }}
                        />
                      </Col>
                    </Row>
                    <Row gutter={[16, 16]}>
                      <Divider
                        orientation="left"
                        orientationMargin="15px"
                        style={{ margin: "0px" }}
                      >
                        Expenditure No.2
                      </Divider>
                      <Col span={24}>
                        <Form.Item
                          label="Request For"
                          // wrappercol={{
                          //   span: 12,
                          // }}
                          // labelcol={{
                          //   span: 4,
                          // }}
                        >
                          <Select
                            defaultValue="Hotel Booking"
                            style={{
                              width: "25%",
                            }}
                            // onChange={handleChange}
                            options={[
                              {
                                value: "Travel Booking",
                                label: "Travel Booking",
                              },
                              {
                                value: "Hotel Booking",
                                label: "Hotel Booking",
                              },
                              {
                                value: "Rental Booking",
                                label: "Rental Booking",
                              },
                            ]}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={10}>
                        <Form.Item
                          label="Date of Payment"
                          // {...field}
                          // name={[field.name, "paymentDate"]}
                          // fieldKey={[field.fieldKey, "payment"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Payment Date",
                            },
                          ]}
                        >
                          <RangePicker
                            style={{width:"100%"}}
                          format={"DD-MM-YYYY"}  />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Location"
                          // {...field}
                          // name={[field.name, "amount"]}
                          // fieldKey={[field.fieldKey, "amount"]}
                          rules={[
                            {
                              required: true,
                              message: "Missing Amount",
                            },
                            {
                              pattern: /^[a-zA-Z,\s]*$/,
                              message: "Please Enter Valid Title",
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
                      <Col span={2} className="actionButton">
                        <MinusCircleOutlined
                        // onClick={() => {
                        //   remove(field.name);
                        //   let temp = [...file];
                        //   // delete temp[i];
                        //   temp.splice(i, 1);
                        //   console.log(temp);
                        //   setFile(temp);
                        // }}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                  </Col>
                  <Col span={24} className="buttonCol">
                    <Space>
                      <Form.Item>
                        <Button
                          // style={resetButton} onClick={onReset}
                          style={{
                            width: "100px",
                            height: "32px",
                            fontSize: "15px",
                            borderRadius: "5px",
                          }}
                        >
                          <CloseOutlined />
                          Cancel
                        </Button>
                      </Form.Item>
                      <Form.Item>
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
                        >
                          <CheckOutlined />
                          Submit
                        </Button>
                      </Form.Item>
                    </Space>
                  </Col>
                </Row>
                <Button
                  className="addButtonTravel"
                  // onClick={() => {
                  //   setAddExpense(true);
                  // }}
                  block
                >
                  <PlusOutlined style={{ fontSize: "16px" }} /> Add Expenses
                </Button>
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
