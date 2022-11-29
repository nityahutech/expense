import { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { Card, Row, Col, Input, Button, Form } from "antd";
import { EditFilled, CloseOutlined, CheckOutlined } from "@ant-design/icons";
import "../../style/BankAccount.css";

function BankAccount() {
  const [form] = Form.useForm();
  const [editContent, showEditContent] = useState(false);
  const [data, setData] = useState("");
  const currentUser = JSON.parse(sessionStorage.getItem("user"));

  const onFinish = (values) => {
    EmpInfoContext.updateEduDetails(currentUser.uid, values);
    showEditContent(false);
    let temp = {
      ...data,
      bankName: values.bankName,
      accountNumber: values.accountNumber,
      ifscCode: values.ifscCode,
    };
    setData(temp);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log(data);
    setData(data);
  };

  const checkNumbervalue = (event) => {
    if (!/^[0-9]*\.?[0-9]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  const checkUpperCase = (event) => {
    if (!/^[A-Z]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row
          className="Row-Card"
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            <Form
              form={form}
              labelcol={{
                span: 4,
              }}
              wrappercol={{
                span: 14,
              }}
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              onFinish={onFinish}
            >
              <Card
                className="viewCard"
                title="Bank Account Details"
                bordered={true}
                hoverable={true}
                extra={
                  <>
                    {editContent === false ? (
                      <Button
                        className="personal"
                        type="text"
                        style={{
                          color: "#ffff",
                          display: "none",
                          paddingTop: "7px",
                          paddingRight: "7px",
                          position: "absolute",
                          right: 10,
                          top: 10,
                        }}
                        onClick={() => showEditContent(!editContent)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: "100%",
                  margin: "15px",
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={22} sm={20} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Bank Name
                      </div>
                      {editContent === false ? (
                        <div>{data?.bankName ? data.bankName : "-"}</div>
                      ) : (
                        <Form.Item
                          name="bankName"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Bank Name",
                            },
                          ]}
                          initialValue={data?.bankName ? data.bankName : null}
                        >
                          <Input
                            placeholder="Enter Bank Name"
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal =
                                inputval.substring(0, 1).toUpperCase() +
                                inputval.substring(1);
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({
                                bankName: newVal,
                                bankName: caps,
                              });
                            }}
                            maxLength={20}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Account Number
                      </div>
                      {editContent === false ? (
                        <div>
                          {data?.accountNumber ? data.accountNumber : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          name="accountNumber"
                          onKeyPress={(event) => {
                            console.log(checkNumbervalue(event));
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[0-9\b]+$/,
                              message: "Please enter Account Number",
                            },
                            {
                              whitespace: true,
                            },
                          ]}
                          initialValue={
                            data?.accountNumber ? data.accountNumber : null
                          }
                        >
                          <Input
                            placeholder="Enter Account Number"
                            maxLength={20}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        IFSC Code
                      </div>
                      {editContent === false ? (
                        <div>{data?.ifscCode ? data.ifscCode : "-"}</div>
                      ) : (
                        <Form.Item
                          name="ifscCode"
                          onKeyPress={(event) => {
                            console.log(
                              checkNumbervalue(event),
                              checkUpperCase(event)
                            );
                            if (
                              checkNumbervalue(event) &&
                              checkUpperCase(event)
                            ) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,
                              pattern: /^[0-9a-zA-Z]+$/,
                              message: "Please enter IFSC Code",
                            },
                            {
                              whitespace: true,
                            },
                          ]}
                          initialValue={data?.ifscCode ? data.ifscCode : null}
                        >
                          <Input
                            placeholder="Enter IFSC Code"
                            maxLength={15}
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>

                {editContent === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => {
                        form.resetFields();
                        showEditContent(false);
                      }}
                      type="text"
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "10px",
                          background: "#1963A6",
                          width: "90px",
                        }}
                      >
                        <CheckOutlined />
                        SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default BankAccount;
