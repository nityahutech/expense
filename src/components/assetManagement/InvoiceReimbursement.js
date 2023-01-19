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
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import "./invoice.css";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import AssetContext from "../../contexts/AssetContext";
import { showNotification } from "../../contexts/CreateContext";

function InvoiceReimbursement(props) {
  const [editContent, showEditContent] = useState(false);
  const [invoiceShow, setInvoiceShow] = useState(false);
  const [invoiceList, setInvoiceList] = useState([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = (values) => {
    const allInvoiceData = {
      title: values.title,
      totalAmt: values.totalAmt,
      invoice: moment().format("DD-MM-YYYY"),
      payment: values.payment.format("DD-MM-YYYY"),
      amount: values.amount,
      description: values.description,
    };
    try {
      AssetContext.addInvoice(allInvoiceData);
      showNotification("success", "Success", "Invoice Request Added");
    } catch (error) {
      showNotification("error", "Error", "Error In Invoice");
    }
  };

  return (
    <div className="invoiceCardDiv">
      <Card
        className="invoiceCard1"
        bordered="true"
        title="Invoice Reimbersement"
      >
        <Form layout="vertical" className="invoiceForm">
          <Row span={24} gutter={[16, 16]}>
            <Col span={12}>
              <FormItem label="Invoice Reimbersement Title">
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Total Amount">
                <Input />
              </FormItem>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]}>
                <Form
                  name="dynamic_form_nest_item"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Form.List name="users">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field,i) => (
                            <>
                              <Space
                                key={field.key}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="start"
                              >
                                <Row gutter={[16.16]}>
                                <Divider orientation="left" orientationMargin="0">
                                    Expenditure No.{i+1}
                                </Divider>
                                <Col span={4}>
                                  <Form.Item
                                    label="Date of Payment"
                                    {...field}
                                    name={[field.name, "payment"]}
                                    fieldKey={[field.fieldKey, "payment"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Payment Date",
                                      },
                                    ]}
                                  >
                                    <DatePicker />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    label="Amount"
                                    {...field}
                                    name={[field.name, "amount"]}
                                    fieldKey={[field.fieldKey, "amount"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Amount",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Enter Amount" />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                  <Form.Item
                                    label="Description"
                                    {...field}
                                    name={[field.name, "description"]}
                                    fieldKey={[field.fieldKey, "description"]}
                                    rules={[
                                      {
                                        required: true,
                                        message: "Missing Description",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Enter Description" />
                                  </Form.Item>
                                </Col>
                                <Col span={6}>
                                <FormItem
                                  label="Upload"
                                  {...field}
                                  name={[field.name, "upload"]}
                                  fieldKey={[field.fieldKey, "upload"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Missing Images",
                                    },
                                  ]}
                                >
                                  <div className="idpage">
                                    <Input
                                      type="file"
                                      accept="application/pdf"
                                      id="upload"
                                      name="upload"
                                      // onChange={handleChange}
                                      style={{ borderRadius: "5px" }}
                                      // onChange={(e) => {
                                      //   let temp = [...editContent];
                                      //   temp[].date = e.target.value;
                                      //   showEditContent(temp);
                                      // }}
                                    />
                                  </div>
                                </FormItem>
                                </Col>
                                <Col span={2} className="actionButton">
                                <MinusCircleOutlined
                                  onClick={() => {
                                    remove(field.name);
                                  }}
                                />
                                </Col>
                                </Row>
                              </Space>
                            </>
                          ))}

                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => {
                                add();
                              }}
                              block
                            >
                              <PlusOutlined /> Add field
                            </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>

                  <Form.Item style={{ display: "flex", justifyContent: "end" }}>
                    <Button
                      type="text"
                      style={{ marginRight: "10px" }}
                      onClick={() => {
                        showEditContent(false);
                        form.resetFields();
                      }}
                    >
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
                  </Form.Item>
                </Form>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>

      <Card title="Request Table" className="invoiceCard2">
        <Table />
      </Card>

    </div>
  );
}

export default InvoiceReimbursement;
