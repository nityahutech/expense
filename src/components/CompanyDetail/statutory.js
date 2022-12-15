import { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Form,
  Modal,
  Tabs,
  Divider,
  notification
} from "antd";
import {
  CloseOutlined,
  EditFilled,
  CheckOutlined,
  PlusCircleOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import "./companystyle.css";
import FormItem from "antd/es/form/FormItem";
import CompanyProContext from "../../contexts/CompanyProContext";
import "../../components/CompanyDetail/companystyle.css";
import moment from "moment";
import { checkAlphabets,getCountryCode } from "../../contexts/CreateContext";

const Statutory = () => {
  const compId = sessionStorage.getItem("compId")
  const [addPerson, setAddPerson] = useState(false);
  const [addBank, setAddBank] = useState(false);
  const [active, setActive] = useState("director");
  const [activeList, setActiveList] = useState([]);
  const [editPerson, setEditPerson] = useState([false]);
  const [editContent, showEditContent] = useState(false);
  const [editBank, setEditBank] = useState([false]);
  const [bankList, setBankList] = useState([]);
  const [addBankForm] = Form.useForm();
  const [editBankForm] = Form.useForm();
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [data, setData] = useState([]);
  const { Option } = Select
  const [codes, setCodes] = useState("");

  const showNotification = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
    });
  };

  const onFinish = (value) => {

    const valuesToservice = {
      entityType: value.entityType,
      cinNumber: value.cinNumber,
      dateOfIncorp: value.dateOfIncorp.format("Do MMM, YYYY"),
      compPan: value.compPan,
      compTan: value.compTan,
      gst: value.gst,
    };
  
    CompanyProContext.updateCompInfo(compId, valuesToservice);
    getData();
    showEditContent(false);
  };

  useEffect(() => {
    let temp = data[`${active}`] || [];
    setActiveList(temp);
    console.log('ddddddddd', temp)
    setEditPerson(temp.length == 0 ? [false] : [...temp].fill(false));
  }, [active])

  useEffect(() => {
    getCountryCode().then((res)=>{
      setCodes(res);
      })
    getData();
  }, []);

  const getData = async () => {
    let data = await CompanyProContext.getCompanyProfile(compId);
    setData(data);
    let temp = active == "director" ? data.director : active == "auditor" ? data.auditor : data.secretary;
    setActiveList(temp)
    setEditPerson(temp.length == 0 ? [false] : [...temp].fill(false))
    setBankList(data.bank);
    setEditBank([...data.bank].fill(false))
  };

  function onAdd(values) {
    console.log('dddddd', values)

    let matchingstatury = activeList.filter((item) => item.name === values.name || item.mailid === values.mailid)
    console.log('dddddddd', matchingstatury)
    if (matchingstatury.length > 0) {
      showNotification("error", "error", "Try Again Name or Email Allready present");
      return
    }

    const record = {
      name: values.name,
      mailid: values.mailid,
      phone: values.phone,
      prefix: values.prefix,
    };
    if (active == "director") { record.din = values.din }
    if (active == "auditor") { record.type = values.type }
    CompanyProContext.addCompInfo(compId, { [`${active}`]: record });
    addForm.resetFields();
    getData();
  }

  function onEdit(values) {
    const record = {
      name: values.name,
      mailid: values.mailid,
      phone: values.phone,
      prefix: values.prefix,
    };
    if (active == "director") { record.din = values.din }
    if (active == "auditor") { record.type = values.type }
    let old = activeList[editPerson.indexOf(true)]
    console.log(active, editPerson.indexOf(true), { [`${active}`]: old }, { [`${active}`]: record })
    CompanyProContext.editCompInfo(compId, { [`${active}`]: old }, { [`${active}`]: record });
    editForm.resetFields();
    setEditPerson([...editPerson].fill(false))
    const timer = setTimeout(() => getData(), 200)
    return () => clearTimeout(timer)
  }

  const onDelete = (record) => {
    Modal.confirm({
      title: `Are you sure, you want to delete ${active}?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { [`${active}`]: record })
          .then((response) => {
            getData();
          })
      },
    });
  };

  function onAddBank(values) {
    let record = {
      title: values.title,
      ifsc: values.ifsc,
      accountType: values.accountType,
      bankName: values.bankName,
      city: values.city,
      branch: values.branch,
      accountNo: values.accountNo,
    };
    console.log(values)
    CompanyProContext.addCompInfo(compId, { bank: record });
    addBankForm.resetFields();
    getData();
    setEditBank(editBank.fill(false));
  }

  function onEditBank(values) {
    let record = {
      title: values.title,
      ifsc: values.ifsc,
      accountType: values.accountType,
      bankName: values.bankName,
      city: values.city,
      branch: values.branch,
      accountNo: values.accountNo,
    };
    let old = bankList[editBank.indexOf(true)]
    CompanyProContext.editCompInfo(compId, { bank: old }, { bank: record });
    editBankForm.resetFields();
    setEditBank(editBank.fill(false));
    const timer = setTimeout(() => getData(), 200)
    return () => clearTimeout(timer)
  }

  const onDeleteBank = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete Bank Account?",
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        CompanyProContext.deleteCompInfo(compId, { bank: record })
          .then((response) => {
            getData();
          })
          .catch((error) => { });
      },
    });
  };

  const handleOnChange=(value,event)=>{
    console.log(value,event);
  }

  const prefixSelector = (
    <Form.Item  name="prefix" noStyle>
      <Select
      showSearch
        bordered={false}
        style={{
          width: 80,
          padding: 0,
          background: "#ffffff",
        }}

        onSelect={(value, event) => handleOnChange(value, event)}


      >
      { codes?.countries?.map((e) => <Option key={e?.code} value={e?.code} >{e?.code} </Option>
    ) }
        
      </Select>
    </Form.Item>
  );

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
                title=" COMPANY ID"
                bordered={true}
                hoverable={true}
                style={{
                  width: "100%",
                  marginTop: 10,
                  borderRadius: "10px",
                  cursor: "default",
                }}
                className="companyCard"
                // className="card1"
                extra={
                  <>
                    {editContent === false ? (
                      <Button
                        className="personal"
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
                        onClick={() => showEditContent(!editContent)}
                      >
                        <EditFilled />
                      </Button>
                    ) : null}
                  </>
                }
              >
                <Row gutter={[16, 16]}>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Entity Type</div>
                      {editContent === false ? (
                        <div>{data?.entityType ? data.entityType : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.entityType : null}
                          name="entityType"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Company Name",
                              type: "name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Company Name",
                            },
                          ]}
                        >
                          <Input
                            type="CompamyName"
                            required
                            placeholder="Enter Comapany Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">CIN</div>
                      {editContent === false ? (
                        <div>{data?.cinNumber ? data.cinNumber : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.cinNumber : null}
                          name="cinNumber"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Brand Name",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Brand Name",
                            },
                          ]}
                        >
                          <Input
                            type="cinNumber"
                            maxLength={21}
                            required
                            placeholder="Enter CIN Number"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">
                        Date of Incorporation
                      </div>
                      {editContent === false ? (
                        <div>
                          {data?.dateOfIncorp ? data.dateOfIncorp : "-"}
                        </div>
                      ) : (
                        <Form.Item
                          initialValue={
                            data
                              ? moment(data.dateOfIncorp, "Do MMM, YYYY")
                              : null
                          }
                          name="dateOfIncorp"
                          rules={[
                            {
                              required: false,
                              message: "Please select date",
                            },
                          ]}
                        >
                          {/* <Input
                            type="D.O.I"
                            required
                            placeholder="Enter D.O.I"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          /> */}

                          <DatePicker
                            format="Do MMM, YYYY"
                            required
                            placeholder="Enter D.O.I"
                            bordered={true}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />

                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Company PAN</div>
                      {editContent === false ? (
                        <div>{data?.compPan ? data.compPan : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.compPan : null}
                          name="compPan"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Company PAN",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Company PAN",
                            },
                          ]}
                        >
                          <Input
                            maxlength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">Company TAN</div>
                      {editContent === false ? (
                        <div>{data?.compTan ? data.compTan : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.compTan : null}
                          name="compTan"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Domain Name",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Domain Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
                        </Form.Item>
                      )}
                    </div>
                  </Col>
                  <Col xs={22} sm={15} md={8}>
                    <div>
                      <div className="div-discription">GST</div>
                      {editContent === false ? (
                        <div>{data?.gst ? data.gst : "-"}</div>
                      ) : (
                        <Form.Item
                          initialValue={data ? data.gst : null}
                          name="gst"
                          rules={[
                            {
                              required: true,
                              message: "Please enter Domain Name",
                              type: "domain",
                            },
                            {
                              pattern: /^[0-9A-Z\s]*$/,
                              message: "Please enter Valid Domain Name",
                            },
                          ]}
                        >
                          <Input
                            maxLength={10}
                            type="DomainName"
                            required
                            placeholder="Enter Domain Name"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                          {/* defaultValue = {data?data.fname+" "+data.lname:null} */}
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
                      type="text"
                      style={{ fontSize: 15 }}
                      onClick={() => showEditContent(false)}
                    >
                      <CloseOutlined /> CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          marginLeft: "10px",
                          background: "#1963A6",
                          width: "90px",
                        }}
                      >
                        <CheckOutlined />
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
        <Row
          style={{
            width: "75%",
            margin: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Col span={24}>
            <Card
              className="tagsCard"
              bordered={true}
              hoverable={true}
              style={{
                marginTop: 10,
                width: "100%",
                borderRadius: "10px",
                cursor: "default",
              }}
            >
              <Tabs defaultActiveKey="1" className="tabs" onChange={(key) => setActive(key == "2" ? "auditor" : key == "3" ? "secretary" : "director")}>
                <Tabs.TabPane tab="Directors" key="1" />
                <Tabs.TabPane tab="Auditors" key="2" />
                <Tabs.TabPane tab="Company Secretary" key="3" />
              </Tabs>
              <Form
                    wrappercol={{
                      span: 14,
                    }}
                    labelcol={{
                      span: 4,
                    }}
                    layout="vertical"
                    onFinish={onEdit}
                    form={editForm}
                  >
              {activeList.map((rec, i) => (
                <div>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={15} md={6} lg={6} xl={6} xxl={6}>
                          <div className="div-discription">Name</div>
                          {editPerson[i] === false ? (
                            <div>{rec?.name ? rec.name : "-"}</div>
                          ) : (
                            <FormItem
                              name="name"
                              initialValue={rec.name}
                              rules={[
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  required: true,
                                  message: "Please Enter Name",
                                },
                              ]}
                            >
                              <Input
                                bordered={false}
                                maxLength={25}
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                              />
                            </FormItem>
                          )}
                        </Col>
                        <Col xs={24} sm={15} md={7} lg={7} xl={7} xxl={7}>
                          <div className="div-discription">Email ID</div>
                          {editPerson[i] === false ? (
                            <div>{rec?.mailid ? rec.mailid : "-"}</div>
                          ) : (
                            <FormItem
                              name="mailid"
                              initialValue={rec.mailid}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Email ID",
                                },
                              ]}
                            >
                              <Input
                                bordered={false}
                                maxLength={25}
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                              />
                            </FormItem>
                          )}
                        </Col>
                        {active != "secretary" ?(
                          <Col xs={24} sm={15} md={3} lg={2} xl={2} xxl={3}>
                            <div className="div-discription">{active == "director" ? "DIN" : "Type"}</div>
                            {editPerson[i] === false ? (
                              <div>
                                {active == "director" ? rec?.din ? rec.din : "-" : rec?.type ? rec.type : "-" }
                              </div>
                            ) : (
                              <FormItem
                                name={active == "director" ? "din" : "type"}
                                initialValue={active == "director" ? rec.din : rec.type}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please Enter",
                                  },
                                ]}
                              >
                                {active == "director" ? (
                                  <Input
                                  bordered={false}
                                  maxLength={25}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                />
                                ) : (
                                  <Select
                                          value={rec.type}
                                          style={{
                                            width: "100%",
                                            borderBottom: "1px solid #ccc ",
                                            paddingLeft: "0px",
                                            marginTop: "5px",
                                          }}
                                          bordered={false}
                                          options={[
                                            {
                                              value: "Internal",
                                              label: "Internal",
                                            },
                                            {
                                              value: "Statutory",
                                              label: "Statutory",
                                            },
                                          ]}
                                        />
                                )}
                              </FormItem>
                            )}
                          </Col>
                        ) : null}
                          <Col xs={24} sm={15} md={7} lg={8} xl={8} xxl={7}>
                            <div className="div-discription">Phone Number</div>
                            {editPerson[i] === false ? (
                              <div>{rec?.phone ? `${rec.prefix ? rec.prefix : ""} ${rec.phone}` : "-"}</div>
                            ) : (
                              <FormItem
                                name="phone"
                                initialValue={rec.phone}
                                rules={[
                                  {
                                    pattern: /^[0-9\s]*$/,
                                    required: true,
                                    message: "Please Enter Phone No",
                                  },
                                ]}
                              >
                                <Input
                                addonBefore={prefixSelector}
                                  maxLength={11}
                                  bordered={false}
                                  style={{
                                    width: "100%",
                                    borderBottom: "1px solid #ccc ",
                                    paddingLeft: "0px",
                                    marginTop: "10px",
                                  }}
                                />
                              </FormItem>
                            )}
                          </Col>
                        {editPerson[i] == false ?(
                          <Col xs={24} sm={15} md={1} 
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                style={{
                                  width: "10px",
                                  border: "none",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}   
                                onClick={() => {
                                  let array = [...editPerson].fill(false);
                                  setEditPerson([...array]);
                                  const timer = setTimeout(() => {
                                    editForm.resetFields();
                                    array[i] = true;
                                    setEditPerson(array);
                                  }, 200)
                                  return () => clearTimeout(timer);
                                }}
                              >
                                <EditFilled />
                              </Button>
                          </Col>
                        ) :(
                          <Col xs={24} sm={15} md={1}
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Button
                                style={{
                                  width: "10px",
                                  border: "none",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                                onClick={() => {
                                  onDelete(rec);
                                }}
                              >
                                <DeleteOutlined />
                              </Button>
                          </Col>
                        )}
                      </Row>
                      <Divider />
                      </div>
              ))}
              { editPerson.includes(true) ? (<>
                      <Button
                      onClick={()=>setEditPerson([...editPerson].fill(false))}
                          type="text"
                      >CANCEL</Button>
                      <Button
                        type="primary"
                        onClick={() => editForm.submit()}
                        style={{ background: "#1963A6" }}
                      >
                        <PlusCircleOutlined />
                        Save
                      </Button>
                      </>
              ) : addPerson === false ? (
                      <Button
                        type="primary"
                        onClick={() => setAddPerson(true)}
                        style={{ background: "#1963A6" }}
                      >
                        <PlusCircleOutlined />
                        Add
                      </Button>
                    ) : (
                      <div style={{ marginTop: "50px" }}>
                        <Form
                          wrappercol={{
                            span: 14,
                          }}
                          labelcol={{
                            span: 4,
                          }}
                          layout="vertical"
                          onFinish={onAdd}
                          form={addForm}
                        >
                        <Row gutter={[20, 8]}>
                          <Col xs={22} sm={15} md={6}>
                            <FormItem
                              label="Name"
                              name="name"
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
                                placeholder="Name"
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                              />
                            </FormItem>
                          </Col>
                          <Col xs={22} sm={15} md={8}>
                            <FormItem
                              name="mailid"
                              label="Email ID"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter valid email ID",
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
                              />
                            </FormItem>
                          </Col>
                          {active != "secretary" ? (
                          <Col xs={22} sm={15} md={4}>
                            <FormItem
                              name={active == "director" ? "din" : "type"}
                              label={active == "director" ? "DIN" : "Type"}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter",
                                },
                                // {
                                //   pattern: /^[0-9\s]+$/,
                                //   message: "Please enter Valid Number",
                                // },
                              ]}
                            >
                              {active == "director" ? (
                                <Input
                                bordered={false}
                                maxLength={25}
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                              />
                              ) : (
                                <Select
                                        style={{
                                          width: "100%",
                                          borderBottom: "1px solid #ccc ",
                                          paddingLeft: "0px",
                                          marginTop: "5px",
                                        }}
                                        bordered={false}
                                        options={[
                                          {
                                            value: "Internal",
                                            label: "Internal",
                                          },
                                          {
                                            value: "Statutory",
                                            label: "Statutory",
                                          },
                                        ]}
                                      />
                              )}
                            </FormItem>
                          </Col>
                          ) : null}
                          <Col xs={22} sm={15} md={6}>
                            <FormItem
                              name="phone"
                              label="Phone Number"
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Phone No",
                                },
                                {
                                  pattern: /^[0-9]\d{9}$/,
                                  message: "Please Enter Valid Number",
                                },
                              ]}
                            >
                              <Input
                                maxLength={10}
                                style={{
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                  marginTop: "10px",
                                }}
                                bordered={false}
                              />
                            </FormItem>
                          </Col>
                          <Col
                            span={24}
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            <FormItem>
                              <Button
                                type="text"
                                style={{ marginRight: "1rem" }}
                                onClick={() => setAddPerson(false)}
                              >
                                {" "}
                                <CloseOutlined />
                                CANCEL
                              </Button>
                              <Button
                                type="primary"
                                onClick={() => { addForm.submit();setAddPerson(false) }}
                                style={{
                                  // marginLeft: "10px",
                                  background: "#1963A6",
                                  width: "90px",
                                }}
                              >
                                <CheckOutlined />
                                SAVE
                              </Button>
                            </FormItem>
                          </Col>
                        </Row>
                        </Form>
                      </div>
                    )}
              </Form>
            </Card>
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
            <Card
              title=" BANK ACCOUNT INFO"
              bordered={true}
              hoverable={true}
              style={{
                width: "100%",
                marginTop: 10,
                borderRadius: "10px",
                cursor: "default",
              }}
              className="companyCard"
            >
              <Form
                labelcol={{
                  span: 24,
                }}
                wrappercol={{
                  span: 24,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={onEditBank}
                form={editBankForm}
                layout="vertical"
              >
                {bankList.map((u, i) => (
                  <div>
                    <Row gutter={[16, 16]}>
                      <Col xs={22} sm={15} md={22}>
                        {editBank[i] === false ? (
                          <div
                            style={{
                              fontSize: "25px",
                              fontWeight: "lighter",
                            }}
                          >
                            {u.title ? u.title : "-"}
                          </div>
                        ) : (
                          <FormItem
                            initialValue={u.title}
                            name="title"
                            rules={[
                              {
                                pattern: /^[a-zA-Z-0-9\s]*$/,
                                required: true,
                                message: "Please Enter Account Title",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Account Title"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={1}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "end",
                        }}
                      >{editBank[i] == false ? (
                        <Button
                          style={{
                            width: "10px",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                          }}
                          onClick={() => {
                            let array = [...editBank].fill(false);
                            setEditBank([...array]);
                            const timer = setTimeout(() => {
                              editBankForm.resetFields();
                              array[i] = true;
                              setEditBank(array);
                            }, 200)
                            return () => clearTimeout(timer);
                          }}
                        >
                          <EditFilled />
                        </Button>) : (<Button
                          style={{
                            width: "10px",
                            border: "none",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "end",
                          }}
                          onClick={() => {
                            onDeleteBank(u);
                          }}
                        >
                          <DeleteOutlined />
                        </Button>)}

                      </Col>
                      <Divider style={{ margin: "0px" }} />
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Bank Name</div>
                        {editBank[i] === false ? (
                          <div>{u?.bankName ? u.bankName : "-"}</div>
                        ) : (
                          <FormItem
                            name="bankName"
                            initialValue={u.bankName}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter Bank Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Bank Name"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">City</div>
                        {editBank[i] === false ? (
                          <div>{u?.city ? u.city : "-"}</div>
                        ) : (
                          <FormItem
                            name="city"
                            initialValue={u.city}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter City",
                              },
                            ]}
                          >
                            <Input
                              placeholder="City"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Branch Name</div>
                        {editBank[i] === false ? (
                          <div>
                            {u?.branch ? u.branch : "-"}
                          </div>
                        ) : (
                          <FormItem
                            name="branch"
                            initialValue={u.branch}
                            rules={[
                              {
                                pattern: /^[a-zA-Z\s]*$/,
                                required: true,
                                message: "Please Enter Branch Name",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Branch Name"
                              bordered={false}
                              maxLength={25}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">IFSC Code</div>
                        {editBank[i] === false ? (
                          <div>{u?.ifsc ? u.ifsc : "-"}</div>
                        ) : (
                          <FormItem
                            name="ifsc"
                            initialValue={u.ifsc}
                            rules={[
                              {
                                pattern: /^[A-Z0-9\s]*$/,
                                required: true,
                                message: "Please Enter IFSC Code",
                              },
                            ]}
                          >
                            <Input
                              maxLength={11}
                              placeholder="IFSC Code"
                              bordered={false}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Account Type</div>
                        {editBank[i] === false ? (
                          <div>
                            {u?.accountType ? u.accountType : "-"}
                          </div>
                        ) : (
                          <FormItem
                            name="accountType"
                            initialValue={u.accountType}
                            rules={[
                              {
                                required: true,
                                message: "Please Select Account Type",
                              },
                            ]}
                          >
                            <Select
                              defaultValue="Current Type"
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                              bordered={false}
                              options={[
                                {
                                  value: "Current Account",
                                  label: "Current Account",
                                },
                                {
                                  value: "Fixed Deposit",
                                  label: "Fixed Deposit",
                                },
                                {
                                  value: "Salary Account",
                                  label: "Salary Account",
                                },
                              ]}
                            />
                          </FormItem>
                        )}
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <div className="div-discription">Account Number</div>
                        {editBank[i] === false ? (
                          <div>
                            {u?.accountNo ? u.accountNo : "-"}
                          </div>
                        ) : (
                          <FormItem
                            name="accountNo"
                            initialValue={u.accountNo}
                            rules={[
                              {
                                pattern: /^[0-9\b]+$/,
                                required: true,
                                message: "Please Enter Account Number",
                              },
                            ]}
                          >
                            <Input
                              maxLength={14}
                              placeholder="Account Number"
                              bordered={false}
                              style={{
                                width: "100%",
                                borderBottom: "1px solid #ccc ",
                                paddingLeft: "0px",
                                marginTop: "10px",
                              }}
                            />
                          </FormItem>
                        )}
                      </Col>
                    </Row>
                    <Divider />
                  </div>
                ))}
                {editBank.includes(true) ? (
                  <>
                    <Button
                      type="text"
                      onClick={() => onEditBank.submit()}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => editBankForm.submit()}
                      style={{ background: "#1963A6" }}
                    >
                      <PlusCircleOutlined />
                      Save
                    </Button>
                  </>
                ) : addBank === false ? (
                  <Button
                    type="primary"
                    onClick={() => setAddBank(true)}
                    style={{ background: "#1963A6" }}
                  >
                    <PlusCircleOutlined />
                    Add
                  </Button>
                ) : (
                  <Row gutter={[16, 48]}>
                    <Form
                      labelcol={{
                        span: 24,
                      }}
                      wrappercol={{
                        span: 24,
                      }}
                      initialValues={{
                        remember: true,
                      }}
                      autoComplete="off"
                      onFinish={onAddBank}
                      form={addBankForm}
                      layout="vertical"
                    >
                      <Col xs={22} sm={15} md={24}>
                        <FormItem
                          label="Account Title"
                          name="title"
                          rules={[
                            {
                              pattern: /^[a-zA-Z-0-9\s]*$/,
                              required: true,
                              message: "Please Enter Account Title",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Account Title"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="Bank Name"
                          name="bankName"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter Bank Name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Bank Name"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="City"
                          name="city"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter City",
                            },
                          ]}
                        >
                          <Input
                            placeholder="City"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="Branch Name"
                          name="branch"
                          rules={[
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              required: true,
                              message: "Please Enter Branch Name",
                            },
                          ]}
                        >
                          <Input
                            placeholder="Branch Name"
                            bordered={false}
                            maxLength={25}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="IFSC Code"
                          name="ifsc"
                          rules={[
                            {
                              pattern: /^[A-Z0-9\s]*$/,
                              required: true,
                              message: "Please Enter IFSC Code",
                            },
                          ]}
                        >
                          <Input
                            maxLength={11}
                            placeholder="IFSC Code"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="Account Type"
                          initialValue="Current Account"
                          name="accountType"
                          rules={[
                            {
                              required: true,
                              message: "Please Select Account Type",
                            },
                          ]}
                        >
                          <Select
                            defaultValue="Current Account"
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                            bordered={false}
                            options={[
                              {
                                value: "Current Account",
                                label: "Current Account",
                              },
                              {
                                value: "Fixed Deposit",
                                label: "Fixed Deposit",
                              },
                              {
                                value: "Salary Account",
                                label: "Salary Account",
                              },
                            ]}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={8}>
                        <FormItem
                          label="Account Number"
                          name="accountNo"
                          rules={[
                            {
                              pattern: /^[0-9\b]+$/,
                              required: true,
                              message: "Please Enter Account Number",
                            },
                          ]}
                        >
                          <Input
                            maxLength={14}
                            placeholder="Account Number"
                            bordered={false}
                            style={{
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                              marginTop: "10px",
                            }}
                          />
                        </FormItem>
                      </Col>
                      <Col xs={22} sm={15} md={24}
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <FormItem>
                          <Button
                            type="text"
                            style={{ marginRight: "1rem" }}
                            onClick={() => setAddBank(false)}
                          >
                            {" "}
                            <CloseOutlined />
                            CANCEL
                          </Button>
                          <Button
                            type="primary"
                            onClick={() => { console.log("add"); addBankForm.submit(); setAddBank(false) }}
                            style={{ background: "#1963A6", width: "90px" }}
                          >
                            <CheckOutlined />
                            SAVE
                          </Button>
                        </FormItem>
                      </Col>
                    </Form>
                  </Row>
                )}
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Statutory;