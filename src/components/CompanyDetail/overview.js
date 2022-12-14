import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Form, message } from "antd";
import { CloseOutlined, DeleteOutlined, UploadOutlined, EditFilled, CheckOutlined } from "@ant-design/icons";
import "./companystyle.css";
import linkedin from "../../images/linkedin.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import CompanyProContext from "../../contexts/CompanyProContext";
import { checkAlphabets, getBase64 } from "../../contexts/CreateContext";

function Overview() {
  const [editContactInfo, showEditCompanyInfo] = useState(false);
  const [editContactIconInfo, showEditCompanyIconInfo] = useState(false);
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId")
  //---------------image----------------------------
  const [isBigFile, setIsBigFile] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imgRef = React.useRef(null);

  const onFinish = (values) => {
    const valuesToservice = {
      regCompName: values.regCompName,
      brandName: values.brandName,
      website: values.website,
      domain: values.domain,
      profilePic: imageUrl || data.profilePic || null,
    };
    CompanyProContext.updateCompInfo(compId, valuesToservice, fileName);
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

  useEffect(() => {
    setIsBigFile(false);
  });

  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
    setFileName(data.profilePic);
    setImageUrl(data.profilePic);
  };

  //----------------------------------------------photo upload

  function checkFileSize(size, fileName) {
    if (Math.round(size / 1024) <= 200) {
      setFileName(fileName);
      setIsBigFile(false);
    } else {
      setFileName(null);
      setIsBigFile(true);
    }
  }

  const handleChange = (event) => {
    if (!event) {
      return;
    }
    const fileUploaded = event.target.files[0];
    getBase64(fileUploaded, (url) => {
      // setLoading(false);
      setImageUrl(url);
    });
    checkFileSize(fileUploaded.size, fileUploaded);
  };

  function onReset() {
    setIsBigFile(false);
    setFileName(null);
    setImageUrl("");
  }

  const imgDiv = () => {
    if (fileName == "" || fileName == null) {
      return editContactInfo == false ? (
        <div
          style={{
            width: "150px",
            height: "100px",
            border: "1px solid #05445e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: '10px'
          }}
        >
          No Image
        </div>
      ) : (
        <Button
          style={{
            width: "150px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            padding: '10px'
          }}
          onClick={(e) => handleClick(e)}
        >
          <input
            style={{
              display: "none",
            }}
            type="file"
            id="logo"
            name="logo"
            ref={imgRef}
            onChange={(e) => handleChange(e)}
          />
          <UploadOutlined /> Upload Photo
        </Button>
      );
    } else {
      return (
        <div
          className={editContactInfo === true ? "hoverImgCont" : null}
          style={{}}
        >
          <img
            src={imageUrl}
            style={{
              width: "150px",
              height: "100px",
              border: "1px solid #05445e",
              padding: '10px'
            }}
          />
          {editContactInfo === true ? (
            <div className="overlay">
              <DeleteOutlined className="hoverIcon" onClick={onReset} />
            </div>
          ) : null}
        </div>
      );
    }
  };

  const handleClick = () => {
    imgRef.current.click();
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
                hoverable={true}
                bordered={true}
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
                  borderRadius: "10px",
                  cursor: 'default',
                }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={24} md={7} lg={6} xl={6} xxl={6}>
                    <div

                    >
                      {isBigFile
                        ? message.error("File size must be less than 200Kb.")
                        : ""}
                      {imgDiv()}
                    </div>
                  </Col>
                  <Col xs={24} sm={24} md={17} lg={18} xl={18} xxl={18}>
                    <Row gutter={[16, 8]}>
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
                  </Col>
                </Row>

                {editContactInfo === true ? (
                  <Row gutter={[16, 16]}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  ><Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => showEditCompanyInfo(false)}
                      >
                        <CloseOutlined /> CANCEL
                      </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          // marginLeft: "10px",
                          backgroundColor: "#1963A6",
                          borderColor: "#1963A6",
                          width: "119px",
                        }}
                      >
                        <CheckOutlined /> SAVE
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
                bordered={true}
                hoverable={true}
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
                  borderRadius: "10px",
                  cursor: "default",
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
                      paddingRight: "10px",
                      width: "100%"
                    }}
                    gutter={[16, 16]}
                  >
                    <Col xs={24} sm={24} md={8}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          // paddingRight: "10px",
                          justifyContent: 'start',
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
                            style={{ width: "100%" }}
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
                    <Col xs={24} sm={24} md={8}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          // paddingRight: "10px",
                          justifyContent: "start",
                          alignItems: "center"
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
                            style={{ width: "100%" }}
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
                    <Col xs={24} sm={24} md={8}>
                      <div
                        className="icon-position"
                        style={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",
                          flexDirection: "row",
                          // paddingRight: "10px",
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
                            style={{ width: "100%" }}
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
                  {/* <Row
                    className="iconface"
                    style={{
                      paddingBottom: "10px",
                    }}
                    gutter={[48, 8]}
                  >
                    
                  </Row>
                  <Row
                    className="iconface"
                    style={{
                      paddingBottom: "10px",
                    }}
                    gutter={[48, 8]}
                  >
                    
                  </Row> */}
                </div>
                {editContactIconInfo === true ? (
                  <Row
                    gutter={[16, 16]}
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="text"
                        style={{ fontSize: 15 }}
                        onClick={() => showEditCompanyIconInfo(false)}
                      >
                        <CloseOutlined /> CANCEL
                      </Button>
                    </Col>
                    <Col xs={24} sm={8} md={7} lg={6} xl={4} xxl={2}>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          // marginLeft: "10px",
                          backgroundColor: "#1963A6",
                          borderColor: "#1963A6",
                          width: "119px"
                        }}
                      >
                        <CheckOutlined />SAVE
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
