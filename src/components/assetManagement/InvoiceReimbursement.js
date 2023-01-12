import {React,useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  Space,} from "antd";
import { 
  MinusCircleOutlined, 
  PlusOutlined, 
  CheckOutlined, 
  CloseOutlined } from "@ant-design/icons";
import "./invoice.css"
import FormItem from "antd/es/form/FormItem";


function InvoiceReimbursement() {
  const [editContent, showEditContent] = useState(false);
  const [form] = Form.useForm();



  return (
  <div className="invoiceCardDiv">
    <Card
      className="invoiceCard"
      bordered="true"
      title="Invoice Reimbersement"
    >
      <Form
        layout="vertical"
      >
        <Row span={24} gutter={[16,16]}>
          <Col span={12}>
            <FormItem
              label="Invoice Reimbersement Title"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="Total Amount"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Payment Date"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Amount"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Description"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Upload"
            >
              <div
                style={{
                  border: "dashed #B9B9B9",
                  borderWidth: "thin",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Input 
                  bordered={false}
                />
              </div>
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Payment Date"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Amount"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Description"
            >
              <Input />
            </FormItem>
          </Col>
          <Col span={6}>
            <FormItem
              label="Upload"
            >
              <div
                style={{
                  border: "dashed #B9B9B9",
                  borderWidth: "thin",
                  borderRadius: "4px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Input 
                  bordered={false}
                />
              </div>
            </FormItem>
          </Col>
          <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                <Form form={form} style={{ width: "100%" }} autoComplete="off">
                  {editContent ? (
                    <>
                      <Form.List name="users">
                        {(fields, { add, remove }) => (
                          <>
                            <Row style={{ width: "100%" }}>
                              {fields.map(({ key, name, ...restField }) => (
                                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                                  
                                </Col>
                              ))}
                            </Row>

                            <Form.Item>
                              <Button
                                type="dashed"
                                style={{ width: "150px" }}
                                onClick={() => add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add field
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                      <Form.Item>
                        <Button
                          type="text"
                          style={{ marginRight: "10px" }}
                          onClick={() => {
                            showEditContent(false);
                            form.resetFields();
                          }}
                        >
                          <CloseOutlined />Cancel
                        </Button>
                        <Button
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
                          <CheckOutlined />Submit
                        </Button>
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item>
                      <Button
                        style={{
                          background: "#1963a6",
                          marginLeft: "20px",
                        }}
                        type="primary"
                        onClick={() => showEditContent(true)}
                      >
                        Add Expenses
                      </Button>
                    </Form.Item>
                  )}
                </Form>
          </Row>
        </Row>
      </Form>
    </Card>
  </div>
)}

export default InvoiceReimbursement;
