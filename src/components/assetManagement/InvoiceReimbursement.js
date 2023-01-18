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
  const [invoiceShow, setInvoiceShow] = useState(false)
  const [invoiceList, setInvoiceList] = useState([]);
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
              <Form 
                form={form} 
                style={{ width: "100%" }} 
                autoComplete="off"
              >
                    {editContent ? (
                      <>
                        <Form.List name="users">
                          {(editContent, { add }) => (
                            <>
                              <Row gutter={[16,16]} style={{ width: "100%" }}>
                                {editContent.map((field, i) => (<>
                                  <Divider orientation="left" orientationMargin="0">
                                    Expenditure No.{i+1}
                                  </Divider>
                                    <Col span={4}>
                                      <FormItem
                                      
                                      {...field}
                                      name={`payment${i}`}
                                        label="Payment Date"
                                      >
                                        <DatePicker 
                                          onChange={(e) => {
                                            let temp = [...editContent];
                                            temp[i].date = e.target.value;
                                            showEditContent(temp)
                                          }}/>
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                      
                                       {...field}
                                      name={`amount${i}`}
                                        label="Amount"
                                      >
                                        <Input 
                                          onChange={(e) => {
                                            let temp = [...editContent];
                                            temp[i].date = e.target.value;
                                            showEditContent(temp)
                                          }}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                       {...field}
                                      name={`description${i}`}
                                        label="Description"
                                      >
                                        <TextArea 
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        rows={2} 
                                        onChange={(e) => {
                                          let temp = [...editContent];
                                          temp[i].date = e.target.value;
                                          showEditContent(temp)
                                        }}
                                        />
                                      </FormItem>
                                    </Col>
                                    <Col span={6}>
                                      <FormItem
                                       {...field}
                                        name={`upload${i}`}
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
                                            onChange={(e) => {
                                              let temp = [...editContent];
                                              temp[i].date = e.target.value;
                                              showEditContent(temp)
                                            }}
                                          />
                                        </div>
                                      </FormItem>
                                    </Col>
                                    <Col span={2} 
                                    style={{display:'flex',justifyContent:'center',alignItems:"center"}}>
                                      <FormItem >                                      
                                        <Row gutter={[8,8]}>                                    
                                          <Col span={24}>
                                            <Button type="text" >
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
                                  onClick={(i) => add(i)}
                                  block
                                  icon={<PlusOutlined />}
                                >
                                  Add field
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>

                        <Form.Item style={{display:"flex",justifyContent:"end"}}>
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


              {/* <Form>
                {invoiceShow ? (<>
                  <Row gutter={[16,16]} style={{ width: "100%" }}>
                    {console.log(invoiceList)}
                    {invoiceList?.map((invoiceData, i)=>((<>
                      <Divider orientation="left" orientationMargin="0">
                        Expenditure No. {i+1}
                      </Divider>
                      <Col span={4}>
                                      <FormItem
                                      initialValue={invoiceList[i].date || null}
                                      name={`payment${i}`}
                                        label="Payment Date"
                                      >
                                        <DatePicker 
                                            onChange={(e) => {
                                              let temp = [...invoiceList];
                                              temp[i].date = e.target.value;
                                              setInvoiceList(temp)
                                            }}/>
                                      </FormItem>
                      </Col>
                      <Col span={6}>
                                      <FormItem
                                      initialValue={invoiceList[i].amount || null}
                                      name={`amount${i}`}
                                        label="Amount"
                                      >
                                        <Input 
                                            onChange={(e) => {
                                              let temp = [...invoiceList];
                                              temp[i].amount = e.target.value;
                                              setInvoiceList(temp)
                                            }}/>
                                      </FormItem>
                      </Col>
                      <Col span={6}>
                                      <FormItem
                                      initialValue={invoiceList[i].description || null}
                                      name={`description${i}`}
                                        label="Description"
                                      >
                                        <TextArea 
                                            onChange={(e) => {
                                              let temp = [...invoiceList];
                                              temp[i].description = e.target.value;
                                              setInvoiceList(temp)
                                            }}
                                        autoSize={{ minRows: 2, maxRows: 6 }}
                                        rows={2} />
                                      </FormItem>
                      </Col>
                      <Col span={6}>
                                      <FormItem
                                        name={`upload${i}`}
                                        label="Upload the bill"
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
                                      </FormItem>
                      </Col>
                      <Col span={2}>
                        <FormItem >                                                                      
                          <Col span={24}>
                            <Button 
                              onClick={() => {
                                setInvoiceList([])
                                let temp = [...invoiceList]
                                temp.splice(i, i)
                                console.log(i, temp)
                                setInvoiceList(temp)
                              }}
                            >
                              <CloseOutlined />
                            </Button>
                          </Col>
                        </FormItem>
                      </Col>  
                      </>)))}                                  
                  </Row>
                  <Form.Item>
                    <Button
                      type="dashed"
                      style={{ width: "150px" }}
                      onClick={() => setInvoiceList([...invoiceList, []])}
                      block
                      icon={<PlusOutlined />}
                    >
                        Add Expenditure
                    </Button>
                  </Form.Item>
                </>):(<>
                  <Form.Item>
                        <Button
                          style={{
                            background: "#1963a6",
                            marginLeft: "7%",
                          }}
                          type="primary"
                          onClick={() => setInvoiceShow(true)}
                        >
                          Add Expenses
                        </Button>
                  </Form.Item>
                </>)}
              </Form> */}

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
