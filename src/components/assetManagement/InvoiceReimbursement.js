import {React,useState } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Input,
  Form,
  DatePicker,
  TextArea,
  Space,
  Divider,} from "antd";
import { 
  MinusCircleOutlined, 
  PlusOutlined, 
  CheckOutlined, 
  CloseOutlined } from "@ant-design/icons";
import "./invoice.css"
import FormItem from "antd/es/form/FormItem";




function InvoiceReimbursement() {
  const [editContent, showEditContent] = useState(false);
  const [invoiceList, setInvoiceList] = useState(true);
  const [form] = Form.useForm();
  const { TextArea } = Input;



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
          <Col span={24}>
            <Row gutter={[16, 16]}  >
                  <Form form={form} style={{ width: "100%" }} autoComplete="off">
                    {editContent ? (
                      <>
                        <Form.List name="users">
                          {(fields, { add, remove }) => (
                            <>
                              <Row gutter={[16,16]} style={{ width: "100%" }}>
                                {fields.map(({ key, name, ...restField }) => (<>
                                  <Divider orientation="left" orientationMargin="0">
                                    Expenditure No.1
                                  </Divider>
                                    <Col span={4}>
                                      <FormItem
                                        label="Payment Date"
                                      >
                                        <DatePicker />
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
                                        <TextArea 
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        rows={2} />
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
                                    <Col span={2}>
                                    <FormItem
                                        label="Action"
                                      >
                                      
                                    <Row gutter={[8,8]}>
                                    <Col span={12}>
                                    <CheckOutlined />
                                    </Col>
                                    <Col span={12}>
                                    <CloseOutlined />
                                    </Col>
                                    </Row>
                                    </FormItem>
                                    </Col>
                                    
                                    </>))}
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
          </Col>
        </Row>
      </Form>
    </Card>
  </div>
)}

export default InvoiceReimbursement;
