import { Button, Col, DatePicker, Divider, Form, Input, Row, Space } from "antd";
import { useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { showNotification } from "../../../contexts/CreateContext";
import InvoiceContext from "../../../contexts/InvoiceContext";

const InvoiceForm = (props) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const [addExpense, setAddExpense] = useState(false);
  const [user, setUser] = useState({});
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const handleSubmit = async (values) => {
    console.log(values, "ektaaaaaaaa");
    const allInvoiceData = {
      invoiceName: values.invoiceName,
      totalAmt: values.totalAmt,
      date: moment().format("DD-MM-YYYY"),
      status: "Pending",
      empId: currentUser.uid,
      empCode: user.empId || null,
      name: user.name || null,
      type: 'Invoice Reimbursement',
      payments: values.users.map((pay) => {
        console.log(pay);
        return {
          ...pay,
          paymentDate: pay.paymentDate.format("DD-MM-YYYY"),
          upload: pay.upload,
        };
      }),
    };
    console.log(allInvoiceData, file, "pujaaaaaaaa");
    try {
      await InvoiceContext.addInvoice(allInvoiceData, file);
      showNotification("success", "Success", "Invoice Request Added");
      setTimeout(() => {
        setFile([]);
        setAddExpense(false);
        form.resetFields();
      }, 5000);
    } catch (error) {
      showNotification("error", "Error", error.message);
    }
  }

  function handleChange(event, i) {
    const isLt2M = file.size / 1024 / 1024 < 2;
    let temp = [...file];
    temp[i] = event.target.files[0];
    setFile(temp);
    console.log(temp);
  }

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row span={24} gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item
            maxLength={25}
            label="Invoice Title"
            name="invoiceName"
            rules={[
              {
                required: true,
                message: "Please enter a title",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label="Total Amount" name="totalAmt">
            <Input disabled={true} defaultValue={0} />
          </Form.Item>
        </Col>

        {addExpense ? (
          <Col span={24}>
            <Row gutter={[16, 16]}>
              <Form.List name="users">
                {(fields, { add, remove }) => {
                  return (
                    <div style={{ width: "100%" }}>
                      {fields.map((field, i) => (
                        <>
                          {/* <Space
                            key={field.key}
                            style={{ display: "flex", marginBottom: 8 }}
                            align="start"
                          > */}
                          <Row gutter={[16, 16]}>
                            <Divider
                              orientation="left"
                              orientationMargin="15px"
                              style={{ margin: "0px" }}
                            >
                              Expenditure No.{i + 1}
                            </Divider>
                            <Col md={10} sm={24}>
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
                            <Col md={10} sm={24}>
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
                            <Col md={10} sm={24}>
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
                            <Col md={10} sm={24}>
                              <Form.Item
                                label="Upload Image"
                                {...field}
                                name={[field.name, "upload"]}
                              // fieldKey={[field.fieldKey, "upload"]}
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
                                    accept="application/pdf, image/png, image/jpeg"
                                    id="upload"
                                    name="upload"
                                    onChange={(e) => handleChange(e, i)}
                                    style={{ borderRadius: "5px" }}
                                  />
                                </div>
                              </Form.Item>
                            </Col>
                            <Col span={2} className="actionButton">
                              <MinusCircleOutlined
                                onClick={() => {
                                  remove(field.name);
                                  let temp = [...file];
                                  // delete temp[i];
                                  temp.splice(i, 1);
                                  console.log(temp);
                                  setFile(temp);
                                }}
                              />
                            </Col>
                          </Row>
                          {/* </Space> */}
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
                    setFile([]);
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
  );
};

export default InvoiceForm;
