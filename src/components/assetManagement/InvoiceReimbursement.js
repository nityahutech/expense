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
import InvoiceContext from "../../contexts/InvoiceContext";
import { showNotification } from "../../contexts/CreateContext";

function InvoiceReimbursement(props) {
  const [AddExpense, setAddExpense] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  // const [amount, setAmount] = useState(0);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const onFinish = (values) => {
    console.log(values, "ektaaaaaaaa");
    const allInvoiceData = {
      invoiceName: values.invoiceName,
      totalAmt: values.totalAmt,
      invoiceDate: moment().format("DD-MM-YYYY"),
      payments: values.users.map((pay) => {
        console.log(pay);
        return {
          ...pay,
          paymentDate: pay.paymentDate.format("DD-MM-YYYY"),
          upload: pay.upload || null,
        };
      }),
    };
    console.log(allInvoiceData, "pujaaaaaaaa");
    try {
      InvoiceContext.addInvoice(allInvoiceData);
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
        title="Invoice Reimbursement"
      >
        <Form
          layout="vertical"
          className="invoiceForm"
          onFinish={onFinish}
          form={form}
        >
          <Row span={24} gutter={[16, 16]}>
            <Col span={12}>
              <FormItem label="Invoice Reimbursement Title" name="invoiceName">
                <Input />
              </FormItem>
            </Col>
            <Col span={12}>
              <FormItem label="Total Amount" name="totalAmt">
                <Input disabled={true} value={totalAmount || 0} />
              </FormItem>
            </Col>
            {/* <Col span={6}>
              <FormItem label="Invoice Date" name="invoiceDate">
                <DatePicker format={"DD-MM-YYYY"} defaultValue={moment()} />
              </FormItem>
            </Col> */}
            {AddExpense ? (
              <Col span={24}>
                <Row gutter={[16, 16]}>
                  {/* <Form
                    name="dynamic_form_nest_item"
                    autoComplete="off"
                    form={form}
                  > */}
                  <Form.List name="users">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field, i) => (
                            <>
                              <Space
                                key={field.key}
                                style={{ display: "flex", marginBottom: 8 }}
                                align="start"
                              >
                                <Row gutter={[16.16]}>
                                  <Divider
                                    orientation="left"
                                    orientationMargin="0"
                                  >
                                    Expenditure No.{i + 1}
                                  </Divider>
                                  <Col span={4}>
                                    <Form.Item
                                      label="Date of Payment"
                                      {...field}
                                      name={[field.name, "paymentDate"]}
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
                                      label="Amount"
                                      {...field}
                                      name={[field.name, "amount"]}
                                      // fieldKey={[field.fieldKey, "amount"]}
                                      rules={[
                                        {
                                          required: true,
                                          message: "Missing Amount",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Enter Amount"
                                        onChange={(e) => {
                                          // console.log(e.target.value);
                                          // const amt = e.target.value;
                                          // setAmount(amt);
                                          let temp = 0;
                                          fields.map((field) => {
                                            let data = form.getFieldValue([
                                              "users",
                                              field.name,
                                              "amount",
                                            ]);
                                            temp = temp + Number(data);
                                          });

                                          form.setFieldsValue({
                                            totalAmt: temp,
                                          });
                                        }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={6}>
                                    <Form.Item
                                      label="Description"
                                      {...field}
                                      name={[field.name, "description"]}
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
                                      <Input placeholder="Enter Description" />
                                    </Form.Item>
                                  </Col>
                                  <Col span={6}>
                                    <FormItem
                                      label="Upload"
                                      {...field}
                                      name={[field.name, "upload"]}
                                      fieldKey={[field.fieldKey, "upload"]}
                                      // rules={[
                                      //   {
                                      //     required: true,
                                      //     message: "Missing Images",
                                      //   },
                                      // ]}
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
                              className="addField"
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

                  <Button
                    type="text"
                    style={{ marginRight: "10px" }}
                    onClick={() => {
                      setAddExpense(false);
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

                  {/* </Form> */}
                </Row>
              </Col>
            ) : (
              <Button
                className="addButton"
                onClick={() => {
                  setAddExpense(true);
                }}
                block
              >
                <PlusOutlined style={{ fontSize: "16px" }} /> Add Expenses
              </Button>
            )}
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
