import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, Form, message, Skeleton } from "antd";
import {
  CloseOutlined,
  DeleteOutlined,
  UploadOutlined,
  EditFilled,
  CheckOutlined,
} from "@ant-design/icons";
import "./companystyle.css";
import "./Overview.css";
import linkedin from "../../images/linkedin.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";
import CompanyProContext from "../../contexts/CompanyProContext";
import {
  capitalize,
  checkAlphabets,
  getBase64,
} from "../../contexts/CreateContext";

function Overview() {
  const [form] = Form.useForm();
  const [editContactInfo, showEditCompanyInfo] = useState(false);
  const [editContactIconInfo, showEditCompanyIconInfo] = useState(false);
  const [data, setData] = useState([]);
  const compId = sessionStorage.getItem("compId");
  const [loading, setLoading] = useState(true);
  const [isBigFile, setIsBigFile] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const imgRef = React.useRef(null);

  const onFinish = (values) => {
    const valuesToservice = {
      regCompName: values.regCompName,
      brandName: values.brandName,
      website: values.website || "",
      domain: values.domain,
      profilePic: imageUrl || data.profilePic || null,
    };
    CompanyProContext.updateCompInfo(compId, valuesToservice, fileName);
    const timer = setTimeout(() => {
      getData();
    }, [2000]);
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
    setLoading(true);
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
    setImageUrl(data.logo);
    setLoading(false);
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
    if (imageUrl == "" || imageUrl == null) {
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
            padding: "10px",
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
            padding: "10px",
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
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "15px",
            // border: "1px solid #d0d0d0",
            // Width: "auto",
            // height: "auto",
            // borderRadius: "6px",
            // display: "inline-block",
          }}
        >
          <img
            src={imageUrl}
            style={{
              maxWidth: "170px",
              height: "100px",
              padding: "10px",
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
              {loading ? (
                <Skeleton active />
              ) : (
                <Card
                  title=" OVERVIEW"
                  className="overview"
                  hoverable={true}
                  bordered={true}
                  // loading={loading}
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
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <Row gutter={[0, 0]}>
                    <Col xs={24} sm={22} md={8}>
                      <div>
                        {isBigFile
                          ? message.error("File size must be less than 200Kb.")
                          : ""}
                        {imgDiv()}
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={10}>
                      <div>
                        <div className="div-discription">
                          Registered Company Name
                        </div>
                        {editContactInfo === false ? (
                          <div style={{ marginTop: "7px" }}>
                            {data.regCompName}
                          </div>
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
                                pattern: /^[0-9a-zA-Z.,-\s]*$/,
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
                                width: "220px",
                              }}
                              onChange={(e) => {
                                const str = e.target.value;
                                const caps = str
                                  .split(" ")
                                  .map(capitalize)
                                  .join(" ");
                                form.setFieldsValue({
                                  regCompName: caps,
                                });
                              }}
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={6}>
                      <div>
                        <div className="div-discription">Brand Name</div>
                        {editContactInfo === false ? (
                          <div style={{ marginTop: "7px" }}>
                            {data.brandName}
                          </div>
                        ) : (
                          <Form.Item
                            initialValue={data ? data.brandName : null}
                            name="brandName"
                            // onKeyPress={(event) => {
                            //   if (checkAlphabets(event)) {
                            //     event.preventDefault();
                            //   }
                            // }}
                            rules={[
                              {
                                required: true,

                                message: "Please enter Brand Name",
                              },
                              {
                                pattern: /^[0-9a-zA-Z-\s]*$/,
                                message: "Please enter Valid Brand Name",
                              },
                            ]}
                          >
                            <Input
                              maxLength={20}
                              style={{
                                paddingLeft: "0px",
                                borderBottom: "1px solid #ccc ",
                              }}
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
                                // setPaidBy(newVal);
                                form.setFieldsValue({
                                  brandName: newVal,
                                  brandName: caps,
                                });
                              }}
                              placeholder="Enter Brand Name"
                              bordered={false}
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={8}></Col>
                    <Col xs={22} sm={15} md={10}>
                      <div>
                        <div className="div-discription">Website</div>
                        {editContactInfo === false ? (
                          <div style={{ marginTop: "7px" }}>
                            <a href={`https://${data.website}`} target="_blank">
                              {data.website}
                            </a>
                          </div>
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
                                  /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&//=]*)?$/,
                                message: "Please enter Valid Website Name",
                              },
                            ]}
                          >
                            <Input
                              maxLength={60}
                              style={{
                                paddingLeft: "0px",
                                borderBottom: "1px solid #ccc ",
                                width: "220px",
                              }}
                              placeholder="Enter Website Name"
                              bordered={false}
                            />
                          </Form.Item>
                        )}
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={6}>
                      <div>
                        <div className="div-discription">Domain Name</div>
                        {editContactInfo === false ? (
                          <div style={{ marginTop: "7px" }}>{data.domain}</div>
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
                                  /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/,

                                message: "Please enter Valid Domain Name",
                              },
                            ]}
                          >
                            <Input
                              maxLength={60}
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
              )}
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
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
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
              {loading ? (
                <Skeleton active />
              ) : (
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
                    width: "100%",
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
                        width: "100%",
                      }}
                      gutter={[16, 16]}
                    >
                      <Col xs={24} sm={24} md={8}>
                        <div
                          className="icon-position"
                          style={{
                            display: "flex",
                            //   flexDirection: "row",
                            //   // paddingRight: "10px",
                            //   justifyContent: "start",
                            alignItems: "center",
                            //   // paddingLeft:"10px"
                          }}
                        >
                          <div
                          // style={{
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   alignItems: "center",
                          // }}
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
                            <a
                              href={`https://in.linkedin.com/company/${data.linkedin}`}
                              target="_blank"
                            >
                              {data.linkedin}
                            </a>
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
                                  pattern:
                                    // /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/,
                                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&//=]*)?$/,
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
                                maxLength={30}
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
                            //   flexDirection: "row",
                            //   // paddingRight: "10px",
                            //   justifyContent: "start",
                            alignItems: "center",
                          }}
                        >
                          <div
                          // style={{
                          //   display: "flex",
                          //   justifyContent: "center",
                          //   alignItems: "center",
                          // }}
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
                            <a
                              href={`https://www.facebook.com/${data.facebook}`}
                              target="_blank"
                            >
                              {data.facebook}
                            </a>
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
                                  pattern:
                                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&//=]*)?$/,
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
                                maxLength={30}
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
                            //   justifyContent: "start",
                            alignItems: "center",
                            //   flexDirection: "row",
                            //   // paddingRight: "10px",
                          }}
                        >
                          <div>
                            <img
                              src={twitter}
                              alt="downArrow"
                              style={{
                                cursor: "pointer",
                                width: "30px",
                                margin: "10px",
                              }}
                            />
                          </div>
                          {editContactIconInfo === false ? (
                            <a
                              href={`https://www.twitter.com/${data.twitter}`}
                              target="_blank"
                            >
                              {data.twitter}
                            </a>
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
                                  pattern:
                                    /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@%_\+.~#?&//=]*)?$/,
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
                                maxLength={30}
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
                            width: "119px",
                          }}
                        >
                          <CheckOutlined />
                          SAVE
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                </Card>
              )}
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Overview;
