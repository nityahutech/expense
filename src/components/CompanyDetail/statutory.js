import React, { useState, useEffect } from "react";
import { Card, Row, Col, Input, Button, DatePicker, Select, Form, Tabs, Table } from "antd";
import { CloseOutlined, EditFilled, CheckOutlined, SearchOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import EmpInfoContext from "../../contexts/EmpInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";


const { TextArea } = Input;
const { Option } = Select;


const Statutory = () => {

  const [editContent, showEditContent] = useState(false);
  const [editCompanyID, showeditCompanyID] = useState(false);
  const [editBankInfo, showEditBankInfo] = useState(false);
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
    showeditCompanyID(false);
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

  const columnone = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'EmailID',
      dataIndex: 'EmailID',
      key: 'EmailID',
    },
    {
      title: 'DIN',
      dataIndex: 'DIN',
      key: 'DIN',
    },
    {
      title: 'Phoneno',
      dataIndex: 'Phoneno',
      key: 'Phoneno',
    },
  ]
  
  const dataone = [
    {
      key:"1",
      Name:"Ram",
      EmailID:"ram@hutechsolutions.com",
      DIN:"85462",
      Phoneno:"654865875",
    }
  ]

  const columntwo = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'EmailID',
      dataIndex: 'EmailID',
      key: 'EmailID',
    },
    {
      title: 'Type',
      dataIndex: 'Type',
      key: 'Type',
    },
    {
      title: 'Phoneno',
      dataIndex: 'Phoneno',
      key: 'Phoneno',
    },
  ]

  const datatwo = [
    {
      key:"1",
      Name:"Ram",
      EmailID:"ram@hutechsolutions.com",
      Type:"85462",
      Phoneno:"654865875",
    }
  ]

  const columnthree = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'EmailID',
      dataIndex: 'EmailID',
      key: 'EmailID',
    },
    {
      title: 'Phoneno',
      dataIndex: 'Phoneno',
      key: 'Phoneno',
    },
  ]

  const datathree = [
    {
      key:"1",
      Name:"Ram",
      EmailID:"ram@hutechsolutions.com",
      Phoneno:"654865875",
    }
  ]

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (

    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        height:'100rem',
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
          title=" COMPANY ID"
          style={{marginTop:"1rem",width:'800px'}}
          // className="card1"
          extra={
            <>
              {editCompanyID === false ? (
                <Button
                  type="text"
                  style={{ color: "#4ec0f1" }}
                  onClick={() => showeditCompanyID(!editCompanyID)}
                >
                  <EditFilled />
                </Button>
              ) : null}
            </>
          }
          
        >
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Entity Type
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
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
                    <Input type='CompamyName' required placeholder="Enter Comapany Name" />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  CIN
                </div>
                {editCompanyID === false ? (
                  <div>{data.contactEmail ? data.contactEmail : "-"}</div>
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

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Date of Incorporation
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
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
                    <Input type='WebsiteName' required placeholder="Enter Website Name" />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "5%", }}>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Company PAN
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
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
                    <Input type='DomainName' required placeholder="Enter Domain Name" />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  Company TAN
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
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
                    <Input type='DomainName' required placeholder="Enter Domain Name" />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

            <Col span={8}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "15px" }}>
                  GST
                </div>
                {editCompanyID === false ? (
                  <div>{data.mailid ? data.mailid : "-"}
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
                    <Input type='DomainName' required placeholder="Enter Domain Name" />
                    {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                  </Form.Item>
                )}
              </div>
            </Col>

          </Row>
          {editCompanyID === true ? (
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
                onClick={() => showeditCompanyID(false)}
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
        <Card
          style={{marginTop:"1rem",width:'800px'}}
        >
          <Tabs defaultActiveKey="1" className='tabs'>
            <Tabs.TabPane tab="Directors" key="1">
                <Card
                className="tabcard1"
                  title="Directors"
                  bordered={false}
                >
                  <Table columns={columnone} dataSource={dataone} bordered={false} pagination={false} />
                </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Auditors" key="2">
                  <Card
                        title="Auditors"
                        bordered={false}
                      >
                         <Table columns={columntwo} dataSource={datatwo} bordered={false} pagination={false}/>
                      </Card>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Company Secretary" key="3">
                    <Card
                        title="Company Secretary"
                        bordered={false}
                      >
                         <Table columns={columnthree} dataSource={datathree} bordered={false} pagination={false}/>
                      </Card>
            </Tabs.TabPane>
          </Tabs>
        </Card>
        <Card
           title="BANK ACCOUNT INFO"
           style={{marginTop:"1rem",width:'800px'}}
        >
          {editBankInfo === false ? (
            <Button 
              type="text"
              onClick={() => showEditBankInfo(!editBankInfo)}
            ><PlusCircleOutlined />Add</Button>
          ):(
          <Form>
            <Row gutter={[16,48]}>
              <Col span={24}>
                <FormItem
                  name="accountitle"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter account title',
                    },
                  ]}
                >
                  <Input
                  placeholder="Account Title"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={24}>
                <Button type='primary'> <SearchOutlined /> FIND MY BRANCH</Button>
              </Col>
              <Col span={8}>
                <FormItem
                  name="bankname"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter bank name',
                    },
                  ]}
                >
                  <Input 
                  placeholder="Bank Name"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name="city"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter city',
                    },
                  ]}
                >
                  <Input
                  placeholder="City"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name="branchname"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter branch name',
                    },
                  ]}
                >
                  <Input
                  placeholder="Branch Name"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name="ifsccode"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter the IFSC code',
                    },
                  ]}
                >
                  <Input
                  placeholder="IFSC Code"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name="accounttype"
                  rules={[
                    {
                      required: true,
                      message: 'Please select account type',
                    },
                  ]}
                >
                  <Select
                    defaultValue="Account Type"
                    style={{
                      width: '100%',
                      borderBottom: '1px solid #ccc ',
                    }}
                    bordered={false}
                    onChange={handleChange}
                    options={[
                      {
                        value: 'Account Type',
                        label: 'Account Type',
                      },
                      {
                        value: 'Current Account',
                        label: 'Current Account',
                      },
                      {
                        value: 'Fixed Deposit',
                        label: 'Fixed Deposit',
                      },
                    ]}
                  />
                </FormItem>
              </Col>
              <Col span={8}>
                <FormItem
                  name="accountnumber"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter account number',
                    },
                  ]}
                >
                  <Input
                  placeholder="Account Number"
                  bordered={false}
                  style={{borderBottom: '1px solid #ccc '}} />
                </FormItem>
              </Col>
              <Col span={24} style={{display:'flex', justifyContent:'flex-end'}}>
                <FormItem>
                  <Button type='text' style={{marginRight:'1rem'}} onClick={() => showEditBankInfo(false)}> <CloseOutlined />CANCLE</Button>
                  <Button type='primary' htmlType="submit"> <CheckOutlined />SAVE</Button>
                </FormItem>
              </Col>
            </Row>
          </Form>)}
        </Card>
      </Form>
    </div>

  )
}

export default Statutory