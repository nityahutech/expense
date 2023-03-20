import { useState, useEffect } from "react";
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Select,
  Modal,
  Divider,
  Tabs,
  Skeleton
} from "antd";
import {
  capitalize,
  checkAlphabets,
  checkNumbervalue,
  getCountryCode,
} from "../../contexts/CreateContext";

import {
  PlusCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  EditFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import "../../style/BankAccount.css";
import FormItem from "antd/es/form/FormItem";
import { showNotification } from "../../contexts/CreateContext";
const { Option } = Select;

const Family = (props) => {
  console.log("data", props.marriage);
  const [editfamilymember, showeditfamilymember] = useState(false);
  const [editEmergency, showeditEmergency] = useState(false);
  const [data, setData] = useState(false);
  const [form] = Form.useForm();
  const [codes, setCodes] = useState("");
  // const marriage = props.marriage;
  const [marriage, setMarraige] = useState(props.marriage);
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const [active, setActive] = useState("emergencyContact");
  const [activeList, setActiveList] = useState([]);
  const [editPerson, setEditPerson] = useState([false]);
  const [addPerson, setAddPerson] = useState(false);
  const [addForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const compId = sessionStorage.getItem("compId");

  // add other family members / children

  function onAdd(values) {
    const record = {
      name: values.name,
      relation: values.relation,
      phone: values?.phone || null,
      prefix: values?.prefix || null,
    };

    console.log("values", record)
    EmpInfoContext.addCompInfo(currentUser.uid, { [`${active}`]: record });
    addForm.resetFields();
    getData();
  }

  // edit other family members / children

  function onEdit(values) {
    try {
      const record = {
        name: values.name,
        relation: values.relation,
        phone: values?.phone || null,
        prefix: values?.prefix || null,
      };

      console.log("values", record)
      // let old = activeList[editPerson.indexOf(true)];
      EmpInfoContext.editCompInfo(
        currentUser.uid,
        { [`${active}`]: record }
      );

      editForm.resetFields();
      setEditPerson([...editPerson].fill(false));
      const timer = setTimeout(() => getData(), 400);
      return () => clearTimeout(timer);
    } catch (error) {
      // Handle the error here
      console.log("Error occurred while editing record:", error);
    }
  }

  // delete other family members / children

  const onDelete = (record) => {
    console.log("record", record)
    Modal.confirm({
      title: `Are you sure, you want to delete ${active}?`,
      okText: "Yes",
      okType: "danger",

      onOk: () => {
        EmpInfoContext.deleteCompInfo(currentUser.uid, {
          [`${active}`]: record,
        }).then((response) => {
          getData();

        });
      },
    });
  };


  useEffect(() => {
    getCountryCode().then((res) => {
      setCodes(res);
    });
    getData();

  }, []);

  useEffect(() => {

    setMarraige(props.marriage)
  }, [props.marriage]);

  useEffect(() => {
    let temp = data[`${active}`] || [];
    setActiveList(temp);
    setEditPerson(temp.length == 0 ? [false] : [...temp].fill(false));

  }, [active]);


  const getData = async () => {
    setLoading(true);
    let data = await EmpInfoContext.getEduDetails(currentUser.uid);
    console.log("data", data);
    setData(data);
    let temp =
      active == "emergencyContact"
        ? data.emergencyContact
        : active == "otherMember"
          ? data.otherMember
          : data.children;
    console.log("data", temp)
    setActiveList(temp);
    setEditPerson(temp.length == 0 ? [false] : [...temp].fill(false));
    // if (active === "emergencyContact" && temp.length >= 2) {
    //   setAddPerson(false);
    // } else {
    //   setAddPerson(true);
    // }
    setLoading(false);

  };

  // add other father mother spouce

  const onFinish = (values) => {
    console.log("data", values);
    values.profilePic = data.profilePic || null;
    EmpInfoContext.updateEduDetails(currentUser.uid, values);
    setData(values);
    showeditfamilymember(false);
    showeditEmergency(false);
    getData();
  };

  const prefixSelector = (
    <Form.Item name="prefixFather" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 70,
          background: "#ffffff",
        }}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}

      </Select>
    </Form.Item>
  );
  const prefixSelector2 = (
    <Form.Item name="prefixMother" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const prefixSelector4 = (
    <Form.Item name="prefixspouce" noStyle>
      <Select
        showSearch
        bordered={false}
        style={{
          width: 80,
          background: "#ffffff",
        }}
      >
        {codes?.countries?.map((e) => (
          <Option key={e?.code} value={e?.code}>
            {e?.code}{" "}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );

  const addButtonStyle = {
    background: '#1963A6',
    marginTop: '10px',
    color: '#fff',
    opacity: 1,
    cursor: 'pointer',
  };

  const disabledAddButtonStyle = {
    ...addButtonStyle,
    opacity: 0.5,
    cursor: 'not-allowed',
  };

  const prefixSelector5 = (i) => {
    return (
      <Form.Item
        initialValue={i ? activeList[i]?.prefix : null}
        name="prefix"
        noStyle
      >
        <Select
          showSearch
          bordered={false}
          style={{
            width: 80,
            padding: 0,
            background: "#ffffff",
          }}
        // onSelect={(value, event) => handleOnChange(value, event)}
        >
          {codes?.countries?.map((e) => (
            <Option key={e?.code} value={e?.code}>
              {e?.code}{" "}
            </Option>
          ))}
        </Select>
      </Form.Item>
    );
  };

  return (
    <>
      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
          width: "100%",
        }}
      >
        {editfamilymember === false ? (
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
              {loading ? (
                <Skeleton active />
              ) : (
                <Card
                  title="FAMILY MEMBERS"
                  className="personal"
                  hoverable={true}
                  bordered={true}
                  extra={
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
                      onClick={() => showeditfamilymember(!editfamilymember)}
                    >
                      <EditFilled />
                    </Button>
                  }
                  style={{
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <Row gutter={[48, 8]}>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Father
                        </h1>
                        <div>{data?.father ? data.father : "-"}</div>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <div>
                          {data?.fatherContact
                            ? `${data.prefixFather} ${data.fatherContact}`
                            : "-"}
                        </div>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Mother
                        </h1>

                        <div>{data?.mother ? data.mother : "-"}</div>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <div>
                          {data?.motherContact
                            ? `${data.prefixMother} ${data.motherContact}`
                            : "-"}
                        </div>{" "}
                      </div>
                    </Col>
                    {marriage && (
                      <>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Spouse
                            </h1>

                            <div>{data?.Spouse ? data.Spouse : "-"}</div>
                          </div>
                        </Col>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Contact no.
                            </h1>
                            <div>
                              {data?.SpouseContact
                                ? `${data.prefixspouce} ${data.SpouseContact}`
                                : "-"}
                            </div>{" "}
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                </Card>
              )}
            </Col>
          </Row>
        ) : (
          <Row
            style={{
              width: "75%",
              margin: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Col xs={22} sm={15} md={24}>
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
                  prefixFather: "+91",
                  prefixMother: "+91",
                  prefixOther: "+91",
                }}
                autoComplete="off"
                onFinish={onFinish}
              >
                <Card
                  title="FAMILY MEMBERS"
                  className="personal"
                  hoverable={true}
                  bordered={true}
                  style={{
                    width: "100%",
                    marginTop: 10,
                    borderRadius: "10px",
                    cursor: "default",
                  }}
                >
                  <Row gutter={[16, 16]}>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Father
                        </h1>
                        <Form.Item
                          name="father"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              minLength: 3,
                              maxLength: 25,
                              message: "Please enter Father Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Name",
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={data.father ? data.father : ""}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({ father: caps });
                            }}
                            maxLength={40}
                            placeholder="Enter Father's Name"
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <Form.Item
                          name="fatherContact"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please enter the Contact no.",
                              pattern: /^[0-9]\d{9}$/,
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={
                            data.fatherContact ? data.fatherContact : ""
                          }
                        >
                          <Input
                            addonBefore={prefixSelector}
                            maxLength={10}
                            placeholder="Enter Contact no."
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Mother
                        </h1>
                        <Form.Item
                          name="mother"
                          onKeyPress={(event) => {
                            if (checkAlphabets(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              minLength: 3,
                              maxLength: 25,
                              message: "Please enter Mother Name",
                            },
                            {
                              pattern: /^[a-zA-Z\s]*$/,
                              message: "Please enter Valid Name",
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={data.mother ? data.mother : ""}
                        >
                          <Input
                            onChange={(e) => {
                              const str = e.target.value;
                              const caps = str
                                .split(" ")
                                .map(capitalize)
                                .join(" ");
                              form.setFieldsValue({ mother: caps });
                            }}
                            maxLength={40}
                            placeholder="Enter Mother's Name"
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    <Col xs={22} sm={15} md={12}>
                      <div>
                        <h1
                          style={{
                            fontWeight: 600,
                            lineHeight: "18px",
                            color: "#07182b",
                            fontSize: "15px",
                            fontFamily: "Open Sans,sans-serif",
                          }}
                        >
                          Contact no.
                        </h1>
                        <Form.Item
                          name="motherContact"
                          onKeyPress={(event) => {
                            if (checkNumbervalue(event)) {
                              event.preventDefault();
                            }
                          }}
                          rules={[
                            {
                              required: false,
                              message: "Please enter the Contact no.",
                              pattern: /^[0-9]\d{9}$/,
                            },
                          ]}
                          labelCol={{ span: 8 }}
                          wrapperCol={{ span: 32 }}
                          initialValue={
                            data.motherContact ? data.motherContact : ""
                          }
                        >
                          <Input
                            addonBefore={prefixSelector2}
                            maxLength={10}
                            placeholder="Enter Contact no."
                            style={{
                              marginTop: "10px",
                              width: "100%",
                              borderBottom: "1px solid #ccc ",
                              paddingLeft: "0px",
                            }}
                            bordered={false}
                          />
                        </Form.Item>
                      </div>
                    </Col>
                    {marriage && (
                      <>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Spouse Name
                            </h1>
                            <Form.Item
                              name="Spouse"
                              onKeyPress={(event) => {
                                if (checkAlphabets(event)) {
                                  event.preventDefault();
                                }
                              }}
                              rules={[
                                {
                                  required: false,
                                  minLength: 3,
                                  maxLength: 25,
                                  message: "Please enter Spouse Name",
                                },
                                {
                                  pattern: /^[a-zA-Z\s]*$/,
                                  message: "Please enter Valid Name",
                                },
                              ]}
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 32 }}
                              initialValue={data.Spouse ? data.Spouse : ""}
                            >
                              <Input
                                onChange={(e) => {
                                  const str = e.target.value;
                                  const caps = str
                                    .split(" ")
                                    .map(capitalize)
                                    .join(" ");
                                  form.setFieldsValue({ Spouse: caps });
                                }}
                                maxLength={40}
                                placeholder="Enter Spouse's Name"
                                style={{
                                  marginTop: "10px",
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                        <Col xs={22} sm={15} md={12}>
                          <div>
                            <h1
                              style={{
                                fontWeight: 600,
                                lineHeight: "18px",
                                color: "#07182b",
                                fontSize: "15px",
                                fontFamily: "Open Sans,sans-serif",
                              }}
                            >
                              Contact no.
                            </h1>
                            <Form.Item
                              name="SpouseContact"
                              onKeyPress={(event) => {
                                if (checkNumbervalue(event)) {
                                  event.preventDefault();
                                }
                              }}
                              rules={[
                                {
                                  required: false,
                                  message: "Please enter the Contact no.",
                                  pattern: /^[0-9]\d{9}$/,
                                },
                              ]}
                              labelCol={{ span: 8 }}
                              wrapperCol={{ span: 32 }}
                              initialValue={
                                data.SpouseContact ? data.SpouseContact : ""
                              }
                            >
                              <Input
                                addonBefore={prefixSelector4}
                                maxLength={10}
                                placeholder="Enter Contact no."
                                style={{
                                  marginTop: "10px",
                                  width: "100%",
                                  borderBottom: "1px solid #ccc ",
                                  paddingLeft: "0px",
                                }}
                                bordered={false}
                              />
                            </Form.Item>
                          </div>
                        </Col>
                      </>
                    )}
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginTop: "3%",
                    }}
                  >
                    <Button
                      onClick={() => showeditfamilymember(false)}
                      type="text"
                      style={{
                        fontSize: 15,
                      }}
                    >
                      <CloseOutlined />
                      CANCEL
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
                </Card>
              </Form>
            </Col>

          </Row>
        )}
      </div>

      <div
        className="personalCardDiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "15px",
          width: "100%",
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
            {loading ? (
              <Skeleton active />
            ) : (
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
                <Tabs
                  defaultActiveKey="1"
                  className="tabs"
                  onChange={(key) =>
                    setActive(
                      key == "2"
                        ? "otherMember"
                        : key == "3"
                          ? "children"
                          : "emergencyContact"
                    )
                  }
                >
                  <Tabs.TabPane tab="Emergency Contacts" key="1" />
                  <Tabs.TabPane tab="Other Family Member" key="2" />
                  {marriage === "Married" && (
                    <Tabs.TabPane tab="Children" key="3" />
                  )}
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
                      <Row gutter={[16, 16]} style={{ marginTop: '10px', marginBottom: '10px' }}>
                        {/* for edit field */}
                        <Col xs={24} sm={15} md={7} lg={6} xl={6} xxl={6}>
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
                        <Col xs={24} sm={15} md={6} lg={6} xl={6} xxl={6}>
                          <div className="div-discription">Relation</div>
                          {editPerson[i] === false ? (
                            <div>{rec?.relation ? rec.relation : "-"}</div>
                          ) : (
                            <FormItem
                              name="relation"
                              initialValue={rec.relation}
                              rules={[
                                {
                                  required: true,
                                  message: "Please Enter Relation",
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
                        <Col xs={24} sm={15} md={8} lg={6} xl={6} xxl={6}>
                          <div className="div-Phone">Contact no.</div>
                          {editPerson[i] === false ? (
                            <div style={{ marginLeft: "4rem" }}>
                              {rec?.phone
                                ? `${rec.prefix ? rec.prefix : ""} ${rec.phone}`
                                : "-"}
                            </div>
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
                                addonBefore={prefixSelector5(i)}
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

                        {editPerson[i] == false ? (
                          <Col
                            xs={24}
                            sm={15}
                            md={6}
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
                                }, 200);
                                return () => clearTimeout(timer);
                              }}
                            >
                              <EditFilled />
                            </Button>
                          </Col>
                        ) : (
                          <Col
                            xs={24}
                            sm={15}
                            md={6}
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
                      <Divider style={{ margin: '0px' }} />
                    </div>
                  ))}
                  {editPerson.includes(true) ? (
                    <>
                      <div style={{ marginTop: '10px' }}>
                        <Button
                          onClick={() => setEditPerson([...editPerson].fill(false))}
                          type="text"
                        >
                          CANCEL
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => editForm.submit()}
                          style={{ background: "#1963A6" }}
                        >
                          <PlusCircleOutlined />
                          Save
                        </Button>
                      </div>
                    </>
                  ) : addPerson === false ? (
                    <Button
                      type="primary"
                      onClick={() => setAddPerson(true)}
                      style={active === 'emergencyContact' && activeList.length >= 2 ||
                        active === 'otherMember' && activeList.length >= 5 ||
                        active === 'children' && activeList.length >= 2 ?
                        disabledAddButtonStyle :
                        addButtonStyle}
                      disabled={active === 'emergencyContact' && activeList.length >= 2 ||
                        active === 'otherMember' && activeList.length >= 5 ||
                        active === 'children' && activeList.length >= 2}
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
                          <Col xs={24} sm={15} md={8} lg={8} xl={8} xxl={8}>
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
                          <Col xs={24} sm={15} md={8} lg={8} xl={8} xxl={8}>
                            <FormItem
                              name="relation"
                              label="Relation"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter valid Relation",
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

                          <Col xs={24} sm={15} md={8} lg={8} xl={8} xxl={8}>
                            <FormItem
                              addonBefore={prefixSelector5()}
                              name="phone"
                              label="Contact no."
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
                                addonBefore={prefixSelector5()}
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
                                onClick={() => {
                                  addForm.submit();
                                  setAddPerson(false);
                                }}
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
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Family;

