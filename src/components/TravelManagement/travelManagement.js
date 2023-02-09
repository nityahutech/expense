import React, { useState, useEffect } from 'react'
import { 
    Card, 
    Button, 
    Table, 
    Tooltip, 
    Tag, 
    Modal,
    Space,
    Row,
  Col,
  Form,
  Input,
  DatePicker,
} from "antd";
import {
    MinusCircleOutlined,
    PlusOutlined,
    CheckOutlined,
    CloseOutlined,
    EyeFilled,
    EditFilled,
  } from "@ant-design/icons";
import "./travelManagement.css"
// import { EyeFilled, EditFilled } from "@ant-design/icons";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";


function TravelManagement(prop) {
      const role =prop.roleView == "emp"
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
  return (<>
        <div className='travelDiv'>
            {role ? (<>
                <Card
                 className='travelCard'
                 title="Travel Management"
                >
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
                    <Row gutter={[16,16]}>
                        <Col span={12}>
                            <Col span={24}>
                            <Form.Item label="Title"><Input /></Form.Item>
                            </Col>
                            <Col span={24}>
                            <Form.Item label="Date"><RangePicker style={{width:"100%"}}/></Form.Item>
                            </Col>
                            <Col span={24}>
                            <Form.Item label="Total Amount"><Input /></Form.Item>
                            </Col>
                        </Col>
                        <Col span={12}>
                            <Col span={24}>
                            <Form.Item
                                name="upload"
                                label="Upload the invoive"
                                className='uploadInput'
                            >
                                <div 
                                // className="idpage"
                                >
                                <Input
                                    type="file"
                                    accept="application/pdf"
                                    id="upload"
                                    name="upload"
                                    // onChange={handleChange}
                                    style={{ borderRadius: "5px" }}
                                />
                                </div>
                            </Form.Item>
                            </Col>
                            <Col span={24}>
                            <Form.Item label="Title">
                                <TextArea 
                                    placeholder="maxLength is 6" 
                                    autoSize={{
                                        minRows: 5,
                                        maxRows: 6,
                                      }} 
                                />
                            </Form.Item>
                            </Col>                        
                        </Col>
                        <Col span={24} className="buttonCol">
                            <Space>
                                <Form.Item>
                                    <Button 
                                    // style={resetButton} onClick={onReset}
                                    style={{
                                        width:"100px",
                                        height:"32px",
                                        fontSize:"15px",
                                        borderRadius:"5px",
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
                                        width:"100px",
                                        height:"32px",
                                        fontSize:"15px",
                                        color:"#ffffff",
                                        backgroundColor:"#35527F",
                                        borderRadius:"5px"
                                    }}
                                    >
                                         <CheckOutlined />
                                    Submit
                                    </Button>
                                </Form.Item>
                            </Space>
                        </Col>
                    </Row>
                    </Form>
                </Card>
                <Table className="travelTable"
                    columns={travelColumns}
                />
                <Table className="travelTable"
                    columns={travelColumns}
                />
            </>) : (<>
                <Table className="travelTable"
                    columns={columns}
                />
            </>)}

        </div>
    </>)
}

export default TravelManagement