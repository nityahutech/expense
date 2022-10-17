import React, { useState, useEffect } from "react";
import {  useAuth } from "../../contexts/AuthContext"
import EmpInfoContext from "../../contexts/EmpInfoContext";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  DatePicker,
  Select,
  Form,
  Divider,
} from "antd";
import {
  PlusCircleOutlined,
  EditOutlined,
  CheckOutlined,
  EditTwoTone,
  CloseOutlined,
  EditFilled
} 
from "@ant-design/icons";

// --------------------------------------------------------------------------------

const { TextArea } = Input;
const { Option } = Select;
const Family = () => {
  const [editfamilymember, showeditfamilymember] = useState(false);
  const [editEmergency, showeditEmergency] = useState(false);
  const [data, setData] = useState(false);
  const [form] = Form.useForm();
  const { currentUser } = useAuth();
  useEffect(()=>{
    getData();
    
  },[]);
  const onFinish = (values) => {
    console.log(values)
    // console.log('Success:',record);
    EmpInfoContext.updateEduDetails(currentUser.uid,values)
    setData(values)
    showeditfamilymember(false)
    showeditEmergency(false)
    getData();
  };

  // const onContactsFinish = (newvalue) => {
  //   // console.log(contactdata)
  //   console.log(newvalue);
  //   console.log('success',newvalue)
  //   EmpInfoContext.updateEduDetails(currentUser.uid,newvalue)     
  //    setData(newvalue)
  //    showeditEmergency(false)
  // }

  // const onEmergencyFinish = (newvalue) => {
  //     // console.log(contactdata)
  //     console.log(newvalue);
  //     console.log('success',newvalue)
  //     EmpInfoContext.updateEduDetails(currentUser.uid,newvalue)     
  //     setData(newvalue)
  //     showeditEmergency(false)
  //   }
 
  const getData=async()=>{
    let data = await EmpInfoContext.getEduDetails(currentUser.uid)
    console.log(data)
    setData(data)
  }
  console.log(data)
  
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

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
// ---------------------------------------------------------------------------------------------------------

  return (
    <div
      className="personalCardDiv"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        margin: "15px",
      }}
    >
  {/* -------------------------------------------form-1------------------------------------------ */}
      {editfamilymember === false 
                ?<Card
                  title="FAMILY MEMBERS"
                  extra={
                    <>
                      {editfamilymember === false ? (
                        <Button
                          type="text"
                          style={{ color: "#4ec0f1" }}
                          onClick={() => showeditfamilymember(!editfamilymember)}
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
                  <Row >
                    {/* ------------------------------------father */}
                    <Col span={12}>
                      <Form.Item
                x                name="father"
                        rules={[
                          { required: false, message: "Please enter Father's name" },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Father
                          </h1>
                        <div>{data.father?data.father:"-"}</div>
                          </div>
                      </Form.Item>
                      {/* --------------------------------------father-contact------------------------------------ */}
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="fatherContact"
                        rules={[
                          {
                            required: false,
                            message: "Please enter the Contact no.",
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Contact no.
                          </h1>
                        <div>{data.fatherContact?data.fatherContact:"-"}</div>
                        </div>
                      </Form.Item>
                      </Col>
                      {/* -------------------------------------mother------------------------------------------ */}
                    <Col span={12}>
                      <Form.Item
                        name="mother"
                        rules={[
                          { required: false, message: "Please enter Mother's Name" },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Mother
                          </h1>
                          
                            <div>{data.mother?data.mother:"-"}</div>
                            </div>
                      </Form.Item>
                    </Col>
                    {/* ---------------------------------------------mother Contact------------------------------ */}
                    <Col span={12}>
                    <Form.Item
                        name="motherContact"
                        rules={[
                          {
                            required: false,
                            message: "Please enter the Contact no.",
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Contact no.
                          </h1>
                          
                            <div>{data.motherContact?data.motherContact:"-"}</div> </div>
                      </Form.Item>
                    </Col>
                    </Row>
                </Card>

                : <Form
                form={form}
                labelcol={{
                  span: 8,
                }}
                wrappercol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                autoComplete="off"
                onFinish={onFinish}
                >
                <Card
                  title="FAMILY MEMBERS"
                  extra={
                    <>
                      {editfamilymember === false ? (
                        <Button
                          type="text"
                          style={{ color: "#4ec0f1" }}
                          onClick={() => showeditfamilymember(!editfamilymember)}
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
                    {/* ------------------------------------father */}
                    <Col span={12}>
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Father 
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.father:null}</h4>
                          ) : (
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
                            minLength: 3, maxLength: 25,
                            message: 'Please enter Father Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue = {data.father? data.father : ''}
                      >
                            <Input 
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                              const caps = str.split(' ').map(capitalize).join(' ');
                              console.log('caps',caps)
                              // setPaidBy(newVal);
                              form.setFieldsValue({ father: newVal, father: caps });
                              } } 
                              defaultValue={data?data.father:'breh'} 
                              maxLength={40}
                              placeholder="Enter Father's Name"/>
                      </Form.Item>)}
                            </div>
                      {/* --------------------------------------father-contact------------------------------------ */}
                    </Col>
                    <Col span={12}>
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Contact no.
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.fatherContact:null}</h4>
                          ) : (
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
                            pattern: /^[0-9\b]+$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue = {data.fatherContact? data.fatherContact : ''}
                      >
                            <Input  maxLength={11} defaultValue={data?data.fatherContact:''} placeholder="Enter Contact no." />
                      </Form.Item>) }
                        </div>
                      </Col>
                      {/* -------------------------------------mother------------------------------------------ */}
                    <Col span={12}>
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Mother
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.mother:null}</h4>
                          ) : (
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
                            minLength: 3, maxLength: 25,
                            message: 'Please enter Mother Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue = {data.mother?data.mother:''}
                      >
                            <Input
                            onChange={(e) => {
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                              const caps = str.split(' ').map(capitalize).join(' ');
                              console.log('caps',caps)
                              // setPaidBy(newVal);
                              form.setFieldsValue({ mother: newVal, mother: caps });
                              } } 
                              defaultValue={data?data.mother:''} 
                              maxLength={40}
                              placeholder="Enter Mother's Name" />
                      </Form.Item>) }
                        </div>
                    </Col>
                    {/* ---------------------------------------------mother Contact------------------------------ */}
                    <Col span={12}>
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Contact no.
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.motherContact:null}</h4>
                          ) : (
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
                            pattern: /^[0-9\b]+$/,
                          },
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                        initialValue = {data.motherContact?data.motherContact:''}
                      >
                            <Input  maxLength={11} defaultValue={data?data.motherContact:''} placeholder="Enter Contact no."  />
                      </Form.Item> ) }
                        </div>
                    </Col>
                    </Row>
                  {editfamilymember === true ? (
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
                          style={{ marginLeft: "10px" }}
                          // onClick={() => onContactsFinish()}
                        ><CheckOutlined />
                          SAVE
                        </Button>
                      </Col>
                    </Row>
                  ) : null}
                </Card>
                </Form>
              }
                  
  {/* -------------------------------------------form-2----------------------------------------- */}
        {editEmergency === false
                ?<Card
                      title="EMERGENCY CONTACTS"
                      //   actions={[
                      //   <EditOutlined key="edit" />,
                      // ]}
                      extra={
                        <>
                          {editEmergency === false ? (
                            <Button
                              type="text"
                              style={{ color: "#4ec0f1" }}
                              onClick={() => showeditEmergency(!editEmergency)}
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
                      <Row gutter={[16, 16]}><Col span={8}>
                        <Form.Item
                            name="other"
                            rules={[
                              {
                                required: false,
                                message: "Please enter the Name",
                              },
                            ]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                          >
                            <div>
                              <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Other
                              </h1>
                              
                                <div>{data.other?data.other:"-"}</div>
                              
                            </div>
                          </Form.Item>
                        </Col><Col span={8}>
                        <Form.Item
                            name="relation"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                          >
                            <div>
                              <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Relation
                              </h1>
                            
                                <div>{data.relation?data.relation:"-"}</div>
                              
                            </div>
                          </Form.Item>
                        </Col><Col span={8}>
                        <Form.Item
                            name="otherContact"
                            onKeyPress={(event) => {
                              if (checkNumbervalue(event)) {
                                event.preventDefault();
                              }
                            }}
                            rules={[
                              {
                                required: false,
                                message: "Please enter the Contact no.",
                                pattern: /^[0-9\b]+$/,
                              },
                            ]}
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 32 }}
                          >
                            <div>
                              <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                                Contact no.
                              </h1>
                            
                                <div>{data.otherContact?data.otherContact:"-"}</div>
                            
                            </div>
                          </Form.Item>
                        </Col></Row>
                      
                </Card>

                :<Form
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
                title="EMERGENCY CONTACTS"
                extra={
                  <>
                    {editEmergency === false ? (
                      <Button
                        type="text"
                        style={{ color: "#4ec0f1" }}
                        onClick={() => showeditEmergency(!editEmergency)}
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
                  <Col span={8}>
                  <div>
                        <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                          Other
                        </h1>
                  <Form.Item
                      name="other"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
      
                      rules={[
                        {
                          required: false,
                          minLength: 3, maxLength: 25,
                          message: 'Please enter Other Name',
      
                        }, {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: 'Please enter Name',
      
                        }
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                      initialValue = {data.other?data.other:''}
                    >
                      
                        
                          <Input
                            onChange={(e) => {         
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                              const caps = str.split(' ').map(capitalize).join(' ');
                              console.log('caps',caps)
                              // setPaidBy(newVal);
                              form.setFieldsValue({ other: newVal, other: caps });
                              } }      
                              defaultValue={data?data.other:null}
                              placeholder="Enter Other Name" 
                              maxLength={40}
                            /> 
                    </Form.Item>
                      </div>
                  </Col><Col span={8}>
                      <div>
                        <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                          Relation
                        </h1>
                  <Form.Item
                      name="relation"
                      onKeyPress={(event) => {
                        if (checkAlphabets(event)) {
                          event.preventDefault();
                        }
                      }}
      
                      rules={[
                        {
                          required: false,
                          minLength: 3, maxLength: 25,
                          message: 'Please enter Relation Name',
      
                        }, {
                          pattern: /^[a-zA-Z\s]*$/,
                          message: 'Please enter Relation Name',
      
                        }
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                      initialValue = {data.relation?data.relation:''}
                    >
                       
                          <Input 
                            onChange={(e) => {         
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                              const caps = str.split(' ').map(capitalize).join(' ');
                              console.log('caps',caps)
                              // setPaidBy(newVal);
                              form.setFieldsValue({ relation: newVal, relation: caps });
                              } }      
                              defaultValue={data?data.relation:''} 
                              placeholder="Enter the Relation"
                              maxLength={40}
                            /> 
                    </Form.Item>
                      </div>
                  </Col><Col span={8}>
                  <Form.Item
                      name="otherContact"
                      rules={[
                        {
                          required: false,
                          message: "Please enter Phone Number",
                          pattern: /^[0-9\b]+$/,
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                      initialValue = {data.otherContact?data.otherContact:''}
                    >
                      <div>
                        <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                          Contact no.
                        </h1>
                        
                          <Input  maxLength={11} defaultValue={data?data.otherContact:''} placeholder="Enter Contact no." /> 
                      </div>
                    </Form.Item>
                  </Col></Row>
                {editEmergency === true ? (
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
                      onClick={() => showeditEmergency(false)}
                    >
                      <CloseOutlined />
                      CANCEL
                    </Button>
                    <Col>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "10px" }}
                        // onClick={() => onEmergencyFinish()}
                      >
                        <CheckOutlined />
                        SAVE
                      </Button>
                    </Col>
                  </Row>
                ) : null}
              </Card>
                </Form>
              }
        
    </div>
  );
};
export default Family;