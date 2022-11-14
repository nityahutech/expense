import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Select, Input, Form } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import "../../components/CompanyDetail/companystyle.css";
const { Option } = Select;
const { TextArea } = Input;

function AddressOffice() {
  const [editAddress, showEditAddress] = useState(false);
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState();
  const { currentUser } = useAuth();
  const compId = sessionStorage.getItem("compId");

  const onFinish = (values) => {
    const valuesToservice = {
      addLine1: values.address1,
      addLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pin,
    };
    CompanyProContext.updateCompInfo(compId, { regOffice: valuesToservice });
    getData();
    showEditAddress(false);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
  };
  console.log(data);

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
        <Row>
          <Col xs={24} sm={15} md={24}>
            <Form
              // form={form}
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
                title="REGISTERED OFFICE"
                className="regcard"
                extra={
                  <>
                    {editAddress === false ? (
                      <Button
                        type="text"
                        style={{
                          color: "#4ec0f1",
                          display: "none",
                          paddingTop: "7px",
                          paddingRight: "7px",
                          position: "absolute",
                          right: 10,
                          top: 10,
                        }}
                        onClick={() => showEditAddress(!editAddress)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
                style={{
                  width: 800,
                  marginTop: 10,
                }}
              >
                {/* {editAddress === true ? (  */}
                <Row gutter={[16, 16]}>
                  <Col xs={22} sm={15} md={24}>
                    <div>
                      <div className="div-discription">Address Line 1</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.addLine1 : null}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.regOffice.addLine1 : null}
                          name="address1"
                          rules={[
                            {
                              required: true,
                              message: "Enter Address",
                              type: "text",
                            },
                          ]}
                        >
                          <Input
                            // style={{ paddingLeft: '0px' }}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* ) : null} */}

                {/* {editAddress === true ? ( */}
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={15} md={24}>
                    <div>
                      <div className="div-discription">Address Line 2</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.addLine2 : null}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.regOffice.addLine2 : null}
                          name="address2"
                          rules={[
                            {
                              required: true,
                              message: "Enter Address ",
                              type: "text",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* ) : null} */}

                {/* {editAddress === true ? ( */}
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={15} md={6}>
                    <div>
                      <div className="div-discription">City</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.city : null}</div>
                      ) : (
                        <Form.Item
                          style={{ width: "100%" }}
                          initialValue={data ? data.regOffice.city : null}
                          name="city"
                          rules={[
                            {
                              required: true,
                              message: "Enter City",
                              type: "text",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Enter Valid City",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={6}>
                    <div>
                      <div className="div-discription">State</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.state : null}</div>
                      ) : (
                        <Form.Item
                          style={{ width: "100%" }}
                          initialValue={data ? data.regOffice.state : null}
                          name="state"
                          rules={[
                            {
                              required: true,
                              message: "Enter State",
                              type: "text",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: " Enter Valid State",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={6}>
                    <div>
                      <div className="div-discription">Country</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.country : null}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.regOffice.country : null}
                          name="country"
                          rules={[
                            {
                              required: true,
                              message: "Enter Country",
                              type: "text",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Enter Valid Country",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={6}>
                    <div>
                      <div className="div-discription">Pin Code</div>
                      {editAddress === false ? (
                        <div>{data ? data.regOffice.pincode : null}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.regOffice.pincode : null}
                          name="pin"
                          rules={[
                            {
                              required: true,
                              message: " Enter Pin-Code",
                              type: "text",
                            },
                            {
                              pattern: /^[0-9\b]+$/,
                              message: "Enter Valid Pin-Code",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder=""
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                {/* ) : null}  */}

                {editAddress === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditAddress(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "10px" }}
                      >
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
export default AddressOffice;
