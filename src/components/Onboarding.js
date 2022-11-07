import React, { useState, useRef,useEffect } from "react";
import {
  Form,
  Tabs,
  Input,
  Col,
  Row,
  Divider,
  message,
  Upload,
  Button,
  notification,
  Space,
  Card,
  Table,
} from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "../style/Onboarding.css";
import CompanyProContext from "../contexts/CompanyProContext";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const beforeUpload = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg/png" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 200kb!");
  }
  return isJpgOrPng && isLt2M;
};

function Onboarding(props) {
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [data, setData] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [addAccess, setAddAccess] = useState(false);

  const [fileName, setFileName] = useState("");
  const [isFileSizeInvalid, setIsFileSizeInvalid] = useState(false);
  const imgRef = React.useRef(null);

  const onFinish = values => {
    const valuesToservice = {
      orgcode: values.orgcode,
      orgname: values.orgname,
      state: values.state,
      cinnumber: values.cinnumber,
      gstnumber: values.gstnumber,
      domname: values.domname,
      address1: values.address1,
      address2: values.address2,
      phone: values.phone,
      city: values.city,
      pincode: values.pincode,
      country:values.country
    }
    console.log(values,valuesToservice);
  //   CompanyProContext.updateCompInfo(compId,value);
  //    getData();
  //    setAddAccess(false);
  // };

    CompanyProContext.createCompInfo(valuesToservice)
      .then(response => {
      showNotification("success", "Success", "Onboarding Completed");
      })
      .catch(error => {
      })
      setAddAccess(false);
    };
        
        
          const showNotification = (type, msg, desc) => {
            notification[type]({
                message: msg,
                description: desc,
            });

};

  const handleClick = (event) => {
    console.log("imgRef:: ", imgRef);
    imgRef.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFileName(fileUploaded.name);
    checkFileSize(fileUploaded.size);
  };

  function checkFileSize(size) {
    if (Math.round(size / 1024) <= 200) {
      setIsFileSizeInvalid(false);
    } else {
      setIsFileSizeInvalid(true);
    }
  }

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

  function onDelete(delItem) {
    console.log(delItem);
    const filteredData = accessList.filter(
      (item) => item.emailaddress !== delItem.emailaddress
    );
    CompanyProContext.deleteCompInfo(delItem.id)
    .then((response) => {
               console.log(response);
               })
    setAccessList(filteredData);
  }

  function addUseRole(values) {
    const value={
      userole: values.userole,
      name: values.name,
      emailaddress: values.emailaddress,
      phone: values.phone,
      twitter: values.twitter,
      }
    setAccessList([...accessList, values]);
    form2.resetFields();
    setAddAccess(false);
    // setAccessList([...accessList, newAccess]);
    // setNewAccess({ userole: "", name: "", emailaddress: "", phone: "" });
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Action",
      key: "action",
    },
  ];
  return (
    <div className="main">
      <Tabs
        defaultActiveKey="1"
        className="mainTabs"
        // onChange={onChange}
      >
        <Tabs.TabPane tab="Organization Onboarding" key="1">
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <div style={{ margin: "13px", background: "#fff" }}>
              <div
                style={{
                  paddingTop: "13px",
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19px",
                }}
              >
                ORGANIZATION DETAILS
              </div>
              <Divider />
              <Form
                className="details"
                style={{ margin: "30px" }}
                form={form}
                layout="vertical"
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
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="orgcode"
                      label="Organization Code"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event) && checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Organization Code",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Code",
                        },
                      ]}
                    >
                      <Input
                        maxLength={15}
                        placeholder="Organization Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="orgname"
                      label="Organization Name"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Organization Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={20}
                        placeholder="Organization Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="cinnumber"
                      label="CIN Number"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event) && checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter CIN Number",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={21}
                        placeholder="CIN Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="gstnumber"
                      label="GST Number"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event) && checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter GST Number",
                        },
                        {
                          pattern: /^[0-9a-zA-Z]+$/,
                          message: "Please enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={22}
                        placeholder="GST Number"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="domname"
                      label="Domain Name"
                      rules={[
                        {
                          required:true,
                          message: "Please Enter Domain Name",
                        },
                        {
                         // pattern:
                            //"/^[A-Z0-9._%+-]+.[A-Z0-9._%+-]+.[A-Z]{2,4}$/i;",
                          //message: "Please Enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={25}
                        placeholder="Domain Name"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="address1"
                      label="Address Line1"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Company Address",
                        },
                        {
                          pattern: /^[0-9a-zA-Z.,]+$/,

                          message: "Please Enter Valid Address",
                        },
                      ]}
                    >
                      <Input
                        maxLength={50}
                        placeholder="Address Line1"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="address2"
                      label="Address Line2"
                      rules={[
                        {
                          required: true,
                          message: "Please Enter Company Address",
                        },
                        {
                          pattern: /^[0-9a-zA-Z.,]+$/,

                          message: "Please Enter Valid Address",
                        },
                      ]}
                    >
                      <Input
                        maxLength={50}
                        placeholder="Address Line2"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="phone"
                      label="Phone"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Phone Number",
                        },
                        {
                          pattern: /^[6-9]\d{9}$/,
                          message: "Please Enter Valid Number",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="Phone"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="city"
                      label="City"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please Enter City Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        placeholder="City"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={[24, 8]}>
                  <Col xs={22} sm={15} md={8}>
                    <Form.Item
                      name="state"
                      label="State"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter State",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="State"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={15} md={4}>
                    <Form.Item
                      name="pincode"
                      label="Pin Code"
                      onKeyPress={(event) => {
                        if (checkNumbervalue(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Pin Code",
                        },
                        {
                          pattern: /^[0-9\b]+$/,
                          message: "Please Enter Valid Code",
                        },
                      ]}
                    >
                      <Input
                        maxLength={6}
                        placeholder="Pin Code"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={22} sm={15} md={4}>
                    <Form.Item
                      name="country"
                      label="Country"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
                      rules={[
                        {
                          required: true,

                          message: "Please enter Country Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                        maxLength={10}
                        placeholder="Country"
                        style={{
                          border: "1px solid #8692A6",
                          borderRadius: "4px",
                        }}
                      />
                    </Form.Item>
                  </Col>

                  <Col xs={22} sm={8}>
                    <Form.Item name="file" className="uploadLogo">
                      <div
                        style={{
                          border: "dashed #B9B9B9",
                          borderWidth: "thin",
                          borderRadius: "4px",
                          display: "flex",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button
                          onClick={handleClick}
                          style={{
                            width: " 60px",
                            height: "60px",
                            margin: "10px",
                          }}
                        >
                          <PlusCircleOutlined
                            style={{
                              display: "flex",
                              flexDirection: "column-reverse",
                              alignItems: "center",
                            }}
                          />
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              marginRight: "8px",
                            }}
                          >
                            Upload
                          </span>
                        </Button>
                        {isFileSizeInvalid ? "" : fileName}
                        {isFileSizeInvalid ? (
                          <p style={{ color: "red" }}>
                            File size must be less than 200Kb.
                          </p>
                        ) : (
                          ""
                        )}
                        <input
                          style={{
                            height: "72px",
                            marginTop: "11px",
                            display: "none",
                          }}
                          type="file"
                          // accept="image/gif, image/jpeg, image/png"
                          id="myfile"
                          name="file"
                          ref={imgRef}
                          onChange={handleChange}
                        />
                        <p
                          style={{
                            fontWeight: "400",
                            fontSize: "13px",
                            lineHeight: "19px",
                            marginLeft: "10px",
                          }}
                        >
                          Upload logo. Use the 200 kb size image. PNG or JPEG
                          file format accepted
                        </p>
                      </div>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>

            <Divider />
            <Card
              style={{
                margin: "56px",
                padding: "10px",
                background: "#f8f8f8",
                // height: "auto",
              }}
            >
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "17px",
                }}
              >
                Organization Access
              </div>
              <Divider />
              <Form
                className="form"
                style={{ margin: "30px" }}
                form={form2}
                layout="vertical"
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
                //onFinish={addUseRole}
              >
                {accessList.map((u, i) => (
                  <div style={{ marginTop: "10px" }} className="inputLabel">
                    <Row gutter={[24, 20]}>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Use Role
                        </label>
                        <Input value={u.userole}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Name
                        </label>
                        <Input value={u.name}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Email Address
                        </label>
                        <Input value={u.emailaddress}></Input>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                          Phone Number
                        </label>

                        <Input value={u.phone}></Input>
                        <Button
                          style={{
                            background: "#f8f8f8",
                            border: "none",
                            color: "#095AA4",
                            position: "absolute",
                            width: "10px",
                          }}
                          onClick={() => {
                            onDelete(u);
                          }}
                        >
                          <CloseCircleOutlined />
                        </Button>
                      </Col>
                    </Row>
                  </div>
                ))}
                {addAccess ? (
                  <div style={{ marginRight: "60px", marginTop: "15px" }}>
                    <Row gutter={[20, 8]} className="addUserForm">
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="userole"
                          label="Use Role"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Role",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Role",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            placeholder="Use Role"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="name"
                          label="Name"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please Enter Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please Enter Valid Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={20}
                            placeholder="Name"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="emailaddress"
                          label="Email Address"
                          rules={[
                            {
                              type: "email",
                              required: true,
                              message: "Enter Email address",
                              pattern:
                                "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i;",
                            },
                          ]}
                        >
                          <Input
                            maxLength={30}
                            placeholder="Email Address"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                      <Col xs={22} sm={15} md={6}>
                        <Form.Item
                          name="phone"
                          label="Phone Number"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: true,

                              message: "Please enter Phone Number",
                            },
                            {
                              pattern: /^[6-9]\d{9}$/,
                              message: "Please Enter Valid Number",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            placeholder="Phone Number"
                            style={{
                              border: "1px solid #8692A6",
                              borderRadius: "4px",
                            }}
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                ) : null}
                <Button
                  style={{
                    border: "none",
                    // marginLeft: "49rem",
                    background: "#f8f8f8",
                    color: "#095AA4",
                    fontWeight: "600",
                    fontSize: "13px",
                    lineHeight: "14.4px",
                    float: "right",
                  }}
                  htmlType= "submit" 
                  onClick={() => {
                    if (!addAccess) {
                      setAddAccess(true);
                    }
                  }}
                >
                  <PlusCircleOutlined /> Add User
                </Button>
              </Form>
            </Card>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "94px",
              }}
            >
              <Space>
                <Form.Item>
                  <Button
                    style={{
                      border: "1px solid #1565D8",
                      color: "#1565D8",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      width: "99px",
                    }}
                  >
                    CANCEL
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    style={{
                      border: "1px solid #1565D8",
                      background: "#1565D8",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "14px",
                      lineHeight: "17px",
                      width: "99px",
                    }}
                  >
                    SAVE
                  </Button>
                </Form.Item>
              </Space>
            </div>
          </Card>
        </Tabs.TabPane>
        <Tabs.TabPane tab="View All Organization" key="2">
          <Card
            style={{
              background: "#fff",
              margin: "0px 15px 20px 15px",

              // height: "55rem",
            }}
          >
            <div style={{ background: "#fff" }}>
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "14px",
                  lineHeight: "19px",
                }}
              >
                Organization Details
              </div>
              <Divider />
              <div>
                <Table className="tableTab" columns={columns} />
              </div>
            </div>s
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );

              }

export default Onboarding;
