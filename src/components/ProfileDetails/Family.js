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
} 
from "@ant-design/icons";

// ----------------------------------------------------------------------------------------------------

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

  const onContactsFinish = (newvalue) => {
    // console.log(contactdata)
    console.log(newvalue);
    console.log('success',newvalue)
    EmpInfoContext.updateEduDetails(currentUser.uid,newvalue)     
     setData(newvalue)
     showeditEmergency(false)
  }

  const onEmergencyFinish = (newvalue) => {
      // console.log(contactdata)
      console.log(newvalue);
      console.log('success',newvalue)
      EmpInfoContext.updateEduDetails(currentUser.uid,newvalue)     
      setData(newvalue)
      showeditEmergency(false)
    }
 
  const getData=async()=>{
    let data = await EmpInfoContext.getEduDetails(currentUser.uid)
    console.log(data)
    setData(data)
  }
  console.log(data)

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
  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
// ---------------------------------------------------------------------------------------------------------

  return (

// ---------------------------------------------------------------------------------------------------------


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
                    {/* ------------------------------------father */}
                    <Col span={12}>
                      <Form.Item
                        rules={[
                          { required: true, message: "Please enter Mother's Name" },
                        ]}                
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Father
                          </h1>
                        <h4>{data?data.father:null}</h4>
                          </div>
                      </Form.Item>
                      {/* --------------------------------------father-contact------------------------------------ */}
                    </Col>
                    {/* ---------------------------------fatherContact */}
                    <Col span={12}>
                      <Form.Item
                        name="fatherContact"
                        
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Contact no.
                          </h1>
                        <h4>{data?data.fatherContact:null}</h4>
                        </div>
                      </Form.Item>
                    </Col>
                    {/* -------------------------------------mother */}
                    <Col span={12}>
                      <Form.Item
                        name="mother"
                        
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,
                            minLength: 3, maxLength: 20,
                            message: 'Please enter Father Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Mother
                          </h1>
                          
                            <h4>{data?data.mother:null}</h4></div>
                      </Form.Item>
                    </Col>
                    {/* -----------------------------------mother Contact */}
                    <Col span={12}>
                    <Form.Item
                        name="motherContact"
                        rules={[
                          {
                            required: true,
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
                          
                            <h4>{data?data.motherContact:null}</h4> </div>
                      </Form.Item>
                    </Col>
                    </Row>
                </Card>

                : <Form
                form={form} labelcol={{span: 4,}} wrappercol={{span: 14,}}
                initialValues={{remember: true,}} autoComplete="off"
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
                          Edit
                        </Button>
                      ) : null}
                    </>
                  }
                  style={{width: 800,marginTop: 10,}}
                >
                  <Row gutter={[16, 16]}>
                    {/* ---------------------------------------------father */}
                    <Col span={12}>
                      <Form.Item
                        name='father'
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
        
                        rules={[
                          {
                            required: true,
                            minLength: 3, maxLength: 25,
                            message: 'Please enter Father Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Father
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.father:null}</h4>
                          ) : (
                            <Input 
                              maxLength={25}
                              placeholder='Pleasse enter your mother mane'
                              onChange={(e) => {         
                                const inputval = e.target.value;
                                const str = e.target.value;
                                const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                const caps = str.split(' ').map(capitalize).join(' ');
                                console.log('caps',caps)
                                // setPaidBy(newVal);
                                form.setFieldsValue({ father: newVal, father: caps });
                                } }         
                            />)}
                            </div>
                      </Form.Item>
                    </Col>
                    {/* --------------------------------------fatherContact */}
                    <Col span={12}>
                      <Form.Item
                        name="fatherContact"
                        onKeyPress={(event) => {
                          if (checkNumbervalue(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,
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
                          {editfamilymember === false ? (
                            <h4>{data?data.fatherContact:null}</h4>
                          ) : (
                            <Input maxLength={11} placeholder="Enter Contact no." />) }
                        </div>
                      </Form.Item>
                    </Col>
                    {/* ---------------------------------------------mother */}
                    <Col span={12}>
                      <Form.Item
                        name="mother"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
        
                        rules={[
                          {
                            required: true,
                            minLength: 3, maxLength: 25,
                            message: 'Please enter Eather Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Mother
                          </h1>
                          {editfamilymember === false ? (
                            <h4>{data?data.mother:null}</h4>
                          ) : (
                            <Input 
                              maxLength={25}
                              placeholder='Pleasse enter your mother mane'
                              onChange={(e) => {         
                                const inputval = e.target.value;
                                const str = e.target.value;
                                const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                const caps = str.split(' ').map(capitalize).join(' ');
                                console.log('caps',caps)
                                // setPaidBy(newVal);
                                form.setFieldsValue({ mother: newVal, mother: caps });
                                } }         
                             />) }
                        </div>
                      </Form.Item>
                    </Col>
                    {/* --------------------------------------mother Contact */}
                    <Col span={12}>
                    <Form.Item
                        name="motherContact"
                        onKeyPress={(event) => {
                          if (checkNumbervalue(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,
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
                          {editfamilymember === false ? (
                            <h4>{data?data.motherContact:null}</h4>
                          ) : (
                            <Input maxLength={11} placeholder="Enter Contact no."  /> ) }
                        </div>
                      </Form.Item>
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
                          onClick={() => onContactsFinish()}
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
                      <Row gutter={[16, 16]}><Col span={8}>
                        <Form.Item
                            name="other"
                            rules={[
                              {
                                required: true,
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
                              
                                <h4>{data?data.other:null}</h4>
                              
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
                            
                                <h4>{data?data.relation:null}</h4>
                              
                            </div>
                          </Form.Item>
                        </Col><Col span={8}>
                        <Form.Item
                            name="otherContact"
                            rules={[
                              {
                                required: true,
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
                            
                                <h4>{data?data.otherContact:null}</h4>
                            
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
                  {/* ----------------------------------------------------------Other */}
                    <Col span={8}>
                    <Form.Item
                        name="other"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
        
                        rules={[
                          {
                            required: true,
                            minLength: 3, maxLength: 25,
                            message: 'Please enter Name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Other
                          </h1>
                          
                            <Input 
                              maxLength={25}
                              placeholder='Pleasse enter your mother mane'
                              onChange={(e) => {         
                                const inputval = e.target.value;
                                const str = e.target.value;
                                const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                                const caps = str.split(' ').map(capitalize).join(' ');
                                console.log('caps',caps)
                                // setPaidBy(newVal);
                                form.setFieldsValue({ other: newVal, other: caps });
                                } }       
                              /> 
                        </div>
                      </Form.Item>
                    </Col>
                  {/* ---------------------------------------------------------Relation */}
                    <Col span={8}>
                    <Form.Item
                        name="relation"
                        onKeyPress={(event) => {
                          if (checkAlphabets(event)) {
                            event.preventDefault();
                          }
                        }}
        
                        rules={[
                          {
                            required: true,
                            minLength: 3, maxLength: 25,
                            message: 'Please enter the relative name',
        
                          }, {
                            pattern: /^[a-zA-Z\s]*$/,
                            message: 'Please enter Valid Name',
        
                          }
                        ]}
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 32 }}
                      >
                        <div>
                          <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                            Relation
                          </h1>
                        
                            <Input 
                            maxLength={25}
                            placeholder='Pleasse enter your mother mane'
                            onChange={(e) => {         
                              const inputval = e.target.value;
                              const str = e.target.value;
                              const newVal = inputval.substring(0, 1).toUpperCase() + inputval.substring(1);
                              const caps = str.split(' ').map(capitalize).join(' ');
                              console.log('caps',caps)
                              // setPaidBy(newVal);
                              form.setFieldsValue({ relation: newVal, relation: caps });
                              } }      
                            />  
                        </div>
                    </Form.Item>
                    </Col>
                  {/* ---------------------------------------------------------othercontact */}
                    <Col span={8}>
                    <Form.Item
                        name="otherContact"
                        onKeyPress={(event) => {
                          if (checkNumbervalue(event)) {
                            event.preventDefault();
                          }
                        }}
                        rules={[
                          {
                            required: true,
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
                          
                            <Input maxLength={11} placeholder="Enter Contact no." /> 
                        </div>
                      </Form.Item>
                    </Col>
                    
                  </Row>
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
                          onClick={() => onEmergencyFinish()}
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