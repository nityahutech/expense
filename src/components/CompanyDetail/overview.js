import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./companystyle.css";
import linkedin from "../../images/linkedin.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";



function Overview() {
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [editContactIconInfo, showEditContactIconInfo] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const [companyName, setCompanyName] = useState()



  const onFinish = (value) => {

  };

  const onContactFinish = (values) => {
    showEditContactInfo(false);
  };



  useEffect(() => {

  }, []);



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
          onFinish={onContactFinish}
        >
          <Card
            title=" OVERVIEW"
            extra={
              <>
                {editContactInfo === false ? (
                  <Button
                    className="edit"
                    type="text"
                    style={{
                      color: "#4ec0f1", display: 'none', paddingTop: '7px',
                      paddingRight: '7px',
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                    onClick={() => showEditContactInfo(!editContactInfo)}
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
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <div>
                  <div className='div-discription'>
                    Registered Company Name
                  </div>
                  {editContactInfo === false ? (
                    <div>
                      Hutech
                      {/* {data.mailid ? data.mailid : ""} */}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="companyName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Company Name",
                          type: "name",
                        },
                        {
                          message: "Please enter Valid Company Name",
                        },
                      ]}
                    >
                      <Input style={{ paddingLeft: '0px' }} type='CompamyName' required placeholder="Enter Comapany Name" />

                    </Form.Item>
                  )}
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <div className='div-discription'>
                    Brand Name
                  </div>
                  {editContactInfo === false ? (
                    <div>
                      Hutech
                      {/* {data.contactEmail ? data.contactEmail : ""} */}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.contactEmail : null}
                      name="brandName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Brand Name",
                          type: "brandName",
                        },
                        {
                          message: "Please enter Valid Brand Name",
                        },
                      ]}
                    >
                      <Input style={{ paddingLeft: '0px' }} type='brandName' required placeholder="Enter Brand Name" />
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "6%", }}>
              <Col span={12}>
                <div>
                  <div className='div-discription'>
                    Website
                  </div>
                  {editContactInfo === false ? (
                    <div>
                      {/* {data.mailid ? data.mailid : ""} */}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="websiteName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Website Name",
                          type: "Website",
                        },
                        {
                          message: "Please enter Valid Website Name",
                        },
                      ]}
                    >
                      <Input style={{ paddingLeft: '0px' }} type='WebsiteName' required placeholder="Enter Website Name" />

                    </Form.Item>
                  )}
                </div>
              </Col>

              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div className='div-discription'>
                    Domain Name
                  </div>
                  {editContactInfo === false ? (
                    <div>
                      {/* {data.mailid ? data.mailid : ""} */}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="domain"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Domain Name",
                          type: "domain",
                        },
                        {
                          message: "Please enter Valid Domain Name",
                        },
                      ]}
                    >
                      <Input style={{ paddingLeft: '0px' }} type='DomainName' required placeholder="Enter Domain Name" />

                    </Form.Item>
                  )}
                </div>
              </Col>

            </Row>
            {editContactInfo === true ? (
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
                  onClick={() => showEditContactInfo(false)}
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
      </div>

      {/* //--------------Card-2----------------------------- */}

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: '10px'
        }}
      >
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
          onFinish={onContactFinish}
        >
          <Card
            title=" SOCIAL PROFILE"

            extra={
              <>
                {editContactIconInfo === false ? (
                  <Button
                    className="edit"
                    type="text"
                    style={{
                      color: "#4ec0f1", display: 'none', paddingTop: '7px',
                      paddingRight: '7px',
                      position: 'absolute',
                      right: 10,
                      top: 10,
                    }}
                    onClick={() => showEditContactIconInfo(!editContactIconInfo)}
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


            <div className='card-two' style={{ display: 'flex', flexDirection: editContactIconInfo ? 'column' : 'row', }}

            >

              <Row className="iconface" style={{
                paddingBottom: '10px'
              }} gutter={[16, 16]}>
                <Col span={24}>
                  <div className='icon-position' style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                    <div >
                      <img
                        src={linkedin}

                        alt="downArrow"
                        style={{ cursor: "pointer", width: '30px' }}
                      />

                    </div>
                    {editContactIconInfo === false ? (
                      <div>{data.mailid ? data.mailid : ""}</div>
                    ) : (
                      <Form.Item style={{ width: '50%' }}
                        initialValue={data ? data.mailid : null}
                        name="linkedin"

                      >
                        <Input type='linkedin' required placeholder="https://None" />

                      </Form.Item>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="iconface" style={{
                paddingBottom: '10px'
              }} gutter={[16, 16]}>
                <Col span={24}>
                  <div className='icon-position' style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                    <div >
                      <img
                        src={facebook}

                        alt="downArrow"
                        style={{ cursor: "pointer", width: '30px' }}
                      />

                    </div>
                    {editContactIconInfo === false ? (
                      <div>{data.mailid ? data.mailid : ""}</div>
                    ) : (
                      <Form.Item style={{ width: '50%' }}
                        initialValue={data ? data.mailid : null}
                        name="facebook"

                      >
                        <Input type='facebook' required placeholder="https://None" />

                      </Form.Item>
                    )}
                  </div>
                </Col>
              </Row>

              <Row className="iconface" style={{
                paddingBottom: '10px'
              }} gutter={[16, 16]}>
                <Col span={24}>
                  <div className='icon-position' style={{ display: 'flex', flexDirection: 'row', paddingRight: '10px' }}>
                    <div >
                      <img
                        src={twitter}

                        alt="downArrow"
                        style={{ cursor: "pointer", width: '30px' }}
                      />

                    </div>
                    {editContactIconInfo === false ? (
                      <div>{data.mailid ? data.mailid : ""}</div>
                    ) : (
                      <Form.Item style={{ width: '50%' }}
                        initialValue={data ? data.mailid : null}
                        name="twitter"

                      >
                        <Input type='twitter' required placeholder="https://None" />

                      </Form.Item>
                    )}
                  </div>
                </Col>
              </Row>
            </div>


            {editContactIconInfo === true ? (
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
                  onClick={() => showEditContactIconInfo(false)}
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
      </div>
    </>
  );
}
export default Overview;