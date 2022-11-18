import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import "./companystyle.css";
import linkedin from "../../images/linkedin.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import CompanyProContext from "../../contexts/CompanyProContext";

function Overview() {
  const [editContactInfo, showEditCompanyInfo] = useState(false);
  const [editContactIconInfo, showEditCompanyIconInfo] = useState(false);
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId")

  const onFinish = (values) => {
    const valuesToservice = {
      regCompName: values.regCompName,
      brandName: values.brandName,
      website: values.website,
      domain: values.domain,
    };
    CompanyProContext.updateCompInfo(compId, valuesToservice);
    getData();
    showEditCompanyInfo(false);
  };

  const onSocialFinish = (values) => {
    const value = {
      linkedin: values.linkedin,
      facebook: values.facebook,
      twitter: values.twitter,
    };
    CompanyProContext.updateCompInfo(compId, value);
    getData();
    showEditCompanyIconInfo(false);
  };

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
  };

  const checkAlphabets = (event) => {
    if (!/^[a-zA-Z ]*$/.test(event.key) && event.key !== "Backspace") {
      return true;
    }
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
                title=" OVERVIEW"
                className="overview"
                extra={
                  <>
                    {editContactInfo === false ? (
                      <Button
                        className="edit"
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
                        onClick={() => showEditCompanyInfo(!editContactInfo)}
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
                <Row gutter={[48, 8]}>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div className="div-discription">
                        Registered Company Name
                      </div>
                      {editContactInfo === false ? (
                        <div>{data.regCompName}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.regCompName : null}
                          name="regCompName"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Company Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Company Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={50}
                            placeholder="Enter Comapany Name"
                            bordered={false}
                            style={{
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div className="div-discription">Brand Name</div>
                      {editContactInfo === false ? (
                        <div>{data.brandName}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.brandName : null}
                          name="brandName"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Brand Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Brand Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            style={{
                              paddingLeft: "0px",
                              borderBottom: "1px solid #ccc ",
                            }}
                            placeholder="Enter Brand Name"
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row gutter={[48, 8]} style={{ marginTop: "6%" }}>
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div className="div-discription">Website</div>
                      {editContactInfo === false ? (
                        <a href={`https://${data.website}`} target="_blank">{data.website}</a>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.website : null}
                          name="website"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Website Name",
                              type: "Website",
                            },
                            {
                              pattern:
                                /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/,
                              message: "Please enter Valid Website Name",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              paddingLeft: "0px",
                              borderBottom: "1px solid #ccc ",
                            }}
                            placeholder="Enter Website Name"
                            bordered={false}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col> */}
                  <Col xs={22} sm={15} md={12}>
                    <div>
                      <div className="div-discription">Domain Name</div>
                      {editContactInfo === false ? (
                        <div>{data.domain}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.domain : null}
                          name="domain"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Domain Name",
                              type: "domain",
                            },
                            {
                              pattern:
                                /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,

                              message: "Please enter Valid Domain Name",
                            },
                          ]}
                        >
                          <Input
                            style={{
                              paddingLeft: "0px",
                              borderBottom: "1px solid #ccc ",
                            }}
                            placeholder="Enter Domain Name"
                            bordered={false}
                          />
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
                      onClick={() => showEditCompanyInfo(false)}
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
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
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
              onFinish={onSocialFinish}
            >
              <Card
                title=" SOCIAL PROFILE"
                className="social"
                extra={
                  <>
                    {editContactIconInfo === false ? (
                      <Button
                        className="edit"
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
                        onClick={() =>
                          showEditCompanyIconInfo(!editContactIconInfo)
                        }
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
                <div
                  className="card-two"
                  style={{
                    display: "flex",
                    flexDirection: editContactIconInfo ? "column" : "row",
                  }}
                >
                  <Row
                    className="iconface"
                    style={{
                      paddingBottom: "10px",
                      paddingRight: "10px"
                    }}
                    gutter={[48, 8]}
                  >
                    <Col xs={22} sm={22} md={22}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingRight: "10px",
                          justifyContent: "center",
                          alignItems: "center"
                          // paddingLeft:"10px"
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <img
                            src={linkedin}
                            alt="downArrow"
                            style={{
                              cursor: "pointer",
                              width: "30px",
                              margin: "10px",

                            }}
                          />
                        </div>
                        {editContactIconInfo === false ? (
                          <a href={`https://in.linkedin.com/company/${data.linkedin}`} target="_blank" >{data.linkedin}</a>
                        ) : (
                          <Form.Item
                            style={{ width: "50%" }}
                            initialValue={data ? data.linkedin : null}
                            name="linkedin"
                            rules={[
                              {
                                required: false,
                                message: "Please enter media handle",
                              },
                              {
                                // pattern:
                                  // /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/,
                                message: "Please enter Valid Website Name",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                paddingLeft: "0px",
                                marginLeft: "10px",
                                borderBottom: "1px solid #ccc ",
                              }}
                              bordered={false}
                              placeholder="Enter media handle"
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row
                    className="iconface"
                    style={{
                      paddingBottom: "10px",
                    }}
                    gutter={[48, 8]}
                  >
                    <Col xs={22} sm={22} md={22}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingRight: "10px",
                          justifyContent: "center",
                          alignItems: "center"
                        }}
                      >
                        <div>
                          <img
                            src={facebook}
                            alt="downArrow"
                            style={{
                              cursor: "pointer",
                              width: "30px",
                              margin: "10px",
                            }}
                          />
                        </div>
                        {editContactIconInfo === false ? (
                          <a href={`https://www.facebook.com/${data.facebook}`} target="_blank" >{data.facebook}</a>
                        ) : (
                          <Form.Item
                            style={{ width: "50%" }}
                            initialValue={data ? data.facebook : null}
                            name="facebook"
                            rules={[
                              {
                                required: false,
                                message: "Please enter media handle",
                              },
                              {
                                // pattern:
                                  // /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/,
                                message: "Please enter Valid Website Name",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                paddingLeft: "0px",
                                marginLeft: "10px",
                                borderBottom: "1px solid #ccc ",
                              }}
                              bordered={false}
                              placeholder="Enter media handle"
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Row
                    className="iconface"
                    style={{
                      paddingBottom: "10px",
                    }}
                    gutter={[48, 8]}
                  >
                    <Col xs={22} sm={22} md={22}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "row",
                          paddingRight: "10px",
                        }}
                      >
                        <div>
                          <img
                            src={twitter}
                            alt="downArrow"
                            style={{
                              cursor: "pointer",
                              width: "30px",
                              margin: "10px"
                            }}
                          />
                        </div>
                        {editContactIconInfo === false ? (
                          <a href={`https://www.twitter.com/${data.twitter}`} target="_blank" >{data.twitter}</a>
                        ) : (
                          <Form.Item
                            style={{ width: "50%" }}
                            initialValue={data ? data.twitter : null}
                            name="twitter"
                            rules={[
                              {
                                required: false,
                                message: "Please enter media handle",
                              },
                              {
                                // pattern:
                                  // /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/,
                                message: "Please enter Valid Website Name",
                              },
                            ]}
                          >
                            <Input
                              style={{
                                paddingLeft: "0px",
                                marginLeft: "10px",
                                borderBottom: "1px solid #ccc ",
                              }}
                              bordered={false}
                              placeholder="Enter media handle"
                            />
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
                      onClick={() => showEditCompanyIconInfo(false)}
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
export default Overview;
