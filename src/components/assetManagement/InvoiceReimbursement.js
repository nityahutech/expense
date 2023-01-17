import {React,useState } from "react";
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
      className="invoiceCard1"
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
                          {(editContent, { add, remove }) => (
                            <>
                              <Row gutter={[16,16]} style={{ width: "100%" }}>
                                {editContent.map(({ key, name, ...restField }) => (<>
                                  <Divider orientation="left" orientationMargin="0">
                                    Expenditure No.{key+1}
                                  </Divider>
                                    <Col span={4}>
                                      <FormItem
                                      name="payment"
                                        label="Payment Date"
                                      >
                                        <DatePicker />
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                      name="amount"
                                        label="Amount"
                                      >
                                        <Input />
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                      name="description"
                                        label="Description"
                                      >
                                        <TextArea 
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        rows={2} />
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                        name="upload"
                                        label="Upload the bill"
                                      >
                                        <div className="idpage">
                                          <Input
                                            type="file"
                                            accept="application/pdf"
                                            id="upload"
                                            name="upload"
                                            // onChange={handleChange}
                                            style={{ borderRadius: "5px" }}
                                          />
                                        </div>
                                      </FormItem>
                                    </Col>
                                    <Col span={2}>
                                      <FormItem label="Action">                                      
                                        <Row gutter={[8,8]}>                                    
                                          <Col span={24}>
                                            <Button onClick={()=>{form.resetFields()}}>
                                              <CloseOutlined />
                                            </Button>
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
    <Card 
    title="Request Table"
    className="invoiceCard2">
      <Table/>
    </Card>
  </div>
)}

export default InvoiceReimbursement;
