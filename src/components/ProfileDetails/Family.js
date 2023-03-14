import { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { Card, Row, Col, Input, Button, Form, Select } from "antd";
import { capitalize, checkAlphabets, checkNumbervalue, getCountryCode } from "../../contexts/CreateContext";

import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  MinusCircleOutlined,
} from "@ant-design/icons";
import "../../style/BankAccount.css";
const { Option } = Select;

const Family = (props) => {
  console.log('data', props.marriage)
  const [editfamilymember, showeditfamilymember] = useState(false);
  const [editEmergency, showeditEmergency] = useState(false);
  const [data, setData] = useState(false);
  const [form] = Form.useForm();
  const [codes, setCodes] = useState("");
  const [marriage, setMarraige] = useState(props.marriage)
  const [form1] = Form.useForm();
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [rows, setRows] = useState(1);


  const handleAddRow = () => {
    if (rows < 2) {
      setRows(rows + 1);
    }
  };

  const handleDeleteRow = (index) => {
    if (rows > 1) {
      setRows(rows - 1);
      form1.removeFields([`other${index}`, `relation${index}`, `contact${index}`]);
    }
    form1.setFieldsValue({
      [`other${index}`]: '',
      [`relation${index}`]: '',
      [`contact${index}`]: '',
    });
  };

  useEffect(() => {
    getCountryCode().then((res) => {
      setCodes(res);
    })
    getData();
    // setMarraige(data?.maritalStatus);
  }, []);

  const onFinish = (values) => {
    console.log('data', values)
    values.profilePic = data.profilePic || null
    EmpInfoContext.updateEduDetails(currentUser.uid, values);
    setData(values);
    showeditfamilymember(false);
    showeditEmergency(false);
    getData();
  };

  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log('data', data)
    setData(data);
    // setMarraige(data?.maritalStatus);
    // console.log('data', data?.maritalStatus)
  };


  const prefixSelector = (
    <Form.Item name="prefixFather" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 70,
          background: "#ffffff",
        }}
      // onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
        )}
        {/* <Option value="91">+91</Option> */}
      </Select>
    </Form.Item>
  );
  const prefixSelector2 = (
    <Form.Item name="prefixMother" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
      // onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
        )}

      </Select>
    </Form.Item>
  );

  const prefixSelector4 = (
    <Form.Item name="prefixspouce" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
      // onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
        )}

      </Select>
    </Form.Item>
  );

  const prefixSelector3 = (index) => (
    <Form.Item name={`prefixOther_${index}`} noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}

      // onSelect={(value, event) => handleOnChange(value, event)}
      >
        {codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
        )}

      </Select>
    </Form.Item>
  );



  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
          width: "100%",
        }}
      >
        {editfamilymember === false ? (
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
              <Card
                title="FAMILY MEMBERS"
                className="personal"
                hoverable={true}
                bordered={true}
                extra={
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
                    onClick={() => showeditfamilymember(!editfamilymember)}
                  >
                    <EditFilled />
                  </Button>
                }
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                <Row gutter={[48, 8]}>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <h1
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Father
                      </h1>
                      <div>{data?.father ? data.father : "-"}</div>
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <h1
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Contact no.
                      </h1>
                      <div>
                        {data?.fatherContact
                          ? `${data.prefixFather} ${data.fatherContact}`
                          : "-"}
                      </div>
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <h1
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Mother
                      </h1>

                      <div>{data?.mother ? data.mother : "-"}</div>
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <h1
                        style={{
                          fontWeight: 600,
                          lineHeight: "18px",
                          color: "#07182b",
                          fontSize: "15px",
                          fontFamily: "Open Sans,sans-serif",
                        }}
                      >
                        Contact no.
                      </h1>
                      <div>
                        {data?.motherContact
                          ? `${data.prefixMother} ${data.motherContact}`
                          : "-"}
                      </div>{" "}
                    </div>
                  </Col>
                  {marriage === 'Married' && (
                    <>
                      <Col xs={22} sm={15} md={12}>
                        <div>
                          <h1
                            style={{
                              fontWeight: 600,
                              lineHeight: "18px",
                              color: "#07182b",
                              fontSize: "15px",
                              fontFamily: "Open Sans,sans-serif",
                            }}
                          >
                            Spouse Name
                          </h1>

                          <div>{data?.Spouse ? data.Spouse : "-"}</div>
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={12}>
                        <div>
                          <h1
                            style={{
                              fontWeight: 600,
                              lineHeight: "18px",
                              color: "#07182b",
                              fontSize: "15px",
                              fontFamily: "Open Sans,sans-serif",
                            }}
                          >
                            Contact no.
                          </h1>
                          <div>
                            {data?.SpouseContact
                              ? `${data.prefixspouce} ${data.SpouseContact}`
                              : "-"}
                          </div>{" "}
                        </div>
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            </Col>
          </Row>
        ) : (
          <Row
            style={{
              width: "75%",
              margin: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col xs={22} sm={15} md={24}>
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
                  "prefixFather": "+91",
                  "prefixMother": "+91",
                  "prefixOther": "+91",

                }}
                autoComplete="off"
                onFinish={onFinish}
              >
                <Card
                  title="FAMILY MEMBERS"
                  className="personal"
                  hoverable={true}
                  bordered={true}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Father
                        </h1>
                        <Form.Item
                          name="father"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              minLength: 3,
                              maxLength: 25,
                              message: "Please enter Father Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Name",
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={data.father ? data.father : ""}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str.split(" ").map(capitalize).join(" ");
                              form.setFieldsValue({ father: caps });
                            }}
                            maxLength={40}
                            placeholder="Enter Father's Name"
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <Form.Item
                          name="fatherContact"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please enter the Contact no.",
                              pattern: /^[0-9]\d{9}$/,
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={
                            data.fatherContact ? data.fatherContact : ""
                          }
                        >
                          <Input
                            addonBefore={prefixSelector}
                            maxLength={10}
                            placeholder="Enter Contact no."
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Mother
                        </h1>
                        <Form.Item
                          name="mother"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              minLength: 3,
                              maxLength: 25,
                              message: "Please enter Mother Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Name",
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={data.mother ? data.mother : ""}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str.split(" ").map(capitalize).join(" ");
                              form.setFieldsValue({ mother: caps });
                            }}
                            maxLength={40}
                            placeholder="Enter Mother's Name"
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <Form.Item
                          name="motherContact"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please enter the Contact no.",
                              pattern: /^[0-9]\d{9}$/,
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={
                            data.motherContact ? data.motherContact : ""
                          }
                        >
                          <Input
                            addonBefore={prefixSelector2}
                            maxLength={10}
                            placeholder="Enter Contact no."
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    {marriage === 'Married' && (
                      <>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Spouse Name
                            </h1>
                            <Form.Item
                              name="Spouse"
                              onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                  event.preventDefault();
                                }
                              }}
                              rules={[
                                {
                                  required: false,
                                  minLength: 3,
                                  maxLength: 25,
                                  message: "Please enter Spouse Name",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please enter Valid Name",
                                },
                              ]}
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 32 }}
                              initialValue={data.Spouse ? data.Spouse : ""}
                            >
                              <Input
                                onChange={(e) => {
                                  const str = e.target.value;
                                  const caps = str.split(" ").map(capitalize).join(" ");
                                  form.setFieldsValue({ Spouse: caps });
                                }}
                                maxLength={40}
                                placeholder="Enter Spouse's Name"
                                style={{
                                  marginTop: "10px",
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Contact no.
                            </h1>
                            <Form.Item
                              name="SpouseContact"
                              onKeyPress={(event) => {
                                if (checkNumbervalue(event)) {
                                  event.preventDefault();
                                }
                              }}
                              rules={[
                                {
                                  required: false,
                                  message: "Please enter the Contact no.",
                                  pattern: /^[0-9]\d{9}$/,
                                },
                              ]}
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 32 }}
                              initialValue={
                                data.SpouseContact ? data.SpouseContact : ""
                              }
                            >
                              <Input
                                addonBefore={prefixSelector4}
                                maxLength={10}
                                placeholder="Enter Contact no."
                                style={{
                                  marginTop: "10px",
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => showeditfamilymember(false)}
                      type="text"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      <CloseOutlined />
                      CANCEL
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
                </Card>
              </Form>
            </Col>
          </Row>
        )}
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
          width: "100%",
        }}
      >
        {editEmergency === false ? (
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
              <Card
                title="EMERGENCY CONTACTS"
                hoverable={true}
                bordered={true}
                className="personal"
                extra={
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
                    onClick={() => showeditEmergency(!editEmergency)}
                  >
                    <EditFilled />
                  </Button>
                }
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
              >
                {[...Array(rows)].map((_, index) => (
                  <Row gutter={[16, 16]} key={index}>
                    <Col xs={22} sm={15} md={8}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Other
                        </h1>

                        <div>{data[`other${index}`]
                          ? ` ${data[`other${index}`]}`
                          : "-"}</div>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Relation
                        </h1>

                        <div>{data[`relation${index}`]
                          ? ` ${data[`relation${index}`]}`
                          : "-"}</div>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={8}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>

                        <div>
                          {data[`contact${index}`]
                            ? `${data[`prefixOther_${index}`]} ${data[`contact${index}`]}`
                            : "-"}
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))}
              </Card>
            </Col>
          </Row>
        ) : (
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
                form={form1}
                labelcol={{
                  span: 4,
                }}
                wrappercol={{
                  span: 14,
                }}
                // initialValues={{
                //   remember: true,
                // }}
                autoComplete="off"
                onFinish={onFinish}
              >
                <Card
                  title="EMERGENCY CONTACTS"
                  className="personal"
                  style={{
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                  }}
                >
                  {[...Array(rows)].map((_, index) => (
                    <Row gutter={[16, 16]} key={index}>
                      <Col xs={22} sm={15} md={8}>
                        <div>
                          <h1
                            style={{
                              fontWeight: 600,
                              lineHeight: "18px",
                              color: "#07182b",
                              fontSize: "15px",
                              fontFamily: "Open Sans,sans-serif",
                            }}
                          >
                            Other
                          </h1>
                          <Form.Item
                            name={`other${index}`}
                            // name="other"
                            onKeyPress={(event) => {
                              if (checkAlphabets(event)) {
                                event.preventDefault();
                              }
                            }}
                            rules={[
                              {
                                required: false,
                                minLength: 3,
                                maxLength: 25,
                                message: "Please enter Other Name",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Please enter Name",
                              },
                            ]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                            initialValue={{
                              [`other${index}`]: data.other ? data.other : "",
                            }}
                          >
                            <Input
                              onChange={(e) => {
                                const str = e.target.value;
                                const caps = str.split(" ").map(capitalize).join(" ");
                                form1.setFieldsValue({ other: caps });
                              }}
                              placeholder="Enter Other Name"
                              maxLength={40}
                              style={{
                                marginTop: "10px",
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                              }}
                              bordered={false}
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div>
                          <h1
                            style={{
                              fontWeight: 600,
                              lineHeight: "18px",
                              color: "#07182b",
                              fontSize: "15px",
                              fontFamily: "Open Sans,sans-serif",
                            }}
                          >
                            Relation
                          </h1>
                          <Form.Item
                            // name="relation"
                            name={`relation${index}`}
                            onKeyPress={(event) => {
                              if (checkAlphabets(event)) {
                                event.preventDefault();
                              }
                            }}
                            rules={[
                              {
                                required: false,
                                minLength: 3,
                                maxLength: 25,
                                message: "Please enter Relation Name",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Please enter Relation Name",
                              },
                            ]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                            initialValue={{
                              [`relation${index}`]: data.relation ? data.relation : "",
                            }}
                          >
                            <Input
                              onChange={(e) => {
                                const str = e.target.value;
                                const caps = str.split(" ").map(capitalize).join(" ");
                                form1.setFieldsValue({ relation: caps });
                              }}
                              placeholder="Enter the Relation"
                              maxLength={40}
                              style={{
                                marginTop: "10px",
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                              }}
                              bordered={false}
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div>
                          <h1
                            style={{
                              fontWeight: 600,
                              lineHeight: "18px",
                              color: "#07182b",
                              fontSize: "15px",
                              fontFamily: "Open Sans,sans-serif",
                            }}
                          >
                            Contact no.
                          </h1>

                          <Form.Item
                            // name="otherContact"
                            name={`contact${index}`}
                            onKeyPress={(event) => {
                              if (checkNumbervalue(event)) {
                                event.preventDefault();
                              }
                            }}
                            rules={[
                              {
                                required: false,
                                message: "Please enter the Contact no.",
                                pattern: /^[0-9]\d{9}$/,
                              },
                            ]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                            initialValue={{
                              [`contact${index}`]: data.contact ? data.contact : "",
                            }}
                          >
                            <Input
                              addonBefore={prefixSelector3(index)}
                              maxLength={10}
                              placeholder="Enter Contact no."
                              style={{
                                marginTop: "10px",
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                              }}
                              bordered={false}
                            />
                          </Form.Item>
                        </div>
                      </Col>
                      {index > 0 && (
                        <div
                          style={{
                            position: "absolute",
                            right: "24px",
                            top: "12px",
                            cursor: "pointer",
                          }}
                        >
                          <MinusCircleOutlined onClick={() => handleDeleteRow(index)} />
                        </div>
                      )}
                    </Row>
                  ))}
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "3%",
                    }}
                  >
                    <Col>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={handleAddRow}
                      >
                        <PlusCircleOutlined />
                        Add
                      </Button>
                    </Col>
                    <Col>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => showeditEmergency(false)}
                      >
                        <CloseOutlined />
                        CANCEL
                      </Button>

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
                </Card>
              </Form>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};
export default Family;
