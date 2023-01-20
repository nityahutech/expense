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
  Tag
} from "antd";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeFilled
} from "@ant-design/icons";
import "./invoice.css";
import FormItem from "antd/es/form/FormItem";
import moment from "moment";
import InvoiceContext from "../../contexts/InvoiceContext";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { showNotification,checkAlphabets, createUser } from "../../contexts/CreateContext";
import { useEffect } from "react";
import Checkmark from "../../images/checkmark.png";
import CheckReject from "../../images/rejected.png";

function InvoiceReimbursement(props) {
  const [AddExpense, setAddExpense] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState([])
  const [user, setUser] = useState({});
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const role = sessionStorage.getItem("role");



  const onFinish = (values) => {
    console.log(values, "ektaaaaaaaa");
    const allInvoiceData = {
      invoiceName: values.invoiceName,
      totalAmt: values.totalAmt,
      invoiceDate: moment().format("DD-MM-YYYY"),
      status : "Pending",
      empId: currentUser.uid,
      empCode: user.empId,
      name: user.name,
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
      getAllInvoiceData()
    } catch (error) {
      showNotification("error", "Error", "Error In Invoice");
    }
  };

  useEffect(()=>{
    getAllInvoiceData()
  },[props.roleView])

  const getAllInvoiceData = async ()=>{
    let invoiceData = await InvoiceContext.getInvoice(createUser.uid);
    let userData = await EmpInfoContext.getEduDetails(currentUser.uid);
setUser(userData)
   setInvoiceDetails(invoiceData);
   

  }

  const invoiceColumns=[
    {
      title: "Employee Code",
      dataIndex: "empCode",
      key: "empCode",
      width: 150,
      align: "left",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 200,
      align: "left",
    },

    {
      title: "Invoice Date ",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 200,
      align: "left",
    },
    {
      title: "Invoice Name",
      dataIndex: "invoiceName",
      key: "invoiceName",
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
      dataIndex:"status",
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
      width: 100,
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
              // onClick={() => {
              //   setStatus(record, "Approved");
              // }}
            >
              <img src={Checkmark} />
            </Button>
            <Button
              style={record.status == "Pending" ? null : { display: "none" }}
              type="link"
              className="deleTe"
              // onClick={() => {
              //   setStatus(record, "Reject");
              // }}
            >
              <img src={CheckReject} width={20} />
            </Button>
           
          </div>
        </>
      ),
    },
  ];
  

  const columns = [
    {
      title: "Invoice Date ",
      dataIndex: "invoiceDate",
      key: "invoiceDate",
      width: 200,
      align: "left",
    },
    {
      title: "Invoice Name",
      dataIndex: "invoiceName",
      key: "invoiceName",
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
      dataIndex:"status",
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
      width: 100,
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
                
              >
                {<EyeFilled style={{ color: "#000000" }} />}
              </Button>
            </Tooltip>
           
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="invoiceCardDiv">
      {props.roleView == "emp"?(<> 
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
                <FormItem 
                  maxLength={25}
                  label="Invoice Reimbursement Title" name="invoiceName"
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
                          <div style={{width:"100%"}}>
                            {fields.map((field, i) => (
                              <>
                                <Space
                                  key={field.key}
                                  style={{ display: "flex", marginBottom: 8 }}
                                  align="start"
                                >
                                  <Row gutter={[16,16]}>
                                    <Divider
                                      orientation="left"
                                      orientationMargin="15px"
                                      style={{margin:"0px"}}
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
                                          {
                                            pattern: /^[0-9\s]*$/,
                                            message: "Please Enter Valid Title",
                                          },
                                        ]}
                                      >
                                        <Input
                                          placeholder="Enter Amount"
                                          maxLength={10}
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
                          </div>
                        );
                      }}
                    </Form.List>
                      <Col span={24} className="formButton">
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
                    </Col>
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

        <Card 
          title="Request Table" 
          className="invoiceCard2">
          <Table
            className="invoiceTable"
            columns={columns} 
            dataSource={invoiceDetails} />
        </Card>
      </>):(<>
        <Table 
          className="invoiceTable"
          columns={invoiceColumns} 
          dataSource={invoiceDetails} />
      </>)}
    </div>
  );
}

export default InvoiceReimbursement;
