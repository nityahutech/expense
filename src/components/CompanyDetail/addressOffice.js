import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Input, Form } from "antd";
import CompanyProContext from "../../contexts/CompanyProContext";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import "../../components/CompanyDetail/companystyle.css";

function AddressOffice() {
  const [editAddress, showEditAddress] = useState(false);
  const [data, setData] = useState();
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
            width: '75%',
            margin: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
          <Col span={24}>
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
                bordered={true}
                hoverable={true}
                extra={
                  <>
                    {editAddress === false ? (
                      <Button
                        type="text"
                        className="edit"
                        style={{
                          color: "#ffff",
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
                  width: '100%',
                  marginTop: 10,
                  borderRadius:"10px",
                }}
              >
                {editAddress === true ? (
                  <>
                    <Row gutter={[16,16]}>
                      <Col span={24}>
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
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                            required
                            placeholder="Address Line 1"
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
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
                            placeholder="Adress Line 2"
                            maxLength={100}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={6}>
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
                            placeholder="City"
                            maxLength={85}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={6}>
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
                            placeholder="State"
                            maxLength={40}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={6}>
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
                            placeholder="Country"
                            maxLength={60}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={6}>
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
                            placeholder="Pincode"
                            maxLength={6}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </>
                ):(
                  <>
                    <Row span={[16,16]}>
                      <Col span={24}>{data ? data.regOffice?.addLine1 : null}</Col>
                      <Col span={24}>{data ? data.regOffice?.addLine2 : null}</Col>
                      <span>
                        {data ? data.regOffice?.city : null},
                        {data ? data.regOffice?.state : null},
                        {data ? data.regOffice?.country : null},
                        {data ? data.regOffice?.pincode : null}
                      </span>
                    </Row>
                  </>)}
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
