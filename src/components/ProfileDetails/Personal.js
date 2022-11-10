import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "../../style/BankAccount.css";
import moment from "moment";
const { TextArea } = Input;
const { Option } = Select;
// const dateFormatList = ["DD/MM/YYYY"];
function Personal() {
  const [editContent, showEditContent] = useState(false);
  const [editContactInfo, showEditContactInfo] = useState(false);
  const [dob, setDob] = useState("");
  const [scrs, setScrs] = useState("");
  const [lccs, setLccs] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const [form] = Form.useForm();
  const onFinish = (value) => {
    let nameArray = value.name.split(" ");
    let mname = "";
    for (let i = 1; i < nameArray.length - 1; i++) {
      mname = mname + ((i != 1 ? " " : "") + nameArray[i]);
      console.log(mname);
    }
    let record = {
      ...value,
      lname: nameArray[nameArray.length - 1],
      fname: nameArray[0],
      dob: dob ? dob : null,
      bloodGroup: value.bloodGroup ? value.bloodGroup : null,
      maritalStatus: value.maritalStatus ? value.maritalStatus : null,
      mname: mname,
    };
    console.log(record);
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    // setData(record)
    getData();
    showEditContent(false);
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const onContactFinish = (values) => {
    let record = {
      ...values,
      altPhnNo: values.altPhnNo ? values.altPhnNo : "",
    };
    console.log(record);
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    //  setData(values)
    getData();
    showEditContactInfo(false);
  };
  // const [addressdata, setAddressData] = useState([]);
  const onEditAddressFinish = (values) => {
    let record = {
      currentAdd: values.currentAdd ? values.currentAdd : "",
      houseType: values.houseType ? values.houseType : "",
      permanentAdd: values.permanentAdd ? values.permanentAdd : "",
      scrs: scrs ? scrs : null,
      lccs: lccs ? lccs : null,
    };
    console.log(record);
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    showEditAddressInfo(false);
    getData();
  };
  useEffect(() => {
    getData();
    // getContactData();
    // getAddressData();
  }, []);
  const getData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setData(data);
    setDob(data?.dob ? data.dob : null);
    setLccs(data?.lccs ? data.lccs : null);
    setScrs(data?.scrs ? data.scrs : null);
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
        <Row>
          <Col xs={22} sm={15} md={8}>
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
                title="PERSONAL INFO"
                className="personal"
                //   actions={[
                //   <EditOutlined key="edit" />,
                // ]}
                extra={
                  <>
                    {editContent === false ? (
                      <Button
                        type="text"
                        style={{ color: "#4ec0f1" }}
                        onClick={() => showEditContent(!editContent)}
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
                <Row gutter={[16, 16]}>
                  <Col xs={22} sm={15} md={8}>
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
                        Name
                      </div>
                      {editContent === false ? (
                        <div>{data ? data.name : null}</div>
                      ) : (
                        <Form.Item
                          initialValue={data.name}
                          name="name"
                          rules={[
                            {
                              required: true,
                              minLength: 3,
                              maxLength: 50,
                              // message: "Please enter First Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <Input
                            style={{ marginTop: "10px" }}
                            // disabled={true}
                            initialValue={data.name ? data.name : null}
                            maxLength={50}
                            required
                            placeholder="Enter Your Name"
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
                              form.setFieldsValue({ name: newVal, name: caps });
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
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
                        Date of Birth
                      </div>
                      {editContent === false ? (
                        <div>{data?.dob ? data.dob : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={dob ? moment(dob, "DD-MM-YYYY") : null}
                          name="dob"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          {/* format={dateFormatList} */}
                          <DatePicker
                            style={{ width: "100%", marginTop: "10px" }}
                            // format={dateFormatList}
                            // defaultValue= {dob?moment(dob, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setDob(e.format("DD-MM-YYYY"));
                            }}
                            //  disabledDate={disabledDate}
                            value={dob}
                            placeholder="Choose Date"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
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
                        Gender
                      </div>
                      {editContent === false ? (
                        <div>{data ? data.gender : null}</div>
                      ) : (
                        <Form.Item
                          name="gender"
                          initialValue={data.gender ? data.gender : "-"}
                          rules={[
                            {
                              required: true,
                              message: "Please Choose Gender",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a Gender"
                            style={{ width: "100%", marginTop: "10px" }}
                          >
                            <Option value="Male">Male</Option>
                            <Option value="Female">Female</Option>
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={15} md={8}>
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
                        Blood Group
                      </div>
                      {editContent === false ? (
                        <div>{data?.bloodGroup ? data.bloodGroup : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.bloodGroup : null}
                          name="bloodGroup"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose Blood Groop",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Select a Blood Group"
                            style={{ width: "100%", marginTop: "10px" }}
                          >
                            <Option value="A+">A+</Option>
                            <Option value="A-">A-</Option>
                            <Option value="O+">O+</Option>
                            <Option value="O-">O-</Option>
                            <Option value="B+">B+</Option>
                            <Option value="B-">B-</Option>
                            <Option value="AB+">AB+</Option>
                            <Option value="AB-">AB-</Option>
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
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
                        Marital Status
                      </div>
                      {editContent === false ? (
                        <div>
                          {data?.maritalStatus ? data.maritalStatus : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.maritalStatus : null}
                          name="maritalStatus"
                          rules={[
                            {
                              required: false,
                              message: "Your Marrige Status",
                            },
                          ]}
                        >
                          <Select style={{ width: "100%", marginTop: "10px" }}>
                            <Option value="Single">Single</Option>
                            <Option value="Married">Married</Option>
                          </Select>
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
                      onClick={() => showEditContent(false)}
                      type="text"
                      style={{ fontSize: 15 }}
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
        }}
      >
        <Row>
          <Col xs={22} sm={15} md={8}>
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
                title="CONTACT INFO"
                className="personal"
                //   actions={[
                //   <EditOutlined key="edit" />,
                // ]}
                extra={
                  <>
                    {editContactInfo === false ? (
                      <Button
                        type="text"
                        style={{ color: "#4ec0f1" }}
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
                <Row gutter={[16, 16]}>
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
                        Official Email ID
                      </div>
                      {editContactInfo === false ? (
                        <div>{data?.mailid ? data.mailid : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.mailid : null}
                          name="mailid"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Email Id",
                              type: "email",
                            },
                            {
                              message: "Please enter Valid Email",
                            },
                          ]}
                        >
                          <Input
                            style={{ marginTop: "10px" }}
                            disabled={true}
                            required
                            placeholder="Enter Email Address"
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col> */}
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
                        Personal Email ID
                      </div>
                      {editContactInfo === false ? (
                        <div>
                          {data?.contactEmail ? data.contactEmail : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.contactEmail : null}
                          name="contactEmail"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Email Id",
                              type: "email",
                            },
                            {
                              message: "Please enter Valid Email",
                            },
                          ]}
                        >
                          <Input
                            style={{ marginTop: "10px" }}
                            required
                            placeholder="Enter Email Address"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
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
                        Phone Number
                      </div>
                      {editContactInfo === false ? (
                        <div>{data?.phonenumber ? data.phonenumber : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.phonenumber : null}
                          className="numder-inputs"
                          name="phonenumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Phone Number",
                              pattern: /^[0-9\b]+$/,
                            },
                            { whitespace: true },
                          ]}
                        >
                          <Input
                            style={{ marginTop: "10px" }}
                            maxLength={10}
                            required
                            placeholder="Enter Phone Number"
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col> */}
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
                        Alternate Phone Number
                      </div>
                      {editContactInfo === false ? (
                        <div>{data?.altPhnNo ? data.altPhnNo : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.altPhnNo : null}
                          className="numder-inputs"
                          name="altPhnNo"
                          rules={[
                            {
                              required: false,
                              message: "Please enter Phone Number",
                              pattern: /^[0-9\b]+$/,
                            },
                            { whitespace: true },
                          ]}
                        >
                          <Input
                            style={{ marginTop: "10px" }}
                            maxLength={10}
                            placeholder="Enter Alternate Number"
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
          </Col>
        </Row>
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Row>
          <Col xs={22} sm={15} md={8}>
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
              onFinish={onEditAddressFinish}
            >
              <Card
                title="ADDRESSES"
                className="personal"
                //   actions={[
                //   <EditOutlined key="edit" />,
                // ]}
                extra={
                  <>
                    {editAddressInfo === false ? (
                      <Button
                        type="text"
                        style={{ color: "#4ec0f1" }}
                        onClick={() => showEditAddressInfo(!editAddressInfo)}
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
                <Row gutter={[16, 16]}>
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
                        Current Address
                      </div>
                      {editAddressInfo === false ? (
                        <div>{data?.currentAdd ? data.currentAdd : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.currentAdd : null}
                          name="currentAdd"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]{5,100}$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col> */}
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
                        Permanent Address
                      </div>
                      {editAddressInfo === false ? (
                        <div>
                          {data?.permanentAdd ? data.permanentAdd : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.permanentAdd : null}
                          name="permanentAdd"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 100,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^[a-zA-Z\s]*$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          <TextArea
                            style={{ marginTop: "10px" }}
                            // value={value}
                            // onChange={e => setValue(e.target.value)}
                            placeholder="Enter Address in Details"
                            autoSize={{ minRows: 3, maxRows: 5 }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={22} md={20}>
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
                        House Type
                      </div>
                      {editAddressInfo === false ? (
                        <div>{data?.houseType ? data.houseType : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.houseType : null}
                          name="houseType"
                          rules={[
                            {
                              // required: true,
                              minLength: 3,
                              maxLength: 30,
                              // message: "Please enter First Name",
                            },
                            {
                              // pattern: /^[a-zA-Z\s]*$/,
                              // message: "Please enter Valid Name",
                            },
                          ]}
                        >
                          {/* <Input
                    
                        maxLength={50}
                        // required
                        placeholder="Enter Your HouseType"
                          //defaultValue = {data?data.fname+" "+data.lname:null}
                      /> */}
                          <Select
                            placeholder="Select Your HouseType"
                            style={{ width: "100%", marginTop: "10px" }}
                          >
                            <Option value="House Type">House Type</Option>
                            <Option value="Owned by Self/Spouse">
                              Owned by Self/Spouse
                            </Option>
                            <Option value="Owned by Parent/Sibling">
                              Owned by Parent/Sibling
                            </Option>
                            <Option value="Rented - with Family">
                              Rented - with Family
                            </Option>
                            <Option value="Rented - with Friends">
                              Rented - with Friends
                            </Option>
                            <Option value="Rented - Staying Alone">
                              Rented - Staying Alone
                            </Option>
                            <Option value="Paying Guest">Paying Guest</Option>
                            <Option value="Hostel">Hostel</Option>
                            <Option value="Company Provided">
                              Company Provided
                            </Option>
                            <Option value="Other">Other</Option>
                          </Select>
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={22} md={20}>
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
                        Staying at Current Residence Since
                      </div>
                      {editAddressInfo === false ? (
                        <div>{data?.scrs ? data.scrs : "-"}</div>
                      ) : (
                        <Form.Item
                          // name="dob"
                          initialValue={
                            scrs ? moment(scrs, "DD-MM-YYYY") : null
                          }
                          name="scrs"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          <DatePicker
                            // format={dateFormatList}
                            // defaultValue= {scrs?moment(scrs, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setScrs(e.format("DD-MM-YYYY"));
                            }}
                            style={{ width: "100%", marginTop: "10px" }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
                  <Col xs={22} sm={22} md={20}>
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
                        Living in Current City Since
                      </div>
                      {editAddressInfo === false ? (
                        <div>{data?.lccs ? data.lccs : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={
                            lccs ? moment(lccs, "DD-MM-YYYY") : null
                          }
                          name="lccs"
                          rules={[
                            {
                              required: false,
                              message: "Please Choose a Date",
                            },
                          ]}
                        >
                          <DatePicker
                            // format={dateFormatList}
                            // defaultValue= {lccs?moment(lccs, "DD-MM-YYYY"):null}
                            onChange={(e) => {
                              setLccs(e.format("DD-MM-YYYY"));
                            }}
                            style={{ width: "100%", marginTop: "10px" }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
                </Row>
                {editAddressInfo === true ? (
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      type="text"
                      onClick={() => showEditAddressInfo(false)}
                      style={{ fontSize: 15 }}
                    >
                      <CloseOutlined />
                      CANCEL
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
export default Personal;
