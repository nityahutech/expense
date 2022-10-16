import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
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
  // const [houseType, setHouseType] = useState("");
  // const [currentAdd, setCurrentAdd] = useState("");
  // const [permanentAdd, setPermanentAdd] = useState("");
  // const [contactEmail, setContactEmail] = useState("");
  // const [phonenumber, setPhoneNumber] = useState("");
  // const [mailid, setMailId] = useState("");
  const [editAddressInfo, showEditAddressInfo] = useState(false);
  // const [cancelEditContent, setcancelEditContent] = useState(false);
  const [data, setData] = useState([]);
  const { currentUser } = useAuth();
  const onFinish = (value) => {
    let nameArray = value.name.split(" ");
    let fname = "";
    for (let i = 0; i < nameArray.length - 1; i++) {
      fname = fname + nameArray[i] + " ";
    }
    let record = {
      ...value,
      lname: nameArray[nameArray.length - 1],
      fname: fname,
      dob: dob ? dob : null,
    };
    delete record["name"];
    EmpInfoContext.updateEduDetails(currentUser.uid, record);
    // setData(record)
    getData();
    showEditContent(false);
  };
  // function disabledDate(current) {
  //   // Can not select days before today and today
  //   return current && current > moment().endOf('day');
  // }
  // const [contactdata, setContactData] = useState([]);
  const onContactFinish = (values) => {
    EmpInfoContext.updateEduDetails(currentUser.uid, values);
    //  setData(values)
    getData();
    showEditContactInfo(false);
  };
  // const [addressdata, setAddressData] = useState([]);
  const onEditAddressFinish = (newvalue) => {
    let record = {
      ...newvalue,
      scrs: scrs ? scrs : null,
      lccs: lccs ? lccs : null,
    };
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
    setDob(data.dob ? data.dob : null);
    setLccs(data.lccs ? data.lccs : null);
    setScrs(data.scrs ? data.scrs : null);
  };
  const getContactData = async () => {
    let alldata = await EmpInfoContext.getEduDetails(currentUser.uid);
    getData();
    // setMailId(data.mailid?data.mailid:null)
    // setContactEmail(data.contactEmail?data.contactEmail:null)
    // setPhoneNumber(data.phonenumber?data.phonenumber:null)
  };
  const getAddressData = async () => {
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    getData();
    // setCurrentAdd(data.currentAdd?data.currentAdd:null)
    // setPermanentAdd(data.permanentAdd?data.permanentAdd:null)
    // setHouseType(data.houseType?data.houseType:null)
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
            title="PERSONAL INFO"
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
                    Edit
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
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Name
                  </div>
                  {editContent === false ? (
                    <div>{data ? data.fname + " " + data.lname : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={data.fname + " " + data.lname}
                      name="name"
                      rules={[
                        {
                          // required: true,
                          minLength: 3,
                          maxLength: 20,
                          // message: "Please enter First Name",
                        },
                        {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: "Please enter Valid Name",
                        },
                      ]}
                    >
                      <Input
                      disabled={true}
                        value={data.fname + " " + data.lname}
                        maxLength={50}
                        required
                        placeholder="Enter Your Name"
                        //defaultValue = {data?data.fname+" "+data.lname:null}
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Date of Birth
                  </div>
                  {editContent === false ? (
                    <div>{data ? data.dob : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={dob?moment(dob, "DD-MM-YYYY"):null}
                      name="dob"
                      rules={[
                        {
                          required: true,
                          message: "Please Choose a Date",
                        },
                      ]}
                    >
                      {/* format={dateFormatList} */}
                      <DatePicker
                        style={{ width: "100%" }}
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
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Gender
                  </div>
                  {editContent === false ? (
                    <div>{data ? data.gender : null}</div>
                  ) : (
                    <Form.Item
                      name="gender"
                      initialValue={data ? data.gender : null}
                      rules={[
                        {
                          required: true,
                          message: "Please Choose Gender",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Gender"
                        style={{ width: "100%" }}
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
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Blood Group
                  </div>
                  {editContent === false ? (
                    <div>{data ? data.bloodGroup : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.bloodGroup : null}
                      name="bloodGroup"
                      rules={[
                        {
                          required: true,
                          message: "Please Choose Blood Groop",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Select a Blood Group"
                        style={{ width: "100%" }}
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
              <Col span={8}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Marital Status
                  </div>
                  {editContent === false ? (
                    <div>{data ? data.maritalStatus : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.maritalStatus : null}
                      name="maritalStatus"
                      rules={[
                        {
                          required: true,
                          message: "Your Marrige Status",
                        },
                      ]}
                    >
                      <Select style={{ width: "100%" }}>
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
      </div>

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
            title="CONTACT INFO"
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
                    Edit
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Official Email ID
                  </div>
                  {editContactInfo === false ? (
                    <div>{data ? data.mailid : null}</div>
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
                      <Input disabled={true} required placeholder="Enter Email Address" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Personal Email ID
                  </div>
                  {editContactInfo === false ? (
                    <div>{data ? data.contactEmail : null}</div>
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
                      <Input required placeholder="Enter Email Address" />
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Phone Number
                  </div>
                  {editContactInfo === false ? (
                    <div>{data ? data.phonenumber : null}</div>
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
                        maxLength={10}
                        required
                        placeholder="Enter Phone Number"
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Alternate Phone Number
                  </div>
                  {editContactInfo === false ? (
                    <div>{data ? data.altPhnNo : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.altPhnNo : null}
                      className="numder-inputs"
                      name="altPhnNo"
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
                        maxLength={10}
                        required
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
      </div>

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
          onFinish={onEditAddressFinish}
        >
          <Card
            title="ADDRESSES"
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
                    Edit
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Current Address
                  </div>
                  {editAddressInfo === false ? (
                    <div>{data ? data.currentAdd : null}</div>
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Permanent Address
                  </div>
                  {editAddressInfo === false ? (
                    <div>{data ? data.permanentAdd : null}</div>
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    House Type
                  </div>
                  {editAddressInfo === false ? (
                    <div>{data ? data.houseType : null}</div>
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
                        style={{ width: "100%" }}
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Staying at Current Residence Since
                  </div>
                  {editAddressInfo === false ? (
                    <div>{data ? data.scrs : null}</div>
                  ) : (
                    <Form.Item
                      // name="dob"
                      initialValue={scrs?moment(scrs, "DD-MM-YYYY"):null}
                      name="scrs"
                      rules={[
                        {
                          required: true,
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
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                </div>
              </Col>
              {/* <Col span={8}></Col>
            <Col span={8}></Col> */}
            </Row>
            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Living in Current City Since
                  </div>
                  {editAddressInfo === false ? (
                    <div>{data ? data.lccs : null}</div>
                  ) : (
                    <Form.Item
                      initialValue={lccs?moment(lccs, "DD-MM-YYYY"):null}
                      name="lccs"
                      rules={[
                        {
                          required: true,
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
                        style={{ width: "100%" }}
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
      </div>
    </>
  );
}
export default Personal;
