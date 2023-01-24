import { React, useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  Table,
  DatePicker,
  TextArea,
  Space,
  Divider,
  Tooltip,
  Tag,
  Modal,
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled,
  EditFilled,
} from "@ant-design/icons";
import {
  showNotification,
  checkAlphabets,
  createUser,
} from "../../contexts/CreateContext";
import moment from "moment";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";

function EditInvoiceDetails(props) {
  const [AddExpense, setAddExpense] = useState(false);
  const { TextArea } = Input;
  const editInvoiceName = props.invoiceData
  const editInvoiceData = props.invoiceData.payments.map((data) => {
    return {
      ...data,
      paymentDate: moment(data?.paymentDate, "DD-MM-YYYY"),
    };
  });
  console.log(editInvoiceData);
  console.log(editInvoiceName)

  return (
    <>
      <Form layout="vertical" className="invoiceForm">
        <Row gutter={[44, 8]}>
        <Col span={24}>
                        <Form.Item
                        initialValue={editInvoiceName.invoiceName}
                          maxLength={25}
                          label="Invoice Reimbursement Title"
                          name="invoiceName"
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
          <Form.List name="users" initialValue={[...editInvoiceData]}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map(({ key, name, ...edit }) => (
                    <>
                      <Divider orientation="left" orientationMargin="10px">
                        Expenditure No.{key + 1}
                      </Divider>
                      {console.log(edit, editInvoiceData)}
                      <Col span={12}>
                        <Form.Item
                          {...edit}
                          name={[name, "paymentDate"]}
                          //   initialValue={moment(
                          //     editInvoiceData.payments[key]?.paymentDate,
                          //     "DD-MM-YYYY"
                          //   )}
                          label="Date of Payment"
                          rules={[
                            {
                              required: true,
                              message: "Missing Payment Date",
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            format={"DD-MM-YYYY"}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          {...edit}
                          // initialValue={edit?.amount}
                          name={[name, "amount"]}
                          label="Amount"
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
                            placeholder="Enter Amount"
                            maxLength={10}
                            style={{ borderRadius: "5px" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        <Form.Item
                          {...edit}
                          //   initialValue={edit?.description}
                          name={[name, "description"]}
                          label="Description"
                          rules={[
                            {
                              required: true,
                              message: "Missing Description",
                            },
                          ]}
                        >
                          <TextArea
                            autoSize={{ minRows: 3, maxRows: 6 }}
                            placeholder="Enter Description"
                            maxLength={150}
                            style={{ borderRadius: "5px" }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        {/* <Form.Item
                            // initialValue={edit?.upload}
                          label="Upload"
                          name="upload"
                        >
                          <div className="idpage">
                            <Input
                              type="file"
                              accept="application/pdf"
                              id="upload"
                              name="upload"
                              style={{ borderRadius: "5px" }}
                            />
                          </div>
                        </Form.Item> */}
                      </Col>
                      
                    </>
                  ))}
                  <Col span={24}>
                                <Button
                                  className="addField"
                                  onClick={() => {
                                    add();
                                  }}
                                  block
                                >
                                  <PlusOutlined /> Add field
                                </Button>
                              </Col>
                </>
              );
            }}
          </Form.List>
          <Divider/>
          <Col span={24} className="formButton">
                        <Button type="text" style={{ marginRight: "10px" }}>
                          <CloseOutlined />
                          Cancel
                        </Button>
                        <Button
                          htmlType="submit"
                          style={{
                            border: "1px solid #1963A6",
                            background: "#1963A6",
                            color: "#ffffff",
                            fontSize: "15",
                            lineHeight: "17px",
                            // width: "119px",
                          }}
                          type="primary"
                        >
                          <CheckOutlined />
                          Submit
                        </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default EditInvoiceDetails;
