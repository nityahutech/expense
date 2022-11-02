import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form } from "antd";
import { CloseOutlined, EditFilled } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./companystyle.css";
import linkedin from "../../images/linkedin.png";
import facebook from "../../images/facebook.png";
import twitter from "../../images/twitter.png";

const { TextArea } = Input;
const { Option } = Select;




// const dateFormatList = ["DD/MM/YYYY"];
function Overview() {
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
      fname = i != 0 ? " " + fname + nameArray[i] : fname + nameArray[i];
    }
    let record = {
      ...value,
      lname: nameArray[nameArray.length - 1],
      fname: fname,
      dob: dob ? dob : null,
    };
    delete record["name"];
    // EmpInfoContext.updateEduDetails(currentUser.uid, record);
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
    // EmpInfoContext.updateEduDetails(currentUser.uid, values);
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
    // EmpInfoContext.updateEduDetails(currentUser.uid, record);
    showEditAddressInfo(false);
    getData();
  };
  useEffect(() => {
    getData();
    // getContactData();
    // getAddressData();
  }, []);
  const getData = async () => {
    // let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    setData(data);
    setDob(data.dob ? data.dob : null);
    setLccs(data.lccs ? data.lccs : null);
    setScrs(data.scrs ? data.scrs : null);
  };
  const getContactData = async () => {
    // let alldata = await EmpInfoContext.getEduDetails(currentUser.uid);
    getData();
    // setMailId(data.mailid?data.mailid:null)
    // setContactEmail(data.contactEmail?data.contactEmail:null)
    // setPhoneNumber(data.phonenumber?data.phonenumber:null)
  };
  const getAddressData = async () => {
    // let data = await EmpInfoContext.getEduDetails(currentUser.uid);
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
          onFinish={onContactFinish}
        >
          <Card
            title=" Registered Company Name"
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
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Registered Company Name
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="mailid"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Comapany Name",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Comapany Name",
                        },
                      ]}
                    >
                      <Input type='CompamyName' required placeholder="Enter Comapany Name" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>

              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Brand Name
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.contactEmail ? data.contactEmail : ""}</div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.contactEmail : null}
                      name="brandName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Brand Name",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Brand Name",
                        },
                      ]}
                    >
                      <Input type='brandName' required placeholder="Enter Brand Name" />
                    </Form.Item>
                  )}
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: "5%" }}>
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Website
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="mailid"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Website Name",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Website Name",
                        },
                      ]}
                    >
                      <Input type='WebsiteName' required placeholder="Enter Website Name" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                    </Form.Item>
                  )}
                </div>
              </Col>

              {/* <Col span={8}></Col> */}
              <Col span={12}>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                    Domain Name
                  </div>
                  {editContactInfo === false ? (
                    <div>{data.mailid ? data.mailid : ""}
                    </div>
                  ) : (
                    <Form.Item
                      initialValue={data ? data.mailid : null}
                      name="mailid"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Domain Name",
                          type: "email",
                        },
                        {
                          message: "Please enter Valid Domain Name",
                        },
                      ]}
                    >
                      <Input type='DomainName' required placeholder="Enter Domain Name" />
                      {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
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
          onFinish={onContactFinish}
        >
          <Card
            title=" SOCIAL PROFILE"

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
            <Row className="iconface" style={{
              paddingBottom: '10px'
            }} gutter={[16, 16]}>
              <Col span={24}>
                <div className='icon-position' style={{ display: 'flex', flexDirection: 'row' }}>
                  <div >
                    <img
                      src={linkedin}

                      alt="downArrow"
                      style={{ cursor: "pointer", width: '30px' }}
                    />

                  </div>
                  {editContactInfo === false ? (
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
                <div className='icon-position' style={{ display: 'flex', flexDirection: 'row' }}>
                  <div >
                    <img
                      src={facebook}

                      alt="downArrow"
                      style={{ cursor: "pointer", width: '30px' }}
                    />

                  </div>
                  {editContactInfo === false ? (
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
                <div className='icon-position' style={{ display: 'flex', flexDirection: 'row' }}>
                  <div >
                    <img
                      src={twitter}

                      alt="downArrow"
                      style={{ cursor: "pointer", width: '30px' }}
                    />

                  </div>
                  {editContactInfo === false ? (
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




    </>
  );
}
export default Overview;