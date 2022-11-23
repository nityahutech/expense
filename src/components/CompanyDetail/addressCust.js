import React, { useState, useEffect } from "react";
import { Card, Row, Col, Button, Input, Form, Modal } from "antd";
import CompanyProContext from "../../contexts/CompanyProContext";
import {
  CloseOutlined,
  EditFilled,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import "../../components/CompanyDetail/companystyle.css";

function AddressCust() {
  const [editAddressContent, showEditAddressContent] = useState([false]);
  const [addAddressContent, showAddAddressContent] = useState(false);
  const [data, setData] = useState([]);
  const [form] = Form.useForm();
  const compId = sessionStorage.getItem("compId");

  const onFinish = (values) => {
    const valuesToservice = {
      title: values.addresstitle,
      addLine1: values.address1,
      addLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pin,
    };
    CompanyProContext.addCompInfo(compId, { address: valuesToservice });
    form.resetFields();
    getData();
    showAddAddressContent(false);
  };

  const editOnFinish = async (values, i) => {
    const valuesToservice = {
      title: values.addresstitle,
      addLine1: values.address1,
      addLine2: values.address2,
      city: values.city,
      state: values.state,
      country: values.country,
      pincode: values.pin,
    };
    await CompanyProContext.editCompInfo(
      compId,
      { address: data[i] },
      { address: valuesToservice }
    );
    getData();
    let array = editAddressContent;
    array[i] = true;
    showEditAddressContent(array);
  };

  const onDeleteAddress = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete address?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { address: record })
          .then((response) => {
            getData();
          })
          .catch((error) => {
          });
      },
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    let array = [...data.address];
    showEditAddressContent(array.fill(false));
    setData(data.address);
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   flexDirection: "column",
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
          {data && data != 0
            ? data.map((add, i) => (
              <Col span={24}>
                <Form
                  // form={form1}
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
                  onFinish={(values) => editOnFinish(values, i)}
                >
                  <Card
                    title={add ? add.title : "CUSTOM ADDRESS TITLE"}
                    className="customaddrcard"
                    extra={
                      <>
                        {editAddressContent[i] === false ? (
                          <Button
                            type="text"
                            className="edit"
                            style={{
                              color: "#ffff",
                              display: "none",
                              paddingTop: "7px",
                              // paddingRight: "7px",
                              // marginLeft:"7px",
                              position: "absolute",
                              right: 10,
                              top: 10,
                            }}
                            onClick={() => {
                              let array = [...editAddressContent];
                              array[i] = !array[i];
                              showEditAddressContent(array);
                            }}
                          >
                            <EditFilled />
                          </Button>
                        ) : null}
                        <>
                        {editAddressContent[i] === false ? (
                        <Button
                          type="text"
                          className="edit"
                           style={{ 
                            color: "#ffff", 
                            marginRight: "25px", 
                            display: "none",
                            paddingTop: "7px",
                              // paddingRight: "7px",
                              // marginLeft:"7px",
                              position: "absolute",
                              right: 10,
                              top: 10,
                          }}
                        >
                        <DeleteOutlined
                         
                          onClick={() => {
                            onDeleteAddress(add);
                          }}
                        />
                        </Button>
                        ) : null}
                        </>
                      </>
                    }
                    style={{
                      width: '100%',
                      marginTop: 10,
                       borderRadius:"10px",
                    }}
                  >

                    {/* <Row gutter={[16, 16]}>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">Address Title</div>
                          {console.log(
                            "no",
                            add,
                            editAddressContent[i] === false
                          )}
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.title : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.title : null}
                              name="addresstitle"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Title",
                                  type: "text",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">
                            Address Line 1
                          </div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.addLine1 : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.addLine1 : null}
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
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={22} md={20}>
                        <div>
                          <div className="div-discription">
                            Address Line 2
                          </div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.addLine2 : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.addLine2 : null}
                              name="address2"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Name",
                                  type: "text",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <div>
                          <div className="div-discription">City</div>
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.city : null}</div>
                          ) : (
                            <Form.Item
                              style={{ width: "100%" }}
                              initialValue={add ? add.city : null}
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter City ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid City ",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
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
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.state : null}</div>
                          ) : (
                            <Form.Item
                              style={{ width: "100%" }}
                              initialValue={add ? add.state : null}
                              name="state"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter State ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid State ",
                                },
                              ]}
                            >
                              <Input
                                style={{ paddingLeft: "0px" }}
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
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.country : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.country : null}
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
                                style={{ paddingLeft: "0px" }}
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
                          {editAddressContent[i] === false ? (
                            <div>{add ? add.pincode : null}</div>
                          ) : (
                            <Form.Item
                              initialValue={add ? add.pincode : null}
                              name="pin"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Pin",
                                  type: "text",
                                },
                                {
                                  pattern: /^[0-9\b]+$/,
                                  message: "Enter Valid Pin",
                                },
                              ]}
                            >
                              <Input
                                maxLength={6}
                                style={{ paddingLeft: "0px" }}
                                required
                                placeholder=""
                              />
                            </Form.Item>
                          )}
                        </div>
                      </Col>
                    </Row> */}

                    {editAddressContent[i] === true ?(
                      <>
                        <Row gutter={[16,16]}>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              initialValue={add ? add.title : null}
                              name="addresstitle"
                              rules={[
                                        {
                                          required: true,
                                          message: "Enter Address Title",
                                          type: "text",
                                        },
                                    ]}
                            >
                              <Input
                                style={{
                                  width: '100%',
                                  borderBottom: '1px solid #ccc ',
                                  paddingLeft: '0px',
                              }}
                              bordered={false} 
                                required
                                maxLength={60}
                                placeholder="Enter Title"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              initialValue={add ? add.addLine1 : null}
                              name="address1"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Line 1",
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
                                placeholder="Enter Address Line 1"
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={24}>
                            <Form.Item
                              initialValue={add ? add.addLine2 : null}
                              name="address2"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Address Line 2",
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
                          </Col>
                          <Col xs={24} sm={24} md={6}>
                            <Form.Item
                              style={{ width: "100%" }}
                              initialValue={add ? add.city : null}
                              name="city"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter City ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid City ",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  width: '100%',
                                  borderBottom: '1px solid #ccc ',
                                  paddingLeft: '0px',
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
                              initialValue={add ? add.state : null}
                              name="state"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter State ",
                                  type: "text",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Enter Valid State ",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  width: '100%',
                                  borderBottom: '1px solid #ccc ',
                                  paddingLeft: '0px',
                              }}
                                required
                                placeholder="State"
                                maxLength={40}
                                bordered={false}
                              />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={6}>
                            <Form.Item
                              initialValue={add ? add.country : null}
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
                                  width: '100%',
                                  borderBottom: '1px solid #ccc ',
                                  paddingLeft: '0px',
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
                              initialValue={add ? add.pincode : null}
                              name="pin"
                              rules={[
                                {
                                  required: true,
                                  message: "Enter Pin",
                                  type: "text",
                                },
                                {
                                  pattern: /^[0-9\b]+$/,
                                  message: "Enter Valid Pin",
                                },
                              ]}
                            >
                              <Input
                                style={{
                                  width: '100%',
                                  borderBottom: '1px solid #ccc ',
                                  paddingLeft: '0px',
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
                          <Col span={24}>{add ? add.addLine1 : null}</Col>
                          <Col span={24}>{add ? add.addLine2 : null}</Col>
                          <span>
                          {add ? add.city : null},
                          {add ? add.state : null},
                          {add ? add.country : null},
                          {add ? add.pincode : null},
                          </span>
                        </Row>
                      </>
                    )}

                    {editAddressContent[i] === true ? (
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
                          onClick={() => {
                            let array = [...editAddressContent];
                            array[i] = !array[i];
                            showEditAddressContent(array);
                          }}
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

                    {/* {editContactInfo == false && i == (data.length-1) &&
                        <>
                            <br />
                            <Button type="primary" style={{ marginLeft: "10px" }}
                                onClick={() => showEditAddressContent(!editAddressContent)}
                            >
                                <PlusCircleOutlined />
                                Add
                            </Button>
                        </>
                        } */}
                  </Card>
                </Form>
              </Col>
            ))
            : null}
        </Row>
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          //   flexDirection: "column",
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
                title={"CUSTOM ADDRESS TITLE"}
                className="customaddrcard"
                extra={
                  <>
                    {addAddressContent === false ? (
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
                        onClick={() => showAddAddressContent(true)}
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
                {addAddressContent ? (
                  <>
                    <Row gutter={[16, 16]}>
                      <Col xs={24} sm={24} md={24}>                      
                        <Form.Item
                            name="addresstitle"
                            rules={[
                              {
                                required: true,
                                message: "Enter Address Title",
                                type: "text",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            
                              bordered={false}
                              required
                              placeholder="Address Title"
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24}>                      
                        <Form.Item
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
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder="Address Line 1"
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={24} sm={24} md={24}>                     
                        <Form.Item
                            name="address2"
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
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder="Address Line 2"
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={22} md={6}>                       
                        <Form.Item
                            name="city"
                            rules={[
                              {
                                required: true,
                                message: "Enter City ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid City ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder="City"
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={22} md={6}>                    
                        <Form.Item
                            name="state"
                            rules={[
                              {
                                required: true,
                                message: "Enter State ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid State ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={22} md={6}>                       
                        <Form.Item
                            name="country"
                            rules={[
                              {
                                required: true,
                                message: "Enter Country ",
                                type: "text",
                              },
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                message: "Enter Valid Country ",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={22} md={6}>                    
                        <Form.Item
                            name="pin"
                            rules={[
                              {
                                required: true,
                                message: "Enter Pin Code ",
                                type: "text",
                              },
                              {
                                pattern: /^[0-9\b]+$/,
                                message: "Enter Valid Pin Code ",
                              },
                            ]}
                          >
                            <Input
                              maxLength={6}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              required
                              placeholder=""
                            />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Row style={{ display: "flex",justifyContent: "flex-end",marginTop: "3%",}}
                    >
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => showAddAddressContent(false)}
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
                  </>
                ) : (
                  <Button
                    type="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={() => showAddAddressContent(true)}
                  >
                    <PlusCircleOutlined />
                    Add
                  </Button>
                )}
              </Card>
            </Form>
          </Col>
        </Row>
      </div>

    </>
  );
}
export default AddressCust;
