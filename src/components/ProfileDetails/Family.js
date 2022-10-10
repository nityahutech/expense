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
                x                name="father"
                        rules={[
                          { required: true, message: "Please enter Father's name" },
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
                    <Col span={12}>
                      <Form.Item
                        name="fatherContact"
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
                        <h4>{data?data.fatherContact:null}</h4>
                        </div>
                      </Form.Item>
                      </Col>
                      {/* -------------------------------------mother------------------------------------------ */}
                    <Col span={12}>
                      <Form.Item
                        name="mother"
                        rules={[
                          { required: true, message: "Please enter Mother's Name" },
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
                    {/* ---------------------------------------------mother Contact------------------------------ */}
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
                x                name="father"
                        rules={[
                          { required: true, message: "Please enter Father's name" },
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
                            <Input defaultValue={data?data.father:null} placeholder="Enter Father's Name"/>)}
                            </div>
                      </Form.Item>
                      {/* --------------------------------------father-contact------------------------------------ */}
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="fatherContact"
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
                          {editfamilymember === false ? (
                            <h4>{data?data.fatherContact:null}</h4>
                          ) : (
                            <Input defaultValue={data?data.fatherContact:null} placeholder="Enter Contact no." />) }
                        </div>
                      </Form.Item>
                      </Col>
                      {/* -------------------------------------mother------------------------------------------ */}
                    <Col span={12}>
                      <Form.Item
                        name="mother"
                        rules={[
                          { required: true, message: "Please enter Mother's Name" },
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
                            <Input defaultValue={data?data.mother:null} placeholder="Enter Mother's Name" />) }
                        </div>
                      </Form.Item>
                    </Col>
                    {/* ---------------------------------------------mother Contact------------------------------ */}
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
                          {editfamilymember === false ? (
                            <h4>{data?data.motherContact:null}</h4>
                          ) : (
                            <Input defaultValue={data?data.motherContact:null} placeholder="Enter Contact no."  /> ) }
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
                  <Col span={8}>
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
                        
                          <Input defaultValue={data?data.other:null} placeholder="Enter Other Name" /> 
                      </div>
                    </Form.Item>
                  </Col><Col span={8}>
                  <Form.Item
                      name="relation"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the Relation",
                        },
                      ]}
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 32 }}
                    >
                      <div>
                        <h1 style={{ fontWeight: "bold", fontSize: "15px" }}>
                          Relation
                        </h1>
                       
                          <Input defaultValue={data?data.relation:null} placeholder="Enter the Relation" />  
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
                        
                          <Input defaultValue={data?data.otherContact:null} placeholder="Enter Contact no." /> 
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