import { Button, Col, DatePicker, Divider, Form, Input, Row, Space, message } from "antd";
import { useState } from "react";
import {
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { showNotification } from "../../../contexts/CreateContext";
import InvoiceContext from "../../../contexts/InvoiceContext";
import { capitalize, checkAlphabets } from "../../../contexts/CreateContext";

const InvoiceForm = (props) => {
  console.log('props', props?.assetData[0])
  const upgradeFormData = props?.assetData[0];
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
      empCode: user.empId || upgradeFormData.empCode,
      name: user.name || upgradeFormData.name,
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
    const temp = [...file];
    temp[i] = event.target.files[0];
    const isLt2M = temp[i].size / 1024 / 1024 < 2;
    setFile(temp);
    const allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    console.log(temp[i], temp[i].type)
    if (temp[i] && allowedFileTypes.includes(temp[i].type)) {
      message.success('File uploaded: ' + temp[i].name);
    } else {
      message.error('Invalid file type');
    }
  }

  return (
    <Form form={form} onFinish={handleSubmit}>
      <Row span={24} gutter={[16, 16]}>
        <Col span={12}>
          <Form.Item

            label="Invoice Title"
            name="invoiceName"
            onKeyPress={(event) => {
              if (checkAlphabets(event)) {
                event.preventDefault();
              }
            }}
            rules={[
              {
                required: true,
                message: "Please enter a title",
              },
              {
                pattern: /^[a-zA-Z]+$/,
                message: "Please enter Valid Title",
              },
            ]}
          >
            <Input maxLength={25}
              placeholder="Enter Invoice Title (Max 25)"
              onChange={(e) => {
                const str = e.target.value;
                const caps = str
                  .split(" ")
                  .map(capitalize)
                  .join(" ");
                form.setFieldsValue({
                  invoiceName: caps,
                });
              }} />
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
                              Invoice No.{i + 1}
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
                                <Input maxLength={50} placeholder="Enter Description" />
                              </Form.Item>
                            </Col>
                            <Col md={10} sm={24}>
                              <Form.Item
                                label="Upload Image"
                                {...field}
                                name={[field.name, "upload"]}
                                // fieldKey={[field.fieldKey, "upload"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Upload File",
                                  },
                                ]}
                              >
                                <div className="idpage">
                                  <Input
                                    type="file"
                                    accept=".pdf,.jpeg,.jpg,.png"
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
                          className="addFieldTravel"
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
            </Row>
            <Col
              span={24}
              classsname="gutter-row"
              style={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Space>
                <Form.Item>
                  <Button className="button-white" onClick={() => {
                    setAddExpense(false);
                    form.resetFields();
                    setFile([]);
                  }}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button className='button-color' htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Space>
            </Col>
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
